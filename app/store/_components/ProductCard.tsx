import Link from "next/link";
import { formatCents, type Product } from "@/lib/types";
import { Gift, ShoppingBag } from "lucide-react";

export function ProductCard({ product }: { product: Product }) {
  const outOfStock = product.stock != null && product.stock <= 0;
  return (
    <Link
      href={`/store/${product.slug}`}
      className="group block bg-white rounded-3xl shadow-card ring-1 ring-xv-gray-200/60 overflow-hidden transition hover:shadow-xl hover:-translate-y-1"
    >
      <div className="relative aspect-[4/3] bg-xv-gray-100 overflow-hidden">
        {product.image_url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={product.image_url}
            alt={product.name}
            className="h-full w-full object-cover transition group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="h-full w-full flex items-center justify-center text-xv-gray-300">
            <Gift size={64} />
          </div>
        )}
        {outOfStock ? (
          <span className="absolute top-3 right-3 rounded-full bg-red-500 px-3 py-1 text-xs font-bold text-white">
            esgotado
          </span>
        ) : null}
      </div>

      <div className="p-5">
        <p className="text-xs font-bold uppercase tracking-wider text-xv-gray-500">
          {product.category}
        </p>
        <h3 className="mt-1 font-display text-lg font-bold text-xv-navy line-clamp-2">
          {product.name}
        </h3>

        <div className="mt-4 flex items-center justify-between gap-2 flex-wrap">
          {product.points_cost ? (
            <div className="flex items-center gap-1.5 text-sm font-bold text-xv-orange">
              <Gift size={14} />
              {product.points_cost} pts
            </div>
          ) : null}
          {product.money_price_cents ? (
            <div className="flex items-center gap-1.5 text-sm font-bold text-xv-navy">
              <ShoppingBag size={14} />
              {formatCents(product.money_price_cents)}
            </div>
          ) : null}
        </div>
      </div>
    </Link>
  );
}
