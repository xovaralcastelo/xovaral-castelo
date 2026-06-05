import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import {
  Trophy, Medal, Crown, Gem, ArrowRight, Check, Gift, Sparkles,
  Footprints, BarChart3, TrendingUp, Wallet,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { CLUB_LEVELS } from '@/lib/constants'
import { DecorativeSparkle } from '@/components/ui/DecorativeSparkle'

export const metadata: Metadata = {
  title: 'Clube de Vantagens | Xô Varal Castelo',
  description:
    'Quanto mais você usa, mais desconto você ganha. Bronze, Prata, Ouro e Diamante com até 20% de desconto em todos os ciclos. Sem cadastro manual.',
}

const levelIcons: Record<string, LucideIcon> = { Trophy, Medal, Crown, Gem }

const TIER_EXTRA_PERKS: Record<string, boolean> = {
  ouro: true,
  diamante: true,
}

export default function ClubeDeVantagensPage() {
  return (
    <>
      {/* HERO — fundo navy gradient com mascote PUFFY */}
      <section
        className="relative overflow-hidden pt-28 pb-0"
        style={{ background: 'linear-gradient(135deg, #0A1942 0%, #15326C 50%, #1E4A9F 100%)' }}
      >
        {/* Blobs decorativos */}
        <div className="pointer-events-none absolute top-10 left-10 h-72 w-72 rounded-full blur-3xl opacity-20" style={{ background: '#01B3DC' }} />
        <div className="pointer-events-none absolute bottom-0 right-0 h-64 w-64 rounded-full blur-3xl opacity-15" style={{ background: '#EE7531' }} />

        {/* Sparkles decorativos */}
        <DecorativeSparkle className="pointer-events-none absolute right-72 top-16 text-xv-yellow opacity-90" size={28} />
        <DecorativeSparkle className="pointer-events-none absolute right-44 top-32 text-xv-cyan opacity-70" size={22} />
        <DecorativeSparkle className="pointer-events-none absolute left-24 bottom-28 text-xv-orange opacity-70" size={26} />
        <DecorativeSparkle className="pointer-events-none absolute right-32 bottom-40 text-xv-yellow opacity-60" size={18} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid lg:grid-cols-[1.2fr_1fr] gap-10 items-center pb-20">
            {/* Esquerda: texto */}
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-xv-orange/15 ring-1 ring-xv-orange/40 px-5 py-2 text-xs font-bold uppercase tracking-widest text-xv-orange mb-6">
                <Trophy size={13} />
                Clube de Vantagens
              </div>
              <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-[1.05] mb-4">
                Clube de Vantagens
              </h1>
              <h2 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.05] mb-6">
                <span className="relative inline-block text-xv-orange">
                  Xô Varal
                  <svg className="absolute -bottom-2 left-0 w-full text-xv-yellow" viewBox="0 0 200 8" preserveAspectRatio="none" aria-hidden>
                    <path d="M0 5 Q50 1 100 4 T200 3" stroke="currentColor" strokeWidth="5" fill="none" strokeLinecap="round" />
                  </svg>
                </span>
              </h2>
              <p className="text-white/80 text-lg leading-relaxed max-w-lg">
                Quanto mais você usa,{' '}
                <span className="bg-xv-cyan/20 ring-1 ring-xv-cyan/40 text-xv-cyan px-2 py-0.5 rounded-md font-bold">
                  mais vantagens
                </span>{' '}
                você ganha!
              </p>
            </div>

            {/* Direita: mascote PUFFY (nuvem) */}
            <div className="hidden lg:flex justify-center items-center relative">
              <div className="relative">
                <Image
                  src="/mascotes/espuma-t.png"
                  alt="Puffy, mascote do clube de vantagens"
                  width={340}
                  height={340}
                  className="drop-shadow-2xl animate-float"
                  priority
                />
              </div>
            </div>
          </div>

          {/* CARDS dos níveis */}
          <div className="relative grid sm:grid-cols-2 lg:grid-cols-4 gap-5 pb-20">
            {CLUB_LEVELS.map((level) => {
              const Icon = levelIcons[level.icon] ?? Trophy
              const hasExtra = TIER_EXTRA_PERKS[level.key]
              return (
                <div
                  key={level.key}
                  className="relative rounded-[2rem] bg-white p-7 shadow-2xl hover:-translate-y-2 transition-all duration-300"
                >
                  {level.highlight && (
                    <div className="absolute -top-3 right-6 rounded-full bg-xv-orange px-3 py-1 text-[10px] font-black uppercase tracking-widest text-white shadow-md">
                      Popular
                    </div>
                  )}

                  {/* Círculo grande superior com ícone */}
                  <div className="flex justify-center">
                    <div
                      className="relative h-24 w-24 rounded-full flex items-center justify-center shadow-lg"
                      style={{
                        background: `linear-gradient(135deg, ${level.color}, ${level.colorEnd})`,
                        boxShadow: `0 10px 30px ${level.ringColor}`,
                      }}
                    >
                      <Icon size={42} strokeWidth={2.2} className="text-white" />
                    </div>
                  </div>

                  {/* Nome do tier */}
                  <h3 className="mt-5 text-center font-display font-black uppercase tracking-widest text-xv-navy text-lg">
                    {level.name}
                  </h3>
                  <p className="mt-1 text-center text-xs text-xv-gray-500">
                    {level.cyclesLabel}
                  </p>

                  {/* % gigante */}
                  <div className="mt-5 text-center">
                    <div className="font-display text-6xl font-black leading-none" style={{ color: level.color }}>
                      {level.discount}
                    </div>
                    <div className="mt-2 text-[10px] font-bold uppercase tracking-widest text-xv-gray-500">
                      de desconto no mês seguinte
                    </div>
                  </div>

                  {/* Bullets perks */}
                  <ul className="mt-6 space-y-2.5">
                    {level.perks.map((perk) => (
                      <li key={perk} className="flex items-start gap-2 text-xs text-xv-gray-700">
                        <Check size={14} className="flex-shrink-0 mt-0.5 text-green-600" />
                        <span>{perk}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Badge "+ brindes" laranja em OURO e DIAMANTE */}
                  {hasExtra && (
                    <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-xv-orange-bg ring-1 ring-xv-orange/40 px-3 py-1.5">
                      <Gift size={12} className="text-xv-orange" />
                      <span className="text-[11px] font-bold text-xv-orange">+ brindes na Store Xô Varal</span>
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          {/* CTAs no rodapé do hero */}
          <div className="flex flex-wrap items-center justify-center gap-3 pb-16">
            <Link
              href="/clube-de-vantagens/entrar"
              className="inline-flex items-center gap-2 rounded-full bg-xv-orange px-8 py-4 text-sm font-bold text-white shadow-xl transition hover:bg-xv-orange-light"
              style={{ boxShadow: '0 10px 30px -5px rgba(238,117,49,0.6)' }}
            >
              <Trophy size={16} />
              Acessar Clube de Vantagens
              <ArrowRight size={16} />
            </Link>
            <Link
              href="/minha-conta"
              className="inline-flex items-center gap-2 rounded-full border-2 border-white/30 bg-white/10 backdrop-blur-sm px-8 py-4 text-sm font-bold text-white transition hover:bg-white/20"
            >
              Ver meu status e benefícios
            </Link>
          </div>
        </div>

        {/* Wave bottom branco */}
        <div className="relative h-16 w-full overflow-hidden" aria-hidden>
          <svg viewBox="0 0 1440 64" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="absolute bottom-0 w-full">
            <path d="M0,32 C360,64 1080,0 1440,32 L1440,64 L0,64 Z" fill="#ffffff" />
          </svg>
        </div>
      </section>

      {/* COMO FUNCIONA — sem emojis */}
      <section className="py-20 sm:py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-xv-orange">
              Simples assim
            </span>
            <h2 className="mt-3 font-display text-4xl font-black text-xv-navy">
              Como funciona o clube?
            </h2>
            <p className="mt-3 text-xv-gray-700 max-w-xl mx-auto">
              Sem cadastro manual. Sem letra miúda. Você usa, sobe de nível, ganha desconto automático.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { icon: Footprints,    title: 'Venha usar',     desc: 'Cada ciclo que você usa na Xô Varal conta para seu nível mensal.', color: '#01B3DC' },
              { icon: BarChart3,     title: 'Acumule',        desc: 'Quanto mais ciclos no mês, mais alto você sobe no clube.',           color: '#EE7531' },
              { icon: TrendingUp,    title: 'Suba de nível',  desc: 'Bronze → Prata → Ouro → Diamante. Cada nível tem desconto maior.',   color: '#FBC132' },
              { icon: Wallet,        title: 'Economize',      desc: 'Desconto aplicado automaticamente em todos os seus ciclos do mês.',  color: '#22c55e' },
            ].map((step, i) => {
              const Icon = step.icon
              return (
                <div
                  key={step.title}
                  className="rounded-[2rem] bg-white p-6 text-center shadow-card hover:-translate-y-1 transition-all ring-1 ring-xv-gray-200/60"
                >
                  <div
                    className="h-14 w-14 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-md"
                    style={{ background: `${step.color}15`, color: step.color, border: `1.5px solid ${step.color}30` }}
                  >
                    <Icon size={24} strokeWidth={2.2} />
                  </div>
                  <div className="w-7 h-7 rounded-full bg-xv-navy text-white text-xs font-black flex items-center justify-center mx-auto mb-3">
                    {i + 1}
                  </div>
                  <h3 className="font-display font-bold text-xv-navy text-base mb-2">
                    {step.title}
                  </h3>
                  <p className="text-xv-gray-700 text-xs leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className="py-16 bg-xv-gray-50">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="font-display text-4xl font-black text-xv-navy mb-4">
            Ainda não é <span className="text-xv-orange">cliente?</span>
          </h2>
          <p className="text-xv-gray-700 mb-8">
            Venha pela primeira vez. O Bronze começa na sua próxima visita.
          </p>
          <Link
            href="/localizacao"
            className="inline-flex items-center gap-2 rounded-full bg-xv-navy px-8 py-4 text-sm font-bold text-white shadow-md transition hover:bg-xv-navy-light"
          >
            Ver como chegar <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </>
  )
}
