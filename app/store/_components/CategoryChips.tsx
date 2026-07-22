import Link from "next/link";
import type { ProductCategoryRow } from "@/lib/types";
import { storeHref, type SortKey } from "../_query";

interface Props {
  categories: ProductCategoryRow[];
  current: { cat?: string; q?: string; sort: SortKey; page: number };
}

export function CategoryChips({ categories, current }: Props) {
  if (categories.length === 0) return null;

  const chip = (active: boolean) =>
    `whitespace-nowrap rounded-full px-4 py-2 text-sm font-bold transition ${
      active
        ? "bg-xv-navy text-white shadow-md"
        : "bg-white text-xv-navy ring-1 ring-xv-gray-200/60 hover:ring-xv-orange"
    }`;

  return (
    /* Rola horizontalmente no mobile em vez de quebrar a linha. */
    <nav
      aria-label="Categorias"
      className="-mx-4 mt-8 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0"
    >
      <Link
        href={storeHref(current, { cat: null })}
        className={chip(!current.cat)}
        aria-current={!current.cat ? "page" : undefined}
      >
        Tudo
      </Link>
      {categories.map((c) => (
        <Link
          key={c.id}
          href={storeHref(current, { cat: c.slug })}
          className={chip(current.cat === c.slug)}
          aria-current={current.cat === c.slug ? "page" : undefined}
        >
          {c.name}
        </Link>
      ))}
    </nav>
  );
}
