"use client";

import { motion } from "framer-motion";
import {
  Clock,
  Award,
  Wind,
  Building2,
  Users,
  CloudRain,
  Heart,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import { Container } from "@/components/layout/Container";
import { SELF_SERVICE_BENEFITS } from "@/content/benefits";

const ICON_MAP: Record<string, LucideIcon> = {
  Clock,
  Award,
  Wind,
  Building2,
  Users,
  CloudRain,
  Heart,
  Sparkles,
};

export default function WhySection() {
  return (
    <section className="relative bg-xv-gray-50 py-20 sm:py-28">
      <Container size="lg">
        <div className="max-w-2xl">
          <span className="text-xs font-bold uppercase tracking-wider text-xv-orange">
            Por que self-service?
          </span>
          <h2 className="mt-3 text-4xl font-black text-xv-navy sm:text-5xl">
            8 motivos pra trocar a máquina do prédio pela Xô Varal
          </h2>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {SELF_SERVICE_BENEFITS.map((b, i) => {
            const Icon = ICON_MAP[b.icon];
            return (
              <motion.div
                key={b.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.35, delay: (i % 4) * 0.06 }}
                className="rounded-2xl bg-white p-6 shadow-sm transition hover:shadow-md"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-xv-orange-bg text-xv-orange">
                  {Icon && <Icon size={22} />}
                </div>
                <h3 className="mt-4 text-base font-black text-xv-navy">{b.title}</h3>
                <p className="mt-1.5 text-sm text-xv-gray-700">{b.description}</p>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
