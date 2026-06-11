import { requireAdmin, can, ADMIN_SECTIONS } from "@/lib/admin";
import { AdminNav } from "./_components/AdminNav";

export const dynamic = "force-dynamic";
export const metadata = {
  title: "Admin · Xô Varal Castelo",
  robots: { index: false, follow: false },
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, access } = await requireAdmin();

  const sections: string[] = ADMIN_SECTIONS.map((s) => s.key).filter((key) =>
    can(access, key),
  );
  if (can(access, "settings")) sections.push("settings");

  return (
    <div className="min-h-screen bg-xv-gray-50">
      <AdminNav
        sections={sections}
        email={user.email ?? ""}
        roleLabel={access.role === "admin" ? "Administrador" : "Colaborador"}
      />
      <main className="md:ml-60 px-4 pb-8 pt-[4.5rem] md:p-8">{children}</main>
    </div>
  );
}
