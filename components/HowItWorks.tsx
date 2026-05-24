'use client'

import { MapPin, WashingMachine, Smartphone, Coffee } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { HOW_IT_WORKS } from '@/lib/constants'
import Link from 'next/link'

const stepIcons: LucideIcon[] = [MapPin, WashingMachine, Smartphone, Coffee]

export default function HowItWorks() {
  return (
    <section className="section-pad bg-white overflow-hidden" id="como-funciona">
      <div className="container-xl">
        <div className="text-center mb-16">
          <div className="badge-cyan mb-5 inline-flex">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-xv-cyan opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-xv-cyan" />
            </span>
            Simples assim
          </div>
          <h2 className="section-title text-xv-navy mb-4">
            Como funciona a{' '}
            <span className="amber-text">Xô Varal?</span>
          </h2>
          <p className="section-body mx-auto text-center">
            Quatro passos. Sem complicação. Do jeito que precisa ser.
          </p>
        </div>

        <div className="relative">
          <div
            aria-hidden
            className="hidden lg:block absolute top-14 left-[12.5%] right-[12.5%] h-0.5 z-0"
            style={{ background: 'linear-gradient(90deg, transparent, rgba(1,179,220,0.4) 20%, rgba(1,179,220,0.8) 50%, rgba(1,179,220,0.4) 80%, transparent)' }}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {HOW_IT_WORKS.map((step, idx) => {
              const Icon = stepIcons[idx]
              return (
                <div key={step.step} className="flex flex-col items-center text-center group">
                  <div className="relative mb-6">
                    <div
                      className="absolute inset-0 rounded-2xl animate-pulse-ring scale-110"
                      style={{ background: `${step.color}25` }}
                    />
                    <div
                      className="relative w-28 h-28 rounded-2xl flex items-center justify-center shadow-xl group-hover:-translate-y-2 transition-transform duration-300"
                      style={{ background: step.bg, border: `2px solid ${step.color}40` }}
                    >
                      <Icon size={32} style={{ color: step.color }} className="transition-transform duration-300 group-hover:scale-110" />
                    </div>
                    <div
                      className="absolute -top-2 -right-2 w-8 h-8 rounded-full flex items-center justify-center text-sm font-black text-white shadow-lg"
                      style={{ background: step.color }}
                    >
                      {step.step}
                    </div>
                  </div>
                  <h3 className="font-display font-bold text-xv-navy text-lg mb-2">{step.title}</h3>
                  <p className="text-xv-gray-700 text-sm leading-relaxed">{step.description}</p>
                </div>
              )
            })}
          </div>
        </div>

        <div className="text-center mt-14">
          <Link href="/como-funciona" className="btn-secondary">
            Ver guia completo
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}
