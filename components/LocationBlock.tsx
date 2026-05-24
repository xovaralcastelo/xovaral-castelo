'use client'

import Image from 'next/image'
import { MapPin, Clock, Car } from 'lucide-react'
import { UNIT, whatsappUrl } from '@/lib/constants'

export default function LocationBlock() {
  return (
    <section className="section-pad bg-xv-gray-50" id="localizacao">
      <div className="container-xl">
        <div className="text-center mb-14">
          <div className="badge-cyan mb-5 inline-flex">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-xv-cyan opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-xv-cyan" />
            </span>
            Onde estamos
          </div>
          <h2 className="section-title text-xv-navy mb-4">
            Como{' '}
            <span className="amber-text">chegar</span>
          </h2>
          <p className="section-body mx-auto text-center">
            No coração do Castelo, fácil acesso de carro, moto, bicicleta ou a pé.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-6 items-stretch">
          {/* Map */}
          <div className="lg:col-span-3 rounded-[2rem] overflow-hidden shadow-card min-h-[300px] md:min-h-[420px]">
            <iframe
              src={UNIT.address.googleMapsEmbed}
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
            <div className="card p-6 flex-1">
              <h3 className="font-bold text-xv-navy text-lg mb-4 flex items-center gap-2">
                <MapPin size={18} className="text-xv-cyan" />
                Endereço
              </h3>
              <p className="text-xv-gray-500 text-xs font-semibold mb-0.5 uppercase tracking-wide">{UNIT.address.complement}</p>
              <p className="text-xv-navy font-bold mb-1">{UNIT.address.street}</p>
              <p className="text-xv-gray-700 text-sm mb-5">
                {UNIT.address.neighborhood} — {UNIT.address.city}, {UNIT.address.state}
                <br />
                CEP: {UNIT.address.zip}
              </p>

              <div className="space-y-3 mb-6">
                <InfoRow icon={<Clock size={16} className="text-xv-cyan" />} label="Funcionamento" value={UNIT.hours.full} />
                <InfoRow icon={<span className="text-base">🅿️</span>} label="Estacionamento" value="Vaga exclusiva na porta" />
                <InfoRow icon={<Car size={16} className="text-xv-orange" />} label="Acesso" value="Carro, moto, bicicleta ou a pé" />
              </div>

              <div className="flex flex-col gap-3">
                <a
                  href={UNIT.address.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary justify-center"
                >
                  <MapPin size={16} />
                  Traçar rota no Google Maps
                </a>
                <a
                  href={whatsappUrl('location')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-whatsapp shimmer-btn justify-center"
                >
                  <WhatsAppIcon />
                  Chamar no WhatsApp
                </a>
              </div>
            </div>

            {/* Fachada */}
            <div className="relative rounded-[2rem] overflow-hidden h-44 shadow-card">
              <Image
                src="/images/fachada-externa.jpg"
                alt="Fachada da Xô Varal Castelo"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 400px"
              />
              <div className="absolute inset-0 bg-xv-navy/50 flex items-end p-4">
                <div>
                  <div className="text-white font-display font-bold text-base">6h às 23h</div>
                  <div className="text-white/75 text-xs">Todos os dias, inclusive feriados</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function InfoRow({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-start gap-3">
      <span className="mt-0.5 shrink-0">{icon}</span>
      <div>
        <div className="text-xs text-xv-gray-500 font-medium">{label}</div>
        <div className="text-xv-navy text-sm font-semibold">{value}</div>
      </div>
    </div>
  )
}

function WhatsAppIcon() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
}
