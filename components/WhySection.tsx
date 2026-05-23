'use client'

import { BENEFITS } from '@/lib/constants'

export default function WhySection() {
  return (
    <section className="py-20 bg-neutral-light relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-sky/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-orange/5 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="badge bg-orange/10 text-orange mb-4">
            <span className="w-1.5 h-1.5 bg-orange rounded-full" />
            Por que usar
          </span>
          <h2 className="section-title text-primary mb-4">
            Por que usar lavanderia self-service?
          </h2>
          <p className="section-subtitle mx-auto text-center text-gray-500">
            Não é luxo. É a escolha inteligente de quem valoriza tempo, resultado e qualidade de vida.
          </p>
        </div>

        {/* Benefits grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {BENEFITS.map((benefit, idx) => (
            <BenefitCard key={idx} benefit={benefit} />
          ))}
        </div>

        {/* Bottom callout */}
        <div className="mt-12 bg-white rounded-3xl p-8 flex flex-col md:flex-row items-center gap-6 shadow-card">
          <div className="text-5xl">⚡</div>
          <div className="flex-1 text-center md:text-left">
            <h3 className="font-black text-primary text-xl mb-2">
              Resultado que sua máquina de casa não entrega
            </h3>
            <p className="text-gray-500 text-sm leading-relaxed">
              As SpeedQueens são máquinas profissionais com capacidade de 10,5 kg. Elas lavam mais fundo,
              secam de verdade e tratam cada tipo de peça do jeito certo — com OMO e Comfort em dosagem ideal.
            </p>
          </div>
          <div className="shrink-0">
            <div className="bg-primary/5 rounded-2xl px-6 py-4 text-center border border-primary/10">
              <div className="text-3xl font-black text-primary">10,5 kg</div>
              <div className="text-xs text-gray-500">por máquina SpeedQueen</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function BenefitCard({ benefit }: { benefit: (typeof BENEFITS)[0] }) {
  return (
    <div className="bg-white rounded-3xl p-6 shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 group">
      <div className="text-3xl mb-4 group-hover:scale-110 transition-transform duration-300">
        {benefit.icon}
      </div>
      <h3 className="font-bold text-primary text-base mb-2">{benefit.title}</h3>
      <p className="text-gray-500 text-sm leading-relaxed">{benefit.description}</p>
    </div>
  )
}
