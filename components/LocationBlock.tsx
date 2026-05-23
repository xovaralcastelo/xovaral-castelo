'use client'

import { SITE } from '@/lib/constants'

export default function LocationBlock() {
  return (
    <section className="py-20 bg-neutral-light" id="localizacao">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="badge bg-sky/10 text-sky mb-4">
            <span className="w-1.5 h-1.5 bg-sky rounded-full" />
            Onde estamos
          </span>
          <h2 className="section-title text-primary mb-4">Como chegar</h2>
          <p className="section-subtitle mx-auto text-center text-gray-500">
            No coração do Castelo, a 3 minutos da Smart Fit e pertinho das faculdades.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-6 items-stretch">
          {/* Map */}
          <div className="lg:col-span-3 rounded-3xl overflow-hidden shadow-card min-h-[300px] md:min-h-[420px]">
            <iframe
              src={SITE.address.googleMapsEmbed}
              width="100%"
              height="100%"
              className="w-full h-full min-h-[300px] md:min-h-[420px]"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Localização da Xô Varal Castelo"
            />
          </div>

          {/* Info panel */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            {/* Address card */}
            <div className="bg-white rounded-3xl p-6 shadow-card flex-1">
              <h3 className="font-bold text-primary text-lg mb-4 flex items-center gap-2">
                <span className="text-xl">📍</span>
                Endereço
              </h3>
              <p className="text-gray-500 text-xs font-medium mb-0.5">Comercial JL Mall</p>
              <p className="text-gray-700 font-semibold mb-1">
                R. Castelo da Beira, 271
              </p>
              <p className="text-gray-500 text-sm mb-4">
                Castelo — Belo Horizonte, MG<br />
                CEP: 31330-370
              </p>

              <div className="space-y-3 mb-6">
                <InfoRow icon="🕐" label="Funcionamento" value="6h às 23h — todos os dias" />
                <InfoRow icon="🅿️" label="Estacionamento" value="Vaga exclusiva na porta" />
                <InfoRow icon="🏎️" label="Acesso" value="Carro, moto, bicicleta ou a pé" />
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
            </div>

            {/* Quick hours card */}
            <div className="bg-primary rounded-2xl p-5 text-center">
              <div className="text-3xl mb-2">🕐</div>
              <div className="text-white font-black text-lg">6h às 23h</div>
              <div className="text-white/70 text-sm mt-1">
                Todos os dias da semana, inclusive feriados
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function InfoRow({ icon, label, value }: { icon: string; label: string; value: string }) {
  return (
    <div className="flex items-start gap-3">
      <span className="text-lg shrink-0">{icon}</span>
      <div>
        <div className="text-xs text-gray-400 font-medium">{label}</div>
        <div className="text-gray-700 text-sm font-semibold">{value}</div>
      </div>
    </div>
  )
}
