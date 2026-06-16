import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import {
  normalizeCpf,
  isValidCpf,
  applyLavsyncEvent,
  pointsForEvent,
  type LavsyncEventRow,
} from "@/lib/lavsync";

export const dynamic = "force-dynamic";

/**
 * Webhook LavSync → Xô Varal Castelo.
 *
 * POST /api/lavsync/webhook
 * Authorization: Bearer <LAVSYNC_WEBHOOK_SECRET>
 * Body: { event_id, cpf, cycles, points, amount_cents?, occurred_at?, type? }
 *
 * Idempotente por event_id — o LavSync pode reenviar com segurança.
 * Se o CPF ainda não estiver vinculado a uma conta do site, o evento fica
 * armazenado e é aplicado retroativamente quando o cliente vincular.
 */
export async function POST(req: Request) {
  const auth = req.headers.get("authorization") ?? "";
  const secret = process.env.LAVSYNC_WEBHOOK_SECRET;
  if (!secret || auth !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  const event_id = String(body.event_id ?? "").trim();
  const cpf = normalizeCpf(String(body.cpf ?? ""));
  const cycles = Number(body.cycles ?? 0);
  const points = Number(body.points ?? 0);
  const amount_cents =
    body.amount_cents != null ? Number(body.amount_cents) : null;
  const occurred_at = body.occurred_at
    ? new Date(String(body.occurred_at))
    : new Date();

  if (!event_id || event_id.length > 120) {
    return NextResponse.json(
      { error: "event_id obrigatório (string única por evento)" },
      { status: 400 },
    );
  }
  if (!cpf || !isValidCpf(cpf)) {
    return NextResponse.json({ error: "cpf inválido" }, { status: 400 });
  }
  if (
    !Number.isInteger(cycles) ||
    cycles < 0 ||
    !Number.isInteger(points) ||
    points < 0
  ) {
    return NextResponse.json(
      { error: "cycles/points devem ser inteiros >= 0" },
      { status: 400 },
    );
  }
  if (
    amount_cents != null &&
    (!Number.isInteger(amount_cents) || amount_cents < 0)
  ) {
    return NextResponse.json(
      { error: "amount_cents deve ser inteiro >= 0 (valor pago em centavos)" },
      { status: 400 },
    );
  }
  // Pontos creditados = 1 por real pago (deriva de amount_cents; fallback points).
  const creditedPoints = pointsForEvent({ amount_cents, points });
  if (cycles === 0 && creditedPoints === 0) {
    return NextResponse.json(
      {
        error:
          "evento sem efeito: informe cycles > 0 ou amount_cents/points > 0",
      },
      { status: 400 },
    );
  }
  if (Number.isNaN(occurred_at.getTime())) {
    return NextResponse.json(
      { error: "occurred_at inválido (use ISO 8601)" },
      { status: 400 },
    );
  }

  const sb = createAdminClient();

  // Grava o evento; conflito de event_id = retry do LavSync → já processado
  const { data: inserted, error: eInsert } = await sb
    .from("lavsync_events")
    .insert({
      event_id,
      cpf,
      cycles,
      points,
      amount_cents,
      occurred_at: occurred_at.toISOString(),
      raw: body,
    })
    .select("id, event_id, cpf, cycles, points, amount_cents, occurred_at")
    .single();

  if (eInsert) {
    if (eInsert.code === "23505") {
      return NextResponse.json({ status: "duplicate", event_id });
    }
    return NextResponse.json({ error: eInsert.message }, { status: 500 });
  }

  // CPF já vinculado a uma conta? Aplica na hora.
  const { data: customer } = await sb
    .from("customers")
    .select("id")
    .eq("cpf", cpf)
    .maybeSingle();

  if (!customer) {
    return NextResponse.json({ status: "stored", linked: false, event_id });
  }

  const err = await applyLavsyncEvent(
    sb,
    inserted as LavsyncEventRow,
    customer.id,
  );
  if (err) {
    // Evento ficou gravado; reconciliação/vínculo reaplica depois
    return NextResponse.json({ error: err }, { status: 500 });
  }

  return NextResponse.json({ status: "applied", linked: true, event_id });
}
