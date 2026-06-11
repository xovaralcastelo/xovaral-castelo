import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Gift } from "lucide-react";
import { getActivePromos } from "@/lib/data";

/**
 * Vitrine do Clube de Benefícios: banners de promoções dos parceiros.
 * Cada banner leva para /promocoes/[slug] com as regras completas.
 * Não renderiza nada se não houver promoção ativa.
 */
export async function PromosShowcase() {
  const promos = await getActivePromos();
  if (promos.length === 0) return null;

  return (
    <section className="py-20 sm:py-24 bg-xv-navy relative overflow-hidden">
      <div
        className="pointer-events-none absolute -top-20 -right-20 h-72 w-72 rounded-full blur-3xl opacity-20"
        style={{ background: "#EE7531" }}
      />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-xv-yellow">
            <Gift size={14} />
            Clube de Benefícios Xô Varal
          </span>
          <h2 className="mt-3 font-display text-3xl sm:text-4xl font-black text-white">
            Promoções dos <span className="text-xv-orange">parceiros</span>
          </h2>
          <p className="mt-3 text-white/70 max-w-xl mx-auto text-sm sm:text-base">
            Vantagens exclusivas para clientes Xô Varal nos negócios parceiros
            do Castelo. Toque no banner para ver as regras da promoção.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
          {promos.map((p) => (
            <Link
              key={p.id}
              href={`/promocoes/${p.slug}`}
              className="group block w-full max-w-sm rounded-3xl overflow-hidden bg-white shadow-xl ring-1 ring-white/10 transition hover:-translate-y-1 hover:shadow-2xl"
            >
              <div className="relative aspect-[4/5] w-full">
                <Image
                  src={p.banner_url}
                  alt={`Promoção ${p.partner_name}: ${p.title}`}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover"
                />
              </div>
              <div className="p-5">
                <p className="text-xs font-bold uppercase tracking-wider text-xv-orange">
                  {p.partner_name}
                </p>
                <h3 className="mt-1 font-display text-lg font-bold text-xv-navy leading-snug">
                  {p.title}
                </h3>
                <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-bold text-xv-cyan group-hover:gap-2.5 transition-all">
                  Ver regras da promoção <ArrowRight size={15} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
