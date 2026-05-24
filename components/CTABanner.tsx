import Image from 'next/image'
import { MapPin } from 'lucide-react'
import { UNIT, whatsappUrl } from '@/lib/constants'

export default function CTABanner() {
  return (
    <section className="section-pad royal-gradient mesh-radial relative overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(1,179,220,0.8), transparent)' }}
      />
      <div aria-hidden className="absolute -top-20 -right-20 w-96 h-96 rounded-full blur-3xl opacity-20 bg-xv-cyan" />
      <div aria-hidden className="absolute -bottom-20 -left-20 w-96 h-96 rounded-full blur-3xl opacity-15 bg-xv-orange" />

      {/* Floating mascot */}
      <div className="absolute right-[10%] top-1/2 -translate-y-1/2 hidden xl:block animate-float">
        <Image
          src="/mascotes/nuvem.png"
          alt="Mascote Nuvem"
          width={160}
          height={160}
          className="drop-shadow-2xl opacity-80"
        />
      </div>

      <div className="container-xl relative z-10 text-center">
        <div className="badge-navy mb-6 inline-flex">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-xv-cyan opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-xv-cyan" />
          </span>
          Primeira vez? Vem testar!
        </div>

        <h2 className="font-display text-4xl sm:text-5xl font-bold text-white mb-4 leading-tight max-w-3xl mx-auto">
          Pronto para testar a{' '}
          <span className="amber-text">Xô Varal Castelo?</span>
        </h2>

        <p className="text-white/75 text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
          Venha na primeira vez e veja a diferença. Roupa limpa, seca e cheirosa em até 1 hora.
          Sem agendamento. Sem complicação. Todos os dias das 6h às 23h.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
          <a
            href={whatsappUrl('final-cta')}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-whatsapp shimmer-btn text-base px-8 py-4"
          >
            <WhatsAppIcon />
            Chamar no WhatsApp
          </a>
          <a
            href={UNIT.address.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost text-base px-8 py-4"
          >
            <MapPin size={18} />
            Ver como chegar
          </a>
        </div>

        <p className="text-white/40 text-sm">
          📍 {UNIT.address.full} &nbsp;|&nbsp; ⏰ {UNIT.hours.summary}
        </p>
      </div>
    </section>
  )
}

function WhatsAppIcon() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
}
