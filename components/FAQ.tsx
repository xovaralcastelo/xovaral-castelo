"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Mascot } from "@/components/brand/Mascot";
import { FAQS } from "@/content/faq";
import { cn } from "@/lib/utils";

interface FAQProps {
  limit?: number;
}

export default function FAQ({ limit }: FAQProps) {
  const items = limit ? FAQS.slice(0, limit) : FAQS;
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="relative bg-xv-gray-50 py-20 sm:py-28">
      <Container size="md">
        <div className="flex flex-col items-center text-center">
          <div className="flex items-center gap-3">
            <Mascot name="meia" size="sm" />
            <span className="text-xs font-bold uppercase tracking-wider text-xv-orange">
              Tira-dúvidas
            </span>
          </div>
          <h2 className="mt-4 text-4xl font-black text-xv-navy sm:text-5xl">
            Perguntas frequentes
          </h2>
          <p className="mt-4 max-w-xl text-xv-gray-700">
            Se for sua primeira vez, talvez sua dúvida esteja aqui. Se não estiver, é só
            mandar mensagem que a gente responde rapidinho.
          </p>
        </div>

        <div className="mx-auto mt-12 max-w-3xl space-y-3">
          {items.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={item.question}
                className={cn(
                  "overflow-hidden rounded-2xl border transition",
                  isOpen
                    ? "border-xv-orange bg-white shadow-md"
                    : "border-xv-gray-200 bg-white"
                )}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="flex w-full items-start gap-4 px-5 py-4 text-left transition hover:bg-xv-gray-50/50"
                  aria-expanded={isOpen}
                >
                  <span className="flex-1 text-base font-black text-xv-navy">
                    {item.question}
                  </span>
                  <span
                    className={cn(
                      "mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full transition",
                      isOpen
                        ? "bg-xv-orange text-white"
                        : "bg-xv-gray-100 text-xv-navy"
                    )}
                  >
                    {isOpen ? <Minus size={14} /> : <Plus size={14} />}
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="px-5 pb-5 text-sm leading-relaxed text-xv-gray-700">
                        {item.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
