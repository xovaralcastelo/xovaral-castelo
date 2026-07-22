import Link from "next/link";
import { ArrowRight, Gift } from "lucide-react";
import type { ProductWithRelations } from "@/lib/types";
import {
  formatBRL,
  formatPoints,
  isOutOfStock,
  pointsFromCents,
  priceRangeCents,
} from "@/lib/store-pricing";

interface Props {
  product: ProductWithRelations;
  pointValueCents: number;
}

export function ProductCard({ product, pointValueCents }: Props) {
  const outOfStock = isOutOfStock(product);
  const cover = product.images[0]?.url ?? product.image_url;
  const { min, max } = priceRangeCents(product);
  const points =
    min != null ? (product.points_cost ?? pointsFromCents(min, pointValueCents)) : null;

  const hasDiscount =
    product.compare_at_price_cents != null &&
    min != null &&
    product.compare_at_price_cents > min;

  return (
    <Link
      href={`/store/${product.slug}`}
      className="group flex flex-col bg-white rounded-3xl shadow-card ring-1 ring-xv-gray-200/60 overflow-hidden transition hover:shadow-xl hover:-translate-y-1"
    >
      <div className="relative aspect-[4/3] bg-xv-gray-100 overflow-hidden">
        {cover ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={cover}
            alt={product.images[0]?.alt ?? product.name}
            className={`h-full w-full object-cover transition group-hover:scale-105 ${
              outOfStock ? "opacity-50" : ""
            }`}
            loading="lazy"
          />
        ) : (
          <div className="h-full w-full flex items-center justify-center text-xv-gray-300">
            <Gift size={64} />
          </div>
        )}

        <div className="absolute top-3 left-3 flex flex-col items-start gap-1.5">
          {product.badge ? (
            <span className="rounded-full bg-xv-navy px-3 py-1 text-[11px] font-bold text-white">
              {product.badge}
            </span>
          ) : null}
          {hasDiscount ? (
            <span className="rounded-full bg-xv-orange px-3 py-1 text-[11px] font-bold text-white">
              oferta
            </span>
          ) : null}
        </div>

        {outOfStock ? (
          <span className="absolute top-3 right-3 rounded-full bg-red-500 px-3 py-1 text-[11px] font-bold text-white">
            esgotado
          </span>
        ) : null}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <p className="text-xs font-bold uppercase tracking-wider text-xv-gray-500">
          {product.category_ref?.name ?? product.brand ?? "Store"}
        </p>
        <h3 className="mt-1 font-display text-lg font-bold text-xv-navy line-clamp-2">
          {product.name}
        </h3>
        {product.subtitle ? (
          <p className="mt-1 text-sm text-xv-gray-700 line-clamp-2">
            {product.subtitle}
          </p>
        ) : null}

        <div className="mt-4 pt-4 border-t border-xv-gray-200/70">
          {min == null ? (
            <p className="text-sm font-bold text-xv-gray-500">Sob consulta</p>
          ) : (
            <>
              {hasDiscount ? (
                <p className="text-xs text-xv-gray-500 line-through">
                  {formatBRL(product.compare_at_price_cents!)}
                </p>
              ) : null}
              <p className="font-display text-xl font-black text-xv-navy">
                {max != null && max !== min ? "a partir de " : ""}
                {formatBRL(min)}
              </p>
              {points != null ? (
                <p className="mt-0.5 text-xs font-bold text-xv-orange">
                  ou {formatPoints(points)} pontos
                </p>
              ) : null}
            </>
          )}
        </div>

        <div className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-xv-orange">
          Ver detalhes
          <ArrowRight size={12} className="transition group-hover:translate-x-0.5" />
        </div>
      </div>
    </Link>
  );
}
