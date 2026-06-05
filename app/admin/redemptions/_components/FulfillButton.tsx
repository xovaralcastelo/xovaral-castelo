"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Check, X } from "lucide-react";
import { fulfillRedemption, cancelRedemption } from "../../_actions";

export function FulfillButton({ redemptionId }: { redemptionId: string }) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  function handle(action: "fulfill" | "cancel") {
    setError(null);
    startTransition(async () => {
      const res =
        action === "fulfill"
          ? await fulfillRedemption(redemptionId)
          : await cancelRedemption(redemptionId);
      if (!res.ok) setError(res.error);
      else router.refresh();
    });
  }

  return (
    <div className="flex flex-col items-end gap-1">
      <div className="flex items-center gap-2">
        <button
          type="button"
          disabled={isPending}
          onClick={() => handle("fulfill")}
          className="inline-flex items-center gap-1.5 rounded-full bg-green-600 px-3 py-1.5 text-xs font-bold text-white hover:bg-green-700 disabled:opacity-60"
        >
          <Check size={12} />
          Marcar entregue
        </button>
        <button
          type="button"
          disabled={isPending}
          onClick={() => {
            if (confirm("Cancelar e devolver os pontos ao cliente?")) handle("cancel");
          }}
          className="inline-flex items-center gap-1.5 rounded-full bg-red-50 px-3 py-1.5 text-xs font-bold text-red-700 hover:bg-red-100 disabled:opacity-60"
        >
          <X size={12} />
          Cancelar
        </button>
      </div>
      {error ? <p className="text-xs text-red-600">{error}</p> : null}
    </div>
  );
}
