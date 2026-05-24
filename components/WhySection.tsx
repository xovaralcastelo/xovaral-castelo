'use client'

import {
  Clock, Building2, Wind, BedDouble, Users, CloudRain, FlaskConical, ShieldCheck
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { BENEFITS } from '@/lib/constants'

const iconMap: Record<string, LucideIcon> = {
  Clock, Building2, Wind, BedDouble, Users, CloudRain, FlaskConical, ShieldCheck
}

export default function WhySection() {
  return (
    <section className="section-pad bg-white relative overflow-hidden">
      <div aria-hidden className="absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl opacity-20 bg-xv-cyan" />
      <div aria-hidden className="absolute bottom-0 left-0 w-64 h-64 rounded-full blur-3xl opacity-15 bg-xv-orange" />

      <div className="container-xl relative z-10">
        <div className="text-center mb-16">
          <div className="badge-orange mb-5 inline-flex">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-xv-orange opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-xv-orange" />
            </span>
            Por que usar
          </div>
          <h2 className="section-title text-xv-navy mb-4">
            Por que usar lavanderia{' '}
            <span className="amber-text">self-service?</span>
          </h2>
          <p className="section-body mx-auto text-center">
            Não é luxo. É a escolha inteligente de quem valoriza tempo, resultado e qualidade de vida.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
          {BENEFITS.map((benefit, idx) => {
            const Icon = iconMap[benefit.icon]
            return (
              <div
                key={idx}
                className="card card-hover group p-6 flex flex-col"
              >
                {Icon && (
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 bg-xv-cyan-bg group-hover:scale-110 transition-transform duration-300">
                    <Icon size={22} className="text-xv-cyan" />
                  </div>
                )}
                <h3 className="font-bold text-xv-navy text-base mb-2">{benefit.title}</h3>
                <p className="text-xv-gray-700 text-sm leading-relaxed">{benefit.description}</p>
              </div>
            )
          })}
        </div>

        {/* Bottom callout */}
        <div className="rounded-[2rem] p-8 flex flex-col md:flex-row items-center gap-6 royal-gradient shadow-2xl">
          <div className="text-5xl shrink-0">⚡</div>
          <div className="flex-1 text-center md:text-left">
            <h3 className="font-display font-bold text-white text-xl mb-2">
              Resultado que sua máquina de casa não entrega
            </h3>
            <p className="text-white/75 text-sm leading-relaxed">
              As SpeedQueens são máquinas profissionais de 10,5 kg. Elas lavam mais fundo,
              secam de verdade e tratam cada tipo de peça do jeito certo — com OMO e Comfort em dosagem ideal.
            </p>
          </div>
          <div className="shrink-0">
            <div className="bg-white/10 rounded-2xl px-6 py-4 text-center border border-white/20">
              <div className="font-display text-3xl font-bold text-xv-yellow">10,5 kg</div>
              <div className="text-white/60 text-xs mt-1">por máquina SpeedQueen</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
