import Link from "next/link";
import { Plus, Pencil, ShieldCheck } from "lucide-react";
import { createAdminClient } from "@/lib/supabase/admin";
import { getAdminEmails } from "@/lib/admin";
import { Table, Td } from "../_components/Table";
import { DeleteButton } from "../_components/DeleteButton";
import { deleteStaffMember } from "../_actions";
import { ADMIN_SECTION_OPTIONS, type StaffMember } from "@/lib/types";

export const dynamic = "force-dynamic";

const SECTION_LABELS = Object.fromEntries(
  ADMIN_SECTION_OPTIONS.map(({ key, label }) => [key, label]),
);

export default async function AdminSettingsPage() {
  const sb = createAdminClient();
  const { data } = await sb
    .from("staff_members")
    .select("*")
    .order("role", { ascending: true })
    .order("name", { ascending: true });

  const list = (data ?? []) as StaffMember[];
  const superAdmins = getAdminEmails();

  return (
    <div className="space-y-8">
      <header className="flex items-start justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-bold text-xv-navy">
            Configurações
          </h1>
          <p className="text-sm text-xv-gray-700 mt-1">
            Gerencie quem da equipe acessa o painel e o que cada pessoa pode
            fazer.
          </p>
        </div>
        <Link
          href="/admin/settings/new"
          className="inline-flex items-center gap-2 rounded-full bg-xv-navy px-5 py-2.5 text-sm font-bold text-white shadow-md hover:bg-xv-navy-light shrink-0"
        >
          <Plus size={14} />
          Novo membro
        </Link>
      </header>

      <section className="space-y-3">
        <h2 className="font-display text-lg font-bold text-xv-navy">
          Equipe
        </h2>
        <Table
          headers={["Nome", "E-mail", "Papel", "Acessos", "Status", "Ações"]}
          hasRows={list.length > 0}
          empty="Nenhum colaborador cadastrado ainda. Clique em “Novo membro” para liberar acesso à equipe."
        >
          {list.map((m) => (
            <tr key={m.id}>
              <Td className="font-bold">{m.name}</Td>
              <Td className="text-xv-gray-700">{m.email}</Td>
              <Td>
                {m.role === "admin" ? (
                  <span className="inline-block rounded-full bg-xv-navy px-2.5 py-0.5 text-xs font-bold text-white">
                    Administrador
                  </span>
                ) : (
                  <span className="inline-block rounded-full bg-xv-gray-200 px-2.5 py-0.5 text-xs font-bold text-xv-gray-700">
                    Colaborador
                  </span>
                )}
              </Td>
              <Td className="text-xs text-xv-gray-700 max-w-xs">
                {m.role === "admin"
                  ? "Todas as áreas"
                  : m.permissions
                      .map((p) => SECTION_LABELS[p] ?? p)
                      .join(", ") || "—"}
              </Td>
              <Td>
                <span
                  className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-bold ${
                    m.status === "active"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {m.status === "active" ? "Ativo" : "Inativo"}
                </span>
              </Td>
              <Td>
                <div className="flex items-center gap-3">
                  <Link
                    href={`/admin/settings/${m.id}/edit`}
                    className="inline-flex items-center gap-1 text-xs font-bold text-xv-navy hover:underline"
                  >
                    <Pencil size={12} />
                    Editar
                  </Link>
                  <DeleteButton
                    action={deleteStaffMember.bind(null, m.id)}
                    confirmText={`Remover o acesso de ${m.name}? Essa ação não pode ser desfeita.`}
                    label="Remover"
                  />
                </div>
              </Td>
            </tr>
          ))}
        </Table>
      </section>

      {superAdmins.length > 0 ? (
        <section className="bg-white rounded-2xl p-6 shadow-sm ring-1 ring-xv-gray-200/60">
          <h2 className="font-display text-lg font-bold text-xv-navy mb-1 flex items-center gap-2">
            <ShieldCheck size={18} className="text-xv-orange" />
            Super-administradores
          </h2>
          <p className="text-xs text-xv-gray-500 mb-4">
            Definidos na configuração do servidor (variável{" "}
            <code className="font-mono">ADMIN_EMAILS</code>). Têm acesso total e
            não podem ser removidos por aqui.
          </p>
          <ul className="space-y-1">
            {superAdmins.map((email) => (
              <li key={email} className="text-sm font-bold text-xv-navy">
                {email}
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <section className="rounded-2xl bg-xv-gray-100 p-6 text-sm text-xv-gray-700">
        <h3 className="font-bold text-xv-navy mb-2">
          Como o colaborador acessa o painel
        </h3>
        <ol className="list-decimal ml-5 space-y-1">
          <li>Cadastre aqui o e-mail Google da pessoa e marque as áreas liberadas.</li>
          <li>
            A pessoa acessa <strong>xovaralcastelo + /admin</strong> e entra com
            o Google usando esse e-mail.
          </li>
          <li>O painel mostra apenas as áreas que ela tem permissão de usar.</li>
        </ol>
      </section>
    </div>
  );
}
