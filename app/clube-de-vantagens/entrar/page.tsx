import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { GoogleSignInButton } from "./_components/GoogleSignInButton";

export const metadata: Metadata = {
  title: "Entrar — Clube de Vantagens | Xô Varal Castelo",
  description:
    "Acesse sua conta do Clube de Vantagens Xô Varal Castelo. Veja seu nível, descontos e histórico.",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

interface PageProps {
  searchParams: { error?: string; next?: string };
}

export default async function EntrarPage({ searchParams }: PageProps) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Só aceita caminhos internos como destino pós-login (evita open redirect).
  const next =
    searchParams.next && searchParams.next.startsWith("/")
      ? searchParams.next
      : undefined;

  if (user) {
    redirect(next ?? "/minha-conta");
  }

  const hasError = searchParams.error === "auth";

  return (
    <div
      className="min-h-screen relative flex flex-col items-center justify-center px-4 py-16"
      style={{
        background:
          "linear-gradient(135deg, #f0fafe 0%, #fff8f2 50%, #fff3ea 100%)",
      }}
    >
      {/* Blobs decorativos */}
      <div
        className="pointer-events-none absolute top-0 left-0 h-80 w-80 rounded-full blur-3xl opacity-20"
        style={{ background: "#01B3DC" }}
      />
      <div
        className="pointer-events-none absolute bottom-0 right-0 h-64 w-64 rounded-full blur-3xl opacity-20"
        style={{ background: "#EE7531" }}
      />

      <Link
        href="/clube-de-vantagens"
        className="absolute top-8 left-6 flex items-center gap-2 text-sm font-bold text-xv-navy/60 hover:text-xv-navy transition"
      >
        <ArrowLeft size={16} />
        Voltar
      </Link>

      <div className="relative z-10 w-full max-w-md rounded-[2rem] bg-white p-10 shadow-card ring-1 ring-xv-gray-200/60">
        <div className="flex justify-center mb-6">
          <Image
            src="/logo-xovaral.png"
            alt="Xô Varal"
            width={120}
            height={40}
            className="h-10 w-auto"
          />
        </div>

        <h1 className="font-display text-2xl font-bold text-xv-navy text-center mb-2">
          Bem-vindo de volta
        </h1>
        <p className="text-xv-gray-700 text-center text-sm mb-8">
          Acesse seu nível, descontos e histórico do clube em 1 toque.
        </p>

        {hasError ? (
          <p
            role="alert"
            className="mb-4 rounded-2xl bg-red-50 px-4 py-3 text-center text-xs text-red-700 ring-1 ring-red-200"
          >
            Não conseguimos completar seu login. Tente novamente.
          </p>
        ) : null}

        <GoogleSignInButton next={next} />

        <p className="text-center text-xs text-xv-gray-500 mt-6">
          Ao continuar, você concorda com os termos de uso do Clube de
          Vantagens Xô Varal Castelo.
        </p>
      </div>

      <p className="relative z-10 mt-8 text-center text-xs text-xv-gray-500 max-w-xs">
        Sua conta dá acesso ao nível do clube, histórico de ciclos e descontos
        automáticos.
      </p>
    </div>
  );
}
