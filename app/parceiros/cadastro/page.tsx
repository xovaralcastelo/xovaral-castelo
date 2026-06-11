import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Handshake } from "lucide-react";
import { ApplicationForm } from "./_components/ApplicationForm";

export const metadata: Metadata = {
  title: "Seja Parceiro | Xô Varal Castelo",
  description:
    "Cadastre seu negócio para ser parceiro da Xô Varal Castelo. Visibilidade para mais de 470 clientes ativos no Castelo.",
};

export const dynamic = "force-dynamic";

export default function CadastroParceiroPage() {
  return (
    <div
      className="min-h-screen relative px-4 py-10 sm:py-16"
      style={{
        background:
          "linear-gradient(135deg, #f0fafe 0%, #fff8f2 50%, #fff3ea 100%)",
      }}
    >
      <div
        className="pointer-events-none absolute top-0 left-0 h-80 w-80 rounded-full blur-3xl opacity-20"
        style={{ background: "#01B3DC" }}
      />
      <div
        className="pointer-events-none absolute bottom-0 right-0 h-64 w-64 rounded-full blur-3xl opacity-20"
        style={{ background: "#EE7531" }}
      />

      <div className="relative z-10 max-w-xl mx-auto">
        <Link
          href="/parceiros"
          className="inline-flex items-center gap-2 text-sm font-bold text-xv-navy/60 hover:text-xv-navy transition mb-6"
        >
          <ArrowLeft size={16} />
          Voltar para Parceiros
        </Link>

        <div className="rounded-[2rem] bg-white p-6 sm:p-10 shadow-card ring-1 ring-xv-gray-200/60">
          <div className="flex items-center gap-3 mb-2">
            <div className="rounded-full bg-xv-orange/10 p-2.5 text-xv-orange">
              <Handshake size={22} />
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-xv-orange">
              Parceria Xô Varal Castelo
            </span>
          </div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-xv-navy mb-2">
            Cadastre seu negócio
          </h1>
          <p className="text-sm text-xv-gray-700 mb-8">
            Preencha em 2 minutos. Nossa equipe avalia e retorna pelo WhatsApp
            em até 24h úteis.
          </p>

          <ApplicationForm />
        </div>
      </div>
    </div>
  );
}
