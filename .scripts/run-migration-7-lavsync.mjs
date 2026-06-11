// Migration 7 — integração LavSync: CPF no customer + fila de eventos
const PAT = process.env.SB_PAT;
const REF = process.env.SB_REF;
if (!PAT || !REF) {
  console.error("Missing SB_PAT or SB_REF env");
  process.exit(1);
}

const sql = `
-- ============================================================
-- CPF no customer (chave de vínculo com o LavSync; só dígitos)
-- ============================================================
alter table public.customers add column if not exists cpf text;

create unique index if not exists customers_cpf_key
  on public.customers (cpf) where cpf is not null;

-- ============================================================
-- LAVSYNC_EVENTS — eventos recebidos via webhook.
-- Guardamos TODOS (mesmo sem cliente vinculado ainda); quando o
-- cliente vincular o CPF, os pendentes são aplicados retroativamente.
-- event_id único garante idempotência (retries do LavSync são seguros).
-- ============================================================
create table if not exists public.lavsync_events (
  id            uuid primary key default gen_random_uuid(),
  event_id      text not null unique,
  cpf           text not null,
  cycles        integer not null default 0 check (cycles >= 0),
  points        integer not null default 0 check (points >= 0),
  amount_cents  integer,
  occurred_at   timestamptz not null default now(),
  raw           jsonb,
  customer_id   uuid references public.customers(id) on delete set null,
  applied_at    timestamptz,
  created_at    timestamptz not null default now()
);

create index if not exists lavsync_events_pending_idx
  on public.lavsync_events (cpf) where applied_at is null;

alter table public.lavsync_events enable row level security;
`;

const url = `https://api.supabase.com/v1/projects/${REF}/database/query`;

const res = await fetch(url, {
  method: "POST",
  headers: { Authorization: `Bearer ${PAT}`, "Content-Type": "application/json" },
  body: JSON.stringify({ query: sql }),
});
console.log(`migration status=${res.status}`);
console.log((await res.text()).slice(0, 600));

const verify = await fetch(url, {
  method: "POST",
  headers: { Authorization: `Bearer ${PAT}`, "Content-Type": "application/json" },
  body: JSON.stringify({
    query:
      "select (select count(*) from information_schema.columns where table_name='lavsync_events')::int as lavsync_cols, (select count(*) from information_schema.columns where table_name='customers' and column_name='cpf')::int as cpf_col;",
  }),
});
console.log("\n=== verificação ===");
console.log(await verify.text());
