import type { Metadata } from "next";
import Link from "next/link";
import { PackageSearch, Sparkles } from "lucide-react";
import {
  formatPoints,
  getActiveCategories,
  getMyPointsBalance,
  getStoreSettings,
  listProducts,
} from "@/lib/store";
import { ProductCard } from "./_components/ProductCard";
import { CategoryChips } from "./_components/CategoryChips";
import { Pagination } from "./_components/Pagination";
import { ActiveSearchChip, StoreToolbar } from "./_components/StoreToolbar";
import { PER_PAGE, parseStoreParams, storeHref } from "./_query";

export const metadata: Metadata = {
  title: "Store Xô Varal — produtos, brindes e vouchers",
  description:
    "Compre produtos oficiais, brindes e vouchers da Xô Varal Castelo. Pague em reais, com pontos do Clube de Vantagens ou combinando os dois.",
};

export const dynamic = "force-dynamic";

interface Props {
  searchParams: Record<string, string | string[] | undefined>;
}

export default async function StorePage({ searchParams }: Props) {
  const current = parseStoreParams(searchParams);

  const [settings, categories, result, balance] = await Promise.all([
    getStoreSettings(),
    getActiveCategories(),
    listProducts({
      categorySlug: current.cat,
      search: current.q,
      sort: current.sort,
      page: current.page,
      perPage: PER_PAGE,
    }),
    getMyPointsBalance(),
  ]);

  const activeCategory = categories.find((c) => c.slug === current.cat);
  const isFiltered = Boolean(current.cat || current.q);

  return (
    <div
      className="min-h-screen"
      style={{
        background:
          "linear-gradient(135deg, #f0fafe 0%, #fff8f2 50%, #fff3ea 100%)",
      }}
    >
      <div className="mx-auto max-w-6xl px-4 py-12 md:py-16">
        <header className="mx-auto max-w-2xl text-center">
          <p className="inline-block rounded-full bg-xv-orange-bg px-3 py-1 text-xs font-bold uppercase tracking-widest text-xv-orange">
            Store Xô Varal
          </p>
          <h1 className="mt-4 font-display text-4xl font-black text-xv-navy md:text-5xl">
            {activeCategory ? (
              activeCategory.name
            ) : (
              <>
                Compre com reais, <span className="text-xv-orange">pontos</span> ou
                os dois.
              </>
            )}
          </h1>
          <p className="mt-3 text-sm text-xv-gray-700 md:text-base">
            {activeCategory?.description ??
              "Produtos oficiais, brindes e vouchers de ciclo. Cada ponto do Clube de Vantagens vale " +
                (settings.point_value_cents / 100).toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }) +
                " no seu carrinho."}
          </p>
        </header>

        {balance != null ? (
          <div className="mx-auto mt-6 flex max-w-md items-center justify-center gap-2 rounded-2xl bg-white px-5 py-3 text-sm shadow-card ring-1 ring-xv-gray-200/60">
            <Sparkles size={16} className="text-xv-orange" />
            <span className="text-xv-gray-700">Sua carteira:</span>
            <strong className="font-display text-xv-navy">
              {formatPoints(balance)} pontos
            </strong>
          </div>
        ) : (
          <p className="mt-6 text-center text-sm text-xv-gray-700">
            <Link
              href="/clube-de-vantagens/entrar"
              className="font-bold text-xv-orange underline underline-offset-4"
            >
              Entre no Clube
            </Link>{" "}
            para usar seus pontos nas compras.
          </p>
        )}

        <CategoryChips categories={categories} current={current} />

        <div className="mt-6">
          <StoreToolbar current={current} total={result.total} />
          <ActiveSearchChip current={current} />
        </div>

        <section className="mt-8">
          {result.products.length === 0 ? (
            <div className="py-16 text-center text-xv-gray-500">
              <PackageSearch size={56} className="mx-auto text-xv-gray-300" />
              <p className="mt-4 font-display text-xl text-xv-navy">
                {isFiltered
                  ? "Nada encontrado com esses filtros."
                  : "Nenhum produto disponível ainda."}
              </p>
              <p className="mt-2 text-sm">
                {isFiltered
                  ? "Tente outra busca ou veja o catálogo completo."
                  : "Volte em breve — estamos preparando o catálogo!"}
              </p>
              {isFiltered ? (
                <Link
                  href="/store"
                  className="mt-6 inline-flex rounded-full bg-xv-navy px-6 py-3 text-sm font-bold text-white transition hover:brightness-110"
                >
                  Ver tudo
                </Link>
              ) : null}
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {result.products.map((p) => (
                <ProductCard
                  key={p.id}
                  product={p}
                  pointValueCents={settings.point_value_cents}
                />
              ))}
            </div>
          )}
        </section>

        <Pagination current={current} totalPages={result.totalPages} />

        {/* Página fora do intervalo: oferece a volta em vez de tela vazia. */}
        {result.products.length === 0 && current.page > 1 ? (
          <div className="mt-6 text-center">
            <Link
              href={storeHref(current, { page: 1 })}
              className="text-sm font-bold text-xv-orange underline underline-offset-4"
            >
              Voltar para a primeira página
            </Link>
          </div>
        ) : null}
      </div>
    </div>
  );
}
