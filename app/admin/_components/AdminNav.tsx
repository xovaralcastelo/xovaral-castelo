"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  Users,
  Gift,
  ExternalLink,
  FileText,
  MessageSquareQuote,
  Handshake,
  Settings,
  Menu,
  X,
  type LucideIcon,
} from "lucide-react";

const NAV: {
  href: string;
  label: string;
  icon: LucideIcon;
  section: string | null;
}[] = [
  { href: "/admin", label: "Painel", icon: LayoutDashboard, section: null },
  { href: "/admin/content", label: "Conteúdo do site", icon: FileText, section: "content" },
  { href: "/admin/testimonials", label: "Depoimentos", icon: MessageSquareQuote, section: "testimonials" },
  { href: "/admin/partners", label: "Parceiros", icon: Handshake, section: "partners" },
  { href: "/admin/products", label: "Produtos", icon: Package, section: "products" },
  { href: "/admin/customers", label: "Clientes", icon: Users, section: "customers" },
  { href: "/admin/redemptions", label: "Resgates", icon: Gift, section: "redemptions" },
  { href: "/admin/settings", label: "Configurações", icon: Settings, section: "settings" },
];

interface Props {
  /** Seções que o usuário pode ver (inclui "settings" quando admin) */
  sections: string[];
  email: string;
  roleLabel: string;
}

export function AdminNav({ sections, email, roleLabel }: Props) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Fecha o drawer ao navegar
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Trava o scroll do body com o drawer aberto
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const nav = NAV.filter(
    (item) => item.section === null || sections.includes(item.section),
  );

  function isActive(href: string) {
    if (href === "/admin") return pathname === "/admin";
    return pathname === href || pathname.startsWith(`${href}/`);
  }

  return (
    <>
      {/* Top bar — só mobile */}
      <header className="md:hidden fixed top-0 inset-x-0 z-50 h-14 bg-xv-navy text-white flex items-center justify-between px-4 shadow-md">
        <Link href="/admin" className="font-display text-base font-bold">
          Admin · Xô Varal
        </Link>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          aria-expanded={open}
          className="-mr-2 p-2 rounded-lg hover:bg-white/10 active:bg-white/20"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </header>

      {/* Backdrop — só mobile, com drawer aberto */}
      {open ? (
        <button
          type="button"
          aria-label="Fechar menu"
          onClick={() => setOpen(false)}
          className="md:hidden fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
        />
      ) : null}

      {/* Sidebar: drawer no mobile, fixa no desktop */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 max-w-[85vw] md:w-60 bg-xv-navy text-white p-6 pt-20 md:pt-6 flex flex-col gap-1 overflow-y-auto transition-transform duration-200 ease-out md:translate-x-0 ${
          open ? "translate-x-0 shadow-2xl" : "-translate-x-full"
        }`}
      >
        <Link
          href="/admin"
          className="hidden md:block font-display text-lg mb-6 hover:opacity-80"
        >
          Admin · Xô Varal
        </Link>

        {nav.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className={`flex items-center gap-3 px-3 py-3 md:py-2 rounded-lg text-sm font-bold transition ${
              isActive(href)
                ? "bg-white/15 text-white"
                : "text-white/80 hover:bg-white/10 hover:text-white"
            }`}
          >
            <Icon size={16} />
            {label}
          </Link>
        ))}

        <div className="mt-6 border-t border-white/10 pt-4">
          <Link
            href="/"
            className="flex items-center gap-2 text-xs text-white/60 hover:text-white px-3 py-2.5"
          >
            <ExternalLink size={12} />
            Voltar ao site
          </Link>
          <form action="/auth/sign-out" method="POST" className="px-3 py-2">
            <button
              type="submit"
              className="text-xs text-white/60 hover:text-white py-1"
            >
              Sair
            </button>
          </form>
        </div>

        <div className="mt-auto pt-4 text-xs text-white/40">
          <p className="break-all">{email}</p>
          <p className="mt-1 font-bold uppercase tracking-wider text-white/30">
            {roleLabel}
          </p>
        </div>
      </aside>
    </>
  );
}
