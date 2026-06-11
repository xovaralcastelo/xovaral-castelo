"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { MessageCircle, MapPin, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Mascot } from "@/components/brand/Mascot";
import { whatsappUrl, googleMapsRouteUrl, UNIT } from "@/lib/constants";

export default function Hero({ content }: { content?: Record<string, string> }) {
  const t = (k: string, d: string) => content?.[k]?.trim() || d;
  const imageUrl = t("hero.image_url", "/images/previas-2.jpg");
  return (
    <section className="relative overflow-hidden bg-mesh pt-10 pb-20 sm:pt-16 sm:pb-28">
      {/* Floating mascots — desktop only */}
      <motion.div
        className="pointer-events-none absolute -right-10 top-16 hidden lg:block"
        animate={{ y: [0, -12, 0], rotate: [0, 3, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        <Mascot name="globinho" size="lg" animate={false} />
      </motion.div>

      <Container size="lg" className="relative">
        <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-14">
          {/* Left — Copy */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 rounded-full bg-xv-orange-bg px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-xv-orange">
              <span
                className="relative flex h-2.5 w-2.5"
              >
                <span
                  className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75"
                  style={{ backgroundColor: "#39FF14" }}
                />
                <span
                  className="relative inline-flex h-2.5 w-2.5 rounded-full shadow-[0_0_8px_rgba(57,255,20,0.8)]"
                  style={{ backgroundColor: "#39FF14" }}
                />
              </span>
              {t("hero.kicker", "Aberto agora · 24 horas")}
            </div>

            {/* Foto mobile — só aparece em telas pequenas (desktop usa a Photo lateral) */}
            <div className="mt-6 relative h-56 w-full overflow-hidden rounded-3xl shadow-xl lg:hidden">
              <Image
                src={imageUrl}
                alt="Interior da Xô Varal Castelo"
                fill
                className="object-cover"
                priority
                sizes="100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-xv-navy/50 via-transparent to-transparent" />
              <div className="absolute left-4 bottom-4 right-4 flex items-end justify-between gap-3">
                <div className="rounded-2xl bg-xv-navy/90 backdrop-blur-sm px-4 py-2.5 shadow-xl">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-white/60">Por etapa</div>
                  <div className="text-base font-black text-white">45 min</div>
                </div>
                <div className="rounded-2xl bg-xv-orange px-4 py-2.5 shadow-xl">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-white/80">Ciclo completo</div>
                  <div className="text-base font-black text-white">R$ 33,99</div>
                </div>
              </div>
            </div>

            <h1 className="mt-6 text-4xl font-black leading-[1.05] text-xv-navy sm:text-5xl lg:text-6xl">
              {t("hero.headline_pre", "Lave e seque suas roupas em")}{" "}
              <span className="relative inline-block">
                <span className="relative z-10 text-xv-orange">{t("hero.headline_highlight", "até 1 hora")}</span>
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
              <br className="hidden sm:block" /> {t("hero.headline_post", "com praticidade e conforto.")}
            </h1>

            <p className="mt-6 max-w-xl text-lg text-xv-gray-700">
              {content?.["hero.subtitle"]?.trim() ? (
                t("hero.subtitle", "")
              ) : (
                <>
                  Na <strong className="text-xv-navy">{UNIT.name}</strong> você chega, escolhe a
                  máquina, paga pelo app ou totem, e vai embora com tudo pronto.{" "}
                  <span className="text-xv-navy font-semibold">Sem fila. Sem burocracia.</span>
                </>
              )}
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
            <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-bold text-xv-gray-500 sm:text-sm">
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
                Clube com até 20% off
              </span>
            </div>
          </motion.div>

          {/* Right — Photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative hidden lg:block"
          >
            <div className="relative h-[520px] w-full overflow-hidden rounded-3xl shadow-2xl">
              <Image
                src={imageUrl}
                alt="Interior da Xô Varal Castelo"
                fill
                className="object-cover"
                priority
                sizes="(max-width: 1024px) 0px, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-xv-navy/40 via-transparent to-transparent" />
            </div>

            {/* Floating card top-right — dark navy like Buritis */}
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -right-5 top-8 rounded-2xl bg-xv-navy p-4 shadow-xl"
            >
              <div className="text-xs font-bold uppercase tracking-wider text-white/60">Por etapa</div>
              <div className="mt-1 text-xl font-black text-white">45 min</div>
              <div className="mt-0.5 text-xs text-white/60">Lavagem ou secagem</div>
            </motion.div>

            {/* Floating card bottom-left */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
              className="absolute -left-5 bottom-12 rounded-2xl bg-xv-orange px-5 py-4 text-white shadow-xl"
            >
              <div className="text-xs font-bold uppercase tracking-wider text-white/80">Ciclo completo</div>
              <div className="mt-1 text-2xl font-black">R$ 33,99</div>
              <div className="mt-0.5 text-xs text-white/80">Lavagem + Secagem</div>
            </motion.div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
