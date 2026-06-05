"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

const ERR: Record<string, string> = {
  not_authenticated: "Você precisa estar logado.",
  product_not_found: "Produto não encontrado.",
  product_inactive: "Produto indisponível.",
  product_not_redeemable: "Esse produto não pode ser trocado por pontos.",
  product_out_of_stock: "Produto sem estoque.",
  insufficient_points: "Você não tem pontos suficientes.",
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
