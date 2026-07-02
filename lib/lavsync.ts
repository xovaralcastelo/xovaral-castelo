import type { SupabaseClient } from "@supabase/supabase-js";

/**
 * Integração LavSync — helpers compartilhados entre o webhook
 * (app/api/lavsync/webhook) e o vínculo de CPF (minha-conta).
 */

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
 * Aplica um evento LavSync a um cliente via fn_apply_lavsync_event
 * (transação única no banco: credita ciclos + pontos + marca aplicado).
 * Idempotente — se o evento já foi aplicado, sai sem efeito.
 * Usa o admin client (service role).
 */
export async function applyLavsyncEvent(
  sb: SupabaseClient,
  eventId: string,
  customerId: string,
): Promise<{ error: string | null; applied: boolean }> {
  const { data, error } = await sb.rpc("fn_apply_lavsync_event", {
    p_event_id: eventId,
    p_customer_id: customerId,
  });
  if (error) return { error: error.message, applied: false };
  return { error: null, applied: data === "applied" };
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
    .select("id")
    .eq("cpf", cpf)
    .is("applied_at", null)
    .order("occurred_at", { ascending: true });

  let applied = 0;
  for (const event of data ?? []) {
    const res = await applyLavsyncEvent(sb, event.id, customerId);
    if (res.applied) applied++;
  }
  return applied;
}
