"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/admin";
import { createAdminClient } from "@/lib/supabase/admin";
import type {
  ProductCategory,
  ProductFulfillmentType,
  ProductStatus,
} from "@/lib/types";

type ActionResult = { ok: true } | { ok: false; error: string };

// ============================================================
// PRODUCTS
// ============================================================

function parseProductInput(formData: FormData) {
  const slug = String(formData.get("slug") ?? "").trim().toLowerCase();
  const name = String(formData.get("name") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim() || null;
  const image_url = String(formData.get("image_url") ?? "").trim() || null;
  const category = String(formData.get("category") ?? "brinde") as ProductCategory;
  const fulfillment_type = String(
    formData.get("fulfillment_type") ?? "pickup",
  ) as ProductFulfillmentType;
  const status = String(formData.get("status") ?? "draft") as ProductStatus;

  const pointsRaw = formData.get("points_cost");
  const points_cost =
    pointsRaw && String(pointsRaw).trim() !== "" ? Number(pointsRaw) : null;

  const moneyRaw = formData.get("money_price_cents");
  const money_price_cents =
    moneyRaw && String(moneyRaw).trim() !== "" ? Number(moneyRaw) : null;

  const stockRaw = formData.get("stock");
  const stock =
    stockRaw && String(stockRaw).trim() !== "" ? Number(stockRaw) : null;

  const display_order = Number(formData.get("display_order") ?? 0) || 0;

  return {
    slug,
    name,
    description,
    image_url,
    category,
    fulfillment_type,
    status,
    points_cost,
    money_price_cents,
    stock,
    display_order,
  };
}

function validateProduct(p: ReturnType<typeof parseProductInput>): string | null {
  if (!p.slug || !/^[a-z0-9-]+$/.test(p.slug))
    return "Slug deve conter apenas letras minúsculas, números e hífens.";
  if (!p.name) return "Nome é obrigatório.";
  if (p.points_cost == null && p.money_price_cents == null)
    return "Defina pelo menos um: custo em pontos ou preço em dinheiro.";
  if (p.points_cost != null && (!Number.isInteger(p.points_cost) || p.points_cost <= 0))
    return "Custo em pontos deve ser inteiro positivo.";
  if (
    p.money_price_cents != null &&
    (!Number.isInteger(p.money_price_cents) || p.money_price_cents <= 0)
  )
    return "Preço em centavos deve ser inteiro positivo.";
  if (p.stock != null && (!Number.isInteger(p.stock) || p.stock < 0))
    return "Estoque deve ser inteiro >= 0.";
  return null;
}

export async function createProduct(formData: FormData): Promise<ActionResult> {
  await requireAdmin();
  const data = parseProductInput(formData);
  const err = validateProduct(data);
  if (err) return { ok: false, error: err };

  const sb = createAdminClient();
  const { error } = await sb.from("products").insert(data);
  if (error) return { ok: false, error: error.message };

  revalidatePath("/admin/products");
  revalidatePath("/store");
  redirect("/admin/products");
}

export async function updateProduct(
  id: string,
  formData: FormData,
): Promise<ActionResult> {
  await requireAdmin();
  const data = parseProductInput(formData);
  const err = validateProduct(data);
  if (err) return { ok: false, error: err };

  const sb = createAdminClient();
  const { error } = await sb.from("products").update(data).eq("id", id);
  if (error) return { ok: false, error: error.message };

  revalidatePath("/admin/products");
  revalidatePath(`/admin/products/${id}/edit`);
  revalidatePath("/store");
  revalidatePath(`/store/${data.slug}`);
  return { ok: true };
}

export async function archiveProduct(id: string): Promise<ActionResult> {
  await requireAdmin();
  const sb = createAdminClient();
  const { error } = await sb
    .from("products")
    .update({ status: "archived" })
    .eq("id", id);
  if (error) return { ok: false, error: error.message };
  revalidatePath("/admin/products");
  revalidatePath("/store");
  return { ok: true };
}

// ============================================================
// CUSTOMERS — creditCycles + adjustPoints
// ============================================================

export async function creditCycles(formData: FormData): Promise<ActionResult> {
  const admin = await requireAdmin();
  const customerId = String(formData.get("customer_id") ?? "");
  const cycles = Number(formData.get("cycles") ?? 0);
  const points = Number(formData.get("points") ?? 0);
  const note = String(formData.get("note") ?? "").trim() || null;

  if (!customerId || !Number.isInteger(cycles) || cycles <= 0) {
    return { ok: false, error: "Quantidade de ciclos inválida." };
  }
  if (!Number.isInteger(points) || points < 0) {
    return { ok: false, error: "Pontos devem ser inteiro >= 0." };
  }

  const sb = createAdminClient();
  const { error: e1 } = await sb.from("cycle_events").insert({
    customer_id: customerId,
    cycles,
    points_earned: points,
    note,
    created_by: admin.id,
  });
  if (e1) return { ok: false, error: e1.message };

  if (points > 0) {
    const { data: cust, error: eFetch } = await sb
      .from("customers")
      .select("lifetime_points")
      .eq("id", customerId)
      .single();
    if (eFetch) return { ok: false, error: eFetch.message };
    const current = cust?.lifetime_points ?? 0;
    const { error: eUpd } = await sb
      .from("customers")
      .update({ lifetime_points: current + points })
      .eq("id", customerId);
    if (eUpd) return { ok: false, error: eUpd.message };
  }

  revalidatePath(`/admin/customers/${customerId}`);
  revalidatePath("/admin/customers");
  return { ok: true };
}

export async function adjustPoints(formData: FormData): Promise<ActionResult> {
  const admin = await requireAdmin();
  const customerId = String(formData.get("customer_id") ?? "");
  const delta = Number(formData.get("delta") ?? 0);
  const reason = String(formData.get("reason") ?? "").trim();

  if (!customerId || !Number.isInteger(delta) || delta === 0) {
    return { ok: false, error: "Variação de pontos inválida (não pode ser zero)." };
  }
  if (!reason) {
    return { ok: false, error: "Motivo é obrigatório para ajuste manual." };
  }

  const sb = createAdminClient();
  const { data: cust, error: eFetch } = await sb
    .from("customers")
    .select("lifetime_points")
    .eq("id", customerId)
    .single();
  if (eFetch) return { ok: false, error: eFetch.message };

  const current = cust?.lifetime_points ?? 0;
  const next = current + delta;
  if (next < 0) {
    return { ok: false, error: `Operação deixaria o saldo negativo (saldo atual: ${current}).` };
  }

  const { error: eUpd } = await sb
    .from("customers")
    .update({ lifetime_points: next })
    .eq("id", customerId);
  if (eUpd) return { ok: false, error: eUpd.message };

  // Loga o ajuste como cycle_event "0 ciclos" pra ter audit trail
  await sb.from("cycle_events").insert({
    customer_id: customerId,
    cycles: 1, // dummy mínimo (check constraint cycles > 0)
    points_earned: 0,
    note: `Ajuste manual ${delta >= 0 ? "+" : ""}${delta} pts: ${reason}`,
    created_by: admin.id,
  });

  revalidatePath(`/admin/customers/${customerId}`);
  return { ok: true };
}

// ============================================================
// REDEMPTIONS
// ============================================================

export async function fulfillRedemption(
  redemptionId: string,
): Promise<ActionResult> {
  const admin = await requireAdmin();
  const sb = createAdminClient();
  const { error } = await sb
    .from("redemptions")
    .update({
      status: "fulfilled",
      fulfilled_at: new Date().toISOString(),
      fulfilled_by: admin.id,
    })
    .eq("id", redemptionId)
    .eq("status", "pending");
  if (error) return { ok: false, error: error.message };
  revalidatePath("/admin/redemptions");
  return { ok: true };
}

export async function cancelRedemption(
  redemptionId: string,
): Promise<ActionResult> {
  await requireAdmin();
  const sb = createAdminClient();
  // refund: devolver pontos ao cliente
  const { data: r, error: eR } = await sb
    .from("redemptions")
    .select("customer_id, points_spent, status")
    .eq("id", redemptionId)
    .single();
  if (eR) return { ok: false, error: eR.message };
  if (r.status !== "pending") {
    return { ok: false, error: "Só é possível cancelar resgates pendentes." };
  }

  const { data: cust } = await sb
    .from("customers")
    .select("lifetime_points")
    .eq("id", r.customer_id)
    .single();
  await sb
    .from("customers")
    .update({ lifetime_points: (cust?.lifetime_points ?? 0) + r.points_spent })
    .eq("id", r.customer_id);

  const { error } = await sb
    .from("redemptions")
    .update({ status: "cancelled" })
    .eq("id", redemptionId);
  if (error) return { ok: false, error: error.message };
  revalidatePath("/admin/redemptions");
  revalidatePath(`/admin/customers/${r.customer_id}`);
  return { ok: true };
}
