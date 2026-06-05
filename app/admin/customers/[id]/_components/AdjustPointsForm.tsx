"use client";

import { useState, useTransition, useRef } from "react";
import { useRouter } from "next/navigation";
import { adjustPoints } from "../../../_actions";
import { FormField, TextInput, Textarea } from "../../../_components/FormField";

export function AdjustPointsForm({ customerId }: { customerId: string }) {
  const [msg, setMsg] = useState<{ kind: "ok" | "err"; text: string } | null>(null);
  const [isPending, startTransition] = useTransition();
  const formRef = useRef<HTMLFormElement>(null);
  const router = useRouter();

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setMsg(null);
    const fd = new FormData(e.currentTarget);
    fd.set("customer_id", customerId);
    startTransition(async () => {
      const res = await adjustPoints(fd);
      if (res.ok) {
        setMsg({ kind: "ok", text: "Saldo ajustado!" });
        formRef.current?.reset();
        router.refresh();
      } else {
        setMsg({ kind: "err", text: res.error });
      }
    });
  }

  return (
    <form
      ref={formRef}
      onSubmit={onSubmit}
      className="bg-white rounded-2xl p-5 shadow-sm ring-1 ring-xv-gray-200/60 space-y-4"
    >
      <h3 className="font-display text-lg font-bold text-xv-navy">
        Ajuste manual de pontos
      </h3>
      <p className="text-xs text-xv-gray-700">
        Use para corrigir erros, conceder bônus ou debitar fora de fluxo
        normal. Sempre preencha o motivo (vai pro audit).
      </p>

      <FormField
        label="Variação"
        hint="Positivo soma, negativo subtrai. Ex: -50 ou 100"
      >
        <TextInput
          name="delta"
          type="number"
          step="1"
          required
          placeholder="ex: -50"
        />
      </FormField>

      <FormField label="Motivo">
        <Textarea
          name="reason"
          rows={2}
          required
          placeholder="ex: bônus de boas-vindas / correção de duplicidade"
        />
      </FormField>

      {msg ? (
        <div
          className={`rounded-lg px-3 py-2 text-xs ${
            msg.kind === "ok"
              ? "bg-green-50 text-green-700 ring-1 ring-green-200"
              : "bg-red-50 text-red-700 ring-1 ring-red-200"
          }`}
        >
          {msg.text}
        </div>
      ) : null}

      <button
        type="submit"
        disabled={isPending}
        className="w-full rounded-full bg-xv-navy px-5 py-2.5 text-sm font-bold text-white hover:bg-xv-navy-light disabled:opacity-60"
      >
        {isPending ? "Ajustando…" : "Aplicar ajuste"}
      </button>
    </form>
  );
}
