import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default function PartnersTeaser() {
  return (
    <section className="section-pad bg-white">
      <div className="container-xl">
        <div className="royal-gradient rounded-[2rem] p-10 md:p-14 flex flex-col md:flex-row items-center gap-8 relative overflow-hidden">
          <div aria-hidden className="absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl opacity-15 bg-xv-cyan" />
          <div aria-hidden className="absolute bottom-0 left-20 w-40 h-40 rounded-full blur-3xl opacity-10 bg-xv-orange" />

          {/* Left */}
          <div className="relative flex-1 text-center md:text-left">
            <div className="badge-navy mb-5 inline-flex">
              🤝 Parceiros Locais
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
              Seu negócio + Xô Varal =
              <br />
              <span className="amber-text">mais visibilidade no Castelo.</span>
            </h2>
            <p className="text-white/70 text-base leading-relaxed mb-8 max-w-lg">
              Academias, restaurantes, coworkings, salões, condomínios — se você
              tem um negócio no Castelo, existe uma parceria aqui esperando por você.
              Cupons, campanhas conjuntas e exposição de marca para mais de 250 clientes mensais.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
              <Link href="/parceiros" className="btn-whatsapp shimmer-btn" style={{ background: 'linear-gradient(90deg, #EE7531, #FBC132)' }}>
                Quero ser parceiro
                <ArrowRight size={16} />
              </Link>
              <Link href="/parceiros" className="btn-ghost">
                Acessar painel de parceiros
              </Link>
            </div>
          </div>

          {/* Right — perks card */}
          <div className="relative shrink-0 w-full md:w-72">
            <div className="bg-white/10 backdrop-blur-sm rounded-[2rem] p-6 border border-white/20">
              <h3 className="font-bold text-white text-sm mb-4 uppercase tracking-wide">
                O que você recebe como parceiro:
              </h3>
              <ul className="space-y-3">
                {[
                  { icon: '🎫', text: 'Cupons exclusivos para seus clientes' },
                  { icon: '📣', text: 'Menção nas redes sociais da Xô Varal' },
                  { icon: '🤝', text: 'Campanhas conjuntas no bairro' },
                  { icon: '🔗', text: 'Link no site e materiais' },
                  { icon: '📱', text: 'QR code de parceria exclusivo' },
                ].map((perk) => (
                  <li key={perk.text} className="text-white/85 text-sm flex items-center gap-2">
                    <span className="text-base shrink-0">{perk.icon}</span>
                    <span>{perk.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
