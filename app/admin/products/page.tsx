import Link from "next/link";
import { Plus, Pencil } from "lucide-react";
import { createAdminClient } from "@/lib/supabase/admin";
import { Table, Td, StatusBadge } from "../_components/Table";
import { formatCents, type Product } from "@/lib/types";

export const dynamic = "force-dynamic";

export default async function AdminProductsPage() {
  const sb = createAdminClient();
  const { data: products = [] } = await sb
    .from("products")
    .select("*")
    .order("status", { ascending: true })
    .order("display_order", { ascending: true })
    .order("created_at", { ascending: false });

  const list = (products ?? []) as Product[];

  return (
    <div className="space-y-6">
      <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl md:text-3xl font-bold text-xv-navy">
            Produtos
          </h1>
          <p className="text-sm text-xv-gray-700 mt-1">
            {list.length} produto{list.length !== 1 ? "s" : ""} no catálogo
          </p>
        </div>
        <Link
          href="/admin/products/new"
          className="inline-flex items-center gap-2 rounded-full bg-xv-orange px-5 py-2.5 text-sm font-bold text-white shadow-md hover:bg-xv-orange-light"
        >
          <Plus size={16} />
          Novo produto
        </Link>
      </header>

      <Table
        headers={["Produto", "Categoria", "Pontos", "Preço", "Estoque", "Status", ""]}
        hasRows={list.length > 0}
        empty="Nenhum produto ainda. Crie o primeiro."
      >
        {list.map((p) => (
          <tr key={p.id} className="hover:bg-xv-gray-50">
            <Td>
              <div className="flex items-center gap-3">
                {p.image_url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={p.image_url}
                    alt=""
                    className="h-10 w-10 rounded-lg object-cover ring-1 ring-xv-gray-200"
                  />
                ) : (
                  <div className="h-10 w-10 rounded-lg bg-xv-gray-100" />
                )}
                <div>
                  <div className="font-bold">{p.name}</div>
                  <div className="text-xs text-xv-gray-500">{p.slug}</div>
                </div>
              </div>
            </Td>
            <Td className="text-xs uppercase tracking-wider text-xv-gray-700">
              {p.category}
            </Td>
            <Td>{p.points_cost ? `${p.points_cost} pts` : "—"}</Td>
            <Td>{formatCents(p.money_price_cents)}</Td>
            <Td>{p.stock == null ? "∞" : p.stock}</Td>
            <Td>
              <StatusBadge status={p.status} />
            </Td>
            <Td>
              <Link
                href={`/admin/products/${p.id}/edit`}
                className="inline-flex items-center gap-1 text-xs font-bold text-xv-orange hover:underline"
              >
                <Pencil size={12} />
                Editar
              </Link>
            </Td>
          </tr>
        ))}
      </Table>
    </div>
  );
}
