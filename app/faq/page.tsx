import type { Metadata } from 'next'
import FAQ from '@/components/FAQ'
import CTABanner from '@/components/CTABanner'

export const metadata: Metadata = {
  title: 'FAQ — Perguntas Frequentes',
  description:
    'Tire todas as suas dúvidas sobre a Xô Varal Castelo. Como funciona, quanto custa, o que trazer, pagamento, horários e muito mais.',
}

export default function FAQPage() {
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
            Dúvidas frequentes
          </div>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-white mb-5 leading-tight">
            Perguntas{' '}
            <span className="amber-text">frequentes</span>
          </h1>
          <p className="text-white/75 text-lg max-w-2xl mx-auto leading-relaxed">
            Tudo que você precisa saber antes de vir pela primeira vez.
          </p>
        </div>
        <div className="absolute bottom-[-1px] left-0 w-full overflow-hidden" aria-hidden>
          <svg viewBox="0 0 1440 60" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <path d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z" fill="#ffffff" />
          </svg>
        </div>
      </section>

      <FAQ />
      <CTABanner />
    </>
  )
}
