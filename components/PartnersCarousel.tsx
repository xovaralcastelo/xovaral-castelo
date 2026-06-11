"use client";

import Link from "next/link";
import { ArrowRight, Gift } from "lucide-react";
import { useEffect, useRef } from "react";
import type { Partner } from "@/lib/types";

const PARTNER_SLOTS = [
  { emoji: "💪", name: "Academia", type: "Fitness & Saúde", color: "#E5F7FF", border: "#01B3DC" },
  { emoji: "🍕", name: "Restaurante", type: "Alimentação", color: "#FFF3EA", border: "#EE7531" },
  { emoji: "☕", name: "Cafeteria", type: "Café & Padaria", color: "#FFFAE0", border: "#FBC132" },
  { emoji: "💇", name: "Salão de Beleza", type: "Beleza & Estética", color: "#E5F7FF", border: "#01B3DC" },
  { emoji: "🏥", name: "Clínica", type: "Saúde & Bem-estar", color: "#FFF3EA", border: "#EE7531" },
  { emoji: "🛒", name: "Mercado Local", type: "Comércio", color: "#FFFAE0", border: "#FBC132" },
  { emoji: "🎓", name: "Escola/Cursinho", type: "Educação", color: "#E5F7FF", border: "#01B3DC" },
  { emoji: "🏠", name: "Imobiliária", type: "Moradia", color: "#FFF3EA", border: "#EE7531" },
];

const CATEGORY_LABELS: Record<string, string> = {
  academia: "Academia", restaurante: "Restaurante", condominio: "Condomínio",
  faculdade: "Faculdade", salao: "Beleza & Estética", servico: "Serviço",
  comercio: "Comércio", outro: "Parceiro",
};

const PALETTE = [
  { color: "#E5F7FF", border: "#01B3DC" },
  { color: "#FFF3EA", border: "#EE7531" },
  { color: "#FFFAE0", border: "#FBC132" },
];

export default function PartnersCarousel({ partners }: { partners?: Partner[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const hasReal = !!partners && partners.length > 0;

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let pos = 0;
    let raf: number;
    const step = () => {
      pos -= 0.5;
      if (Math.abs(pos) >= track.scrollWidth / 2) pos = 0;
      track.style.transform = `translateX(${pos}px)`;
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, []);

  type Card = {
    key: string;
    emoji?: string;
    logoUrl?: string | null;
    name: string;
    sub: string;
    badge: string;
    color: string;
    border: string;
  };
  const baseCards: Card[] = hasReal
    ? partners!.map((p, i) => {
        const pal = PALETTE[i % PALETTE.length];
        return {
          key: p.id,
          logoUrl: p.logo_url,
          name: p.name,
          sub: CATEGORY_LABELS[p.category] ?? "Parceiro",
          badge: p.benefit_text || "Parceiro",
          color: pal.color,
          border: pal.border,
        };
      })
    : PARTNER_SLOTS.map((s, i) => ({
        key: `slot-${i}`,
        emoji: s.emoji,
        name: s.name,
        sub: s.type,
        badge: "Seja parceiro",
        color: s.color,
        border: s.border,
      }));
  const cards = [...baseCards, ...baseCards];

  return (
    <section id="parceiros-carrossel" className="bg-xv-gray-50 py-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-10">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-xv-orange-bg px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-xv-orange">
              <Gift size={14} />
              Ofertas, Novidades &amp; Parceiros
            </div>
            <h2 className="mt-3 text-4xl font-black text-xv-navy sm:text-5xl">
              Tem mais pra você
            </h2>
            <p className="mt-3 text-xv-gray-700 max-w-xl">
              Parceiros do bairro que oferecem benefícios exclusivos para clientes da Xô Varal Castelo.
            </p>
          </div>
          <Link
            href="/parceiros"
            className="inline-flex items-center gap-2 rounded-full bg-xv-navy px-6 py-3 text-sm font-bold text-white shadow-md hover:bg-xv-navy-light whitespace-nowrap"
          >
            Ver todos
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>

      {/* Infinite scroll track */}
      <div className="relative w-full overflow-hidden">
        <div ref={trackRef} className="flex gap-4 w-max will-change-transform">
          {cards.map((p, i) => (
            <div
              key={`${p.key}-${i}`}
              className="flex-shrink-0 w-52 rounded-[1.5rem] p-5 flex flex-col items-center text-center"
              style={{ backgroundColor: p.color, border: `2px solid ${p.border}30` }}
            >
              <div
                className="h-16 w-16 rounded-2xl flex items-center justify-center text-3xl mb-3 shadow-sm overflow-hidden bg-white"
                style={{ border: `1.5px solid ${p.border}50` }}
              >
                {p.logoUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={p.logoUrl} alt={p.name} className="h-full w-full object-contain" />
                ) : (
                  <span style={{ backgroundColor: p.color }} className="flex h-full w-full items-center justify-center">
                    {p.emoji}
                  </span>
                )}
              </div>
              <div className="font-black text-xv-navy text-sm">{p.name}</div>
              <div className="text-xv-gray-500 text-xs mt-0.5">{p.sub}</div>
              <div className="mt-3 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider" style={{ backgroundColor: p.border + "20", color: p.border }}>
                {p.badge}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-6 text-center">
        <p className="text-xs text-xv-gray-500">
          Quer ser parceiro?{" "}
          <Link href="/parceiros" className="font-bold text-xv-orange hover:underline">
            Cadastra teu negócio aqui
          </Link>{" "}
          — sua marca aparece aqui pros nossos clientes.
        </p>
      </div>
    </section>
  );
}
