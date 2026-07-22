import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Coins, CreditCard, MapPin, Store, User } from "lucide-react";
import { createAdminClient } from "@/lib/supabase/admin";
import { OrderStatusBadge } from "../_components/OrderStatusBadge";
import { OrderActions } from "../_components/OrderActions";
import {
  formatCents,
  ORDER_PAYMENT_STATUS_LABELS,
  type Order,
  type OrderItem,
} from "@/lib/types";

export const dynamic = "force-dynamic";

interface Props {
  params: { id: string };
}

type Row = Order & {
  customer: {
    full_name: string | null;
    email: string | null;
    lifetime_points: number;
  } | null;
  items: OrderItem[];
};

function Card({
  title,
  icon,
  children,
}: {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section className="bg-white rounded-2xl p-5 ring-1 ring-xv-gray-200/60">
      <h2 className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-xv-gray-500">
        {icon}
        {title}
      </h2>
      <div className="mt-3">{children}</div>
    </section>
  );
}

export default async function AdminOrderDetailPage({ params }: Props) {
  const sb = createAdminClient();
  const { data } = await sb
    .from("orders")
    .select("*, customer:customers(full_name, email, lifetime_points), items:order_items(*)")
    .eq("id", params.id)
    .maybeSingle();

  if (!data) notFound();
  const order = data as Row;

  const address = [
    order.address_street,
    order.address_number,
    order.address_complement,
    order.address_district,
    order.address_city,
    order.address_state,
  ]
    .filter(Boolean)
    .join(", ");

  return (
    <div className="space-y-6">
      <header>
        <Link
          href="/admin/orders"
          className="inline-flex items-center gap-2 text-sm font-bold text-xv-gray-700 hover:text-xv-navy"
        >
          <ArrowLeft size={14} />
          Voltar aos pedidos
        </Link>
        <div className="mt-2 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h1 className="font-display text-2xl md:text-3xl font-black text-xv-navy font-mono">
              {order.code}
            </h1>
            <p className="text-sm text-xv-gray-700 mt-1">
              {new Date(order.created_at).toLocaleString("pt-BR")}
            </p>
          </div>
          <OrderStatusBadge status={order.status} paymentStatus={order.payment_status} />
        </div>
      </header>

      {order.status === "cancelled" && order.cancel_reason ? (
        <div className="rounded-2xl bg-red-50 px-5 py-4 ring-1 ring-red-200 text-sm text-red-800">
          <strong>Cancelado:</strong> {order.cancel_reason}
        </div>
      ) : null}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2 space-y-5">
          {/* Itens */}
          <section className="bg-white rounded-2xl ring-1 ring-xv-gray-200/60 overflow-hidden">
            <h2 className="px-5 py-3 bg-xv-gray-50 text-xs font-bold uppercase tracking-wider text-xv-gray-500 border-b border-xv-gray-200">
              Itens do pedido
            </h2>
            <ul className="divide-y divide-xv-gray-200/60">
              {order.items.map((item) => (
                <li key={item.id} className="flex items-center gap-4 px-5 py-4">
                  {item.image_snapshot ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={item.image_snapshot}
                      alt=""
                      className="h-14 w-14 rounded-xl object-cover ring-1 ring-xv-gray-200"
                    />
                  ) : (
                    <div className="h-14 w-14 rounded-xl bg-xv-gray-100" />
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-xv-navy">{item.name_snapshot}</p>
                    <p className="text-xs text-xv-gray-500">
                      {item.variant_snapshot ? `${item.variant_snapshot} · ` : ""}
                      {item.sku_snapshot ?? "sem SKU"}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-xv-gray-700">
                      {item.quantity} × {formatCents(item.unit_price_cents)}
                    </p>
                    <p className="font-bold text-xv-navy">
                      {formatCents(item.line_total_cents)}
                    </p>
                  </div>
                </li>
              ))}
            </ul>

            {/* Fechamento financeiro */}
            <div className="px-5 py-4 bg-xv-gray-50 border-t border-xv-gray-200 space-y-1.5 text-sm">
              <div className="flex justify-between text-xv-gray-700">
                <span>Subtotal</span>
                <span>{formatCents(order.items_total_cents)}</span>
              </div>
              {order.delivery_fee_cents > 0 ? (
                <div className="flex justify-between text-xv-gray-700">
                  <span>Entrega</span>
                  <span>{formatCents(order.delivery_fee_cents)}</span>
                </div>
              ) : null}
              <div className="flex justify-between font-bold text-xv-navy pt-1.5 border-t border-xv-gray-200">
                <span>Total</span>
                <span>{formatCents(order.total_cents)}</span>
              </div>
              {order.points_used > 0 ? (
                <div className="flex justify-between text-xv-orange font-bold">
                  <span className="inline-flex items-center gap-1">
                    <Coins size={14} />
                    {order.points_used.toLocaleString("pt-BR")} pontos
                  </span>
                  <span>− {formatCents(order.points_value_cents)}</span>
                </div>
              ) : null}
              <div className="flex justify-between font-black text-xv-navy text-base pt-1.5 border-t border-xv-gray-200">
                <span>Pago em dinheiro</span>
                <span>{formatCents(order.money_due_cents)}</span>
              </div>
            </div>
          </section>

          <Card title="Ações" icon={<Store size={14} />}>
            <OrderActions
              orderId={order.id}
              status={order.status}
              deliveryMethod={order.delivery_method}
              adminNote={order.admin_note}
              pointsUsed={order.points_used}
            />
          </Card>
        </div>

        <div className="space-y-5">
          <Card title="Cliente" icon={<User size={14} />}>
            <p className="font-bold text-xv-navy">{order.customer?.full_name ?? "—"}</p>
            <p className="text-sm text-xv-gray-700">{order.customer?.email ?? ""}</p>
            {order.contact_phone ? (
              <p className="text-sm text-xv-gray-700 mt-1">{order.contact_phone}</p>
            ) : null}
            <p className="text-xs text-xv-gray-500 mt-2">
              Saldo atual:{" "}
              <strong>
                {(order.customer?.lifetime_points ?? 0).toLocaleString("pt-BR")} pts
              </strong>
            </p>
          </Card>

          <Card
            title={order.delivery_method === "delivery" ? "Entrega" : "Retirada"}
            icon={order.delivery_method === "delivery" ? <MapPin size={14} /> : <Store size={14} />}
          >
            {order.delivery_method === "delivery" ? (
              <>
                <p className="text-sm text-xv-navy">{address || "—"}</p>
                {order.address_cep ? (
                  <p className="text-sm text-xv-gray-700">CEP {order.address_cep}</p>
                ) : null}
                {order.address_notes ? (
                  <p className="text-xs text-xv-gray-500 mt-2">{order.address_notes}</p>
                ) : null}
              </>
            ) : (
              <p className="text-sm text-xv-navy">
                Retirada na unidade Castelo pelo próprio cliente.
              </p>
            )}
          </Card>

          <Card title="Pagamento" icon={<CreditCard size={14} />}>
            <p className="text-sm font-bold text-xv-navy">
              {ORDER_PAYMENT_STATUS_LABELS[order.payment_status]}
            </p>
            {order.payment_method ? (
              <p className="text-sm text-xv-gray-700">{order.payment_method}</p>
            ) : null}
            {order.mp_payment_id ? (
              <p className="text-xs text-xv-gray-500 mt-1 font-mono break-all">
                MP {order.mp_payment_id}
              </p>
            ) : null}
            {order.paid_at ? (
              <p className="text-xs text-xv-gray-500 mt-1">
                Pago em {new Date(order.paid_at).toLocaleString("pt-BR")}
              </p>
            ) : null}
            <p className="text-xs text-xv-gray-500 mt-2">
              Cotação usada: 1 ponto = {formatCents(order.point_value_cents)}
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}
