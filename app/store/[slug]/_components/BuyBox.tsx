"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Check, Minus, MessageCircle, Plus, ShoppingCart } from "lucide-react";
import type { ProductWithRelations, StoreSettings } from "@/lib/types";
import { formatBRL, formatPoints, pointsFromCents } from "@/lib/store-pricing";
import { useCart } from "@/app/store/_cart/CartContext";

interface Props {
  product: ProductWithRelations;
  settings: StoreSettings;
  whatsapp: string;
  productUrl: string;
}

const MAX_QTY = 10;

export function BuyBox({ product, settings, whatsapp, productUrl }: Props) {
  const router = useRouter();
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  const variants = product.variants;
  const usesVariants = product.has_variants && variants.length > 0;

  const firstAvailable = usesVariants
    ? variants.findIndex((v) => v.stock == null || v.stock > 0)
    : -1;
  const [variantIdx, setVariantIdx] = useState(
    firstAvailable >= 0 ? firstAvailable : 0,
  );
  const [qty, setQty] = useState(1);

  const cover = product.images[0]?.url ?? product.image_url;

  function handleAddToCart(qtyToAdd: number, goToCart: boolean) {
    if (unitCents == null) return;
    addItem(
      {
        productId: product.id,
        slug: product.slug,
        name: product.name,
        image: cover,
        variantId: variant?.id ?? null,
        variantLabel: variant?.label ?? null,
        unitPriceCents: unitCents,
        maxStock: stock,
        allowPickup: product.allow_pickup,
        allowDelivery: product.allow_delivery,
      },
      qtyToAdd,
    );
    if (goToCart) {
      router.push("/store/carrinho");
    } else {
      setAdded(true);
      setTimeout(() => setAdded(false), 2000);
    }
  }

  const variant = usesVariants ? variants[variantIdx] : null;

  const unitCents = variant?.price_cents ?? product.money_price_cents;
  const stock = variant ? variant.stock : product.stock;
  const outOfStock = stock != null && stock <= 0;
  const maxQty = Math.min(MAX_QTY, stock ?? MAX_QTY);

  const pointsPrice = useMemo(() => {
    if (unitCents == null) return null;
    const override = variant?.points_cost ?? product.points_cost;
    return override ?? pointsFromCents(unitCents, settings.point_value_cents);
  }, [unitCents, variant, product.points_cost, settings.point_value_cents]);

  const hasDiscount =
    product.compare_at_price_cents != null &&
    unitCents != null &&
    product.compare_at_price_cents > unitCents;

  const whatsappUrl = useMemo(() => {
    const lines = [
      "Olá! Vim pela Store Xô Varal e tenho interesse em:",
      "",
      `• ${product.name}`,
      variant ? `• ${product.variant_label ?? "Variação"}: ${variant.label}` : null,
      `• Quantidade: ${qty}`,
      unitCents != null ? `• Valor unitário: ${formatBRL(unitCents)}` : null,
      `• Link: ${productUrl}`,
      "",
      "Podem me passar mais informações?",
    ].filter(Boolean);
    return `https://wa.me/${whatsapp}?text=${encodeURIComponent(lines.join("\n"))}`;
  }, [product.name, product.variant_label, variant, qty, unitCents, productUrl, whatsapp]);

  // Rede de segurança: a quantidade nunca passa do estoque da opção escolhida.
  const safeQty = Math.max(1, Math.min(qty, maxQty || 1));

  return (
    <div className="mt-6 rounded-3xl bg-white p-6 shadow-card ring-1 ring-xv-gray-200/60">
      {/* Preço */}
      {unitCents == null ? (
        <p className="font-display text-2xl font-black text-xv-gray-500">
          Sob consulta
        </p>
      ) : (
        <div>
          {hasDiscount ? (
            <p className="text-sm text-xv-gray-500 line-through">
              {formatBRL(product.compare_at_price_cents!)}
            </p>
          ) : null}
          <p className="font-display text-3xl font-black text-xv-navy">
            {formatBRL(unitCents)}
          </p>
          {pointsPrice != null ? (
            <p className="mt-1 text-sm font-bold text-xv-orange">
              ou {formatPoints(pointsPrice)} pontos — ou combine pontos + dinheiro
            </p>
          ) : null}
        </div>
      )}

      {/* Variações */}
      {usesVariants ? (
        <fieldset className="mt-6">
          <legend className="text-xs font-bold uppercase tracking-wider text-xv-gray-500">
            {product.variant_label ?? "Escolha uma opção"}
          </legend>
          <div className="mt-2 flex flex-wrap gap-2">
            {variants.map((v, i) => {
              const off = v.stock != null && v.stock <= 0;
              const selected = i === variantIdx;
              return (
                <button
                  key={v.id}
                  type="button"
                  disabled={off}
                  onClick={() => {
                    setVariantIdx(i);
                    setQty(1);
                  }}
                  aria-pressed={selected}
                  className={`rounded-full px-4 py-2 text-sm font-bold transition ${
                    off
                      ? "cursor-not-allowed bg-xv-gray-100 text-xv-gray-300 line-through"
                      : selected
                        ? "bg-xv-navy text-white shadow-md"
                        : "bg-white text-xv-navy ring-1 ring-xv-gray-200/60 hover:ring-xv-orange"
                  }`}
                >
                  {v.label}
                </button>
              );
            })}
          </div>
        </fieldset>
      ) : null}

      {/* Estoque */}
      {stock != null && stock > 0 && stock <= 5 ? (
        <p className="mt-4 text-xs font-bold text-xv-orange">
          Últimas {stock} unidades
        </p>
      ) : null}

      {outOfStock ? (
        <div className="mt-6 rounded-2xl bg-red-50 px-5 py-4 text-sm text-red-800 ring-1 ring-red-200">
          {usesVariants
            ? "Essa opção está esgotada. Escolha outra acima."
            : "Esse produto está temporariamente esgotado. Volte em breve!"}
        </div>
      ) : (
        <>
          {/* Quantidade */}
          <div className="mt-6 flex items-center gap-4">
            <span className="text-xs font-bold uppercase tracking-wider text-xv-gray-500">
              Quantidade
            </span>
            <div className="inline-flex items-center rounded-full ring-1 ring-xv-gray-200/60">
              <button
                type="button"
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                disabled={safeQty <= 1}
                aria-label="Diminuir quantidade"
                className="grid h-10 w-10 place-items-center rounded-l-full text-xv-navy transition hover:bg-xv-gray-100 disabled:text-xv-gray-300"
              >
                <Minus size={14} />
              </button>
              <span className="w-10 text-center font-display font-bold text-xv-navy">
                {safeQty}
              </span>
              <button
                type="button"
                onClick={() => setQty((q) => Math.min(maxQty, q + 1))}
                disabled={safeQty >= maxQty}
                aria-label="Aumentar quantidade"
                className="grid h-10 w-10 place-items-center rounded-r-full text-xv-navy transition hover:bg-xv-gray-100 disabled:text-xv-gray-300"
              >
                <Plus size={14} />
              </button>
            </div>
          </div>

          {unitCents != null && safeQty > 1 ? (
            <p className="mt-3 text-sm text-xv-gray-700">
              Total:{" "}
              <strong className="font-display text-xv-navy">
                {formatBRL(unitCents * safeQty)}
              </strong>
            </p>
          ) : null}

          <div className="mt-6 space-y-3">
            <button
              type="button"
              onClick={() => handleAddToCart(safeQty, true)}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-xv-orange px-6 py-4 text-sm font-bold text-white shadow-md transition hover:bg-xv-orange-light"
            >
              <ShoppingCart size={16} />
              Comprar agora
            </button>
            <button
              type="button"
              onClick={() => handleAddToCart(safeQty, false)}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-bold text-xv-navy ring-1 ring-xv-gray-200/60 transition hover:ring-xv-orange"
            >
              {added ? (
                <>
                  <Check size={16} className="text-green-600" />
                  Adicionado ao carrinho
                </>
              ) : (
                <>
                  <Plus size={16} />
                  Adicionar ao carrinho
                </>
              )}
            </button>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full items-center justify-center gap-2 text-xs font-bold text-[#128C4A] transition hover:underline"
            >
              <MessageCircle size={14} />
              Prefere combinar pelo WhatsApp?
            </a>
          </div>
        </>
      )}

      {/* Entrega */}
      <div className="mt-6 space-y-1.5 border-t border-xv-gray-200/70 pt-5 text-xs text-xv-gray-700">
        {product.allow_pickup && settings.pickup_enabled ? (
          <p>
            <strong className="text-xv-navy">Retirada na loja</strong>
            {settings.pickup_note ? ` — ${settings.pickup_note}` : ""}
          </p>
        ) : null}
        {product.allow_delivery && settings.delivery_enabled ? (
          <p>
            <strong className="text-xv-navy">Entrega</strong> —{" "}
            {settings.delivery_fee_cents === 0
              ? "grátis"
              : formatBRL(settings.delivery_fee_cents)}
            {settings.free_delivery_above_cents != null
              ? `, grátis acima de ${formatBRL(settings.free_delivery_above_cents)}`
              : ""}
            {settings.delivery_note ? ` — ${settings.delivery_note}` : ""}
          </p>
        ) : null}
      </div>
    </div>
  );
}
