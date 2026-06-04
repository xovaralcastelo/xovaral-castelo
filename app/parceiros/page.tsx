import type { Metadata } from 'next'
import Image from 'next/image'
import { SITE, whatsappUrl } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Parceiros | Xô Varal Castelo',
  description:
    'Seja parceiro da Xô Varal Castelo. Cupons exclusivos, campanhas conjuntas e visibilidade para mais de 250 clientes mensais no bairro. Cadastre seu negócio.',
}

const BENEFITS_PARTNER = [
  { icon: '🎫', title: 'Cupons exclusivos',   desc: 'Crie cupons personalizados para seus clientes usarem na Xô Varal — e vice-versa.', color: '#EE7531', bg: '#FFF3EA' },
  { icon: '📣', title: 'Menção nas redes',   desc: 'Seu negócio mencionado nas redes sociais da Xô Varal Castelo para mais de 1.000 seguidores.', color: '#01B3DC', bg: '#E5F7FF' },
  { icon: '🤝', title: 'Campanhas conjuntas', desc: 'Ações de marketing colaborativo no bairro — alcance maior, custo dividido.', color: '#FBC132', bg: '#FFFAE0' },
  { icon: '🔗', title: 'Link e QR Code',      desc: 'Seu negócio referenciado no site da Xô Varal com link direto e QR code exclusivo.', color: '#EE7531', bg: '#FFF3EA' },
  { icon: '📊', title: 'Painel de parceiros', desc: 'Em breve: acesse métricas, cupons ativos e resultados da parceria diretamente online.', color: '#01B3DC', bg: '#E5F7FF' },
  { icon: '🏆', title: 'Comunidade local',    desc: 'Faça parte da rede de negócios que fortalece o ecossistema comercial do Castelo.', color: '#253163', bg: '#EDF0FF' },
]

const WHO_CAN_PARTNER = [
  { icon: '💪', label: 'Academias e studios' },
  { icon: '🍕', label: 'Restaurantes e lanchonetes' },
  { icon: '💻', label: 'Coworkings' },
  { icon: '💇', label: 'Salões e barbearias' },
  { icon: '🎓', label: 'Faculdades e cursinhos' },
  { icon: '🏠', label: 'Imobiliárias' },
  { icon: '🛒', label: 'Mercados e lojas locais' },
  { icon: '☕', label: 'Cafeterias e padarias' },
  { icon: '🏥', label: 'Clínicas e consultórios' },
]

export default function ParceirosPage() {
  return (
    <>
      {/* Hero — fundo claro com mascote */}
      <section
        className="relative overflow-hidden pt-28 pb-0"
        style={{ background: 'linear-gradient(135deg, #ffffff 0%, #fff8f2 40%, #f0fafe 100%)' }}
      >
        {/* Blobs */}
        <div className="pointer-events-none absolute top-0 right-0 h-72 w-72 rounded-full blur-3xl opacity-25" style={{ background: '#FBC132' }} />
        <div className="pointer-events-none absolute bottom-0 left-0 h-64 w-64 rounded-full blur-3xl opacity-15" style={{ background: '#01B3DC' }} />

        {/* Sparkles decorativos */}
        <div className="pointer-events-none absolute right-64 top-12 text-xv-yellow text-4xl opacity-80">✦</div>
        <div className="pointer-events-none absolute right-48 top-6 text-xv-orange text-xl opacity-60">✦</div>
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
                🤝 Programa de Parceria Local
              </div>
              <h1 className="font-display text-5xl sm:text-6xl font-bold text-xv-navy leading-[1.05] mb-6">
                Crescer com o Castelo,{' '}
                <span className="relative inline-block text-xv-orange">
                  junto com a gente.
                  <svg className="absolute -bottom-1 left-0 w-full" viewBox="0 0 360 10" preserveAspectRatio="none" aria-hidden>
                    <path d="M0 7 Q90 2 180 5 T360 4" stroke="#FBC132" strokeWidth="5" fill="none" strokeLinecap="round" />
                  </svg>
                </span>
              </h1>
              <p className="text-xv-gray-700 text-lg leading-relaxed max-w-lg mb-8">
                Seu negócio entra no mapa de centenas de moradores que frequentam a Xô Varal toda semana. A gente oferece benefícios cruzados — você ganha visibilidade e seus clientes ganham vantagem.
              </p>
              <div className="flex flex-wrap gap-3">
                <a
                  href={`${SITE.whatsapp}?text=Olá! Tenho um negócio no Castelo e gostaria de saber mais sobre como ser parceiro da Xô Varal Castelo.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-xv-navy px-7 py-3.5 text-sm font-bold text-white shadow-lg transition hover:bg-xv-navy-light"
                >
                  → Quero ser parceiro
                </a>
                <a
                  href={`${SITE.whatsapp}?text=Olá! Sou parceiro da Xô Varal Castelo e gostaria de acessar o painel.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border-2 border-xv-navy/20 bg-white px-7 py-3.5 text-sm font-bold text-xv-navy transition hover:border-xv-navy/50"
                >
                  Acessar painel
                </a>
              </div>
            </div>

            {/* Direita: mascote estrela */}
            <div className="hidden lg:flex justify-center items-center relative">
              <div className="relative">
                <Image
                  src="/mascotes/estrela-t.png"
                  alt="Luma, mascote da Xô Varal"
                  width={300}
                  height={300}
                  className="drop-shadow-2xl animate-float"
                  priority
                />
                {/* Badge flutuante */}
                <div className="absolute -top-4 -right-10 rounded-2xl bg-xv-navy px-5 py-3 shadow-xl animate-float-delay">
                  <div className="text-white font-black text-base">Bora juntos? 💛</div>
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

      {/* Benefícios — cards premium */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <span className="text-xs font-bold uppercase tracking-wider text-xv-cyan">O que você recebe</span>
            <h2 className="mt-3 text-4xl font-black text-xv-navy sm:text-5xl">O que seu negócio recebe</h2>
            <p className="mt-3 text-xv-gray-700 max-w-xl mx-auto">Parceria de verdade — visibilidade, clientes e crescimento conjunto.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {BENEFITS_PARTNER.map((benefit) => (
              <div
                key={benefit.title}
                className="group relative overflow-hidden rounded-[2rem] bg-white p-7 shadow-card ring-1 ring-xv-gray-200/60 hover:-translate-y-1 hover:shadow-card-hover transition-all"
              >
                <div
                  className="h-14 w-14 rounded-2xl flex items-center justify-center text-2xl mb-4 shadow-md"
                  style={{ background: benefit.bg, border: `1.5px solid ${benefit.color}30` }}
                >
                  {benefit.icon}
                </div>
                <h3 className="font-bold text-xv-navy text-base mb-2">{benefit.title}</h3>
                <p className="text-xv-gray-700 text-sm leading-relaxed">{benefit.desc}</p>
                <div
                  className="absolute bottom-0 left-0 h-1 w-0 group-hover:w-full transition-all duration-500 rounded-b-[2rem]"
                  style={{ background: benefit.color }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quem pode ser parceiro */}
      <section className="py-20 sm:py-24" style={{ background: 'linear-gradient(180deg, #f5f7fa 0%, #fff8f2 100%)' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-xv-orange">Toda categoria bem-vinda</span>
            <h2 className="mt-3 text-4xl font-black text-xv-navy">Quem pode ser parceiro?</h2>
            <p className="mt-3 text-xv-gray-700">Qualquer negócio do Castelo ou região com interesse em crescer junto.</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {WHO_CAN_PARTNER.map((item) => (
              <div
                key={item.label}
                className="bg-white rounded-2xl p-4 flex items-center gap-3 shadow-card hover:-translate-y-0.5 hover:shadow-card-hover transition-all ring-1 ring-xv-gray-200/60"
              >
                <span className="text-2xl">{item.icon}</span>
                <span className="text-sm font-semibold text-xv-gray-700 leading-tight">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA / Contato */}
      <section className="py-20 bg-white">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-xv-orange">Vamos conversar</span>
            <h2 className="mt-3 text-4xl font-black text-xv-navy">Quero ser parceiro</h2>
            <p className="mt-3 text-xv-gray-700">Mande uma mensagem — a gente retorna em até 24 horas para alinhar os detalhes da parceria.</p>
          </div>
          <div className="space-y-4">
            <a
              href={`${SITE.whatsapp}?text=Olá! Tenho um negócio no Castelo e gostaria de saber mais sobre como ser parceiro da Xô Varal Castelo.`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-5 bg-[#f0fdf4] border-2 border-[#25d366]/30 rounded-3xl p-6 hover:border-[#25d366] transition-all hover:-translate-y-0.5 group"
            >
              <div className="w-14 h-14 bg-[#25d366] rounded-2xl flex items-center justify-center text-white text-2xl shrink-0 shadow-lg">📱</div>
              <div className="flex-1">
                <div className="font-black text-xv-navy text-lg">WhatsApp Direto</div>
                <div className="text-xv-gray-700 text-sm">Resposta em até 24h — forma mais rápida</div>
              </div>
              <div className="text-[#25d366] group-hover:translate-x-1 transition-transform text-xl">→</div>
            </a>
            <a
              href={SITE.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-5 bg-[#fdf2f8] border-2 border-pink-200 rounded-3xl p-6 hover:border-pink-400 transition-all hover:-translate-y-0.5 group"
            >
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-white text-2xl shrink-0 shadow-lg" style={{ background: 'linear-gradient(135deg, #833ab4, #fd1d1d, #fcb045)' }}>📸</div>
              <div className="flex-1">
                <div className="font-black text-xv-navy text-lg">Instagram @xovaralcastelo</div>
                <div className="text-xv-gray-700 text-sm">Mande DM para conversarmos</div>
              </div>
              <div className="text-pink-500 group-hover:translate-x-1 transition-transform text-xl">→</div>
            </a>
          </div>
          <div className="mt-8 rounded-2xl p-5 text-center bg-xv-navy/5 border border-xv-navy/15">
            <div className="text-2xl mb-2">🚀</div>
            <h3 className="font-bold text-xv-navy text-sm mb-1">Painel de Parceiros — em breve</h3>
            <p className="text-xv-gray-700 text-xs leading-relaxed">Em breve você poderá cadastrar seu negócio, acessar métricas e gerenciar a parceria online.</p>
          </div>
        </div>
      </section>
    </>
  )
}
