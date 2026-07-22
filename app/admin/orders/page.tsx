import Link from "next/link";
import { Search, Coins, Truck, Store } from "lucide-react";
import { createAdminClient } from "@/lib/supabase/admin";
import { Table, Td } from "../_components/Table";
import { OrderStatusBadge } from "./_components/OrderStatusBadge";
import {
  formatCents,
  ORDER_STATUS_LABELS,
  type Order,
  type OrderStatus,
} from "@/lib/types";

export const dynamic = "force-dynamic";

interface Props {
  searchParams: { q?: string; status?: string };
}

type Row = Order & {
  customer: { full_name: string | null; email: string | null } | null;
  items: { id: string }[];
};

/** Filas que o operador realmente acompanha, na ordem do fluxo. */
const QUEUES: { key: OrderStatus; label: string }[] = [
  { key: "pending_payment", label: "Aguardando pagamento" },
  { key: "paid", label: "Pagos" },
  { key: "preparing", label: "Em separação" },
  { key: "ready", label: "Prontos" },
];

function formatDate(iso: string): string {
  return new Date(iso).toLocaleString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default async function AdminOrdersPage({ searchParams }: Props) {
  const sb = createAdminClient();

  let query = sb
    .from("orders")
    .select("*, customer:customers(full_name, email), items:order_items(id)");

  if (searchParams.status) query = query.eq("status", searchParams.status);
  const q = searchParams.q?.trim();
  if (q) query = query.ilike("code", `%${q}%`);

  const { data } = await query.order("created_at", { ascending: false }).limit(200);
  const orders = (data ?? []) as Row[];

  // Contadores por fila — lidos da lista completa, sem filtro de status.
  const { data: allStatuses } = await sb.from("orders").select("status");
  const counts = new Map<string, number>();
  for (const o of allStatuses ?? []) {
    counts.set(o.status, (counts.get(o.status) ?? 0) + 1);
  }

  return (
    <div className="space-y-6">
      <header>
        <h1 className="font-display text-2xl md:text-3xl font-bold text-xv-navy">
          Pedidos
        </h1>
        <p className="text-sm text-xv-gray-700 mt-1">
          {orders.length} pedido{orders.length !== 1 ? "s" : ""} listado
          {orders.length !== 1 ? "s" : ""}
        </p>
      </header>

      {/* Filas */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {QUEUES.map((queue) => {
          const active = searchParams.status === queue.key;
          return (
            <Link
              key={queue.key}
              href={active ? "/admin/orders" : `/admin/orders?status=${queue.key}`}
              className={`rounded-2xl px-4 py-3 ring-1 transition ${
                active
                  ? "bg-xv-navy text-white ring-xv-navy"
                  : "bg-white ring-xv-gray-200 hover:ring-xv-orange"
              }`}
            >
              <p
                className={`text-2xl font-display font-black ${
                  active ? "text-white" : "text-xv-navy"
                }`}
              >
                {counts.get(queue.key) ?? 0}
              </p>
              <p
                className={`text-xs font-bold uppercase tracking-wider mt-0.5 ${
                  active ? "text-white/80" : "text-xv-gray-500"
                }`}
              >
                {queue.label}
              </p>
            </Link>
          );
        })}
      </div>

      <form
        method="get"
        className="flex flex-col sm:flex-row gap-2 bg-white rounded-2xl p-3 ring-1 ring-xv-gray-200/60"
      >
        <div className="relative flex-1">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-xv-gray-400"
          />
          <input
            name="q"
            defaultValue={q ?? ""}
            placeholder="Buscar pelo código do pedido (ex: XV-1042)…"
            className="w-full rounded-xl border-2 border-xv-gray-200 pl-9 pr-4 py-2.5 text-base md:text-sm text-xv-navy outline-none focus:border-xv-orange"
          />
        </div>
        <select
          name="status"
          defaultValue={searchParams.status ?? ""}
          className="rounded-xl border-2 border-xv-gray-200 px-3 py-2.5 text-base md:text-sm bg-white text-xv-navy outline-none focus:border-xv-orange"
        >
          <option value="">Todos os status</option>
          {Object.entries(ORDER_STATUS_LABELS).map(([key, label]) => (
            <option key={key} value={key}>
              {label}
            </option>
          ))}
        </select>
        <button
          type="submit"
          className="rounded-xl bg-xv-navy px-5 py-2.5 text-sm font-bold text-white hover:bg-xv-navy-light"
        >
          Filtrar
        </button>
      </form>

      <Table
        headers={["Pedido", "Cliente", "Itens", "Pontos", "Dinheiro", "Total", "Entrega", "Status", ""]}
        hasRows={orders.length > 0}
        empty="Nenhum pedido aqui."
      >
        {orders.map((o) => (
          <tr key={o.id} className="hover:bg-xv-gray-50">
            <Td>
              <div className="font-bold font-mono">{o.code}</div>
              <div className="text-xs text-xv-gray-500">{formatDate(o.created_at)}</div>
            </Td>
            <Td>
              <div className="text-sm">{o.customer?.full_name ?? "—"}</div>
              <div className="text-xs text-xv-gray-500">{o.customer?.email ?? ""}</div>
            </Td>
            <Td>{o.items.length}</Td>
            <Td>
              {o.points_used > 0 ? (
                <span className="inline-flex items-center gap-1 text-xv-orange font-bold">
                  <Coins size={12} />
                  {o.points_used.toLocaleString("pt-BR")}
                </span>
              ) : (
                "—"
              )}
            </Td>
            <Td>{o.money_due_cents > 0 ? formatCents(o.money_due_cents) : "—"}</Td>
            <Td className="font-bold">{formatCents(o.total_cents)}</Td>
            <Td>
              <span className="inline-flex items-center gap-1 text-xs text-xv-gray-700">
                {o.delivery_method === "delivery" ? (
                  <>
                    <Truck size={12} /> Entrega
                  </>
                ) : (
                  <>
                    <Store size={12} /> Retirada
                  </>
                )}
              </span>
            </Td>
            <Td>
              <OrderStatusBadge status={o.status} paymentStatus={o.payment_status} />
            </Td>
            <Td>
              <Link
                href={`/admin/orders/${o.id}`}
                className="text-xs font-bold text-xv-orange hover:underline"
              >
                Abrir
              </Link>
            </Td>
          </tr>
        ))}
      </Table>
    </div>
  );
}
