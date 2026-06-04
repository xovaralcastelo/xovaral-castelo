"use client";

import Link from "next/link";
import { ArrowRight, Gift } from "lucide-react";
import { useEffect, useRef } from "react";

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

export default function PartnersCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);

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

  const cards = [...PARTNER_SLOTS, ...PARTNER_SLOTS];

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
              key={i}
              className="flex-shrink-0 w-52 rounded-[1.5rem] p-5 flex flex-col items-center text-center"
              style={{ backgroundColor: p.color, border: `2px solid ${p.border}30` }}
            >
              <div
                className="h-16 w-16 rounded-2xl flex items-center justify-center text-3xl mb-3 shadow-sm"
                style={{ backgroundColor: p.color, border: `1.5px solid ${p.border}50` }}
              >
                {p.emoji}
              </div>
              <div className="font-black text-xv-navy text-sm">{p.name}</div>
              <div className="text-xv-gray-500 text-xs mt-0.5">{p.type}</div>
              <div className="mt-3 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider" style={{ backgroundColor: p.border + "20", color: p.border }}>
                Seja parceiro
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
