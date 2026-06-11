import Link from "next/link";
import { Plus, Pencil } from "lucide-react";
import { createAdminClient } from "@/lib/supabase/admin";
import { Table, Td, StatusBadge } from "../_components/Table";
import { DeleteButton } from "../_components/DeleteButton";
import { deletePartner } from "../_actions";
import type { Partner } from "@/lib/types";

export const dynamic = "force-dynamic";

export default async function AdminPartnersPage() {
  const sb = createAdminClient();
  const { data } = await sb
    .from("partners")
    .select("*")
    .order("status", { ascending: true })
    .order("display_order", { ascending: true });

  const list = (data ?? []) as Partner[];

  return (
    <div className="space-y-6">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold text-xv-navy">Parceiros</h1>
          <p className="text-sm text-xv-gray-700 mt-1">
            {list.length} parceiro{list.length !== 1 ? "s" : ""} — só os <strong>active</strong> aparecem na página /parceiros.
          </p>
        </div>
        <Link
          href="/admin/partners/new"
          className="inline-flex items-center gap-2 rounded-full bg-xv-orange px-5 py-2.5 text-sm font-bold text-white shadow-md hover:bg-xv-orange-light"
        >
          <Plus size={16} />
          Novo parceiro
        </Link>
      </header>

      <Table
        headers={["Negócio", "Categoria", "Benefício", "Ordem", "Status", ""]}
        hasRows={list.length > 0}
        empty="Nenhum parceiro cadastrado ainda. Crie o primeiro."
      >
        {list.map((p) => (
          <tr key={p.id} className="hover:bg-xv-gray-50">
            <Td>
              <div className="flex items-center gap-3">
                {p.logo_url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={p.logo_url} alt="" className="h-10 w-10 rounded-lg object-contain bg-white ring-1 ring-xv-gray-200" />
                ) : (
                  <div className="h-10 w-10 rounded-lg bg-xv-gray-100" />
                )}
                <div>
                  <div className="font-bold">{p.name}</div>
                  <div className="text-xs text-xv-gray-500">{p.slug}</div>
                </div>
              </div>
            </Td>
            <Td className="text-xs uppercase tracking-wider text-xv-gray-700">{p.category}</Td>
            <Td className="max-w-xs text-xs text-xv-gray-700">{p.benefit_text ?? "—"}</Td>
            <Td>{p.display_order}</Td>
            <Td><StatusBadge status={p.status} /></Td>
            <Td>
              <div className="flex items-center gap-3 whitespace-nowrap">
                <Link
                  href={`/admin/partners/${p.id}/edit`}
                  className="inline-flex items-center gap-1 text-xs font-bold text-xv-orange hover:underline"
                >
                  <Pencil size={12} />
                  Editar
                </Link>
                <DeleteButton
                  action={deletePartner.bind(null, p.id)}
                  confirmText={`Excluir o parceiro ${p.name}?`}
                />
              </div>
            </Td>
          </tr>
        ))}
      </Table>
    </div>
  );
}
