import Link from "next/link";
import { createAdminClient } from "@/lib/supabase/admin";
import { Table, Td, StatusBadge } from "../_components/Table";
import { FulfillButton } from "./_components/FulfillButton";

export const dynamic = "force-dynamic";

interface RedemptionRow {
  id: string;
  customer_id: string;
  product_id: string;
  points_spent: number;
  voucher_code: string | null;
  status: "pending" | "fulfilled" | "cancelled";
  created_at: string;
  fulfilled_at: string | null;
  customers: { full_name: string | null; email: string | null } | null;
  products: { name: string; fulfillment_type: "voucher" | "pickup" } | null;
}

interface Props {
  searchParams: { filter?: "pending" | "fulfilled" | "cancelled" | "all" };
}

export default async function AdminRedemptionsPage({ searchParams }: Props) {
  const filter = searchParams.filter ?? "pending";
  const sb = createAdminClient();

  let q = sb
    .from("redemptions")
    .select(
      "id, customer_id, product_id, points_spent, voucher_code, status, created_at, fulfilled_at, customers(full_name, email), products(name, fulfillment_type)",
    )
    .order("created_at", { ascending: false })
    .limit(100);

  if (filter !== "all") {
    q = q.eq("status", filter);
  }

  const { data = [] } = await q;
  const list = (data ?? []) as unknown as RedemptionRow[];

  const filters = [
    { key: "pending", label: "Pendentes" },
    { key: "fulfilled", label: "Entregues" },
    { key: "cancelled", label: "Cancelados" },
    { key: "all", label: "Todos" },
  ] as const;

  return (
    <div className="space-y-6">
      <header>
        <h1 className="font-display text-3xl font-bold text-xv-navy">
          Resgates
        </h1>
        <p className="text-sm text-xv-gray-700 mt-1">
          {list.length} resgate{list.length !== 1 ? "s" : ""}{" "}
          {filter !== "all" ? `(${filter})` : ""}
        </p>
      </header>

      <div className="flex items-center gap-2">
        {filters.map((f) => (
          <Link
            key={f.key}
            href={`/admin/redemptions?filter=${f.key}`}
            className={`rounded-full px-4 py-1.5 text-xs font-bold transition ${
              filter === f.key
                ? "bg-xv-navy text-white"
                : "bg-xv-gray-100 text-xv-gray-700 hover:bg-xv-gray-200"
            }`}
          >
            {f.label}
          </Link>
        ))}
      </div>

      <Table
        headers={["Cliente", "Produto", "Pontos", "Tipo", "Status", "Data", ""]}
        hasRows={list.length > 0}
        empty={`Nenhum resgate ${filter !== "all" ? `(${filter})` : ""} no momento.`}
      >
        {list.map((r) => (
          <tr key={r.id} className="hover:bg-xv-gray-50">
            <Td>
              <Link
                href={`/admin/customers/${r.customer_id}`}
                className="hover:underline"
              >
                <div className="font-bold text-sm">
                  {r.customers?.full_name ?? "—"}
                </div>
                <div className="text-xs text-xv-gray-500 truncate max-w-[180px]">
                  {r.customers?.email}
                </div>
              </Link>
            </Td>
            <Td>
              <div className="font-bold text-sm">
                {r.products?.name ?? "Produto removido"}
              </div>
              {r.voucher_code ? (
                <div className="font-mono text-xs text-xv-gray-700 mt-0.5">
                  {r.voucher_code}
                </div>
              ) : null}
            </Td>
            <Td>
              <span className="font-bold">{r.points_spent}</span>{" "}
              <span className="text-xs text-xv-gray-500">pts</span>
            </Td>
            <Td>
              <span className="text-xs uppercase tracking-wider">
                {r.products?.fulfillment_type ?? "—"}
              </span>
            </Td>
            <Td>
              <StatusBadge status={r.status} />
            </Td>
            <Td>
              <span className="text-xs">
                {new Date(r.created_at).toLocaleDateString("pt-BR")}
                <br />
                {new Date(r.created_at).toLocaleTimeString("pt-BR", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </Td>
            <Td>
              {r.status === "pending" ? (
                <FulfillButton redemptionId={r.id} />
              ) : (
                <span className="text-xs text-xv-gray-500">
                  {r.fulfilled_at
                    ? new Date(r.fulfilled_at).toLocaleDateString("pt-BR")
                    : "—"}
                </span>
              )}
            </Td>
          </tr>
        ))}
      </Table>
    </div>
  );
}
