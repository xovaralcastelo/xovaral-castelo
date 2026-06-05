"use client";

import { useState, useTransition, useRef } from "react";
import { useRouter } from "next/navigation";
import { creditCycles } from "../../../_actions";
import { FormField, TextInput, Textarea } from "../../../_components/FormField";

export function CreditCyclesForm({ customerId }: { customerId: string }) {
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
      const res = await creditCycles(fd);
      if (res.ok) {
        setMsg({ kind: "ok", text: "Ciclos creditados!" });
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
        Creditar ciclos do mês
      </h3>
      <p className="text-xs text-xv-gray-700">
        Use após cada ciclo do cliente. Pontos vitalícios sobem automaticamente
        se você preencher (regra padrão: 10 pontos por ciclo, ajuste à vontade).
      </p>

      <div className="grid grid-cols-2 gap-3">
        <FormField label="Ciclos">
          <TextInput
            name="cycles"
            type="number"
            min="1"
            step="1"
            defaultValue="1"
            required
          />
        </FormField>
        <FormField
          label="Pontos vitalícios"
          hint="Some ao saldo"
        >
          <TextInput
            name="points"
            type="number"
            min="0"
            step="1"
            defaultValue="10"
          />
        </FormField>
      </div>

      <FormField label="Observação (opcional)">
        <Textarea name="note" rows={2} placeholder="ex: ciclo lavagem 08/06" />
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
        {isPending ? "Creditando…" : "Creditar"}
      </button>
    </form>
  );
}
