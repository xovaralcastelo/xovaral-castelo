export type ProductCategory = "brinde" | "voucher" | "parceiro" | "outro";
export type ProductFulfillmentType = "voucher" | "pickup";
export type ProductStatus = "active" | "draft" | "archived";

export interface Product {
  id: string;
  slug: string;
  name: string;
  description: string | null;
  image_url: string | null;
  category: ProductCategory;
  points_cost: number | null;
  money_price_cents: number | null;
  fulfillment_type: ProductFulfillmentType;
  stock: number | null;
  status: ProductStatus;
  display_order: number;
  created_at: string;
  updated_at: string;
}

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
  { key: "customers", label: "Clientes (Clube)" },
  { key: "redemptions", label: "Resgates" },
] as const;
