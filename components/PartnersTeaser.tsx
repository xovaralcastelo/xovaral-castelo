'use client'

import Link from 'next/link'

export default function PartnersTeaser() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="bg-primary rounded-4xl p-10 md:p-14 flex flex-col md:flex-row items-center gap-8 relative overflow-hidden">
          {/* Decorative */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-sky/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-20 w-40 h-40 bg-orange/10 rounded-full blur-3xl" />

          {/* Left */}
          <div className="relative flex-1 text-center md:text-left">
            <span className="badge bg-yellow/20 text-yellow border border-yellow/30 mb-5">
              🤝 Parceiros Locais
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4 leading-tight">
              Seu negócio + Xô Varal =<br />
              <span className="text-yellow">mais visibilidade no Buritis.</span>
            </h2>
            <p className="text-white/70 text-base leading-relaxed mb-8 max-w-lg">
              Academias, restaurantes, coworkings, salões, condomínios — se você
              tem um negócio no Buritis, existe uma parceria aqui esperando por você.
              Cupons, campanhas conjuntas e exposição de marca para mais de 250 clientes mensais.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
              <Link
                href="/parceiros"
                className="inline-flex items-center gap-2 bg-orange text-white font-bold px-7 py-3.5 rounded-full shadow-orange hover:bg-orange-dark transition-all hover:-translate-y-0.5"
              >
                Quero ser parceiro
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
              <Link
                href="/parceiros"
                className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white font-bold px-7 py-3.5 rounded-full hover:bg-white/20 transition-all hover:-translate-y-0.5 backdrop-blur-sm"
              >
                Acessar painel de parceiros
              </Link>
            </div>
          </div>

          {/* Right — Partner perks */}
          <div className="relative shrink-0 w-full md:w-72">
            <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-6 border border-white/20">
              <h3 className="font-bold text-white text-sm mb-4 uppercase tracking-wide">
                O que você recebe como parceiro:
              </h3>
              <ul className="space-y-3">
                {[
                  '🎫 Cupons exclusivos para seus clientes',
                  '📣 Menção nas redes sociais da Xô Varal',
                  '🤝 Campanhas conjuntas no bairro',
                  '🔗 Link no site e materiais',
                  '📱 QR code de parceria exclusivo',
                ].map((perk) => (
                  <li key={perk} className="text-white/85 text-sm flex items-center gap-2">
                    <span className="text-base">{perk.slice(0, 2)}</span>
                    <span>{perk.slice(3)}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
