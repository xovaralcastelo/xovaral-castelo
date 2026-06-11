"use server";

import { createAdminClient } from "@/lib/supabase/admin";
import { PARTNER_CATEGORIES, type PartnerCategory } from "@/lib/types";

type Result = { ok: true } | { ok: false; error: string };

export async function submitPartnerApplication(
  formData: FormData,
): Promise<Result> {
  // Honeypot: campo invisível que humanos não preenchem
  if (String(formData.get("company_site") ?? "") !== "") {
    return { ok: true };
  }

  const business_name = String(formData.get("business_name") ?? "").trim();
  const contact_name = String(formData.get("contact_name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const whatsapp = String(formData.get("whatsapp") ?? "").replace(/\D/g, "");
  const category = String(formData.get("category") ?? "comercio") as PartnerCategory;
  const instagram =
    String(formData.get("instagram") ?? "").trim().replace(/^@/, "") || null;
  const website_url = String(formData.get("website_url") ?? "").trim() || null;
  const message = String(formData.get("message") ?? "").trim().slice(0, 1000) || null;

  if (!business_name || business_name.length > 120)
    return { ok: false, error: "Informe o nome do seu negócio." };
  if (!contact_name || contact_name.length > 120)
    return { ok: false, error: "Informe o nome do responsável." };
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    return { ok: false, error: "Informe um e-mail válido." };
  if (whatsapp.length < 10 || whatsapp.length > 13)
    return { ok: false, error: "Informe um WhatsApp válido com DDD." };
  if (!PARTNER_CATEGORIES.includes(category))
    return { ok: false, error: "Categoria inválida." };

  const sb = createAdminClient();

  // Evita flood: no máximo 1 solicitação pendente por e-mail
  const { count } = await sb
    .from("partner_applications")
    .select("id", { count: "exact", head: true })
    .eq("email", email)
    .eq("status", "pending");
  if ((count ?? 0) > 0) {
    return {
      ok: false,
      error:
        "Já recebemos uma solicitação com esse e-mail — ela está em análise. A gente entra em contato em breve!",
    };
  }

  const { error } = await sb.from("partner_applications").insert({
    business_name,
    contact_name,
    email,
    whatsapp,
    category,
    instagram,
    website_url,
    message,
  });
  if (error) {
    return {
      ok: false,
      error: "Não conseguimos enviar agora. Tente de novo em instantes.",
    };
  }

  return { ok: true };
}
