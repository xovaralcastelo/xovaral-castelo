// Migration 6 — partner_promos (promoções dos parceiros no Clube de Benefícios)
const PAT = process.env.SB_PAT;
const REF = process.env.SB_REF;
if (!PAT || !REF) {
  console.error("Missing SB_PAT or SB_REF env");
  process.exit(1);
}

const sql = `
-- ============================================================
-- PARTNER_PROMOS (banners de promoção dos parceiros)
-- ============================================================
create table if not exists public.partner_promos (
  id              uuid primary key default gen_random_uuid(),
  slug            text not null unique,
  title           text not null,
  partner_name    text not null,
  banner_url      text not null,
  summary         text,
  details         text,
  conditions      text,
  cta_label       text,
  cta_url         text,
  status          text not null default 'draft'
    check (status in ('active','draft','archived')),
  display_order   integer not null default 0,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

create index if not exists partner_promos_active_idx
  on public.partner_promos (status, display_order) where status='active';

alter table public.partner_promos enable row level security;
drop policy if exists "partner_promos_select_active" on public.partner_promos;
create policy "partner_promos_select_active"
  on public.partner_promos for select using (status='active');

drop trigger if exists partner_promos_touch on public.partner_promos;
create trigger partner_promos_touch before update on public.partner_promos
  for each row execute function public.tg_touch_updated_at();

-- ============================================================
-- SEED — promoção Algaroba "Dia de Jogo"
-- ============================================================
insert into public.partner_promos
  (slug, title, partner_name, banner_url, summary, details, conditions, cta_label, cta_url, status, display_order)
values (
  'algaroba-dia-de-jogo',
  'Dia de jogo? A cada gol do Brasil, você ganha 1 chopp no Algaroba!',
  'Algaroba Assados e Defumados',
  '/images/promos/algaroba-dia-de-jogo.jpg',
  'Em dia de jogo da Seleção, cada gol do Brasil vale 1 chopp para quem estiver no Algaroba.',
  E'Fizemos uma parceria com o Algaroba Assados e Defumados, nosso vizinho aqui do Castelo, pra deixar o dia de jogo da Seleção Brasileira ainda melhor.\\n\\nFunciona assim: você deixa as roupas lavando na Xô Varal (o ciclo completo leva até 90 minutos) e atravessa pro Algaroba pra torcer. A cada gol que o Brasil fizer durante o jogo, todos que estiverem no Algaroba ganham 1 chopp na hora.\\n\\nRoupa limpa, Brasil na TV e chopp gelado a cada gol — vizinhos parceiros dentro e fora do jogo.',
  'Válido apenas em dias de jogo da Seleção Brasileira. O chopp é concedido a cada gol do Brasil, para quem estiver no Algaroba no momento do gol. Consulte as condições completas no Algaroba.',
  'Chamar o Algaroba no WhatsApp',
  null,
  'active',
  10
)
on conflict (slug) do nothing;
`;

const url = `https://api.supabase.com/v1/projects/${REF}/database/query`;

const res = await fetch(url, {
  method: "POST",
  headers: { Authorization: `Bearer ${PAT}`, "Content-Type": "application/json" },
  body: JSON.stringify({ query: sql }),
});
console.log(`migration status=${res.status}`);
console.log((await res.text()).slice(0, 800));

const verify = await fetch(url, {
  method: "POST",
  headers: { Authorization: `Bearer ${PAT}`, "Content-Type": "application/json" },
  body: JSON.stringify({
    query: "select slug, status from public.partner_promos;",
  }),
});
console.log("\n=== promos ===");
console.log(await verify.text());
