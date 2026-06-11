"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";

interface Props {
  action: () => Promise<{ ok: true } | { ok: false; error: string }>;
  confirmText?: string;
  label?: string;
}

export function DeleteButton({ action, confirmText = "Tem certeza? Essa ação não pode ser desfeita.", label = "Excluir" }: Props) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  function onClick() {
    if (!window.confirm(confirmText)) return;
    startTransition(async () => {
      const res = await action();
      if (res && "ok" in res && !res.ok) {
        window.alert(res.error);
      } else {
        router.refresh();
      }
    });
  }

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={isPending}
      className="inline-flex items-center gap-1 text-xs font-bold text-red-600 hover:underline disabled:opacity-50"
    >
      <Trash2 size={12} />
      {isPending ? "Excluindo…" : label}
    </button>
  );
}
