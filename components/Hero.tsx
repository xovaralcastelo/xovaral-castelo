'use client'

import Image from 'next/image'
import Link from 'next/link'
import { MapPin, ArrowRight } from 'lucide-react'
import { UNIT, whatsappUrl } from '@/lib/constants'

export default function Hero() {
  return (
    <section className="relative min-h-screen royal-gradient mesh-radial overflow-hidden flex items-center">

      {/* Linha cyan topo */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(1,179,220,0.8), transparent)' }}
      />

      {/* Bolhas decorativas */}
      <div aria-hidden className="absolute top-20  right-[-6rem] w-80 h-80 rounded-full blur-3xl opacity-20 bg-xv-cyan" />
      <div aria-hidden className="absolute bottom-10 left-[-4rem] w-64 h-64 rounded-full blur-3xl opacity-20 bg-xv-orange" />

      <div className="container-xl relative z-10 pt-28 pb-20 grid lg:grid-cols-2 gap-12 items-center">

        {/* ── Coluna esquerda — copy ── */}
        <div>
          {/* Badge */}
          <div className="badge-navy mb-6">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-xv-cyan opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-xv-cyan" />
            </span>
            Aberto todos os dias — 6h às 23h
          </div>

          <h1 className="font-display text-5xl sm:text-6xl font-bold leading-tight text-white mb-6">
            Lave e seque em{' '}
            <span className="relative inline-block">
              <span className="amber-text">até 1 hora</span>
              <svg
                viewBox="0 0 200 10"
                preserveAspectRatio="none"
                aria-hidden
                className="absolute -bottom-1 left-0 w-full"
                style={{ height: 12 }}
              >
                <path
                  d="M0 7 Q50 2 100 6 T200 5"
                  stroke="#FBC132"
                  strokeWidth="5"
                  fill="none"
                  strokeLinecap="round"
                />
              </svg>
            </span>
            <br />
            <span className="white-cyan-text">com praticidade e conforto.</span>
          </h1>

          <p className="text-white/75 text-lg leading-relaxed mb-8 max-w-xl">
            Na Xô Varal Castelo, você chega, escolhe a máquina, paga pelo app ou totem,
            lava, seca e vai embora com tudo pronto.{' '}
            <strong className="pill-cyan">Sem fila, sem burocracia.</strong>
          </p>

          {/* Trust pills */}
          <div className="flex flex-wrap gap-2 mb-8">
            {[
              { icon: '✓', label: 'Sem cadastro' },
              { icon: '✓', label: 'Sem espera' },
              { icon: '✓', label: '3 SpeedQueens' },
              { icon: '✓', label: 'OMO + Comfort inclusos' },
            ].map((p) => (
              <span key={p.label} className="trust-pill">
                <span className="text-xv-cyan text-xs">{p.icon}</span>
                {p.label}
              </span>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap gap-3">
            <a
              href={whatsappUrl('hero')}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp shimmer-btn"
            >
              <WhatsAppIcon />
              Chamar no WhatsApp
              <ArrowRight size={16} />
            </a>
            <Link href="/como-funciona" className="btn-ghost">
              Como funciona
            </Link>
            <a
              href={UNIT.address.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost"
            >
              <MapPin size={16} />
              Ver no mapa
            </a>
          </div>

          {/* Números */}
          <div className="flex items-center gap-6 mt-10 pt-8 border-t border-white/10">
            <Stat value="250+"    label="clientes atendidos" />
            <div className="w-px h-10 bg-white/10" />
            <Stat value="6h–23h"  label="todos os dias" />
            <div className="w-px h-10 bg-white/10" />
            <Stat value="10,5 kg" label="por máquina" />
          </div>
        </div>

        {/* ── Coluna direita — mascote + card ── */}
        <div className="relative flex justify-center">
          <div className="relative">
            {/* Glow atrás */}
            <div
              aria-hidden
              className="absolute inset-0 rounded-full blur-3xl opacity-30"
              style={{ background: 'rgba(1,179,220,0.4)' }}
            />

            {/* Sparkles em órbita */}
            <Sparkle className="absolute -top-3 -right-3 text-xv-yellow animate-spin-slow" size={32}
              style={{ filter: 'drop-shadow(0 0 10px rgba(251,193,50,0.8))' }} />
            <Sparkle className="absolute top-20 -left-5 text-xv-orange" size={22}
              style={{ animation: 'spin 12s linear reverse infinite', filter: 'drop-shadow(0 0 8px rgba(238,117,49,0.7))' }} />
            <Sparkle className="absolute -bottom-2 right-10 text-xv-cyan" size={24}
              style={{ animation: 'spin 14s linear infinite', filter: 'drop-shadow(0 0 8px rgba(1,179,220,0.7))' }} />

            {/* Balão de fala */}
            <div className="absolute -top-4 -right-4 z-10 rounded-2xl bg-white px-4 py-2 text-sm font-black text-xv-navy shadow-xl">
              Roupa limpa em 45 min! ⏱️
              <span className="absolute -bottom-1.5 left-6 h-3 w-3 rotate-45 bg-white" />
            </div>

            {/* Mascote flutuando */}
            <div className="relative animate-float">
              <Image
                src="/mascotes/meia.png"
                alt="Mascote Meia — Xô Varal"
                width={280}
                height={280}
                className="relative z-10 drop-shadow-2xl"
                priority
              />
            </div>
          </div>

          {/* Card inferior com foto */}
          <div className="absolute -bottom-8 left-0 right-0 mx-auto w-full max-w-sm">
            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-3 border border-white/20 shadow-2xl">
              <div className="relative h-40 rounded-2xl overflow-hidden">
                <Image
                  src="/images/hero-maquinas-frente.jpg"
                  alt="Máquinas SpeedQueen — Xô Varal Castelo"
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 100vw, 400px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-xv-navy/60 to-transparent flex items-end p-3">
                  <span className="text-white text-xs font-bold">3 SpeedQueens · 10,5 kg · OMO + Comfort</span>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2 mt-2.5">
                <MiniChip label="Lavagem"   value="R$ 17,00" />
                <MiniChip label="Secagem"   value="R$ 16,99" />
                <MiniChip label="Ciclo"     value="~45 min"  />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Wave bottom */}
      <div className="absolute bottom-[-1px] left-0 w-full overflow-hidden" aria-hidden>
        <svg viewBox="0 0 1440 60" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <path d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z" fill="#ffffff" />
        </svg>
      </div>
    </section>
  )
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <div className="font-display text-xl font-bold text-white">{value}</div>
      <div className="text-white/60 text-xs mt-0.5">{label}</div>
    </div>
  )
}

function MiniChip({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-white/10 rounded-xl p-2 text-center border border-white/15">
      <div className="text-white/60 text-[10px]">{label}</div>
      <div className="text-white font-bold text-xs mt-0.5">{value}</div>
    </div>
  )
}

function Sparkle({ className, size, style }: { className: string; size: number; style?: React.CSSProperties }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      style={style}
      aria-hidden
    >
      <path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3z" />
    </svg>
  )
}

function WhatsAppIcon() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
}
