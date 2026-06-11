import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Gift, Info, MapPin } from "lucide-react";
import { getPromoBySlug } from "@/lib/data";
import { SITE } from "@/lib/constants";

export const dynamic = "force-dynamic";

interface PageProps {
  params: { slug: string };
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const promo = await getPromoBySlug(params.slug);
  if (!promo) return { title: "Promoção | Xô Varal Castelo" };
  return {
    title: `${promo.title} | Clube de Benefícios Xô Varal`,
    description: promo.summary ?? promo.title,
  };
}

export default async function PromoDetailPage({ params }: PageProps) {
  const promo = await getPromoBySlug(params.slug);
  if (!promo) notFound();

  const ctaHref =
    promo.cta_url ??
    `${SITE.whatsapp}?text=Olá! Vi a promoção "${promo.title}" no site da Xô Varal Castelo e quero saber mais.`;

  return (
    <div
      className="min-h-screen pt-24 pb-16 px-4"
      style={{
        background:
          "linear-gradient(135deg, #f0fafe 0%, #fff8f2 50%, #fff3ea 100%)",
      }}
    >
      <div className="max-w-5xl mx-auto">
        <Link
          href="/clube-de-vantagens"
          className="inline-flex items-center gap-2 text-sm font-bold text-xv-navy/60 hover:text-xv-navy transition mb-6"
        >
          <ArrowLeft size={16} />
          Clube de Vantagens
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Banner */}
          <div className="rounded-3xl overflow-hidden shadow-2xl ring-1 ring-xv-gray-200/60 max-w-md mx-auto lg:mx-0 w-full">
            <Image
              src={promo.banner_url}
              alt={`Banner da promoção ${promo.partner_name}`}
              width={668}
              height={788}
              className="w-full h-auto"
              priority
            />
          </div>

          {/* Detalhes */}
          <div>
            <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-xv-orange">
              <Gift size={14} />
              Clube de Benefícios · {promo.partner_name}
            </span>
            <h1 className="mt-3 font-display text-2xl sm:text-4xl font-black text-xv-navy leading-tight">
              {promo.title}
            </h1>

            {promo.details ? (
              <div className="mt-5 space-y-4 text-xv-gray-700 leading-relaxed">
                {promo.details.split(/\n\n+/).map((par, i) => (
                  <p key={i}>{par}</p>
                ))}
              </div>
            ) : null}

            {promo.conditions ? (
              <div className="mt-6 rounded-2xl bg-white ring-1 ring-xv-gray-200/60 p-5">
                <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-xv-gray-700 mb-2">
                  <Info size={14} className="text-xv-cyan" />
                  Regras da promoção
                </p>
                <p className="text-sm text-xv-gray-700">{promo.conditions}</p>
              </div>
            ) : null}

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={ctaHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-xv-orange px-7 py-3.5 text-sm font-bold text-white shadow-lg transition hover:bg-xv-orange-light"
              >
                {promo.cta_label ?? "Quero aproveitar"}
                <ArrowRight size={16} />
              </a>
              <Link
                href="/localizacao"
                className="inline-flex items-center gap-2 rounded-full border-2 border-xv-navy/20 bg-white px-7 py-3.5 text-sm font-bold text-xv-navy transition hover:border-xv-navy/50"
              >
                <MapPin size={16} />
                Como chegar na Xô Varal
              </Link>
            </div>

            <p className="mt-6 text-xs text-xv-gray-500">
              Promoção do parceiro {promo.partner_name}. Benefício exclusivo
              divulgado pelo Clube Xô Varal Castelo.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
