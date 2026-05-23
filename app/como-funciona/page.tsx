import type { Metadata } from 'next'
import Link from 'next/link'
import { HOW_IT_WORKS, PRICING, SITE } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Como Funciona — Lavanderia Self-Service',
  description:
    'Entenda como funciona a lavanderia self-service da Xô Varal Buritis. 5 passos simples, pagamento pelo app ou totem, resultado profissional em até 1 hora.',
}

export default function ComoFuncionaPage() {
  return (
    <>
      {/* Hero */}
      <section className="gradient-primary pt-28 pb-20 relative overflow-hidden">
        <div className="absolute top-20 right-10 w-64 h-64 bg-sky/10 rounded-full blur-3xl" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center relative z-10">
          <span className="badge bg-sky/20 text-sky border border-sky/30 mb-5">
            <span className="w-1.5 h-1.5 bg-sky rounded-full" />
            Guia completo
          </span>
          <h1 className="text-4xl sm:text-5xl font-black text-white mb-5 leading-tight">
            Como funciona a lavanderia{' '}
            <span className="text-orange">self-service?</span>
          </h1>
          <p className="text-white/75 text-lg max-w-2xl mx-auto leading-relaxed">
            Self-service significa que você opera com total autonomia. Sem precisar de atendente,
            sem agendar horário. Você chega, usa e vai embora com as roupas prontas.
          </p>
        </div>
        <div className="wave-bottom">
          <svg viewBox="0 0 1440 60" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <path d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z" fill="#ffffff" />
          </svg>
        </div>
      </section>

      {/* Steps detailed */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <h2 className="section-title text-primary mb-4">
              Passo a passo completo
            </h2>
            <p className="section-subtitle mx-auto text-center text-gray-500">
              Da chegada à saída — sem dúvida nenhuma.
            </p>
          </div>

          <div className="space-y-8">
            {HOW_IT_WORKS.map((item, idx) => (
              <div
                key={item.step}
                className={`flex flex-col md:flex-row gap-6 items-start p-8 rounded-3xl transition-all hover:-translate-y-0.5 ${
                  idx % 2 === 0 ? 'bg-neutral-light' : 'bg-white border border-gray-200 shadow-card'
                }`}
              >
                <div className="flex-shrink-0 flex flex-col items-center">
                  <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center text-3xl shadow-lg">
                    {item.icon}
                  </div>
                  <div className="mt-2 text-xs font-black text-gray-400 uppercase tracking-wider">
                    Passo {item.step}
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-black text-primary mb-3">{item.title}</h3>
                  <p className="text-gray-600 leading-relaxed text-base">{item.description}</p>
                </div>
                <div className="flex-shrink-0 hidden md:flex items-center justify-center w-10 h-10 rounded-full bg-orange/10 text-orange font-black text-xl">
                  {item.step}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What to bring */}
      <section className="py-16 bg-neutral-light">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="section-title text-primary mb-8 text-center">
            O que preciso levar?
          </h2>
          <div className="grid sm:grid-cols-2 gap-5">
            <div className="bg-white rounded-3xl p-7 shadow-card">
              <h3 className="font-black text-primary text-lg mb-5 flex items-center gap-2">
                <span className="text-2xl text-green-500">✅</span>
                Traga apenas:
              </h3>
              <ul className="space-y-3">
                {[
                  'Suas roupas, roupas de cama, edredons ou toalhas',
                  'Seu celular (para pagar pelo app)',
                  'Sacola ou cesto para transportar',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-gray-600">
                    <span className="w-5 h-5 rounded-full bg-green-100 text-green-600 flex items-center justify-center shrink-0 text-xs mt-0.5">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white rounded-3xl p-7 shadow-card">
              <h3 className="font-black text-primary text-lg mb-5 flex items-center gap-2">
                <span className="text-2xl">🚫</span>
                Não precisa trazer:
              </h3>
              <ul className="space-y-3">
                {[
                  'Sabão em pó ou líquido — já incluído',
                  'Amaciante — OMO e Comfort já estão no ciclo',
                  'Alvejante ou qualquer produto extra',
                  'Agendamento ou reserva prévia',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-gray-600">
                    <span className="w-5 h-5 rounded-full bg-red-100 text-red-400 flex items-center justify-center shrink-0 text-xs mt-0.5">✕</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Payment */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="bg-primary rounded-4xl p-10 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-sky/10 rounded-full blur-3xl" />
            <div className="relative">
              <div className="text-5xl mb-4">📱</div>
              <h2 className="text-2xl font-black text-white mb-3">
                Como fazer o pagamento?
              </h2>
              <p className="text-white/75 mb-6 max-w-lg mx-auto">
                Pelo app da Xô Varal ou pelo totem digital na loja. Aceitamos Pix, cartão
                de débito e crédito. Rápido e sem complicação.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                {['Pix', 'Cartão de débito', 'Cartão de crédito'].map((method) => (
                  <span
                    key={method}
                    className="bg-white/15 border border-white/20 text-white text-sm font-semibold px-4 py-2 rounded-full"
                  >
                    {method}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Machines info */}
      <section className="py-16 bg-neutral-light">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <h2 className="section-title text-primary mb-4">Nossas máquinas</h2>
            <p className="section-subtitle mx-auto text-center text-gray-500">
              SpeedQueen — referência mundial em lavanderias profissionais.
            </p>
          </div>
          <div className="grid sm:grid-cols-3 gap-5">
            {PRICING.map((item) => (
              <div
                key={item.label}
                className={`rounded-3xl p-6 text-center shadow-card ${
                  item.highlight ? 'bg-primary text-white' : 'bg-white'
                }`}
              >
                <div className="text-4xl mb-3">{item.icon}</div>
                <h3 className={`font-black text-xl mb-2 ${item.highlight ? 'text-white' : 'text-primary'}`}>
                  {item.label}
                </h3>
                <div className={`text-3xl font-black mb-2 ${item.highlight ? 'text-yellow' : 'text-orange'}`}>
                  {item.price}
                </div>
                <p className={`text-sm ${item.highlight ? 'text-white/70' : 'text-gray-500'}`}>
                  {item.description}
                </p>
                <div className={`mt-3 text-xs font-bold ${item.highlight ? 'text-white/60' : 'text-gray-400'}`}>
                  ⏱ {item.time}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-white">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="section-title text-primary mb-4">
            Pronto para vir pela primeira vez?
          </h2>
          <p className="text-gray-500 mb-8">
            Estamos de segunda a segunda, das 6h às 23h. Sem agendamento, sem espera.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={SITE.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="whatsapp-link justify-center"
            >
              Chamar no WhatsApp
            </a>
            <Link href="/localizacao" className="btn-outline justify-center">
              Ver como chegar
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
