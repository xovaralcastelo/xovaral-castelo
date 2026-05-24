'use client'

import Link from 'next/link'
import { Trophy, Medal, Crown, Gem } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { CLUB_LEVELS } from '@/lib/constants'

const levelIcons: Record<string, LucideIcon> = { Trophy, Medal, Crown, Gem }

export default function ClubHighlight() {
  return (
    <section className="section-pad relative overflow-hidden royal-gradient mesh-radial">
      {/* Cyan top line */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(1,179,220,0.8), transparent)' }}
      />

      <div aria-hidden className="absolute top-10 left-10 w-56 h-56 rounded-full blur-3xl opacity-20 bg-xv-cyan" />
      <div aria-hidden className="absolute bottom-10 right-10 w-64 h-64 rounded-full blur-3xl opacity-15 bg-xv-orange" />

      <div className="container-xl relative z-10">
        <div className="text-center mb-14">
          <div className="badge-navy mb-6 inline-flex">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-xv-cyan opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-xv-cyan" />
            </span>
            Clube de Vantagens
          </div>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-white mb-4 leading-tight">
            Quanto mais você usa,
            <br />
            <span className="amber-text">mais você ganha.</span>
          </h2>
          <p className="text-white/75 text-lg max-w-xl mx-auto leading-relaxed">
            O Clube de Vantagens recompensa quem faz da Xô Varal parte da rotina.
            Acumule ciclos e suba de nível com descontos reais.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
          {CLUB_LEVELS.map((level) => {
            const Icon = levelIcons[level.icon] ?? Trophy
            return (
              <div
                key={level.key}
                className={`relative bg-white rounded-[2rem] p-6 flex flex-col items-center text-center transition-all duration-300 hover:-translate-y-2 shadow-2xl ${
                  level.highlight ? 'ring-4 ring-xv-yellow/60' : ''
                }`}
              >
                {level.highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-xv-yellow text-xv-navy text-xs font-black px-4 py-1 rounded-full shadow-lg whitespace-nowrap">
                    Mais popular
                  </div>
                )}

                {/* Icon with pulse ring */}
                <div className="relative mb-4">
                  <div
                    className="absolute inset-0 rounded-full animate-pulse-ring scale-125"
                    style={{ background: level.ringColor }}
                  />
                  <div
                    className="relative w-16 h-16 rounded-full flex items-center justify-center shadow-lg"
                    style={{ background: level.bg, border: `3px solid ${level.color}` }}
                  >
                    <Icon size={28} style={{ color: level.color }} />
                  </div>
                </div>

                <h3 className="font-display font-bold text-xv-navy text-xl mb-1">{level.level}</h3>
                <p className="text-xv-gray-500 text-xs mb-3">{level.cyclesLabel}</p>

                <div className="text-3xl font-black mb-4" style={{ color: level.color }}>
                  {level.discount}
                </div>

                <ul className="space-y-2 w-full text-left">
                  {level.perks.map((perk) => (
                    <li key={perk} className="flex items-center gap-2 text-xs text-xv-gray-700">
                      <span className="w-4 h-4 rounded-full bg-xv-cyan-bg text-xv-cyan flex items-center justify-center shrink-0 text-[10px] font-bold">
                        ✓
                      </span>
                      {perk}
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            href="/clube-de-vantagens"
            className="btn-whatsapp shimmer-btn"
            style={{ background: 'linear-gradient(90deg, #FBC132, #EE7531)' }}
          >
            <Trophy size={16} />
            Acessar Clube de Vantagens
          </Link>
          <Link href="/clube-de-vantagens" className="btn-ghost">
            Ver meu status e benefícios
          </Link>
        </div>
      </div>
    </section>
  )
}
