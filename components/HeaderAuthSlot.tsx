import Link from "next/link";
import { UserCircle } from "lucide-react";
import { createClient } from "@/lib/supabase/server";

interface Props {
  variant?: "desktop" | "mobile";
}

export async function HeaderAuthSlot({ variant = "desktop" }: Props) {
  const supabaseConfigured =
    !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
    !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  let user = null;
  if (supabaseConfigured) {
    const supabase = createClient();
    const result = await supabase.auth.getUser();
    user = result.data.user;
  }

  const href = user ? "/minha-conta" : "/clube-de-vantagens/entrar";
  const label = user ? "Minha conta" : "Área cliente";

  if (variant === "mobile") {
    return (
      <Link
        href={href}
        className="flex-1 rounded-full bg-xv-navy px-4 py-2.5 text-center text-sm font-bold text-white"
      >
        {label}
      </Link>
    );
  }

  return (
    <Link
      href={href}
      className="inline-flex items-center gap-2 rounded-full bg-xv-navy px-5 py-2.5 text-sm font-bold text-white shadow-md transition hover:bg-xv-navy-light"
    >
      <UserCircle size={15} />
      {label}
    </Link>
  );
}
