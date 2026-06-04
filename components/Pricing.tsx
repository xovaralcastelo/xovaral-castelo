"use client";

import { motion } from "framer-motion";
import { Droplets, Sparkles, CircleCheck, MessageCircle } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { whatsappUrl } from "@/lib/constants";

export default function Pricing() {
  return (
    <section id="precos" className="bg-xv-gray-50 py-20 sm:py-28">
      <Container size="lg">
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-xs font-bold uppercase tracking-wider text-xv-orange">
            Preço claro, sem surpresa
          </span>
          <h2 className="mt-3 text-4xl font-black text-xv-navy sm:text-5xl">
            Quanto custa?
          </h2>
          <p className="mt-4 text-xv-gray-700">
            Pague apenas pelo ciclo que usar. Sem mensalidade, sem taxa oculta.
          </p>
        </div>

        <div className="mx-auto mt-12 grid max-w-3xl gap-6 sm:grid-cols-2">
          {/* Lavagem */}
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.4 }}
            className="group relative overflow-hidden rounded-[2rem] bg-white p-8 text-center shadow-card ring-1 ring-xv-gray-200/60 transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover"
          >
            <div className="absolute inset-x-0 top-0 h-1.5 origin-left scale-x-0 rounded-t-[2rem] bg-xv-cyan transition-transform duration-500 group-hover:scale-x-100" />
            <div className="absolute right-6 top-6 h-32 w-32 rounded-full bg-xv-cyan/5 blur-2xl" />

            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-xv-cyan-bg">
              <Droplets size={28} className="text-xv-cyan" />
            </div>

            <h3 className="mt-5 text-xl font-black text-xv-navy">Lavagem</h3>

            <div className="mt-3 text-5xl font-black text-xv-cyan">
              R$ 17,00
            </div>

            <p className="mt-3 text-sm text-xv-gray-700">
              Ciclo completo de lavagem — 10,5 kg
            </p>

            <div className="mt-5 inline-flex items-center gap-1.5 rounded-full bg-xv-cyan-bg px-4 py-1.5 text-xs font-bold text-xv-cyan">
              ⏱ ~45 min
            </div>
          </motion.article>

          {/* Secagem */}
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.4, delay: 0.08 }}
            className="group relative overflow-hidden rounded-[2rem] bg-white p-8 text-center shadow-card ring-1 ring-xv-gray-200/60 transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover"
          >
            <div className="absolute inset-x-0 top-0 h-1.5 origin-left scale-x-0 rounded-t-[2rem] bg-xv-orange transition-transform duration-500 group-hover:scale-x-100" />
            <div className="absolute right-6 top-6 h-32 w-32 rounded-full bg-xv-orange/5 blur-2xl" />

            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-xv-orange-bg">
              <Sparkles size={28} className="text-xv-orange" />
            </div>

            <h3 className="mt-5 text-xl font-black text-xv-navy">Secagem</h3>

            <div className="mt-3 text-5xl font-black text-xv-orange">
              R$ 16,99
            </div>

            <p className="mt-3 text-sm text-xv-gray-700">
              Ciclo completo de secagem — 10,5 kg
            </p>

            <div className="mt-5 inline-flex items-center gap-1.5 rounded-full bg-xv-orange-bg px-4 py-1.5 text-xs font-bold text-xv-orange">
              ⏱ ~45 min
            </div>
          </motion.article>
        </div>

        {/* Insumos info bar */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.4, delay: 0.16 }}
          className="mx-auto mt-8 max-w-3xl rounded-3xl border-2 border-green-200 bg-green-50/60 p-6"
        >
          <div className="flex items-start gap-4">
            <CircleCheck size={22} className="mt-0.5 flex-shrink-0 text-green-600" />
            <div>
              <p className="font-bold text-xv-navy">
                OMO + Comfort profissional — já incluso em cada ciclo
              </p>
              <p className="mt-1 text-sm text-xv-gray-700">
                Não precisa trazer sabão nem amaciante. Só as suas roupas.
                Combo Lavagem + Secagem sai por <strong className="text-xv-navy">R$ 33,99</strong>.
              </p>
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <div className="mt-10 text-center">
          <a
            href={whatsappUrl("pricing")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-bold text-white shadow-xl transition hover:-translate-y-0.5"
            style={{ background: "linear-gradient(90deg, #25D366, #1FBA57)", boxShadow: "0 20px 40px -10px rgba(34,197,94,0.4)" }}
          >
            <MessageCircle size={18} />
            Tenho dúvidas — chamar no WhatsApp
          </a>
        </div>
      </Container>
    </section>
  );
}
