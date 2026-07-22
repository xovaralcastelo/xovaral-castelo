"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FormField, TextInput, Textarea, Select } from "../../_components/FormField";
import {
  PRODUCT_CATEGORY_STATUSES,
  type ProductCategoryRow,
} from "@/lib/types";

interface Props {
  category?: ProductCategoryRow;
  action: (formData: FormData) => Promise<{ ok: true } | { ok: false; error: string }>;
  submitLabel: string;
}

export function CategoryForm({ category, action, submitLabel }: Props) {
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
        <div
          role="alert"
          className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700 ring-1 ring-red-200"
        >
          {error}
        </div>
      ) : null}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField label="Nome">
          <TextInput
            name="name"
            defaultValue={category?.name ?? ""}
            required
            maxLength={60}
            placeholder="Vestuário"
          />
        </FormField>
        <FormField label="Slug (URL)" hint="Vazio = gerado a partir do nome">
          <TextInput
            name="slug"
            defaultValue={category?.slug ?? ""}
            pattern="[a-z0-9-]+"
            placeholder="vestuario"
          />
        </FormField>
      </div>

      <FormField label="Descrição" hint="Aparece no topo da página da categoria">
        <Textarea name="description" defaultValue={category?.description ?? ""} rows={3} />
      </FormField>

      <FormField label="URL da imagem" hint="Opcional — banner da categoria na vitrine">
        <TextInput
          name="image_url"
          type="url"
          defaultValue={category?.image_url ?? ""}
          placeholder="https://..."
        />
      </FormField>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField label="Status">
          <Select name="status" defaultValue={category?.status ?? "active"}>
            {PRODUCT_CATEGORY_STATUSES.map((s) => (
              <option key={s} value={s}>
                {s === "active" ? "Publicada" : s === "draft" ? "Rascunho" : "Arquivada"}
              </option>
            ))}
          </Select>
        </FormField>
        <FormField label="Ordem" hint="Menor aparece primeiro">
          <TextInput
            name="display_order"
            type="number"
            step="1"
            defaultValue={category?.display_order ?? 0}
          />
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
        <Link
          href="/admin/categories"
          className="text-sm font-bold text-xv-gray-700 hover:text-xv-navy"
        >
          Cancelar
        </Link>
      </div>
    </form>
  );
}
