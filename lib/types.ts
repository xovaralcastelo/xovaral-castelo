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
