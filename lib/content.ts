import { createClient } from "@/lib/supabase/server";

/**
 * Fallback values pro caso do banco estar offline ou key inexistente.
 * Mantém o site funcional mesmo sem Supabase.
 */
const FALLBACKS: Record<string, string> = {
  // Hero
  "hero.kicker":                       "Aberto agora · 24 horas",
  "hero.headline_pre":                 "Lave e seque suas roupas em",
  "hero.headline_highlight":           "até 1 hora",
  "hero.headline_post":                "com praticidade e conforto.",
  "hero.subtitle":                     "Na Xô Varal Castelo você chega, escolhe a máquina, paga pelo app ou totem, e vai embora com tudo pronto. Sem fila. Sem burocracia.",
  "hero.image_url":                    "/images/previas-2.jpg",

  // UnitDifferentials
  "unit_diff.kicker":                  "A unidade do Castelo",
  "unit_diff.headline_pre":            "Não é a lavanderia que você imagina.",
  "unit_diff.headline_highlight":      "É muito melhor.",
  "unit_diff.subtitle":                "Pensamos cada detalhe pra você usar o tempo da lavagem como quiser: trabalhar, relaxar, levar as crianças ou simplesmente respirar.",
  "unit_diff.photo_bistro_url":        "/images/ambiente-bistro.jpg",
  "unit_diff.photo_bistro_title":      "Bistrô com Wi-Fi",
  "unit_diff.photo_bistro_desc":       "Trabalhe, descanse ou tome um café enquanto a roupa lava.",
  "unit_diff.photo_kids_url":          "/images/area-kids.jpg",
  "unit_diff.photo_kids_title":        "Área kids",
  "unit_diff.photo_kids_desc":         "Espaço seguro pra criançada brincar enquanto você resolve a semana.",
  "unit_diff.photo_machines_url":      "/images/hero-maquinas-frente.jpg",
  "unit_diff.photo_machines_title":    "Equipamentos SpeedQueen",
  "unit_diff.photo_machines_desc":     "Máquinas profissionais americanas de 10,5 kg — as melhores do mercado.",
  "unit_diff.customers_count":         "470+",
  "unit_diff.customers_label":         "Clientes ativos",

  // ClubHighlight
  "club_highlight.tagline_prefix":     "Quanto mais você usa,",
  "club_highlight.tagline_highlight":  "mais vantagens",
  "club_highlight.tagline_suffix":     "você ganha!",

  // LocationBlock
  "location.kicker":                   "Visite a unidade",
  "location.headline":                 "Estamos pertinho de você.",
  "location.subtitle":                 "No Comercial JL Mall, no coração do Castelo. Vaga exclusiva de estacionamento na porta — você nem precisa procurar onde estacionar. E o melhor: estamos abertos a qualquer hora.",
  "location.fachada_url":              "/images/fachada-externa.jpg",
  "location.badge_24h":                "Aberta 24h · todos os dias",
};

export type ContentKey = keyof typeof FALLBACKS | (string & {});

export const ALL_CONTENT_KEYS = Object.keys(FALLBACKS) as ContentKey[];

/**
 * Busca várias keys em uma única query.
 * Sempre retorna um objeto com TODAS as keys solicitadas (banco ou fallback).
 */
export async function getContentMap(
  keys: readonly string[] = ALL_CONTENT_KEYS,
): Promise<Record<string, string>> {
  const out: Record<string, string> = {};
  for (const k of keys) out[k] = FALLBACKS[k] ?? "";

  try {
    const supabase = createClient();
    const { data } = await supabase
      .from("content_blocks")
      .select("key, value")
      .in("key", keys as string[]);
    for (const row of data ?? []) {
      const value = (row as { key: string; value: string }).value;
      if (value && value.trim() !== "") {
        out[(row as { key: string }).key] = value;
      }
    }
  } catch {
    // Supabase offline / não configurado — retorna apenas fallbacks
  }
  return out;
}
