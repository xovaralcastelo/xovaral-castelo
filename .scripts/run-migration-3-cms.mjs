// Migration 3 — partners + content_blocks + testimonials + seed
const PAT = process.env.SB_PAT;
const REF = process.env.SB_REF;
if (!PAT || !REF) {
  console.error("Missing SB_PAT or SB_REF env");
  process.exit(1);
}

const sql = `
-- ============================================================
-- PARTNERS
-- ============================================================
create table if not exists public.partners (
  id              uuid primary key default gen_random_uuid(),
  slug            text not null unique,
  name            text not null,
  category        text not null default 'comercio'
    check (category in ('academia','restaurante','condominio','faculdade','salao','servico','comercio','outro')),
  description     text,
  logo_url        text,
  website_url     text,
  whatsapp        text,
  benefit_text    text,
  status          text not null default 'draft'
    check (status in ('active','draft','archived')),
  display_order   integer not null default 0,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

create index if not exists partners_active_idx
  on public.partners (status, display_order) where status='active';

alter table public.partners enable row level security;
drop policy if exists "partners_select_active" on public.partners;
create policy "partners_select_active"
  on public.partners for select using (status='active');

drop trigger if exists partners_touch on public.partners;
create trigger partners_touch before update on public.partners
  for each row execute function public.tg_touch_updated_at();

-- ============================================================
-- CONTENT_BLOCKS  (CMS de textos/imagens editaveis)
-- ============================================================
create table if not exists public.content_blocks (
  key         text primary key,
  value       text not null default '',
  updated_at  timestamptz not null default now(),
  updated_by  uuid references auth.users(id)
);

alter table public.content_blocks enable row level security;
drop policy if exists "content_blocks_select_all" on public.content_blocks;
create policy "content_blocks_select_all"
  on public.content_blocks for select using (true);

drop trigger if exists content_blocks_touch on public.content_blocks;
create trigger content_blocks_touch before update on public.content_blocks
  for each row execute function public.tg_touch_updated_at();

-- ============================================================
-- TESTIMONIALS
-- ============================================================
create table if not exists public.testimonials (
  id              uuid primary key default gen_random_uuid(),
  name            text not null,
  role            text not null,
  text            text not null,
  avatar_initial  text,
  stars           integer not null default 5 check (stars between 1 and 5),
  display_order   integer not null default 0,
  status          text not null default 'active'
    check (status in ('active','draft','archived')),
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

create index if not exists testimonials_active_idx
  on public.testimonials (status, display_order) where status='active';

alter table public.testimonials enable row level security;
drop policy if exists "testimonials_select_active" on public.testimonials;
create policy "testimonials_select_active"
  on public.testimonials for select using (status='active');

drop trigger if exists testimonials_touch on public.testimonials;
create trigger testimonials_touch before update on public.testimonials
  for each row execute function public.tg_touch_updated_at();

-- ============================================================
-- SEED testimonials (6 reviews atuais)
-- ============================================================
insert into public.testimonials (name, role, text, avatar_initial, stars, display_order, status) values
('Marina Sales',          'Médica plantonista — Hospital Mater Dei',     'Trabalho em escala — saio de plantão às 3 da manhã morta de cansada. Saber que a Xô Varal tá aberta 24h salvou minha rotina. Lavo a roupa do jeito que cabe na MINHA agenda.', 'M', 5, 10, 'active'),
('Thiago Resende',        'Engenheiro civil — Castelo',                  'Edredom de casal, manta do sofá, roupa de cama do casal das crianças. Sai uma carga só dessas e em 1h tá lavado e seco. Em casa eu levava 2 dias com sol forte.',                'T', 5, 20, 'active'),
('Camila Rocha',          'Designer freelancer',                          'Levo o notebook, peço café no bistrô e adianto trabalho enquanto a máquina roda. Wi-Fi rápido, ambiente silencioso, ar-condicionado. Virou meu coworking improvisado nos sábados.', 'C', 5, 30, 'active'),
('Eduardo Andrade',       'Aposentado — morador do Castelo há 22 anos',  'Tô na Xô Varal desde a inauguração. Tô no Ouro do clube — 15% de desconto automático que vejo no totem. Sem complicação, sem app pra baixar, sem cadastro chato. Funciona.', 'E', 5, 40, 'active'),
('Letícia Vasconcellos',  'Mãe de gêmeos de 4 anos',                     'Vinha pra cá em desespero com a montanha de roupa. Hoje é o melhor programa nosso: eles ficam na área kids, eu termino tudo numa hora, paramos no bistrô e voltamos pra casa em paz.', 'L', 5, 50, 'active'),
('Rafael Coutinho',       'Personal trainer — academia do Castelo',      'Treino 5 dias por semana, então é roupa suja todo dia. Passo aqui depois do último horário, deixo no totem, busco no dia seguinte. Vou indo pro Diamante.',                    'R', 5, 60, 'active')
on conflict do nothing;

-- ============================================================
-- SEED content_blocks (todos com os valores atuais)
-- ============================================================
insert into public.content_blocks (key, value) values
('hero.kicker',                       'Aberto agora · 24 horas'),
('hero.headline_pre',                 'Lave e seque suas roupas em'),
('hero.headline_highlight',           'até 1 hora'),
('hero.headline_post',                'com praticidade e conforto.'),
('hero.subtitle',                     'Na Xô Varal Castelo você chega, escolhe a máquina, paga pelo app ou totem, e vai embora com tudo pronto. Sem fila. Sem burocracia.'),
('hero.image_url',                    '/images/previas-2.jpg'),
('unit_diff.kicker',                  'A unidade do Castelo'),
('unit_diff.headline_pre',            'Não é a lavanderia que você imagina.'),
('unit_diff.headline_highlight',      'É muito melhor.'),
('unit_diff.subtitle',                'Pensamos cada detalhe pra você usar o tempo da lavagem como quiser: trabalhar, relaxar, levar as crianças ou simplesmente respirar.'),
('unit_diff.photo_bistro_url',        '/images/ambiente-bistro.jpg'),
('unit_diff.photo_bistro_title',      'Bistrô com Wi-Fi'),
('unit_diff.photo_bistro_desc',       'Trabalhe, descanse ou tome um café enquanto a roupa lava.'),
('unit_diff.photo_kids_url',          '/images/area-kids.jpg'),
('unit_diff.photo_kids_title',        'Área kids'),
('unit_diff.photo_kids_desc',         'Espaço seguro pra criançada brincar enquanto você resolve a semana.'),
('unit_diff.photo_machines_url',      '/images/hero-maquinas-frente.jpg'),
('unit_diff.photo_machines_title',    'Equipamentos SpeedQueen'),
('unit_diff.photo_machines_desc',     'Máquinas profissionais americanas de 10,5 kg — as melhores do mercado.'),
('unit_diff.customers_count',         '470+'),
('unit_diff.customers_label',         'Clientes ativos'),
('club_highlight.tagline_prefix',     'Quanto mais você usa,'),
('club_highlight.tagline_highlight',  'mais vantagens'),
('club_highlight.tagline_suffix',     'você ganha!'),
('location.kicker',                   'Visite a unidade'),
('location.headline',                 'Estamos pertinho de você.'),
('location.subtitle',                 'No Comercial JL Mall, no coração do Castelo. Vaga exclusiva de estacionamento na porta — você nem precisa procurar onde estacionar. E o melhor: estamos abertos a qualquer hora.'),
('location.fachada_url',              '/images/fachada-externa.jpg'),
('location.badge_24h',                'Aberta 24h · todos os dias')
on conflict (key) do nothing;
`;

const url = `https://api.supabase.com/v1/projects/${REF}/database/query`;

const res = await fetch(url, {
  method: "POST",
  headers: { Authorization: `Bearer ${PAT}`, "Content-Type": "application/json" },
  body: JSON.stringify({ query: sql }),
});
const text = await res.text();
console.log(`migration status=${res.status}`);
console.log(text.slice(0, 800));

const verify = await fetch(url, {
  method: "POST",
  headers: { Authorization: `Bearer ${PAT}`, "Content-Type": "application/json" },
  body: JSON.stringify({
    query:
      "select 'partners' tbl, count(*)::int n from public.partners union all select 'content_blocks', count(*)::int from public.content_blocks union all select 'testimonials', count(*)::int from public.testimonials order by tbl;",
  }),
});
console.log("\n=== contagens pós-seed ===");
console.log(await verify.text());
