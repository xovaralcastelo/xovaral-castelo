import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { createPromo } from "../../../_actions";
import { PromoForm } from "../_components/PromoForm";

export const dynamic = "force-dynamic";

export default function NewPromoPage() {
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
          Nova promoção
        </h1>
        <p className="text-sm text-xv-gray-700 mt-1">
          Cadastre o banner e as regras do benefício do parceiro.
        </p>
      </header>

      <PromoForm action={createPromo} submitLabel="Criar promoção" />
    </div>
  );
}
