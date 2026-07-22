import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { createAdminClient } from "@/lib/supabase/admin";
import { CategoryForm } from "../../_components/CategoryForm";
import { updateCategory } from "../../../_store-actions";
import type { ProductCategoryRow } from "@/lib/types";

export const dynamic = "force-dynamic";

interface Props {
  params: { id: string };
}

export default async function EditCategoryPage({ params }: Props) {
  const sb = createAdminClient();
  const { data } = await sb
    .from("product_categories")
    .select("*")
    .eq("id", params.id)
    .maybeSingle<ProductCategoryRow>();
  if (!data) notFound();

  return (
    <div className="space-y-6">
      <header>
        <Link
          href="/admin/categories"
          className="inline-flex items-center gap-2 text-sm font-bold text-xv-gray-700 hover:text-xv-navy"
        >
          <ArrowLeft size={14} />
          Voltar
        </Link>
        <h1 className="mt-2 font-display text-2xl md:text-3xl font-bold text-xv-navy">
          Editar categoria
        </h1>
        <p className="text-sm text-xv-gray-700 mt-1">{data.name}</p>
      </header>

      <CategoryForm
        category={data}
        action={updateCategory.bind(null, params.id)}
        submitLabel="Salvar alterações"
      />
    </div>
  );
}
