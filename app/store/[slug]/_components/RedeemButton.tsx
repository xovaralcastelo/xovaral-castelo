"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { Gift, Check, AlertCircle } from "lucide-react";
import { redeemProduct, type RedeemResult } from "../../_actions";

interface Props {
  productId: string;
  productSlug: string;
  pointsCost: number;
  fulfillmentType: "voucher" | "pickup";
  userBalance: number | null;
  isLoggedIn: boolean;
  productName: string;
}

export function RedeemButton({
  productId,
  productSlug,
  pointsCost,
  fulfillmentType,
  userBalance,
  isLoggedIn,
  productName,
}: Props) {
  const [result, setResult] = useState<RedeemResult | null>(null);
  const [confirming, setConfirming] = useState(false);
  const [isPending, startTransition] = useTransition();

  if (!isLoggedIn) {
    return (
      <Link
        href={`/clube-de-vantagens/entrar?next=/store/${productSlug}`}
        className="inline-flex items-center justify-center gap-2 rounded-full bg-xv-orange px-6 py-3 text-sm font-bold text-white shadow-md hover:bg-xv-orange-light transition"
      >
        <Gift size={16} />
        Entrar para trocar por {pointsCost} pts
      </Link>
    );
  }

  if (result?.ok) {
    return (
      <div className="rounded-2xl bg-green-50 px-5 py-4 ring-1 ring-green-200">
        <div className="flex items-center gap-2 text-green-800">
          <Check size={20} />
          <p className="font-display font-bold">Resgate concluído!</p>
        </div>
        {result.voucherCode ? (
          <div className="mt-3">
            <p className="text-xs font-bold uppercase tracking-wider text-green-700">
              Seu código
            </p>
            <p className="mt-1 font-mono text-2xl font-black text-xv-navy bg-white rounded-lg px-4 py-2 inline-block">
              {result.voucherCode}
            </p>
            <p className="mt-2 text-xs text-green-700">
              Apresente esse código no totem da loja na sua próxima visita.
            </p>
          </div>
        ) : (
          <p className="mt-2 text-sm text-green-700">
            Passe na loja para retirar seu {productName.toLowerCase()}. Marcamos
            esse resgate como pendente — a equipe Xô Varal vai te atender.
          </p>
        )}
        <Link
          href="/minha-conta/resgates"
          className="mt-3 inline-block text-xs font-bold text-green-800 underline"
        >
          Ver todos os meus resgates →
        </Link>
      </div>
    );
  }

  if (result && !result.ok) {
    return (
      <div className="space-y-3">
        <div
          role="alert"
          className="rounded-2xl bg-red-50 px-5 py-4 ring-1 ring-red-200 flex items-start gap-2 text-red-700"
        >
          <AlertCircle size={20} className="flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-bold">Não foi possível</p>
            <p className="text-sm mt-0.5">{result.error}</p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => setResult(null)}
          className="text-sm font-bold text-xv-gray-700 hover:text-xv-navy"
        >
          Tentar de novo
        </button>
      </div>
    );
  }

  const insufficient = userBalance != null && userBalance < pointsCost;

  function handleClick() {
    if (insufficient) return;
    if (!confirming) {
      setConfirming(true);
      return;
    }
    startTransition(async () => {
      const res = await redeemProduct(productId, productSlug, fulfillmentType);
      setResult(res);
      setConfirming(false);
    });
  }

  return (
    <div className="space-y-2">
      <button
        type="button"
        onClick={handleClick}
        disabled={isPending || insufficient}
        className="inline-flex items-center justify-center gap-2 rounded-full bg-xv-orange px-6 py-3 text-sm font-bold text-white shadow-md hover:bg-xv-orange-light disabled:opacity-60 disabled:cursor-not-allowed transition"
      >
        <Gift size={16} />
        {isPending
          ? "Resgatando…"
          : confirming
          ? `Confirmar resgate de ${pointsCost} pts`
          : insufficient
          ? `Faltam ${pointsCost - (userBalance ?? 0)} pts`
          : `Trocar por ${pointsCost} pts`}
      </button>
      {confirming ? (
        <button
          type="button"
          onClick={() => setConfirming(false)}
          className="text-xs font-bold text-xv-gray-700 hover:text-xv-navy"
        >
          Cancelar
        </button>
      ) : null}
      {userBalance != null ? (
        <p className="text-xs text-xv-gray-500">
          Seu saldo: <strong>{userBalance.toLocaleString("pt-BR")}</strong> pts
        </p>
      ) : null}
    </div>
  );
}
