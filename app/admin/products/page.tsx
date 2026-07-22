import Link from "next/link";
import { Plus, Pencil, Search, Package, AlertTriangle } from "lucide-react";
import { createAdminClient } from "@/lib/supabase/admin";
import { Table, Td, StatusBadge } from "../_components/Table";
import { formatCents, type ProductCategoryRow, type Product } from "@/lib/types";

export const dynamic = "force-dynamic";

interface Props {
  searchParams: { q?: string; categoria?: string; status?: string };
}

type Row = Product & {
  category_ref: { name: string } | null;
  variants: { stock: number | null; status: string }[];
  images: { id: string }[];
};

/** Estoque efetivo: soma das variações quando o produto tem variação. */
function stockLabel(p: Row): string {
  if (p.has_variants) {
    const active = p.variants.filter((v) => v.status === "active");
    if (active.length === 0) return "—";
    if (active.every((v) => v.stock == null)) return "∞";
    return String(active.reduce((sum, v) => sum + (v.stock ?? 0), 0));
  }
  return p.stock == null ? "∞" : String(p.stock);
}

function isLowStock(p: Row): boolean {
  const label = stockLabel(p);
  if (label === "∞" || label === "—") return false;
  return Number(label) <= 3;
}

export default async function AdminProductsPage({ searchParams }: Props) {
  const sb = createAdminClient();

  const { data: categoriesData } = await sb
    .from("product_categories")
    .select("*")
    .order("display_order", { ascending: true });
  const categories = (categoriesData ?? []) as ProductCategoryRow[];

  let query = sb
    .from("products")
    .select("*, category_ref:product_categories(name), variants:product_variants(stock, status), images:product_images(id)");

  const q = searchParams.q?.trim();
  if (q) query = query.or(`name.ilike.%${q}%,sku.ilike.%${q}%,slug.ilike.%${q}%`);
  if (searchParams.categoria) query = query.eq("category_id", searchParams.categoria);
  if (searchParams.status) query = query.eq("status", searchParams.status);

  const { data } = await query
    .order("display_order", { ascending: true })
    .order("created_at", { ascending: false });

  const list = (data ?? []) as Row[];
  const filtering = Boolean(q || searchParams.categoria || searchParams.status);

  return (
    <div className="space-y-6">
      <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl md:text-3xl font-bold text-xv-navy">
            Produtos
          </h1>
          <p className="text-sm text-xv-gray-700 mt-1">
            {list.length} produto{list.length !== 1 ? "s" : ""}
            {filtering ? " no filtro" : " no catálogo"}
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

      {/* Filtros — GET puro, sem JS */}
      <form
        method="get"
        className="grid grid-cols-1 sm:grid-cols-[1fr_auto_auto_auto] gap-2 bg-white rounded-2xl p-3 ring-1 ring-xv-gray-200/60"
      >
        <div className="relative">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-xv-gray-400"
          />
          <input
            name="q"
            defaultValue={q ?? ""}
            placeholder="Buscar por nome, SKU ou slug…"
            className="w-full rounded-xl border-2 border-xv-gray-200 pl-9 pr-4 py-2.5 text-base md:text-sm text-xv-navy outline-none focus:border-xv-orange"
          />
        </div>
        <select
          name="categoria"
          defaultValue={searchParams.categoria ?? ""}
          className="rounded-xl border-2 border-xv-gray-200 px-3 py-2.5 text-base md:text-sm bg-white text-xv-navy outline-none focus:border-xv-orange"
        >
          <option value="">Todas as categorias</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
        <select
          name="status"
          defaultValue={searchParams.status ?? ""}
          className="rounded-xl border-2 border-xv-gray-200 px-3 py-2.5 text-base md:text-sm bg-white text-xv-navy outline-none focus:border-xv-orange"
        >
          <option value="">Todos os status</option>
          <option value="active">Publicado</option>
          <option value="draft">Rascunho</option>
          <option value="archived">Arquivado</option>
        </select>
        <button
          type="submit"
          className="rounded-xl bg-xv-navy px-5 py-2.5 text-sm font-bold text-white hover:bg-xv-navy-light"
        >
          Filtrar
        </button>
      </form>

      <Table
        headers={["Produto", "Categoria", "Preço", "Pontos", "Estoque", "Fotos", "Status", ""]}
        hasRows={list.length > 0}
        empty={
          filtering
            ? "Nenhum produto bate com esse filtro."
            : "Nenhum produto ainda. Crie o primeiro."
        }
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
                  <div className="h-10 w-10 rounded-lg bg-xv-gray-100 flex items-center justify-center text-xv-gray-300">
                    <Package size={18} />
                  </div>
                )}
                <div>
                  <div className="font-bold flex items-center gap-1.5">
                    {p.name}
                    {p.featured ? (
                      <span className="rounded-full bg-xv-orange-bg px-2 py-0.5 text-[10px] font-bold text-xv-orange">
                        destaque
                      </span>
                    ) : null}
                  </div>
                  <div className="text-xs text-xv-gray-500">{p.sku ?? p.slug}</div>
                </div>
              </div>
            </Td>
            <Td className="text-xs text-xv-gray-700">
              {p.category_ref?.name ?? "—"}
            </Td>
            <Td className="font-bold">{formatCents(p.money_price_cents)}</Td>
            <Td>{p.points_cost ? `${p.points_cost.toLocaleString("pt-BR")} pts` : "—"}</Td>
            <Td>
              <span
                className={`inline-flex items-center gap-1 ${
                  isLowStock(p) ? "text-red-600 font-bold" : ""
                }`}
              >
                {isLowStock(p) ? <AlertTriangle size={12} /> : null}
                {stockLabel(p)}
              </span>
            </Td>
            <Td>
              <span className={p.images.length === 0 ? "text-red-600 font-bold" : ""}>
                {p.images.length}
              </span>
            </Td>
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
