"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import { Trophy, Medal, Crown, Gem, ArrowRight, Check, Gift, type LucideIcon } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { CLUB_LEVELS } from "@/lib/constants";
import { DecorativeSparkle } from "@/components/ui/DecorativeSparkle";

const levelIcons: Record<string, LucideIcon> = { Trophy, Medal, Crown, Gem };

const TIER_EXTRA_PERKS: Record<string, boolean> = {
  ouro: true,
  diamante: true,
};

export default function ClubHighlight() {
  return (
    <section
      id="clube"
      className="relative overflow-hidden py-20 sm:py-24"
      style={{
        background:
          "linear-gradient(135deg, #0A1942 0%, #15326C 50%, #1E4A9F 100%)",
      }}
    >
      {/* Blobs decorativos */}
      <div
        className="pointer-events-none absolute top-10 left-10 h-72 w-72 rounded-full blur-3xl opacity-20"
        style={{ background: "#01B3DC" }}
      />
      <div
        className="pointer-events-none absolute bottom-0 right-0 h-64 w-64 rounded-full blur-3xl opacity-15"
        style={{ background: "#EE7531" }}
      />

      {/* Sparkles decorativos */}
      <DecorativeSparkle className="pointer-events-none absolute right-16 top-12 text-xv-yellow opacity-80" size={26} />
      <DecorativeSparkle className="pointer-events-none absolute right-44 top-32 text-xv-cyan opacity-60" size={20} />
      <DecorativeSparkle className="pointer-events-none absolute left-12 bottom-20 text-xv-orange opacity-70" size={24} />

      <Container size="lg" className="relative">
        <div className="grid lg:grid-cols-[1.3fr_1fr] gap-10 items-center mb-12">
          {/* Esquerda — título */}
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-xv-orange/15 ring-1 ring-xv-orange/40 px-5 py-2 text-xs font-bold uppercase tracking-widest text-xv-orange mb-6">
              <Trophy size={13} />
              Clube de Vantagens
            </div>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.05] mb-2">
              Clube de Vantagens
            </h2>
            <h3 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.05] mb-6">
              <span className="relative inline-block text-xv-orange">
                Xô Varal
                <svg
                  className="absolute -bottom-2 left-0 w-full text-xv-yellow"
                  viewBox="0 0 200 8"
                  preserveAspectRatio="none"
                  aria-hidden
                >
                  <path
                    d="M0 5 Q50 1 100 4 T200 3"
                    stroke="currentColor"
                    strokeWidth="5"
                    fill="none"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </h3>
            <p className="text-white/80 text-lg leading-relaxed max-w-lg">
              Quanto mais você usa,{" "}
              <span className="bg-xv-cyan/20 ring-1 ring-xv-cyan/40 text-xv-cyan px-2 py-0.5 rounded-md font-bold">
                mais vantagens
              </span>{" "}
              você ganha!
            </p>
          </div>

          {/* Direita — mascote PUFFY (espuma) */}
          <div className="hidden lg:flex justify-center items-center">
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <Image
                src="/mascotes/espuma-t.png"
                alt="Puffy, mascote do clube de vantagens"
                width={280}
                height={280}
                className="drop-shadow-2xl"
              />
            </motion.div>
          </div>
        </div>

        {/* 4 cards dos níveis */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {CLUB_LEVELS.map((level, i) => {
            const Icon = levelIcons[level.icon] ?? Trophy;
            const hasExtra = TIER_EXTRA_PERKS[level.key];
            return (
              <motion.div
                key={level.key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.35, delay: i * 0.08 }}
                className="relative rounded-[2rem] bg-white p-6 shadow-2xl hover:-translate-y-2 transition-all duration-300"
              >
                {level.highlight && (
                  <div className="absolute -top-3 right-5 rounded-full bg-xv-orange px-3 py-1 text-[10px] font-black uppercase tracking-widest text-white shadow-md">
                    Popular
                  </div>
                )}

                {/* Círculo grande superior com ícone */}
                <div className="flex justify-center">
                  <div
                    className="relative h-20 w-20 rounded-full flex items-center justify-center shadow-lg"
                    style={{
                      background: `linear-gradient(135deg, ${level.color}, ${level.colorEnd})`,
                      boxShadow: `0 10px 30px ${level.ringColor}`,
                    }}
                  >
                    <Icon
                      size={36}
                      strokeWidth={2.2}
                      className="text-white"
                    />
                  </div>
                </div>

                <h4 className="mt-4 text-center font-display font-black uppercase tracking-widest text-xv-navy text-base">
                  {level.name}
                </h4>
                <p className="mt-0.5 text-center text-[11px] text-xv-gray-500">
                  {level.cyclesLabel}
                </p>

                <div className="mt-4 text-center">
                  <div
                    className="font-display text-5xl font-black leading-none"
                    style={{ color: level.color }}
                  >
                    {level.discount}
                  </div>
                  <div className="mt-1.5 text-[10px] font-bold uppercase tracking-widest text-xv-gray-500">
                    de desconto no mês seguinte
                  </div>
                </div>

                <ul className="mt-5 space-y-2">
                  {level.perks.slice(0, 2).map((perk) => (
                    <li
                      key={perk}
                      className="flex items-start gap-1.5 text-[11px] text-xv-gray-700"
                    >
                      <Check
                        size={12}
                        className="flex-shrink-0 mt-0.5 text-green-600"
                      />
                      <span>{perk}</span>
                    </li>
                  ))}
                </ul>

                {hasExtra && (
                  <div className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-xv-orange-bg ring-1 ring-xv-orange/40 px-2.5 py-1">
                    <Gift size={10} className="text-xv-orange" />
                    <span className="text-[10px] font-bold text-xv-orange">
                      + brindes na Store
                    </span>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* CTAs no rodapé */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/clube-de-vantagens"
            className="inline-flex items-center gap-2 rounded-full bg-xv-orange px-7 py-3.5 text-sm font-bold text-white shadow-xl transition hover:bg-xv-orange-light"
            style={{ boxShadow: "0 10px 30px -5px rgba(238,117,49,0.5)" }}
          >
            <Trophy size={16} />
            Acessar Clube de Vantagens
            <ArrowRight size={16} />
          </Link>
          <Link
            href="/minha-conta"
            className="inline-flex items-center gap-2 rounded-full border-2 border-white/30 bg-white/10 backdrop-blur-sm px-7 py-3.5 text-sm font-bold text-white transition hover:bg-white/20"
          >
            Ver meu status e benefícios
          </Link>
        </div>
      </Container>
    </section>
  );
}
