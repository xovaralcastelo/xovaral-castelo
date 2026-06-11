import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { createAdminClient } from "@/lib/supabase/admin";
import { updateStaffMember } from "../../../_actions";
import { StaffForm } from "../../_components/StaffForm";
import type { StaffMember } from "@/lib/types";

export const dynamic = "force-dynamic";

export default async function EditStaffPage({
  params,
}: {
  params: { id: string };
}) {
  const sb = createAdminClient();
  const { data } = await sb
    .from("staff_members")
    .select("*")
    .eq("id", params.id)
    .maybeSingle();

  if (!data) notFound();
  const member = data as StaffMember;

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
        <h1 className="font-display text-3xl font-bold text-xv-navy">
          Editar membro
        </h1>
        <p className="text-sm text-xv-gray-700 mt-1">{member.email}</p>
      </header>

      <StaffForm
        member={member}
        action={updateStaffMember.bind(null, member.id)}
        submitLabel="Salvar alterações"
      />
    </div>
  );
}
