import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { storeHref, type SortKey } from "../_query";

interface Props {
  current: { cat?: string; q?: string; sort: SortKey; page: number };
  totalPages: number;
}

export function Pagination({ current, totalPages }: Props) {
  if (totalPages <= 1) return null;

  const page = Math.min(current.page, totalPages);
  const box =
    "inline-flex h-10 min-w-10 items-center justify-center rounded-full px-3 text-sm font-bold transition";

  return (
    <nav
      aria-label="Paginação"
      className="mt-12 flex items-center justify-center gap-2"
    >
      {page > 1 ? (
        <Link
          href={storeHref(current, { page: page - 1 })}
          rel="prev"
          aria-label="Página anterior"
          className={`${box} bg-white text-xv-navy ring-1 ring-xv-gray-200/60 hover:ring-xv-orange`}
        >
          <ChevronLeft size={16} />
        </Link>
      ) : null}

      <span className={`${box} bg-xv-navy text-white`}>
        {page} <span className="mx-1 font-normal opacity-60">de</span> {totalPages}
      </span>

      {page < totalPages ? (
        <Link
          href={storeHref(current, { page: page + 1 })}
          rel="next"
          aria-label="Próxima página"
          className={`${box} bg-white text-xv-navy ring-1 ring-xv-gray-200/60 hover:ring-xv-orange`}
        >
          <ChevronRight size={16} />
        </Link>
      ) : null}
    </nav>
  );
}
