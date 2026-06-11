"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FormField, TextInput, Textarea, Select } from "../../../_components/FormField";
import { PARTNER_PROMO_STATUSES, type PartnerPromo } from "@/lib/types";

interface Props {
  promo?: PartnerPromo;
  action: (formData: FormData) => Promise<{ ok: true } | { ok: false; error: string }>;
  submitLabel: string;
}

export function PromoForm({ promo, action, submitLabel }: Props) {
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const fd = new FormData(e.currentTarget);
    startTransition(async () => {
      const res = await action(fd);
      if (res && "ok" in res && !res.ok) setError(res.error);
      else router.refresh();
    });
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5 max-w-2xl">
      {error ? (
        <div role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700 ring-1 ring-red-200">
          {error}
        </div>
      ) : null}

      <FormField label="Título da promoção" hint="Aparece no banner e na página da promoção">
        <TextInput name="title" defaultValue={promo?.title ?? ""} required maxLength={160} />
      </FormField>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField label="Parceiro">
          <TextInput name="partner_name" defaultValue={promo?.partner_name ?? ""} required maxLength={120} />
        </FormField>
        <FormField label="Slug (URL)" hint="ex: algaroba-dia-de-jogo">
          <TextInput name="slug" defaultValue={promo?.slug ?? ""} required pattern="[a-z0-9-]+" />
        </FormField>
      </div>

      <FormField
        label="Imagem do banner (URL)"
        hint="Envie a arte para /public/images/promos e use o caminho, ou cole uma URL completa"
      >
        <TextInput
          name="banner_url"
          defaultValue={promo?.banner_url ?? ""}
          required
          placeholder="/images/promos/... ou https://..."
        />
      </FormField>

      <FormField label="Resumo curto" hint="Uma frase — usada em compartilhamentos e buscas">
        <TextInput name="summary" defaultValue={promo?.summary ?? ""} maxLength={200} />
      </FormField>

      <FormField
        label="Detalhes da promoção"
        hint="Texto completo exibido na página. Separe parágrafos com linha em branco."
      >
        <Textarea name="details" defaultValue={promo?.details ?? ""} rows={6} />
      </FormField>

      <FormField label="Regras / condições" hint="Exibidas em destaque na caixa de regras">
        <Textarea name="conditions" defaultValue={promo?.conditions ?? ""} rows={3} />
      </FormField>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField label="Texto do botão (opcional)" hint='Padrão: "Quero aproveitar"'>
          <TextInput name="cta_label" defaultValue={promo?.cta_label ?? ""} maxLength={60} />
        </FormField>
        <FormField label="Link do botão (opcional)" hint="Padrão: WhatsApp da Xô Varal">
          <TextInput name="cta_url" defaultValue={promo?.cta_url ?? ""} placeholder="https://wa.me/55..." />
        </FormField>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField label="Status" hint="Só active aparece no site">
          <Select name="status" defaultValue={promo?.status ?? "draft"}>
            {PARTNER_PROMO_STATUSES.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </Select>
        </FormField>
        <FormField label="Ordem de exibição" hint="Menor aparece primeiro">
          <TextInput name="display_order" type="number" step="1" defaultValue={promo?.display_order ?? 0} />
        </FormField>
      </div>

      <div className="flex items-center gap-3 pt-2">
        <button
          type="submit"
          disabled={isPending}
          className="rounded-full bg-xv-navy px-6 py-2.5 text-sm font-bold text-white shadow-md hover:bg-xv-navy-light disabled:opacity-60"
        >
          {isPending ? "Salvando…" : submitLabel}
        </button>
        <Link href="/admin/partners/promos" className="text-sm font-bold text-xv-gray-700 hover:text-xv-navy">
          Cancelar
        </Link>
      </div>
    </form>
  );
}
