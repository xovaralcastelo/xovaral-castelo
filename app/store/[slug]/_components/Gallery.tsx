"use client";

import { useState } from "react";
import { Package } from "lucide-react";
import type { ProductImage } from "@/lib/types";

interface Props {
  images: ProductImage[];
  productName: string;
}

export function Gallery({ images, productName }: Props) {
  const [active, setActive] = useState(0);

  if (images.length === 0) {
    return (
      <div className="flex aspect-square items-center justify-center rounded-3xl bg-white text-xv-gray-300 shadow-card ring-1 ring-xv-gray-200/60">
        <Package size={96} />
      </div>
    );
  }

  const current = images[Math.min(active, images.length - 1)];

  return (
    <div>
      <div className="aspect-square overflow-hidden rounded-3xl bg-white shadow-card ring-1 ring-xv-gray-200/60">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={current.url}
          alt={current.alt ?? productName}
          className="h-full w-full object-cover"
        />
      </div>

      {images.length > 1 ? (
        <div className="mt-3 flex gap-3 overflow-x-auto pb-1">
          {images.map((img, i) => (
            <button
              key={img.id}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Ver imagem ${i + 1} de ${images.length}`}
              aria-current={i === active}
              className={`h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-white ring-1 transition ${
                i === active
                  ? "ring-2 ring-xv-orange"
                  : "ring-xv-gray-200/60 hover:ring-xv-orange/50"
              }`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={img.url}
                alt={img.alt ?? `${productName} — imagem ${i + 1}`}
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
