import Link from "next/link";
import { Gift, ArrowRight } from "lucide-react";

export function LifetimePointsCard({ points }: { points: number }) {
  return (
    <div className="rounded-3xl bg-xv-navy p-6 text-white shadow-xl">
      <div className="flex items-center gap-3">
        <div className="rounded-full bg-white/10 p-2">
          <Gift size={20} />
        </div>
        <p className="text-xs font-bold uppercase tracking-widest text-white/60">
          Sua carteira de pontos
        </p>
      </div>

      <p className="mt-3 font-display text-4xl font-black">
        {points.toLocaleString("pt-BR")}
      </p>
      <p className="mt-1 text-sm text-white/80">
        Você ganha <strong>1 ponto a cada R$1</strong> gasto na lavanderia.
        Troque-os por produtos na Store Xô Varal.
      </p>

      <div className="mt-4 flex flex-wrap gap-2">
        <Link
          href="/store"
          className="inline-flex items-center gap-2 rounded-full bg-xv-orange px-5 py-2.5 text-sm font-bold text-white shadow-orange transition hover:bg-xv-orange-light"
        >
          Ir para a Store Xô Varal
          <ArrowRight size={16} />
        </Link>
        <Link
          href="/minha-conta/resgates"
          className="inline-flex items-center gap-2 rounded-full bg-white/10 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-white/20"
        >
          Meus resgates
        </Link>
      </div>
    </div>
  );
}
