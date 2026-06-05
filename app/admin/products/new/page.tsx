import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ProductForm } from "../_components/ProductForm";
import { createProduct } from "../../_actions";

export const dynamic = "force-dynamic";

export default function NewProductPage() {
  return (
    <div className="space-y-6">
      <header>
        <Link
          href="/admin/products"
          className="inline-flex items-center gap-2 text-sm font-bold text-xv-gray-700 hover:text-xv-navy"
        >
          <ArrowLeft size={14} />
          Voltar
        </Link>
        <h1 className="mt-2 font-display text-3xl font-bold text-xv-navy">
          Novo produto
        </h1>
      </header>

      <ProductForm action={createProduct} submitLabel="Criar produto" />
    </div>
  );
}
