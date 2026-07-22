"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Check, RefreshCw, AlertTriangle } from "lucide-react";
import { FormField, TextInput, Textarea } from "../../_components/FormField";
import { saveStoreSettings, repriceAllProducts } from "../../_store-actions";
import type { StoreSettings } from "@/lib/types";

interface Props {
  settings: StoreSettings;
  productCount: number;
}

function centsToInput(cents: number | null): string {
  if (cents == null) return "";
  return (cents / 100).toFixed(2).replace(".", ",");
}

export function StoreSettingsForm({ settings, productCount }: Props) {
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);
  const [repriced, setRepriced] = useState<number | null>(null);
  const [pointValue, setPointValue] = useState(String(settings.point_value_cents));
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const pointValueChanged = Number(pointValue) !== settings.point_value_cents;

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setSaved(false);
    const fd = new FormData(e.currentTarget);
    startTransition(async () => {
      const res = await saveStoreSettings(fd);
      if (!res.ok) setError(res.error);
      else setSaved(true);
      router.refresh();
    });
  }

  function reprice() {
    if (
      !window.confirm(
        `Recalcular o preço em pontos de ${productCount} produto(s) pela cotação atual? Os preços em pontos definidos manualmente serão sobrescritos.`,
      )
    )
      return;
    setError(null);
    startTransition(async () => {
      const res = await repriceAllProducts();
      if (!res.ok) setError(res.error);
      else setRepriced(res.updated);
      router.refresh();
    });
  }

  return (
    <div className="space-y-6 max-w-2xl">
      {error ? (
        <div
          role="alert"
          className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700 ring-1 ring-red-200"
        >
          {error}
        </div>
      ) : null}

      {saved ? (
        <div className="flex items-center gap-2 rounded-xl bg-green-50 px-4 py-3 text-sm text-green-800 ring-1 ring-green-200">
          <Check size={16} />
          Configurações salvas.
        </div>
      ) : null}

      <form onSubmit={onSubmit} className="space-y-8">
        {/* Cotação do ponto */}
        <section className="space-y-4">
          <div>
            <h2 className="font-display text-lg font-bold text-xv-navy">
              Valor do ponto
            </h2>
            <p className="text-sm text-xv-gray-700 mt-1">
              Define quanto vale cada ponto no checkout — é com essa conta que o
              cliente completa o saldo pagando em reais.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField label="Centavos por ponto" hint="5 = R$ 0,05 por ponto">
              <TextInput
                name="point_value_cents"
                type="number"
                min="1"
                step="1"
                value={pointValue}
                onChange={(e) => setPointValue(e.currentTarget.value)}
                required
              />
            </FormField>
            <div className="rounded-2xl bg-xv-orange-bg/60 px-5 py-4 ring-1 ring-xv-orange/20">
              <p className="text-xs font-bold uppercase tracking-wider text-xv-gray-500">
                Na prática
              </p>
              <p className="mt-1 text-sm text-xv-navy">
                1.000 pontos ={" "}
                <strong>
                  {((Number(pointValue) || 0) * 10).toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </strong>
              </p>
              <p className="mt-1 text-xs text-xv-gray-700">
                Um produto de R$ 50,00 custa{" "}
                {Number(pointValue) > 0
                  ? Math.ceil(5000 / Number(pointValue)).toLocaleString("pt-BR")
                  : "—"}{" "}
                pontos.
              </p>
            </div>
          </div>

          {pointValueChanged ? (
            <p className="flex items-start gap-1.5 text-xs text-amber-700">
              <AlertTriangle size={14} className="flex-shrink-0 mt-0.5" />
              Mudar a cotação não reprecifica o catálogo sozinho. Salve e use o
              botão “Recalcular preços em pontos” abaixo, senão os produtos ficam
              com o preço em pontos da cotação antiga.
            </p>
          ) : null}

          <FormField
            label="Valor mínimo cobrável (R$)"
            hint="Se o restante em dinheiro ficar abaixo disso, o checkout reduz os pontos usados. O Mercado Pago recusa valores muito baixos."
          >
            <TextInput
              name="min_money"
              defaultValue={centsToInput(settings.min_money_cents)}
              inputMode="decimal"
              placeholder="1,00"
            />
          </FormField>
        </section>

        {/* Entrega */}
        <section className="space-y-4">
          <h2 className="font-display text-lg font-bold text-xv-navy">
            Retirada e entrega
          </h2>

          <label className="flex items-start gap-3 rounded-xl border-2 border-xv-gray-200 px-4 py-3 cursor-pointer">
            <input
              type="checkbox"
              name="pickup_enabled"
              defaultChecked={settings.pickup_enabled}
              className="mt-0.5 h-4 w-4 accent-xv-orange"
            />
            <span>
              <span className="block text-sm font-bold text-xv-navy">
                Permitir retirada na loja
              </span>
              <span className="block text-xs text-xv-gray-500 mt-0.5">
                Cliente busca na unidade Castelo
              </span>
            </span>
          </label>

          <FormField label="Aviso da retirada" hint="Ex: horário em que o pedido fica disponível">
            <Textarea
              name="pickup_note"
              defaultValue={settings.pickup_note ?? ""}
              rows={2}
              placeholder="Retire de segunda a sábado, das 7h às 22h."
            />
          </FormField>

          <label className="flex items-start gap-3 rounded-xl border-2 border-xv-gray-200 px-4 py-3 cursor-pointer">
            <input
              type="checkbox"
              name="delivery_enabled"
              defaultChecked={settings.delivery_enabled}
              className="mt-0.5 h-4 w-4 accent-xv-orange"
            />
            <span>
              <span className="block text-sm font-bold text-xv-navy">
                Permitir entrega local
              </span>
              <span className="block text-xs text-xv-gray-500 mt-0.5">
                Entrega por motoboy na região da unidade
              </span>
            </span>
          </label>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField label="Taxa de entrega (R$)">
              <TextInput
                name="delivery_fee"
                defaultValue={centsToInput(settings.delivery_fee_cents)}
                inputMode="decimal"
                placeholder="10,00"
              />
            </FormField>
            <FormField
              label="Frete grátis acima de (R$)"
              hint="Vazio = sem frete grátis"
            >
              <TextInput
                name="free_delivery_above"
                defaultValue={centsToInput(settings.free_delivery_above_cents)}
                inputMode="decimal"
                placeholder="150,00"
              />
            </FormField>
          </div>

          <FormField label="Aviso da entrega" hint="Ex: bairros atendidos e prazo">
            <Textarea
              name="delivery_note"
              defaultValue={settings.delivery_note ?? ""}
              rows={2}
              placeholder="Entregamos no Castelo e bairros vizinhos em até 2 dias úteis."
            />
          </FormField>
        </section>

        <div className="flex items-center gap-3 border-t border-xv-gray-200 pt-6">
          <button
            type="submit"
            disabled={isPending}
            className="rounded-full bg-xv-navy px-6 py-2.5 text-sm font-bold text-white shadow-md hover:bg-xv-navy-light disabled:opacity-60"
          >
            {isPending ? "Salvando…" : "Salvar configurações"}
          </button>
        </div>
      </form>

      {/* Reprecificação em massa */}
      <section className="rounded-2xl bg-xv-gray-50 px-5 py-4 ring-1 ring-xv-gray-200">
        <h3 className="font-display font-bold text-xv-navy">
          Recalcular preços em pontos
        </h3>
        <p className="mt-1 text-sm text-xv-gray-700">
          Aplica a cotação vigente em todos os {productCount} produtos com preço
          em reais. Use depois de mudar o valor do ponto.
        </p>
        {repriced != null ? (
          <p className="mt-2 flex items-center gap-1.5 text-sm font-bold text-green-700">
            <Check size={16} />
            {repriced} produto(s) reprecificado(s).
          </p>
        ) : null}
        <button
          type="button"
          onClick={reprice}
          disabled={isPending}
          className="mt-3 inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-bold text-xv-navy ring-1 ring-xv-gray-300 hover:ring-xv-orange disabled:opacity-60"
        >
          <RefreshCw size={16} />
          Recalcular agora
        </button>
      </section>
    </div>
  );
}
