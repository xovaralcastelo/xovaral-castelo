"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import {
  normalizeCpf,
  isValidCpf,
  applyPendingEventsForCpf,
} from "@/lib/lavsync";

type Result =
  | { ok: true; appliedEvents: number }
  | { ok: false; error: string };

export async function linkCpf(formData: FormData): Promise<Result> {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { ok: false, error: "Faça login novamente." };

  const cpf = normalizeCpf(String(formData.get("cpf") ?? ""));
  if (!cpf || !isValidCpf(cpf)) {
    return { ok: false, error: "CPF inválido. Confira os 11 dígitos." };
  }

  const sb = createAdminClient();

  // CPF já usado em outra conta?
  const { data: existing } = await sb
    .from("customers")
    .select("id")
    .eq("cpf", cpf)
    .maybeSingle();
  if (existing && existing.id !== user.id) {
    return {
      ok: false,
      error:
        "Esse CPF já está vinculado a outra conta. Fale com a gente no WhatsApp para resolver.",
    };
  }

  const { error } = await sb
    .from("customers")
    .update({ cpf })
    .eq("id", user.id);
  if (error) return { ok: false, error: error.message };

  // Aplica retroativamente os pagamentos que chegaram antes do vínculo
  const appliedEvents = await applyPendingEventsForCpf(sb, cpf, user.id);

  revalidatePath("/minha-conta");
  return { ok: true, appliedEvents };
}
