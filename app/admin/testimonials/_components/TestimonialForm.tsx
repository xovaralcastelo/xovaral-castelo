"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FormField, TextInput, Textarea, Select } from "../../_components/FormField";
import { TESTIMONIAL_STATUSES, type Testimonial } from "@/lib/types";

interface Props {
  testimonial?: Testimonial;
  action: (formData: FormData) => Promise<{ ok: true } | { ok: false; error: string }>;
  submitLabel: string;
}

export function TestimonialForm({ testimonial, action, submitLabel }: Props) {
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
        <FormField label="Nome">
          <TextInput name="name" defaultValue={testimonial?.name ?? ""} required maxLength={80} />
        </FormField>
        <FormField label="Cargo / descrição" hint="Ex: Médica — Hospital Mater Dei">
          <TextInput name="role" defaultValue={testimonial?.role ?? ""} required maxLength={120} />
        </FormField>
      </div>

      <FormField label="Depoimento">
        <Textarea name="text" defaultValue={testimonial?.text ?? ""} rows={4} required />
      </FormField>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <FormField label="Inicial do avatar" hint="1–2 letras. Vazio = inicial do nome">
          <TextInput name="avatar_initial" defaultValue={testimonial?.avatar_initial ?? ""} maxLength={2} />
        </FormField>
        <FormField label="Estrelas">
          <Select name="stars" defaultValue={String(testimonial?.stars ?? 5)}>
            {[5, 4, 3, 2, 1].map((s) => (
              <option key={s} value={s}>{s} ★</option>
            ))}
          </Select>
        </FormField>
        <FormField label="Status">
          <Select name="status" defaultValue={testimonial?.status ?? "active"}>
            {TESTIMONIAL_STATUSES.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </Select>
        </FormField>
      </div>

      <FormField label="Ordem de exibição" hint="Menor aparece primeiro">
        <TextInput name="display_order" type="number" step="1" defaultValue={testimonial?.display_order ?? 0} />
      </FormField>

      <div className="flex items-center gap-3 pt-2">
        <button
          type="submit"
          disabled={isPending}
          className="rounded-full bg-xv-navy px-6 py-2.5 text-sm font-bold text-white shadow-md hover:bg-xv-navy-light disabled:opacity-60"
        >
          {isPending ? "Salvando…" : submitLabel}
        </button>
        <Link href="/admin/testimonials" className="text-sm font-bold text-xv-gray-700 hover:text-xv-navy">
          Cancelar
        </Link>
      </div>
    </form>
  );
}
