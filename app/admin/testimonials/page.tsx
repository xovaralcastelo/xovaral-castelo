import Link from "next/link";
import { Plus, Pencil } from "lucide-react";
import { createAdminClient } from "@/lib/supabase/admin";
import { Table, Td, StatusBadge } from "../_components/Table";
import { DeleteButton } from "../_components/DeleteButton";
import { deleteTestimonial } from "../_actions";
import type { Testimonial } from "@/lib/types";

export const dynamic = "force-dynamic";

export default async function AdminTestimonialsPage() {
  const sb = createAdminClient();
  const { data } = await sb
    .from("testimonials")
    .select("*")
    .order("status", { ascending: true })
    .order("display_order", { ascending: true });

  const list = (data ?? []) as Testimonial[];

  return (
    <div className="space-y-6">
      <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl md:text-3xl font-bold text-xv-navy">Depoimentos</h1>
          <p className="text-sm text-xv-gray-700 mt-1">
            {list.length} depoimento{list.length !== 1 ? "s" : ""} — só os <strong>active</strong> aparecem no site.
          </p>
        </div>
        <Link
          href="/admin/testimonials/new"
          className="inline-flex items-center gap-2 rounded-full bg-xv-orange px-5 py-2.5 text-sm font-bold text-white shadow-md hover:bg-xv-orange-light"
        >
          <Plus size={16} />
          Novo depoimento
        </Link>
      </header>

      <Table
        headers={["Cliente", "Depoimento", "Estrelas", "Ordem", "Status", ""]}
        hasRows={list.length > 0}
        empty="Nenhum depoimento ainda. Crie o primeiro."
      >
        {list.map((t) => (
          <tr key={t.id} className="hover:bg-xv-gray-50 align-top">
            <Td>
              <div className="font-bold">{t.name}</div>
              <div className="text-xs text-xv-gray-500">{t.role}</div>
            </Td>
            <Td className="max-w-md text-xs text-xv-gray-700">
              {t.text.length > 120 ? t.text.slice(0, 120) + "…" : t.text}
            </Td>
            <Td className="text-xv-yellow whitespace-nowrap">{"★".repeat(t.stars)}</Td>
            <Td>{t.display_order}</Td>
            <Td><StatusBadge status={t.status} /></Td>
            <Td>
              <div className="flex items-center gap-3 whitespace-nowrap">
                <Link
                  href={`/admin/testimonials/${t.id}/edit`}
                  className="inline-flex items-center gap-1 text-xs font-bold text-xv-orange hover:underline"
                >
                  <Pencil size={12} />
                  Editar
                </Link>
                <DeleteButton
                  action={deleteTestimonial.bind(null, t.id)}
                  confirmText={`Excluir o depoimento de ${t.name}?`}
                />
              </div>
            </Td>
          </tr>
        ))}
      </Table>
    </div>
  );
}
