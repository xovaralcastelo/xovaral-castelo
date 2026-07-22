export type ProductCategory = "brinde" | "voucher" | "parceiro" | "outro";
export type ProductFulfillmentType = "voucher" | "pickup";
export type ProductStatus = "active" | "draft" | "archived";

/** Par label/valor da ficha técnica do produto */
export interface ProductSpec {
  label: string;
  value: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  description: string | null;
  image_url: string | null;
  /** legado — a categoria real vive em category_id/product_categories */
  category: ProductCategory;
  category_id: string | null;
  sku: string | null;
  subtitle: string | null;
  short_description: string | null;
  highlights: string[];
  specs: ProductSpec[];
  brand: string | null;
  badge: string | null;
  points_cost: number | null;
  money_price_cents: number | null;
  compare_at_price_cents: number | null;
  featured: boolean;
  allow_pickup: boolean;
  allow_delivery: boolean;
  has_variants: boolean;
  variant_label: string | null;
  fulfillment_type: ProductFulfillmentType;
  stock: number | null;
  status: ProductStatus;
  display_order: number;
  created_at: string;
  updated_at: string;
}

/** Produto com galeria, variações e categoria já resolvidas */
export interface ProductWithRelations extends Product {
  images: ProductImage[];
  variants: ProductVariant[];
  category_ref: ProductCategoryRow | null;
}

export interface ProductImage {
  id: string;
  product_id: string;
  url: string;
  storage_path: string | null;
  alt: string | null;
  display_order: number;
  created_at: string;
}

export type ProductVariantStatus = "active" | "archived";

export interface ProductVariant {
  id: string;
  product_id: string;
  label: string;
  sku: string | null;
  price_cents: number | null;
  points_cost: number | null;
  stock: number | null;
  status: ProductVariantStatus;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export type ProductCategoryStatus = "active" | "draft" | "archived";

export interface ProductCategoryRow {
  id: string;
  slug: string;
  name: string;
  description: string | null;
  image_url: string | null;
  display_order: number;
  status: ProductCategoryStatus;
  created_at: string;
  updated_at: string;
}

export const PRODUCT_CATEGORY_STATUSES: ProductCategoryStatus[] = [
  "active",
  "draft",
  "archived",
];

// ============================================================
// STORE SETTINGS
// ============================================================
export interface StoreSettings {
  id: boolean;
  point_value_cents: number;
  delivery_enabled: boolean;
  delivery_fee_cents: number;
  free_delivery_above_cents: number | null;
  delivery_note: string | null;
  pickup_enabled: boolean;
  pickup_note: string | null;
  min_money_cents: number;
  updated_at: string;
  updated_by: string | null;
}

export const DEFAULT_STORE_SETTINGS: StoreSettings = {
  id: true,
  point_value_cents: 5,
  delivery_enabled: true,
  delivery_fee_cents: 1000,
  free_delivery_above_cents: null,
  delivery_note: null,
  pickup_enabled: true,
  pickup_note: null,
  min_money_cents: 100,
  updated_at: new Date(0).toISOString(),
  updated_by: null,
};

// ============================================================
// ORDERS
// ============================================================
export type OrderStatus =
  | "pending_payment"
  | "paid"
  | "preparing"
  | "ready"
  | "delivered"
  | "cancelled";

export type OrderPaymentStatus =
  | "none"
  | "pending"
  | "approved"
  | "rejected"
  | "refunded";

export type DeliveryMethod = "pickup" | "delivery";

export interface Order {
  id: string;
  code: string;
  customer_id: string;
  status: OrderStatus;
  items_total_cents: number;
  delivery_fee_cents: number;
  total_cents: number;
  point_value_cents: number;
  points_used: number;
  points_value_cents: number;
  money_due_cents: number;
  delivery_method: DeliveryMethod;
  contact_name: string | null;
  contact_phone: string | null;
  address_cep: string | null;
  address_street: string | null;
  address_number: string | null;
  address_complement: string | null;
  address_district: string | null;
  address_city: string | null;
  address_state: string | null;
  address_notes: string | null;
  payment_status: OrderPaymentStatus;
  payment_method: string | null;
  mp_preference_id: string | null;
  mp_payment_id: string | null;
  paid_at: string | null;
  admin_note: string | null;
  cancel_reason: string | null;
  ready_at: string | null;
  delivered_at: string | null;
  cancelled_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface OrderItem {
  id: string;
  order_id: string;
  product_id: string;
  variant_id: string | null;
  name_snapshot: string;
  variant_snapshot: string | null;
  sku_snapshot: string | null;
  image_snapshot: string | null;
  unit_price_cents: number;
  quantity: number;
  line_total_cents: number;
  created_at: string;
}

export interface OrderWithItems extends Order {
  items: OrderItem[];
}

export const ORDER_STATUS_LABELS: Record<OrderStatus, string> = {
  pending_payment: "Aguardando pagamento",
  paid: "Pago",
  preparing: "Em separação",
  ready: "Pronto para retirada",
  delivered: "Entregue",
  cancelled: "Cancelado",
};

export const ORDER_PAYMENT_STATUS_LABELS: Record<OrderPaymentStatus, string> = {
  none: "Sem cobrança",
  pending: "Pagamento pendente",
  approved: "Pagamento aprovado",
  rejected: "Pagamento recusado",
  refunded: "Estornado",
};

export const DELIVERY_METHOD_LABELS: Record<DeliveryMethod, string> = {
  pickup: "Retirada na loja",
  delivery: "Entrega local",
};

// ============================================================
// POINTS LEDGER
// ============================================================
export type PointsLedgerReason =
  | "lavsync"
  | "order_spend"
  | "order_refund"
  | "redemption"
  | "manual"
  | "purchase";

export interface PointsLedgerEntry {
  id: string;
  customer_id: string;
  delta: number;
  reason: PointsLedgerReason;
  order_id: string | null;
  balance_after: number;
  note: string | null;
  created_by: string | null;
  created_at: string;
}

export const POINTS_LEDGER_REASON_LABELS: Record<PointsLedgerReason, string> = {
  lavsync: "Pontos por uso da lavanderia",
  order_spend: "Usado em pedido",
  order_refund: "Estorno de pedido",
  redemption: "Resgate",
  manual: "Ajuste manual",
  purchase: "Compra de pontos",
};

export type RedemptionStatus = "pending" | "fulfilled" | "cancelled";

export interface Redemption {
  id: string;
  customer_id: string;
  product_id: string;
  points_spent: number;
  voucher_code: string | null;
  status: RedemptionStatus;
  note: string | null;
  created_at: string;
  fulfilled_at: string | null;
  fulfilled_by: string | null;
}

export interface Customer {
  id: string;
  full_name: string | null;
  email: string | null;
  avatar_url: string | null;
  lifetime_points: number;
  joined_at: string;
}

export interface CycleEvent {
  id: string;
  customer_id: string;
  cycles: number;
  points_earned: number;
  note: string | null;
  occurred_at: string;
  created_by: string | null;
  created_at: string;
}

export const PRODUCT_CATEGORIES: ProductCategory[] = [
  "brinde",
  "voucher",
  "parceiro",
  "outro",
];

export const PRODUCT_STATUSES: ProductStatus[] = [
  "active",
  "draft",
  "archived",
];

export const PRODUCT_FULFILLMENT_TYPES: ProductFulfillmentType[] = [
  "voucher",
  "pickup",
];

export function formatCents(cents: number | null): string {
  if (cents == null) return "—";
  return (cents / 100).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

// ============================================================
// PARTNERS
// ============================================================
export type PartnerCategory =
  | "academia" | "restaurante" | "condominio" | "faculdade"
  | "salao"    | "servico"     | "comercio"   | "outro";

export type PartnerStatus = "active" | "draft" | "archived";

export interface Partner {
  id: string;
  slug: string;
  name: string;
  category: PartnerCategory;
  description: string | null;
  logo_url: string | null;
  website_url: string | null;
  whatsapp: string | null;
  benefit_text: string | null;
  status: PartnerStatus;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export const PARTNER_CATEGORIES: PartnerCategory[] = [
  "academia", "restaurante", "condominio", "faculdade",
  "salao",    "servico",     "comercio",   "outro",
];

export const PARTNER_STATUSES: PartnerStatus[] = ["active", "draft", "archived"];

// ============================================================
// TESTIMONIALS
// ============================================================
export type TestimonialStatus = "active" | "draft" | "archived";

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  text: string;
  avatar_initial: string | null;
  stars: number;
  display_order: number;
  status: TestimonialStatus;
  created_at: string;
  updated_at: string;
}

export const TESTIMONIAL_STATUSES: TestimonialStatus[] = ["active", "draft", "archived"];

// ============================================================
// CONTENT BLOCKS
// ============================================================
export interface ContentBlock {
  key: string;
  value: string;
  updated_at: string;
  updated_by: string | null;
}

// ============================================================
// STAFF (equipe do painel admin)
// ============================================================
export type StaffRole = "admin" | "staff";
export type StaffStatus = "active" | "inactive";

export interface StaffMember {
  id: string;
  email: string;
  name: string;
  role: StaffRole;
  permissions: string[];
  status: StaffStatus;
  created_at: string;
  updated_at: string;
}

export const STAFF_ROLES: StaffRole[] = ["admin", "staff"];
export const STAFF_STATUSES: StaffStatus[] = ["active", "inactive"];

/** Seções do painel admin que podem ser liberadas por colaborador */
export const ADMIN_SECTION_OPTIONS = [
  { key: "content", label: "Conteúdo do site" },
  { key: "testimonials", label: "Depoimentos" },
  { key: "partners", label: "Parceiros" },
  { key: "products", label: "Produtos (Store)" },
  { key: "categories", label: "Categorias (Store)" },
  { key: "orders", label: "Pedidos (Store)" },
  { key: "store", label: "Configurações da Store" },
  { key: "customers", label: "Clientes (Clube)" },
  { key: "redemptions", label: "Resgates" },
] as const;

// ============================================================
// PARTNER APPLICATIONS (solicitações de parceria do site)
// ============================================================
export type PartnerApplicationStatus = "pending" | "approved" | "rejected";

export interface PartnerApplication {
  id: string;
  business_name: string;
  contact_name: string;
  email: string;
  whatsapp: string;
  category: PartnerCategory;
  instagram: string | null;
  website_url: string | null;
  message: string | null;
  status: PartnerApplicationStatus;
  reviewed_by: string | null;
  reviewed_at: string | null;
  created_at: string;
  updated_at: string;
}

export const PARTNER_CATEGORY_LABELS: Record<PartnerCategory, string> = {
  academia: "Academia",
  restaurante: "Restaurante / Bistrô",
  condominio: "Condomínio",
  faculdade: "Faculdade",
  salao: "Salão / Beleza",
  servico: "Serviço",
  comercio: "Comércio",
  outro: "Outro",
};

// ============================================================
// PARTNER PROMOS (banners de promoção do Clube de Benefícios)
// ============================================================
export type PartnerPromoStatus = "active" | "draft" | "archived";

export interface PartnerPromo {
  id: string;
  slug: string;
  title: string;
  partner_name: string;
  banner_url: string;
  summary: string | null;
  details: string | null;
  conditions: string | null;
  cta_label: string | null;
  cta_url: string | null;
  status: PartnerPromoStatus;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export const PARTNER_PROMO_STATUSES: PartnerPromoStatus[] = [
  "active",
  "draft",
  "archived",
];
