"use client";

import { motion } from "framer-motion";
import { TESTIMONIALS } from "@/lib/constants";
import { Container } from "@/components/layout/Container";

const avatarColors = ["#253163", "#EE7531", "#01B3DC", "#FBC132", "#1E4A9F", "#EE7531"];

function Star() {
  return (
    <svg className="h-4 w-4 text-xv-yellow" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
}

export default function Testimonials() {
  return (
    <section id="depoimentos" className="bg-xv-gray-50 py-20 sm:py-28">
      <Container size="lg">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <span className="text-xs font-bold uppercase tracking-wider text-xv-cyan">
            O que dizem nossos clientes
          </span>
          <h2 className="mt-3 text-4xl font-black text-xv-navy sm:text-5xl">
            Mais de <span className="text-xv-orange">250 clientes</span> escolheram a Xô Varal
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-xv-gray-700">
            Eles testaram. Voltaram. Ficaram. Essas são as histórias reais de quem já faz parte da nossa rotina.
          </p>
        </motion.div>

        {/* Stats */}
        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {[
            { value: "250+",       label: "clientes atendidos" },
            { value: "97%",        label: "de satisfação" },
            { value: "6h–23h",     label: "todos os dias" },
            { value: "SpeedQueen", label: "máquinas profissionais" },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: i * 0.06 }}
              className="rounded-2xl bg-white p-5 text-center shadow-card ring-1 ring-xv-gray-200/60"
            >
              <div className="text-2xl font-black text-xv-navy">{stat.value}</div>
              <div className="mt-1 text-xs text-xv-gray-500">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Review cards */}
        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {TESTIMONIALS.map((t, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.35, delay: (idx % 3) * 0.08 }}
              className="flex flex-col rounded-[2rem] bg-white p-6 shadow-card ring-1 ring-xv-gray-200/60 transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover"
            >
              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: t.stars }).map((_, i) => (
                  <Star key={i} />
                ))}
              </div>
              <p className="flex-1 text-sm leading-relaxed text-xv-gray-700">
                &ldquo;{t.text}&rdquo;
              </p>
              <div className="mt-5 flex items-center gap-3 border-t border-xv-gray-200/60 pt-4">
                <div
                  className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full text-sm font-black text-white"
                  style={{ backgroundColor: avatarColors[idx % avatarColors.length] }}
                >
                  {t.avatar}
                </div>
                <div>
                  <div className="text-sm font-bold text-xv-navy">{t.name}</div>
                  <div className="text-xs text-xv-gray-500">{t.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
