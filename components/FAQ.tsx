'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { FAQ as FAQ_DATA } from '@/lib/constants'
import Link from 'next/link'

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section className="section-pad bg-white" id="faq">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-14">
          <div className="badge-cyan mb-5 inline-flex">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-xv-cyan opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-xv-cyan" />
            </span>
            Dúvidas frequentes
          </div>
          <h2 className="section-title text-xv-navy mb-4">
            Perguntas{' '}
            <span className="amber-text">frequentes</span>
          </h2>
          <p className="section-body mx-auto text-center">
            Tudo que você precisa saber antes de vir pela primeira vez.
          </p>
        </div>

        <div className="space-y-3">
          {FAQ_DATA.map((item, idx) => (
            <div
              key={idx}
              className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                open === idx
                  ? 'border-xv-cyan/30 bg-xv-cyan-bg shadow-md'
                  : 'border-xv-gray-200/60 bg-white hover:border-xv-cyan/20'
              }`}
            >
              <button
                className="w-full flex items-center justify-between gap-4 p-5 text-left"
                onClick={() => setOpen(open === idx ? null : idx)}
                aria-expanded={open === idx}
              >
                <span className={`font-bold text-sm md:text-base leading-snug transition-colors ${
                  open === idx ? 'text-xv-navy' : 'text-xv-text'
                }`}>
                  {item.question}
                </span>
                <span
                  className={`shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300 ${
                    open === idx ? 'bg-xv-cyan text-white rotate-180' : 'bg-xv-gray-50 text-xv-gray-500'
                  }`}
                >
                  <ChevronDown size={16} />
                </span>
              </button>

              <div className={`transition-all duration-300 ${open === idx ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}>
                <div className="px-5 pb-5 text-xv-gray-700 text-sm leading-relaxed border-t border-xv-cyan/15 pt-4">
                  {item.answer}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <p className="text-xv-gray-500 text-sm mb-4">Ainda tem dúvidas?</p>
          <a
            href="https://wa.me/5531993328775?text=Olá!+Vim+pelo+site+e+tenho+uma+dúvida."
            target="_blank"
            rel="noopener noreferrer"
            className="btn-whatsapp shimmer-btn"
          >
            <WhatsAppIcon />
            Chamar no WhatsApp
          </a>
        </div>
      </div>
    </section>
  )
}

function WhatsAppIcon() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
}
