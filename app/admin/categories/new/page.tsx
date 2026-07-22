import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { CategoryForm } from "../_components/CategoryForm";
import { createCategory } from "../../_store-actions";

export const dynamic = "force-dynamic";

export default function NewCategoryPage() {
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
          Nova categoria
        </h1>
      </header>

      <CategoryForm action={createCategory} submitLabel="Criar categoria" />
    </div>
  );
}
