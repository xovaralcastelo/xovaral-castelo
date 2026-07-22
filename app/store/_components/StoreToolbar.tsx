"use client";

import { useRouter } from "next/navigation";
import { Search, X } from "lucide-react";
import { SORT_OPTIONS, storeHref, type SortKey } from "../_query";

interface Props {
  current: { cat?: string; q?: string; sort: SortKey; page: number };
  total: number;
}

/**
 * Busca e ordenação. A busca é um form GET de verdade (funciona sem JS);
 * o select de ordenação navega no onChange.
 */
export function StoreToolbar({ current, total }: Props) {
  const router = useRouter();

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <form action="/store" method="get" className="relative flex-1 sm:max-w-md">
        {/* Preserva os demais filtros ao buscar. */}
        {current.cat ? <input type="hidden" name="cat" value={current.cat} /> : null}
        {current.sort !== "relevancia" ? (
          <input type="hidden" name="sort" value={current.sort} />
        ) : null}

        <Search
          size={16}
          className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-xv-gray-500"
        />
        <input
          type="search"
          name="q"
          defaultValue={current.q ?? ""}
          placeholder="Buscar na Store…"
          aria-label="Buscar produtos"
          /* 16px no mobile evita o zoom automático do iOS */
          className="w-full rounded-full bg-white py-3 pl-11 pr-4 text-base sm:text-sm font-medium text-xv-navy shadow-card ring-1 ring-xv-gray-200/60 outline-none transition placeholder:text-xv-gray-500 focus:ring-2 focus:ring-xv-orange"
        />
      </form>

      <div className="flex items-center gap-3">
        <span className="hidden text-xs font-bold text-xv-gray-500 sm:block">
          {total} {total === 1 ? "produto" : "produtos"}
        </span>
        <label className="sr-only" htmlFor="store-sort">
          Ordenar por
        </label>
        <select
          id="store-sort"
          value={current.sort}
          onChange={(e) =>
            router.push(storeHref(current, { sort: e.target.value as SortKey }))
          }
          className="rounded-full bg-white px-4 py-3 text-base sm:text-sm font-bold text-xv-navy shadow-card ring-1 ring-xv-gray-200/60 outline-none focus:ring-2 focus:ring-xv-orange"
        >
          {SORT_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

/** Chip que mostra a busca ativa e permite limpá-la. */
export function ActiveSearchChip({ current }: { current: Props["current"] }) {
  if (!current.q) return null;
  return (
    <div className="mt-4 flex items-center gap-2 text-sm text-xv-gray-700">
      <span>
        Resultados para <strong className="text-xv-navy">“{current.q}”</strong>
      </span>
      <a
        href={storeHref(current, { q: null })}
        className="inline-flex items-center gap-1 rounded-full bg-white px-3 py-1 text-xs font-bold text-xv-navy ring-1 ring-xv-gray-200/60 hover:ring-xv-orange"
      >
        <X size={12} />
        limpar
      </a>
    </div>
  );
}
