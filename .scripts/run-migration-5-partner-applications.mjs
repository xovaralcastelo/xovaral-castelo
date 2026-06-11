// Migration 5 — partner_applications (formulário público "seja parceiro")
const PAT = process.env.SB_PAT;
const REF = process.env.SB_REF;
if (!PAT || !REF) {
  console.error("Missing SB_PAT or SB_REF env");
  process.exit(1);
}

const sql = `
-- ============================================================
-- PARTNER_APPLICATIONS (solicitações de parceria vindas do site)
-- Escrita/leitura só via service role (RLS sem policies)
-- ============================================================
create table if not exists public.partner_applications (
  id              uuid primary key default gen_random_uuid(),
  business_name   text not null,
  contact_name    text not null,
  email           text not null,
  whatsapp        text not null,
  category        text not null default 'comercio'
    check (category in ('academia','restaurante','condominio','faculdade','salao','servico','comercio','outro')),
  instagram       text,
  website_url     text,
  message         text,
  status          text not null default 'pending'
    check (status in ('pending','approved','rejected')),
  reviewed_by     uuid references auth.users(id),
  reviewed_at     timestamptz,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

create index if not exists partner_applications_pending_idx
  on public.partner_applications (status, created_at desc);

alter table public.partner_applications enable row level security;

drop trigger if exists partner_applications_touch on public.partner_applications;
create trigger partner_applications_touch before update on public.partner_applications
  for each row execute function public.tg_touch_updated_at();
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
      "select count(*)::int as cols from information_schema.columns where table_name='partner_applications';",
  }),
});
console.log("\n=== verificação ===");
console.log(await verify.text());
