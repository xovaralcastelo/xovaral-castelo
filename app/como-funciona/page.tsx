import type { Metadata } from 'next'
import Link from 'next/link'
import { MapPin, WashingMachine, Smartphone, Coffee } from 'lucide-react'
import { HOW_IT_WORKS, PRICING, whatsappUrl, UNIT } from '@/lib/constants'
import type { LucideIcon } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Como Funciona — Lavanderia Self-Service',
  description:
    'Entenda como funciona a lavanderia self-service da Xô Varal Castelo. 4 passos simples, pagamento pelo app ou totem, resultado profissional em até 1 hora.',
}

const stepIcons: LucideIcon[] = [MapPin, WashingMachine, Smartphone, Coffee]

export default function ComoFuncionaPage() {
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
            Guia completo
          </div>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-white mb-5 leading-tight">
            Como funciona a lavanderia{' '}
            <span className="amber-text">self-service?</span>
          </h1>
          <p className="text-white/75 text-lg max-w-2xl mx-auto leading-relaxed">
            Self-service significa que você opera com total autonomia. Sem precisar de atendente,
            sem agendar horário. Você chega, usa e vai embora com as roupas prontas.
          </p>
        </div>
        <div className="absolute bottom-[-1px] left-0 w-full overflow-hidden" aria-hidden>
          <svg viewBox="0 0 1440 60" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <path d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z" fill="#ffffff" />
          </svg>
        </div>
      </section>

      {/* Steps detailed */}
      <section className="section-pad bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <h2 className="section-title text-xv-navy mb-4">Passo a passo completo</h2>
            <p className="section-body mx-auto text-center">Da chegada à saída — sem dúvida nenhuma.</p>
          </div>
          <div className="space-y-6">
            {HOW_IT_WORKS.map((item, idx) => {
              const Icon = stepIcons[idx]
              return (
                <div
                  key={item.step}
                  className="card flex flex-col md:flex-row gap-6 items-start p-8"
                >
                  <div className="shrink-0 flex flex-col items-center">
                    <div
                      className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg"
                      style={{ background: item.bg }}
                    >
                      <Icon size={28} style={{ color: item.color }} />
                    </div>
                    <div className="mt-2 text-xs font-bold text-xv-gray-500 uppercase tracking-wider">
                      Passo {item.step}
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-display font-bold text-xv-navy text-xl mb-3">{item.title}</h3>
                    <p className="text-xv-gray-700 leading-relaxed">{item.description}</p>
                  </div>
                  <div
                    className="shrink-0 hidden md:flex items-center justify-center w-10 h-10 rounded-full font-black text-white text-xl"
                    style={{ background: item.color }}
                  >
                    {item.step}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* What to bring */}
      <section className="section-pad bg-xv-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="section-title text-xv-navy mb-8 text-center">
            O que preciso <span className="amber-text">levar?</span>
          </h2>
          <div className="grid sm:grid-cols-2 gap-5">
            <div className="card p-7">
              <h3 className="font-bold text-xv-navy text-lg mb-5 flex items-center gap-2">
                <span className="text-xv-cyan text-2xl">✅</span>
                Traga apenas:
              </h3>
              <ul className="space-y-3">
                {['Suas roupas, roupas de cama, edredons ou toalhas', 'Seu celular (para pagar pelo app)', 'Sacola ou cesto para transportar'].map((it) => (
                  <li key={it} className="flex items-start gap-3 text-sm text-xv-gray-700">
                    <span className="w-5 h-5 rounded-full bg-xv-cyan-bg text-xv-cyan flex items-center justify-center shrink-0 text-xs mt-0.5 font-bold">✓</span>
                    {it}
                  </li>
                ))}
              </ul>
            </div>
            <div className="card p-7 bg-xv-orange-bg border border-xv-orange/20">
              <h3 className="font-bold text-xv-navy text-lg mb-5 flex items-center gap-2">
                <span className="text-2xl">🚫</span>
                Não precisa trazer:
              </h3>
              <ul className="space-y-3">
                {['Sabão em pó ou líquido — já incluído', 'Amaciante — OMO e Comfort já estão no ciclo', 'Alvejante ou qualquer produto extra', 'Agendamento ou reserva prévia'].map((it) => (
                  <li key={it} className="flex items-start gap-3 text-sm text-xv-gray-700">
                    <span className="w-5 h-5 rounded-full bg-xv-orange/15 text-xv-orange flex items-center justify-center shrink-0 text-xs mt-0.5 font-bold">✕</span>
                    {it}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Payment */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="royal-gradient rounded-[2rem] p-10 text-center relative overflow-hidden">
            <div aria-hidden className="absolute top-0 right-0 w-48 h-48 rounded-full blur-3xl opacity-15 bg-xv-cyan" />
            <div className="relative">
              <div className="text-5xl mb-4">📱</div>
              <h2 className="font-display text-2xl font-bold text-white mb-3">Como fazer o pagamento?</h2>
              <p className="text-white/75 mb-6 max-w-lg mx-auto">
                Pelo app da Xô Varal ou pelo totem digital na loja. Aceitamos Pix, cartão
                de débito e crédito. Rápido e sem complicação.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                {['Pix', 'Cartão de débito', 'Cartão de crédito'].map((method) => (
                  <span key={method} className="bg-white/15 border border-white/20 text-white text-sm font-semibold px-4 py-2 rounded-full">
                    {method}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Machines */}
      <section className="py-16 bg-xv-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <h2 className="section-title text-xv-navy mb-4">Nossas máquinas</h2>
            <p className="section-body mx-auto text-center">SpeedQueen — referência mundial em lavanderias profissionais.</p>
          </div>
          <div className="grid sm:grid-cols-3 gap-5">
            {PRICING.map((item) => (
              <div
                key={item.label}
                className={`card text-center p-6 ${item.highlight ? 'ring-2 ring-xv-yellow shadow-yellow-lg' : 'card-hover'}`}
              >
                <div className="text-4xl mb-3">{item.icon === 'Waves' ? '🌊' : item.icon === 'Wind' ? '💨' : '✨'}</div>
                <h3 className="font-display font-bold text-xv-navy text-xl mb-2">{item.label}</h3>
                <div className="text-3xl font-black mb-2" style={{ color: item.color }}>{item.price}</div>
                <p className="text-xv-gray-700 text-sm">{item.description}</p>
                <div className="mt-3 text-xs font-bold text-xv-gray-500">⏱ {item.time}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-white">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="section-title text-xv-navy mb-4">Pronto para vir pela <span className="amber-text">primeira vez?</span></h2>
          <p className="text-xv-gray-700 mb-8">Estamos de segunda a segunda, das 6h às 23h. Sem agendamento, sem espera.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href={whatsappUrl('como-funciona')} target="_blank" rel="noopener noreferrer" className="btn-whatsapp shimmer-btn">
              <WhatsAppIcon />
              Chamar no WhatsApp
            </a>
            <Link href="/localizacao" className="btn-secondary">
              <MapPin size={16} />
              Ver como chegar
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
