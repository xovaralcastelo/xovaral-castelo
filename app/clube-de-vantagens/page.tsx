import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Trophy, Medal, Crown, Gem, ArrowRight } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { CLUB_LEVELS, whatsappUrl } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Clube de Vantagens | Xô Varal Castelo',
  description:
    'Quanto mais você usa, mais desconto você ganha. Bronze, Prata, Ouro e Diamante com até 20% de desconto em todos os ciclos. Sem cadastro manual.',
}

const levelIcons: Record<string, LucideIcon> = { Trophy, Medal, Crown, Gem }

export default function ClubeDeVantagensPage() {
  return (
    <>
      {/* Hero — fundo laranja/amarelo como Buritis */}
      <section
        className="relative overflow-hidden pt-28 pb-0"
        style={{ background: 'linear-gradient(135deg, #FF7A00 0%, #FBC132 50%, #FF9A00 100%)' }}
      >
        {/* Blobs decorativos */}
        <div className="pointer-events-none absolute top-0 right-0 h-80 w-80 rounded-full blur-3xl opacity-30" style={{ background: '#fff' }} />
        <div className="pointer-events-none absolute bottom-0 left-0 h-64 w-64 rounded-full blur-3xl opacity-20" style={{ background: '#EE7531' }} />

        {/* Sparkles */}
        <div className="pointer-events-none absolute right-72 top-12 text-white opacity-70 text-4xl">✦</div>
        <div className="pointer-events-none absolute right-48 top-8 text-white opacity-40 text-xl">✦</div>
        <div className="pointer-events-none absolute left-20 bottom-24 text-white opacity-50 text-3xl">✦</div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-10 items-center pb-20">
            {/* Esquerda: texto */}
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-xv-navy/20 border border-xv-navy/30 px-5 py-2 text-sm font-bold text-xv-navy mb-6">
                <Trophy size={14} />
                Programa de Fidelidade
              </div>
              <h1 className="font-display text-5xl sm:text-6xl font-bold text-xv-navy leading-[1.05] mb-6">
                Quanto mais você usa,<br />
                <span className="text-white">mais você economiza.</span>
              </h1>
              <p className="text-xv-navy/80 text-lg leading-relaxed max-w-lg mb-8">
                4 níveis · desconto automático no mês seguinte · sem cadastro manual · sem letra miúda. Cada ciclo conta.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/clube-de-vantagens/entrar"
                  className="inline-flex items-center gap-2 rounded-full bg-xv-navy px-7 py-3.5 text-sm font-bold text-white shadow-lg transition hover:bg-xv-navy-light"
                >
                  Quero entrar <ArrowRight size={16} />
                </Link>
                <Link
                  href="/clube-de-vantagens/entrar"
                  className="inline-flex items-center gap-2 rounded-full border-2 border-xv-navy/30 bg-white/20 px-7 py-3.5 text-sm font-bold text-xv-navy backdrop-blur-sm transition hover:bg-white/30"
                >
                  Ver meu status
                </Link>
              </div>
            </div>

            {/* Direita: mascote nuvem */}
            <div className="hidden lg:flex justify-center items-center relative">
              <div className="pointer-events-none absolute right-8 top-8 text-white text-3xl opacity-60">✦</div>
              <div className="pointer-events-none absolute left-4 bottom-8 text-white text-2xl opacity-50">✦</div>
              <div className="relative">
                <Image
                  src="/mascotes/espuma-t.png"
                  alt="Puffy, mascote da espuma da Xô Varal"
                  width={300}
                  height={300}
                  className="drop-shadow-2xl animate-float"
                  priority
                />
              </div>
            </div>
          </div>
        </div>

        {/* Wave bottom branco */}
        <div className="relative h-16 w-full overflow-hidden" aria-hidden>
          <svg viewBox="0 0 1440 64" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="absolute bottom-0 w-full">
            <path d="M0,32 C360,64 1080,0 1440,32 L1440,64 L0,64 Z" fill="#ffffff" />
          </svg>
        </div>
      </section>

      {/* Cards de nível — premium */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <span className="text-xs font-bold uppercase tracking-wider text-xv-orange">Escolha seu nível</span>
            <h2 className="mt-3 text-4xl font-black text-xv-navy sm:text-5xl">
              Os <span className="text-xv-orange">níveis</span> do clube
            </h2>
            <p className="mt-3 text-xv-gray-700 max-w-xl mx-auto">Quanto mais você usa, mais alto você sobe — e mais você economiza.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {CLUB_LEVELS.map((level) => {
              const Icon = levelIcons[level.icon] ?? Trophy
              return (
                <div
                  key={level.key}
                  className="relative flex flex-col items-center rounded-[2rem] bg-white p-8 text-center shadow-card hover:-translate-y-2 hover:shadow-card-hover transition-all"
                  style={{
                    background: level.bg,
                    border: level.highlight ? `2px solid ${level.color}` : `1.5px solid ${level.color}30`,
                    boxShadow: `0 8px 40px -8px ${level.ringColor}`,
                  }}
                >
                  {level.highlight && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full px-4 py-1 text-[10px] font-black uppercase tracking-widest text-white shadow-lg" style={{ background: level.color }}>
                      Mais popular
                    </div>
                  )}
                  <div className="relative mb-4">
                    <div
                      className="absolute inset-0 rounded-full blur-md opacity-40 scale-110"
                      style={{ background: level.color }}
                    />
                    <div
                      className="relative w-20 h-20 rounded-full flex items-center justify-center shadow-lg"
                      style={{ background: 'white', border: `3px solid ${level.color}` }}
                    >
                      <Icon size={32} style={{ color: level.color }} />
                    </div>
                  </div>
                  <h3 className="font-display font-bold text-xv-navy text-2xl mb-1">{level.name}</h3>
                  <p className="text-xv-gray-500 text-xs mb-4">{level.cyclesLabel}</p>
                  <div className="text-5xl font-black mb-6" style={{ color: level.color }}>{level.discount}</div>
                  <div className="text-xs font-bold uppercase tracking-widest text-xv-gray-500 mb-4">desconto</div>
                  <ul className="space-y-2.5 w-full text-left">
                    {level.perks.map((perk) => (
                      <li key={perk} className="flex items-start gap-2.5 text-xs text-xv-gray-700">
                        <span className="w-4 h-4 rounded-full flex items-center justify-center shrink-0 text-[10px] font-bold text-white mt-0.5" style={{ background: level.color }}>✓</span>
                        {perk}
                      </li>
                    ))}
                  </ul>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Como funciona */}
      <section className="py-20 sm:py-24" style={{ background: 'linear-gradient(180deg, #fff8f2 0%, #fff3ea 100%)' }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-xv-orange">Simples assim</span>
            <h2 className="mt-3 text-4xl font-black text-xv-navy">Como funciona o clube?</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { icon: '🚶', title: 'Venha usar',     desc: 'Cada ciclo que você usa na Xô Varal conta para seu nível mensal.' },
              { icon: '📊', title: 'Acumule',        desc: 'Quanto mais ciclos no mês, mais alto você sobe no clube.' },
              { icon: '🏆', title: 'Suba de nível',  desc: 'Bronze → Prata → Ouro → Diamante. Cada nível tem descontos maiores.' },
              { icon: '💰', title: 'Economize',      desc: 'O desconto é aplicado automaticamente em todos os seus ciclos.' },
            ].map((step, i) => (
              <div key={step.title} className="rounded-[2rem] bg-white p-6 text-center shadow-card hover:-translate-y-1 transition-all ring-1 ring-xv-orange/20">
                <div className="text-4xl mb-3">{step.icon}</div>
                <div className="w-7 h-7 rounded-full bg-xv-orange text-white text-xs font-black flex items-center justify-center mx-auto mb-3">{i + 1}</div>
                <h3 className="font-bold text-xv-navy text-sm mb-2">{step.title}</h3>
                <p className="text-xv-gray-700 text-xs leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA status */}
      <section className="py-20 bg-white">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <div className="rounded-[2rem] p-10 text-center relative overflow-hidden text-white" style={{ background: 'linear-gradient(135deg, #0A1942 0%, #15326C 50%, #1E4A9F 100%)' }}>
            <div className="pointer-events-none absolute right-0 top-0 h-48 w-48 rounded-full blur-3xl opacity-20" style={{ background: '#01B3DC' }} />
            <div className="relative">
              <div className="text-5xl mb-4">📱</div>
              <h2 className="font-display text-2xl font-bold text-white mb-3">Acompanhe seu status</h2>
              <p className="text-white/75 mb-6 max-w-md mx-auto text-sm">
                Entre em contato via WhatsApp para saber sua pontuação e nível atual.
              </p>
              <div className="flex flex-wrap gap-3 justify-center">
                <a
                  href={whatsappUrl('clube')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-6 py-3 text-sm font-bold text-white shadow-lg transition hover:brightness-110"
                >
                  Verificar meu status pelo WhatsApp
                </a>
                <Link
                  href="/clube-de-vantagens/entrar"
                  className="inline-flex items-center gap-2 rounded-full border-2 border-white/30 bg-white/10 px-6 py-3 text-sm font-bold text-white transition hover:bg-white/20"
                >
                  Área cliente
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className="py-16 bg-xv-gray-50">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-4xl font-black text-xv-navy mb-4">Ainda não é <span className="text-xv-orange">cliente?</span></h2>
          <p className="text-xv-gray-700 mb-8">Venha pela primeira vez. O Bronze começa na sua próxima visita.</p>
          <Link href="/localizacao" className="inline-flex items-center gap-2 rounded-full bg-xv-navy px-8 py-4 text-sm font-bold text-white shadow-md transition hover:bg-xv-navy-light">
            Ver como chegar <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </>
  )
}
