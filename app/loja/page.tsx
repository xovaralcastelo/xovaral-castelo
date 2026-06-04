import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { SITE, whatsappUrl } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Loja Xô Varal — Acesso exclusivo a brindes e vouchers | Xô Varal Castelo',
  description:
    'A Loja Xô Varal é exclusiva para clientes cadastrados. Brindes, vouchers de ciclo e troca de pontos após aprovação da equipe.',
}

const STORE_ITEMS = [
  { icon: '🎁', title: 'Brindes exclusivos',    desc: 'Produtos da marca disponíveis apenas para membros do clube.', color: '#EE7531', bg: '#FFF3EA' },
  { icon: '🎟️', title: 'Vouchers de ciclo',     desc: 'Compre ciclos com desconto e use quando quiser.', color: '#01B3DC', bg: '#E5F7FF' },
  { icon: '⭐', title: 'Troca de pontos',       desc: 'Acumule pontos em cada ciclo e troque por recompensas.', color: '#FBC132', bg: '#FFFAE0' },
  { icon: '🤝', title: 'Benefícios de parceiros', desc: 'Cupons exclusivos de parceiros locais do Castelo.', color: '#253163', bg: '#EDF0FF' },
]

export default function LojaPage() {
  return (
    <>
      {/* Hero — 2 colunas com mascote */}
      <section
        className="relative overflow-hidden pt-28 pb-0"
        style={{ background: 'linear-gradient(135deg, #ffffff 0%, #f0fafe 50%, #fff8f2 100%)' }}
      >
        {/* Blobs */}
        <div className="pointer-events-none absolute top-0 right-0 h-80 w-80 rounded-full blur-3xl opacity-20" style={{ background: '#FBC132' }} />
        <div className="pointer-events-none absolute bottom-0 left-0 h-64 w-64 rounded-full blur-3xl opacity-15" style={{ background: '#EE7531' }} />

        {/* Sparkles */}
        <div className="pointer-events-none absolute right-72 top-12 text-xv-yellow text-4xl opacity-80">✦</div>
        <div className="pointer-events-none absolute right-52 top-6 text-xv-orange text-2xl opacity-60">✦</div>
        <div className="pointer-events-none absolute left-16 bottom-20 text-xv-cyan text-3xl opacity-40">✦</div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-10 items-center pb-20">
            {/* Esquerda */}
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-xv-orange/30 bg-xv-orange-bg px-5 py-2 text-sm font-bold text-xv-orange mb-6">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-xv-orange opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-xv-orange" />
                </span>
                🔐 Acesso Exclusivo · Cadastro Requerido
              </div>
              <h1 className="font-display text-5xl sm:text-6xl font-bold text-xv-navy leading-[1.05] mb-6">
                Uma loja pensada{' '}
                <span className="relative inline-block text-xv-orange">
                  só pra quem é da casa.
                  <svg className="absolute -bottom-1 left-0 w-full" viewBox="0 0 380 10" preserveAspectRatio="none" aria-hidden>
                    <path d="M0 7 Q95 2 190 5 T380 4" stroke="#FBC132" strokeWidth="5" fill="none" strokeLinecap="round" />
                  </svg>
                </span>
              </h1>
              <p className="text-xv-gray-700 text-lg leading-relaxed max-w-lg mb-8">
                A Loja Xô Varal é particular. Brindes, vouchers de ciclo e troca de pontos só ficam disponíveis depois do seu cadastro ser aprovado pela nossa equipe — é assim que a gente garante preços, fidelidade e atendimento personalizado.
              </p>
              <div className="flex flex-wrap gap-3">
                <a
                  href={`${SITE.whatsapp}?text=Olá! Gostaria de solicitar acesso à Loja Xô Varal Castelo.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-xv-navy px-7 py-3.5 text-sm font-bold text-white shadow-lg transition hover:bg-xv-navy-light"
                >
                  → Solicitar acesso
                </a>
                <Link
                  href="/clube-de-vantagens/entrar"
                  className="inline-flex items-center gap-2 rounded-full border-2 border-xv-navy/20 bg-white px-7 py-3.5 text-sm font-bold text-xv-navy transition hover:border-xv-navy/50"
                >
                  Já tenho conta
                </Link>
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
                  <div className="text-white font-black text-base">Bora se cadastrar? 🛒</div>
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

      {/* O que tem na loja */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <span className="text-xs font-bold uppercase tracking-wider text-xv-orange">Exclusivo para membros</span>
            <h2 className="mt-3 text-4xl font-black text-xv-navy sm:text-5xl">O que tem na loja?</h2>
            <p className="mt-3 text-xv-gray-700 max-w-xl mx-auto">Vantagens reais para quem faz parte da família Xô Varal.</p>
          </div>
          <div className="grid sm:grid-cols-2 gap-6">
            {STORE_ITEMS.map((item) => (
              <div
                key={item.title}
                className="group relative overflow-hidden rounded-[2rem] bg-white p-8 shadow-card ring-1 ring-xv-gray-200/60 hover:-translate-y-1 hover:shadow-card-hover transition-all"
              >
                <div
                  className="h-16 w-16 rounded-2xl flex items-center justify-center text-3xl mb-5 shadow-md"
                  style={{ background: item.bg, border: `1.5px solid ${item.color}30` }}
                >
                  {item.icon}
                </div>
                <h3 className="font-bold text-xv-navy text-lg mb-2">{item.title}</h3>
                <p className="text-xv-gray-700 text-sm leading-relaxed">{item.desc}</p>
                <div
                  className="absolute bottom-0 left-0 h-1 w-0 group-hover:w-full transition-all duration-500 rounded-b-[2rem]"
                  style={{ background: item.color }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Como acessar */}
      <section className="py-20 sm:py-24" style={{ background: 'linear-gradient(180deg, #f5f7fa 0%, #fff8f2 100%)' }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-xv-orange">Simples e rápido</span>
            <h2 className="mt-3 text-4xl font-black text-xv-navy">Como acessar a loja?</h2>
          </div>
          <div className="space-y-4">
            {[
              { num: '1', title: 'Solicite o acesso',    desc: 'Mande uma mensagem no WhatsApp pedindo o cadastro na Loja Xô Varal.', color: '#01B3DC', bg: '#E5F7FF' },
              { num: '2', title: 'Aguarde a aprovação', desc: 'Nossa equipe aprova em até 24 horas e libera o acesso completo.', color: '#EE7531', bg: '#FFF3EA' },
              { num: '3', title: 'Aproveite!',           desc: 'Acesse a loja, resgate brindes, compre vouchers e troque seus pontos.', color: '#FBC132', bg: '#FFFAE0' },
            ].map((step) => (
              <div
                key={step.num}
                className="flex items-start gap-5 rounded-[2rem] bg-white p-6 shadow-card ring-1 ring-xv-gray-200/60"
              >
                <div
                  className="h-12 w-12 rounded-full flex items-center justify-center text-white font-black text-xl shrink-0 shadow-lg"
                  style={{ background: `linear-gradient(135deg, ${step.color}, ${step.color}cc)` }}
                >
                  {step.num}
                </div>
                <div>
                  <h3 className="font-bold text-xv-navy text-base mb-1">{step.title}</h3>
                  <p className="text-xv-gray-700 text-sm">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-white">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-4xl font-black text-xv-navy mb-4">Pronto para <span className="text-xv-orange">solicitar acesso?</span></h2>
          <p className="text-xv-gray-700 mb-8">É rápido. Manda WhatsApp e em até 24h você já está dentro.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={`${SITE.whatsapp}?text=Olá! Gostaria de solicitar acesso à Loja Xô Varal Castelo.`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-8 py-4 text-sm font-bold text-white shadow-lg transition hover:brightness-110"
            >
              Solicitar via WhatsApp
            </a>
            <Link href="/clube-de-vantagens" className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-xv-navy/20 bg-white px-8 py-4 text-sm font-bold text-xv-navy transition hover:border-xv-navy/50">
              Ver Clube de Vantagens
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
