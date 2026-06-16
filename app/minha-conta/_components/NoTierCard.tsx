import { Sparkles } from "lucide-react";
import { CLUB_LEVELS } from "@/lib/constants";

/**
 * Estado real de quem ainda não atingiu o primeiro nível (Bronze) no mês.
 * Mostra o número de usos do mês e o quanto falta — sem fingir um nível.
 */
export function NoTierCard({
  monthlyCycles,
  missing,
}: {
  monthlyCycles: number;
  missing: number;
}) {
  const bronze = CLUB_LEVELS[0];

  return (
    <div className="relative overflow-hidden rounded-3xl bg-xv-navy p-6 text-white shadow-xl">
      <div
        className="pointer-events-none absolute -top-10 -right-10 h-40 w-40 rounded-full blur-3xl opacity-20"
        style={{ background: "#ffffff" }}
        aria-hidden
      />

      <div className="relative flex items-center justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-white/60">
            Seu nível atual
          </p>
          <p className="mt-1 font-display text-3xl font-black">Sem nível ainda</p>
          <p className="mt-2 text-sm text-white/80">
            Faltam <strong>{missing}</strong> {missing === 1 ? "ciclo" : "ciclos"}{" "}
            este mês para você entrar no nível {bronze.name} e começar a ganhar
            desconto.
          </p>
        </div>

        <div className="flex-shrink-0 rounded-2xl bg-white/10 p-4 backdrop-blur-sm">
          <Sparkles size={36} strokeWidth={2.2} />
        </div>
      </div>

      <div className="relative mt-5 flex items-center gap-2 rounded-xl bg-white/10 px-4 py-3">
        <span className="font-display text-2xl font-black">{monthlyCycles}</span>
        <span className="text-sm text-white/80">
          {monthlyCycles === 1 ? "uso registrado" : "usos registrados"} este mês
        </span>
      </div>
    </div>
  );
}
