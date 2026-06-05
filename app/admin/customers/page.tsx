import Link from "next/link";
import { Search } from "lucide-react";
import { createAdminClient } from "@/lib/supabase/admin";
import { Table, Td } from "../_components/Table";
import type { Customer } from "@/lib/types";

export const dynamic = "force-dynamic";

interface Props {
  searchParams: { q?: string };
}

export default async function AdminCustomersPage({ searchParams }: Props) {
  const q = (searchParams.q ?? "").trim();
  const sb = createAdminClient();

  let query = sb
    .from("customers")
    .select("*")
    .order("joined_at", { ascending: false })
    .limit(100);

  if (q) {
    query = query.or(`full_name.ilike.%${q}%,email.ilike.%${q}%`);
  }

  const { data: customers = [] } = await query;
  const list = (customers ?? []) as Customer[];

  return (
    <div className="space-y-6">
      <header>
        <h1 className="font-display text-3xl font-bold text-xv-navy">
          Clientes
        </h1>
        <p className="text-sm text-xv-gray-700 mt-1">
          {list.length} cliente{list.length !== 1 ? "s" : ""}{" "}
          {q ? `encontrado${list.length !== 1 ? "s" : ""} pra "${q}"` : "cadastrados"}
        </p>
      </header>

      <form className="flex items-center gap-2 max-w-md" action="/admin/customers">
        <div className="flex-1 relative">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-xv-gray-500"
          />
          <input
            type="search"
            name="q"
            defaultValue={q}
            placeholder="Buscar por nome ou email…"
            className="w-full rounded-full border-2 border-xv-gray-200 px-10 py-2 text-sm text-xv-navy outline-none focus:border-xv-orange"
          />
        </div>
        <button
          type="submit"
          className="rounded-full bg-xv-navy px-4 py-2 text-sm font-bold text-white hover:bg-xv-navy-light"
        >
          Buscar
        </button>
      </form>

      <Table
        headers={["Cliente", "Pontos vitalícios", "Entrou em", ""]}
        hasRows={list.length > 0}
        empty={q ? `Nenhum cliente encontrado para "${q}".` : "Nenhum cliente cadastrado ainda."}
      >
        {list.map((c) => (
          <tr key={c.id} className="hover:bg-xv-gray-50">
            <Td>
              <div className="flex items-center gap-3">
                {c.avatar_url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={c.avatar_url}
                    alt=""
                    className="h-9 w-9 rounded-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="h-9 w-9 rounded-full bg-xv-navy text-white flex items-center justify-center font-bold text-sm">
                    {(c.full_name ?? c.email ?? "?")[0]?.toUpperCase()}
                  </div>
                )}
                <div className="min-w-0">
                  <div className="font-bold truncate">{c.full_name ?? "—"}</div>
                  <div className="text-xs text-xv-gray-500 truncate">{c.email}</div>
                </div>
              </div>
            </Td>
            <Td>
              <span className="font-bold">{c.lifetime_points.toLocaleString("pt-BR")}</span>{" "}
              <span className="text-xs text-xv-gray-500">pts</span>
            </Td>
            <Td>
              <span className="text-xs text-xv-gray-700">
                {new Date(c.joined_at).toLocaleDateString("pt-BR")}
              </span>
            </Td>
            <Td>
              <Link
                href={`/admin/customers/${c.id}`}
                className="text-xs font-bold text-xv-orange hover:underline"
              >
                Gerenciar
              </Link>
            </Td>
          </tr>
        ))}
      </Table>
    </div>
  );
}
