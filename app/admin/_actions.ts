"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  requireAdmin,
  isAdminEmail,
  ALL_SECTION_KEYS,
  type AdminSectionKey,
} from "@/lib/admin";
import { createAdminClient } from "@/lib/supabase/admin";
import type {
  StaffRole,
  StaffStatus,
  PartnerPromoStatus,
  ProductCategory,
  ProductFulfillmentType,
  ProductStatus,
  PartnerCategory,
  PartnerStatus,
  TestimonialStatus,
} from "@/lib/types";
import {
  PARTNER_CATEGORIES,
  PARTNER_STATUSES,
  TESTIMONIAL_STATUSES,
  STAFF_ROLES,
  STAFF_STATUSES,
  PARTNER_PROMO_STATUSES,
} from "@/lib/types";
import { ALL_SCHEMA_KEYS } from "@/lib/content-schema";

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
  await requireAdmin("products");
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
  await requireAdmin("products");
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
  await requireAdmin("products");
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
  const { user: admin } = await requireAdmin("customers");
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
    const { error: eUpd } = await sb.rpc("fn_increment_points", {
      p_customer_id: customerId,
      p_delta: points,
    });
    if (eUpd) return { ok: false, error: eUpd.message };
  }

  revalidatePath(`/admin/customers/${customerId}`);
  revalidatePath("/admin/customers");
  return { ok: true };
}

export async function adjustPoints(formData: FormData): Promise<ActionResult> {
  const { user: admin } = await requireAdmin("customers");
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
  const { error: eUpd } = await sb.rpc("fn_increment_points", {
    p_customer_id: customerId,
    p_delta: delta,
  });
  if (eUpd) {
    if (eUpd.message.includes("points_update_rejected")) {
      const { data: cust } = await sb
        .from("customers")
        .select("lifetime_points")
        .eq("id", customerId)
        .single();
      return {
        ok: false,
        error: `Operação deixaria o saldo negativo (saldo atual: ${cust?.lifetime_points ?? 0}).`,
      };
    }
    return { ok: false, error: eUpd.message };
  }

  // Audit trail: cycle_event com 0 ciclos não conta pro nível do mês
  await sb.from("cycle_events").insert({
    customer_id: customerId,
    cycles: 0,
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
  const { user: admin } = await requireAdmin("redemptions");
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
  await requireAdmin("redemptions");
  const sb = createAdminClient();
  // Transação única no banco: reivindica o pending, devolve pontos e estoque.
  // Cancelamentos simultâneos: só o primeiro passa (o segundo recebe not_pending).
  const { data: r, error } = await sb
    .rpc("fn_cancel_redemption", { p_redemption_id: redemptionId })
    .single<{ customer_id: string }>();
  if (error) {
    if (error.message.includes("not_pending")) {
      return { ok: false, error: "Só é possível cancelar resgates pendentes." };
    }
    return { ok: false, error: error.message };
  }
  revalidatePath("/admin/redemptions");
  if (r?.customer_id) revalidatePath(`/admin/customers/${r.customer_id}`);
  return { ok: true };
}

// ============================================================
// CONTENT BLOCKS (CMS de textos do site)
// ============================================================

export async function saveContent(formData: FormData): Promise<ActionResult> {
  const { user: admin } = await requireAdmin("content");
  const rows = ALL_SCHEMA_KEYS.map((key) => ({
    key,
    value: String(formData.get(key) ?? "").trim(),
    updated_by: admin.id,
    updated_at: new Date().toISOString(),
  }));

  const sb = createAdminClient();
  const { error } = await sb
    .from("content_blocks")
    .upsert(rows, { onConflict: "key" });
  if (error) return { ok: false, error: error.message };

  revalidatePath("/admin/content");
  revalidatePath("/");
  return { ok: true };
}

// ============================================================
// TESTIMONIALS
// ============================================================

function parseTestimonialInput(formData: FormData) {
  const name = String(formData.get("name") ?? "").trim();
  const role = String(formData.get("role") ?? "").trim();
  const text = String(formData.get("text") ?? "").trim();
  const avatar_initial =
    String(formData.get("avatar_initial") ?? "").trim().slice(0, 2).toUpperCase() ||
    (name ? name.charAt(0).toUpperCase() : null);
  const stars = Number(formData.get("stars") ?? 5) || 5;
  const status = String(formData.get("status") ?? "active") as TestimonialStatus;
  const display_order = Number(formData.get("display_order") ?? 0) || 0;
  return { name, role, text, avatar_initial, stars, status, display_order };
}

function validateTestimonial(t: ReturnType<typeof parseTestimonialInput>): string | null {
  if (!t.name) return "Nome é obrigatório.";
  if (!t.role) return "Cargo/descrição é obrigatório.";
  if (!t.text) return "O depoimento não pode ficar vazio.";
  if (!Number.isInteger(t.stars) || t.stars < 1 || t.stars > 5)
    return "Estrelas deve ser entre 1 e 5.";
  if (!TESTIMONIAL_STATUSES.includes(t.status))
    return "Status inválido.";
  return null;
}

export async function createTestimonial(formData: FormData): Promise<ActionResult> {
  await requireAdmin("testimonials");
  const data = parseTestimonialInput(formData);
  const err = validateTestimonial(data);
  if (err) return { ok: false, error: err };
  const sb = createAdminClient();
  const { error } = await sb.from("testimonials").insert(data);
  if (error) return { ok: false, error: error.message };
  revalidatePath("/admin/testimonials");
  revalidatePath("/");
  redirect("/admin/testimonials");
}

export async function updateTestimonial(
  id: string,
  formData: FormData,
): Promise<ActionResult> {
  await requireAdmin("testimonials");
  const data = parseTestimonialInput(formData);
  const err = validateTestimonial(data);
  if (err) return { ok: false, error: err };
  const sb = createAdminClient();
  const { error } = await sb.from("testimonials").update(data).eq("id", id);
  if (error) return { ok: false, error: error.message };
  revalidatePath("/admin/testimonials");
  revalidatePath(`/admin/testimonials/${id}/edit`);
  revalidatePath("/");
  return { ok: true };
}

export async function deleteTestimonial(id: string): Promise<ActionResult> {
  await requireAdmin("testimonials");
  const sb = createAdminClient();
  const { error } = await sb.from("testimonials").delete().eq("id", id);
  if (error) return { ok: false, error: error.message };
  revalidatePath("/admin/testimonials");
  revalidatePath("/");
  return { ok: true };
}

// ============================================================
// PARTNERS
// ============================================================

function parsePartnerInput(formData: FormData) {
  const slug = String(formData.get("slug") ?? "").trim().toLowerCase();
  const name = String(formData.get("name") ?? "").trim();
  const category = String(formData.get("category") ?? "comercio") as PartnerCategory;
  const description = String(formData.get("description") ?? "").trim() || null;
  const logo_url = String(formData.get("logo_url") ?? "").trim() || null;
  const website_url = String(formData.get("website_url") ?? "").trim() || null;
  const whatsapp = String(formData.get("whatsapp") ?? "").trim() || null;
  const benefit_text = String(formData.get("benefit_text") ?? "").trim() || null;
  const status = String(formData.get("status") ?? "draft") as PartnerStatus;
  const display_order = Number(formData.get("display_order") ?? 0) || 0;
  return {
    slug, name, category, description, logo_url,
    website_url, whatsapp, benefit_text, status, display_order,
  };
}

function validatePartner(p: ReturnType<typeof parsePartnerInput>): string | null {
  if (!p.slug || !/^[a-z0-9-]+$/.test(p.slug))
    return "Slug deve conter apenas letras minúsculas, números e hífens.";
  if (!p.name) return "Nome é obrigatório.";
  if (!PARTNER_CATEGORIES.includes(p.category)) return "Categoria inválida.";
  if (!PARTNER_STATUSES.includes(p.status)) return "Status inválido.";
  return null;
}

export async function createPartner(formData: FormData): Promise<ActionResult> {
  await requireAdmin("partners");
  const data = parsePartnerInput(formData);
  const err = validatePartner(data);
  if (err) return { ok: false, error: err };
  const sb = createAdminClient();
  const { error } = await sb.from("partners").insert(data);
  if (error) return { ok: false, error: error.message };
  revalidatePath("/admin/partners");
  revalidatePath("/parceiros");
  revalidatePath("/");
  redirect("/admin/partners");
}

export async function updatePartner(
  id: string,
  formData: FormData,
): Promise<ActionResult> {
  await requireAdmin("partners");
  const data = parsePartnerInput(formData);
  const err = validatePartner(data);
  if (err) return { ok: false, error: err };
  const sb = createAdminClient();
  const { error } = await sb.from("partners").update(data).eq("id", id);
  if (error) return { ok: false, error: error.message };
  revalidatePath("/admin/partners");
  revalidatePath(`/admin/partners/${id}/edit`);
  revalidatePath("/parceiros");
  revalidatePath("/");
  return { ok: true };
}

export async function deletePartner(id: string): Promise<ActionResult> {
  await requireAdmin("partners");
  const sb = createAdminClient();
  const { error } = await sb.from("partners").delete().eq("id", id);
  if (error) return { ok: false, error: error.message };
  revalidatePath("/admin/partners");
  revalidatePath("/parceiros");
  revalidatePath("/");
  return { ok: true };
}

// ============================================================
// STAFF (Configurações — equipe e permissões)
// ============================================================

function parseStaffInput(formData: FormData) {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const name = String(formData.get("name") ?? "").trim();
  const role = String(formData.get("role") ?? "staff") as StaffRole;
  const status = String(formData.get("status") ?? "active") as StaffStatus;
  const permissions = ALL_SECTION_KEYS.filter(
    (key) => formData.get(`perm_${key}`) === "on",
  ) as AdminSectionKey[];
  return { email, name, role, status, permissions };
}

function validateStaff(s: ReturnType<typeof parseStaffInput>): string | null {
  if (!s.name) return "Nome é obrigatório.";
  if (!s.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s.email))
    return "E-mail inválido. Use o e-mail Google que o colaborador usará para entrar.";
  if (!STAFF_ROLES.includes(s.role)) return "Papel inválido.";
  if (!STAFF_STATUSES.includes(s.status)) return "Status inválido.";
  if (s.role === "staff" && s.permissions.length === 0)
    return "Selecione pelo menos uma área de acesso para o colaborador.";
  if (isAdminEmail(s.email))
    return "Esse e-mail já é super-administrador (definido no ambiente) e não precisa de cadastro.";
  return null;
}

export async function createStaffMember(
  formData: FormData,
): Promise<ActionResult> {
  const { user } = await requireAdmin("settings");
  const data = parseStaffInput(formData);
  const err = validateStaff(data);
  if (err) return { ok: false, error: err };

  const sb = createAdminClient();
  const { error } = await sb.from("staff_members").insert({
    ...data,
    permissions: data.role === "admin" ? [] : data.permissions,
    created_by: user.id,
  });
  if (error) {
    if (error.code === "23505")
      return { ok: false, error: "Já existe um membro com esse e-mail." };
    return { ok: false, error: error.message };
  }

  revalidatePath("/admin/settings");
  redirect("/admin/settings");
}

export async function updateStaffMember(
  id: string,
  formData: FormData,
): Promise<ActionResult> {
  const { user } = await requireAdmin("settings");
  const data = parseStaffInput(formData);
  const err = validateStaff(data);
  if (err) return { ok: false, error: err };

  const sb = createAdminClient();
  const { data: current, error: eFetch } = await sb
    .from("staff_members")
    .select("email")
    .eq("id", id)
    .single();
  if (eFetch) return { ok: false, error: eFetch.message };

  const isSelf = current.email === (user.email ?? "").toLowerCase();
  if (isSelf && (data.role !== "admin" || data.status !== "active")) {
    return {
      ok: false,
      error:
        "Você não pode rebaixar ou desativar a sua própria conta. Peça a outro administrador.",
    };
  }

  const { error } = await sb
    .from("staff_members")
    .update({
      ...data,
      permissions: data.role === "admin" ? [] : data.permissions,
    })
    .eq("id", id);
  if (error) {
    if (error.code === "23505")
      return { ok: false, error: "Já existe um membro com esse e-mail." };
    return { ok: false, error: error.message };
  }

  revalidatePath("/admin/settings");
  revalidatePath(`/admin/settings/${id}/edit`);
  return { ok: true };
}

export async function deleteStaffMember(id: string): Promise<ActionResult> {
  const { user } = await requireAdmin("settings");
  const sb = createAdminClient();

  const { data: current, error: eFetch } = await sb
    .from("staff_members")
    .select("email")
    .eq("id", id)
    .single();
  if (eFetch) return { ok: false, error: eFetch.message };
  if (current.email === (user.email ?? "").toLowerCase()) {
    return { ok: false, error: "Você não pode remover a sua própria conta." };
  }

  const { error } = await sb.from("staff_members").delete().eq("id", id);
  if (error) return { ok: false, error: error.message };

  revalidatePath("/admin/settings");
  return { ok: true };
}

// ============================================================
// PARTNER APPLICATIONS (solicitações de parceria)
// ============================================================

function slugify(name: string): string {
  return name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
}

export async function approvePartnerApplication(
  id: string,
): Promise<ActionResult> {
  const { user } = await requireAdmin("partners");
  const sb = createAdminClient();

  const { data: app, error: eFetch } = await sb
    .from("partner_applications")
    .select("*")
    .eq("id", id)
    .single();
  if (eFetch) return { ok: false, error: eFetch.message };
  if (app.status !== "pending")
    return { ok: false, error: "Essa solicitação já foi avaliada." };

  // Slug único: acrescenta sufixo numérico se já existir
  const base = slugify(app.business_name) || "parceiro";
  let slug = base;
  for (let i = 2; i <= 20; i++) {
    const { count } = await sb
      .from("partners")
      .select("id", { count: "exact", head: true })
      .eq("slug", slug);
    if ((count ?? 0) === 0) break;
    slug = `${base}-${i}`;
  }

  const { data: partner, error: eInsert } = await sb
    .from("partners")
    .insert({
      slug,
      name: app.business_name,
      category: app.category,
      description: app.message,
      website_url: app.website_url,
      whatsapp: app.whatsapp,
      status: "draft",
    })
    .select("id")
    .single();
  if (eInsert) return { ok: false, error: eInsert.message };

  const { error: eUpd } = await sb
    .from("partner_applications")
    .update({
      status: "approved",
      reviewed_by: user.id,
      reviewed_at: new Date().toISOString(),
    })
    .eq("id", id);
  if (eUpd) return { ok: false, error: eUpd.message };

  revalidatePath("/admin/partners");
  revalidatePath("/admin/partners/applications");
  // Vai direto pro parceiro recém-criado para completar logo/benefício e ativar
  redirect(`/admin/partners/${partner.id}/edit`);
}

export async function rejectPartnerApplication(
  id: string,
): Promise<ActionResult> {
  const { user } = await requireAdmin("partners");
  const sb = createAdminClient();
  const { error } = await sb
    .from("partner_applications")
    .update({
      status: "rejected",
      reviewed_by: user.id,
      reviewed_at: new Date().toISOString(),
    })
    .eq("id", id)
    .eq("status", "pending");
  if (error) return { ok: false, error: error.message };
  revalidatePath("/admin/partners/applications");
  return { ok: true };
}

export async function deletePartnerApplication(
  id: string,
): Promise<ActionResult> {
  await requireAdmin("partners");
  const sb = createAdminClient();
  const { error } = await sb
    .from("partner_applications")
    .delete()
    .eq("id", id);
  if (error) return { ok: false, error: error.message };
  revalidatePath("/admin/partners/applications");
  return { ok: true };
}

// ============================================================
// PARTNER PROMOS (banners do Clube de Benefícios)
// ============================================================

function parsePromoInput(formData: FormData) {
  const slug = String(formData.get("slug") ?? "").trim().toLowerCase();
  const title = String(formData.get("title") ?? "").trim();
  const partner_name = String(formData.get("partner_name") ?? "").trim();
  const banner_url = String(formData.get("banner_url") ?? "").trim();
  const summary = String(formData.get("summary") ?? "").trim() || null;
  const details = String(formData.get("details") ?? "").trim() || null;
  const conditions = String(formData.get("conditions") ?? "").trim() || null;
  const cta_label = String(formData.get("cta_label") ?? "").trim() || null;
  const cta_url = String(formData.get("cta_url") ?? "").trim() || null;
  const status = String(formData.get("status") ?? "draft") as PartnerPromoStatus;
  const display_order = Number(formData.get("display_order") ?? 0) || 0;
  return {
    slug, title, partner_name, banner_url, summary, details,
    conditions, cta_label, cta_url, status, display_order,
  };
}

function validatePromo(p: ReturnType<typeof parsePromoInput>): string | null {
  if (!p.slug || !/^[a-z0-9-]+$/.test(p.slug))
    return "Slug deve conter apenas letras minúsculas, números e hífens.";
  if (!p.title) return "Título é obrigatório.";
  if (!p.partner_name) return "Nome do parceiro é obrigatório.";
  if (!p.banner_url) return "Imagem do banner é obrigatória.";
  if (!PARTNER_PROMO_STATUSES.includes(p.status)) return "Status inválido.";
  return null;
}

export async function createPromo(formData: FormData): Promise<ActionResult> {
  await requireAdmin("partners");
  const data = parsePromoInput(formData);
  const err = validatePromo(data);
  if (err) return { ok: false, error: err };
  const sb = createAdminClient();
  const { error } = await sb.from("partner_promos").insert(data);
  if (error) return { ok: false, error: error.message };
  revalidatePath("/admin/partners/promos");
  revalidatePath("/clube-de-vantagens");
  revalidatePath("/promocoes");
  redirect("/admin/partners/promos");
}

export async function updatePromo(
  id: string,
  formData: FormData,
): Promise<ActionResult> {
  await requireAdmin("partners");
  const data = parsePromoInput(formData);
  const err = validatePromo(data);
  if (err) return { ok: false, error: err };
  const sb = createAdminClient();
  const { error } = await sb.from("partner_promos").update(data).eq("id", id);
  if (error) return { ok: false, error: error.message };
  revalidatePath("/admin/partners/promos");
  revalidatePath(`/admin/partners/promos/${id}/edit`);
  revalidatePath("/clube-de-vantagens");
  revalidatePath("/promocoes");
  revalidatePath(`/promocoes/${data.slug}`);
  return { ok: true };
}

export async function deletePromo(id: string): Promise<ActionResult> {
  await requireAdmin("partners");
  const sb = createAdminClient();
  const { error } = await sb.from("partner_promos").delete().eq("id", id);
  if (error) return { ok: false, error: error.message };
  revalidatePath("/admin/partners/promos");
  revalidatePath("/clube-de-vantagens");
  revalidatePath("/promocoes");
  return { ok: true };
}
