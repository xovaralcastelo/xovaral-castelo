import type { Metadata } from 'next'
import Link from 'next/link'
import { SITE } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Localização — Como chegar à Xô Varal Castelo',
  description:
    'Encontre a Xô Varal Castelo no Comercial JL Mall — R. Castelo da Beira, 271, Castelo, BH. Abertos todos os dias das 6h às 23h.',
}

const NEARBY = [
  { icon: '🏬', label: 'Comercial JL Mall', distance: 'Dentro do mall' },
  { icon: '🛍️', label: 'Shopping del Rey', distance: '~5 min de carro' },
  { icon: '💪', label: 'Academias da região', distance: 'Bairro Castelo' },
  { icon: '🏘️', label: 'Bairro Castelo', distance: 'Região central' },
  { icon: '🚗', label: 'Via Expressa', distance: '~3 min de carro' },
]

export default function LocalizacaoPage() {
  return (
    <>
      {/* Hero */}
      <section className="gradient-primary pt-28 pb-20 relative overflow-hidden">
        <div className="absolute top-20 right-10 w-64 h-64 bg-sky/10 rounded-full blur-3xl" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center relative z-10">
          <span className="badge bg-sky/20 text-sky border border-sky/30 mb-5">
            <span className="w-1.5 h-1.5 bg-sky rounded-full" />
            No coração do Castelo
          </span>
          <h1 className="text-4xl sm:text-5xl font-black text-white mb-5 leading-tight">
            Como chegar à
            <br />
            <span className="text-orange">Xô Varal Castelo</span>
          </h1>
          <p className="text-white/75 text-lg max-w-2xl mx-auto leading-relaxed">
            Estamos no coração do Castelo, com vaga exclusiva de estacionamento na porta.
            Pertinho da Smart Fit, UniBH e do Shopping Castelo.
          </p>
        </div>
        <div className="wave-bottom">
          <svg viewBox="0 0 1440 60" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <path d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z" fill="#ffffff" />
          </svg>
        </div>
      </section>

      {/* Map + Info */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-5 gap-8 items-start">
            {/* Map */}
            <div className="lg:col-span-3 rounded-3xl overflow-hidden shadow-card-hover" style={{ height: '500px' }}>
              <iframe
                src={SITE.address.googleMapsEmbed}
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
              {/* Address card */}
              <div className="bg-neutral-light rounded-3xl p-7">
                <h2 className="font-black text-primary text-xl mb-5 flex items-center gap-2">
                  <span className="text-2xl">📍</span>
                  Endereço
                </h2>
                <div className="space-y-4">
                  <div>
                    <p className="text-gray-400 text-xs font-medium">Comercial JL Mall</p>
                    <p className="font-bold text-primary text-base">R. Castelo da Beira, 271</p>
                    <p className="text-gray-500 text-sm">Castelo — Belo Horizonte, MG</p>
                    <p className="text-gray-400 text-xs">CEP: 31330-370</p>
                  </div>
                  <div className="border-t border-gray-200 pt-4 space-y-3">
                    <div className="flex items-center gap-3">
                      <span className="text-lg">🕐</span>
                      <div>
                        <p className="font-bold text-primary text-sm">Funcionamento</p>
                        <p className="text-gray-500 text-xs">6h às 23h — todos os dias, inclusive feriados</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-lg">🅿️</span>
                      <div>
                        <p className="font-bold text-primary text-sm">Estacionamento</p>
                        <p className="text-gray-500 text-xs">Vaga exclusiva na porta da unidade</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-lg">📞</span>
                      <div>
                        <p className="font-bold text-primary text-sm">WhatsApp</p>
                        <a
                          href={SITE.whatsapp}
                          className="text-[#25d366] text-xs font-semibold hover:underline"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          (31) 9 9332-8775
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* CTA buttons */}
              <div className="flex flex-col gap-3">
                <a
                  href={SITE.address.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary justify-center"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                  </svg>
                  Traçar rota no Google Maps
                </a>
                <a
                  href={SITE.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="whatsapp-link justify-center"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  Chamar no WhatsApp
                </a>
              </div>

              {/* Hours card */}
              <div className="bg-primary rounded-2xl p-5 text-center">
                <div className="text-3xl mb-2">🕐</div>
                <div className="text-white font-black text-lg">6h às 23h</div>
                <div className="text-white/60 text-xs mt-1">
                  Todos os dias — incluindo feriados
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Nearby landmarks */}
      <section className="py-16 bg-neutral-light">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <h2 className="section-title text-primary mb-4">
              O que tem perto
            </h2>
            <p className="section-subtitle mx-auto text-center text-gray-500">
              No Castelo, você resolve tudo na mesma saída.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {NEARBY.map((item) => (
              <div key={item.label} className="bg-white rounded-2xl p-5 flex items-center gap-4 shadow-card hover:-translate-y-0.5 transition-all">
                <span className="text-2xl shrink-0">{item.icon}</span>
                <div>
                  <div className="font-bold text-primary text-sm">{item.label}</div>
                  <div className="text-gray-400 text-xs">{item.distance}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Tip */}
          <div className="mt-8 bg-sky/10 border border-sky/20 rounded-2xl p-5 text-center">
            <p className="text-primary text-sm">
              <span className="font-bold">💡 Dica:</span> Venha depois da academia — deixe a
              roupa lavando e aproveite o bistrô com Wi-Fi por 45 minutos.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 bg-white">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="section-title text-primary mb-4">
            Que tal vir agora?
          </h2>
          <p className="text-gray-500 mb-8">
            Estamos abertos. Sem agendamento. Das 6h às 23h, todos os dias.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={SITE.address.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary justify-center"
            >
              Traçar rota agora
            </a>
            <Link href="/como-funciona" className="btn-outline justify-center">
              Como funciona?
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
