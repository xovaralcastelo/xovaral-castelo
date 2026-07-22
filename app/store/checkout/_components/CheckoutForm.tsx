"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Loader2, MapPin, Sparkles, Store } from "lucide-react";
import type { DeliveryMethod, StoreSettings } from "@/lib/types";
import { formatBRL, formatPoints, splitPayment } from "@/lib/store-pricing";
import { useCart } from "@/app/store/_cart/CartContext";
import { createOrder } from "@/app/store/_actions";

interface Props {
  settings: StoreSettings;
  balance: number;
  defaultName: string;
}

export function CheckoutForm({ settings, balance, defaultName }: Props) {
  const router = useRouter();
  const { items, ready, subtotalCents, clear } = useCart();
  const pv = settings.point_value_cents;

  // Métodos elegíveis: precisam estar ligados na loja E permitidos em todo item.
  const allPickup = items.length > 0 && items.every((i) => i.allowPickup);
  const allDelivery = items.length > 0 && items.every((i) => i.allowDelivery);
  const pickupOk = settings.pickup_enabled && allPickup;
  const deliveryOk = settings.delivery_enabled && allDelivery;

  const [method, setMethod] = useState<DeliveryMethod>(
    pickupOk ? "pickup" : "delivery",
  );
  const [name, setName] = useState(defaultName);
  const [phone, setPhone] = useState("");
  const [addr, setAddr] = useState({
    cep: "",
    street: "",
    number: "",
    complement: "",
    district: "",
    city: "",
    state: "",
    notes: "",
  });
  const [usePoints, setUsePoints] = useState(false);
  const [pointsInput, setPointsInput] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const feeCents = useMemo(() => {
    if (method !== "delivery") return 0;
    if (
      settings.free_delivery_above_cents != null &&
      subtotalCents >= settings.free_delivery_above_cents
    ) {
      return 0;
    }
    return settings.delivery_fee_cents;
  }, [method, settings, subtotalCents]);

  const totalCents = subtotalCents + feeCents;
  const maxPoints = Math.max(
    0,
    Math.min(balance, pv > 0 ? Math.floor(totalCents / pv) : 0),
  );
  const desired = usePoints ? Math.min(Math.max(0, pointsInput), maxPoints) : 0;
  const split = splitPayment(totalCents, desired, settings);
  // splitPayment pode reduzir os pontos para o restante fechar acima do mínimo.
  const pointsAdjusted = usePoints && desired > 0 && split.points < desired;

  const canDeliver = pickupOk || deliveryOk;

  function validate(): string | null {
    if (items.length === 0) return "Seu carrinho está vazio.";
    if (!canDeliver) return "Nenhuma forma de entrega disponível para esses itens.";
    if (!name.trim()) return "Informe seu nome.";
    if (phone.replace(/\D/g, "").length < 10) return "Informe um telefone válido.";
    if (method === "delivery") {
      if (!addr.street.trim() || !addr.number.trim())
        return "Informe rua e número da entrega.";
      if (!addr.district.trim() || !addr.city.trim())
        return "Informe bairro e cidade da entrega.";
    }
    return null;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    const v = validate();
    if (v) {
      setError(v);
      return;
    }

    setSubmitting(true);
    const result = await createOrder({
      items: items.map((i) => ({
        productId: i.productId,
        variantId: i.variantId,
        quantity: i.quantity,
      })),
      pointsToUse: split.points,
      deliveryMethod: method,
      contact: { name: name.trim(), phone: phone.trim() },
      address: method === "delivery" ? addr : {},
    });

    if (!result.ok) {
      setSubmitting(false);
      setError(result.error);
      return;
    }

    clear();
    router.push(`/store/pedido/${result.code}`);
  }

  if (ready && items.length === 0) {
    return (
      <div className="rounded-3xl bg-white p-8 text-center shadow-card ring-1 ring-xv-gray-200/60">
        <h1 className="font-display text-2xl font-black text-xv-navy">
          Seu carrinho está vazio
        </h1>
        <p className="mt-2 text-sm text-xv-gray-700">
          Adicione produtos antes de finalizar.
        </p>
        <Link
          href="/store"
          className="mt-6 inline-flex rounded-full bg-xv-navy px-6 py-3 text-sm font-bold text-white transition hover:brightness-110"
        >
          Ir para a Store
        </Link>
      </div>
    );
  }

  const inputCls =
    "w-full rounded-2xl bg-white px-4 py-3 text-base sm:text-sm font-medium text-xv-navy ring-1 ring-xv-gray-200/60 outline-none transition placeholder:text-xv-gray-400 focus:ring-2 focus:ring-xv-orange";

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h1 className="font-display text-3xl font-black text-xv-navy md:text-4xl">
        Finalizar pedido
      </h1>

      {/* Entrega */}
      <section className="rounded-3xl bg-white p-6 shadow-card ring-1 ring-xv-gray-200/60">
        <h2 className="font-display text-lg font-bold text-xv-navy">
          Como você quer receber?
        </h2>
        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
          <MethodOption
            active={method === "pickup"}
            disabled={!pickupOk}
            onClick={() => setMethod("pickup")}
            icon={<Store size={18} />}
            title="Retirar na loja"
            subtitle={settings.pickup_note ?? "Sem custo de entrega"}
          />
          <MethodOption
            active={method === "delivery"}
            disabled={!deliveryOk}
            onClick={() => setMethod("delivery")}
            icon={<MapPin size={18} />}
            title="Entrega"
            subtitle={
              settings.delivery_fee_cents === 0
                ? "Grátis"
                : `${formatBRL(settings.delivery_fee_cents)}${
                    settings.free_delivery_above_cents != null
                      ? ` · grátis acima de ${formatBRL(settings.free_delivery_above_cents)}`
                      : ""
                  }`
            }
          />
        </div>

        {method === "delivery" ? (
          <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-6">
            <input
              className={`${inputCls} sm:col-span-2`}
              placeholder="CEP"
              inputMode="numeric"
              value={addr.cep}
              onChange={(e) => setAddr({ ...addr, cep: e.target.value })}
            />
            <input
              className={`${inputCls} sm:col-span-4`}
              placeholder="Rua *"
              value={addr.street}
              onChange={(e) => setAddr({ ...addr, street: e.target.value })}
            />
            <input
              className={`${inputCls} sm:col-span-2`}
              placeholder="Número *"
              value={addr.number}
              onChange={(e) => setAddr({ ...addr, number: e.target.value })}
            />
            <input
              className={`${inputCls} sm:col-span-4`}
              placeholder="Complemento"
              value={addr.complement}
              onChange={(e) => setAddr({ ...addr, complement: e.target.value })}
            />
            <input
              className={`${inputCls} sm:col-span-3`}
              placeholder="Bairro *"
              value={addr.district}
              onChange={(e) => setAddr({ ...addr, district: e.target.value })}
            />
            <input
              className={`${inputCls} sm:col-span-2`}
              placeholder="Cidade *"
              value={addr.city}
              onChange={(e) => setAddr({ ...addr, city: e.target.value })}
            />
            <input
              className={`${inputCls} sm:col-span-1`}
              placeholder="UF"
              maxLength={2}
              value={addr.state}
              onChange={(e) =>
                setAddr({ ...addr, state: e.target.value.toUpperCase() })
              }
            />
            <input
              className={`${inputCls} sm:col-span-6`}
              placeholder="Ponto de referência / observações"
              value={addr.notes}
              onChange={(e) => setAddr({ ...addr, notes: e.target.value })}
            />
          </div>
        ) : null}
      </section>

      {/* Contato */}
      <section className="rounded-3xl bg-white p-6 shadow-card ring-1 ring-xv-gray-200/60">
        <h2 className="font-display text-lg font-bold text-xv-navy">
          Seus dados
        </h2>
        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
          <input
            className={inputCls}
            placeholder="Nome completo *"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            className={inputCls}
            placeholder="WhatsApp / telefone *"
            inputMode="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
      </section>

      {/* Pontos */}
      {balance > 0 && maxPoints > 0 ? (
        <section className="rounded-3xl bg-white p-6 shadow-card ring-1 ring-xv-gray-200/60">
          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={usePoints}
              onChange={(e) => {
                setUsePoints(e.target.checked);
                if (e.target.checked && pointsInput === 0)
                  setPointsInput(maxPoints);
              }}
              className="h-5 w-5 rounded accent-xv-orange"
            />
            <span className="inline-flex items-center gap-1.5 font-display font-bold text-xv-navy">
              <Sparkles size={16} className="text-xv-orange" />
              Usar meus pontos
            </span>
            <span className="ml-auto text-xs text-xv-gray-500">
              saldo: {formatPoints(balance)}
            </span>
          </label>

          {usePoints ? (
            <div className="mt-4">
              <input
                type="range"
                min={0}
                max={maxPoints}
                value={Math.min(pointsInput, maxPoints)}
                onChange={(e) => setPointsInput(Number(e.target.value))}
                className="w-full accent-xv-orange"
              />
              <div className="mt-2 flex items-center justify-between text-sm">
                <span className="text-xv-gray-700">
                  {formatPoints(split.points)} pontos ={" "}
                  <strong className="text-xv-navy">
                    −{formatBRL(split.pointsValueCents)}
                  </strong>
                </span>
                <button
                  type="button"
                  onClick={() => setPointsInput(maxPoints)}
                  className="text-xs font-bold text-xv-orange hover:underline"
                >
                  usar máximo
                </button>
              </div>
              {pointsAdjusted ? (
                <p className="mt-2 text-xs text-amber-700">
                  Ajustamos para {formatPoints(split.points)} pontos: o restante
                  em dinheiro precisa ficar acima de{" "}
                  {formatBRL(settings.min_money_cents)}.
                </p>
              ) : null}
            </div>
          ) : null}
        </section>
      ) : null}

      {/* Resumo */}
      <section className="rounded-3xl bg-white p-6 shadow-card ring-1 ring-xv-gray-200/60">
        <h2 className="font-display text-lg font-bold text-xv-navy">Resumo</h2>
        <dl className="mt-4 space-y-2 text-sm">
          <Row label="Subtotal" value={formatBRL(subtotalCents)} />
          <Row
            label="Frete"
            value={feeCents === 0 ? "Grátis" : formatBRL(feeCents)}
          />
          {split.points > 0 ? (
            <Row
              label={`Pontos (${formatPoints(split.points)})`}
              value={`−${formatBRL(split.pointsValueCents)}`}
              accent
            />
          ) : null}
          <div className="flex items-center justify-between border-t border-xv-gray-200/70 pt-3">
            <dt className="font-display text-lg font-bold text-xv-navy">
              Total a pagar
            </dt>
            <dd className="font-display text-2xl font-black text-xv-navy">
              {formatBRL(split.moneyDueCents)}
            </dd>
          </div>
        </dl>

        <p className="mt-3 text-xs text-xv-gray-500">
          {split.moneyDueCents === 0
            ? "Pedido 100% em pontos — sem cobrança em dinheiro."
            : "O pagamento do valor em dinheiro é combinado com a equipe na retirada/entrega. Pagamento on-line em breve."}
        </p>

        {error ? (
          <p
            role="alert"
            className="mt-4 rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-800 ring-1 ring-red-200"
          >
            {error}
          </p>
        ) : null}

        <button
          type="submit"
          disabled={submitting || !ready}
          className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-xv-orange px-6 py-4 text-sm font-bold text-white shadow-md transition hover:bg-xv-orange-light disabled:cursor-not-allowed disabled:opacity-60"
        >
          {submitting ? (
            <>
              <Loader2 size={16} className="animate-spin" />
              Criando pedido…
            </>
          ) : (
            "Confirmar pedido"
          )}
        </button>
      </section>
    </form>
  );
}

function MethodOption({
  active,
  disabled,
  onClick,
  icon,
  title,
  subtitle,
}: {
  active: boolean;
  disabled: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  title: string;
  subtitle: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-pressed={active}
      className={`flex items-start gap-3 rounded-2xl p-4 text-left transition ${
        disabled
          ? "cursor-not-allowed bg-xv-gray-100 text-xv-gray-400"
          : active
            ? "bg-xv-navy text-white shadow-md"
            : "bg-white text-xv-navy ring-1 ring-xv-gray-200/60 hover:ring-xv-orange"
      }`}
    >
      <span className={active && !disabled ? "text-white" : "text-xv-orange"}>
        {icon}
      </span>
      <span>
        <span className="block font-bold">{title}</span>
        <span
          className={`block text-xs ${
            active && !disabled ? "text-white/80" : "text-xv-gray-500"
          }`}
        >
          {disabled ? "Indisponível para estes itens" : subtitle}
        </span>
      </span>
    </button>
  );
}

function Row({
  label,
  value,
  accent,
}: {
  label: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <div className="flex items-center justify-between">
      <dt className="text-xv-gray-700">{label}</dt>
      <dd className={accent ? "font-bold text-xv-orange" : "text-xv-navy"}>
        {value}
      </dd>
    </div>
  );
}
