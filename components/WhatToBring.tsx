import Image from 'next/image'

const traga = [
  { icon: '👕', label: 'Suas roupas' },
  { icon: '🛏️', label: 'Roupas de cama e banho' },
  { icon: '🧥', label: 'Edredons e cobertores' },
  { icon: '👟', label: 'Tênis e roupas de academia' },
]

const naoTraga = [
  { icon: '🫧', label: 'Sabão ou detergente' },
  { icon: '🌸', label: 'Amaciante' },
  { icon: '📅', label: 'Agendamento prévio' },
  { icon: '💳', label: 'Dinheiro (aceitamos Pix, débito e crédito)' },
]

export default function WhatToBring() {
  return (
    <section className="section-pad bg-white">
      <div className="container-xl">
        <div className="text-center mb-14">
          <div className="badge-orange mb-5 inline-flex">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-xv-orange opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-xv-orange" />
            </span>
            Antes de vir
          </div>
          <h2 className="section-title text-xv-navy mb-4">
            O que trazer —{' '}
            <span className="amber-text">e o que não precisa</span>
          </h2>
          <p className="section-body mx-auto text-center">
            Tudo que você precisa trazer cabe em uma sacola. O resto a gente já tem pra você.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {/* Traga */}
          <div className="card p-6">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-xv-cyan-bg flex items-center justify-center text-xl">
                ✅
              </div>
              <h3 className="font-display font-bold text-xv-navy text-lg">Traga apenas</h3>
            </div>
            <ul className="space-y-3">
              {traga.map((item) => (
                <li key={item.label} className="flex items-center gap-3 text-sm text-xv-gray-700">
                  <span className="w-8 h-8 rounded-lg bg-xv-cyan-bg flex items-center justify-center shrink-0 text-base">
                    {item.icon}
                  </span>
                  {item.label}
                </li>
              ))}
            </ul>
            <div className="mt-5 pt-4 border-t border-xv-gray-200/60">
              <p className="text-xv-cyan font-bold text-xs">
                10,5 kg de capacidade por máquina — traz tudo de uma vez!
              </p>
            </div>
          </div>

          {/* Não precisa trazer */}
          <div className="card p-6 bg-xv-orange-bg border border-xv-orange/20">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-xv-orange/15 flex items-center justify-center text-xl">
                🚫
              </div>
              <h3 className="font-display font-bold text-xv-navy text-lg">Não precisa trazer</h3>
            </div>
            <ul className="space-y-3">
              {naoTraga.map((item) => (
                <li key={item.label} className="flex items-center gap-3 text-sm text-xv-gray-700">
                  <span className="w-8 h-8 rounded-lg bg-xv-orange/15 flex items-center justify-center shrink-0 text-base">
                    {item.icon}
                  </span>
                  {item.label}
                </li>
              ))}
            </ul>
            <div className="mt-5 pt-4 border-t border-xv-orange/20">
              <p className="text-xv-orange font-bold text-xs">
                OMO + Comfort profissional já inclusos em cada ciclo!
              </p>
            </div>
          </div>
        </div>

        {/* Mascote strip */}
        <div className="mt-10 max-w-3xl mx-auto">
          <div className="royal-gradient rounded-[2rem] p-6 flex items-center gap-6">
            <div className="animate-float shrink-0">
              <Image
                src="/mascotes/estrela.png"
                alt="Mascote Estrela — Xô Varal"
                width={80}
                height={80}
                className="drop-shadow-xl"
              />
            </div>
            <div>
              <p className="font-display font-bold text-white text-lg mb-1">
                Chegou? É só colocar as roupas e relaxar!
              </p>
              <p className="text-white/70 text-sm">
                Selecione a máquina, pague pelo app ou totem e em ~45 min tudo fica pronto.
                A gente cuida do resto.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
