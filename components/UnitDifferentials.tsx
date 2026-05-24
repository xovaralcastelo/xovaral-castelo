"use client";

import { motion } from "framer-motion";
import {
  Wifi,
  Baby,
  Wind,
  Tv,
  Car,
  LayoutGrid,
  Shirt,
  Sparkles,
  Clock,
  CreditCard,
  type LucideIcon,
} from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Mascot } from "@/components/brand/Mascot";
import { UNIT_DIFFERENTIALS } from "@/content/benefits";
import { UNIT } from "@/lib/constants";

const ICON_MAP: Record<string, LucideIcon> = {
  Wifi,
  Baby,
  Wind,
  Tv,
  Car,
  LayoutGrid,
  Shirt,
  Sparkles,
  Clock,
  CreditCard,
};

export default function UnitDifferentials() {
  return (
    <section className="relative overflow-hidden bg-xv-navy py-20 text-white sm:py-28">
      <div
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "radial-gradient(at 90% 10%, rgba(1,179,220,0.3) 0px, transparent 50%), radial-gradient(at 10% 90%, rgba(238,117,49,0.2) 0px, transparent 50%)",
        }}
      />

      <Container size="lg" className="relative">
        <div className="grid items-end gap-8 md:grid-cols-2">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-xv-cyan">
              A unidade do Castelo
            </span>
            <h2 className="mt-3 text-4xl font-black sm:text-5xl">
              Não é a lavanderia que você imagina.
              <br />
              É <span className="text-xv-orange">muito melhor</span>.
            </h2>
            <p className="mt-4 max-w-xl text-white/80">
              Pensamos cada detalhe pra você usar o tempo da lavagem como quiser:
              trabalhar, relaxar, levar as crianças ou simplesmente respirar.
            </p>
          </div>
          <div className="hidden justify-end md:flex">
            <Mascot name="espuma" size="lg" />
          </div>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {UNIT_DIFFERENTIALS.map((diff, i) => {
            const Icon = ICON_MAP[diff.icon];
            return (
              <motion.div
                key={diff.label}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: (i % 5) * 0.05 }}
                className="flex flex-col items-start gap-2 rounded-2xl bg-white/5 p-4 backdrop-blur-sm transition hover:bg-white/10"
              >
                {Icon && <Icon size={20} className="text-xv-cyan" />}
                <span className="text-sm font-bold leading-tight">{diff.label}</span>
              </motion.div>
            );
          })}
        </div>

        {/* Numbers strip */}
        <div className="mt-16 grid grid-cols-2 gap-4 rounded-3xl bg-white/5 p-6 backdrop-blur-sm sm:grid-cols-4 sm:p-8">
          <StatBlock value={`${UNIT.equipment.machines}`} label={`Máquinas ${UNIT.equipment.brand}`} sub={UNIT.equipment.capacity} />
          <StatBlock value={`${UNIT.pricing.cycleMinutes} min`} label="Por ciclo" sub="Lavagem ou secagem" />
          <StatBlock value={UNIT.pricing.complete.label} label="Ciclo completo" sub="Lavagem + secagem" />
          <StatBlock value="6h–23h" label="Todos os dias" sub="Inclusive feriados" />
        </div>
      </Container>
    </section>
  );
}

function StatBlock({ value, label, sub }: { value: string; label: string; sub: string }) {
  return (
    <div>
      <div className="text-3xl font-black text-xv-orange sm:text-4xl">{value}</div>
      <div className="mt-1 text-xs font-bold uppercase tracking-wider text-white/60">
        {label}
      </div>
      <div className="mt-0.5 text-xs text-white/70">{sub}</div>
    </div>
  );
}
