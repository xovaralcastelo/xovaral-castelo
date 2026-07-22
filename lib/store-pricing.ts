import type { Product, ProductWithRelations, StoreSettings } from "@/lib/types";

// ============================================================
// Helpers puros da loja — sem Supabase, sem next/headers.
//
// Vivem separados de lib/store.ts porque componentes client
// (BuyBox, etc.) precisam deles: importar lib/store.ts do client
// arrastaria o createClient de servidor e quebraria o build.
//
// Conversão pontos <-> dinheiro: o preço em REAIS é a verdade.
// O preço em pontos é derivado dele pela cotação vigente
// (padrão: 1 ponto = R$ 0,05). Quando o admin grava um
// points_cost próprio, ele vence — é a exceção consciente.
// ============================================================

/** Quantos pontos custam um valor em centavos (arredonda pra cima). */
export function pointsFromCents(cents: number, pointValueCents: number): number {
  if (pointValueCents <= 0) return 0;
  return Math.ceil(cents / pointValueCents);
}

/** Quanto valem, em centavos, N pontos. */
export function centsFromPoints(points: number, pointValueCents: number): number {
  return Math.max(0, Math.round(points)) * pointValueCents;
}

/** Preço em pontos exibido para o produto: override do admin ou derivado do preço. */
export function productPointsPrice(
  product: Pick<Product, "points_cost" | "money_price_cents">,
  pointValueCents: number,
): number | null {
  if (product.points_cost != null) return product.points_cost;
  if (product.money_price_cents == null) return null;
  return pointsFromCents(product.money_price_cents, pointValueCents);
}

/** Máximo de pontos úteis num pedido: não adianta passar do total. */
export function maxUsablePoints(
  totalCents: number,
  balance: number,
  pointValueCents: number,
): number {
  if (pointValueCents <= 0) return 0;
  return Math.max(0, Math.min(balance, Math.floor(totalCents / pointValueCents)));
}

export function formatPoints(points: number): string {
  return points.toLocaleString("pt-BR");
}

export function formatBRL(cents: number): string {
  return (cents / 100).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

/**
 * Divide um total entre pontos e dinheiro, respeitando o valor mínimo
 * cobrável no gateway. Se o troco em dinheiro ficar entre R$0,01 e o mínimo,
 * reduz os pontos usados até o restante voltar a ser cobrável.
 */
export function splitPayment(
  totalCents: number,
  pointsToUse: number,
  settings: Pick<StoreSettings, "point_value_cents" | "min_money_cents">,
): { points: number; pointsValueCents: number; moneyDueCents: number } {
  const pv = settings.point_value_cents;
  let points = Math.max(0, Math.min(pointsToUse, Math.floor(totalCents / pv)));
  let moneyDue = totalCents - points * pv;

  if (moneyDue > 0 && moneyDue < settings.min_money_cents) {
    const needed = Math.ceil((settings.min_money_cents - moneyDue) / pv);
    points = Math.max(0, points - needed);
    moneyDue = totalCents - points * pv;
  }

  return { points, pointsValueCents: points * pv, moneyDueCents: moneyDue };
}

/**
 * Faixa de preço em centavos considerando as variações ativas. Variação sem
 * preço próprio herda o do produto — a mesma regra que o fn_create_order aplica.
 */
export function priceRangeCents(product: ProductWithRelations): {
  min: number | null;
  max: number | null;
} {
  if (product.has_variants && product.variants.length > 0) {
    const prices = product.variants
      .map((v) => v.price_cents ?? product.money_price_cents)
      .filter((p): p is number => p != null);
    if (prices.length === 0) return { min: null, max: null };
    return { min: Math.min(...prices), max: Math.max(...prices) };
  }
  return { min: product.money_price_cents, max: product.money_price_cents };
}

/** Estoque disponível de um produto (soma das variações quando houver). */
export function availableStock(product: ProductWithRelations): number | null {
  if (product.has_variants) {
    const withStock = product.variants.filter((v) => v.stock != null);
    if (withStock.length === 0) return null;
    return withStock.reduce((sum, v) => sum + (v.stock ?? 0), 0);
  }
  return product.stock;
}

export function isOutOfStock(product: ProductWithRelations): boolean {
  const stock = availableStock(product);
  return stock != null && stock <= 0;
}
