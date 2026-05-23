'use client'

import { TESTIMONIALS } from '@/lib/constants'

const avatarColors = [
  '#253163', '#ee7531', '#01b3dc', '#fbc132', '#6366f1', '#10b981'
]

export default function Testimonials() {
  return (
    <section className="py-20 bg-neutral-light overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="badge bg-primary/8 text-primary mb-4">
            <span className="w-1.5 h-1.5 bg-primary rounded-full" />
            O que dizem nossos clientes
          </span>
          <h2 className="section-title text-primary mb-4">
            Mais de 250 clientes escolheram a Xô Varal
          </h2>
          <p className="section-subtitle mx-auto text-center text-gray-500">
            Eles testaram. Voltaram. Ficaram. Essas são as histórias reais de quem já faz parte da nossa rotina.
          </p>
        </div>

        {/* Testimonials grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {TESTIMONIALS.map((t, idx) => (
            <TestimonialCard key={idx} testimonial={t} color={avatarColors[idx % avatarColors.length]} />
          ))}
        </div>

        {/* Trust indicators */}
        <div className="mt-14 grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { value: '250+', label: 'clientes atendidos' },
            { value: '97%', label: 'de satisfação' },
            { value: '6h–23h', label: 'funcionamento diário' },
            { value: 'SpeedQueen', label: 'máquinas profissionais' },
          ].map((stat) => (
            <div key={stat.label} className="bg-white rounded-2xl p-5 text-center shadow-card">
              <div className="text-2xl font-black text-primary mb-1">{stat.value}</div>
              <div className="text-xs text-gray-500">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function TestimonialCard({
  testimonial,
  color,
}: {
  testimonial: (typeof TESTIMONIALS)[0]
  color: string
}) {
  return (
    <div className="card flex flex-col">
      {/* Stars */}
      <div className="flex gap-1 mb-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <svg key={i} className="w-4 h-4 text-yellow" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        ))}
      </div>

      {/* Quote */}
      <p className="text-gray-600 text-sm leading-relaxed flex-1 mb-5">
        &ldquo;{testimonial.text}&rdquo;
      </p>

      {/* Author */}
      <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center text-white font-black text-sm shrink-0"
          style={{ backgroundColor: color }}
        >
          {testimonial.avatar}
        </div>
        <div>
          <div className="font-bold text-primary text-sm">{testimonial.name}</div>
          <div className="text-gray-400 text-xs">{testimonial.role}</div>
        </div>
      </div>
    </div>
  )
}
