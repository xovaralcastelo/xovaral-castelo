import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Mail, Calendar, Award } from "lucide-react";
import { createAdminClient } from "@/lib/supabase/admin";
import {
  getTierFromCycles,
  getCurrentMonthRangeSaoPaulo,
} from "@/lib/loyalty";
import type { Customer, CycleEvent, Redemption } from "@/lib/types";
import { CreditCyclesForm } from "./_components/CreditCyclesForm";
import { AdjustPointsForm } from "./_components/AdjustPointsForm";

export const dynamic = "force-dynamic";

interface Props {
  params: { id: string };
}

export default async function AdminCustomerDetailPage({ params }: Props) {
  const sb = createAdminClient();
  const { data: customer } = await sb
    .from("customers")
    .select("*")
    .eq("id", params.id)
    .single<Customer>();
  if (!customer) notFound();

  const { start, end } = getCurrentMonthRangeSaoPaulo();
  const [{ data: events = [] }, { data: monthEvents = [] }, { data: redemptions = [] }] =
    await Promise.all([
      sb
        .from("cycle_events")
        .select("*")
        .eq("customer_id", params.id)
        .order("occurred_at", { ascending: false })
        .limit(20),
      sb
        .from("cycle_events")
        .select("cycles")
        .eq("customer_id", params.id)
        .gte("occurred_at", start)
        .lt("occurred_at", end),
      sb
        .from("redemptions")
        .select("id, points_spent, status, created_at, voucher_code, products(name)")
        .eq("customer_id", params.id)
        .order("created_at", { ascending: false })
        .limit(20),
    ]);

  const monthlyCycles = (monthEvents ?? []).reduce(
    (a, e) => a + (e.cycles ?? 0),
    0,
  );
  const tier = getTierFromCycles(monthlyCycles);
  const eventList = (events ?? []) as CycleEvent[];
  const redemptionList = (redemptions ?? []) as unknown as Array<
    Redemption & { products: { name: string } | null }
  >;

  return (
    <div className="space-y-6">
      <Link
        href="/admin/customers"
        className="inline-flex items-center gap-2 text-sm font-bold text-xv-gray-700 hover:text-xv-navy"
      >
        <ArrowLeft size={14} />
        Voltar à lista
      </Link>

      <header className="bg-white rounded-2xl p-6 shadow-sm ring-1 ring-xv-gray-200/60">
        <div className="flex items-start gap-4">
          {customer.avatar_url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={customer.avatar_url}
              alt=""
              className="h-16 w-16 rounded-full object-cover"
              referrerPolicy="no-referrer"
            />
          ) : (
            <div className="h-16 w-16 rounded-full bg-xv-navy text-white flex items-center justify-center font-bold text-2xl">
              {(customer.full_name ?? customer.email ?? "?")[0]?.toUpperCase()}
            </div>
          )}
          <div className="flex-1 min-w-0">
            <h1 className="font-display text-2xl font-bold text-xv-navy">
              {customer.full_name ?? "Sem nome"}
            </h1>
            <p className="flex items-center gap-1.5 text-sm text-xv-gray-700 mt-1">
              <Mail size={12} />
              {customer.email}
            </p>
            <p className="flex items-center gap-1.5 text-xs text-xv-gray-500 mt-1">
              <Calendar size={12} />
              Entrou em{" "}
              {new Date(customer.joined_at).toLocaleDateString("pt-BR", {
                day: "2-digit",
                month: "long",
                year: "numeric",
              })}
            </p>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-3">
          <Stat
            label="Nível atual"
            value={tier.name}
            color={tier.color}
            icon={<Award size={18} />}
          />
          <Stat
            label={`Ciclos no mês`}
            value={monthlyCycles.toString()}
            color="#01B3DC"
          />
          <Stat
            label="Pontos vitalícios"
            value={customer.lifetime_points.toLocaleString("pt-BR")}
            color="#EE7531"
          />
        </div>
      </header>

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CreditCyclesForm customerId={customer.id} />
        <AdjustPointsForm customerId={customer.id} />
      </section>

      <section>
        <h2 className="font-display text-xl font-bold text-xv-navy mb-3">
          Últimos eventos de ciclo
        </h2>
        {eventList.length === 0 ? (
          <p className="text-sm text-xv-gray-500">Nada registrado ainda.</p>
        ) : (
          <div className="bg-white rounded-2xl shadow-sm ring-1 ring-xv-gray-200/60 divide-y divide-xv-gray-200/60">
            {eventList.map((e) => (
              <div key={e.id} className="px-4 py-3 flex items-center gap-3 text-sm">
                <div className="flex-1 min-w-0">
                  <p className="text-xv-navy">
                    <strong>{e.cycles}</strong> ciclo(s){" "}
                    {e.points_earned > 0 ? (
                      <span className="text-xv-orange">+ {e.points_earned} pts</span>
                    ) : null}
                  </p>
                  {e.note ? (
                    <p className="text-xs text-xv-gray-500 mt-0.5">{e.note}</p>
                  ) : null}
                </div>
                <span className="text-xs text-xv-gray-500 flex-shrink-0">
                  {new Date(e.occurred_at).toLocaleDateString("pt-BR")}
                </span>
              </div>
            ))}
          </div>
        )}
      </section>

      <section>
        <h2 className="font-display text-xl font-bold text-xv-navy mb-3">
          Últimos resgates
        </h2>
        {redemptionList.length === 0 ? (
          <p className="text-sm text-xv-gray-500">Nenhum resgate ainda.</p>
        ) : (
          <div className="bg-white rounded-2xl shadow-sm ring-1 ring-xv-gray-200/60 divide-y divide-xv-gray-200/60">
            {redemptionList.map((r) => (
              <div key={r.id} className="px-4 py-3 flex items-center gap-3 text-sm">
                <div className="flex-1 min-w-0">
                  <p className="text-xv-navy font-bold truncate">
                    {r.products?.name ?? "Produto removido"}
                  </p>
                  <p className="text-xs text-xv-gray-500 mt-0.5">
                    {r.points_spent} pts ·{" "}
                    {new Date(r.created_at).toLocaleDateString("pt-BR")}
                    {r.voucher_code ? ` · cód. ${r.voucher_code}` : ""}
                  </p>
                </div>
                <span
                  className={`rounded-full px-2.5 py-0.5 text-xs font-bold flex-shrink-0 ${
                    r.status === "fulfilled"
                      ? "bg-green-100 text-green-800"
                      : r.status === "cancelled"
                      ? "bg-red-100 text-red-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {r.status}
                </span>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

function Stat({
  label,
  value,
  color,
  icon,
}: {
  label: string;
  value: string;
  color: string;
  icon?: React.ReactNode;
}) {
  return (
    <div className="rounded-xl bg-xv-gray-50 p-4">
      <p className="text-xs font-bold uppercase tracking-wider text-xv-gray-700 flex items-center gap-1.5">
        {icon}
        {label}
      </p>
      <p className="mt-1 font-display text-2xl font-black" style={{ color }}>
        {value}
      </p>
    </div>
  );
}
