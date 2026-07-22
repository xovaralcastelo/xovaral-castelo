import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Check, MapPin, Truck } from "lucide-react";
import { UNIT } from "@/lib/constants";
import {
  getProductBySlug,
  getRelatedProducts,
  getStoreSettings,
} from "@/lib/store";
import { ProductCard } from "../_components/ProductCard";
import { Gallery } from "./_components/Gallery";
import { BuyBox } from "./_components/BuyBox";

export const dynamic = "force-dynamic";

const SITE_URL = "https://castelo.xovaral.com";

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props) {
  const product = await getProductBySlug(params.slug);
  if (!product) return { title: "Produto não encontrado" };

  const description =
    product.short_description ??
    product.subtitle ??
    product.description ??
    "Disponível na Store Xô Varal Castelo.";
  const image = product.images[0]?.url ?? product.image_url;

  return {
    title: `${product.name} — Store Xô Varal`,
    description,
    openGraph: {
      title: product.name,
      description,
      images: image ? [image] : undefined,
    },
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const product = await getProductBySlug(params.slug);
  if (!product) notFound();

  const [settings, related] = await Promise.all([
    getStoreSettings(),
    getRelatedProducts(product),
  ]);

  return (
    <div
      className="min-h-screen"
      style={{
        background:
          "linear-gradient(135deg, #f0fafe 0%, #fff8f2 50%, #fff3ea 100%)",
      }}
    >
      <div className="mx-auto max-w-5xl px-4 py-8 md:py-12">
        <nav className="flex flex-wrap items-center gap-2 text-sm text-xv-gray-700">
          <Link
            href="/store"
            className="inline-flex items-center gap-2 font-bold hover:text-xv-navy"
          >
            <ArrowLeft size={14} />
            Store
          </Link>
          {product.category_ref ? (
            <>
              <span className="text-xv-gray-300">/</span>
              <Link
                href={`/store?cat=${product.category_ref.slug}`}
                className="font-bold hover:text-xv-navy"
              >
                {product.category_ref.name}
              </Link>
            </>
          ) : null}
        </nav>

        <div className="mt-6 grid grid-cols-1 items-start gap-8 md:grid-cols-2">
          <Gallery images={product.images} productName={product.name} />

          <div>
            {product.brand ? (
              <p className="text-xs font-bold uppercase tracking-widest text-xv-gray-500">
                {product.brand}
              </p>
            ) : null}

            <div className="flex flex-wrap items-center gap-2">
              <h1 className="font-display text-3xl font-black text-xv-navy md:text-4xl">
                {product.name}
              </h1>
              {product.badge ? (
                <span className="rounded-full bg-xv-navy px-3 py-1 text-[11px] font-bold text-white">
                  {product.badge}
                </span>
              ) : null}
            </div>

            {product.subtitle ? (
              <p className="mt-2 text-base text-xv-gray-700">{product.subtitle}</p>
            ) : null}

            {product.sku ? (
              <p className="mt-2 text-xs text-xv-gray-500">
                Código: {product.sku}
              </p>
            ) : null}

            <div className="mt-4 flex flex-wrap gap-2 text-xs">
              {product.fulfillment_type === "voucher" ? (
                <span className="rounded-full bg-xv-cyan/10 px-3 py-1 font-bold text-xv-cyan">
                  Voucher digital
                </span>
              ) : null}
              {product.allow_pickup && settings.pickup_enabled ? (
                <span className="inline-flex items-center gap-1 rounded-full bg-xv-orange-bg px-3 py-1 font-bold text-xv-orange">
                  <MapPin size={12} />
                  Retirar na loja
                </span>
              ) : null}
              {product.allow_delivery && settings.delivery_enabled ? (
                <span className="inline-flex items-center gap-1 rounded-full bg-xv-gray-100 px-3 py-1 font-bold text-xv-gray-700">
                  <Truck size={12} />
                  Entrega
                </span>
              ) : null}
            </div>

            <BuyBox
              product={product}
              settings={settings}
              whatsapp={UNIT.contact.whatsapp}
              productUrl={`${SITE_URL}/store/${product.slug}`}
            />
          </div>
        </div>

        {product.highlights.length > 0 ? (
          <section className="mt-10 rounded-3xl bg-white p-6 shadow-card ring-1 ring-xv-gray-200/60">
            <h2 className="font-display text-xl font-bold text-xv-navy">
              Destaques
            </h2>
            <ul className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {product.highlights.map((h, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-xv-gray-700">
                  <Check size={16} className="mt-0.5 shrink-0 text-xv-orange" />
                  {h}
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        {product.description ? (
          <section className="mt-6 rounded-3xl bg-white p-6 shadow-card ring-1 ring-xv-gray-200/60">
            <h2 className="font-display text-xl font-bold text-xv-navy">
              Sobre o produto
            </h2>
            <p className="mt-3 whitespace-pre-line text-sm text-xv-gray-700 md:text-base">
              {product.description}
            </p>
          </section>
        ) : null}

        {product.specs.length > 0 ? (
          <section className="mt-6 rounded-3xl bg-white p-6 shadow-card ring-1 ring-xv-gray-200/60">
            <h2 className="font-display text-xl font-bold text-xv-navy">
              Ficha técnica
            </h2>
            <dl className="mt-4 divide-y divide-xv-gray-200/70 text-sm">
              {product.specs.map((s, i) => (
                <div key={i} className="flex flex-wrap gap-2 py-2.5">
                  <dt className="w-40 shrink-0 font-bold text-xv-gray-500">
                    {s.label}
                  </dt>
                  <dd className="text-xv-navy">{s.value}</dd>
                </div>
              ))}
            </dl>
          </section>
        ) : null}

        {related.length > 0 ? (
          <section className="mt-12">
            <h2 className="font-display text-2xl font-bold text-xv-navy">
              Você também pode gostar
            </h2>
            <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((p) => (
                <ProductCard
                  key={p.id}
                  product={p}
                  pointValueCents={settings.point_value_cents}
                />
              ))}
            </div>
          </section>
        ) : null}
      </div>
    </div>
  );
}
