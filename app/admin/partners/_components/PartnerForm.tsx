"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FormField, TextInput, Textarea, Select } from "../../_components/FormField";
import { PARTNER_CATEGORIES, PARTNER_STATUSES, type Partner } from "@/lib/types";

const CATEGORY_LABELS: Record<string, string> = {
  academia: "Academia",
  restaurante: "Restaurante",
  condominio: "Condomínio",
  faculdade: "Faculdade",
  salao: "Salão / Beleza",
  servico: "Serviço",
  comercio: "Comércio",
  outro: "Outro",
};

interface Props {
  partner?: Partner;
  action: (formData: FormData) => Promise<{ ok: true } | { ok: false; error: string }>;
  submitLabel: string;
}

export function PartnerForm({ partner, action, submitLabel }: Props) {
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField label="Nome do negócio">
          <TextInput name="name" defaultValue={partner?.name ?? ""} required maxLength={120} />
        </FormField>
        <FormField label="Slug (URL)" hint="ex: academia-corpo-em-forma">
          <TextInput name="slug" defaultValue={partner?.slug ?? ""} required pattern="[a-z0-9-]+" />
        </FormField>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField label="Categoria">
          <Select name="category" defaultValue={partner?.category ?? "comercio"}>
            {PARTNER_CATEGORIES.map((c) => (
              <option key={c} value={c}>{CATEGORY_LABELS[c] ?? c}</option>
            ))}
          </Select>
        </FormField>
        <FormField label="Status">
          <Select name="status" defaultValue={partner?.status ?? "draft"}>
            {PARTNER_STATUSES.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </Select>
        </FormField>
      </div>

      <FormField label="Descrição">
        <Textarea name="description" defaultValue={partner?.description ?? ""} rows={3} />
      </FormField>

      <FormField label="Benefício oferecido" hint="Ex: 10% de desconto para clientes da Xô Varal">
        <TextInput name="benefit_text" defaultValue={partner?.benefit_text ?? ""} maxLength={160} />
      </FormField>

      <FormField label="Logo (URL)" hint="Caminho em /images ou URL completa">
        <TextInput name="logo_url" defaultValue={partner?.logo_url ?? ""} placeholder="/images/... ou https://..." />
      </FormField>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField label="Site (URL)">
          <TextInput name="website_url" type="url" defaultValue={partner?.website_url ?? ""} placeholder="https://..." />
        </FormField>
        <FormField label="WhatsApp" hint="Só números, com DDD">
          <TextInput name="whatsapp" defaultValue={partner?.whatsapp ?? ""} placeholder="31999998888" />
        </FormField>
      </div>

      <FormField label="Ordem de exibição" hint="Menor aparece primeiro">
        <TextInput name="display_order" type="number" step="1" defaultValue={partner?.display_order ?? 0} />
      </FormField>

      <div className="flex items-center gap-3 pt-2">
        <button
          type="submit"
          disabled={isPending}
          className="rounded-full bg-xv-navy px-6 py-2.5 text-sm font-bold text-white shadow-md hover:bg-xv-navy-light disabled:opacity-60"
        >
          {isPending ? "Salvando…" : submitLabel}
        </button>
        <Link href="/admin/partners" className="text-sm font-bold text-xv-gray-700 hover:text-xv-navy">
          Cancelar
        </Link>
      </div>
    </form>
  );
}
