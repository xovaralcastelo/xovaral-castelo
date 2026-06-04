"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Container } from "@/components/layout/Container";
import { Mascot } from "@/components/brand/Mascot";

const FOTOS = [
  { src: "/images/previas-2.jpg",  alt: "Interior da Xô Varal Castelo — máquinas SpeedQueen", span: "md:col-span-2 md:row-span-2" },
  { src: "/images/previas-6.jpg",  alt: "Área de bistrô com Wi-Fi", span: "" },
  { src: "/images/previas-8.jpg",  alt: "Ambiente aconchegante da lavanderia", span: "" },
  { src: "/images/previas-12.jpg", alt: "Espaço kids — área para crianças", span: "" },
  { src: "/images/previas-16.jpg", alt: "Máquinas SpeedQueen profissionais", span: "" },
  { src: "/images/previas-21.jpg", alt: "Fachada da Xô Varal Castelo", span: "md:col-span-2" },
];

export default function GaleriaFotos() {
  return (
    <section id="galeria" className="bg-white py-20 sm:py-28">
      <Container size="lg">
        <div className="grid items-end gap-8 md:grid-cols-[1fr_auto]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-xs font-bold uppercase tracking-wider text-xv-cyan">
              Conheça a loja
            </span>
            <h2 className="mt-3 text-4xl font-black text-xv-navy sm:text-5xl">
              Um ambiente feito{" "}
              <span className="text-xv-orange">pra você</span>
            </h2>
            <p className="mt-4 max-w-xl text-xv-gray-700">
              Moderno, climatizado e aconchegante. Venha lavar roupa num lugar onde dá prazer esperar.
            </p>
          </motion.div>
          <div className="hidden md:block">
            <Mascot name="meia" size="lg" />
          </div>
        </div>

        {/* Bento grid */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[200px]">
          {FOTOS.map((foto, i) => (
            <motion.div
              key={foto.src}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.35, delay: (i % 4) * 0.06 }}
              className={`relative rounded-[2rem] overflow-hidden shadow-card group ${foto.span}`}
            >
              <Image
                src={foto.src}
                alt={foto.alt}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-xv-navy/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <span className="text-white text-xs font-bold">{foto.alt}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
