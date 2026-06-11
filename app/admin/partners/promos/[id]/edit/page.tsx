import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { createAdminClient } from "@/lib/supabase/admin";
import { updatePromo } from "../../../../_actions";
import { PromoForm } from "../../_components/PromoForm";
import type { PartnerPromo } from "@/lib/types";

export const dynamic = "force-dynamic";

export default async function EditPromoPage({
  params,
}: {
  params: { id: string };
}) {
  const sb = createAdminClient();
  const { data } = await sb
    .from("partner_promos")
    .select("*")
    .eq("id", params.id)
    .maybeSingle();

  if (!data) notFound();
  const promo = data as PartnerPromo;

  return (
    <div className="space-y-6">
      <header>
        <Link
          href="/admin/partners/promos"
          className="inline-flex items-center gap-1 text-xs font-bold text-xv-gray-700 hover:text-xv-navy mb-2"
        >
          <ArrowLeft size={12} />
          Promoções
        </Link>
        <h1 className="font-display text-2xl md:text-3xl font-bold text-xv-navy">
          Editar promoção
        </h1>
        <p className="text-sm text-xv-gray-700 mt-1">{promo.partner_name}</p>
      </header>

      <PromoForm
        promo={promo}
        action={updatePromo.bind(null, promo.id)}
        submitLabel="Salvar alterações"
      />
    </div>
  );
}
