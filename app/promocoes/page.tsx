import type { Metadata } from "next";
import { PromosShowcase } from "@/components/PromosShowcase";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getActivePromos } from "@/lib/data";

export const metadata: Metadata = {
  title: "Promoções do Clube de Benefícios | Xô Varal Castelo",
  description:
    "Promoções exclusivas dos parceiros para clientes Xô Varal Castelo. Confira os benefícios ativos no Castelo.",
};

export const dynamic = "force-dynamic";

export default async function PromocoesPage() {
  const promos = await getActivePromos();

  return (
    <div className="pt-20">
      {promos.length === 0 ? (
        <section className="py-32 text-center px-4">
          <h1 className="font-display text-3xl font-black text-xv-navy mb-3">
            Promoções do Clube de Benefícios
          </h1>
          <p className="text-xv-gray-700 mb-8">
            Nenhuma promoção ativa neste momento — volte em breve!
          </p>
          <Link
            href="/parceiros"
            className="inline-flex items-center gap-2 rounded-full bg-xv-navy px-7 py-3.5 text-sm font-bold text-white hover:bg-xv-navy-light"
          >
            Conhecer os parceiros <ArrowRight size={16} />
          </Link>
        </section>
      ) : (
        <PromosShowcase />
      )}
    </div>
  );
}
