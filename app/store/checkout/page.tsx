import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, LogIn } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { getStoreSettings, getMyPointsBalance } from "@/lib/store";
import { CheckoutForm } from "./_components/CheckoutForm";

export const metadata: Metadata = {
  title: "Checkout — Store Xô Varal",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function CheckoutPage() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const settings = await getStoreSettings();

  if (!user) {
    return (
      <Shell>
        <div className="rounded-3xl bg-white p-8 text-center shadow-card ring-1 ring-xv-gray-200/60">
          <LogIn size={40} className="mx-auto text-xv-orange" />
          <h1 className="mt-4 font-display text-2xl font-black text-xv-navy">
            Entre para finalizar
          </h1>
          <p className="mt-2 text-sm text-xv-gray-700">
            Você precisa estar logado no Clube para fechar o pedido e usar seus
            pontos. Seu carrinho fica guardado — é só voltar depois de entrar.
          </p>
          <Link
            href="/clube-de-vantagens/entrar?next=/store/checkout"
            className="mt-6 inline-flex rounded-full bg-xv-navy px-6 py-3 text-sm font-bold text-white transition hover:brightness-110"
          >
            Entrar com Google
          </Link>
        </div>
      </Shell>
    );
  }

  const [{ data: customer }, balance] = await Promise.all([
    supabase
      .from("customers")
      .select("full_name")
      .eq("id", user.id)
      .maybeSingle<{ full_name: string | null }>(),
    getMyPointsBalance(),
  ]);

  return (
    <Shell>
      <CheckoutForm
        settings={settings}
        balance={balance ?? 0}
        defaultName={customer?.full_name ?? user.user_metadata?.full_name ?? ""}
      />
    </Shell>
  );
}

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="min-h-screen"
      style={{
        background:
          "linear-gradient(135deg, #f0fafe 0%, #fff8f2 50%, #fff3ea 100%)",
      }}
    >
      <div className="mx-auto max-w-3xl px-4 py-10 md:py-14">
        <Link
          href="/store/carrinho"
          className="inline-flex items-center gap-2 text-sm font-bold text-xv-gray-700 hover:text-xv-navy"
        >
          <ArrowLeft size={14} />
          Voltar ao carrinho
        </Link>
        <div className="mt-6">{children}</div>
      </div>
    </div>
  );
}
