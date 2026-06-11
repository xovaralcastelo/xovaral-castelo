"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FormField, TextInput, Select } from "../../_components/FormField";
import { ADMIN_SECTION_OPTIONS, type StaffMember } from "@/lib/types";

interface Props {
  member?: StaffMember;
  action: (formData: FormData) => Promise<{ ok: true } | { ok: false; error: string }>;
  submitLabel: string;
}

export function StaffForm({ member, action, submitLabel }: Props) {
  const [error, setError] = useState<string | null>(null);
  const [role, setRole] = useState(member?.role ?? "staff");
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const fd = new FormData(e.currentTarget);
    startTransition(async () => {
      const res = await action(fd);
      if (res && "ok" in res && !res.ok) setError(res.error);
      else router.refresh();
    });
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5 max-w-2xl">
      {error ? (
        <div role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700 ring-1 ring-red-200">
          {error}
        </div>
      ) : null}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField label="Nome">
          <TextInput name="name" defaultValue={member?.name ?? ""} required maxLength={120} />
        </FormField>
        <FormField
          label="E-mail (conta Google)"
          hint="O colaborador entra no painel com esse e-mail via login Google"
        >
          <TextInput
            name="email"
            type="email"
            defaultValue={member?.email ?? ""}
            required
            placeholder="nome@gmail.com"
          />
        </FormField>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField label="Papel" hint="Administrador tem acesso total, inclusive a estas Configurações">
          <Select
            name="role"
            value={role}
            onChange={(e) => setRole(e.target.value as "admin" | "staff")}
          >
            <option value="staff">Colaborador</option>
            <option value="admin">Administrador</option>
          </Select>
        </FormField>
        <FormField label="Status" hint="Inativo bloqueia o acesso sem excluir o cadastro">
          <Select name="status" defaultValue={member?.status ?? "active"}>
            <option value="active">Ativo</option>
            <option value="inactive">Inativo</option>
          </Select>
        </FormField>
      </div>

      {role === "staff" ? (
        <fieldset className="rounded-2xl ring-1 ring-xv-gray-200 p-5">
          <legend className="px-2 text-xs font-bold uppercase tracking-wider text-xv-gray-700">
            Áreas que o colaborador pode acessar
          </legend>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {ADMIN_SECTION_OPTIONS.map(({ key, label }) => (
              <label
                key={key}
                className="flex items-center gap-3 rounded-xl border-2 border-xv-gray-200 px-4 py-2.5 text-sm font-bold text-xv-navy cursor-pointer hover:border-xv-orange/60 has-[:checked]:border-xv-orange has-[:checked]:bg-xv-orange/5 transition"
              >
                <input
                  type="checkbox"
                  name={`perm_${key}`}
                  defaultChecked={member?.permissions?.includes(key) ?? false}
                  className="h-4 w-4 accent-[#EE7531]"
                />
                {label}
              </label>
            ))}
          </div>
        </fieldset>
      ) : (
        <p className="rounded-xl bg-xv-gray-100 px-4 py-3 text-sm text-xv-gray-700">
          Administradores têm acesso a todas as áreas do painel, incluindo
          Configurações (gestão da equipe).
        </p>
      )}

      <div className="flex items-center gap-3 pt-2">
        <button
          type="submit"
          disabled={isPending}
          className="rounded-full bg-xv-navy px-6 py-2.5 text-sm font-bold text-white shadow-md hover:bg-xv-navy-light disabled:opacity-60"
        >
          {isPending ? "Salvando…" : submitLabel}
        </button>
        <Link href="/admin/settings" className="text-sm font-bold text-xv-gray-700 hover:text-xv-navy">
          Cancelar
        </Link>
      </div>
    </form>
  );
}
