import { Trophy, Medal, Crown, Gem, Check, type LucideIcon } from "lucide-react";
import type { Tier } from "@/lib/loyalty";

const ICONS: Record<string, LucideIcon> = {
  Trophy,
  Medal,
  Crown,
  Gem,
};

export function TierCard({ tier }: { tier: Tier }) {
  const Icon = ICONS[tier.icon] ?? Trophy;

  return (
    <div
      className="relative overflow-hidden rounded-3xl p-6 text-white shadow-xl"
      style={{
        background: `linear-gradient(135deg, ${tier.color} 0%, ${tier.colorEnd} 100%)`,
      }}
    >
      <div
        className="pointer-events-none absolute -top-10 -right-10 h-40 w-40 rounded-full blur-3xl opacity-30"
        style={{ background: "#ffffff" }}
        aria-hidden
      />

      <div className="relative flex items-center justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-white/70">
            Seu nível atual
          </p>
          <p className="mt-1 font-display text-3xl font-black">{tier.name}</p>
          <p className="mt-2 text-sm text-white/90">
            {tier.discount} de desconto automático no próximo mês
          </p>
        </div>

        <div
          className="flex-shrink-0 rounded-2xl bg-white/20 p-4 backdrop-blur-sm"
          style={{ boxShadow: `0 8px 24px ${tier.ringColor}` }}
        >
          <Icon size={36} strokeWidth={2.4} />
        </div>
      </div>

      <ul className="relative mt-5 space-y-1.5">
        {tier.perks.map((perk) => (
          <li
            key={perk}
            className="flex items-start gap-2 text-sm text-white/95"
          >
            <Check size={14} className="mt-0.5 text-white/80 flex-shrink-0" />
            <span>{perk}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
