'use client'

import { AMENITIES, SITE } from '@/lib/constants'

export default function Amenities() {
  return (
    <section className="py-20 gradient-primary relative overflow-hidden">
      {/* Decorative */}
      <div className="absolute top-20 left-10 w-56 h-56 bg-sky/10 rounded-full blur-3xl" />
      <div className="absolute bottom-10 right-10 w-64 h-64 bg-orange/10 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          {/* Left — Copy */}
          <div>
            <span className="badge bg-white/10 text-white border border-white/20 mb-6">
              <span className="w-1.5 h-1.5 bg-yellow rounded-full" />
              Unidade Castelo
            </span>

            <h2 className="section-title text-white mb-4">
              Mais do que uma lavanderia.
              <br />
              <span className="text-yellow">Uma experiência.</span>
            </h2>

            <p className="text-white/75 text-lg leading-relaxed mb-8">
              Enquanto a sua roupa lava ou seca, você descansa, trabalha, estuda ou
              aproveita o tempo com quem ama. A Xô Varal Castelo foi pensada para
              ser o lugar mais confortável que uma lavanderia pode ser.
            </p>

            {/* Highlight quote */}
            <blockquote className="border-l-4 border-orange pl-5 mb-8">
              <p className="text-white/90 italic text-lg font-medium">
                "Enquanto a sua roupa lava, você vive."
              </p>
            </blockquote>

            <a
              href={SITE.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-orange text-white font-bold px-7 py-3.5 rounded-full shadow-orange hover:bg-orange-dark transition-all hover:-translate-y-0.5"
            >
              Venha conhecer
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>

          {/* Right — Amenities grid */}
          <div>
            <div className="grid grid-cols-3 gap-3">
              {AMENITIES.map((item, idx) => (
                <AmenityCard key={idx} item={item} featured={idx === 1} />
              ))}
            </div>

            {/* Bottom info bar */}
            <div className="mt-5 bg-white/10 rounded-2xl p-4 border border-white/20 flex items-center gap-4">
              <span className="text-2xl">📍</span>
              <div>
                <div className="text-white font-bold text-sm">Rua Maria Heilbuth Surette, 207</div>
                <div className="text-white/60 text-xs">Castelo, Belo Horizonte — MG | CEP 30575-100</div>
              </div>
              <a
                href={SITE.address.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-auto shrink-0 text-sky text-xs font-bold hover:text-sky-light transition-colors"
              >
                Ver mapa →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function AmenityCard({ item, featured }: { item: (typeof AMENITIES)[0]; featured?: boolean }) {
  return (
    <div
      className={`flex flex-col items-center justify-center text-center p-4 rounded-2xl border transition-all duration-300 hover:-translate-y-1 cursor-default ${
        featured
          ? 'bg-orange/20 border-orange/40 col-span-1'
          : 'bg-white/10 border-white/20 hover:bg-white/15'
      }`}
    >
      <span className="text-2xl mb-2">{item.icon}</span>
      <span className="text-white/90 text-xs font-semibold leading-tight">{item.label}</span>
    </div>
  )
}
