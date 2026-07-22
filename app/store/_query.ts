import type { ProductQuery } from "@/lib/store";

export type SortKey = NonNullable<ProductQuery["sort"]>;

export const SORT_OPTIONS: { value: SortKey; label: string }[] = [
  { value: "relevancia", label: "Mais relevantes" },
  { value: "menor-preco", label: "Menor preço" },
  { value: "maior-preco", label: "Maior preço" },
  { value: "novidades", label: "Novidades" },
];

export const PER_PAGE = 12;

export interface StoreSearchParams {
  cat?: string;
  q?: string;
  sort?: string;
  page?: string;
}

/** Lê os searchParams crus da rota, descartando o que não reconhecemos. */
export function parseStoreParams(
  raw: Record<string, string | string[] | undefined>,
): { cat?: string; q?: string; sort: SortKey; page: number } {
  const first = (v: string | string[] | undefined) =>
    (Array.isArray(v) ? v[0] : v)?.trim() || undefined;

  const sortRaw = first(raw.sort);
  const sort = SORT_OPTIONS.some((o) => o.value === sortRaw)
    ? (sortRaw as SortKey)
    : "relevancia";

  const pageNum = Number.parseInt(first(raw.page) ?? "1", 10);

  return {
    cat: first(raw.cat),
    q: first(raw.q),
    sort,
    page: Number.isFinite(pageNum) && pageNum > 0 ? pageNum : 1,
  };
}

/**
 * Monta a URL da store trocando só o que o `patch` define.
 * `null` remove o parâmetro. Trocar filtro sempre volta pra página 1.
 */
export function storeHref(
  current: { cat?: string; q?: string; sort: SortKey; page: number },
  patch: Partial<{ cat: string | null; q: string | null; sort: SortKey; page: number }>,
): string {
  const next = { ...current, ...patch };
  const resetsPage = "cat" in patch || "q" in patch || "sort" in patch;
  const params = new URLSearchParams();

  const cat = patch.cat === null ? undefined : next.cat;
  const q = patch.q === null ? undefined : next.q;

  if (cat) params.set("cat", cat);
  if (q) params.set("q", q);
  if (next.sort && next.sort !== "relevancia") params.set("sort", next.sort);

  const page = resetsPage ? 1 : next.page;
  if (page > 1) params.set("page", String(page));

  const qs = params.toString();
  return qs ? `/store?${qs}` : "/store";
}
