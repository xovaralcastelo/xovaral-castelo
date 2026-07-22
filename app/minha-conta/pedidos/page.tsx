import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ArrowLeft, Package, ShoppingBag } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { getMyOrders } from "@/lib/store";
import { formatBRL } from "@/lib/store-pricing";
import {
  DELIVERY_METHOD_LABELS,
  ORDER_STATUS_LABELS,
  type OrderStatus,
} from "@/lib/types";

export const metadata: Metadata = {
  title: "Meus pedidos — Store Xô Varal",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

const STATUS_STYLE: Record<OrderStatus, string> = {
  pending_payment: "bg-amber-100 text-amber-800",
  paid: "bg-green-100 text-green-800",
  preparing: "bg-blue-100 text-blue-800",
  ready: "bg-blue-100 text-blue-800",
  delivered: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
};

export default async function MyOrdersPage() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/clube-de-vantagens/entrar?next=/minha-conta/pedidos");

  const orders = await getMyOrders();

  return (
    <div
      className="min-h-screen"
      style={{
        background:
          "linear-gradient(135deg, #f0fafe 0%, #fff8f2 50%, #fff3ea 100%)",
      }}
    >
      <div className="mx-auto max-w-2xl px-4 py-10 md:py-14">
        <Link
          href="/minha-conta"
          className="inline-flex items-center gap-2 text-sm font-bold text-xv-gray-700 hover:text-xv-navy"
        >
          <ArrowLeft size={14} />
          Minha conta
        </Link>

        <h1 className="mt-6 font-display text-3xl font-black text-xv-navy md:text-4xl">
          Meus pedidos
        </h1>

        {orders.length === 0 ? (
          <div className="mt-8 rounded-3xl bg-white p-10 text-center shadow-card ring-1 ring-xv-gray-200/60">
            <ShoppingBag size={44} className="mx-auto text-xv-gray-300" />
            <p className="mt-4 font-display text-xl text-xv-navy">
              Você ainda não fez pedidos
            </p>
            <Link
              href="/store"
              className="mt-6 inline-flex rounded-full bg-xv-navy px-6 py-3 text-sm font-bold text-white transition hover:brightness-110"
            >
              Ir para a Store
            </Link>
          </div>
        ) : (
          <ul className="mt-8 space-y-4">
            {orders.map((o) => (
              <li key={o.id}>
                <Link
                  href={`/store/pedido/${o.code}`}
                  className="flex items-center gap-4 rounded-3xl bg-white p-5 shadow-card ring-1 ring-xv-gray-200/60 transition hover:shadow-lg"
                >
                  <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-xv-orange-bg text-xv-orange">
                    <Package size={20} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <p className="font-display font-bold text-xv-navy">
                        {o.code}
                      </p>
                      <span
                        className={`rounded-full px-2.5 py-0.5 text-[11px] font-bold ${STATUS_STYLE[o.status]}`}
                      >
                        {ORDER_STATUS_LABELS[o.status]}
                      </span>
                    </div>
                    <p className="mt-0.5 text-xs text-xv-gray-500">
                      {new Date(o.created_at).toLocaleDateString("pt-BR", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}{" "}
                      · {DELIVERY_METHOD_LABELS[o.delivery_method]}
                    </p>
                  </div>
                  <p className="font-display font-bold text-xv-navy">
                    {formatBRL(o.money_due_cents)}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
