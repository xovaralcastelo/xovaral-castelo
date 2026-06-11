// Migration 4 — staff_members (equipe do painel admin com permissões)
const PAT = process.env.SB_PAT;
const REF = process.env.SB_REF;
if (!PAT || !REF) {
  console.error("Missing SB_PAT or SB_REF env");
  process.exit(1);
}

const sql = `
-- ============================================================
-- STAFF_MEMBERS (colaboradores com acesso ao /admin)
-- Acesso só via service role (RLS sem policies = negado a anon/auth)
-- ============================================================
create table if not exists public.staff_members (
  id            uuid primary key default gen_random_uuid(),
  email         text not null unique,
  name          text not null,
  role          text not null default 'staff'
    check (role in ('admin','staff')),
  permissions   text[] not null default '{}',
  status        text not null default 'active'
    check (status in ('active','inactive')),
  created_by    uuid references auth.users(id),
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

create index if not exists staff_members_email_idx
  on public.staff_members (email) where status='active';

alter table public.staff_members enable row level security;

drop trigger if exists staff_members_touch on public.staff_members;
create trigger staff_members_touch before update on public.staff_members
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
      "select column_name, data_type from information_schema.columns where table_name='staff_members' order by ordinal_position;",
  }),
});
console.log("\n=== colunas staff_members ===");
console.log(await verify.text());
