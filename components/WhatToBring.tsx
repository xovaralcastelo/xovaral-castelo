"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Container } from "@/components/layout/Container";

const traga = [
  "Suas roupas, roupas de cama, edredons ou toalhas",
  "Seu celular (pra pagar pelo app, opcional)",
  "Uma sacola ou cesto pra transportar",
];

const naoTraga = [
  "Sabão em pó ou líquido — já incluído",
  "Amaciante — OMO e Comfort já estão no ciclo",
  "Alvejante ou qualquer produto extra",
  "Agendamento ou reserva prévia",
];

export default function WhatToBring() {
  return (
    <section
      id="o-que-trazer"
      className="py-20 sm:py-28"
      style={{ background: "linear-gradient(180deg, #E5F7FF 0%, #F0FAFE 50%, #E5F7FF 100%)" }}
    >
      <Container size="lg">
        {/* Mascot + floating pills header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="relative flex flex-col items-center mb-12"
        >
          <div className="flex items-center gap-8 mb-6">
            <div className="hidden sm:flex items-center gap-2 rounded-full bg-white px-4 py-2 shadow-md text-sm font-bold text-xv-navy">
              <span className="h-2 w-2 rounded-full bg-xv-orange animate-pulse" />
              SPOILER:
            </div>

            <Image
              src="/mascotes/estrela-t.png"
              alt="Luma, mascote da Xô Varal"
              width={160}
              height={160}
              className="drop-shadow-2xl"
              style={{ transform: "rotate(7deg)" }}
            />

            <div className="hidden sm:flex items-center gap-2 rounded-full bg-white px-4 py-2 shadow-md text-sm font-bold text-xv-navy">
              <span className="h-2 w-2 rounded-full bg-xv-cyan animate-pulse" />
              BEM MENOS DO QUE IMAGINA
            </div>
          </div>

          <span className="text-xs font-bold uppercase tracking-wider text-xv-cyan">
            Antes de vir
          </span>
          <h2 className="mt-3 text-4xl font-black text-xv-navy sm:text-5xl text-center">
            O que preciso{" "}
            <span className="relative inline-block">
              <span className="relative z-10">levar?</span>
              <svg
                className="absolute -bottom-1 left-0 z-0 w-full text-xv-cyan"
                viewBox="0 0 120 8"
                preserveAspectRatio="none"
                aria-hidden
              >
                <path
                  d="M0 6 Q30 1 60 4 T120 3"
                  stroke="currentColor"
                  strokeWidth="5"
                  fill="none"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </h2>
          <p className="mt-4 text-xv-gray-700 text-center max-w-xl">
            Sem complicação. Você traz pouca coisa — o resto fica por nossa conta.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid gap-6 md:grid-cols-2 max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.4 }}
            className="rounded-[2rem] bg-white p-6 shadow-card ring-1 ring-green-100"
            style={{ boxShadow: "0 8px 40px -8px rgba(34,197,94,0.25)" }}
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl text-white text-xl" style={{ background: "linear-gradient(135deg, #22c55e, #16a34a)" }}>
                🛍️
              </div>
              <h3 className="text-lg font-black text-xv-navy">Traga apenas</h3>
            </div>
            <ul className="space-y-3">
              {traga.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-xv-gray-700">
                  <svg className="mt-0.5 flex-shrink-0 h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.4, delay: 0.08 }}
            className="rounded-[2rem] bg-white p-6 shadow-card ring-1 ring-red-100"
            style={{ boxShadow: "0 8px 40px -8px rgba(239,68,68,0.2)" }}
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl text-white text-xl" style={{ background: "linear-gradient(135deg, #ef4444, #dc2626)" }}>
                🚫
              </div>
              <h3 className="text-lg font-black text-xv-navy">Não precisa trazer</h3>
            </div>
            <ul className="space-y-3">
              {naoTraga.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-xv-gray-700">
                  <svg className="mt-0.5 flex-shrink-0 h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
