import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink, Check } from "lucide-react";
import { createAdminClient } from "@/lib/supabase/admin";
import { ProductForm } from "../../_components/ProductForm";
import { ImageManager } from "../../_components/ImageManager";
import { VariantManager } from "../../_components/VariantManager";
import { DeleteButton } from "../../../_components/DeleteButton";
import { updateProduct, deleteProduct } from "../../../_store-actions";
import type {
  ProductCategoryRow,
  ProductImage,
  ProductVariant,
  ProductWithRelations,
} from "@/lib/types";

export const dynamic = "force-dynamic";

interface Props {
  params: { id: string };
  searchParams: { tab?: string; novo?: string };
}

const TABS = [
  { key: "dados", label: "Dados" },
  { key: "fotos", label: "Fotos" },
  { key: "variacoes", label: "Variações" },
] as const;

export default async function EditProductPage({ params, searchParams }: Props) {
  const sb = createAdminClient();

  const [{ data }, { data: categories }, { data: settings }] = await Promise.all([
    sb
      .from("products")
      .select("*, images:product_images(*), variants:product_variants(*), category_ref:product_categories(*)")
      .eq("id", params.id)
      .maybeSingle(),
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

  if (!data) notFound();

  const images = ((data.images ?? []) as ProductImage[]).sort(
    (a, b) => a.display_order - b.display_order,
  );
  const variants = ((data.variants ?? []) as ProductVariant[]).sort(
    (a, b) => a.display_order - b.display_order,
  );

  const product = {
    ...data,
    highlights: Array.isArray(data.highlights) ? data.highlights : [],
    specs: Array.isArray(data.specs) ? data.specs : [],
    images,
    variants,
  } as ProductWithRelations;

  const tab = TABS.some((t) => t.key === searchParams.tab)
    ? (searchParams.tab as string)
    : "dados";

  const updateBound = updateProduct.bind(null, params.id);
  const deleteBound = deleteProduct.bind(null, params.id);

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
        <div className="mt-2 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
          <div>
            <h1 className="font-display text-2xl md:text-3xl font-bold text-xv-navy">
              {product.name}
            </h1>
            <p className="text-sm text-xv-gray-700 mt-1">
              {product.status === "active" ? (
                <a
                  href={`/store/${product.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-bold text-xv-orange hover:underline"
                >
                  Ver na loja
                  <ExternalLink size={12} />
                </a>
              ) : (
                <span className="text-xv-gray-500">
                  Rascunho — ainda não aparece na loja
                </span>
              )}
            </p>
          </div>
          <DeleteButton action={deleteBound} label="Excluir produto" />
        </div>
      </header>

      {searchParams.novo ? (
        <div className="flex items-start gap-2 rounded-2xl bg-green-50 px-5 py-4 ring-1 ring-green-200 text-green-800">
          <Check size={18} className="flex-shrink-0 mt-0.5" />
          <p className="text-sm">
            Produto criado. Agora suba as fotos na aba <strong>Fotos</strong> — e,
            se ele tiver tamanhos ou cores, cadastre em <strong>Variações</strong>.
          </p>
        </div>
      ) : null}

      {/* Abas */}
      <nav className="flex gap-1 border-b border-xv-gray-200 overflow-x-auto">
        {TABS.map((t) => {
          const active = tab === t.key;
          const count =
            t.key === "fotos" ? images.length : t.key === "variacoes" ? variants.length : null;
          return (
            <Link
              key={t.key}
              href={`/admin/products/${params.id}/edit?tab=${t.key}`}
              className={`whitespace-nowrap px-4 py-2.5 text-sm font-bold border-b-2 -mb-px transition ${
                active
                  ? "border-xv-orange text-xv-orange"
                  : "border-transparent text-xv-gray-700 hover:text-xv-navy"
              }`}
            >
              {t.label}
              {count != null ? (
                <span className="ml-1.5 rounded-full bg-xv-gray-100 px-1.5 py-0.5 text-[10px] text-xv-gray-700">
                  {count}
                </span>
              ) : null}
            </Link>
          );
        })}
      </nav>

      {tab === "dados" ? (
        <ProductForm
          product={product}
          categories={(categories ?? []) as ProductCategoryRow[]}
          pointValueCents={settings?.point_value_cents ?? 5}
          action={updateBound}
          submitLabel="Salvar alterações"
        />
      ) : null}

      {tab === "fotos" ? (
        <ImageManager productId={params.id} images={images} />
      ) : null}

      {tab === "variacoes" ? (
        <VariantManager
          productId={params.id}
          variantLabel={product.variant_label}
          basePriceCents={product.money_price_cents}
          variants={variants}
        />
      ) : null}
    </div>
  );
}
