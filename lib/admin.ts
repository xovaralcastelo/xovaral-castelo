import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export function getAdminEmails(): string[] {
  return (process.env.ADMIN_EMAILS ?? "")
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
}

export function isAdminEmail(email?: string | null): boolean {
  if (!email) return false;
  return getAdminEmails().includes(email.toLowerCase());
}

export async function requireAdmin() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/clube-de-vantagens/entrar?next=/admin");
  if (!isAdminEmail(user.email)) redirect("/minha-conta?error=forbidden");
  return user;
}
