import type { Metadata } from 'next'
import Link from 'next/link'
import { Trophy, Medal, Crown, Gem } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { CLUB_LEVELS, whatsappUrl } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Clube de Vantagens — Fidelidade com benefícios reais',
  description:
    'Faça parte do Clube de Vantagens da Xô Varal Castelo. Quanto mais você usa, mais desconto você ganha — Bronze, Prata, Ouro e Diamante com até 20% de desconto em todos os ciclos.',
}

const levelIcons: Record<string, LucideIcon> = { Trophy, Medal, Crown, Gem }

export default function ClubeDeVantagensPage() {
  return (
    <>
      {/* Hero */}
      <section className="royal-gradient mesh-radial pt-28 pb-20 relative overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-x-0 top-0 h-px"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(1,179,220,0.8), transparent)' }}
        />
        <div aria-hidden className="absolute top-10 left-10 w-56 h-56 rounded-full blur-3xl opacity-20 bg-xv-cyan" />
        <div aria-hidden className="absolute bottom-0 right-0 w-72 h-72 rounded-full blur-3xl opacity-15 bg-xv-orange" />
        <div className="container-xl text-center relative z-10">
          <div className="badge-navy mb-6 inline-flex">
            <Trophy size={14} className="text-xv-yellow" />
            Programa de Fidelidade
          </div>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-white mb-5 leading-tight">
            Clube de Vantagens
            <br />
            <span className="amber-text">Xô Varal Castelo</span>
          </h1>
          <p className="text-white/75 text-lg max-w-2xl mx-auto leading-relaxed">
            Cada ciclo conta. Suba de nível, acumule benefícios e ganhe
            até <strong className="text-white">20% de desconto</strong> em todos os ciclos.
          </p>
        </div>
        <div className="absolute bottom-[-1px] left-0 w-full overflow-hidden" aria-hidden>
          <svg viewBox="0 0 1440 60" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <path d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z" fill="#ffffff" />
          </svg>
        </div>
      </section>

      {/* Levels */}
      <section className="section-pad bg-white">
        <div className="container-xl">
          <div className="text-center mb-14">
            <h2 className="section-title text-xv-navy mb-4">Os <span className="amber-text">níveis</span> do clube</h2>
            <p className="section-body mx-auto text-center">Quanto mais você usa, mais alto você sobe — e mais você economiza.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {CLUB_LEVELS.map((level) => {
              const Icon = levelIcons[level.icon] ?? Trophy
              return (
                <div
                  key={level.key}
                  className={`card flex flex-col items-center text-center p-8 transition-all hover:-translate-y-2 ${
                    level.highlight ? 'ring-2 ring-xv-yellow shadow-yellow-lg' : 'card-hover'
                  }`}
                  style={{ background: level.bg }}
                >
                  {level.highlight && (
                    <div className="bg-xv-yellow text-xv-navy text-xs font-black px-3 py-0.5 rounded-full mb-4 shadow-lg">
                      Mais popular
                    </div>
                  )}
                  <div className="relative mb-4">
                    <div className="absolute inset-0 rounded-full animate-pulse-ring scale-125" style={{ background: level.ringColor }} />
                    <div
                      className="relative w-20 h-20 rounded-full flex items-center justify-center shadow-lg"
                      style={{ background: 'white', border: `4px solid ${level.color}` }}
                    >
                      <Icon size={32} style={{ color: level.color }} />
                    </div>
                  </div>
                  <h3 className="font-display font-bold text-xv-navy text-2xl mb-1">{level.level}</h3>
                  <p className="text-xv-gray-500 text-sm mb-4">{level.cyclesLabel}</p>
                  <div className="text-4xl font-black mb-6" style={{ color: level.color }}>{level.discount}</div>
                  <ul className="space-y-3 w-full text-left">
                    {level.perks.map((perk) => (
                      <li key={perk} className="flex items-center gap-3 text-sm text-xv-gray-700">
                        <span
                          className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 text-xs font-bold text-white"
                          style={{ backgroundColor: level.color }}
                        >
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
        </div>
      </section>

      {/* How it works */}
      <section className="section-pad bg-xv-gray-50">
        <div className="container-xl">
          <h2 className="section-title text-xv-navy mb-10 text-center">Como funciona o <span className="amber-text">clube?</span></h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { icon: '🚶', title: 'Venha usar',    desc: 'Cada ciclo que você usa na Xô Varal conta para seu nível mensal.' },
              { icon: '📊', title: 'Acumule',       desc: 'Quanto mais ciclos no mês, mais alto você sobe no clube.' },
              { icon: '🏆', title: 'Suba de nível', desc: 'Bronze → Prata → Ouro → Diamante. Cada nível tem descontos maiores.' },
              { icon: '💰', title: 'Economize',     desc: 'O desconto é aplicado automaticamente em todos os seus ciclos.' },
            ].map((step) => (
              <div key={step.title} className="card card-hover p-6 text-center">
                <div className="text-3xl mb-3">{step.icon}</div>
                <h3 className="font-bold text-xv-navy mb-2 text-sm">{step.title}</h3>
                <p className="text-xv-gray-700 text-xs leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Status CTA */}
      <section className="py-16 bg-white">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <div className="royal-gradient rounded-[2rem] p-10 text-center relative overflow-hidden">
            <div aria-hidden className="absolute top-0 right-0 w-48 h-48 rounded-full blur-3xl opacity-15 bg-xv-cyan" />
            <div className="relative">
              <div className="text-5xl mb-4">📱</div>
              <h2 className="font-display text-2xl font-bold text-white mb-3">Acompanhe seu status</h2>
              <p className="text-white/70 mb-6 text-sm leading-relaxed">
                Em breve, você poderá acompanhar seu nível e benefícios pelo app ou site. Por enquanto,
                entre em contato via WhatsApp para saber sua pontuação.
              </p>
              <a
                href={whatsappUrl('clube-status')}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp shimmer-btn"
              >
                <WhatsAppIcon />
                Verificar meu status pelo WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 bg-xv-gray-50">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="section-title text-xv-navy mb-4">Ainda não é <span className="amber-text">cliente?</span></h2>
          <p className="text-xv-gray-700 mb-8">Venha pela primeira vez. O Bronze começa na sua próxima visita.</p>
          <Link href="/localizacao" className="btn-primary">Ver como chegar</Link>
        </div>
      </section>
    </>
  )
}

function WhatsAppIcon() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
}
