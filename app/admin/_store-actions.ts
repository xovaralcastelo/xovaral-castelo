"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/admin";
import { createAdminClient } from "@/lib/supabase/admin";
import { pointsFromCents } from "@/lib/store";
import type {
  OrderStatus,
  ProductCategoryStatus,
  ProductStatus,
  ProductFulfillmentType,
} from "@/lib/types";

type ActionResult = { ok: true } | { ok: false; error: string };

const BUCKET = "product-images";

// ============================================================
// Helpers de parsing
// ============================================================

function slugify(value: string): string {
  return value
    .normalize("NFD")
    // remove os acentos que o NFD separou das letras
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

function str(fd: FormData, key: string): string {
  return String(fd.get(key) ?? "").trim();
}

function strOrNull(fd: FormData, key: string): string | null {
  return str(fd, key) || null;
}

function bool(fd: FormData, key: string): boolean {
  const v = fd.get(key);
  return v === "on" || v === "true" || v === "1";
}

function intOrNull(fd: FormData, key: string): number | null {
  const raw = str(fd, key);
  if (raw === "") return null;
  const n = Number(raw);
  return Number.isFinite(n) ? Math.trunc(n) : null;
}

/** Aceita "49,90", "R$ 1.234,56" ou "49.90" e devolve centavos. */
function moneyToCents(fd: FormData, key: string): number | null {
  const raw = str(fd, key);
  if (raw === "") return null;
  const cleaned = raw.replace(/[^\d,.-]/g, "");
  const normalized = cleaned.includes(",")
    ? cleaned.replace(/\./g, "").replace(",", ".")
    : cleaned;
  const n = Number(normalized);
  if (!Number.isFinite(n)) return null;
  return Math.round(n * 100);
}

/** Uma linha por item. */
function lines(fd: FormData, key: string): string[] {
  return str(fd, key)
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);
}

/** Linhas "Material: Algodão" viram [{label, value}]. */
function specLines(fd: FormData, key: string) {
  return lines(fd, key)
    .map((line) => {
      const i = line.indexOf(":");
      if (i === -1) return { label: line, value: "" };
      return {
        label: line.slice(0, i).trim(),
        value: line.slice(i + 1).trim(),
      };
    })
    .filter((s) => s.label);
}

async function getPointValueCents(): Promise<number> {
  const sb = createAdminClient();
  const { data } = await sb
    .from("store_settings")
    .select("point_value_cents")
    .eq("id", true)
    .maybeSingle<{ point_value_cents: number }>();
  return data?.point_value_cents ?? 5;
}

function revalidateStore(slug?: string | null) {
  revalidatePath("/store");
  revalidatePath("/admin/products");
  if (slug) revalidatePath(`/store/${slug}`);
}

// ============================================================
// PRODUTOS
// ============================================================

async function parseProduct(fd: FormData) {
  const name = str(fd, "name");
  const slug = str(fd, "slug").toLowerCase() || slugify(name);
  const money_price_cents = moneyToCents(fd, "money_price");

  // Preço em pontos: o admin pode deixar vazio e o sistema deriva da cotação.
  let points_cost = intOrNull(fd, "points_cost");
  if (points_cost == null && money_price_cents != null) {
    points_cost = pointsFromCents(money_price_cents, await getPointValueCents());
  }

  return {
    name,
    slug,
    sku: strOrNull(fd, "sku"),
    subtitle: strOrNull(fd, "subtitle"),
    short_description: strOrNull(fd, "short_description"),
    description: strOrNull(fd, "description"),
    brand: strOrNull(fd, "brand"),
    badge: strOrNull(fd, "badge"),
    category_id: strOrNull(fd, "category_id"),
    highlights: lines(fd, "highlights"),
    specs: specLines(fd, "specs"),
    money_price_cents,
    compare_at_price_cents: moneyToCents(fd, "compare_at_price"),
    points_cost,
    stock: intOrNull(fd, "stock"),
    status: (str(fd, "status") || "draft") as ProductStatus,
    fulfillment_type: (str(fd, "fulfillment_type") ||
      "pickup") as ProductFulfillmentType,
    featured: bool(fd, "featured"),
    allow_pickup: bool(fd, "allow_pickup"),
    allow_delivery: bool(fd, "allow_delivery"),
    has_variants: bool(fd, "has_variants"),
    variant_label: strOrNull(fd, "variant_label"),
    display_order: intOrNull(fd, "display_order") ?? 0,
  };
}

function validateProduct(p: Awaited<ReturnType<typeof parseProduct>>): string | null {
  if (!p.name) return "Nome é obrigatório.";
  if (!p.slug || !/^[a-z0-9-]+$/.test(p.slug))
    return "Slug deve conter apenas letras minúsculas, números e hífens.";
  if (p.money_price_cents == null || p.money_price_cents <= 0)
    return "Informe o preço em reais — ele é a base do preço em pontos.";
  if (p.compare_at_price_cents != null && p.compare_at_price_cents <= p.money_price_cents)
    return 'O preço "de" precisa ser maior que o preço atual.';
  if (p.points_cost != null && p.points_cost <= 0)
    return "Preço em pontos deve ser maior que zero.";
  if (p.stock != null && p.stock < 0) return "Estoque não pode ser negativo.";
  if (!p.allow_pickup && !p.allow_delivery)
    return "O produto precisa permitir ao menos retirada ou entrega.";
  return null;
}

export async function createProduct(formData: FormData): Promise<ActionResult> {
  await requireAdmin("products");
  const data = await parseProduct(formData);
  const err = validateProduct(data);
  if (err) return { ok: false, error: err };

  const sb = createAdminClient();
  const { data: created, error } = await sb
    .from("products")
    .insert(data)
    .select("id")
    .single();
  if (error) {
    if (error.code === "23505")
      return { ok: false, error: "Já existe um produto com esse slug ou SKU." };
    return { ok: false, error: error.message };
  }

  revalidateStore(data.slug);
  // Vai direto pra edição: é lá que se sobem as fotos e as variações.
  redirect(`/admin/products/${created.id}/edit?novo=1`);
}

export async function updateProduct(
  id: string,
  formData: FormData,
): Promise<ActionResult> {
  await requireAdmin("products");
  const data = await parseProduct(formData);
  const err = validateProduct(data);
  if (err) return { ok: false, error: err };

  const sb = createAdminClient();
  const { error } = await sb.from("products").update(data).eq("id", id);
  if (error) {
    if (error.code === "23505")
      return { ok: false, error: "Já existe um produto com esse slug ou SKU." };
    return { ok: false, error: error.message };
  }

  revalidateStore(data.slug);
  revalidatePath(`/admin/products/${id}/edit`);
  return { ok: true };
}

export async function setProductStatus(
  id: string,
  status: ProductStatus,
): Promise<ActionResult> {
  await requireAdmin("products");
  const sb = createAdminClient();
  const { error } = await sb.from("products").update({ status }).eq("id", id);
  if (error) return { ok: false, error: error.message };
  revalidateStore();
  return { ok: true };
}

export async function deleteProduct(id: string): Promise<ActionResult> {
  await requireAdmin("products");
  const sb = createAdminClient();

  // Produto já vendido não pode sumir — o histórico do pedido depende dele.
  const { count } = await sb
    .from("order_items")
    .select("id", { count: "exact", head: true })
    .eq("product_id", id);

  if ((count ?? 0) > 0) {
    const { error } = await sb
      .from("products")
      .update({ status: "archived" })
      .eq("id", id);
    if (error) return { ok: false, error: error.message };
    revalidateStore();
    return {
      ok: false,
      error:
        "Esse produto já foi vendido, então não pode ser apagado — ele foi arquivado e sai da loja.",
    };
  }

  const { data: images } = await sb
    .from("product_images")
    .select("storage_path")
    .eq("product_id", id);

  const paths = (images ?? [])
    .map((i) => i.storage_path)
    .filter((p): p is string => !!p);
  if (paths.length) await sb.storage.from(BUCKET).remove(paths);

  const { error } = await sb.from("products").delete().eq("id", id);
  if (error) return { ok: false, error: error.message };

  revalidateStore();
  return { ok: true };
}

// ============================================================
// GALERIA DE FOTOS
// ============================================================

const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp", "image/avif"];
const MAX_IMAGE_BYTES = 5 * 1024 * 1024;

export async function uploadProductImage(
  productId: string,
  formData: FormData,
): Promise<ActionResult> {
  await requireAdmin("products");
  const file = formData.get("file");
  if (!(file instanceof File) || file.size === 0)
    return { ok: false, error: "Escolha uma imagem." };
  if (!ALLOWED_IMAGE_TYPES.includes(file.type))
    return { ok: false, error: "Formato inválido. Use JPG, PNG, WebP ou AVIF." };
  if (file.size > MAX_IMAGE_BYTES)
    return { ok: false, error: "Imagem acima de 5 MB. Comprima antes de subir." };

  const sb = createAdminClient();
  const ext = (file.name.split(".").pop() ?? "jpg").toLowerCase();
  const path = `${productId}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;

  const { error: upErr } = await sb.storage
    .from(BUCKET)
    .upload(path, file, { contentType: file.type, upsert: false });
  if (upErr) return { ok: false, error: `Falha no upload: ${upErr.message}` };

  const {
    data: { publicUrl },
  } = sb.storage.from(BUCKET).getPublicUrl(path);

  const { data: last } = await sb
    .from("product_images")
    .select("display_order")
    .eq("product_id", productId)
    .order("display_order", { ascending: false })
    .limit(1)
    .maybeSingle<{ display_order: number }>();

  const nextOrder = (last?.display_order ?? -1) + 1;

  const { error } = await sb.from("product_images").insert({
    product_id: productId,
    url: publicUrl,
    storage_path: path,
    alt: strOrNull(formData, "alt"),
    display_order: nextOrder,
  });
  if (error) {
    await sb.storage.from(BUCKET).remove([path]);
    return { ok: false, error: error.message };
  }

  // A primeira foto vira a capa legada, que ainda alimenta cards antigos.
  if (nextOrder === 0) {
    await sb.from("products").update({ image_url: publicUrl }).eq("id", productId);
  }

  revalidatePath(`/admin/products/${productId}/edit`);
  revalidateStore();
  return { ok: true };
}

export async function deleteProductImage(imageId: string): Promise<ActionResult> {
  await requireAdmin("products");
  const sb = createAdminClient();

  const { data: image } = await sb
    .from("product_images")
    .select("*")
    .eq("id", imageId)
    .maybeSingle<{ id: string; product_id: string; storage_path: string | null }>();
  if (!image) return { ok: false, error: "Imagem não encontrada." };

  const { error } = await sb.from("product_images").delete().eq("id", imageId);
  if (error) return { ok: false, error: error.message };
  if (image.storage_path) await sb.storage.from(BUCKET).remove([image.storage_path]);

  // Promove a próxima foto a capa.
  const { data: next } = await sb
    .from("product_images")
    .select("url")
    .eq("product_id", image.product_id)
    .order("display_order", { ascending: true })
    .limit(1)
    .maybeSingle<{ url: string }>();

  await sb
    .from("products")
    .update({ image_url: next?.url ?? null })
    .eq("id", image.product_id);

  revalidatePath(`/admin/products/${image.product_id}/edit`);
  revalidateStore();
  return { ok: true };
}

export async function moveProductImage(
  imageId: string,
  direction: "up" | "down",
): Promise<ActionResult> {
  await requireAdmin("products");
  const sb = createAdminClient();

  const { data: image } = await sb
    .from("product_images")
    .select("id, product_id, display_order")
    .eq("id", imageId)
    .maybeSingle<{ id: string; product_id: string; display_order: number }>();
  if (!image) return { ok: false, error: "Imagem não encontrada." };

  // Vizinho imediato na direção pedida: o maior abaixo, ou o menor acima.
  const base = sb
    .from("product_images")
    .select("id, display_order")
    .eq("product_id", image.product_id);

  const { data: neighbor } = await (direction === "up"
    ? base.lt("display_order", image.display_order).order("display_order", { ascending: false })
    : base.gt("display_order", image.display_order).order("display_order", { ascending: true })
  )
    .limit(1)
    .maybeSingle<{ id: string; display_order: number }>();

  if (!neighbor) return { ok: true }; // já está na ponta

  await sb
    .from("product_images")
    .update({ display_order: neighbor.display_order })
    .eq("id", image.id);
  await sb
    .from("product_images")
    .update({ display_order: image.display_order })
    .eq("id", neighbor.id);

  const { data: first } = await sb
    .from("product_images")
    .select("url")
    .eq("product_id", image.product_id)
    .order("display_order", { ascending: true })
    .limit(1)
    .maybeSingle<{ url: string }>();
  if (first)
    await sb.from("products").update({ image_url: first.url }).eq("id", image.product_id);

  revalidatePath(`/admin/products/${image.product_id}/edit`);
  revalidateStore();
  return { ok: true };
}

// ============================================================
// VARIAÇÕES
// ============================================================

export async function createVariant(
  productId: string,
  formData: FormData,
): Promise<ActionResult> {
  await requireAdmin("products");
  const label = str(formData, "label");
  if (!label) return { ok: false, error: "Dê um nome à variação (ex: P, M, G)." };

  const sb = createAdminClient();
  const { data: last } = await sb
    .from("product_variants")
    .select("display_order")
    .eq("product_id", productId)
    .order("display_order", { ascending: false })
    .limit(1)
    .maybeSingle<{ display_order: number }>();

  const { error } = await sb.from("product_variants").insert({
    product_id: productId,
    label,
    sku: strOrNull(formData, "sku"),
    price_cents: moneyToCents(formData, "price"),
    stock: intOrNull(formData, "stock"),
    display_order: (last?.display_order ?? -1) + 1,
  });
  if (error) {
    if (error.code === "23505") return { ok: false, error: "Esse SKU já existe." };
    return { ok: false, error: error.message };
  }

  // Um produto com variação passa a exigir escolha no checkout.
  await sb.from("products").update({ has_variants: true }).eq("id", productId);

  revalidatePath(`/admin/products/${productId}/edit`);
  revalidateStore();
  return { ok: true };
}

export async function updateVariant(
  id: string,
  formData: FormData,
): Promise<ActionResult> {
  await requireAdmin("products");
  const sb = createAdminClient();
  const { data: variant } = await sb
    .from("product_variants")
    .select("product_id")
    .eq("id", id)
    .maybeSingle<{ product_id: string }>();
  if (!variant) return { ok: false, error: "Variação não encontrada." };

  const { error } = await sb
    .from("product_variants")
    .update({
      label: str(formData, "label"),
      sku: strOrNull(formData, "sku"),
      price_cents: moneyToCents(formData, "price"),
      stock: intOrNull(formData, "stock"),
      status: str(formData, "status") === "archived" ? "archived" : "active",
    })
    .eq("id", id);
  if (error) return { ok: false, error: error.message };

  revalidatePath(`/admin/products/${variant.product_id}/edit`);
  revalidateStore();
  return { ok: true };
}

export async function deleteVariant(id: string): Promise<ActionResult> {
  await requireAdmin("products");
  const sb = createAdminClient();

  const { data: variant } = await sb
    .from("product_variants")
    .select("product_id")
    .eq("id", id)
    .maybeSingle<{ product_id: string }>();
  if (!variant) return { ok: false, error: "Variação não encontrada." };

  // Variação já vendida vira arquivada — o pedido antigo referencia ela.
  const { count } = await sb
    .from("order_items")
    .select("id", { count: "exact", head: true })
    .eq("variant_id", id);

  const { error } =
    (count ?? 0) > 0
      ? await sb.from("product_variants").update({ status: "archived" }).eq("id", id)
      : await sb.from("product_variants").delete().eq("id", id);
  if (error) return { ok: false, error: error.message };

  const { count: remaining } = await sb
    .from("product_variants")
    .select("id", { count: "exact", head: true })
    .eq("product_id", variant.product_id)
    .eq("status", "active");

  if ((remaining ?? 0) === 0)
    await sb
      .from("products")
      .update({ has_variants: false })
      .eq("id", variant.product_id);

  revalidatePath(`/admin/products/${variant.product_id}/edit`);
  revalidateStore();
  return { ok: true };
}

// ============================================================
// CATEGORIAS
// ============================================================

function parseCategory(fd: FormData) {
  const name = str(fd, "name");
  return {
    name,
    slug: str(fd, "slug").toLowerCase() || slugify(name),
    description: strOrNull(fd, "description"),
    image_url: strOrNull(fd, "image_url"),
    display_order: intOrNull(fd, "display_order") ?? 0,
    status: (str(fd, "status") || "active") as ProductCategoryStatus,
  };
}

export async function createCategory(formData: FormData): Promise<ActionResult> {
  await requireAdmin("categories");
  const data = parseCategory(formData);
  if (!data.name) return { ok: false, error: "Nome é obrigatório." };
  if (!/^[a-z0-9-]+$/.test(data.slug))
    return { ok: false, error: "Slug inválido." };

  const sb = createAdminClient();
  const { error } = await sb.from("product_categories").insert(data);
  if (error) {
    if (error.code === "23505")
      return { ok: false, error: "Já existe uma categoria com esse slug." };
    return { ok: false, error: error.message };
  }

  revalidatePath("/admin/categories");
  revalidateStore();
  redirect("/admin/categories");
}

export async function updateCategory(
  id: string,
  formData: FormData,
): Promise<ActionResult> {
  await requireAdmin("categories");
  const data = parseCategory(formData);
  if (!data.name) return { ok: false, error: "Nome é obrigatório." };

  const sb = createAdminClient();
  const { error } = await sb.from("product_categories").update(data).eq("id", id);
  if (error) return { ok: false, error: error.message };

  revalidatePath("/admin/categories");
  revalidateStore();
  return { ok: true };
}

export async function deleteCategory(id: string): Promise<ActionResult> {
  await requireAdmin("categories");
  const sb = createAdminClient();

  const { count } = await sb
    .from("products")
    .select("id", { count: "exact", head: true })
    .eq("category_id", id);

  if ((count ?? 0) > 0)
    return {
      ok: false,
      error: `Essa categoria tem ${count} produto(s). Mova-os antes de excluir.`,
    };

  const { error } = await sb.from("product_categories").delete().eq("id", id);
  if (error) return { ok: false, error: error.message };

  revalidatePath("/admin/categories");
  revalidateStore();
  return { ok: true };
}

// ============================================================
// PEDIDOS
// ============================================================

const NEXT_STATUS: Record<OrderStatus, OrderStatus[]> = {
  pending_payment: ["cancelled"],
  paid: ["preparing", "cancelled"],
  preparing: ["ready", "cancelled"],
  ready: ["delivered", "cancelled"],
  delivered: [],
  cancelled: [],
};

export async function setOrderStatus(
  id: string,
  status: OrderStatus,
): Promise<ActionResult> {
  await requireAdmin("orders");
  const sb = createAdminClient();

  const { data: order } = await sb
    .from("orders")
    .select("status")
    .eq("id", id)
    .maybeSingle<{ status: OrderStatus }>();
  if (!order) return { ok: false, error: "Pedido não encontrado." };

  if (!NEXT_STATUS[order.status].includes(status))
    return {
      ok: false,
      error: `Não dá para ir de "${order.status}" para "${status}".`,
    };

  if (status === "cancelled") return cancelOrder(id, "Cancelado pelo painel");

  const patch: Record<string, unknown> = { status };
  if (status === "ready") patch.ready_at = new Date().toISOString();
  if (status === "delivered") patch.delivered_at = new Date().toISOString();

  const { error } = await sb.from("orders").update(patch).eq("id", id);
  if (error) return { ok: false, error: error.message };

  revalidatePath("/admin/orders");
  revalidatePath(`/admin/orders/${id}`);
  revalidatePath("/minha-conta/pedidos");
  return { ok: true };
}

export async function cancelOrder(
  id: string,
  reason: string,
): Promise<ActionResult> {
  await requireAdmin("orders");
  const sb = createAdminClient();

  // A RPC devolve pontos e estoque numa transação só.
  const { error } = await sb.rpc("fn_cancel_order", {
    p_order_id: id,
    p_reason: reason || "Cancelado pelo painel",
  });
  if (error) return { ok: false, error: error.message };

  revalidatePath("/admin/orders");
  revalidatePath(`/admin/orders/${id}`);
  revalidatePath("/minha-conta/pedidos");
  revalidateStore();
  return { ok: true };
}

export async function saveOrderNote(
  id: string,
  formData: FormData,
): Promise<ActionResult> {
  await requireAdmin("orders");
  const sb = createAdminClient();
  const { error } = await sb
    .from("orders")
    .update({ admin_note: strOrNull(formData, "admin_note") })
    .eq("id", id);
  if (error) return { ok: false, error: error.message };
  revalidatePath(`/admin/orders/${id}`);
  return { ok: true };
}

// ============================================================
// CONFIGURAÇÕES DA STORE
// ============================================================

export async function saveStoreSettings(formData: FormData): Promise<ActionResult> {
  const { user } = await requireAdmin("store");

  const point_value_cents = intOrNull(formData, "point_value_cents");
  if (point_value_cents == null || point_value_cents <= 0)
    return { ok: false, error: "A cotação do ponto deve ser maior que zero." };

  const delivery_fee_cents = moneyToCents(formData, "delivery_fee") ?? 0;
  if (delivery_fee_cents < 0)
    return { ok: false, error: "Taxa de entrega não pode ser negativa." };

  const min_money_cents = moneyToCents(formData, "min_money") ?? 100;
  const free_above = moneyToCents(formData, "free_delivery_above");

  const sb = createAdminClient();
  const { error } = await sb
    .from("store_settings")
    .update({
      point_value_cents,
      delivery_enabled: bool(formData, "delivery_enabled"),
      delivery_fee_cents,
      free_delivery_above_cents: free_above && free_above > 0 ? free_above : null,
      delivery_note: strOrNull(formData, "delivery_note"),
      pickup_enabled: bool(formData, "pickup_enabled"),
      pickup_note: strOrNull(formData, "pickup_note"),
      min_money_cents,
      updated_by: user.id,
    })
    .eq("id", true);
  if (error) return { ok: false, error: error.message };

  revalidatePath("/admin/store");
  revalidateStore();
  return { ok: true };
}

/**
 * Recalcula o preço em pontos de todos os produtos pela cotação vigente.
 * Usado depois de mudar o valor do ponto — senão o catálogo fica incoerente.
 */
export async function repriceAllProducts(): Promise<
  { ok: true; updated: number } | { ok: false; error: string }
> {
  await requireAdmin("store");
  const sb = createAdminClient();
  const pointValue = await getPointValueCents();

  const { data: products, error } = await sb
    .from("products")
    .select("id, money_price_cents")
    .not("money_price_cents", "is", null);
  if (error) return { ok: false, error: error.message };

  let updated = 0;
  for (const p of products ?? []) {
    const points = pointsFromCents(p.money_price_cents as number, pointValue);
    const { error: upErr } = await sb
      .from("products")
      .update({ points_cost: points })
      .eq("id", p.id);
    if (!upErr) updated += 1;
  }

  revalidateStore();
  return { ok: true, updated };
}
