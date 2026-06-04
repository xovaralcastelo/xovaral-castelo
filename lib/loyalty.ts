import { CLUB_LEVELS } from "@/lib/constants";

export type Tier = (typeof CLUB_LEVELS)[number];

export function getTierFromCycles(cycles: number): Tier {
  return (
    [...CLUB_LEVELS].reverse().find((t) => cycles >= t.cyclesMin) ??
    CLUB_LEVELS[0]
  );
}

export function getNextTier(current: Tier): Tier | null {
  const i = CLUB_LEVELS.findIndex((t) => t.key === current.key);
  return i >= 0 && i < CLUB_LEVELS.length - 1 ? CLUB_LEVELS[i + 1] : null;
}

export function cyclesToNext(current: number, next: Tier | null): number {
  if (!next) return 0;
  return Math.max(0, next.cyclesMin - current);
}

// Retorna [start, end) do mês corrente em America/Sao_Paulo como ISO UTC.
// SP é UTC-3 sem horário de verão atualmente — dia 1 às 00:00 SP = dia 1 às 03:00 UTC.
export function getCurrentMonthRangeSaoPaulo(now: Date = new Date()): {
  start: string;
  end: string;
} {
  const fmt = new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Sao_Paulo",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  const [y, m] = fmt.format(now).split("-").map(Number);
  const start = new Date(Date.UTC(y, m - 1, 1, 3, 0, 0));
  const end = new Date(Date.UTC(y, m, 1, 3, 0, 0));
  return { start: start.toISOString(), end: end.toISOString() };
}
