import type { Metadata } from 'next'
import { SITE } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Área de Parceiros — Negócios locais no Castelo',
  description:
    'Seja parceiro da Xô Varal Castelo. Cupons exclusivos, campanhas conjuntas e visibilidade para mais de 250 clientes mensais no bairro. Cadastre seu negócio.',
}

const BENEFITS_PARTNER = [
  {
    icon: '🎫',
    title: 'Cupons exclusivos',
    desc: 'Crie cupons personalizados para seus clientes usarem na Xô Varal — e vice-versa.',
  },
  {
    icon: '📣',
    title: 'Menção nas redes',
    desc: 'Seu negócio mencionado nas redes sociais da Xô Varal Castelo para mais de 1.000 seguidores.',
  },
  {
    icon: '🤝',
    title: 'Campanhas conjuntas',
    desc: 'Ações de marketing colaborativo no bairro — alcance maior, custo dividido.',
  },
  {
    icon: '🔗',
    title: 'Link e QR Code',
    desc: 'Seu negócio referenciado no site da Xô Varal com link direto e QR code exclusivo.',
  },
  {
    icon: '📊',
    title: 'Painel de parceiros',
    desc: 'Em breve: acesse métricas, cupons ativos e resultados da parceria diretamente online.',
  },
  {
    icon: '🏆',
    title: 'Comunidade local',
    desc: 'Faça parte da rede de negócios que fortalece o ecossistema comercial do Castelo.',
  },
]

const WHO_CAN_PARTNER = [
  { icon: '💪', label: 'Academias e studios de treino' },
  { icon: '🍕', label: 'Restaurantes e lanchonetes' },
  { icon: '💻', label: 'Coworkings e escritórios compartilhados' },
  { icon: '💇', label: 'Salões de beleza e barbearias' },
  { icon: '🎓', label: 'Faculdades e cursinhos' },
  { icon: '🏠', label: 'Imobiliárias e condomínios' },
  { icon: '🛒', label: 'Mercados e lojas locais' },
  { icon: '☕', label: 'Cafeterias e padarias' },
  { icon: '🏥', label: 'Clínicas e consultórios' },
]

export default function ParceirosPage() {
  return (
    <>
      {/* Hero */}
      <section className="gradient-primary pt-28 pb-20 relative overflow-hidden">
        <div className="absolute top-20 right-10 w-64 h-64 bg-yellow/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-56 h-56 bg-sky/10 rounded-full blur-3xl" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-yellow/20 border border-yellow/30 text-yellow rounded-full px-5 py-2 text-sm font-bold mb-6">
            🤝 Parcerias Locais
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-white mb-5 leading-tight">
            Seu negócio +<br />
            <span className="text-yellow">Xô Varal = mais visibilidade.</span>
          </h1>
          <p className="text-white/75 text-lg max-w-2xl mx-auto leading-relaxed">
            A Xô Varal Castelo já atendeu mais de 250 clientes locais. Cada parceria
            significa mais alcance para você — sem custo de anúncio.
          </p>
        </div>
        <div className="wave-bottom">
          <svg viewBox="0 0 1440 60" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <path d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z" fill="#ffffff" />
          </svg>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <h2 className="section-title text-primary mb-4">
              O que seu negócio recebe
          </h2>
            <p className="section-subtitle mx-auto text-center text-gray-500">
              Parceria de verdade — visibilidade, clientes e crescimento conjunto.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {BENEFITS_PARTNER.map((benefit) => (
              <div key={benefit.title} className="card">
                <div className="text-3xl mb-4">{benefit.icon}</div>
                <h3 className="font-bold text-primary mb-2">{benefit.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who can partner */}
      <section className="py-16 bg-neutral-light">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <h2 className="section-title text-primary mb-4">
              Quem pode ser parceiro?
            </h2>
            <p className="section-subtitle mx-auto text-center text-gray-500">
              Qualquer negócio do Castelo ou região com interesse em crescer junto.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {WHO_CAN_PARTNER.map((item) => (
              <div
                key={item.label}
                className="bg-white rounded-2xl p-4 flex items-center gap-3 shadow-card hover:-translate-y-0.5 transition-all"
              >
                <span className="text-2xl">{item.icon}</span>
                <span className="text-sm font-semibold text-gray-700 leading-tight">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA / Contact form */}
      <section className="py-20 bg-white">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <h2 className="section-title text-primary mb-4">
              Quero ser parceiro
            </h2>
            <p className="section-subtitle mx-auto text-center text-gray-500">
              Mande uma mensagem no WhatsApp — a gente retorna em até 24 horas
              para alinhar os detalhes da parceria.
            </p>
          </div>

          {/* Contact CTA cards */}
          <div className="space-y-4">
            <a
              href={`${SITE.whatsapp}?text=Olá! Tenho um negócio no Castelo e gostaria de saber mais sobre como ser parceiro da Xô Varal Castelo.`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-5 bg-[#f0fdf4] border-2 border-[#25d366]/30 rounded-3xl p-6 hover:border-[#25d366] transition-all hover:-translate-y-0.5 group"
            >
              <div className="w-14 h-14 bg-[#25d366] rounded-2xl flex items-center justify-center text-white text-2xl shrink-0 shadow-lg">
                📱
              </div>
              <div className="flex-1">
                <div className="font-black text-primary text-lg">WhatsApp Direto</div>
                <div className="text-gray-500 text-sm">Resposta em até 24h — forma mais rápida</div>
              </div>
              <div className="text-[#25d366] group-hover:translate-x-1 transition-transform">
                →
              </div>
            </a>

            <a
              href={SITE.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-5 bg-[#fdf2f8] border-2 border-pink-200 rounded-3xl p-6 hover:border-pink-400 transition-all hover:-translate-y-0.5 group"
            >
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-white text-2xl shrink-0 shadow-lg" style={{ background: 'linear-gradient(135deg, #833ab4, #fd1d1d, #fcb045)' }}>
                📸
              </div>
              <div className="flex-1">
                <div className="font-black text-primary text-lg">Instagram @xovaralCastelo</div>
                <div className="text-gray-500 text-sm">Mande DM para conversarmos</div>
              </div>
              <div className="text-pink-500 group-hover:translate-x-1 transition-transform">
                →
              </div>
            </a>
          </div>

          {/* Future panel note */}
          <div className="mt-10 bg-primary/5 border border-primary/15 rounded-2xl p-5 text-center">
            <div className="text-2xl mb-2">🚀</div>
            <h3 className="font-bold text-primary text-sm mb-1">Painel de Parceiros — em breve</h3>
            <p className="text-gray-500 text-xs leading-relaxed">
              Em breve você poderá cadastrar seu negócio, acessar métricas, criar cupons e
              gerenciar a parceria diretamente online. Fique atento às atualizações.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
