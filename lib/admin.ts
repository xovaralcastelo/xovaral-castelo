import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { ADMIN_SECTION_OPTIONS, type StaffRole } from "@/lib/types";

// ============================================================
// Seções do painel admin (usadas como permissões granulares)
// ============================================================
export const ADMIN_SECTIONS = ADMIN_SECTION_OPTIONS;

export type AdminSectionKey = (typeof ADMIN_SECTIONS)[number]["key"];
export type AdminPermission = AdminSectionKey | "settings";

export const ALL_SECTION_KEYS: AdminSectionKey[] = ADMIN_SECTIONS.map(
  (s) => s.key,
);

export interface AdminAccess {
  role: StaffRole;
  permissions: AdminSectionKey[];
  /** true quando vem de ADMIN_EMAILS (env) — não pode ser removido pelo painel */
  isSuperAdmin: boolean;
  staffId: string | null;
  name: string | null;
}

// ============================================================
// Super-admins via env (bootstrap — sempre acesso total)
// ============================================================
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

// ============================================================
// Resolução de acesso: env super-admin OU staff_members ativo
// ============================================================
export async function getAdminAccess(
  email?: string | null,
): Promise<AdminAccess | null> {
  if (!email) return null;
  const normalized = email.toLowerCase();

  if (getAdminEmails().includes(normalized)) {
    return {
      role: "admin",
      permissions: [...ALL_SECTION_KEYS],
      isSuperAdmin: true,
      staffId: null,
      name: null,
    };
  }

  const sb = createAdminClient();
  const { data } = await sb
    .from("staff_members")
    .select("id, name, role, permissions, status")
    .eq("email", normalized)
    .eq("status", "active")
    .maybeSingle();

  if (!data) return null;

  const role = (data.role === "admin" ? "admin" : "staff") as StaffRole;
  return {
    role,
    permissions:
      role === "admin"
        ? [...ALL_SECTION_KEYS]
        : ((data.permissions ?? []) as AdminSectionKey[]).filter((p) =>
            ALL_SECTION_KEYS.includes(p),
          ),
    isSuperAdmin: false,
    staffId: data.id,
    name: data.name ?? null,
  };
}

export function can(access: AdminAccess, section: AdminPermission): boolean {
  if (section === "settings") return access.role === "admin";
  if (access.role === "admin") return true;
  return access.permissions.includes(section);
}

// ============================================================
// Guard de rotas/actions do admin
// ============================================================
export async function requireAdmin(section?: AdminPermission) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/clube-de-vantagens/entrar?next=/admin");

  const access = await getAdminAccess(user.email);
  if (!access) redirect("/minha-conta?error=forbidden");

  if (section && !can(access, section)) {
    redirect("/admin?error=sem-permissao");
  }

  return { user, access };
}
