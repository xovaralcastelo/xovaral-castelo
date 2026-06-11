"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { Check, X } from "lucide-react";

type Action = () => Promise<{ ok: true } | { ok: false; error: string }>;

interface Props {
  approveAction: Action;
  rejectAction: Action;
  businessName: string;
}

export function ReviewButtons({ approveAction, rejectAction, businessName }: Props) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  function run(action: Action, confirmText: string) {
    if (!window.confirm(confirmText)) return;
    startTransition(async () => {
      const res = await action();
      if (res && "ok" in res && !res.ok) window.alert(res.error);
      else router.refresh();
    });
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      <button
        type="button"
        disabled={isPending}
        onClick={() =>
          run(
            approveAction,
            `Aprovar "${businessName}"? Um parceiro em rascunho será criado para você completar e ativar.`,
          )
        }
        className="inline-flex items-center gap-1.5 rounded-full bg-green-600 px-4 py-2 text-xs font-bold text-white hover:bg-green-700 disabled:opacity-50"
      >
        <Check size={13} />
        Aprovar
      </button>
      <button
        type="button"
        disabled={isPending}
        onClick={() =>
          run(rejectAction, `Recusar a solicitação de "${businessName}"?`)
        }
        className="inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-xs font-bold text-red-600 ring-1 ring-red-200 hover:bg-red-50 disabled:opacity-50"
      >
        <X size={13} />
        Recusar
      </button>
    </div>
  );
}
