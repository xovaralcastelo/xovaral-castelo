import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { MapPin, WashingMachine, Smartphone, Coffee, ArrowRight, Settings2, Droplets, Sparkles, Wind, Clock, ShoppingBag } from 'lucide-react'
import { DecorativeSparkle } from '@/components/ui/DecorativeSparkle'
import { HOW_IT_WORKS, whatsappUrl, UNIT } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Como Funciona — Lavanderia Self-Service | Xô Varal Castelo',
  description:
    'Entenda como funciona a lavanderia self-service da Xô Varal Castelo. 4 passos simples, pagamento pelo app ou totem, resultado profissional em até 1 hora.',
}

const stepIcons = [MapPin, WashingMachine, Smartphone, Coffee]
const stepColors = ['#01B3DC', '#EE7531', '#FBC132', '#253163']

export default function ComoFuncionaPage() {
  return (
    <>
      {/* Hero — 2 colunas + mascote */}
      <section
        className="relative overflow-hidden pt-28 pb-0"
        style={{ background: 'linear-gradient(135deg, #f0fafe 0%, #fff8f2 50%, #f0fafe 100%)' }}
      >
        {/* Blobs decorativos */}
        <div className="pointer-events-none absolute top-16 right-0 h-80 w-80 rounded-full blur-3xl opacity-30" style={{ background: '#01B3DC' }} />
        <div className="pointer-events-none absolute bottom-0 left-0 h-64 w-64 rounded-full blur-3xl opacity-20" style={{ background: '#EE7531' }} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-10 items-center pb-20">
            {/* Esquerda: texto */}
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-xv-orange/30 bg-xv-orange-bg px-5 py-2 text-sm font-bold text-xv-orange mb-6">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-xv-orange opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-xv-orange" />
                </span>
                <Settings2 size={14} />
                Como Funciona
              </div>
              <h1 className="font-display text-5xl sm:text-6xl font-bold text-xv-navy leading-[1.05] mb-6">
                Autosserviço<br />na sua mão.{' '}
                <span className="relative inline-block text-xv-orange">
                  Sem mistério.
                  <svg className="absolute -bottom-1 left-0 w-full" viewBox="0 0 300 10" preserveAspectRatio="none" aria-hidden>
                    <path d="M0 7 Q75 2 150 5 T300 4" stroke="#FBC132" strokeWidth="5" fill="none" strokeLinecap="round" />
                  </svg>
                </span>
              </h1>
              <p className="text-xv-gray-700 text-lg leading-relaxed max-w-lg mb-8">
                Lavanderia self-service é o modelo padrão em hotéis e nas grandes cidades do mundo inteiro. Você opera a máquina, você controla, você vai embora em até 1h com a roupa pronta.
              </p>
              <div className="flex flex-wrap gap-3">
                <a
                  href={whatsappUrl('comoFunciona')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-6 py-3 text-sm font-bold text-white shadow-lg transition hover:brightness-110"
                >
                  Tirar dúvida no WhatsApp
                </a>
                <Link
                  href="#passo-a-passo"
                  className="inline-flex items-center gap-2 rounded-full border-2 border-xv-navy/20 bg-white px-6 py-3 text-sm font-bold text-xv-navy transition hover:border-xv-navy/50"
                >
                  Ver passo a passo <ArrowRight size={15} />
                </Link>
              </div>
            </div>

            {/* Direita: mascote + badge flutuante */}
            <div className="hidden lg:flex justify-center items-center relative">
              {/* Sparkles decorativos */}
              <DecorativeSparkle className="pointer-events-none absolute right-16 top-8 text-xv-yellow opacity-80" size={40} />
              <DecorativeSparkle className="pointer-events-none absolute left-8 top-12 text-xv-orange opacity-60" size={22} />
              <DecorativeSparkle className="pointer-events-none absolute left-20 bottom-16 text-xv-cyan opacity-50" size={32} />

              <div className="relative">
                <Image
                  src="/mascotes/globinho-t.png"
                  alt="Clocky, mascote do tempo da Xô Varal"
                  width={320}
                  height={320}
                  className="drop-shadow-2xl animate-float"
                  priority
                />
                {/* Badge flutuante */}
                <div className="absolute -top-4 -right-8 rounded-2xl bg-xv-navy px-5 py-3 shadow-xl animate-float-delay">
                  <div className="text-xs font-bold uppercase tracking-wider text-white/60">Tempo é economia!</div>
                  <div className="text-white text-lg font-black flex items-center gap-1.5"><Clock size={18} /> 45 min</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Wave bottom */}
        <div className="relative h-16 w-full overflow-hidden" aria-hidden>
          <svg viewBox="0 0 1440 64" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="absolute bottom-0 w-full">
            <path d="M0,32 C360,64 1080,0 1440,32 L1440,64 L0,64 Z" fill="#ffffff" />
          </svg>
        </div>
      </section>

      {/* Passo a passo */}
      <section id="passo-a-passo" className="py-20 sm:py-28 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <span className="text-xs font-bold uppercase tracking-wider text-xv-cyan">Guia completo</span>
            <h2 className="mt-3 text-4xl font-black text-xv-navy sm:text-5xl">Passo a passo completo</h2>
            <p className="mt-3 text-xv-gray-700 max-w-xl mx-auto">Da chegada à saída — sem dúvida nenhuma.</p>
          </div>
          <div className="space-y-5">
            {HOW_IT_WORKS.map((item, idx) => {
              const Icon = stepIcons[idx]
              const color = stepColors[idx]
              return (
                <div
                  key={item.step}
                  className="group flex flex-col md:flex-row gap-6 items-start rounded-[2rem] bg-white p-8 shadow-card ring-1 ring-xv-gray-200/60 hover:shadow-card-hover hover:-translate-y-1 transition-all"
                >
                  <div className="shrink-0 flex flex-col items-center gap-2">
                    <div
                      className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg"
                      style={{ background: item.bg, border: `2px solid ${color}30` }}
                    >
                      <Icon size={28} style={{ color }} />
                    </div>
                    <div className="text-xs font-black uppercase tracking-widest text-xv-gray-500">Passo {item.step}</div>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-display font-bold text-xv-navy text-xl mb-2">{item.title}</h3>
                    <p className="text-xv-gray-700 leading-relaxed">{item.description}</p>
                  </div>
                  <div
                    className="shrink-0 hidden md:flex items-center justify-center w-12 h-12 rounded-full font-black text-white text-xl shadow-lg"
                    style={{ background: `linear-gradient(135deg, ${color}, ${color}cc)` }}
                  >
                    {item.step}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Preços / Máquinas */}
      <section className="py-20 sm:py-24" style={{ background: 'linear-gradient(180deg, #f5f7fa 0%, #e5f7ff 100%)' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <span className="text-xs font-bold uppercase tracking-wider text-xv-cyan">SpeedQueen profissional</span>
            <h2 className="mt-3 text-4xl font-black text-xv-navy sm:text-5xl">Nossas máquinas</h2>
            <p className="mt-3 text-xv-gray-700">Referência mundial em lavanderias profissionais.</p>
          </div>
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              { label: 'Lavagem', price: 'R$ 17,00', desc: '10,5 kg com OMO + Comfort inclusos', time: '~45 min', Icon: Droplets, color: '#01B3DC', bg: '#E5F7FF', shadow: 'rgba(1,179,220,0.3)' },
              { label: 'Secagem', price: 'R$ 16,99', desc: 'Secagem profissional — 100% seca', time: '~45 min', Icon: Wind, color: '#EE7531', bg: '#FFF3EA', shadow: 'rgba(238,117,49,0.3)' },
              { label: 'Ciclo Completo', price: 'R$ 33,99', desc: 'Lavagem + Secagem combo', time: '~1 hora', Icon: Sparkles, color: '#FBC132', bg: '#FFFAE0', shadow: 'rgba(251,193,50,0.4)', highlight: true },
            ].map((item) => (
              <div
                key={item.label}
                className={`relative rounded-[2rem] bg-white p-8 text-center flex flex-col items-center shadow-card hover:-translate-y-2 transition-all ${item.highlight ? 'ring-2' : 'ring-1 ring-xv-gray-200/60'}`}
                style={{
                  boxShadow: `0 8px 40px -8px ${item.shadow}`,
                  outline: item.highlight ? `2px solid ${item.color}` : '1px solid rgba(37,49,99,0.1)',
                  outlineOffset: '-1px',
                }}
              >
                {item.highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full px-4 py-1 text-[10px] font-black uppercase tracking-widest text-white" style={{ background: item.color }}>
                    Mais popular
                  </div>
                )}
                <div className="h-16 w-16 rounded-2xl flex items-center justify-center mb-4 shadow-md" style={{ background: item.bg }}>
                  <item.Icon size={32} style={{ color: item.color }} />
                </div>
                <h3 className="font-black text-xv-navy text-lg mb-1">{item.label}</h3>
                <div className="text-3xl font-black mb-2" style={{ color: item.color }}>{item.price}</div>
                <p className="text-xv-gray-700 text-sm mb-3">{item.desc}</p>
                <div className="text-xs font-bold text-xv-gray-500">⏱ {item.time}</div>
              </div>
            ))}
          </div>
          <div className="mt-8 rounded-[2rem] p-6 text-center" style={{ background: 'linear-gradient(135deg, #22c55e20, #16a34a15)', border: '1.5px solid #22c55e40' }}>
            <p className="text-xv-navy font-bold text-sm">
              ✅ <span className="text-green-700">OMO e Comfort já inclusos</span> — você não precisa trazer nada além das roupas.
            </p>
          </div>
        </div>
      </section>

      {/* Pagamento */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="rounded-[2rem] p-10 text-center relative overflow-hidden text-white" style={{ background: 'linear-gradient(135deg, #0A1942 0%, #15326C 50%, #1E4A9F 100%)' }}>
            <div className="pointer-events-none absolute right-0 top-0 h-64 w-64 rounded-full blur-3xl opacity-20" style={{ background: '#01B3DC' }} />
            <div className="relative">
              <div className="text-5xl mb-4">📱</div>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-white mb-3">Como fazer o pagamento?</h2>
              <p className="text-white/75 mb-6 max-w-lg mx-auto">
                Pelo app da Xô Varal ou pelo totem digital na loja. Rápido e sem complicação.
              </p>
              <div className="flex flex-wrap justify-center gap-3 mb-6">
                {['Pix', 'Cartão de débito', 'Cartão de crédito'].map((method) => (
                  <span key={method} className="bg-white/15 border border-white/25 text-white text-sm font-bold px-5 py-2 rounded-full">
                    {method}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* O que trazer / não trazer */}
      <section className="py-20 bg-xv-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-xv-orange">Antes de vir</span>
            <h2 className="mt-3 text-4xl font-black text-xv-navy">O que preciso levar?</h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="rounded-[2rem] bg-white p-7 shadow-card ring-1 ring-green-100" style={{ boxShadow: '0 8px 40px -8px rgba(34,197,94,0.25)' }}>
              <div className="flex items-center gap-3 mb-5">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl text-white" style={{ background: 'linear-gradient(135deg, #22c55e, #16a34a)' }}><ShoppingBag size={22} /></div>
                <h3 className="text-lg font-black text-xv-navy">Traga apenas</h3>
              </div>
              <ul className="space-y-3">
                {['Suas roupas, roupas de cama, edredons ou toalhas', 'Seu celular (pra pagar pelo app, opcional)', 'Uma sacola ou cesto pra transportar'].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-xv-gray-700">
                    <svg className="mt-0.5 flex-shrink-0 h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-[2rem] bg-white p-7 shadow-card ring-1 ring-red-100" style={{ boxShadow: '0 8px 40px -8px rgba(239,68,68,0.2)' }}>
              <div className="flex items-center gap-3 mb-5">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl text-white text-xl" style={{ background: 'linear-gradient(135deg, #ef4444, #dc2626)' }}>🚫</div>
                <h3 className="text-lg font-black text-xv-navy">Não precisa trazer</h3>
              </div>
              <ul className="space-y-3">
                {['Sabão em pó ou líquido — já incluído', 'Amaciante — OMO e Comfort já estão no ciclo', 'Alvejante ou qualquer produto extra', 'Agendamento ou reserva prévia'].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-xv-gray-700">
                    <svg className="mt-0.5 flex-shrink-0 h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-white">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-4xl font-black text-xv-navy mb-4">Pronto para vir pela <span className="text-xv-orange">primeira vez?</span></h2>
          <p className="text-xv-gray-700 mb-8">A unidade do Castelo fica aberta 24 horas, todos os dias. Sem agendamento, sem espera.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href={whatsappUrl('comoFunciona')} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-8 py-4 text-sm font-bold text-white shadow-lg transition hover:brightness-110">
              Chamar no WhatsApp
            </a>
            <Link href="/localizacao" className="inline-flex items-center justify-center gap-2 rounded-full bg-xv-navy px-8 py-4 text-sm font-bold text-white shadow-md transition hover:bg-xv-navy-light">
              <MapPin size={16} /> Ver como chegar
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
