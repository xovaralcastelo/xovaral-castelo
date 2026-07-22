"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import type { DeliveryMethod, Order } from "@/lib/types";

const ERR: Record<string, string> = {
  not_authenticated: "Você precisa estar logado.",
  product_not_found: "Produto não encontrado.",
  product_inactive: "Produto indisponível.",
  product_not_redeemable: "Esse produto não pode ser trocado por pontos.",
  product_out_of_stock: "Produto sem estoque.",
  insufficient_points: "Você não tem pontos suficientes.",
  // Criação de pedido (fn_create_order)
  empty_cart: "Seu carrinho está vazio.",
  invalid_delivery_method: "Forma de entrega inválida.",
  delivery_unavailable: "Entrega indisponível no momento.",
  pickup_unavailable: "Retirada na loja indisponível no momento.",
  address_required: "Informe o endereço de entrega.",
  invalid_quantity: "Quantidade inválida.",
  product_without_price: "Um dos produtos está sem preço definido.",
  product_pickup_unavailable: "Um dos produtos não está disponível para retirada.",
  product_delivery_unavailable: "Um dos produtos não está disponível para entrega.",
  variant_not_found: "Variação não encontrada.",
  variant_inactive: "Variação indisponível.",
  variant_required: "Escolha uma variação do produto.",
  out_of_stock: "Um dos produtos ficou sem estoque.",
  customer_not_found: "Conta de cliente não encontrada.",
  money_due_below_minimum:
    "O valor restante em dinheiro ficou abaixo do mínimo. Use menos pontos ou feche 100% em pontos.",
};

export type RedeemResult =
  | {
      ok: true;
      voucherCode: string | null;
      redemptionId: string;
      status: "pending" | "fulfilled";
      fulfillmentType: "voucher" | "pickup";
    }
  | { ok: false; error: string };

export async function redeemProduct(
  productId: string,
  productSlug: string,
  fulfillmentType: "voucher" | "pickup",
): Promise<RedeemResult> {
  const supabase = createClient();
  const { data, error } = await supabase
    .rpc("fn_redeem_product", { p_product_id: productId })
    .single<{
      id: string;
      voucher_code: string | null;
      status: "pending" | "fulfilled";
    }>();

  if (error) {
    const key = (error.message ?? "").trim();
    return { ok: false, error: ERR[key] ?? "Não foi possível concluir o resgate." };
  }
  if (!data) {
    return { ok: false, error: "Resposta vazia do servidor." };
  }

  revalidatePath("/store");
  revalidatePath(`/store/${productSlug}`);
  revalidatePath("/minha-conta");
  revalidatePath("/minha-conta/resgates");

  return {
    ok: true,
    voucherCode: data.voucher_code,
    redemptionId: data.id,
    status: data.status,
    fulfillmentType,
  };
}

// ============================================================
// Criação de pedido (checkout)
// ============================================================

export interface CheckoutItemInput {
  productId: string;
  variantId: string | null;
  quantity: number;
}

export interface CheckoutInput {
  items: CheckoutItemInput[];
  pointsToUse: number;
  deliveryMethod: DeliveryMethod;
  contact: { name: string; phone: string };
  address: {
    cep?: string;
    street?: string;
    number?: string;
    complement?: string;
    district?: string;
    city?: string;
    state?: string;
    notes?: string;
  };
}

export type CreateOrderResult =
  | { ok: true; code: string; moneyDueCents: number; status: Order["status"] }
  | { ok: false; error: string };

export async function createOrder(
  input: CheckoutInput,
): Promise<CreateOrderResult> {
  const supabase = createClient();

  // Guard de sessão antes do RPC, para uma mensagem melhor.
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { ok: false, error: ERR.not_authenticated };

  if (!input.items || input.items.length === 0) {
    return { ok: false, error: ERR.empty_cart };
  }

  // Sanitiza os itens — o servidor só confia em id/variação/quantidade;
  // o fn_create_order recalcula todos os preços a partir do banco.
  const items = input.items.map((i) => ({
    product_id: i.productId,
    variant_id: i.variantId,
    quantity: Math.max(1, Math.floor(i.quantity)),
  }));

  const { data, error } = await supabase
    .rpc("fn_create_order", {
      p_items: items,
      p_points_to_use: Math.max(0, Math.floor(input.pointsToUse || 0)),
      p_delivery_method: input.deliveryMethod,
      p_contact: {
        name: input.contact.name?.trim() ?? "",
        phone: input.contact.phone?.trim() ?? "",
      },
      p_address: input.address ?? {},
    })
    .single<Order>();

  if (error) {
    const key = (error.message ?? "").trim();
    return { ok: false, error: ERR[key] ?? "Não foi possível concluir o pedido." };
  }
  if (!data) return { ok: false, error: "Resposta vazia do servidor." };

  revalidatePath("/store");
  revalidatePath("/minha-conta");
  revalidatePath("/minha-conta/pedidos");

  return {
    ok: true,
    code: data.code,
    moneyDueCents: data.money_due_cents,
    status: data.status,
  };
}
