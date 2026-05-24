"use client";

import { motion } from "framer-motion";
import { ArrowRight, MapPin, MessageCircle } from "lucide-react";
import Link from "next/link";
import { Mascot } from "@/components/brand/Mascot";
import { Container } from "@/components/layout/Container";
import { whatsappUrl, googleMapsRouteUrl, UNIT } from "@/lib/constants";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-mesh pt-10 pb-20 sm:pt-16 sm:pb-28">
      {/* Mascotes decorativos flutuando */}
      <motion.div
        className="absolute -right-12 top-20 hidden lg:block"
        animate={{ y: [0, -12, 0], rotate: [0, 3, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" as const }}
      >
        <Mascot name="globinho" size="lg" animate={false} />
      </motion.div>

      <motion.div
        className="absolute -left-6 bottom-10 hidden lg:block"
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" as const, delay: 1 }}
      >
        <Mascot name="espuma" size="md" animate={false} />
      </motion.div>

      <Container size="lg" className="relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl"
        >
          <div className="inline-flex items-center gap-2 rounded-full bg-xv-orange-bg px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-xv-orange">
            <span className="h-2 w-2 animate-pulse rounded-full bg-xv-orange" />
            Aberto agora · 6h às 23h
          </div>

          <h1 className="mt-6 text-4xl font-black leading-[1.05] text-xv-navy sm:text-5xl lg:text-6xl xl:text-7xl">
            Lave e seque suas roupas em{" "}
            <span className="relative inline-block">
              <span className="relative z-10 text-xv-orange">até 1 hora</span>
              <svg
                className="absolute -bottom-1 left-0 z-0 w-full text-xv-yellow"
                viewBox="0 0 200 10"
                preserveAspectRatio="none"
                aria-hidden
              >
                <path
                  d="M0 7 Q50 2 100 5 T200 4"
                  stroke="currentColor"
                  strokeWidth="6"
                  fill="none"
                  strokeLinecap="round"
                />
              </svg>
            </span>
            <br className="hidden sm:block" /> com praticidade, conforto e autonomia.
          </h1>

          <p className="mt-6 max-w-2xl text-lg text-xv-gray-700 sm:text-xl">
            Na <strong className="text-xv-navy">{UNIT.name}</strong> você chega, escolhe a
            máquina, paga pelo app ou totem, e vai embora com tudo pronto.{" "}
            <span className="text-xv-navy">
              Sem fila. Sem burocracia. Sem depender de ninguém.
            </span>
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <a
              href={whatsappUrl("home")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-green-300/30 transition hover:brightness-110 sm:text-base"
            >
              <MessageCircle size={18} />
              Chamar no WhatsApp
            </a>
            <a
              href={googleMapsRouteUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-xv-navy px-7 py-3.5 text-sm font-bold text-white shadow-lg transition hover:bg-xv-navy-light sm:text-base"
            >
              <MapPin size={18} />
              Como chegar
            </a>
            <Link
              href="#como-funciona"
              className="inline-flex items-center gap-1 rounded-full border-2 border-xv-navy/15 bg-white px-7 py-3.5 text-sm font-bold text-xv-navy transition hover:border-xv-navy/40 sm:text-base"
            >
              Como funciona <ArrowRight size={16} />
            </Link>
          </div>

          {/* Trust strip */}
          <div className="mt-12 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-bold text-xv-gray-500 sm:text-sm">
            <span className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-xv-cyan" />
              SpeedQueen profissional
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-xv-orange" />
              Bistrô com Wi-Fi
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-xv-yellow" />
              Vaga exclusiva na porta
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-xv-cyan" />
              Clube com até 20% de desconto
            </span>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
