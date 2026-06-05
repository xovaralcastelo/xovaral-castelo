"use client";

import Image from "next/image";
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

const HIGHLIGHT_PHOTOS = [
  {
    src: "/images/ambiente-bistro.jpg",
    title: "Bistrô com Wi-Fi",
    desc: "Trabalhe, descanse ou tome um café enquanto a roupa lava.",
    icon: Wifi,
  },
  {
    src: "/images/previas-12.jpg",
    title: "Área kids",
    desc: "Espaço seguro pra criançada brincar enquanto você resolve a semana.",
    icon: Baby,
  },
  {
    src: "/images/hero-maquinas-frente.jpg",
    title: "Equipamentos SpeedQueen",
    desc: "Máquinas profissionais americanas de 10,5 kg — as melhores do mercado.",
    icon: Sparkles,
  },
];

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

        {/* 3 fotos destacando bistrô, área kids e equipamentos */}
        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {HIGHLIGHT_PHOTOS.map((photo, i) => {
            const Icon = photo.icon;
            return (
              <motion.div
                key={photo.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.45, delay: i * 0.08 }}
                className="group relative overflow-hidden rounded-3xl ring-1 ring-white/10"
              >
                <div className="relative aspect-[4/3]">
                  <Image
                    src={photo.src}
                    alt={photo.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-xv-navy via-xv-navy/40 to-transparent" />
                </div>
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <div className="inline-flex items-center justify-center h-10 w-10 rounded-xl bg-xv-cyan/20 text-xv-cyan ring-1 ring-xv-cyan/30 backdrop-blur-sm mb-3">
                    <Icon size={18} />
                  </div>
                  <h3 className="font-display text-xl font-bold text-white leading-tight">
                    {photo.title}
                  </h3>
                  <p className="mt-1 text-sm text-white/85">{photo.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
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
          <StatBlock value="470+" label="Clientes ativos" sub="Frequentando a unidade" />
          <StatBlock value={`${UNIT.pricing.cycleMinutes} min`} label="Por ciclo" sub="Lavagem ou secagem" />
          <StatBlock value={UNIT.pricing.complete.label} label="Ciclo completo" sub="Lavagem + secagem" />
          <StatBlock value="24h" label="Todos os dias" sub="Aberta sempre" />
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
