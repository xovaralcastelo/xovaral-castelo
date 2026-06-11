"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { CheckCircle2, Send } from "lucide-react";
import {
  PARTNER_CATEGORIES,
  PARTNER_CATEGORY_LABELS,
} from "@/lib/types";
import { submitPartnerApplication } from "../_actions";

const inputCls =
  "w-full rounded-xl border-2 border-xv-gray-200 px-4 py-3 text-base text-xv-navy outline-none focus:border-xv-orange transition bg-white";

function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="block text-xs font-bold uppercase tracking-wider text-xv-gray-700 mb-1.5">
        {label}
      </span>
      {children}
      {hint ? (
        <span className="block mt-1 text-xs text-xv-gray-500">{hint}</span>
      ) : null}
    </label>
  );
}

export function ApplicationForm() {
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);
  const [isPending, startTransition] = useTransition();

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const fd = new FormData(e.currentTarget);
    startTransition(async () => {
      const res = await submitPartnerApplication(fd);
      if (res.ok) setSent(true);
      else setError(res.error);
    });
  }

  if (sent) {
    return (
      <div className="text-center py-10">
        <CheckCircle2 size={56} className="mx-auto text-green-500 mb-4" />
        <h2 className="font-display text-2xl font-bold text-xv-navy mb-2">
          Solicitação enviada!
        </h2>
        <p className="text-xv-gray-700 text-sm max-w-sm mx-auto mb-8">
          Recebemos os dados do seu negócio. Nossa equipe vai analisar e entra
          em contato pelo WhatsApp em até 24h úteis para alinhar a parceria.
        </p>
        <Link
          href="/parceiros"
          className="inline-flex items-center gap-2 rounded-full bg-xv-navy px-6 py-3 text-sm font-bold text-white hover:bg-xv-navy-light"
        >
          Voltar para Parceiros
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      {error ? (
        <div
          role="alert"
          className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700 ring-1 ring-red-200"
        >
          {error}
        </div>
      ) : null}

      {/* Honeypot anti-spam — invisível para humanos */}
      <input
        type="text"
        name="company_site"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
      />

      <Field label="Nome do negócio">
        <input name="business_name" required maxLength={120} className={inputCls} placeholder="Ex: Academia Corpo em Forma" />
      </Field>

      <Field label="Tipo de negócio">
        <select name="category" defaultValue="comercio" className={inputCls}>
          {PARTNER_CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {PARTNER_CATEGORY_LABELS[c]}
            </option>
          ))}
        </select>
      </Field>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Seu nome">
          <input name="contact_name" required maxLength={120} className={inputCls} placeholder="Quem cuida da parceria" />
        </Field>
        <Field label="WhatsApp" hint="Com DDD — vamos te chamar por aqui">
          <input name="whatsapp" required inputMode="tel" className={inputCls} placeholder="31 99999-8888" />
        </Field>
      </div>

      <Field label="E-mail">
        <input name="email" type="email" required className={inputCls} placeholder="contato@seunegocio.com" />
      </Field>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Instagram (opcional)">
          <input name="instagram" maxLength={60} className={inputCls} placeholder="@seunegocio" />
        </Field>
        <Field label="Site (opcional)">
          <input name="website_url" type="url" className={inputCls} placeholder="https://..." />
        </Field>
      </div>

      <Field
        label="Conte sobre a parceria (opcional)"
        hint="Que benefício você imagina oferecer aos clientes Xô Varal? E o que espera em troca?"
      >
        <textarea
          name="message"
          rows={4}
          maxLength={1000}
          className={`${inputCls} resize-y`}
          placeholder="Ex: 10% de desconto para clientes do clube..."
        />
      </Field>

      <button
        type="submit"
        disabled={isPending}
        className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-xv-orange px-7 py-4 text-base font-bold text-white shadow-lg transition hover:bg-xv-orange-light disabled:opacity-60"
      >
        <Send size={18} />
        {isPending ? "Enviando…" : "Enviar solicitação de parceria"}
      </button>

      <p className="text-center text-xs text-xv-gray-500">
        Seus dados são usados apenas para avaliarmos a parceria — nada de spam.
      </p>
    </form>
  );
}
