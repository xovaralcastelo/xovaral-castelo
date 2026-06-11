"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { BadgeCheck, Link2 } from "lucide-react";
import { linkCpf } from "../_actions";

interface Props {
  maskedCpf: string | null;
}

/** Formata progressivamente enquanto digita: 000.000.000-00 */
function formatCpfInput(value: string): string {
  const d = value.replace(/\D/g, "").slice(0, 11);
  if (d.length <= 3) return d;
  if (d.length <= 6) return `${d.slice(0, 3)}.${d.slice(3)}`;
  if (d.length <= 9) return `${d.slice(0, 3)}.${d.slice(3, 6)}.${d.slice(6)}`;
  return `${d.slice(0, 3)}.${d.slice(3, 6)}.${d.slice(6, 9)}-${d.slice(9)}`;
}

export function CpfLinkCard({ maskedCpf }: Props) {
  const [value, setValue] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [applied, setApplied] = useState<number | null>(null);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  if (maskedCpf) {
    return (
      <div className="flex items-center gap-3 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-xv-gray-200/60">
        <BadgeCheck size={20} className="text-green-600 shrink-0" />
        <div className="min-w-0">
          <p className="text-sm font-bold text-xv-navy">
            CPF vinculado: {maskedCpf}
          </p>
          <p className="text-xs text-xv-gray-500">
            Seus ciclos e pontos entram automaticamente após cada compra.
          </p>
        </div>
      </div>
    );
  }

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const fd = new FormData(e.currentTarget);
    startTransition(async () => {
      const res = await linkCpf(fd);
      if (!res.ok) {
        setError(res.error);
      } else {
        setApplied(res.appliedEvents);
        router.refresh();
      }
    });
  }

  if (applied !== null) {
    return (
      <div className="rounded-2xl bg-green-50 p-5 ring-1 ring-green-200">
        <p className="flex items-center gap-2 text-sm font-bold text-green-800">
          <BadgeCheck size={18} />
          CPF vinculado com sucesso!
        </p>
        {applied > 0 ? (
          <p className="mt-1 text-xs text-green-700">
            {applied} {applied === 1 ? "compra anterior foi creditada" : "compras anteriores foram creditadas"}{" "}
            na sua conta — seus pontos já estão aí em cima. 🎉
          </p>
        ) : (
          <p className="mt-1 text-xs text-green-700">
            A partir de agora seus ciclos e pontos entram sozinhos após cada
            compra.
          </p>
        )}
      </div>
    );
  }

  return (
    <div className="rounded-2xl bg-xv-navy p-5 shadow-md text-white">
      <p className="flex items-center gap-2 text-sm font-bold">
        <Link2 size={16} className="text-xv-yellow" />
        Vincule seu CPF e pontue automaticamente
      </p>
      <p className="mt-1 text-xs text-white/70 leading-relaxed">
        Informe o CPF usado nas suas compras na loja. Assim cada lavagem
        credita ciclos e pontos aqui sozinha — sem depender da equipe.
      </p>

      <form onSubmit={onSubmit} className="mt-4 flex gap-2">
        <input
          name="cpf"
          value={value}
          onChange={(e) => setValue(formatCpfInput(e.target.value))}
          inputMode="numeric"
          placeholder="000.000.000-00"
          required
          className="flex-1 min-w-0 rounded-xl border-2 border-white/20 bg-white/10 px-4 py-2.5 text-base text-white placeholder-white/40 outline-none focus:border-xv-yellow transition"
        />
        <button
          type="submit"
          disabled={isPending || value.replace(/\D/g, "").length !== 11}
          className="rounded-xl bg-xv-orange px-5 py-2.5 text-sm font-bold text-white hover:bg-xv-orange-light disabled:opacity-50 shrink-0"
        >
          {isPending ? "..." : "Vincular"}
        </button>
      </form>

      {error ? (
        <p role="alert" className="mt-2 text-xs text-red-300 font-bold">
          {error}
        </p>
      ) : null}
    </div>
  );
}
