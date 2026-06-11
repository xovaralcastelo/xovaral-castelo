import { redirect } from "next/navigation";
import { PARTNER_SIGNUP_URL } from "@/lib/constants";

export const dynamic = "force-dynamic";

/**
 * O cadastro de parceiros migrou para a plataforma Mid Indoor
 * (gestão de leads e banners). O formulário interno antigo fica em
 * _components/ApplicationForm.tsx caso precise voltar.
 */
export default function CadastroParceiroPage() {
  redirect(PARTNER_SIGNUP_URL);
}
