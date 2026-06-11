import Link from "next/link";
import {
  LayoutDashboard,
  Package,
  Users,
  Gift,
  ExternalLink,
  FileText,
  MessageSquareQuote,
  Handshake,
  Settings,
  type LucideIcon,
} from "lucide-react";
import { requireAdmin, can, type AdminPermission } from "@/lib/admin";

export const dynamic = "force-dynamic";
export const metadata = {
  title: "Admin · Xô Varal Castelo",
  robots: { index: false, follow: false },
};

const NAV: { href: string; label: string; icon: LucideIcon; section: AdminPermission | null }[] = [
  { href: "/admin", label: "Painel", icon: LayoutDashboard, section: null },
  { href: "/admin/content", label: "Conteúdo do site", icon: FileText, section: "content" },
  { href: "/admin/testimonials", label: "Depoimentos", icon: MessageSquareQuote, section: "testimonials" },
  { href: "/admin/partners", label: "Parceiros", icon: Handshake, section: "partners" },
  { href: "/admin/products", label: "Produtos", icon: Package, section: "products" },
  { href: "/admin/customers", label: "Clientes", icon: Users, section: "customers" },
  { href: "/admin/redemptions", label: "Resgates", icon: Gift, section: "redemptions" },
  { href: "/admin/settings", label: "Configurações", icon: Settings, section: "settings" },
];

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, access } = await requireAdmin();

  const nav = NAV.filter(
    (item) => item.section === null || can(access, item.section),
  );

  return (
    <div className="min-h-screen bg-xv-gray-50">
      <aside className="fixed inset-y-0 left-0 z-50 w-60 bg-xv-navy text-white p-6 flex flex-col gap-1 overflow-y-auto">
        <Link
          href="/admin"
          className="font-display text-lg mb-6 hover:opacity-80"
        >
          Admin · Xô Varal
        </Link>

        {nav.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className="flex items-center gap-3 hover:bg-white/10 px-3 py-2 rounded-lg text-sm font-bold"
          >
            <Icon size={16} />
            {label}
          </Link>
        ))}

        <div className="mt-6 border-t border-white/10 pt-4">
          <Link
            href="/"
            className="flex items-center gap-2 text-xs text-white/60 hover:text-white px-3 py-2"
          >
            <ExternalLink size={12} />
            Voltar ao site
          </Link>
          <form action="/auth/sign-out" method="POST" className="px-3 py-2">
            <button
              type="submit"
              className="text-xs text-white/60 hover:text-white"
            >
              Sair
            </button>
          </form>
        </div>

        <div className="mt-auto text-xs text-white/40">
          <p className="break-all">{user.email}</p>
          <p className="mt-1 font-bold uppercase tracking-wider text-white/30">
            {access.role === "admin" ? "Administrador" : "Colaborador"}
          </p>
        </div>
      </aside>
      <main className="ml-60 p-8">{children}</main>
    </div>
  );
}
