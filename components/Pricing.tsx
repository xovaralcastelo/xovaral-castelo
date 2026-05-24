'use client'

import { Waves, Wind, Sparkles } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { PRICING, whatsappUrl } from '@/lib/constants'

const pricingIcons: Record<string, LucideIcon> = { Waves, Wind, Sparkles }

export default function Pricing() {
  return (
    <section className="section-pad bg-xv-gray-50 relative overflow-hidden">
      <div aria-hidden className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl opacity-30 bg-xv-cyan" />
      <div aria-hidden className="absolute bottom-0 left-0 w-80 h-80 rounded-full blur-3xl opacity-20 bg-xv-orange" />

      <div className="container-xl relative z-10">
        <div className="text-center mb-16">
          <div className="badge-orange mb-5 inline-flex">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-xv-orange opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-xv-orange" />
            </span>
            Preço claro, sem surpresa
          </div>
          <h2 className="section-title text-xv-navy mb-4">
            Quanto custa?
          </h2>
          <p className="section-body mx-auto text-center">
            Pague apenas pelo ciclo que usar. Sem mensalidade, sem taxa oculta.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {PRICING.map((item) => {
            const Icon = pricingIcons[item.icon] ?? Sparkles
            return (
              <div
                key={item.label}
                className={`relative card transition-all duration-300 hover:-translate-y-2 flex flex-col items-center text-center ${
                  item.highlight ? 'ring-2 ring-xv-yellow shadow-yellow-lg scale-105' : 'card-hover'
                }`}
              >
                {/* Top color stripe */}
                <div
                  className="absolute top-0 inset-x-0 h-1.5 rounded-t-[2rem]"
                  style={{ background: item.color }}
                />

                {item.highlight && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-xv-yellow text-xv-navy text-xs font-black px-4 py-1 rounded-full shadow-lg whitespace-nowrap">
                    Mais escolhido ⭐
                  </div>
                )}

                {/* Icon */}
                <div className="relative mt-6 mb-4">
                  <div
                    className="absolute inset-0 rounded-2xl animate-pulse-ring scale-125"
                    style={{ background: `${item.color}25` }}
                  />
                  <div
                    className="relative w-16 h-16 rounded-2xl flex items-center justify-center"
                    style={{ background: item.bg }}
                  >
                    <Icon size={28} style={{ color: item.color }} />
                  </div>
                </div>

                <h3 className="font-display font-bold text-xv-navy text-xl mb-2">{item.label}</h3>

                <div className="text-4xl font-black mb-2" style={{ color: item.color }}>
                  {item.price}
                </div>

                <p className="text-xv-gray-700 text-sm mb-4 leading-relaxed">{item.description}</p>

                <div
                  className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold mt-auto"
                  style={{ background: `${item.color}18`, color: item.color }}
                >
                  ⏱ {item.time}
                </div>
              </div>
            )
          })}
        </div>

        {/* Includes note */}
        <div className="mt-10 max-w-2xl mx-auto">
          <div className="bg-xv-cyan-bg border border-xv-cyan/30 rounded-2xl p-5 flex items-start gap-4">
            <span className="text-2xl shrink-0">✅</span>
            <div>
              <p className="font-bold text-xv-navy text-sm mb-1">Insumos profissionais já inclusos</p>
              <p className="text-xv-gray-700 text-sm leading-relaxed">
                OMO e Comfort em dosagem ideal já estão inclusos em cada ciclo. Não precisa trazer sabão nem
                amaciante — só as suas roupas.
              </p>
            </div>
          </div>
        </div>

        <div className="text-center mt-10">
          <a
            href={whatsappUrl('pricing')}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-whatsapp shimmer-btn"
          >
            <WhatsAppIcon />
            Tenho dúvidas — chamar no WhatsApp
          </a>
        </div>
      </div>
    </section>
  )
}

function WhatsAppIcon() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
}
