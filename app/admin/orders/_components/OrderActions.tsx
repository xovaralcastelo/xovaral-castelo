"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Ban } from "lucide-react";
import { setOrderStatus, cancelOrder, saveOrderNote } from "../../_store-actions";
import { ORDER_STATUS_LABELS, type OrderStatus } from "@/lib/types";

interface Props {
  orderId: string;
  status: OrderStatus;
  deliveryMethod: "pickup" | "delivery";
  adminNote: string | null;
  pointsUsed: number;
}

/** Próximo passo natural de cada estágio — o botão grande da tela. */
function nextStep(
  status: OrderStatus,
  deliveryMethod: "pickup" | "delivery",
): { to: OrderStatus; label: string } | null {
  switch (status) {
    case "paid":
      return { to: "preparing", label: "Iniciar separação" };
    case "preparing":
      return {
        to: "ready",
        label: deliveryMethod === "delivery" ? "Pronto para envio" : "Pronto para retirada",
      };
    case "ready":
      return {
        to: "delivered",
        label: deliveryMethod === "delivery" ? "Marcar como entregue" : "Marcar como retirado",
      };
    default:
      return null;
  }
}

export function OrderActions({
  orderId,
  status,
  deliveryMethod,
  adminNote,
  pointsUsed,
}: Props) {
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const step = nextStep(status, deliveryMethod);
  const canCancel = status !== "delivered" && status !== "cancelled";

  function advance(to: OrderStatus) {
    setError(null);
    startTransition(async () => {
      const res = await setOrderStatus(orderId, to);
      if (!res.ok) setError(res.error);
      router.refresh();
    });
  }

  function cancel() {
    const reason = window.prompt(
      pointsUsed > 0
        ? `Cancelar este pedido? Os ${pointsUsed.toLocaleString("pt-BR")} pontos usados voltam para o cliente e o estoque é devolvido.\n\nMotivo:`
        : "Cancelar este pedido? O estoque volta para o catálogo.\n\nMotivo:",
      "",
    );
    if (reason === null) return;
    setError(null);
    startTransition(async () => {
      const res = await cancelOrder(orderId, reason || "Cancelado pelo painel");
      if (!res.ok) setError(res.error);
      router.refresh();
    });
  }

  function saveNote(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    setError(null);
    startTransition(async () => {
      const res = await saveOrderNote(orderId, fd);
      if (!res.ok) setError(res.error);
      router.refresh();
    });
  }

  return (
    <div className="space-y-4">
      {error ? (
        <div
          role="alert"
          className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700 ring-1 ring-red-200"
        >
          {error}
        </div>
      ) : null}

      <div className="flex flex-col sm:flex-row gap-2">
        {step ? (
          <button
            type="button"
            onClick={() => advance(step.to)}
            disabled={isPending}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-xv-navy px-6 py-3 text-sm font-bold text-white shadow-md hover:bg-xv-navy-light disabled:opacity-60"
          >
            {isPending ? "Atualizando…" : step.label}
            <ArrowRight size={16} />
          </button>
        ) : null}

        {canCancel ? (
          <button
            type="button"
            onClick={cancel}
            disabled={isPending}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-red-50 px-5 py-3 text-sm font-bold text-red-700 hover:bg-red-100 disabled:opacity-60"
          >
            <Ban size={16} />
            Cancelar pedido
          </button>
        ) : null}
      </div>

      {status === "pending_payment" ? (
        <p className="text-xs text-xv-gray-500">
          O pedido avança sozinho para “{ORDER_STATUS_LABELS.paid}” quando o
          Mercado Pago confirmar o pagamento.
        </p>
      ) : null}

      <form onSubmit={saveNote} className="space-y-2">
        <label className="block text-xs font-bold uppercase tracking-wider text-xv-gray-700">
          Observação interna
        </label>
        <textarea
          name="admin_note"
          defaultValue={adminNote ?? ""}
          rows={2}
          placeholder="Visível só para a equipe"
          className="w-full rounded-xl border-2 border-xv-gray-200 px-4 py-2.5 text-base md:text-sm text-xv-navy outline-none focus:border-xv-orange resize-y"
        />
        <button
          type="submit"
          disabled={isPending}
          className="rounded-full bg-xv-gray-100 px-5 py-2 text-sm font-bold text-xv-navy hover:bg-xv-gray-200 disabled:opacity-60"
        >
          Salvar observação
        </button>
      </form>
    </div>
  );
}
