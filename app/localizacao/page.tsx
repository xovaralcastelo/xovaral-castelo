import type { Metadata } from 'next'
import Link from 'next/link'
import { MapPin, Clock } from 'lucide-react'
import { UNIT, whatsappUrl } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Localização — Como chegar à Xô Varal Castelo',
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
      {/* Hero */}
      <section className="royal-gradient mesh-radial pt-28 pb-20 relative overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-x-0 top-0 h-px"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(1,179,220,0.8), transparent)' }}
        />
        <div aria-hidden className="absolute top-20 right-10 w-64 h-64 rounded-full blur-3xl opacity-20 bg-xv-cyan" />
        <div className="container-xl text-center relative z-10">
          <div className="badge-navy mb-5 inline-flex">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-xv-cyan opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-xv-cyan" />
            </span>
            No coração do Castelo
          </div>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-white mb-5 leading-tight">
            Como chegar à{' '}
            <span className="amber-text">Xô Varal Castelo</span>
          </h1>
          <p className="text-white/75 text-lg max-w-2xl mx-auto leading-relaxed">
            Estamos no coração do Castelo, com vaga exclusiva de estacionamento na porta.
            Pertinho de academias, faculdades e do Shopping del Rey.
          </p>
        </div>
        <div className="absolute bottom-[-1px] left-0 w-full overflow-hidden" aria-hidden>
          <svg viewBox="0 0 1440 60" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <path d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z" fill="#ffffff" />
          </svg>
        </div>
      </section>

      {/* Map + Info */}
      <section className="section-pad bg-white">
        <div className="container-xl">
          <div className="grid lg:grid-cols-5 gap-8 items-start">
            {/* Map */}
            <div className="lg:col-span-3 rounded-[2rem] overflow-hidden shadow-card" style={{ height: '500px' }}>
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
              <div className="card p-7">
                <h2 className="font-bold text-xv-navy text-xl mb-5 flex items-center gap-2">
                  <MapPin size={20} className="text-xv-cyan" />
                  Endereço
                </h2>
                <div className="space-y-4">
                  <div>
                    <p className="text-xv-gray-500 text-xs font-semibold uppercase tracking-wide">{UNIT.address.complement}</p>
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
                <a href={UNIT.address.googleMapsUrl} target="_blank" rel="noopener noreferrer" className="btn-primary justify-center">
                  <MapPin size={16} />
                  Traçar rota no Google Maps
                </a>
                <a href={whatsappUrl('localizacao')} target="_blank" rel="noopener noreferrer" className="btn-whatsapp shimmer-btn justify-center">
                  <WhatsAppIcon />
                  Chamar no WhatsApp
                </a>
              </div>

              <div className="royal-gradient rounded-2xl p-5 text-center">
                <div className="font-display text-3xl font-bold text-xv-yellow">6h às 23h</div>
                <div className="text-white/60 text-xs mt-1">Todos os dias — incluindo feriados</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Nearby */}
      <section className="section-pad bg-xv-gray-50">
        <div className="container-xl">
          <div className="text-center mb-10">
            <h2 className="section-title text-xv-navy mb-4">O que tem <span className="amber-text">perto</span></h2>
            <p className="section-body mx-auto text-center">No Castelo, você resolve tudo na mesma saída.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {NEARBY.map((item) => (
              <div key={item.label} className="card card-hover flex items-center gap-4 p-5">
                <span className="text-2xl shrink-0">{item.icon}</span>
                <div>
                  <div className="font-bold text-xv-navy text-sm">{item.label}</div>
                  <div className="text-xv-gray-500 text-xs">{item.distance}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 bg-xv-cyan-bg border border-xv-cyan/20 rounded-2xl p-5 text-center">
            <p className="text-xv-navy text-sm">
              <span className="font-bold text-xv-cyan">💡 Dica:</span> Venha depois da academia — deixe a
              roupa lavando e aproveite o bistrô com Wi-Fi por 45 minutos.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 bg-white">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="section-title text-xv-navy mb-4">Que tal vir <span className="amber-text">agora?</span></h2>
          <p className="text-xv-gray-700 mb-8">Estamos abertos. Sem agendamento. Das 6h às 23h, todos os dias.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href={UNIT.address.googleMapsUrl} target="_blank" rel="noopener noreferrer" className="btn-primary">
              Traçar rota agora
            </a>
            <Link href="/como-funciona" className="btn-secondary">
              Como funciona?
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}

function WhatsAppIcon() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
}
