import { requireAdmin } from "@/lib/admin";

export default async function SectionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireAdmin("categories");
  return <>{children}</>;
}
