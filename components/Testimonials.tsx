'use client'

import { TESTIMONIALS } from '@/lib/constants'

const avatarColors = ['#253163', '#EE7531', '#01B3DC', '#FBC132', '#1E4A9F', '#EE7531']

export default function Testimonials() {
  return (
    <section className="section-pad bg-xv-gray-50 overflow-hidden">
      <div className="container-xl">
        <div className="text-center mb-16">
          <div className="badge-cyan mb-5 inline-flex">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-xv-cyan opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-xv-cyan" />
            </span>
            O que dizem nossos clientes
          </div>
          <h2 className="section-title text-xv-navy mb-4">
            Mais de{' '}
            <span className="amber-text">250 clientes</span>{' '}
            escolheram a Xô Varal
          </h2>
          <p className="section-body mx-auto text-center">
            Eles testaram. Voltaram. Ficaram. Essas são as histórias reais de quem já faz parte da nossa rotina.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-14">
          {TESTIMONIALS.map((t, idx) => (
            <div key={idx} className="card card-hover flex flex-col p-6">
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.stars }).map((_, i) => (
                  <svg key={i} className="w-4 h-4 text-xv-yellow" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                ))}
              </div>
              <p className="text-xv-gray-700 text-sm leading-relaxed flex-1 mb-5">
                &ldquo;{t.text}&rdquo;
              </p>
              <div className="flex items-center gap-3 pt-4 border-t border-xv-gray-200/60">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white font-black text-sm shrink-0"
                  style={{ backgroundColor: avatarColors[idx % avatarColors.length] }}
                >
                  {t.avatar}
                </div>
                <div>
                  <div className="font-bold text-xv-navy text-sm">{t.name}</div>
                  <div className="text-xv-gray-500 text-xs">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { value: '250+',       label: 'clientes atendidos' },
            { value: '97%',        label: 'de satisfação' },
            { value: '6h–23h',     label: 'funcionamento diário' },
            { value: 'SpeedQueen', label: 'máquinas profissionais' },
          ].map((stat) => (
            <div key={stat.label} className="card text-center py-5">
              <div className="font-display text-2xl font-bold text-xv-navy mb-1">{stat.value}</div>
              <div className="text-xv-gray-500 text-xs">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
