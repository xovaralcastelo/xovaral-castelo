"use client";

import { LogOut } from "lucide-react";

export function SignOutButton() {
  return (
    <form action="/auth/sign-out" method="POST">
      <button
        type="submit"
        className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-2 text-xs font-bold text-xv-navy ring-1 ring-xv-gray-200/60 shadow-sm transition hover:bg-xv-gray-100"
        aria-label="Sair da conta"
      >
        <LogOut size={14} />
        Sair
      </button>
    </form>
  );
}
