"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Plus, Trash2, Check, X } from "lucide-react";
import { createVariant, updateVariant, deleteVariant } from "../../_store-actions";
import { formatCents, type ProductVariant } from "@/lib/types";

interface Props {
  productId: string;
  variantLabel: string | null;
  basePriceCents: number | null;
  variants: ProductVariant[];
}

const inputCls =
  "w-full rounded-lg border-2 border-xv-gray-200 px-3 py-2 text-sm text-xv-navy outline-none focus:border-xv-orange transition";

function centsToInput(cents: number | null): string {
  if (cents == null) return "";
  return (cents / 100).toFixed(2).replace(".", ",");
}

export function VariantManager({
  productId,
  variantLabel,
  basePriceCents,
  variants,
}: Props) {
  const [error, setError] = useState<string | null>(null);
  const [editing, setEditing] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const label = variantLabel?.trim() || "Variação";

  function add(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    setError(null);
    startTransition(async () => {
      const res = await createVariant(productId, fd);
      if (!res.ok) setError(res.error);
      else form.reset();
      router.refresh();
    });
  }

  function save(id: string, e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    setError(null);
    startTransition(async () => {
      const res = await updateVariant(id, fd);
      if (!res.ok) setError(res.error);
      else setEditing(null);
      router.refresh();
    });
  }

  function remove(id: string) {
    setError(null);
    startTransition(async () => {
      const res = await deleteVariant(id);
      if (!res.ok) setError(res.error);
      router.refresh();
    });
  }

  return (
    <div className="space-y-5 max-w-3xl">
      {error ? (
        <div
          role="alert"
          className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700 ring-1 ring-red-200"
        >
          {error}
        </div>
      ) : null}

      <div className="rounded-2xl bg-xv-gray-50 px-5 py-4 ring-1 ring-xv-gray-200">
        <p className="text-sm text-xv-gray-700">
          Cada variação tem <strong>estoque próprio</strong>. O preço fica vazio
          quando ela custa o mesmo que o produto
          {basePriceCents != null ? ` (${formatCents(basePriceCents)})` : ""} — só
          preencha para cobrar diferente.
        </p>
      </div>

      {variants.length > 0 ? (
        <div className="space-y-2">
          {variants.map((v) =>
            editing === v.id ? (
              <form
                key={v.id}
                onSubmit={(e) => save(v.id, e)}
                className="grid grid-cols-2 md:grid-cols-5 gap-2 items-end rounded-xl bg-white p-3 ring-2 ring-xv-orange"
              >
                <label className="block">
                  <span className="block text-[10px] font-bold uppercase text-xv-gray-500 mb-1">
                    {label}
                  </span>
                  <input name="label" defaultValue={v.label} required className={inputCls} />
                </label>
                <label className="block">
                  <span className="block text-[10px] font-bold uppercase text-xv-gray-500 mb-1">
                    SKU
                  </span>
                  <input name="sku" defaultValue={v.sku ?? ""} className={inputCls} />
                </label>
                <label className="block">
                  <span className="block text-[10px] font-bold uppercase text-xv-gray-500 mb-1">
                    Preço (R$)
                  </span>
                  <input
                    name="price"
                    defaultValue={centsToInput(v.price_cents)}
                    placeholder="padrão"
                    inputMode="decimal"
                    className={inputCls}
                  />
                </label>
                <label className="block">
                  <span className="block text-[10px] font-bold uppercase text-xv-gray-500 mb-1">
                    Estoque
                  </span>
                  <input
                    name="stock"
                    type="number"
                    min="0"
                    defaultValue={v.stock ?? ""}
                    placeholder="∞"
                    className={inputCls}
                  />
                </label>
                <div className="flex gap-1">
                  <input type="hidden" name="status" value={v.status} />
                  <button
                    type="submit"
                    disabled={isPending}
                    className="rounded-lg bg-xv-navy p-2 text-white disabled:opacity-50"
                    aria-label="Salvar"
                  >
                    <Check size={16} />
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditing(null)}
                    className="rounded-lg bg-xv-gray-200 p-2 text-xv-gray-700"
                    aria-label="Cancelar"
                  >
                    <X size={16} />
                  </button>
                </div>
              </form>
            ) : (
              <div
                key={v.id}
                className="flex items-center gap-3 rounded-xl bg-white px-4 py-3 ring-1 ring-xv-gray-200"
              >
                <span className="font-bold text-xv-navy min-w-[80px]">{v.label}</span>
                <span className="text-xs text-xv-gray-500 flex-1 truncate">
                  {v.sku ?? "sem SKU"}
                </span>
                <span className="text-sm text-xv-navy">
                  {v.price_cents != null ? formatCents(v.price_cents) : "preço padrão"}
                </span>
                <span
                  className={`text-sm font-bold ${
                    v.stock != null && v.stock <= 0 ? "text-red-600" : "text-xv-gray-700"
                  }`}
                >
                  {v.stock == null ? "∞" : `${v.stock} un`}
                </span>
                <button
                  type="button"
                  onClick={() => setEditing(v.id)}
                  className="text-xs font-bold text-xv-orange hover:underline"
                >
                  Editar
                </button>
                <button
                  type="button"
                  onClick={() => remove(v.id)}
                  disabled={isPending}
                  className="rounded-lg p-1.5 text-red-600 hover:bg-red-50 disabled:opacity-40"
                  aria-label="Excluir variação"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ),
          )}
        </div>
      ) : (
        <p className="text-sm text-xv-gray-500">
          Nenhuma variação cadastrada. Sem elas, o produto é vendido como peça
          única.
        </p>
      )}

      <form
        onSubmit={add}
        className="grid grid-cols-2 md:grid-cols-5 gap-2 items-end rounded-2xl bg-white p-4 ring-1 ring-xv-gray-200"
      >
        <label className="block">
          <span className="block text-[10px] font-bold uppercase text-xv-gray-500 mb-1">
            {label}
          </span>
          <input name="label" placeholder="M" required className={inputCls} />
        </label>
        <label className="block">
          <span className="block text-[10px] font-bold uppercase text-xv-gray-500 mb-1">
            SKU
          </span>
          <input name="sku" placeholder="CAM-M" className={inputCls} />
        </label>
        <label className="block">
          <span className="block text-[10px] font-bold uppercase text-xv-gray-500 mb-1">
            Preço (R$)
          </span>
          <input name="price" placeholder="padrão" inputMode="decimal" className={inputCls} />
        </label>
        <label className="block">
          <span className="block text-[10px] font-bold uppercase text-xv-gray-500 mb-1">
            Estoque
          </span>
          <input name="stock" type="number" min="0" placeholder="∞" className={inputCls} />
        </label>
        <button
          type="submit"
          disabled={isPending}
          className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-xv-orange px-4 py-2 text-sm font-bold text-white disabled:opacity-50"
        >
          <Plus size={16} />
          Adicionar
        </button>
      </form>
    </div>
  );
}
