import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Package, MapPin, MessageCircle } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { UNIT } from "@/lib/constants";
import type { Product } from "@/lib/types";

export const dynamic = "force-dynamic";

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props) {
  const supabase = createClient();
  const { data } = await supabase
    .from("products")
    .select("name, description")
    .eq("slug", params.slug)
    .eq("status", "active")
    .single();
  if (!data) return { title: "Produto não encontrado" };
  return {
    title: `${data.name} — Store Xô Varal`,
    description: data.description ?? `Disponível na Store Xô Varal Castelo.`,
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const supabase = createClient();

  const { data: product, error } = await supabase
    .from("products")
    .select("*")
    .eq("slug", params.slug)
    .eq("status", "active")
    .single<Product>();
  if (error || !product) notFound();

  const outOfStock = product.stock != null && product.stock <= 0;

  const whatsappText = `Olá! Vim pela Store Xô Varal e tenho interesse em:\n\n• ${product.name}\n• Link: https://castelo.xovaral.com/store/${product.slug}\n\nPodem me passar mais informações?`;
  const whatsappUrl = `https://wa.me/${UNIT.contact.whatsapp}?text=${encodeURIComponent(whatsappText)}`;

  return (
    <div
      className="min-h-screen"
      style={{
        background:
          "linear-gradient(135deg, #f0fafe 0%, #fff8f2 50%, #fff3ea 100%)",
      }}
    >
      <div className="mx-auto max-w-4xl px-4 py-8 md:py-12">
        <Link
          href="/store"
          className="inline-flex items-center gap-2 text-sm font-bold text-xv-gray-700 hover:text-xv-navy"
        >
          <ArrowLeft size={14} />
          Voltar à Store
        </Link>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {/* Imagem */}
          <div className="aspect-square rounded-3xl bg-white shadow-card ring-1 ring-xv-gray-200/60 overflow-hidden">
            {product.image_url ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={product.image_url}
                alt={product.name}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="h-full w-full flex items-center justify-center text-xv-gray-300">
                <Package size={96} />
              </div>
            )}
          </div>

          {/* Detalhes */}
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-xv-orange">
              {product.category}
            </p>
            <h1 className="mt-1 font-display text-3xl md:text-4xl font-black text-xv-navy">
              {product.name}
            </h1>

            {product.description ? (
              <p className="mt-4 text-sm md:text-base text-xv-gray-700 whitespace-pre-line">
                {product.description}
              </p>
            ) : null}

            <div className="mt-6 flex items-center gap-2 text-xs text-xv-gray-700">
              {product.fulfillment_type === "voucher" ? (
                <span className="rounded-full bg-xv-cyan/10 text-xv-cyan px-3 py-1 font-bold">
                  Voucher digital
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 rounded-full bg-xv-orange-bg text-xv-orange px-3 py-1 font-bold">
                  <MapPin size={12} />
                  Retirar na loja
                </span>
              )}
            </div>

            {outOfStock ? (
              <div className="mt-6 rounded-2xl bg-red-50 px-5 py-4 ring-1 ring-red-200 text-red-800 text-sm">
                Esse produto está temporariamente esgotado. Volte em breve!
              </div>
            ) : (
              <div className="mt-8 space-y-3">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 py-3.5 text-sm font-bold text-white shadow-md hover:brightness-110 transition w-full sm:w-auto"
                >
                  <MessageCircle size={16} />
                  Tenho interesse — chamar no WhatsApp
                </a>
                <p className="text-xs text-xv-gray-500">
                  Em breve você poderá trocar pontos ou comprar direto aqui.
                  Por enquanto, fale com a equipe pra alinhar condições.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
