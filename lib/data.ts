import { createClient } from "@/lib/supabase/server";
import { TESTIMONIALS } from "@/lib/constants";
import type { Partner, Testimonial } from "@/lib/types";

/**
 * Fetchers de conteúdo dinâmico (Supabase) com fallback para os dados
 * estáticos de constants.ts. Mantêm o site funcional mesmo sem banco.
 */

const TESTIMONIAL_FALLBACK: Testimonial[] = TESTIMONIALS.map((t, i) => ({
  id: `fallback-${i}`,
  name: t.name,
  role: t.role,
  text: t.text,
  avatar_initial: t.avatar,
  stars: t.stars,
  display_order: (i + 1) * 10,
  status: "active",
  created_at: "",
  updated_at: "",
}));

export async function getActiveTestimonials(): Promise<Testimonial[]> {
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("testimonials")
      .select("*")
      .eq("status", "active")
      .order("display_order", { ascending: true });
    if (error || !data || data.length === 0) return TESTIMONIAL_FALLBACK;
    return data as Testimonial[];
  } catch {
    return TESTIMONIAL_FALLBACK;
  }
}

export async function getActivePartners(): Promise<Partner[]> {
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("partners")
      .select("*")
      .eq("status", "active")
      .order("display_order", { ascending: true });
    if (error || !data) return [];
    return data as Partner[];
  } catch {
    return [];
  }
}
