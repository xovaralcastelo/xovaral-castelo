"use client";

import { motion } from "framer-motion";
import {
  MapPin,
  Sparkles,
  Smartphone,
  Coffee,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Mascot } from "@/components/brand/Mascot";
import { HOW_IT_WORKS_STEPS } from "@/content/steps";

const ICON_MAP = { MapPin, Sparkles, Smartphone, Coffee, CheckCircle2 };

export default function HowItWorks() {
  return (
    <section
      id="como-funciona"
      className="relative bg-white py-20 sm:py-28"
    >
      <Container size="lg">
        <div className="flex flex-col items-center text-center">
          <div className="flex items-center gap-3">
            <Mascot name="globinho" size="sm" />
            <span className="text-xs font-bold uppercase tracking-wider text-xv-cyan">
              Em 5 passos simples
            </span>
          </div>
          <h2 className="mt-4 max-w-2xl text-4xl font-black text-xv-navy sm:text-5xl">
            Como funciona o autosserviço
          </h2>
          <p className="mt-4 max-w-2xl text-lg text-xv-gray-700">
            Você opera. Você controla. Você vai embora com a roupa pronta.
            Sem aprender nada complicado.
          </p>
        </div>

        <div className="mt-16 grid gap-5 md:grid-cols-2 lg:grid-cols-5">
          {HOW_IT_WORKS_STEPS.map((step, i) => {
            const Icon = ICON_MAP[step.icon as keyof typeof ICON_MAP];
            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="group relative rounded-2xl bg-xv-gray-50 p-6 transition hover:bg-white hover:shadow-lg"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-xv-navy text-sm font-black text-white">
                    {step.number}
                  </div>
                  {Icon && <Icon size={22} className="text-xv-orange" />}
                </div>
                <h3 className="mt-4 text-lg font-black text-xv-navy">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-xv-gray-700">
                  {step.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-12 flex justify-center">
          <Link
            href="/como-funciona"
            className="inline-flex items-center gap-2 rounded-full border-2 border-xv-navy/15 bg-white px-6 py-3 text-sm font-bold text-xv-navy transition hover:border-xv-navy/40"
          >
            Ver tutorial completo
            <ArrowRight size={16} />
          </Link>
        </div>
      </Container>
    </section>
  );
}
