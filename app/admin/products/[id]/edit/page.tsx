import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { createAdminClient } from "@/lib/supabase/admin";
import { ProductForm } from "../../_components/ProductForm";
import { updateProduct, archiveProduct } from "../../../_actions";
import type { Product } from "@/lib/types";

export const dynamic = "force-dynamic";

interface Props {
  params: { id: string };
}

export default async function EditProductPage({ params }: Props) {
  const sb = createAdminClient();
  const { data, error } = await sb
    .from("products")
    .select("*")
    .eq("id", params.id)
    .single<Product>();
  if (error || !data) notFound();

  const updateBound = updateProduct.bind(null, params.id);
  async function archiveAction() {
    "use server";
    await archiveProduct(params.id);
  }

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
        <div className="mt-2 flex items-start justify-between gap-4">
          <div>
            <h1 className="font-display text-2xl md:text-3xl font-bold text-xv-navy">
              Editar produto
            </h1>
            <p className="text-sm text-xv-gray-700 mt-1">{data.name}</p>
          </div>
          {data.status !== "archived" ? (
            <form action={archiveAction}>
              <button
                type="submit"
                className="rounded-full bg-red-50 px-4 py-2 text-sm font-bold text-red-700 hover:bg-red-100"
              >
                Arquivar
              </button>
            </form>
          ) : null}
        </div>
      </header>

      <ProductForm
        product={data}
        action={updateBound}
        submitLabel="Salvar alterações"
      />
    </div>
  );
}
