"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { whatsappUrl } from "@/lib/constants";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { href: "/como-funciona", label: "Como funciona" },
  { href: "/clube-de-vantagens", label: "Clube" },
  { href: "/parceiros", label: "Parceiros" },
  { href: "/localizacao", label: "Localização" },
  { href: "/faq", label: "Dúvidas" },
];

export default function Header() {
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex h-16 items-center justify-between gap-6 sm:h-20">
          <Link href="/" aria-label="Xô Varal Castelo">
            <div className="flex items-center gap-2">
              <Image
                src="/logo-xovaral.png"
                alt="Xô Varal"
                width={120}
                height={40}
                className="h-9 w-auto"
                priority
              />
              <span className="text-xs font-bold tracking-widest uppercase text-xv-orange">
                Castelo
              </span>
            </div>
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
              href="/clube-de-vantagens/entrar"
              className="rounded-full px-4 py-2 text-sm font-bold text-xv-navy hover:bg-xv-gray-50"
            >
              Entrar
            </Link>
            <a
              href={whatsappUrl("home")}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-xv-orange px-5 py-2.5 text-sm font-bold text-white shadow-md transition hover:bg-xv-orange-light"
            >
              WhatsApp
            </a>
          </div>

          <button
            onClick={() => setMobileOpen((v) => !v)}
            className="rounded-full p-2 text-xv-navy lg:hidden"
            aria-label="Abrir menu"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
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
              <div className="mt-2 flex gap-2">
                <Link
                  href="/clube-de-vantagens/entrar"
                  className="flex-1 rounded-full border-2 border-xv-navy/15 px-4 py-2.5 text-center text-sm font-bold text-xv-navy"
                  onClick={() => setMobileOpen(false)}
                >
                  Entrar
                </Link>
                <a
                  href={whatsappUrl("home")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 rounded-full bg-xv-orange px-4 py-2.5 text-center text-sm font-bold text-white"
                >
                  WhatsApp
                </a>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
