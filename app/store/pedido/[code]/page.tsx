import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { CheckCircle2, Clock, MapPin, Package, Store } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { getMyOrderByCode } from "@/lib/store";
import { formatBRL, formatPoints } from "@/lib/store-pricing";
import {
  DELIVERY_METHOD_LABELS,
  ORDER_STATUS_LABELS,
  type OrderStatus,
} from "@/lib/types";

export const metadata: Metadata = {
  title: "Seu pedido — Store Xô Varal",
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

interface Props {
  params: { code: string };
}

export default async function OrderConfirmationPage({ params }: Props) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    redirect(`/clube-de-vantagens/entrar?next=/store/pedido/${params.code}`);
  }

  const order = await getMyOrderByCode(params.code);
  if (!order) notFound();

  const awaitingPayment =
    order.status === "pending_payment" && order.money_due_cents > 0;
  const paidInPoints = order.money_due_cents === 0;

  return (
    <div
      className="min-h-screen"
      style={{
        background:
          "linear-gradient(135deg, #f0fafe 0%, #fff8f2 50%, #fff3ea 100%)",
      }}
    >
      <div className="mx-auto max-w-2xl px-4 py-10 md:py-14">
        <div className="rounded-3xl bg-white p-6 shadow-card ring-1 ring-xv-gray-200/60 md:p-8">
          <div className="flex items-center gap-3">
            {awaitingPayment ? (
              <Clock size={28} className="text-amber-500" />
            ) : (
              <CheckCircle2 size={28} className="text-green-600" />
            )}
            <div>
              <h1 className="font-display text-2xl font-black text-xv-navy">
                Pedido {order.code}
              </h1>
              <span
                className={`mt-1 inline-block rounded-full px-3 py-0.5 text-xs font-bold ${STATUS_STYLE[order.status]}`}
              >
                {ORDER_STATUS_LABELS[order.status]}
              </span>
            </div>
          </div>

          <p className="mt-4 text-sm text-xv-gray-700">
            {paidInPoints
              ? "Pedido confirmado e pago 100% com pontos. 🎉 A equipe já foi avisada."
              : awaitingPayment
                ? "Recebemos seu pedido! O pagamento do valor em dinheiro é combinado com a equipe na retirada/entrega."
                : "Pedido confirmado. A equipe já foi avisada."}
          </p>

          {/* GANCHO MERCADO PAGO: quando o gateway entrar, o botão "Pagar agora"
              aparece aqui para pedidos pending_payment com money_due_cents > 0. */}

          {/* Entrega */}
          <div className="mt-6 flex items-center gap-2 rounded-2xl bg-xv-gray-50 px-4 py-3 text-sm text-xv-gray-700 ring-1 ring-xv-gray-200/60">
            {order.delivery_method === "pickup" ? (
              <Store size={16} className="text-xv-orange" />
            ) : (
              <MapPin size={16} className="text-xv-orange" />
            )}
            <span className="font-bold text-xv-navy">
              {DELIVERY_METHOD_LABELS[order.delivery_method]}
            </span>
            {order.delivery_method === "delivery" && order.address_street ? (
              <span className="truncate">
                — {order.address_street}, {order.address_number}
                {order.address_district ? `, ${order.address_district}` : ""}
              </span>
            ) : null}
          </div>

          {/* Itens */}
          <ul className="mt-6 divide-y divide-xv-gray-200/70">
            {order.items.map((it) => (
              <li key={it.id} className="flex items-center gap-3 py-3">
                <div className="h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-xv-gray-100">
                  {it.image_snapshot ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={it.image_snapshot}
                      alt={it.name_snapshot}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="grid h-full w-full place-items-center text-xv-gray-300">
                      <Package size={20} />
                    </div>
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-bold text-xv-navy">{it.name_snapshot}</p>
                  <p className="text-xs text-xv-gray-500">
                    {it.variant_snapshot ? `${it.variant_snapshot} · ` : ""}
                    {it.quantity} × {formatBRL(it.unit_price_cents)}
                  </p>
                </div>
                <p className="font-display font-bold text-xv-navy">
                  {formatBRL(it.line_total_cents)}
                </p>
              </li>
            ))}
          </ul>

          {/* Totais */}
          <dl className="mt-4 space-y-2 border-t border-xv-gray-200/70 pt-4 text-sm">
            <div className="flex justify-between">
              <dt className="text-xv-gray-700">Subtotal</dt>
              <dd className="text-xv-navy">{formatBRL(order.items_total_cents)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-xv-gray-700">Frete</dt>
              <dd className="text-xv-navy">
                {order.delivery_fee_cents === 0
                  ? "Grátis"
                  : formatBRL(order.delivery_fee_cents)}
              </dd>
            </div>
            {order.points_used > 0 ? (
              <div className="flex justify-between">
                <dt className="text-xv-gray-700">
                  Pontos ({formatPoints(order.points_used)})
                </dt>
                <dd className="font-bold text-xv-orange">
                  −{formatBRL(order.points_value_cents)}
                </dd>
              </div>
            ) : null}
            <div className="flex justify-between border-t border-xv-gray-200/70 pt-2">
              <dt className="font-display text-lg font-bold text-xv-navy">
                {paidInPoints ? "Total (pago em pontos)" : "Total em dinheiro"}
              </dt>
              <dd className="font-display text-xl font-black text-xv-navy">
                {formatBRL(order.money_due_cents)}
              </dd>
            </div>
          </dl>
        </div>

        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link
            href="/minha-conta/pedidos"
            className="rounded-full bg-xv-navy px-6 py-3 text-sm font-bold text-white transition hover:brightness-110"
          >
            Meus pedidos
          </Link>
          <Link
            href="/store"
            className="rounded-full bg-white px-6 py-3 text-sm font-bold text-xv-navy ring-1 ring-xv-gray-200/60 transition hover:ring-xv-orange"
          >
            Continuar comprando
          </Link>
        </div>
      </div>
    </div>
  );
}
