import Link from "next/link";

interface Props {
  active: "partners" | "applications" | "promos";
  pendingCount: number;
}

export function PartnersTabs({ active, pendingCount }: Props) {
  const tabs = [
    { key: "partners", href: "/admin/partners", label: "Parceiros" },
    {
      key: "applications",
      href: "/admin/partners/applications",
      label: "Solicitações",
    },
    { key: "promos", href: "/admin/partners/promos", label: "Promoções" },
  ] as const;

  return (
    <div className="flex gap-1 border-b border-xv-gray-200">
      {tabs.map((t) => (
        <Link
          key={t.key}
          href={t.href}
          className={`inline-flex items-center gap-2 px-4 py-2.5 text-sm font-bold rounded-t-xl border-b-2 -mb-px transition ${
            active === t.key
              ? "border-xv-orange text-xv-navy bg-white"
              : "border-transparent text-xv-gray-700 hover:text-xv-navy hover:bg-white/60"
          }`}
        >
          {t.label}
          {t.key === "applications" && pendingCount > 0 ? (
            <span className="inline-flex items-center justify-center min-w-5 h-5 px-1.5 rounded-full bg-xv-orange text-white text-xs font-bold">
              {pendingCount}
            </span>
          ) : null}
        </Link>
      ))}
    </div>
  );
}
