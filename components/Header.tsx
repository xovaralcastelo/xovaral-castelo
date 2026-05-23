'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { SITE } from '@/lib/constants'

const navLinks = [
  { label: 'Como funciona', href: '/como-funciona' },
  { label: 'Clube de Vantagens', href: '/clube-de-vantagens' },
  { label: 'Parceiros', href: '/parceiros' },
  { label: 'Localização', href: '/localizacao' },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-md py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-9 h-9 rounded-xl bg-orange flex items-center justify-center text-white font-black text-lg shadow-orange transition-transform group-hover:scale-105">
            X
          </div>
          <div>
            <span
              className={`font-black text-lg leading-none transition-colors ${
                scrolled ? 'text-primary' : 'text-white'
              }`}
            >
              Xô Varal
            </span>
            <span
              className={`block text-xs font-semibold tracking-widest uppercase transition-colors ${
                scrolled ? 'text-orange' : 'text-orange-light'
              }`}
            >
              Castelo
            </span>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`font-semibold text-sm transition-colors hover:text-orange ${
                scrolled ? 'text-primary' : 'text-white/90'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <a
            href={SITE.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary text-sm shadow-orange"
          >
            <WhatsAppIcon />
            Fale conosco
          </a>
        </nav>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className={`md:hidden p-2 rounded-xl transition-colors ${
            scrolled ? 'text-primary hover:bg-neutral-light' : 'text-white hover:bg-white/10'
          }`}
          aria-label="Menu"
        >
          <span className="sr-only">Menu</span>
          <div className="w-6 h-5 flex flex-col justify-between">
            <span
              className={`block h-0.5 rounded-full transition-all duration-300 ${
                scrolled ? 'bg-primary' : 'bg-white'
              } ${mobileOpen ? 'rotate-45 translate-y-2' : ''}`}
            />
            <span
              className={`block h-0.5 rounded-full transition-all duration-300 ${
                scrolled ? 'bg-primary' : 'bg-white'
              } ${mobileOpen ? 'opacity-0' : ''}`}
            />
            <span
              className={`block h-0.5 rounded-full transition-all duration-300 ${
                scrolled ? 'bg-primary' : 'bg-white'
              } ${mobileOpen ? '-rotate-45 -translate-y-3' : ''}`}
            />
          </div>
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden transition-all duration-300 overflow-hidden ${
          mobileOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <nav className="bg-white/98 backdrop-blur-md border-t border-neutral-light px-4 py-4 flex flex-col gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="font-semibold text-primary py-3 px-4 rounded-xl hover:bg-neutral-light hover:text-orange transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <a
            href={SITE.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="whatsapp-link mt-2 justify-center"
            onClick={() => setMobileOpen(false)}
          >
            <WhatsAppIcon />
            Chamar no WhatsApp
          </a>
        </nav>
      </div>
    </header>
  )
}

function WhatsAppIcon() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
}
