import type { SupabaseClient } from "@supabase/supabase-js";

/**
 * Integração LavSync — helpers compartilhados entre o webhook
 * (app/api/lavsync/webhook) e o vínculo de CPF (minha-conta).
 */

export interface LavsyncEventRow {
  id: string;
  event_id: string;
  cpf: string;
  cycles: number;
  points: number;
  amount_cents: number | null;
  occurred_at: string;
}

/**
 * Pontos creditados na carteira por um evento: **1 ponto por real pago**.
 * Deriva de `amount_cents` (valor pago em centavos). Se o evento não trouxer
 * o valor, cai no campo `points` enviado pelo LavSync (compatibilidade).
 */
export function pointsForEvent(e: {
  amount_cents: number | null;
  points: number;
}): number {
  if (e.amount_cents != null && Number.isFinite(e.amount_cents)) {
    return Math.max(0, Math.floor(e.amount_cents / 100));
  }
  return Math.max(0, e.points ?? 0);
}

/** Remove máscara e retorna só os 11 dígitos (ou null se inválido). */
export function normalizeCpf(input: string): string | null {
  const digits = input.replace(/\D/g, "");
  return digits.length === 11 ? digits : null;
}

/** Validação oficial de CPF (dígitos verificadores). */
export function isValidCpf(cpf: string): boolean {
  const d = cpf.replace(/\D/g, "");
  if (d.length !== 11 || /^(\d)\1{10}$/.test(d)) return false;
  for (const len of [9, 10]) {
    let sum = 0;
    for (let i = 0; i < len; i++) sum += Number(d[i]) * (len + 1 - i);
    const check = ((sum * 10) % 11) % 10;
    if (check !== Number(d[len])) return false;
  }
  return true;
}

/** Exibição mascarada: ***.***.789-09 */
export function maskCpf(cpf: string): string {
  return `***.***.${cpf.slice(6, 9)}-${cpf.slice(9)}`;
}

/**
 * Aplica um evento LavSync a um cliente: credita ciclos/pontos e marca
 * o evento como aplicado. Usa o admin client (service role).
 */
export async function applyLavsyncEvent(
  sb: SupabaseClient,
  event: LavsyncEventRow,
  customerId: string,
): Promise<string | null> {
  // 1 ponto por real pago (deriva de amount_cents).
  const points = pointsForEvent(event);

  if (event.cycles > 0) {
    const { error } = await sb.from("cycle_events").insert({
      customer_id: customerId,
      cycles: event.cycles,
      points_earned: points,
      note: `LavSync (evento ${event.event_id})`,
      occurred_at: event.occurred_at,
    });
    if (error) return error.message;
  }

  if (points > 0) {
    const { data: cust, error: eFetch } = await sb
      .from("customers")
      .select("lifetime_points")
      .eq("id", customerId)
      .single();
    if (eFetch) return eFetch.message;
    const { error: eUpd } = await sb
      .from("customers")
      .update({ lifetime_points: (cust?.lifetime_points ?? 0) + points })
      .eq("id", customerId);
    if (eUpd) return eUpd.message;
  }

  const { error: eMark } = await sb
    .from("lavsync_events")
    .update({ customer_id: customerId, applied_at: new Date().toISOString() })
    .eq("id", event.id)
    .is("applied_at", null);
  if (eMark) return eMark.message;

  return null;
}

/**
 * Aplica todos os eventos pendentes de um CPF (chamado quando o cliente
 * vincula o CPF — pagamentos feitos antes do vínculo entram retroativamente).
 * Retorna quantos eventos foram aplicados.
 */
export async function applyPendingEventsForCpf(
  sb: SupabaseClient,
  cpf: string,
  customerId: string,
): Promise<number> {
  const { data } = await sb
    .from("lavsync_events")
    .select("id, event_id, cpf, cycles, points, amount_cents, occurred_at")
    .eq("cpf", cpf)
    .is("applied_at", null)
    .order("occurred_at", { ascending: true });

  let applied = 0;
  for (const event of (data ?? []) as LavsyncEventRow[]) {
    const err = await applyLavsyncEvent(sb, event, customerId);
    if (!err) applied++;
  }
  return applied;
}
