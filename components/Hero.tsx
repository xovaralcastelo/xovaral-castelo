'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { SITE } from '@/lib/constants'

export default function Hero() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100)
    return () => clearTimeout(t)
  }, [])

  return (
    <section className="relative min-h-screen gradient-primary flex items-center overflow-hidden">
      {/* Background decorative circles */}
      <div className="absolute top-20 right-[-8rem] w-96 h-96 bg-sky/10 rounded-full blur-3xl" />
      <div className="absolute bottom-10 left-[-6rem] w-72 h-72 bg-orange/15 rounded-full blur-3xl" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary-light/20 rounded-full blur-3xl" />

      {/* Mascot elements — floating bubbles */}
      <div className="absolute top-32 right-16 hidden lg:block animate-float opacity-80">
        <BubbleMascot size={64} />
      </div>
      <div className="absolute bottom-40 right-32 hidden lg:block animate-float-slow opacity-70">
        <SparkMascot size={40} />
      </div>
      <div className="absolute top-1/2 right-8 hidden xl:block animate-float-delay opacity-60">
        <FoamMascot size={48} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pt-24 pb-16 grid lg:grid-cols-2 gap-12 items-center">
        {/* Left — Copy */}
        <div
          className={`transition-all duration-700 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-orange/20 border border-orange/40 text-orange-light rounded-full px-4 py-1.5 text-sm font-bold mb-6">
            <span className="w-2 h-2 bg-orange rounded-full animate-pulse" />
            Aberto todos os dias — 6h às 23h
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight mb-6 text-balance">
            Lave e seque em{' '}
            <span className="text-orange relative">
              até 1 hora
              <svg
                className="absolute -bottom-1 left-0 w-full"
                viewBox="0 0 200 8"
                fill="none"
              >
                <path
                  d="M2 6 C50 2, 150 2, 198 6"
                  stroke="#ee7531"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </svg>
            </span>
            <br />com praticidade e conforto.
          </h1>

          <p className="text-white/80 text-lg leading-relaxed mb-8 max-w-xl">
            Na Xô Varal Buritis, você chega, escolhe a máquina, paga pelo app ou
            totem, lava, seca e vai embora com tudo pronto.{' '}
            <strong className="text-white">Sem fila, sem burocracia</strong> e sem
            depender de ninguém.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-3 mb-10">
            <Link href="/como-funciona" className="btn-primary shadow-orange text-base">
              Ver como funciona
              <ArrowIcon />
            </Link>
            <a
              href={SITE.address.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary text-base"
            >
              <MapIcon />
              Ver localização
            </a>
            <a
              href={SITE.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="whatsapp-link text-base"
            >
              <WhatsAppIcon />
              WhatsApp
            </a>
          </div>

          {/* Social proof mini */}
          <div className="flex items-center gap-6 pt-6 border-t border-white/10">
            <Stat value="250+" label="clientes atendidos" />
            <div className="w-px h-10 bg-white/10" />
            <Stat value="6h–23h" label="todos os dias" />
            <div className="w-px h-10 bg-white/10" />
            <Stat value="3" label="máquinas SpeedQueen" />
          </div>
        </div>

        {/* Right — Visual card */}
        <div
          className={`transition-all duration-700 delay-200 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="relative">
            {/* Main card */}
            <div className="bg-white/10 backdrop-blur-md rounded-4xl p-8 border border-white/20 shadow-2xl">
              {/* Machine illustration */}
              <div className="flex justify-center mb-6">
                <WashingMachineIllustration />
              </div>

              {/* Quick info */}
              <div className="grid grid-cols-2 gap-3">
                <InfoChip icon="🫧" label="Lavagem" value="R$ 17,00" />
                <InfoChip icon="✨" label="Secagem" value="R$ 16,99" />
                <InfoChip icon="⏱️" label="Ciclo" value="~45 min" />
                <InfoChip icon="🏋️" label="Capacidade" value="10,5 kg" />
              </div>

              {/* Amenities quick row */}
              <div className="mt-5 pt-5 border-t border-white/15 flex flex-wrap gap-2 justify-center">
                {['☕ Bistrô', '👶 Kids', '📶 Wi-Fi', '🅿️ Parking', '❄️ AC'].map((item) => (
                  <span
                    key={item}
                    className="bg-white/10 text-white/90 text-xs font-semibold px-3 py-1.5 rounded-full border border-white/20"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            {/* Floating badge */}
            <div className="absolute -top-4 -right-4 bg-yellow text-primary font-black text-sm px-4 py-2 rounded-full shadow-lg rotate-3 animate-bounce-soft">
              Clube de Vantagens 🏆
            </div>
          </div>
        </div>
      </div>

      {/* Wave bottom */}
      <div className="wave-bottom">
        <svg viewBox="0 0 1440 60" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <path d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z" fill="#ffffff" />
        </svg>
      </div>
    </section>
  )
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <div className="text-white font-black text-xl">{value}</div>
      <div className="text-white/60 text-xs">{label}</div>
    </div>
  )
}

function InfoChip({ icon, label, value }: { icon: string; label: string; value: string }) {
  return (
    <div className="bg-white/10 rounded-2xl p-3 border border-white/15 flex items-center gap-2">
      <span className="text-lg">{icon}</span>
      <div>
        <div className="text-white/60 text-xs">{label}</div>
        <div className="text-white font-bold text-sm">{value}</div>
      </div>
    </div>
  )
}

function WashingMachineIllustration() {
  return (
    <div className="relative w-40 h-40">
      {/* Machine body */}
      <div className="w-40 h-40 bg-white/15 rounded-3xl border-2 border-white/30 flex items-center justify-center relative overflow-hidden">
        {/* Screen top */}
        <div className="absolute top-4 left-4 right-4 h-6 bg-white/10 rounded-xl flex items-center px-2 gap-1">
          <div className="w-2 h-2 rounded-full bg-sky animate-pulse" />
          <div className="w-2 h-2 rounded-full bg-orange/60" />
          <div className="w-2 h-2 rounded-full bg-white/30" />
        </div>
        {/* Door circle */}
        <div className="w-20 h-20 rounded-full border-4 border-white/40 flex items-center justify-center mt-4">
          <div className="w-14 h-14 rounded-full bg-sky/20 border-2 border-sky/40 animate-spin-slow flex items-center justify-center">
            <div className="w-6 h-6 rounded-full bg-white/20" />
          </div>
        </div>
      </div>
    </div>
  )
}

function BubbleMascot({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
      <circle cx="32" cy="32" r="28" fill="#01b3dc" opacity="0.85" />
      <circle cx="32" cy="32" r="24" stroke="white" strokeWidth="1.5" opacity="0.4" />
      <circle cx="22" cy="22" r="6" fill="white" opacity="0.4" />
      <circle cx="42" cy="26" r="3" fill="white" opacity="0.25" />
      <ellipse cx="26" cy="40" rx="5" ry="3" fill="white" opacity="0.2" />
      {/* Eyes */}
      <circle cx="26" cy="30" r="3" fill="white" />
      <circle cx="38" cy="30" r="3" fill="white" />
      <circle cx="27" cy="29" r="1.5" fill="#253163" />
      <circle cx="39" cy="29" r="1.5" fill="#253163" />
      {/* Smile */}
      <path d="M25 37 Q32 43 39 37" stroke="white" strokeWidth="2.5" strokeLinecap="round" fill="none" />
    </svg>
  )
}

function SparkMascot({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      <path d="M20 2 L22 16 L36 18 L22 20 L20 34 L18 20 L4 18 L18 16 Z" fill="#fbc132" />
      <path d="M20 8 L21 14 L27 15 L21 16 L20 22 L19 16 L13 15 L19 14 Z" fill="white" opacity="0.5" />
    </svg>
  )
}

function FoamMascot({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 40" fill="none">
      <circle cx="12" cy="28" r="10" fill="white" opacity="0.5" />
      <circle cx="24" cy="22" r="14" fill="white" opacity="0.6" />
      <circle cx="36" cy="28" r="10" fill="white" opacity="0.5" />
      <circle cx="18" cy="32" r="8" fill="white" opacity="0.4" />
      <circle cx="30" cy="32" r="8" fill="white" opacity="0.4" />
    </svg>
  )
}

function ArrowIcon() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function MapIcon() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
    </svg>
  )
}

function WhatsAppIcon() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
}
