import Link from "next/link";
import { Plus, Pencil } from "lucide-react";
import { createAdminClient } from "@/lib/supabase/admin";
import { Table, Td, StatusBadge } from "../_components/Table";
import { DeleteButton } from "../_components/DeleteButton";
import { deleteCategory } from "../_store-actions";
import type { ProductCategoryRow } from "@/lib/types";

export const dynamic = "force-dynamic";

export default async function AdminCategoriesPage() {
  const sb = createAdminClient();

  const [{ data: categoriesData }, { data: products }] = await Promise.all([
    sb.from("product_categories").select("*").order("display_order", { ascending: true }),
    sb.from("products").select("category_id"),
  ]);

  const categories = (categoriesData ?? []) as ProductCategoryRow[];

  const counts = new Map<string, number>();
  for (const p of products ?? []) {
    if (p.category_id) counts.set(p.category_id, (counts.get(p.category_id) ?? 0) + 1);
  }

  return (
    <div className="space-y-6">
      <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl md:text-3xl font-bold text-xv-navy">
            Categorias
          </h1>
          <p className="text-sm text-xv-gray-700 mt-1">
            Organizam a navegação da loja. {categories.length} cadastrada
            {categories.length !== 1 ? "s" : ""}.
          </p>
        </div>
        <Link
          href="/admin/categories/new"
          className="inline-flex items-center gap-2 rounded-full bg-xv-orange px-5 py-2.5 text-sm font-bold text-white shadow-md hover:bg-xv-orange-light"
        >
          <Plus size={16} />
          Nova categoria
        </Link>
      </header>

      <Table
        headers={["Categoria", "Slug", "Produtos", "Ordem", "Status", ""]}
        hasRows={categories.length > 0}
        empty="Nenhuma categoria ainda."
      >
        {categories.map((c) => {
          const count = counts.get(c.id) ?? 0;
          return (
            <tr key={c.id} className="hover:bg-xv-gray-50">
              <Td>
                <div className="font-bold">{c.name}</div>
                {c.description ? (
                  <div className="text-xs text-xv-gray-500 line-clamp-1">
                    {c.description}
                  </div>
                ) : null}
              </Td>
              <Td className="text-xs text-xv-gray-500">{c.slug}</Td>
              <Td>{count}</Td>
              <Td>{c.display_order}</Td>
              <Td>
                <StatusBadge status={c.status} />
              </Td>
              <Td>
                <div className="flex items-center gap-3">
                  <Link
                    href={`/admin/categories/${c.id}/edit`}
                    className="inline-flex items-center gap-1 text-xs font-bold text-xv-orange hover:underline"
                  >
                    <Pencil size={12} />
                    Editar
                  </Link>
                  <DeleteButton
                    action={deleteCategory.bind(null, c.id)}
                    confirmText={`Excluir a categoria "${c.name}"?`}
                  />
                </div>
              </Td>
            </tr>
          );
        })}
      </Table>
    </div>
  );
}
