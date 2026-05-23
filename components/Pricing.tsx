'use client'

import { PRICING, SITE } from '@/lib/constants'

export default function Pricing() {
  return (
    <section className="py-20 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="badge bg-primary/8 text-primary mb-4">
            <span className="w-1.5 h-1.5 bg-primary rounded-full" />
            Preço claro, sem surpresa
          </span>
          <h2 className="section-title text-primary mb-4">
            Quanto custa?
          </h2>
          <p className="section-subtitle mx-auto text-center text-gray-500">
            Pague apenas pelo ciclo que você usar. Sem mensalidade, sem taxa oculta.
          </p>
        </div>

        {/* Pricing cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {PRICING.map((item) => (
            <PricingCard key={item.label} item={item} />
          ))}
        </div>

        {/* Includes note */}
        <div className="mt-10 max-w-2xl mx-auto">
          <div className="bg-sky/5 border border-sky/20 rounded-2xl p-5 flex items-start gap-4">
            <span className="text-2xl shrink-0">✅</span>
            <div>
              <p className="font-bold text-primary text-sm mb-1">
                Insumos profissionais já inclusos
              </p>
              <p className="text-gray-500 text-sm leading-relaxed">
                OMO e Comfort em dosagem ideal já estão inclusos em cada ciclo. Não precisa trazer
                sabão nem amaciante — só as suas roupas.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-10">
          <a
            href={SITE.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary text-base shadow-orange"
          >
            Tenho dúvidas — chamar no WhatsApp
          </a>
        </div>
      </div>
    </section>
  )
}

function PricingCard({ item }: { item: (typeof PRICING)[0] }) {
  return (
    <div
      className={`relative rounded-3xl p-7 flex flex-col items-center text-center transition-all duration-300 hover:-translate-y-1 ${
        item.highlight
          ? 'bg-primary text-white shadow-2xl scale-105 border-2 border-primary'
          : 'bg-neutral-light border border-gray-200 shadow-card hover:shadow-card-hover'
      }`}
    >
      {item.highlight && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-orange text-white text-xs font-black px-4 py-1 rounded-full shadow-orange whitespace-nowrap">
          Mais escolhido ⭐
        </div>
      )}

      <div className="text-4xl mb-4">{item.icon}</div>

      <h3 className={`font-black text-xl mb-2 ${item.highlight ? 'text-white' : 'text-primary'}`}>
        {item.label}
      </h3>

      <div className={`text-4xl font-black mb-1 ${item.highlight ? 'text-yellow' : 'text-orange'}`}>
        {item.price}
      </div>

      <p className={`text-sm mb-4 leading-relaxed ${item.highlight ? 'text-white/70' : 'text-gray-500'}`}>
        {item.description}
      </p>

      <div
        className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold ${
          item.highlight ? 'bg-white/15 text-white' : 'bg-primary/8 text-primary'
        }`}
      >
        <span>⏱</span>
        {item.time}
      </div>
    </div>
  )
}
