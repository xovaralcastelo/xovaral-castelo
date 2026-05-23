'use client'

import Link from 'next/link'
import { HOW_IT_WORKS } from '@/lib/constants'

export default function HowItWorks() {
  return (
    <section className="py-20 bg-white" id="como-funciona">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="badge bg-sky/10 text-sky mb-4">
            <span className="w-1.5 h-1.5 bg-sky rounded-full" />
            Simples assim
          </span>
          <h2 className="section-title text-primary mb-4">
            Como funciona a Xô Varal?
          </h2>
          <p className="section-subtitle mx-auto text-center text-gray-500">
            Cinco passos. Sem complicação. Do jeito que precisa ser.
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connection line — desktop only */}
          <div className="hidden md:block absolute top-16 left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-sky/20 via-sky to-sky/20 z-0" />

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6 relative z-10">
            {HOW_IT_WORKS.map((item, idx) => (
              <StepCard key={item.step} item={item} delay={idx * 100} />
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-14">
          <Link href="/como-funciona" className="btn-outline inline-flex">
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

function StepCard({
  item,
  delay,
}: {
  item: (typeof HOW_IT_WORKS)[0]
  delay: number
}) {
  return (
    <div
      className="flex flex-col items-center text-center group"
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Icon circle */}
      <div className="relative mb-5">
        <div className="w-16 h-16 rounded-full bg-primary/5 border-2 border-primary/10 flex items-center justify-center text-3xl group-hover:bg-sky/10 group-hover:border-sky/30 transition-all duration-300 group-hover:scale-110">
          {item.icon}
        </div>
        {/* Step number badge */}
        <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-orange text-white text-xs font-black flex items-center justify-center shadow-orange">
          {item.step}
        </div>
      </div>

      <h3 className="font-bold text-primary text-base mb-2">{item.title}</h3>
      <p className="text-gray-500 text-sm leading-relaxed">{item.description}</p>
    </div>
  )
}
