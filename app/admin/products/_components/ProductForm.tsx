"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FormField, TextInput, Textarea, Select } from "../../_components/FormField";
import {
  PRODUCT_CATEGORIES,
  PRODUCT_FULFILLMENT_TYPES,
  PRODUCT_STATUSES,
  type Product,
} from "@/lib/types";

interface Props {
  product?: Product;
  action: (formData: FormData) => Promise<{ ok: true } | { ok: false; error: string }>;
  submitLabel: string;
}

export function ProductForm({ product, action, submitLabel }: Props) {
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const fd = new FormData(e.currentTarget);
    startTransition(async () => {
      const res = await action(fd);
      if (res && "ok" in res && !res.ok) {
        setError(res.error);
      } else {
        router.refresh();
      }
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
          <TextInput
            name="name"
            defaultValue={product?.name ?? ""}
            required
            maxLength={120}
          />
        </FormField>
        <FormField label="Slug (URL)" hint="ex: voucher-1-ciclo-gratis">
          <TextInput
            name="slug"
            defaultValue={product?.slug ?? ""}
            required
            pattern="[a-z0-9-]+"
          />
        </FormField>
      </div>

      <FormField label="Descrição">
        <Textarea
          name="description"
          defaultValue={product?.description ?? ""}
          rows={4}
        />
      </FormField>

      <FormField label="URL da imagem" hint="Cole o URL externo (Unsplash, CDN do fornecedor, etc.)">
        <TextInput
          name="image_url"
          type="url"
          defaultValue={product?.image_url ?? ""}
          placeholder="https://..."
        />
      </FormField>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <FormField label="Categoria">
          <Select name="category" defaultValue={product?.category ?? "brinde"}>
            {PRODUCT_CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </Select>
        </FormField>
        <FormField label="Status">
          <Select name="status" defaultValue={product?.status ?? "draft"}>
            {PRODUCT_STATUSES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </Select>
        </FormField>
        <FormField
          label="Entrega"
          hint="voucher = código digital; pickup = retirar na loja"
        >
          <Select
            name="fulfillment_type"
            defaultValue={product?.fulfillment_type ?? "pickup"}
          >
            {PRODUCT_FULFILLMENT_TYPES.map((f) => (
              <option key={f} value={f}>
                {f}
              </option>
            ))}
          </Select>
        </FormField>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <FormField
          label="Custo em pontos"
          hint="Vazio = não pode ser trocado por pontos"
        >
          <TextInput
            name="points_cost"
            type="number"
            min="1"
            step="1"
            defaultValue={product?.points_cost ?? ""}
          />
        </FormField>
        <FormField
          label="Preço em centavos"
          hint="ex: 1700 = R$ 17,00. Vazio = não vende por dinheiro"
        >
          <TextInput
            name="money_price_cents"
            type="number"
            min="1"
            step="1"
            defaultValue={product?.money_price_cents ?? ""}
          />
        </FormField>
        <FormField
          label="Estoque"
          hint="Vazio = ilimitado"
        >
          <TextInput
            name="stock"
            type="number"
            min="0"
            step="1"
            defaultValue={product?.stock ?? ""}
          />
        </FormField>
      </div>

      <FormField label="Ordem de exibição" hint="Menor aparece primeiro">
        <TextInput
          name="display_order"
          type="number"
          step="1"
          defaultValue={product?.display_order ?? 0}
        />
      </FormField>

      <div className="flex items-center gap-3 pt-2">
        <button
          type="submit"
          disabled={isPending}
          className="rounded-full bg-xv-navy px-6 py-2.5 text-sm font-bold text-white shadow-md hover:bg-xv-navy-light disabled:opacity-60"
        >
          {isPending ? "Salvando…" : submitLabel}
        </button>
        <Link
          href="/admin/products"
          className="text-sm font-bold text-xv-gray-700 hover:text-xv-navy"
        >
          Cancelar
        </Link>
      </div>
    </form>
  );
}
