import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { whatsappUrl } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Entrar — Clube de Vantagens | Xô Varal Castelo',
  description: 'Acesse sua conta do Clube de Vantagens Xô Varal Castelo. Veja seu nível, descontos e histórico.',
}

export default function EntrarPage() {
  return (
    <div
      className="min-h-screen relative flex flex-col items-center justify-center px-4 py-16"
      style={{ background: 'linear-gradient(135deg, #f0fafe 0%, #fff8f2 50%, #fff3ea 100%)' }}
    >
      {/* Blobs decorativos */}
      <div className="pointer-events-none absolute top-0 left-0 h-80 w-80 rounded-full blur-3xl opacity-20" style={{ background: '#01B3DC' }} />
      <div className="pointer-events-none absolute bottom-0 right-0 h-64 w-64 rounded-full blur-3xl opacity-20" style={{ background: '#EE7531' }} />

      {/* Voltar */}
      <Link
        href="/clube-de-vantagens"
        className="absolute top-8 left-6 flex items-center gap-2 text-sm font-bold text-xv-navy/60 hover:text-xv-navy transition"
      >
        <ArrowLeft size={16} />
        Voltar
      </Link>

      {/* Card de login */}
      <div className="relative z-10 w-full max-w-md rounded-[2rem] bg-white p-10 shadow-card ring-1 ring-xv-gray-200/60">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <Image
            src="/logo-xovaral.png"
            alt="Xô Varal"
            width={120}
            height={40}
            className="h-10 w-auto"
          />
        </div>

        <h1 className="font-display text-2xl font-bold text-xv-navy text-center mb-2">Bem-vindo de volta</h1>
        <p className="text-xv-gray-700 text-center text-sm mb-8">Acesse seu nível, descontos e histórico do clube.</p>

        {/* Form */}
        <form
          action={`https://wa.me/5531993328775?text=${encodeURIComponent('Olá! Quero acessar minha conta do Clube de Vantagens Xô Varal Castelo.')}`}
          method="GET"
          target="_blank"
          className="space-y-4"
        >
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-xv-gray-700 mb-2">Email</label>
            <input
              type="email"
              placeholder="seu@email.com"
              className="w-full rounded-2xl border-2 border-xv-gray-200 px-5 py-3.5 text-sm text-xv-navy outline-none focus:border-xv-orange transition placeholder:text-xv-gray-500/60"
            />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-xv-gray-700 mb-2">Senha</label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full rounded-2xl border-2 border-xv-gray-200 px-5 py-3.5 text-sm text-xv-navy outline-none focus:border-xv-orange transition placeholder:text-xv-gray-500/60"
            />
          </div>
          <button
            type="submit"
            className="w-full rounded-full bg-xv-orange py-4 text-sm font-black text-white shadow-orange transition hover:bg-xv-orange-light mt-2"
          >
            Entrar
          </button>
        </form>

        <p className="text-center text-xs text-xv-gray-500 mt-4">
          <a href={whatsappUrl('clube')} target="_blank" rel="noopener noreferrer" className="font-bold text-xv-orange hover:underline">
            Modo cliente do Clube.
          </a>
        </p>

        <div className="mt-6 border-t border-xv-gray-200/60 pt-6 text-center">
          <p className="text-sm text-xv-gray-700">
            Ainda não tem conta?{' '}
            <a
              href={`https://wa.me/5531993328775?text=${encodeURIComponent('Olá! Quero criar minha conta no Clube de Vantagens Xô Varal Castelo.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-xv-orange hover:underline"
            >
              Criar conta
            </a>
          </p>
        </div>
      </div>

      {/* Info adicional */}
      <p className="relative z-10 mt-8 text-center text-xs text-xv-gray-500 max-w-xs">
        Sua conta dá acesso ao nível do clube, histórico de ciclos e descontos automáticos.
      </p>
    </div>
  )
}
