// One-shot: posta SQL migration via Supabase Management API
const PAT = process.env.SB_PAT;
const REF = process.env.SB_REF;
if (!PAT || !REF) {
  console.error("Missing SB_PAT or SB_REF env");
  process.exit(1);
}

const sql = `
create table if not exists public.customers (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  email text,
  avatar_url text,
  lifetime_points integer not null default 0,
  joined_at timestamptz not null default now()
);

create table if not exists public.cycle_events (
  id uuid primary key default gen_random_uuid(),
  customer_id uuid not null references public.customers(id) on delete cascade,
  cycles integer not null default 1 check (cycles > 0),
  points_earned integer not null default 0 check (points_earned >= 0),
  note text,
  occurred_at timestamptz not null default now(),
  created_by uuid references auth.users(id),
  created_at timestamptz not null default now()
);

create index if not exists cycle_events_customer_month_idx
  on public.cycle_events (customer_id, occurred_at desc);

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $func$
begin
  insert into public.customers (id, full_name, email, avatar_url)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'name'),
    new.email,
    new.raw_user_meta_data->>'avatar_url'
  )
  on conflict (id) do nothing;
  return new;
end;
$func$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

alter table public.customers enable row level security;
alter table public.cycle_events enable row level security;

drop policy if exists "customers_select_own" on public.customers;
create policy "customers_select_own"
  on public.customers for select
  using (auth.uid() = id);

drop policy if exists "cycle_events_select_own" on public.cycle_events;
create policy "cycle_events_select_own"
  on public.cycle_events for select
  using (auth.uid() = customer_id);
`;

const url = `https://api.supabase.com/v1/projects/${REF}/database/query`;

const res = await fetch(url, {
  method: "POST",
  headers: {
    Authorization: `Bearer ${PAT}`,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ query: sql }),
});

const text = await res.text();
console.log(`status=${res.status}`);
console.log(text.slice(0, 2000));

// Verify
const verify = await fetch(url, {
  method: "POST",
  headers: {
    Authorization: `Bearer ${PAT}`,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    query:
      "select table_name from information_schema.tables where table_schema='public' and table_name in ('customers','cycle_events') order by table_name;",
  }),
});
console.log("\n=== verify ===");
console.log(await verify.text());
