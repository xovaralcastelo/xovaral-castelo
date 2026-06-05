import type { Metadata } from 'next'
import Image from 'next/image'
import FAQ from '@/components/FAQ'
import CTABanner from '@/components/CTABanner'
import { DecorativeSparkle } from '@/components/ui/DecorativeSparkle'
import { whatsappUrl } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Dúvidas Frequentes | Xô Varal Castelo',
  description:
    'Tire todas as suas dúvidas sobre a Xô Varal Castelo. Como funciona, quanto custa, o que trazer, pagamento, horários e muito mais.',
}

export default function FAQPage() {
  return (
    <>
      {/* Hero — 2 colunas com mascote */}
      <section
        className="relative overflow-hidden pt-28 pb-0"
        style={{ background: 'linear-gradient(135deg, #ffffff 0%, #fff8f2 50%, #fff3ea 100%)' }}
      >
        {/* Blobs */}
        <div className="pointer-events-none absolute top-16 right-0 h-72 w-72 rounded-full blur-3xl opacity-20" style={{ background: '#EE7531' }} />
        <div className="pointer-events-none absolute bottom-0 left-0 h-56 w-56 rounded-full blur-3xl opacity-15" style={{ background: '#FBC132' }} />

        {/* Sparkles decorativos */}
        <DecorativeSparkle className="pointer-events-none absolute right-64 top-10 text-xv-orange opacity-70" size={40} />
        <DecorativeSparkle className="pointer-events-none absolute right-48 top-6 text-xv-yellow opacity-60" size={22} />
        <DecorativeSparkle className="pointer-events-none absolute left-16 bottom-20 text-xv-cyan opacity-40" size={32} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-10 items-center pb-20">
            {/* Esquerda */}
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-xv-orange/30 bg-xv-orange-bg px-5 py-2 text-sm font-bold text-xv-orange mb-6">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-xv-orange opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-xv-orange" />
                </span>
                🔍 Tira-Dúvidas
              </div>
              <h1 className="font-display text-5xl sm:text-6xl font-bold text-xv-navy leading-[1.05] mb-6">
                As perguntas mais comuns —{' '}
                <span className="relative inline-block text-xv-orange">
                  respondidas direto.
                  <svg className="absolute -bottom-1 left-0 w-full" viewBox="0 0 340 10" preserveAspectRatio="none" aria-hidden>
                    <path d="M0 7 Q85 2 170 5 T340 4" stroke="#FBC132" strokeWidth="5" fill="none" strokeLinecap="round" />
                  </svg>
                </span>
              </h1>
              <p className="text-xv-gray-700 text-lg leading-relaxed max-w-lg mb-8">
                Sua dúvida provavelmente está aqui. Se não estiver, manda WhatsApp que respondemos em poucos minutos — somos gente de verdade, não bot.
              </p>
              <div className="flex flex-wrap gap-3">
                <a
                  href={whatsappUrl('generic')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-7 py-3.5 text-sm font-bold text-white shadow-lg transition hover:brightness-110"
                >
                  Chamar no WhatsApp
                </a>
                <a
                  href="#duvidas"
                  className="inline-flex items-center gap-2 rounded-full border-2 border-xv-navy/20 bg-white px-7 py-3.5 text-sm font-bold text-xv-navy transition hover:border-xv-navy/50"
                >
                  Ver perguntas ↓
                </a>
              </div>
            </div>

            {/* Direita: mascote */}
            <div className="hidden lg:flex justify-center items-center relative">
              <div className="relative">
                <Image
                  src="/mascotes/meia-t.png"
                  alt="Puffy pensativo, mascote da Xô Varal"
                  width={300}
                  height={300}
                  className="drop-shadow-2xl animate-float"
                  priority
                />
                {/* Badge flutuante */}
                <div className="absolute -top-4 -right-10 rounded-2xl bg-xv-navy px-5 py-3 shadow-xl animate-float-delay">
                  <div className="text-white font-black text-base">Pode perguntar! 😄</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Wave */}
        <div className="relative h-16 w-full overflow-hidden" aria-hidden>
          <svg viewBox="0 0 1440 64" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="absolute bottom-0 w-full">
            <path d="M0,32 C360,64 1080,0 1440,32 L1440,64 L0,64 Z" fill="#f5f7fa" />
          </svg>
        </div>
      </section>

      {/* FAQ Accordion */}
      <div id="duvidas">
        <FAQ />
      </div>

      <CTABanner />
    </>
  )
}
