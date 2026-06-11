import Link from "next/link";
import { Package, Users, Gift, Plus, type LucideIcon } from "lucide-react";
import { createAdminClient } from "@/lib/supabase/admin";
import { requireAdmin, can } from "@/lib/admin";

export const dynamic = "force-dynamic";

async function getCounts() {
  const sb = createAdminClient();
  const [customers, products, pendingRedemptions] = await Promise.all([
    sb.from("customers").select("id", { count: "exact", head: true }),
    sb
      .from("products")
      .select("id", { count: "exact", head: true })
      .eq("status", "active"),
    sb
      .from("redemptions")
      .select("id", { count: "exact", head: true })
      .eq("status", "pending"),
  ]);
  return {
    customers: customers.count ?? 0,
    activeProducts: products.count ?? 0,
    pendingRedemptions: pendingRedemptions.count ?? 0,
  };
}

interface PageProps {
  searchParams: { error?: string };
}

export default async function AdminDashboard({ searchParams }: PageProps) {
  const { access } = await requireAdmin();
  const counts = await getCounts();

  const showCustomers = can(access, "customers");
  const showProducts = can(access, "products");
  const showRedemptions = can(access, "redemptions");

  return (
    <div className="space-y-8">
      <header>
        <h1 className="font-display text-3xl font-bold text-xv-navy">
          Painel
        </h1>
        <p className="text-sm text-xv-gray-700 mt-1">
          Visão geral da Store e do Clube de Vantagens.
        </p>
      </header>

      {searchParams.error === "sem-permissao" ? (
        <p
          role="alert"
          className="rounded-2xl bg-yellow-50 px-4 py-3 text-sm text-yellow-800 ring-1 ring-yellow-200"
        >
          Você não tem permissão para acessar essa área. Fale com um
          administrador se precisar desse acesso.
        </p>
      ) : null}

      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {showCustomers ? (
          <Card
            href="/admin/customers"
            icon={Users}
            label="Clientes cadastrados"
            value={counts.customers}
            color="#01B3DC"
          />
        ) : null}
        {showProducts ? (
          <Card
            href="/admin/products"
            icon={Package}
            label="Produtos ativos"
            value={counts.activeProducts}
            color="#EE7531"
          />
        ) : null}
        {showRedemptions ? (
          <Card
            href="/admin/redemptions"
            icon={Gift}
            label="Resgates pendentes"
            value={counts.pendingRedemptions}
            color="#FBC132"
            highlight={counts.pendingRedemptions > 0}
          />
        ) : null}
      </section>

      <section className="bg-white rounded-2xl p-6 shadow-sm ring-1 ring-xv-gray-200/60">
        <h2 className="font-display text-lg font-bold text-xv-navy mb-3">
          Atalhos
        </h2>
        <div className="flex flex-wrap gap-2">
          {showProducts ? (
            <Link
              href="/admin/products/new"
              className="inline-flex items-center gap-2 rounded-full bg-xv-navy px-4 py-2 text-sm font-bold text-white hover:bg-xv-navy-light"
            >
              <Plus size={14} />
              Novo produto
            </Link>
          ) : null}
          {showCustomers ? (
            <Link
              href="/admin/customers"
              className="inline-flex items-center gap-2 rounded-full bg-xv-gray-100 px-4 py-2 text-sm font-bold text-xv-navy hover:bg-xv-gray-200"
            >
              Creditar ciclos/pontos
            </Link>
          ) : null}
          {showRedemptions ? (
            <Link
              href="/admin/redemptions"
              className="inline-flex items-center gap-2 rounded-full bg-xv-gray-100 px-4 py-2 text-sm font-bold text-xv-navy hover:bg-xv-gray-200"
            >
              Fila de resgates
            </Link>
          ) : null}
        </div>
      </section>
    </div>
  );
}

function Card({
  href,
  icon: Icon,
  label,
  value,
  color,
  highlight,
}: {
  href: string;
  icon: LucideIcon;
  label: string;
  value: number;
  color: string;
  highlight?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`block bg-white rounded-2xl p-6 shadow-sm ring-1 transition hover:shadow-md ${
        highlight ? "ring-xv-orange/40" : "ring-xv-gray-200/60"
      }`}
    >
      <div className="flex items-center gap-3">
        <div
          className="rounded-full p-2"
          style={{ background: `${color}20`, color }}
        >
          <Icon size={20} />
        </div>
        <p className="text-xs font-bold uppercase tracking-wider text-xv-gray-700">
          {label}
        </p>
      </div>
      <p className="mt-3 font-display text-4xl font-black text-xv-navy">
        {value.toLocaleString("pt-BR")}
      </p>
    </Link>
  );
}
