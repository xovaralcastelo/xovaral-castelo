import { createClient } from "@/lib/supabase/server";
import {
  DEFAULT_STORE_SETTINGS,
  type Order,
  type OrderItem,
  type OrderWithItems,
  type Product,
  type ProductCategoryRow,
  type ProductImage,
  type ProductVariant,
  type ProductWithRelations,
  type StoreSettings,
} from "@/lib/types";

// Reexportado para quem já importava daqui; a implementação pura vive
// em lib/store-pricing.ts (importável também de componentes client).
export {
  pointsFromCents,
  centsFromPoints,
  productPointsPrice,
  maxUsablePoints,
  formatPoints,
  formatBRL,
  splitPayment,
  priceRangeCents,
  availableStock,
  isOutOfStock,
} from '@/lib/store-pricing';

// ============================================================
// Leitura da loja (server components)
// ============================================================

export async function getStoreSettings(): Promise<StoreSettings> {
  const supabase = createClient();
  const { data } = await supabase
    .from("store_settings")
    .select("*")
    .eq("id", true)
    .maybeSingle<StoreSettings>();
  return data ?? DEFAULT_STORE_SETTINGS;
}

export async function getActiveCategories(): Promise<ProductCategoryRow[]> {
  const supabase = createClient();
  const { data } = await supabase
    .from("product_categories")
    .select("*")
    .eq("status", "active")
    .order("display_order", { ascending: true });
  return (data ?? []) as ProductCategoryRow[];
}

export interface ProductQuery {
  categorySlug?: string;
  search?: string;
  sort?: "relevancia" | "menor-preco" | "maior-preco" | "novidades";
  page?: number;
  perPage?: number;
  featuredOnly?: boolean;
}

export interface ProductListResult {
  products: ProductWithRelations[];
  total: number;
  page: number;
  perPage: number;
  totalPages: number;
}

const SELECT_WITH_RELATIONS = `
  *,
  images:product_images(*),
  variants:product_variants(*),
  category_ref:product_categories(*)
`;

/** Ordena galeria e variações que o Postgrest devolve sem ordem garantida. */
function normalize(row: any): ProductWithRelations {
  const images = ((row.images ?? []) as ProductImage[])
    .slice()
    .sort((a, b) => a.display_order - b.display_order);
  const variants = ((row.variants ?? []) as ProductVariant[])
    .filter((v) => v.status === "active")
    .slice()
    .sort((a, b) => a.display_order - b.display_order);

  return {
    ...(row as Product),
    highlights: Array.isArray(row.highlights) ? row.highlights : [],
    specs: Array.isArray(row.specs) ? row.specs : [],
    images,
    variants,
    category_ref: (row.category_ref ?? null) as ProductCategoryRow | null,
  };
}

export async function listProducts(
  query: ProductQuery = {},
): Promise<ProductListResult> {
  const supabase = createClient();
  const page = Math.max(1, query.page ?? 1);
  const perPage = query.perPage ?? 24;
  const from = (page - 1) * perPage;

  let q = supabase
    .from("products")
    .select(SELECT_WITH_RELATIONS, { count: "exact" })
    .eq("status", "active");

  if (query.featuredOnly) q = q.eq("featured", true);

  if (query.categorySlug) {
    const { data: cat } = await supabase
      .from("product_categories")
      .select("id")
      .eq("slug", query.categorySlug)
      .maybeSingle();
    // Categoria inexistente não pode virar "todos os produtos".
    q = q.eq("category_id", cat?.id ?? "00000000-0000-0000-0000-000000000000");
  }

  const term = query.search?.trim();
  if (term) {
    q = q.textSearch("search_tsv", term, {
      type: "websearch",
      config: "portuguese",
    });
  }

  switch (query.sort) {
    case "menor-preco":
      q = q.order("money_price_cents", { ascending: true, nullsFirst: false });
      break;
    case "maior-preco":
      q = q.order("money_price_cents", { ascending: false, nullsFirst: false });
      break;
    case "novidades":
      q = q.order("created_at", { ascending: false });
      break;
    default:
      q = q
        .order("featured", { ascending: false })
        .order("display_order", { ascending: true })
        .order("created_at", { ascending: false });
  }

  const { data, count } = await q.range(from, from + perPage - 1);
  const total = count ?? 0;

  return {
    products: (data ?? []).map(normalize),
    total,
    page,
    perPage,
    totalPages: Math.max(1, Math.ceil(total / perPage)),
  };
}

export async function getProductBySlug(
  slug: string,
): Promise<ProductWithRelations | null> {
  const supabase = createClient();
  const { data } = await supabase
    .from("products")
    .select(SELECT_WITH_RELATIONS)
    .eq("slug", slug)
    .eq("status", "active")
    .maybeSingle();
  return data ? normalize(data) : null;
}

/** Produtos da mesma categoria, exceto o atual. */
export async function getRelatedProducts(
  product: ProductWithRelations,
  limit = 4,
): Promise<ProductWithRelations[]> {
  if (!product.category_id) return [];
  const supabase = createClient();
  const { data } = await supabase
    .from("products")
    .select(SELECT_WITH_RELATIONS)
    .eq("status", "active")
    .eq("category_id", product.category_id)
    .neq("id", product.id)
    .order("display_order", { ascending: true })
    .limit(limit);
  return (data ?? []).map(normalize);
}

/** Saldo de pontos do cliente logado — null quando não há sessão. */
export async function getMyPointsBalance(): Promise<number | null> {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const { data } = await supabase
    .from("customers")
    .select("lifetime_points")
    .eq("id", user.id)
    .maybeSingle<{ lifetime_points: number }>();

  return data?.lifetime_points ?? 0;
}

export async function getMyOrders(): Promise<Order[]> {
  const supabase = createClient();
  const { data } = await supabase
    .from("orders")
    .select("*")
    .order("created_at", { ascending: false });
  return (data ?? []) as Order[];
}

/** Pedido do cliente logado pelo código (RLS já restringe aos próprios). */
export async function getMyOrderByCode(
  code: string,
): Promise<OrderWithItems | null> {
  const supabase = createClient();
  const { data } = await supabase
    .from("orders")
    .select("*, items:order_items(*)")
    .eq("code", code)
    .maybeSingle();
  if (!data) return null;
  const items = ((data as any).items ?? []) as OrderItem[];
  return { ...(data as Order), items } as OrderWithItems;
}
