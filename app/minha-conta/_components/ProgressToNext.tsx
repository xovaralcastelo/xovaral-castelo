import { Sparkles } from "lucide-react";
import type { Tier } from "@/lib/loyalty";

interface Props {
  current: number;
  tier: Tier;
  next: Tier | null;
  missing: number;
}

export function ProgressToNext({ current, tier, next, missing }: Props) {
  if (!next) {
    return (
      <div className="rounded-3xl bg-white p-6 shadow-card ring-1 ring-xv-gray-200/60">
        <div className="flex items-center gap-3">
          <div
            className="rounded-full p-2"
            style={{ background: tier.bg, color: tier.color }}
          >
            <Sparkles size={20} />
          </div>
          <div>
            <p className="font-display text-lg font-bold text-xv-navy">
              Nível máximo atingido
            </p>
            <p className="text-sm text-xv-gray-700">
              {current} ciclos este mês. Continue acumulando pontos vitalícios
              para a Loja.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const pct = Math.min(100, Math.round((current / next.cyclesMin) * 100));

  return (
    <div className="rounded-3xl bg-white p-6 shadow-card ring-1 ring-xv-gray-200/60">
      <div className="flex items-baseline justify-between gap-2">
        <p className="font-display text-base font-bold text-xv-navy">
          Próximo nível: <span style={{ color: next.color }}>{next.name}</span>
        </p>
        <p className="text-xs font-bold uppercase tracking-wider text-xv-gray-500">
          {next.discount}
        </p>
      </div>

      <div className="mt-4 h-3 w-full overflow-hidden rounded-full bg-xv-gray-200/60">
        <div
          className="h-full rounded-full transition-all"
          style={{
            width: `${pct}%`,
            background: `linear-gradient(90deg, ${tier.color}, ${next.color})`,
          }}
        />
      </div>

      <div className="mt-3 flex items-center justify-between text-sm">
        <span className="font-bold text-xv-navy">
          {current} / {next.cyclesMin} ciclos
        </span>
        <span className="text-xv-gray-700">
          {missing === 0
            ? "Você desbloqueou!"
            : `Faltam ${missing} ${missing === 1 ? "ciclo" : "ciclos"}`}
        </span>
      </div>
    </div>
  );
}
