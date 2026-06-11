import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { createAdminClient } from "@/lib/supabase/admin";
import { PartnerForm } from "../../_components/PartnerForm";
import { updatePartner } from "../../../_actions";
import type { Partner } from "@/lib/types";

export const dynamic = "force-dynamic";

export default async function EditPartnerPage({
  params,
}: {
  params: { id: string };
}) {
  const sb = createAdminClient();
  const { data } = await sb
    .from("partners")
    .select("*")
    .eq("id", params.id)
    .single();

  if (!data) notFound();
  const partner = data as Partner;

  return (
    <div className="space-y-6">
      <header>
        <Link
          href="/admin/partners"
          className="inline-flex items-center gap-2 text-sm font-bold text-xv-gray-700 hover:text-xv-navy"
        >
          <ArrowLeft size={14} />
          Voltar
        </Link>
        <h1 className="mt-2 font-display text-2xl md:text-3xl font-bold text-xv-navy">Editar parceiro</h1>
      </header>

      <PartnerForm
        partner={partner}
        action={updatePartner.bind(null, partner.id)}
        submitLabel="Salvar alterações"
      />
    </div>
  );
}
