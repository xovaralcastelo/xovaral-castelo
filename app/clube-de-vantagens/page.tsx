import type { Metadata } from 'next'
import Link from 'next/link'
import { CLUB_LEVELS, SITE } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Clube de Vantagens — Fidelidade com benefícios reais',
  description:
    'Faça parte do Clube de Vantagens da Xô Varal Buritis. Quanto mais você usa, mais desconto você ganha — Bronze, Prata e Ouro com até 20% de desconto em todos os ciclos.',
}

export default function ClubeDeVantagensPage() {
  return (
    <>
      {/* Hero */}
      <section
        className="pt-28 pb-20 relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #fbc132 0%, #ee7531 100%)' }}
      >
        <div className="absolute top-10 left-10 w-56 h-56 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/20 border border-white/30 text-white rounded-full px-5 py-2 text-sm font-bold mb-6">
            🏆 Programa de Fidelidade
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-white mb-5 leading-tight">
            Clube de Vantagens
            <br />
            <span className="text-primary">Xô Varal Buritis</span>
          </h1>
          <p className="text-white/80 text-lg max-w-2xl mx-auto leading-relaxed">
            Cada visita conta. Suba de nível, acumule benefícios e ganhe
            até <strong className="text-white">20% de desconto</strong> em todos os ciclos.
          </p>
        </div>
        <div className="wave-bottom">
          <svg viewBox="0 0 1440 60" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <path d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z" fill="#ffffff" />
          </svg>
        </div>
      </section>

      {/* Levels */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <h2 className="section-title text-primary mb-4">
              Os níveis do clube
            </h2>
            <p className="section-subtitle mx-auto text-center text-gray-500">
              Quanto mais você usa, mais alto você sobe — e mais você economiza.
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-6">
            {CLUB_LEVELS.map((level) => (
              <div
                key={level.level}
                className={`rounded-3xl p-8 flex flex-col items-center text-center shadow-card transition-all hover:-translate-y-1 ${
                  level.highlight ? 'ring-4 ring-orange/30 scale-[1.03]' : ''
                }`}
                style={{ background: level.bg }}
              >
                {level.highlight && (
                  <div className="bg-orange text-white text-xs font-black px-3 py-0.5 rounded-full mb-4 shadow-orange">
                    Mais popular
                  </div>
                )}

                <div
                  className="w-20 h-20 rounded-full flex items-center justify-center text-4xl mb-4 shadow-lg"
                  style={{ border: `4px solid ${level.color}` }}
                >
                  {level.level === 'Bronze' ? '🥉' : level.level === 'Prata' ? '🥈' : '🥇'}
                </div>

                <h3 className="font-black text-primary text-2xl mb-1">{level.level}</h3>
                <p className="text-gray-500 text-sm mb-4">{level.visits}</p>

                <div
                  className="text-4xl font-black mb-6"
                  style={{ color: level.color }}
                >
                  {level.discount}
                </div>

                <ul className="space-y-3 w-full text-left">
                  {level.perks.map((perk) => (
                    <li key={perk} className="flex items-center gap-3 text-sm text-gray-600">
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
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 bg-neutral-light">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="section-title text-primary mb-10 text-center">
            Como funciona o clube?
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                icon: '🚶',
                title: 'Venha usar',
                desc: 'Cada ciclo que você usa na Xô Varal conta como uma visita.',
              },
              {
                icon: '📊',
                title: 'Acumule',
                desc: 'Quanto mais visitas no mês, mais alto você sobe no clube.',
              },
              {
                icon: '🏆',
                title: 'Suba de nível',
                desc: 'Bronze → Prata → Ouro. Cada nível tem descontos maiores.',
              },
              {
                icon: '💰',
                title: 'Economize',
                desc: 'O desconto é aplicado automaticamente em todos os seus ciclos.',
              },
            ].map((step) => (
              <div key={step.title} className="bg-white rounded-3xl p-6 text-center shadow-card">
                <div className="text-3xl mb-3">{step.icon}</div>
                <h3 className="font-bold text-primary mb-2 text-sm">{step.title}</h3>
                <p className="text-gray-500 text-xs leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Status area — future integration point */}
      <section className="py-16 bg-white">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <div className="bg-primary rounded-4xl p-10 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-sky/10 rounded-full blur-3xl" />
            <div className="relative">
              <div className="text-5xl mb-4">📱</div>
              <h2 className="text-2xl font-black text-white mb-3">
                Acompanhe seu status
              </h2>
              <p className="text-white/70 mb-6 text-sm leading-relaxed">
                Em breve, você poderá acompanhar seu nível, benefícios, cupons e
                histórico diretamente pelo app ou pelo site. Por enquanto, entre em
                contato via WhatsApp para saber sua pontuação.
              </p>
              <a
                href={SITE.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#25d366] text-white font-bold px-7 py-3.5 rounded-full hover:bg-[#1da851] transition-all hover:-translate-y-0.5"
              >
                Verificar meu status pelo WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 bg-neutral-light">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="section-title text-primary mb-4">
            Ainda não é cliente?
          </h2>
          <p className="text-gray-500 mb-8">
            Venha pela primeira vez. O Bronze começa na sua próxima visita.
          </p>
          <Link href="/localizacao" className="btn-primary justify-center">
            Ver como chegar
          </Link>
        </div>
      </section>
    </>
  )
}
