import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { createStaffMember } from "../../_actions";
import { StaffForm } from "../_components/StaffForm";

export const dynamic = "force-dynamic";

export default function NewStaffPage() {
  return (
    <div className="space-y-6">
      <header>
        <Link
          href="/admin/settings"
          className="inline-flex items-center gap-1 text-xs font-bold text-xv-gray-700 hover:text-xv-navy mb-2"
        >
          <ArrowLeft size={12} />
          Configurações
        </Link>
        <h1 className="font-display text-2xl md:text-3xl font-bold text-xv-navy">
          Novo membro da equipe
        </h1>
        <p className="text-sm text-xv-gray-700 mt-1">
          Cadastre o e-mail Google do colaborador e escolha o que ele pode
          acessar.
        </p>
      </header>

      <StaffForm action={createStaffMember} submitLabel="Cadastrar membro" />
    </div>
  );
}
