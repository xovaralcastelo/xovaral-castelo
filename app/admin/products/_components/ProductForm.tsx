"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Coins, Info } from "lucide-react";
import { FormField, TextInput, Textarea, Select } from "../../_components/FormField";
import {
  PRODUCT_STATUSES,
  PRODUCT_FULFILLMENT_TYPES,
  type ProductCategoryRow,
  type ProductWithRelations,
} from "@/lib/types";

interface Props {
  product?: ProductWithRelations;
  categories: ProductCategoryRow[];
  pointValueCents: number;
  action: (formData: FormData) => Promise<{ ok: true } | { ok: false; error: string }>;
  submitLabel: string;
}

function centsToInput(cents: number | null | undefined): string {
  if (cents == null) return "";
  return (cents / 100).toFixed(2).replace(".", ",");
}

function parseMoney(value: string): number | null {
  const cleaned = value.replace(/[^\d,.-]/g, "");
  if (!cleaned) return null;
  const normalized = cleaned.includes(",")
    ? cleaned.replace(/\./g, "").replace(",", ".")
    : cleaned;
  const n = Number(normalized);
  return Number.isFinite(n) ? Math.round(n * 100) : null;
}

function Checkbox({
  name,
  label,
  defaultChecked,
  hint,
  onChange,
}: {
  name: string;
  label: string;
  defaultChecked?: boolean;
  hint?: string;
  onChange?: (checked: boolean) => void;
}) {
  return (
    <label className="flex items-start gap-3 rounded-xl border-2 border-xv-gray-200 px-4 py-3 cursor-pointer hover:border-xv-gray-300 transition">
      <input
        type="checkbox"
        name={name}
        defaultChecked={defaultChecked}
        onChange={(e) => onChange?.(e.currentTarget.checked)}
        className="mt-0.5 h-4 w-4 accent-xv-orange"
      />
      <span>
        <span className="block text-sm font-bold text-xv-navy">{label}</span>
        {hint ? (
          <span className="block text-xs text-xv-gray-500 mt-0.5">{hint}</span>
        ) : null}
      </span>
    </label>
  );
}

export function ProductForm({
  product,
  categories,
  pointValueCents,
  action,
  submitLabel,
}: Props) {
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const [priceInput, setPriceInput] = useState(
    centsToInput(product?.money_price_cents),
  );
  const [pointsOverride, setPointsOverride] = useState(
    product?.points_cost != null ? String(product.points_cost) : "",
  );
  const [hasVariants, setHasVariants] = useState(product?.has_variants ?? false);

  const priceCents = parseMoney(priceInput);
  const derivedPoints =
    priceCents != null && pointValueCents > 0
      ? Math.ceil(priceCents / pointValueCents)
      : null;
  const effectivePoints = pointsOverride.trim()
    ? Number(pointsOverride)
    : derivedPoints;
  const overrideDiff =
    pointsOverride.trim() && derivedPoints != null && effectivePoints != null
      ? effectivePoints - derivedPoints
      : 0;

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
    <form onSubmit={onSubmit} className="space-y-8 max-w-3xl">
      {error ? (
        <div
          role="alert"
          className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700 ring-1 ring-red-200"
        >
          {error}
        </div>
      ) : null}

      {/* ---------------- Identificação ---------------- */}
      <section className="space-y-5">
        <h2 className="font-display text-lg font-bold text-xv-navy">Identificação</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField label="Nome do produto">
            <TextInput name="name" defaultValue={product?.name ?? ""} required maxLength={120} />
          </FormField>
          <FormField label="Slug (URL)" hint="Deixe vazio para gerar a partir do nome">
            <TextInput
              name="slug"
              defaultValue={product?.slug ?? ""}
              pattern="[a-z0-9-]+"
              placeholder="camiseta-oficial-xo-varal"
            />
          </FormField>
        </div>

        <FormField label="Subtítulo" hint="Uma linha curta que aparece abaixo do nome">
          <TextInput
            name="subtitle"
            defaultValue={product?.subtitle ?? ""}
            maxLength={140}
            placeholder="100% algodão, estampa exclusiva"
          />
        </FormField>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FormField label="Categoria">
            <Select name="category_id" defaultValue={product?.category_id ?? ""}>
              <option value="">— sem categoria —</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </Select>
          </FormField>
          <FormField label="Marca" hint="Opcional">
            <TextInput name="brand" defaultValue={product?.brand ?? ""} maxLength={60} />
          </FormField>
          <FormField label="SKU" hint="Código interno, único">
            <TextInput name="sku" defaultValue={product?.sku ?? ""} maxLength={40} />
          </FormField>
        </div>

        <FormField label="Selo" hint='Etiqueta no card. Ex: "Novo", "Últimas unidades"'>
          <TextInput name="badge" defaultValue={product?.badge ?? ""} maxLength={24} />
        </FormField>
      </section>

      {/* ---------------- Preço ---------------- */}
      <section className="space-y-5">
        <h2 className="font-display text-lg font-bold text-xv-navy">Preço</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField label="Preço (R$)" hint="É a base de tudo — o preço em pontos vem daqui">
            <TextInput
              name="money_price"
              value={priceInput}
              onChange={(e) => setPriceInput(e.currentTarget.value)}
              inputMode="decimal"
              placeholder="49,90"
              required
            />
          </FormField>
          <FormField label='Preço "de" (R$)' hint="Opcional — mostra o valor riscado">
            <TextInput
              name="compare_at_price"
              defaultValue={centsToInput(product?.compare_at_price_cents)}
              inputMode="decimal"
              placeholder="69,90"
            />
          </FormField>
        </div>

        <div className="rounded-2xl bg-xv-orange-bg/60 px-5 py-4 ring-1 ring-xv-orange/20">
          <div className="flex items-center gap-2 text-xv-orange">
            <Coins size={18} />
            <p className="font-display font-bold">
              {derivedPoints != null
                ? `${derivedPoints.toLocaleString("pt-BR")} pontos`
                : "Informe o preço em reais"}
            </p>
          </div>
          <p className="mt-1 text-xs text-xv-gray-700">
            Cotação vigente: 1 ponto = {(pointValueCents / 100).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}.
            Deixe o campo abaixo vazio para usar esse cálculo automático.
          </p>

          <div className="mt-4 max-w-xs">
            <FormField label="Preço em pontos (manual)" hint="Só preencha para fugir da conta padrão">
              <TextInput
                name="points_cost"
                type="number"
                min="1"
                step="1"
                value={pointsOverride}
                onChange={(e) => setPointsOverride(e.currentTarget.value)}
                placeholder={derivedPoints != null ? String(derivedPoints) : ""}
              />
            </FormField>
          </div>

          {overrideDiff !== 0 ? (
            <p
              className={`mt-2 flex items-start gap-1.5 text-xs ${
                overrideDiff > 0 ? "text-red-700" : "text-green-700"
              }`}
            >
              <Info size={14} className="flex-shrink-0 mt-0.5" />
              {overrideDiff > 0
                ? `Está ${overrideDiff.toLocaleString("pt-BR")} pts acima do equivalente em reais — quem completar o saldo comprando pontos vai pagar mais caro do que o preço de etiqueta.`
                : `Está ${Math.abs(overrideDiff).toLocaleString("pt-BR")} pts abaixo do equivalente — desconto para quem paga com pontos.`}
            </p>
          ) : null}
        </div>
      </section>

      {/* ---------------- Descrição ---------------- */}
      <section className="space-y-5">
        <h2 className="font-display text-lg font-bold text-xv-navy">Descrição</h2>

        <FormField label="Resumo" hint="2 a 3 linhas, aparece logo abaixo do preço">
          <Textarea
            name="short_description"
            defaultValue={product?.short_description ?? ""}
            rows={3}
            maxLength={400}
          />
        </FormField>

        <FormField label="Descrição completa">
          <Textarea name="description" defaultValue={product?.description ?? ""} rows={7} />
        </FormField>

        <FormField label="Destaques" hint="Um por linha — viram a lista com check na página">
          <Textarea
            name="highlights"
            defaultValue={(product?.highlights ?? []).join("\n")}
            rows={4}
            placeholder={"Tecido premium\nEstampa que não desbota\nEdição limitada"}
          />
        </FormField>

        <FormField label="Ficha técnica" hint='Um item por linha no formato "Rótulo: valor"'>
          <Textarea
            name="specs"
            defaultValue={(product?.specs ?? [])
              .map((s) => `${s.label}: ${s.value}`)
              .join("\n")}
            rows={4}
            placeholder={"Material: 100% algodão\nTamanhos: P ao GG\nCor: Azul marinho"}
          />
        </FormField>
      </section>

      {/* ---------------- Estoque e entrega ---------------- */}
      <section className="space-y-5">
        <h2 className="font-display text-lg font-bold text-xv-navy">
          Estoque e entrega
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FormField
            label="Estoque"
            hint={hasVariants ? "Controlado por variação" : "Vazio = ilimitado"}
          >
            <TextInput
              name="stock"
              type="number"
              min="0"
              step="1"
              defaultValue={product?.stock ?? ""}
              disabled={hasVariants}
            />
          </FormField>
          <FormField label="Status">
            <Select name="status" defaultValue={product?.status ?? "draft"}>
              {PRODUCT_STATUSES.map((s) => (
                <option key={s} value={s}>
                  {s === "active" ? "Publicado" : s === "draft" ? "Rascunho" : "Arquivado"}
                </option>
              ))}
            </Select>
          </FormField>
          <FormField label="Ordem" hint="Menor aparece primeiro">
            <TextInput
              name="display_order"
              type="number"
              step="1"
              defaultValue={product?.display_order ?? 0}
            />
          </FormField>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <Checkbox
            name="allow_pickup"
            label="Retirada na loja"
            defaultChecked={product?.allow_pickup ?? true}
          />
          <Checkbox
            name="allow_delivery"
            label="Entrega local"
            defaultChecked={product?.allow_delivery ?? true}
          />
          <Checkbox
            name="featured"
            label="Produto em destaque"
            hint="Aparece na vitrine principal da store"
            defaultChecked={product?.featured ?? false}
          />
          <Checkbox
            name="has_variants"
            label="Tem variações"
            hint="Tamanho, cor… cadastradas na aba Variações"
            defaultChecked={product?.has_variants ?? false}
            onChange={setHasVariants}
          />
        </div>

        {hasVariants ? (
          <FormField
            label="Nome da variação"
            hint='O que o cliente escolhe. Ex: "Tamanho", "Cor", "Sabor"'
          >
            <TextInput
              name="variant_label"
              defaultValue={product?.variant_label ?? ""}
              placeholder="Tamanho"
              maxLength={40}
            />
          </FormField>
        ) : null}

        <FormField label="Tipo de entrega" hint="voucher = código digital; pickup = produto físico">
          <Select
            name="fulfillment_type"
            defaultValue={product?.fulfillment_type ?? "pickup"}
          >
            {PRODUCT_FULFILLMENT_TYPES.map((f) => (
              <option key={f} value={f}>
                {f === "voucher" ? "Voucher digital" : "Produto físico"}
              </option>
            ))}
          </Select>
        </FormField>
      </section>

      <div className="flex items-center gap-3 border-t border-xv-gray-200 mt-8 pt-6">
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
