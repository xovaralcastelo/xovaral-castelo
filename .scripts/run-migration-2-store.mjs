// Migration 2 — products + redemptions + RPC + RLS + seed
const PAT = process.env.SB_PAT;
const REF = process.env.SB_REF;
if (!PAT || !REF) {
  console.error("Missing SB_PAT or SB_REF env");
  process.exit(1);
}

const sql = `
-- ============================================================
-- PRODUCTS
-- ============================================================
create table if not exists public.products (
  id              uuid primary key default gen_random_uuid(),
  slug            text not null unique,
  name            text not null,
  description     text,
  image_url       text,
  category        text not null default 'brinde'
    check (category in ('brinde','voucher','parceiro','outro')),
  points_cost     integer check (points_cost is null or points_cost > 0),
  money_price_cents integer check (money_price_cents is null or money_price_cents > 0),
  fulfillment_type text not null default 'pickup'
    check (fulfillment_type in ('voucher','pickup')),
  stock           integer check (stock is null or stock >= 0),
  status          text not null default 'draft'
    check (status in ('active','draft','archived')),
  display_order   integer not null default 0,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now(),
  constraint products_has_price
    check (points_cost is not null or money_price_cents is not null)
);

create index if not exists products_active_idx
  on public.products (status, display_order) where status = 'active';

-- ============================================================
-- REDEMPTIONS
-- ============================================================
create table if not exists public.redemptions (
  id            uuid primary key default gen_random_uuid(),
  customer_id   uuid not null references public.customers(id) on delete restrict,
  product_id    uuid not null references public.products(id) on delete restrict,
  points_spent  integer not null check (points_spent > 0),
  voucher_code  text,
  status        text not null default 'pending'
    check (status in ('pending','fulfilled','cancelled')),
  note          text,
  created_at    timestamptz not null default now(),
  fulfilled_at  timestamptz,
  fulfilled_by  uuid references auth.users(id)
);

create index if not exists redemptions_customer_idx
  on public.redemptions (customer_id, created_at desc);
create index if not exists redemptions_status_idx
  on public.redemptions (status, created_at desc);

-- ============================================================
-- RPC: resgate atômico
-- ============================================================
create or replace function public.fn_redeem_product(p_product_id uuid)
returns public.redemptions
language plpgsql
security definer
set search_path = public
as $func$
declare
  v_user_id  uuid := auth.uid();
  v_product  public.products%rowtype;
  v_balance  integer;
  v_voucher  text;
  v_row      public.redemptions%rowtype;
begin
  if v_user_id is null then
    raise exception 'not_authenticated';
  end if;

  select * into v_product from public.products
    where id = p_product_id for update;
  if not found then raise exception 'product_not_found'; end if;
  if v_product.status <> 'active' then raise exception 'product_inactive'; end if;
  if v_product.points_cost is null then raise exception 'product_not_redeemable'; end if;
  if v_product.stock is not null and v_product.stock <= 0 then
    raise exception 'product_out_of_stock';
  end if;

  select lifetime_points into v_balance from public.customers
    where id = v_user_id for update;
  if v_balance is null or v_balance < v_product.points_cost then
    raise exception 'insufficient_points';
  end if;

  if v_product.fulfillment_type = 'voucher' then
    v_voucher := 'XV-' ||
      upper(substring(md5(random()::text || clock_timestamp()::text), 1, 4)) || '-' ||
      upper(substring(md5(random()::text || clock_timestamp()::text), 1, 4));
  end if;

  update public.customers
    set lifetime_points = lifetime_points - v_product.points_cost
    where id = v_user_id;

  if v_product.stock is not null then
    update public.products set stock = stock - 1 where id = p_product_id;
  end if;

  insert into public.redemptions
    (customer_id, product_id, points_spent, voucher_code, status, fulfilled_at)
  values
    (v_user_id, p_product_id, v_product.points_cost, v_voucher,
     case when v_product.fulfillment_type = 'voucher' then 'fulfilled' else 'pending' end,
     case when v_product.fulfillment_type = 'voucher' then now() else null end)
  returning * into v_row;

  return v_row;
end;
$func$;

revoke all on function public.fn_redeem_product(uuid) from public;
grant execute on function public.fn_redeem_product(uuid) to authenticated;

-- ============================================================
-- RLS
-- ============================================================
alter table public.products    enable row level security;
alter table public.redemptions enable row level security;

drop policy if exists "products_select_active" on public.products;
create policy "products_select_active"
  on public.products for select using (status = 'active');

drop policy if exists "redemptions_select_own" on public.redemptions;
create policy "redemptions_select_own"
  on public.redemptions for select using (auth.uid() = customer_id);

-- ============================================================
-- Touch updated_at trigger
-- ============================================================
create or replace function public.tg_touch_updated_at()
returns trigger language plpgsql as $$
begin new.updated_at := now(); return new; end $$;

drop trigger if exists products_touch on public.products;
create trigger products_touch before update on public.products
  for each row execute function public.tg_touch_updated_at();

-- ============================================================
-- SEED: 3 produtos pra Store ter conteúdo no primeiro deploy
-- ============================================================
insert into public.products
  (slug, name, description, image_url, category, points_cost, money_price_cents, fulfillment_type, stock, status, display_order)
values
  ('voucher-1-ciclo-gratis',
   'Voucher 1 ciclo grátis',
   'Vale 1 ciclo completo (lavagem + secagem). Apresente o código no totem da loja na sua próxima visita. Válido por 60 dias.',
   'https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?w=600&q=80',
   'voucher', 300, 1700, 'voucher', null, 'active', 10),
  ('camiseta-xo-varal',
   'Camiseta oficial Xô Varal',
   'Camiseta 100% algodão com a estampa oficial Xô Varal Castelo. Disponível em P, M e G (especifique no WhatsApp ao retirar). Edição limitada.',
   'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&q=80',
   'brinde', 1500, 4900, 'pickup', 20, 'active', 20),
  ('combo-bistro-cafe-bolo',
   'Combo bistrô: café + bolo',
   'Café especial coado na hora + uma fatia de bolo do dia. Resgate enquanto sua roupa lava. Servido no bistrô da unidade.',
   'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&q=80',
   'parceiro', 200, 1200, 'pickup', null, 'active', 30)
on conflict (slug) do nothing;
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

// Verify
const verify = await fetch(url, {
  method: "POST",
  headers: { Authorization: `Bearer ${PAT}`, "Content-Type": "application/json" },
  body: JSON.stringify({
    query:
      "select table_name from information_schema.tables where table_schema='public' and table_name in ('products','redemptions') order by table_name; select count(*) as seed_products from public.products where status='active';",
  }),
});
console.log("\n=== verify tables + seed ===");
console.log(await verify.text());
