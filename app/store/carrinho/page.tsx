"use client";

import Link from "next/link";
import { ArrowLeft, Minus, Plus, ShoppingCart, Trash2 } from "lucide-react";
import { useCart } from "@/app/store/_cart/CartContext";
import { formatBRL } from "@/lib/store-pricing";

export default function CartPage() {
  const { items, ready, subtotalCents, setQuantity, removeItem } = useCart();

  return (
    <div
      className="min-h-screen"
      style={{
        background:
          "linear-gradient(135deg, #f0fafe 0%, #fff8f2 50%, #fff3ea 100%)",
      }}
    >
      <div className="mx-auto max-w-3xl px-4 py-10 md:py-14">
        <Link
          href="/store"
          className="inline-flex items-center gap-2 text-sm font-bold text-xv-gray-700 hover:text-xv-navy"
        >
          <ArrowLeft size={14} />
          Continuar comprando
        </Link>

        <h1 className="mt-6 font-display text-3xl font-black text-xv-navy md:text-4xl">
          Seu carrinho
        </h1>

        {!ready ? (
          <p className="mt-10 text-center text-sm text-xv-gray-500">Carregando…</p>
        ) : items.length === 0 ? (
          <div className="mt-10 rounded-3xl bg-white p-10 text-center shadow-card ring-1 ring-xv-gray-200/60">
            <ShoppingCart size={48} className="mx-auto text-xv-gray-300" />
            <p className="mt-4 font-display text-xl text-xv-navy">
              Seu carrinho está vazio
            </p>
            <p className="mt-2 text-sm text-xv-gray-700">
              Explore a Store e adicione produtos por aqui.
            </p>
            <Link
              href="/store"
              className="mt-6 inline-flex rounded-full bg-xv-navy px-6 py-3 text-sm font-bold text-white transition hover:brightness-110"
            >
              Ir para a Store
            </Link>
          </div>
        ) : (
          <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_20rem] lg:items-start">
            <ul className="space-y-4">
              {items.map((item) => {
                const max = Math.min(10, item.maxStock ?? 10);
                return (
                  <li
                    key={item.key}
                    className="flex gap-4 rounded-3xl bg-white p-4 shadow-card ring-1 ring-xv-gray-200/60"
                  >
                    <Link
                      href={`/store/${item.slug}`}
                      className="h-20 w-20 shrink-0 overflow-hidden rounded-2xl bg-xv-gray-100"
                    >
                      {item.image ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-full w-full object-cover"
                        />
                      ) : null}
                    </Link>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <Link
                            href={`/store/${item.slug}`}
                            className="font-display font-bold text-xv-navy hover:text-xv-orange line-clamp-2"
                          >
                            {item.name}
                          </Link>
                          {item.variantLabel ? (
                            <p className="text-xs text-xv-gray-500">
                              {item.variantLabel}
                            </p>
                          ) : null}
                        </div>
                        <button
                          type="button"
                          onClick={() => removeItem(item.key)}
                          aria-label={`Remover ${item.name}`}
                          className="shrink-0 rounded-full p-2 text-xv-gray-500 transition hover:bg-red-50 hover:text-red-600"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>

                      <div className="mt-2 flex items-center justify-between gap-3">
                        <div className="inline-flex items-center rounded-full ring-1 ring-xv-gray-200/60">
                          <button
                            type="button"
                            onClick={() => setQuantity(item.key, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                            aria-label="Diminuir"
                            className="grid h-9 w-9 place-items-center rounded-l-full text-xv-navy transition hover:bg-xv-gray-100 disabled:text-xv-gray-300"
                          >
                            <Minus size={13} />
                          </button>
                          <span className="w-8 text-center text-sm font-bold text-xv-navy">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => setQuantity(item.key, item.quantity + 1)}
                            disabled={item.quantity >= max}
                            aria-label="Aumentar"
                            className="grid h-9 w-9 place-items-center rounded-r-full text-xv-navy transition hover:bg-xv-gray-100 disabled:text-xv-gray-300"
                          >
                            <Plus size={13} />
                          </button>
                        </div>
                        <p className="font-display font-bold text-xv-navy">
                          {formatBRL(item.unitPriceCents * item.quantity)}
                        </p>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>

            <aside className="rounded-3xl bg-white p-6 shadow-card ring-1 ring-xv-gray-200/60 lg:sticky lg:top-24">
              <h2 className="font-display text-lg font-bold text-xv-navy">
                Resumo
              </h2>
              <div className="mt-4 flex items-center justify-between text-sm text-xv-gray-700">
                <span>Subtotal</span>
                <strong className="font-display text-xv-navy">
                  {formatBRL(subtotalCents)}
                </strong>
              </div>
              <p className="mt-1 text-xs text-xv-gray-500">
                Frete e desconto em pontos são calculados no checkout.
              </p>
              <Link
                href="/store/checkout"
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-xv-orange px-6 py-4 text-sm font-bold text-white shadow-md transition hover:bg-xv-orange-light"
              >
                Finalizar compra
              </Link>
            </aside>
          </div>
        )}
      </div>
    </div>
  );
}
