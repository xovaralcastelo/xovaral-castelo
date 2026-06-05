import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { ProductCard } from "./_components/ProductCard";
import type { Product } from "@/lib/types";

export const metadata: Metadata = {
  title: "Store Xô Varal — produtos, brindes e vouchers",
  description:
    "Troque seus pontos do Clube de Vantagens por brindes, vouchers de ciclo, benefícios de parceiros e produtos oficiais Xô Varal Castelo.",
};

export const dynamic = "force-dynamic";

export default async function StorePage() {
  const supabase = createClient();
  const { data: products = [] } = await supabase
    .from("products")
    .select("*")
    .eq("status", "active")
    .order("display_order", { ascending: true })
    .order("created_at", { ascending: false });

  const list = (products ?? []) as Product[];

  return (
    <div
      className="min-h-screen"
      style={{
        background:
          "linear-gradient(135deg, #f0fafe 0%, #fff8f2 50%, #fff3ea 100%)",
      }}
    >
      <div className="mx-auto max-w-6xl px-4 py-12 md:py-16">
        <header className="text-center max-w-2xl mx-auto">
          <p className="inline-block text-xs font-bold uppercase tracking-widest text-xv-orange bg-xv-orange-bg px-3 py-1 rounded-full">
            Store Xô Varal
          </p>
          <h1 className="mt-4 font-display text-4xl md:text-5xl font-black text-xv-navy">
            Troque pontos. <span className="text-xv-orange">Aproveite.</span>
          </h1>
          <p className="mt-3 text-sm md:text-base text-xv-gray-700">
            Brindes oficiais, vouchers de ciclo grátis e benefícios de parceiros
            locais. Acumule ciclos no Clube de Vantagens e resgate aqui.
          </p>
        </header>

        <section className="mt-12">
          {list.length === 0 ? (
            <div className="text-center py-16 text-xv-gray-500">
              <p className="font-display text-xl">Nenhum produto disponível ainda.</p>
              <p className="text-sm mt-2">Volte em breve — estamos preparando o catálogo!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {list.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
