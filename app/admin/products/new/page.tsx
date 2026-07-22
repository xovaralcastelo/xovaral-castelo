import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { createAdminClient } from "@/lib/supabase/admin";
import { ProductForm } from "../_components/ProductForm";
import { createProduct } from "../../_store-actions";
import type { ProductCategoryRow } from "@/lib/types";

export const dynamic = "force-dynamic";

export default async function NewProductPage() {
  const sb = createAdminClient();

  const [{ data: categories }, { data: settings }] = await Promise.all([
    sb
      .from("product_categories")
      .select("*")
      .eq("status", "active")
      .order("display_order", { ascending: true }),
    sb
      .from("store_settings")
      .select("point_value_cents")
      .eq("id", true)
      .maybeSingle<{ point_value_cents: number }>(),
  ]);

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
        <h1 className="mt-2 font-display text-2xl md:text-3xl font-bold text-xv-navy">
          Novo produto
        </h1>
        <p className="text-sm text-xv-gray-700 mt-1">
          Salve os dados básicos primeiro — as fotos e as variações entram na
          tela seguinte.
        </p>
      </header>

      <ProductForm
        categories={(categories ?? []) as ProductCategoryRow[]}
        pointValueCents={settings?.point_value_cents ?? 5}
        action={createProduct}
        submitLabel="Criar produto"
      />
    </div>
  );
}
