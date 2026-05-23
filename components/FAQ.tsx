'use client'

import { useState } from 'react'
import { FAQ as FAQ_DATA } from '@/lib/constants'

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section className="py-20 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="badge bg-orange/10 text-orange mb-4">
            <span className="w-1.5 h-1.5 bg-orange rounded-full" />
            Dúvidas frequentes
          </span>
          <h2 className="section-title text-primary mb-4">
            Perguntas frequentes
          </h2>
          <p className="section-subtitle mx-auto text-center text-gray-500">
            Tudo o que você precisa saber antes de vir pela primeira vez.
          </p>
        </div>

        {/* Accordion */}
        <div className="space-y-3">
          {FAQ_DATA.map((item, idx) => (
            <FAQItem
              key={idx}
              item={item}
              isOpen={open === idx}
              onToggle={() => setOpen(open === idx ? null : idx)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

function FAQItem({
  item,
  isOpen,
  onToggle,
}: {
  item: (typeof FAQ_DATA)[0]
  isOpen: boolean
  onToggle: () => void
}) {
  return (
    <div
      className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
        isOpen
          ? 'border-primary/20 bg-primary/5 shadow-md'
          : 'border-gray-200 bg-white hover:border-primary/20'
      }`}
    >
      <button
        className="w-full flex items-center justify-between gap-4 p-5 text-left"
        onClick={onToggle}
        aria-expanded={isOpen}
      >
        <span className={`font-bold text-sm md:text-base leading-snug transition-colors ${isOpen ? 'text-primary' : 'text-gray-800'}`}>
          {item.question}
        </span>
        <span
          className={`shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300 ${
            isOpen ? 'bg-primary text-white rotate-180' : 'bg-gray-100 text-gray-400'
          }`}
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </button>

      <div
        className={`transition-all duration-300 ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        } overflow-hidden`}
      >
        <div className="px-5 pb-5 text-gray-600 text-sm leading-relaxed border-t border-primary/10 pt-4">
          {item.answer}
        </div>
      </div>
    </div>
  )
}
