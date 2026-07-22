"use client";

import { useState, useEffect, type ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ShoppingBag, ShoppingCart } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { cn } from "@/lib/utils";
import { useCart } from "@/app/store/_cart/CartContext";

const NAV_ITEMS = [
  { href: "/como-funciona", label: "Como funciona" },
  { href: "/clube-de-vantagens", label: "Vantagens" },
  { href: "/parceiros", label: "Parceiros" },
  { href: "/localizacao", label: "Localização" },
  { href: "/faq", label: "Dúvidas" },
];

interface HeaderProps {
  authSlotDesktop?: ReactNode;
  authSlotMobile?: ReactNode;
}

/** Ícone do carrinho com contador. O badge só aparece após montar (o count
 *  vem do localStorage) para não divergir na hidratação. */
function CartLink({ onNavigate }: { onNavigate?: () => void }) {
  const { count, ready } = useCart();
  return (
    <Link
      href="/store/carrinho"
      onClick={onNavigate}
      aria-label={`Carrinho${ready && count > 0 ? ` (${count})` : ""}`}
      className="relative inline-flex h-11 w-11 items-center justify-center rounded-full text-xv-navy transition hover:bg-xv-orange-bg"
    >
      <ShoppingCart size={20} />
      {ready && count > 0 ? (
        <span className="absolute -right-0.5 -top-0.5 grid h-5 min-w-5 place-items-center rounded-full bg-xv-orange px-1 text-[11px] font-bold text-white">
          {count > 9 ? "9+" : count}
        </span>
      ) : null}
    </Link>
  );
}

export default function Header({ authSlotDesktop, authSlotMobile }: HeaderProps = {}) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        scrolled
          ? "bg-white/95 shadow-sm backdrop-blur-md"
          : "bg-transparent"
      )}
    >
      <Container size="xl">
        <div className="flex h-16 items-center justify-between gap-6 sm:h-20">
          <Link href="/" aria-label="Xô Varal Castelo">
            <Image
              src="/logo-xovaral.png"
              alt="Xô Varal Castelo"
              width={160}
              height={160}
              className="h-12 w-auto sm:h-14"
              priority
            />
          </Link>

          <nav className="hidden items-center gap-1 lg:flex">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-full px-4 py-2 text-sm font-bold text-xv-navy/80 transition hover:bg-xv-orange-bg hover:text-xv-orange"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-2 lg:flex">
            <Link
              href="/store"
              className="inline-flex items-center gap-2 rounded-full bg-xv-orange px-5 py-2.5 text-sm font-bold text-white shadow-md transition hover:bg-xv-orange-light"
            >
              <ShoppingBag size={15} />
              Store Xô Varal
            </Link>
            <CartLink />
            {authSlotDesktop}
          </div>

          <div className="flex items-center gap-1 lg:hidden">
            <CartLink onNavigate={() => setMobileOpen(false)} />
            <button
              onClick={() => setMobileOpen((v) => !v)}
              className="rounded-full p-2 text-xv-navy"
              aria-label="Abrir menu"
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div className="border-t border-xv-gray-200 py-3 lg:hidden">
            <nav className="flex flex-col gap-1">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="rounded-lg px-3 py-3 text-sm font-bold text-xv-navy hover:bg-xv-orange-bg"
                >
                  {item.label}
                </Link>
              ))}
              <div className="mt-2 flex gap-2" onClick={() => setMobileOpen(false)}>
                <Link
                  href="/store"
                  className="flex-1 rounded-full bg-xv-orange px-4 py-2.5 text-center text-sm font-bold text-white"
                >
                  Store Xô Varal
                </Link>
                {authSlotMobile}
              </div>
            </nav>
          </div>
        )}
      </Container>
    </header>
  );
}
