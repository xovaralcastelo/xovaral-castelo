import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import {
  Handshake, Ticket, Megaphone, Link2, BarChart3, Trophy,
  Dumbbell, Pizza, Laptop, Scissors, GraduationCap, Home, ShoppingCart, Coffee, Stethoscope,
  Smartphone, Camera,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { ExternalLink, MessageCircle } from 'lucide-react'
import { DecorativeSparkle } from '@/components/ui/DecorativeSparkle'
import { SITE, PARTNER_SIGNUP_URL, whatsappUrl } from '@/lib/constants'
import { getActivePartners } from '@/lib/data'

export const dynamic = 'force-dynamic'

const PARTNER_CATEGORY_LABELS: Record<string, string> = {
  academia: 'Academia', restaurante: 'Restaurante', condominio: 'Condomínio',
  faculdade: 'Faculdade', salao: 'Beleza & Estética', servico: 'Serviço',
  comercio: 'Comércio', outro: 'Parceiro',
}

export const metadata: Metadata = {
  title: 'Parceiros | Xô Varal Castelo',
  description:
    'Seja parceiro da Xô Varal Castelo. Cupons exclusivos, campanhas conjuntas e visibilidade para mais de 470 clientes ativos no bairro. Cadastre seu negócio.',
}

const BENEFITS_PARTNER: { icon: LucideIcon; title: string; desc: string; color: string; bg: string }[] = [
  { icon: Ticket,    title: 'Cupons exclusivos',   desc: 'Crie cupons personalizados para seus clientes usarem na Xô Varal — e vice-versa.', color: '#EE7531', bg: '#FFF3EA' },
  { icon: Megaphone, title: 'Menção nas redes',    desc: 'Seu negócio mencionado nas redes sociais da Xô Varal Castelo para mais de 1.000 seguidores.', color: '#01B3DC', bg: '#E5F7FF' },
  { icon: Handshake, title: 'Campanhas conjuntas', desc: 'Ações de marketing colaborativo no bairro — alcance maior, custo dividido.', color: '#FBC132', bg: '#FFFAE0' },
  { icon: Link2,     title: 'Link e QR Code',      desc: 'Seu negócio referenciado no site da Xô Varal com link direto e QR code exclusivo.', color: '#EE7531', bg: '#FFF3EA' },
  { icon: BarChart3, title: 'Painel de parceiros', desc: 'Em breve: acesse métricas, cupons ativos e resultados da parceria diretamente online.', color: '#01B3DC', bg: '#E5F7FF' },
  { icon: Trophy,    title: 'Comunidade local',    desc: 'Faça parte da rede de negócios que fortalece o ecossistema comercial do Castelo.', color: '#253163', bg: '#EDF0FF' },
]

const WHO_CAN_PARTNER: { icon: LucideIcon; label: string }[] = [
  { icon: Dumbbell,       label: 'Academias e studios' },
  { icon: Pizza,          label: 'Restaurantes e lanchonetes' },
  { icon: Laptop,         label: 'Coworkings' },
  { icon: Scissors,       label: 'Salões e barbearias' },
  { icon: GraduationCap,  label: 'Faculdades e cursinhos' },
  { icon: Home,           label: 'Imobiliárias' },
  { icon: ShoppingCart,   label: 'Mercados e lojas locais' },
  { icon: Coffee,         label: 'Cafeterias e padarias' },
  { icon: Stethoscope,    label: 'Clínicas e consultórios' },
]

export default async function ParceirosPage() {
  const partners = await getActivePartners()

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
        <DecorativeSparkle className="pointer-events-none absolute right-64 top-12 text-xv-yellow opacity-80" size={40} />
        <DecorativeSparkle className="pointer-events-none absolute right-48 top-6 text-xv-orange opacity-60" size={20} />
        <DecorativeSparkle className="pointer-events-none absolute left-16 bottom-20 text-xv-cyan opacity-40" size={32} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-10 items-center pb-20">
            {/* Esquerda */}
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-xv-cyan/30 bg-xv-cyan-bg px-5 py-2 text-sm font-bold text-xv-cyan mb-6">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-xv-cyan opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-xv-cyan" />
                </span>
                <Handshake size={13} /> Programa de Parceria Local
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
                Seu negócio entra no mapa de mais de 470 clientes ativos que frequentam a Xô Varal toda semana. A gente oferece benefícios cruzados — você ganha visibilidade e seus clientes ganham vantagem.
              </p>
              <div className="flex flex-wrap gap-3">
                <a
                  href={PARTNER_SIGNUP_URL}
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
                  className="h-14 w-14 rounded-2xl flex items-center justify-center mb-4 shadow-md"
                  style={{ background: benefit.bg, border: `1.5px solid ${benefit.color}30`, color: benefit.color }}
                >
                  <benefit.icon size={26} strokeWidth={2.2} />
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

      {/* Nossos parceiros — listagem dinâmica (só aparece se houver parceiros ativos) */}
      {partners.length > 0 && (
        <section className="py-20 sm:py-24 bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-12">
              <span className="text-xs font-bold uppercase tracking-wider text-xv-cyan">Rede de parceiros</span>
              <h2 className="mt-3 text-4xl font-black text-xv-navy sm:text-5xl">Quem já é parceiro</h2>
              <p className="mt-3 text-xv-gray-700 max-w-xl mx-auto">
                Negócios do Castelo que oferecem vantagens para os clientes da Xô Varal.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {partners.map((p) => (
                <div
                  key={p.id}
                  className="flex flex-col rounded-[2rem] bg-white p-6 shadow-card ring-1 ring-xv-gray-200/60 hover:-translate-y-1 hover:shadow-card-hover transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div className="h-14 w-14 rounded-2xl overflow-hidden bg-xv-gray-50 ring-1 ring-xv-gray-200 flex items-center justify-center shrink-0">
                      {p.logo_url ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={p.logo_url} alt={p.name} className="h-full w-full object-contain" />
                      ) : (
                        <span className="text-xl font-black text-xv-navy">{p.name.charAt(0)}</span>
                      )}
                    </div>
                    <div>
                      <h3 className="font-black text-xv-navy leading-tight">{p.name}</h3>
                      <span className="text-xs font-bold uppercase tracking-wider text-xv-cyan">
                        {PARTNER_CATEGORY_LABELS[p.category] ?? p.category}
                      </span>
                    </div>
                  </div>

                  {p.description && (
                    <p className="mt-4 text-sm text-xv-gray-700 leading-relaxed">{p.description}</p>
                  )}

                  {p.benefit_text && (
                    <div className="mt-4 rounded-xl bg-xv-orange-bg px-4 py-2.5 text-sm font-bold text-xv-orange ring-1 ring-xv-orange/20">
                      🎁 {p.benefit_text}
                    </div>
                  )}

                  <div className="mt-auto pt-5 flex flex-wrap gap-2">
                    {p.website_url && (
                      <a
                        href={p.website_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-full bg-xv-navy px-4 py-2 text-xs font-bold text-white hover:bg-xv-navy-light"
                      >
                        <ExternalLink size={13} /> Site
                      </a>
                    )}
                    {p.whatsapp && (
                      <a
                        href={`https://wa.me/55${p.whatsapp.replace(/\D/g, '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-full bg-[#25D366] px-4 py-2 text-xs font-bold text-white hover:brightness-110"
                      >
                        <MessageCircle size={13} /> WhatsApp
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Quem pode ser parceiro */}
      <section className="py-20 sm:py-24" style={{ background: 'linear-gradient(180deg, #f5f7fa 0%, #fff8f2 100%)' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-xv-orange">Toda categoria bem-vinda</span>
            <h2 className="mt-3 text-4xl font-black text-xv-navy">Quem pode ser parceiro?</h2>
            <p className="mt-3 text-xv-gray-700">Qualquer negócio do Castelo ou região com interesse em crescer junto.</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {WHO_CAN_PARTNER.map((item) => {
              const Icon = item.icon
              return (
              <div
                key={item.label}
                className="bg-white rounded-2xl p-4 flex items-center gap-3 shadow-card hover:-translate-y-0.5 hover:shadow-card-hover transition-all ring-1 ring-xv-gray-200/60"
              >
                <div className="h-10 w-10 rounded-xl bg-xv-cyan-bg text-xv-cyan flex items-center justify-center shrink-0">
                  <Icon size={20} />
                </div>
                <span className="text-sm font-semibold text-xv-gray-700 leading-tight">{item.label}</span>
              </div>
              )
            })}
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
              href={PARTNER_SIGNUP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-5 bg-xv-orange/5 border-2 border-xv-orange/30 rounded-3xl p-6 hover:border-xv-orange transition-all hover:-translate-y-0.5 group"
            >
              <div className="w-14 h-14 bg-xv-orange rounded-2xl flex items-center justify-center text-white shrink-0 shadow-lg"><Handshake size={24} /></div>
              <div className="flex-1">
                <div className="font-black text-xv-navy text-lg">Formulário de parceria</div>
                <div className="text-xv-gray-700 text-sm">Cadastre seu negócio na nossa plataforma de parceiros — leads e banners em um só lugar</div>
              </div>
              <div className="text-xv-orange group-hover:translate-x-1 transition-transform text-xl">→</div>
            </a>
            <a
              href={`${SITE.whatsapp}?text=Olá! Tenho um negócio no Castelo e gostaria de saber mais sobre como ser parceiro da Xô Varal Castelo.`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-5 bg-[#f0fdf4] border-2 border-[#25d366]/30 rounded-3xl p-6 hover:border-[#25d366] transition-all hover:-translate-y-0.5 group"
            >
              <div className="w-14 h-14 bg-[#25d366] rounded-2xl flex items-center justify-center text-white shrink-0 shadow-lg"><Smartphone size={24} /></div>
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
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-white shrink-0 shadow-lg" style={{ background: 'linear-gradient(135deg, #833ab4, #fd1d1d, #fcb045)' }}><Camera size={24} /></div>
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
