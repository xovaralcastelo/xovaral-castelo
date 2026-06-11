import Link from "next/link";
import { Plus, Pencil, ExternalLink } from "lucide-react";
import { createAdminClient } from "@/lib/supabase/admin";
import { Table, Td, StatusBadge } from "../../_components/Table";
import { DeleteButton } from "../../_components/DeleteButton";
import { PartnersTabs } from "../_components/PartnersTabs";
import { deletePromo } from "../../_actions";
import type { PartnerPromo } from "@/lib/types";

export const dynamic = "force-dynamic";

export default async function AdminPromosPage() {
  const sb = createAdminClient();
  const [{ data }, { count: pendingCount }] = await Promise.all([
    sb
      .from("partner_promos")
      .select("*")
      .order("status", { ascending: true })
      .order("display_order", { ascending: true }),
    sb
      .from("partner_applications")
      .select("id", { count: "exact", head: true })
      .eq("status", "pending"),
  ]);

  const list = (data ?? []) as PartnerPromo[];

  return (
    <div className="space-y-6">
      <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl md:text-3xl font-bold text-xv-navy">
            Parceiros
          </h1>
          <p className="text-sm text-xv-gray-700 mt-1">
            Banners do Clube de Benefícios — só os <strong>active</strong>{" "}
            aparecem no site.
          </p>
        </div>
        <Link
          href="/admin/partners/promos/new"
          className="inline-flex items-center gap-2 rounded-full bg-xv-orange px-5 py-2.5 text-sm font-bold text-white shadow-md hover:bg-xv-orange-light"
        >
          <Plus size={16} />
          Nova promoção
        </Link>
      </header>

      <PartnersTabs active="promos" pendingCount={pendingCount ?? 0} />

      <Table
        headers={["Promoção", "Parceiro", "Ordem", "Status", ""]}
        hasRows={list.length > 0}
        empty="Nenhuma promoção cadastrada ainda. Crie a primeira."
      >
        {list.map((p) => (
          <tr key={p.id} className="hover:bg-xv-gray-50">
            <Td>
              <div className="flex items-center gap-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={p.banner_url}
                  alt=""
                  className="h-12 w-10 rounded-lg object-cover ring-1 ring-xv-gray-200"
                />
                <div>
                  <div className="font-bold max-w-sm">{p.title}</div>
                  <div className="text-xs text-xv-gray-500">{p.slug}</div>
                </div>
              </div>
            </Td>
            <Td className="text-xs text-xv-gray-700">{p.partner_name}</Td>
            <Td>{p.display_order}</Td>
            <Td>
              <StatusBadge status={p.status} />
            </Td>
            <Td>
              <div className="flex items-center gap-3 whitespace-nowrap">
                {p.status === "active" ? (
                  <Link
                    href={`/promocoes/${p.slug}`}
                    target="_blank"
                    className="inline-flex items-center gap-1 text-xs font-bold text-xv-cyan hover:underline"
                  >
                    <ExternalLink size={12} />
                    Ver no site
                  </Link>
                ) : null}
                <Link
                  href={`/admin/partners/promos/${p.id}/edit`}
                  className="inline-flex items-center gap-1 text-xs font-bold text-xv-orange hover:underline"
                >
                  <Pencil size={12} />
                  Editar
                </Link>
                <DeleteButton
                  action={deletePromo.bind(null, p.id)}
                  confirmText={`Excluir a promoção "${p.title}"?`}
                />
              </div>
            </Td>
          </tr>
        ))}
      </Table>
    </div>
  );
}
