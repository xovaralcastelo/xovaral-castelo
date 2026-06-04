import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { MapPin, Clock } from 'lucide-react'
import { UNIT, whatsappUrl } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Localização — Como chegar à Xô Varal Castelo | Xô Varal Castelo',
  description:
    'Encontre a Xô Varal Castelo no Comercial JL Mall — R. Castelo da Beira, 271, Castelo, BH. Abertos todos os dias das 6h às 23h.',
}

const NEARBY = [
  { icon: '🏬', label: 'Comercial JL Mall',   distance: 'Dentro do mall' },
  { icon: '🛍️', label: 'Shopping del Rey',     distance: '~5 min de carro' },
  { icon: '💪', label: 'Academias da região', distance: 'Bairro Castelo' },
  { icon: '🏘️', label: 'Bairro Castelo',       distance: 'Região central' },
  { icon: '🚗', label: 'Via Expressa',         distance: '~3 min de carro' },
]

export default function LocalizacaoPage() {
  return (
    <>
      {/* Hero — 2 colunas com mascote */}
      <section
        className="relative overflow-hidden pt-28 pb-0"
        style={{ background: 'linear-gradient(135deg, #f0fafe 0%, #ffffff 50%, #fff8f2 100%)' }}
      >
        {/* Blobs */}
        <div className="pointer-events-none absolute top-16 right-0 h-80 w-80 rounded-full blur-3xl opacity-25" style={{ background: '#01B3DC' }} />
        <div className="pointer-events-none absolute bottom-0 left-0 h-64 w-64 rounded-full blur-3xl opacity-15" style={{ background: '#EE7531' }} />

        {/* Sparkles */}
        <div className="pointer-events-none absolute right-72 top-10 text-xv-yellow text-4xl opacity-80">✦</div>
        <div className="pointer-events-none absolute right-52 top-6 text-xv-orange text-2xl opacity-60">✦</div>
        <div className="pointer-events-none absolute left-16 bottom-20 text-xv-cyan text-3xl opacity-40">✦</div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-10 items-center pb-20">
            {/* Esquerda */}
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-xv-cyan/30 bg-xv-cyan-bg px-5 py-2 text-sm font-bold text-xv-cyan mb-6">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-xv-cyan opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-xv-cyan" />
                </span>
                <MapPin size={13} />
                Visite a Xô Varal Castelo
              </div>
              <h1 className="font-display text-5xl sm:text-6xl font-bold text-xv-navy leading-[1.05] mb-6">
                Pertinho de você, no{' '}
                <span className="relative inline-block text-xv-orange">
                  coração do Castelo.
                  <svg className="absolute -bottom-1 left-0 w-full" viewBox="0 0 380 10" preserveAspectRatio="none" aria-hidden>
                    <path d="M0 7 Q95 2 190 5 T380 4" stroke="#FBC132" strokeWidth="5" fill="none" strokeLinecap="round" />
                  </svg>
                </span>
              </h1>
              <p className="text-xv-gray-700 text-lg leading-relaxed max-w-lg mb-8">
                O bairro mais autossuficiente de BH. A gente fica onde você já passa todo dia — academia, faculdade, mercado e shopping num raio de 15 min a pé.
              </p>
              <div className="flex flex-wrap gap-3">
                <a
                  href={UNIT.address.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-xv-navy px-7 py-3.5 text-sm font-bold text-white shadow-lg transition hover:bg-xv-navy-light"
                >
                  <MapPin size={16} /> Traçar rota
                </a>
                <a
                  href={whatsappUrl('localizacao')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-7 py-3.5 text-sm font-bold text-white shadow-lg transition hover:brightness-110"
                >
                  Chamar no WhatsApp
                </a>
              </div>
            </div>

            {/* Direita: mascote */}
            <div className="hidden lg:flex justify-center items-center relative">
              <div className="relative">
                <Image
                  src="/mascotes/globinho-t.png"
                  alt="Clocky, mascote do tempo da Xô Varal"
                  width={300}
                  height={300}
                  className="drop-shadow-2xl animate-float"
                  priority
                />
                {/* Badge flutuante */}
                <div className="absolute -top-4 -right-10 rounded-2xl bg-xv-navy px-5 py-3 shadow-xl animate-float-delay">
                  <div className="text-white font-black text-base">Te espero aqui! 📍</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Wave */}
        <div className="relative h-16 w-full overflow-hidden" aria-hidden>
          <svg viewBox="0 0 1440 64" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="absolute bottom-0 w-full">
            <path d="M0,32 C360,64 1080,0 1440,32 L1440,64 L0,64 Z" fill="#ffffff" />
          </svg>
        </div>
      </section>

      {/* Mapa + Info */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-5 gap-8 items-start">
            {/* Mapa */}
            <div className="lg:col-span-3 rounded-[2rem] overflow-hidden shadow-card" style={{ height: '480px' }}>
              <iframe
                src={UNIT.address.googleMapsEmbed}
                width="100%"
                height="100%"
                style={{ border: 0, display: 'block' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Mapa — Xô Varal Castelo"
              />
            </div>

            {/* Info */}
            <div className="lg:col-span-2 space-y-5">
              <div className="rounded-[2rem] bg-white p-7 shadow-card ring-1 ring-xv-gray-200/60">
                <h2 className="font-bold text-xv-navy text-xl mb-5 flex items-center gap-2">
                  <MapPin size={20} className="text-xv-cyan" />
                  Endereço
                </h2>
                <div className="space-y-4">
                  <div>
                    <p className="text-xv-gray-500 text-xs font-bold uppercase tracking-wide">{UNIT.address.complement}</p>
                    <p className="font-bold text-xv-navy text-base">{UNIT.address.street}</p>
                    <p className="text-xv-gray-700 text-sm">{UNIT.address.neighborhood} — {UNIT.address.city}, {UNIT.address.state}</p>
                    <p className="text-xv-gray-500 text-xs">CEP: {UNIT.address.zip}</p>
                  </div>
                  <div className="border-t border-xv-gray-200/60 pt-4 space-y-3">
                    <div className="flex items-center gap-3">
                      <Clock size={16} className="text-xv-cyan shrink-0" />
                      <div>
                        <p className="font-bold text-xv-navy text-sm">Funcionamento</p>
                        <p className="text-xv-gray-700 text-xs">{UNIT.hours.full}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-lg shrink-0">🅿️</span>
                      <div>
                        <p className="font-bold text-xv-navy text-sm">Estacionamento</p>
                        <p className="text-xv-gray-700 text-xs">Vaga exclusiva na porta da unidade</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-lg shrink-0">📞</span>
                      <div>
                        <p className="font-bold text-xv-navy text-sm">WhatsApp</p>
                        <a href={`https://wa.me/${UNIT.whatsapp}`} className="text-[#25d366] text-xs font-semibold hover:underline" target="_blank" rel="noopener noreferrer">
                          {UNIT.phone}
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <a href={UNIT.address.googleMapsUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full bg-xv-navy px-6 py-3.5 text-sm font-bold text-white shadow-md transition hover:bg-xv-navy-light">
                  <MapPin size={16} /> Traçar rota no Google Maps
                </a>
                <a href={whatsappUrl('localizacao')} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 py-3.5 text-sm font-bold text-white shadow-md transition hover:brightness-110">
                  Chamar no WhatsApp
                </a>
              </div>

              <div className="rounded-2xl p-5 text-center" style={{ background: 'linear-gradient(135deg, #0A1942, #15326C)' }}>
                <div className="font-display text-3xl font-bold text-xv-yellow">6h às 23h</div>
                <div className="text-white/60 text-xs mt-1">Todos os dias — incluindo feriados</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* O que tem perto */}
      <section className="py-20 sm:py-24" style={{ background: 'linear-gradient(180deg, #f5f7fa 0%, #e5f7ff 100%)' }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-xv-cyan">No coração do bairro</span>
            <h2 className="mt-3 text-4xl font-black text-xv-navy">O que tem <span className="text-xv-orange">perto</span></h2>
            <p className="mt-3 text-xv-gray-700">No Castelo, você resolve tudo na mesma saída.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {NEARBY.map((item) => (
              <div key={item.label} className="rounded-[2rem] bg-white p-5 flex items-center gap-4 shadow-card hover:-translate-y-0.5 hover:shadow-card-hover transition-all ring-1 ring-xv-gray-200/60">
                <span className="text-3xl shrink-0">{item.icon}</span>
                <div>
                  <div className="font-bold text-xv-navy text-sm">{item.label}</div>
                  <div className="text-xv-gray-500 text-xs">{item.distance}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 rounded-2xl p-5 text-center" style={{ background: '#e5f7ff', border: '1.5px solid #01B3DC30' }}>
            <p className="text-xv-navy text-sm">
              <span className="font-bold text-xv-cyan">💡 Dica:</span> Venha depois da academia — deixe a
              roupa lavando e aproveite o bistrô com Wi-Fi por 45 minutos.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-white">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-4xl font-black text-xv-navy mb-4">Que tal vir <span className="text-xv-orange">agora?</span></h2>
          <p className="text-xv-gray-700 mb-8">Estamos abertos. Sem agendamento. Das 6h às 23h, todos os dias.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href={UNIT.address.googleMapsUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full bg-xv-navy px-8 py-4 text-sm font-bold text-white shadow-md transition hover:bg-xv-navy-light">
              Traçar rota agora
            </a>
            <Link href="/como-funciona" className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-xv-navy/20 bg-white px-8 py-4 text-sm font-bold text-xv-navy transition hover:border-xv-navy/50">
              Como funciona?
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
