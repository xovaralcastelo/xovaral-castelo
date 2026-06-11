/**
 * Schema do CMS de textos/imagens editáveis (content_blocks).
 * Módulo puro (sem imports server) — pode ser usado no admin (client) e no server.
 * As keys batem com as de lib/content.ts.
 */

export type ContentFieldType = "text" | "textarea" | "image";

export interface ContentField {
  key: string;
  label: string;
  type: ContentFieldType;
  hint?: string;
}

export interface ContentGroup {
  title: string;
  description: string;
  fields: ContentField[];
}

export const CONTENT_GROUPS: ContentGroup[] = [
  {
    title: "Topo da página (Hero)",
    description: "Primeira dobra do site — a primeira coisa que o visitante vê.",
    fields: [
      { key: "hero.kicker", label: "Selo (acima do título)", type: "text" },
      { key: "hero.headline_pre", label: "Título — início", type: "text" },
      { key: "hero.headline_highlight", label: "Título — destaque (laranja)", type: "text" },
      { key: "hero.headline_post", label: "Título — final", type: "text" },
      { key: "hero.subtitle", label: "Subtítulo", type: "textarea" },
      { key: "hero.image_url", label: "Imagem principal", type: "image", hint: "Caminho em /images ou URL completa" },
    ],
  },
  {
    title: "Diferenciais da unidade",
    description: "Seção azul-escura com as 3 fotos e os números.",
    fields: [
      { key: "unit_diff.kicker", label: "Selo", type: "text" },
      { key: "unit_diff.headline_pre", label: "Título — início", type: "text" },
      { key: "unit_diff.headline_highlight", label: "Título — destaque (laranja)", type: "text" },
      { key: "unit_diff.subtitle", label: "Subtítulo", type: "textarea" },
      { key: "unit_diff.photo_bistro_url", label: "Foto 1 — imagem", type: "image" },
      { key: "unit_diff.photo_bistro_title", label: "Foto 1 — título", type: "text" },
      { key: "unit_diff.photo_bistro_desc", label: "Foto 1 — descrição", type: "textarea" },
      { key: "unit_diff.photo_kids_url", label: "Foto 2 — imagem", type: "image" },
      { key: "unit_diff.photo_kids_title", label: "Foto 2 — título", type: "text" },
      { key: "unit_diff.photo_kids_desc", label: "Foto 2 — descrição", type: "textarea" },
      { key: "unit_diff.photo_machines_url", label: "Foto 3 — imagem", type: "image" },
      { key: "unit_diff.photo_machines_title", label: "Foto 3 — título", type: "text" },
      { key: "unit_diff.photo_machines_desc", label: "Foto 3 — descrição", type: "textarea" },
      { key: "unit_diff.customers_count", label: "Número de clientes", type: "text", hint: "Ex: 470+" },
      { key: "unit_diff.customers_label", label: "Rótulo do número", type: "text" },
    ],
  },
  {
    title: "Clube de Vantagens (chamada)",
    description: "Frase da seção do clube na home.",
    fields: [
      { key: "club_highlight.tagline_prefix", label: "Frase — início", type: "text" },
      { key: "club_highlight.tagline_highlight", label: "Frase — destaque", type: "text" },
      { key: "club_highlight.tagline_suffix", label: "Frase — final", type: "text" },
    ],
  },
  {
    title: "Localização",
    description: "Bloco do mapa e endereço.",
    fields: [
      { key: "location.kicker", label: "Selo", type: "text" },
      { key: "location.headline", label: "Título", type: "text" },
      { key: "location.subtitle", label: "Texto", type: "textarea" },
      { key: "location.fachada_url", label: "Foto da fachada", type: "image" },
      { key: "location.badge_24h", label: "Selo 24h (sobre a foto)", type: "text" },
    ],
  },
];

export const ALL_SCHEMA_KEYS: string[] = CONTENT_GROUPS.flatMap((g) =>
  g.fields.map((f) => f.key),
);
