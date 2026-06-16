import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import {
  getTierOrNull,
  getNextTier,
  cyclesToNext,
  cyclesToFirstTier,
  getCurrentMonthRangeSaoPaulo,
} from "@/lib/loyalty";
import { CLUB_LEVELS } from "@/lib/constants";
import { TierCard } from "./_components/TierCard";
import { NoTierCard } from "./_components/NoTierCard";
import { ProgressToNext } from "./_components/ProgressToNext";
import { LifetimePointsCard } from "./_components/LifetimePointsCard";
import { SignOutButton } from "./_components/SignOutButton";
import { CpfLinkCard } from "./_components/CpfLinkCard";
import { maskCpf } from "@/lib/lavsync";

export const metadata: Metadata = {
  title: "Minha conta — Clube de Vantagens | Xô Varal Castelo",
  description:
    "Acompanhe seu nível no Clube de Vantagens, seus pontos e progresso.",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

type Customer = {
  id: string;
  full_name: string | null;
  email: string | null;
  avatar_url: string | null;
  lifetime_points: number;
  cpf: string | null;
  joined_at: string;
};

export default async function MinhaContaPage() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/clube-de-vantagens/entrar");
  }

  const { data: customer } = await supabase
    .from("customers")
    .select("*")
    .eq("id", user.id)
    .single<Customer>();

  const { start, end } = getCurrentMonthRangeSaoPaulo();
  const { data: events } = await supabase
    .from("cycle_events")
    .select("cycles")
    .eq("customer_id", user.id)
    .gte("occurred_at", start)
    .lt("occurred_at", end);

  const monthlyCycles = (events ?? []).reduce(
    (acc, e) => acc + (e.cycles ?? 0),
    0,
  );
  const tier = getTierOrNull(monthlyCycles);
  const bronze = CLUB_LEVELS[0];
  // Sem nível ainda: o "próximo" alvo é o Bronze; faltam X ciclos pra lá.
  const next = tier ? getNextTier(tier) : bronze;
  const missing = tier
    ? cyclesToNext(monthlyCycles, next)
    : cyclesToFirstTier(monthlyCycles);

  const firstName =
    customer?.full_name?.split(" ")[0] ??
    user.user_metadata?.full_name?.split(" ")[0] ??
    user.email?.split("@")[0] ??
    "cliente";

  const lifetimePoints = customer?.lifetime_points ?? 0;
  const avatarUrl = customer?.avatar_url ?? user.user_metadata?.avatar_url;
  const isLinked = Boolean(customer?.cpf);

  return (
    <div
      className="min-h-screen px-4 py-10"
      style={{
        background:
          "linear-gradient(135deg, #f0fafe 0%, #fff8f2 50%, #fff3ea 100%)",
      }}
    >
      <div className="mx-auto max-w-md space-y-6">
        <header className="flex items-center gap-3">
          {avatarUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={avatarUrl}
              alt={firstName}
              className="h-12 w-12 rounded-full ring-2 ring-white shadow-md"
              referrerPolicy="no-referrer"
            />
          ) : (
            <div className="h-12 w-12 rounded-full bg-xv-navy text-white flex items-center justify-center font-bold text-lg shadow-md">
              {firstName[0]?.toUpperCase()}
            </div>
          )}
          <div className="min-w-0">
            <p className="text-xs font-bold uppercase tracking-wider text-xv-gray-500">
              Olá
            </p>
            <p className="font-display text-lg text-xv-navy truncate">
              {firstName}
            </p>
          </div>
          <div className="ml-auto">
            <SignOutButton />
          </div>
        </header>

        {!isLinked ? (
          <div className="space-y-3">
            <div className="rounded-2xl bg-amber-50 p-4 ring-1 ring-amber-200">
              <p className="text-sm font-bold text-amber-900">
                Falta 1 passo para ver seus dados reais
              </p>
              <p className="mt-1 text-xs leading-relaxed text-amber-800">
                Vincule o CPF que você usa nas compras da loja. Seu nível e seus
                pontos — <strong>incluindo as compras que você já fez</strong> —
                aparecem aqui automaticamente. Enquanto não vincular, mostramos
                zero para não passar nenhuma informação errada.
              </p>
            </div>
            <CpfLinkCard maskedCpf={null} />
          </div>
        ) : null}

        <section>
          {tier ? (
            <>
              <h1 className="font-display text-2xl font-bold text-xv-navy">
                Você alcançou o nível{" "}
                <span style={{ color: tier.color }}>{tier.name}</span>
              </h1>
              <p className="mt-1 text-sm text-xv-gray-700">
                {next
                  ? `Para alcançar o nível ${next.name}, acumule mais ${missing} ${
                      missing === 1 ? "ciclo" : "ciclos"
                    } este mês.`
                  : "Você atingiu o nível máximo do Clube. Continue acumulando para multiplicar seus pontos vitalícios."}
              </p>
            </>
          ) : (
            <>
              <h1 className="font-display text-2xl font-bold text-xv-navy">
                Você ainda não atingiu um nível este mês
              </h1>
              <p className="mt-1 text-sm text-xv-gray-700">
                {monthlyCycles === 0
                  ? `Assim que seus ciclos do mês forem registrados, seu nível aparece aqui. Faltam ${missing} para o Bronze.`
                  : `Você tem ${monthlyCycles} ${
                      monthlyCycles === 1 ? "ciclo" : "ciclos"
                    } este mês. Faltam ${missing} ${
                      missing === 1 ? "ciclo" : "ciclos"
                    } para o nível Bronze.`}
              </p>
            </>
          )}
        </section>

        {tier ? (
          <TierCard tier={tier} />
        ) : (
          <NoTierCard monthlyCycles={monthlyCycles} missing={missing} />
        )}

        <ProgressToNext
          current={monthlyCycles}
          tier={tier}
          next={next}
          missing={missing}
        />

        <LifetimePointsCard points={lifetimePoints} />

        {isLinked && customer?.cpf ? (
          <CpfLinkCard maskedCpf={maskCpf(customer.cpf)} />
        ) : null}

        <p className="text-center text-xs text-xv-gray-500">
          {customer?.cpf
            ? "Seus ciclos e pontos entram automaticamente e podem levar algumas horas após a compra para aparecer aqui. Dúvidas? Fale com a gente no WhatsApp."
            : "Seus ciclos do mês são creditados pela equipe Xô Varal após cada uso. Dúvidas? Fale com a gente no WhatsApp."}
        </p>
      </div>
    </div>
  );
}
