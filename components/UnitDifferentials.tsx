'use client'

import Image from 'next/image'
import { whatsappUrl, UNIT } from '@/lib/constants'

const chips = [
  { icon: '⚡', label: '3 SpeedQueens' },
  { icon: '🧺', label: '10,5 kg por máquina' },
  { icon: '🫧', label: 'OMO + Comfort inclusos' },
  { icon: '📱', label: 'Pagamento pelo app ou totem' },
  { icon: '🅿️', label: 'Estacionamento na porta' },
  { icon: '☕', label: 'Bistrô e área kids' },
  { icon: '📶', label: 'Wi-Fi gratuito' },
  { icon: '❄️', label: 'Ar-condicionado' },
  { icon: '✅', label: 'Sem cadastro, sem agendamento' },
  { icon: '🕕', label: 'Aberto todos os dias 6h–23h' },
]

const numbers = [
  { value: '3',        label: 'SpeedQueens',       color: '#01B3DC' },
  { value: '10,5 kg', label: 'por máquina',         color: '#EE7531' },
  { value: '~45 min', label: 'por ciclo',            color: '#FBC132' },
  { value: '250+',    label: 'clientes atendidos',   color: '#01B3DC' },
]

export default function UnitDifferentials() {
  return (
    <section className="section-pad royal-gradient mesh-radial relative overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(1,179,220,0.8), transparent)' }}
      />

      <div className="container-xl relative z-10">
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          {/* Left — copy */}
          <div>
            <div className="badge-navy mb-6 inline-flex">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-xv-cyan opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-xv-cyan" />
              </span>
              Unidade Castelo
            </div>

            <h2 className="font-display text-4xl sm:text-5xl font-bold text-white mb-4 leading-tight">
              Mais do que uma lavanderia.
              <br />
              <span className="amber-text">Uma experiência.</span>
            </h2>

            <p className="text-white/75 text-lg leading-relaxed mb-8">
              Enquanto a sua roupa lava ou seca, você descansa, trabalha, estuda ou
              aproveita o tempo com quem ama. A Xô Varal Castelo foi pensada para
              ser o lugar mais confortável que uma lavanderia pode ser.
            </p>

            <blockquote className="border-l-4 border-xv-orange pl-5 mb-8">
              <p className="text-white/90 italic text-lg font-medium">
                &ldquo;Enquanto a sua roupa lava, você vive.&rdquo;
              </p>
            </blockquote>

            <a
              href={whatsappUrl('differentials')}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp shimmer-btn"
            >
              <WhatsAppIcon />
              Venha conhecer
            </a>
          </div>

          {/* Right — chips + numbers */}
          <div>
            <div className="flex flex-wrap gap-2 mb-8">
              {chips.map((chip) => (
                <span
                  key={chip.label}
                  className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-2 text-xs font-bold text-white/90 ring-1 ring-white/20 backdrop-blur-sm"
                >
                  <span>{chip.icon}</span>
                  {chip.label}
                </span>
              ))}
            </div>

            {/* Address bar */}
            <div className="bg-white/10 rounded-2xl p-4 border border-white/20 flex items-center gap-4 mb-6">
              <span className="text-2xl shrink-0">📍</span>
              <div className="flex-1 min-w-0">
                <div className="text-white font-bold text-sm">{UNIT.address.street}</div>
                <div className="text-white/60 text-xs">{UNIT.address.fullComplement}</div>
              </div>
              <a
                href={UNIT.address.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 text-xv-cyan text-xs font-bold hover:text-xv-cyan-light transition-colors"
              >
                Ver mapa →
              </a>
            </div>

            {/* Numbers strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {numbers.map((n) => (
                <div
                  key={n.label}
                  className="bg-white/10 rounded-2xl p-4 text-center border border-white/15 backdrop-blur-sm"
                >
                  <div className="font-display text-xl font-bold" style={{ color: n.color }}>{n.value}</div>
                  <div className="text-white/60 text-xs mt-0.5">{n.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function WhatsAppIcon() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
}
