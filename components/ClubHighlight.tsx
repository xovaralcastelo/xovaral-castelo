'use client'

import Link from 'next/link'
import { CLUB_LEVELS } from '@/lib/constants'

export default function ClubHighlight() {
  return (
    <section className="py-20 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #fbc132 0%, #f5913e 60%, #ee7531 100%)' }}>
      {/* Decorative */}
      <div className="absolute top-10 left-10 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
      <div className="absolute bottom-10 right-10 w-56 h-56 bg-primary/15 rounded-full blur-3xl" />
      <div className="absolute top-1/2 left-1/3 w-96 h-96 bg-white/5 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 bg-white/20 border border-white/30 text-white rounded-full px-4 py-1.5 text-sm font-bold mb-6">
            🏆 Clube de Vantagens
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-white mb-4 leading-tight">
            Quanto mais você usa,
            <br />mais você ganha.
          </h2>
          <p className="text-white/80 text-lg max-w-xl mx-auto leading-relaxed">
            O Clube de Vantagens recompensa quem faz da Xô Varal parte da rotina.
            Acumule visitas e suba de nível com descontos reais.
          </p>
        </div>

        {/* Club levels */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 max-w-3xl mx-auto mb-12">
          {CLUB_LEVELS.map((level) => (
            <LevelCard key={level.level} level={level} />
          ))}
        </div>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            href="/clube-de-vantagens"
            className="inline-flex items-center gap-2 bg-primary text-white font-bold px-8 py-4 rounded-full shadow-xl hover:bg-primary-dark transition-all hover:-translate-y-0.5 text-base"
          >
            🏆 Acessar Clube de Vantagens
          </Link>
          <Link
            href="/clube-de-vantagens"
            className="inline-flex items-center gap-2 bg-white/20 border-2 border-white/40 text-white font-bold px-8 py-4 rounded-full hover:bg-white/30 transition-all hover:-translate-y-0.5 text-base backdrop-blur-sm"
          >
            Ver meu status e benefícios
          </Link>
        </div>
      </div>
    </section>
  )
}

function LevelCard({ level }: { level: (typeof CLUB_LEVELS)[0] }) {
  return (
    <div
      className={`bg-white rounded-3xl p-6 flex flex-col items-center text-center transition-all duration-300 hover:-translate-y-1 shadow-xl ${
        level.highlight ? 'ring-4 ring-white/60 scale-105' : ''
      }`}
    >
      {level.highlight && (
        <div className="bg-orange text-white text-xs font-black px-3 py-0.5 rounded-full mb-3 shadow-orange">
          Mais popular
        </div>
      )}

      {/* Medal */}
      <div
        className="w-14 h-14 rounded-full flex items-center justify-center text-2xl font-black mb-3 shadow-lg"
        style={{ background: level.bg, color: level.color, border: `3px solid ${level.color}` }}
      >
        {level.level === 'Bronze' ? '🥉' : level.level === 'Prata' ? '🥈' : '🥇'}
      </div>

      <h3 className="font-black text-primary text-xl mb-1">{level.level}</h3>
      <p className="text-gray-500 text-xs mb-3">{level.visits}</p>

      <div
        className="text-2xl font-black mb-4"
        style={{ color: level.color }}
      >
        {level.discount}
      </div>

      <ul className="space-y-2 w-full text-left">
        {level.perks.map((perk) => (
          <li key={perk} className="flex items-center gap-2 text-xs text-gray-600">
            <span className="w-4 h-4 rounded-full bg-green-100 text-green-600 flex items-center justify-center shrink-0 text-[10px]">
              ✓
            </span>
            {perk}
          </li>
        ))}
      </ul>
    </div>
  )
}
