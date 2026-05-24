"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Trophy } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { CLUB_LEVELS } from "@/lib/constants";

export default function ClubHighlight() {
  return (
    <section id="clube" className="relative bg-white py-20 sm:py-28">
      <Container size="lg">
        <div className="overflow-hidden rounded-[2rem] bg-gradient-to-br from-xv-orange via-xv-orange-light to-xv-yellow p-8 text-white sm:p-12 lg:p-16">
          <div className="grid items-center gap-10 lg:grid-cols-[1.2fr_1fr]">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-1.5 text-xs font-bold uppercase tracking-wider backdrop-blur-sm">
                <Trophy size={14} />
                Clube de Vantagens
              </div>
              <h2 className="mt-5 text-4xl font-black leading-tight sm:text-5xl">
                Quanto mais você usa, <br />
                <span className="text-white">mais você economiza.</span>
              </h2>
              <p className="mt-4 max-w-md text-white/90">
                Programa de fidelidade automático: cada ciclo conta. Chegue ao Diamante
                e ganhe <strong>20% de desconto</strong> em todas as visitas do mês seguinte.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/clube-de-vantagens"
                  className="inline-flex items-center gap-2 rounded-full bg-xv-navy px-6 py-3 text-sm font-bold text-white shadow-lg transition hover:bg-xv-navy-light"
                >
                  Acessar Clube de Vantagens
                  <ArrowRight size={16} />
                </Link>
                <Link
                  href="/clube-de-vantagens/entrar"
                  className="inline-flex items-center gap-2 rounded-full border-2 border-white/40 bg-white/10 px-6 py-3 text-sm font-bold text-white backdrop-blur-sm hover:bg-white/20"
                >
                  Ver meu status
                </Link>
              </div>
            </div>

            <div className="space-y-3">
              {CLUB_LEVELS.map((level, i) => (
                <motion.div
                  key={level.key}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: i * 0.08 }}
                  className="flex items-center gap-4 rounded-2xl bg-white/15 p-4 backdrop-blur-sm"
                >
                  <div
                    className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full text-xs font-black text-white"
                    style={{ backgroundColor: level.color }}
                  >
                    {level.name.slice(0, 3)}
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-black">{level.name}</div>
                    <div className="text-xs text-white/80">
                      {level.cyclesMin}
                      {level.cyclesMax === Infinity ? "+" : `–${level.cyclesMax}`} ciclos/mês
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-black">{level.discountPct}%</div>
                    <div className="text-[10px] font-bold uppercase tracking-wider text-white/80">
                      desconto
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
