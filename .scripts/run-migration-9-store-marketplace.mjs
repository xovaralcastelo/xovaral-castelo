// Migration 9 — Store Xô Varal (marketplace):
//   1.  store_settings      — cotação do ponto, frete, mínimos (linha única)
//   2.  product_categories  — categorias administráveis
//   3.  products            — campos de marketplace (SKU, galeria, destaque, busca)
//   4.  product_images      — galeria por produto
//   5.  product_variants    — variações (tamanho/cor) com estoque próprio
//   6.  orders / order_items— pedidos com pagamento híbrido (pontos + R$)
//   7.  points_ledger       — extrato auditável da carteira de pontos
//   8.  RPCs                — fn_create_order / fn_confirm_order_payment / fn_cancel_order
//   9.  RLS + storage       — políticas e bucket product-images
const PAT = process.env.SB_PAT;
const REF = process.env.SB_REF;
if (!PAT || !REF) {
  console.error("Missing SB_PAT or SB_REF env");
  process.exit(1);
}

const sql = `
-- ============================================================
-- 1. STORE SETTINGS (linha única — id fixo true)
-- ============================================================
create table if not exists public.store_settings (
  id                      boolean primary key default true check (id),
  point_value_cents       integer not null default 5   check (point_value_cents > 0),
  delivery_enabled        boolean not null default true,
  delivery_fee_cents      integer not null default 1000 check (delivery_fee_cents >= 0),
  free_delivery_above_cents integer check (free_delivery_above_cents is null or free_delivery_above_cents > 0),
  delivery_note           text,
  pickup_enabled          boolean not null default true,
  pickup_note             text,
  -- Mercado Pago não cobra valores irrisórios: se o restante em dinheiro cair
  -- abaixo disso, o checkout obriga o cliente a usar menos pontos ou fechar 100% em pontos.
  min_money_cents         integer not null default 100 check (min_money_cents >= 0),
  updated_at              timestamptz not null default now(),
  updated_by              uuid references auth.users(id)
);

insert into public.store_settings (id) values (true) on conflict (id) do nothing;

-- ============================================================
-- 2. PRODUCT CATEGORIES
-- ============================================================
create table if not exists public.product_categories (
  id            uuid primary key default gen_random_uuid(),
  slug          text not null unique,
  name          text not null,
  description   text,
  image_url     text,
  display_order integer not null default 0,
  status        text not null default 'active'
    check (status in ('active','draft','archived')),
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

create index if not exists product_categories_active_idx
  on public.product_categories (status, display_order);

-- Semeia as categorias equivalentes ao enum antigo, para migrar os produtos existentes.
insert into public.product_categories (slug, name, display_order, status) values
  ('brindes',   'Brindes',            10, 'active'),
  ('vouchers',  'Vouchers',           20, 'active'),
  ('parceiros', 'Benefícios parceiros',30, 'active'),
  ('outros',    'Outros',             90, 'active')
on conflict (slug) do nothing;

-- ============================================================
-- 3. PRODUCTS — campos de marketplace
-- ============================================================
alter table public.products add column if not exists category_id uuid references public.product_categories(id);
alter table public.products add column if not exists sku text;
alter table public.products add column if not exists subtitle text;
alter table public.products add column if not exists short_description text;
alter table public.products add column if not exists highlights jsonb not null default '[]'::jsonb;
alter table public.products add column if not exists specs jsonb not null default '[]'::jsonb;
alter table public.products add column if not exists brand text;
alter table public.products add column if not exists badge text;
alter table public.products add column if not exists compare_at_price_cents integer
  check (compare_at_price_cents is null or compare_at_price_cents > 0);
alter table public.products add column if not exists featured boolean not null default false;
alter table public.products add column if not exists allow_pickup boolean not null default true;
alter table public.products add column if not exists allow_delivery boolean not null default true;
alter table public.products add column if not exists has_variants boolean not null default false;
alter table public.products add column if not exists variant_label text;

create unique index if not exists products_sku_key on public.products (sku) where sku is not null;

-- Vincula os produtos antigos (category text) às novas categorias.
update public.products p set category_id = c.id
  from public.product_categories c
 where p.category_id is null
   and c.slug = case p.category
                  when 'brinde'   then 'brindes'
                  when 'voucher'  then 'vouchers'
                  when 'parceiro' then 'parceiros'
                  else 'outros'
                end;

-- Busca full-text em português (nome + subtítulo + marca + descrição).
alter table public.products drop column if exists search_tsv;
alter table public.products add column search_tsv tsvector
  generated always as (
    to_tsvector('portuguese',
      coalesce(name,'') || ' ' ||
      coalesce(subtitle,'') || ' ' ||
      coalesce(brand,'') || ' ' ||
      coalesce(short_description,'') || ' ' ||
      coalesce(description,'')
    )
  ) stored;

create index if not exists products_search_idx on public.products using gin (search_tsv);
create index if not exists products_category_idx on public.products (category_id, display_order);
create index if not exists products_featured_idx on public.products (featured, display_order) where status = 'active';

-- ============================================================
-- 4. PRODUCT IMAGES (galeria)
-- ============================================================
create table if not exists public.product_images (
  id            uuid primary key default gen_random_uuid(),
  product_id    uuid not null references public.products(id) on delete cascade,
  url           text not null,
  storage_path  text,
  alt           text,
  display_order integer not null default 0,
  created_at    timestamptz not null default now()
);

create index if not exists product_images_product_idx
  on public.product_images (product_id, display_order);

-- Migra a imagem única existente para a galeria (posição 0).
insert into public.product_images (product_id, url, display_order)
select p.id, p.image_url, 0
  from public.products p
 where p.image_url is not null
   and not exists (select 1 from public.product_images i where i.product_id = p.id);

-- ============================================================
-- 5. PRODUCT VARIANTS (tamanho/cor com estoque próprio)
-- ============================================================
create table if not exists public.product_variants (
  id            uuid primary key default gen_random_uuid(),
  product_id    uuid not null references public.products(id) on delete cascade,
  label         text not null,
  sku           text,
  price_cents   integer check (price_cents is null or price_cents > 0),
  points_cost   integer check (points_cost is null or points_cost > 0),
  stock         integer check (stock is null or stock >= 0),
  status        text not null default 'active'
    check (status in ('active','archived')),
  display_order integer not null default 0,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

create index if not exists product_variants_product_idx
  on public.product_variants (product_id, display_order);
create unique index if not exists product_variants_sku_key
  on public.product_variants (sku) where sku is not null;

-- ============================================================
-- 6. ORDERS + ORDER ITEMS
-- ============================================================
create sequence if not exists public.order_code_seq start 1001;

create table if not exists public.orders (
  id                  uuid primary key default gen_random_uuid(),
  code                text not null unique default ('XV-' || nextval('public.order_code_seq')::text),
  customer_id         uuid not null references public.customers(id) on delete restrict,

  status              text not null default 'pending_payment'
    check (status in ('pending_payment','paid','preparing','ready','delivered','cancelled')),

  -- Dinheiro (tudo em centavos) — snapshot no momento do pedido
  items_total_cents   integer not null check (items_total_cents >= 0),
  delivery_fee_cents  integer not null default 0 check (delivery_fee_cents >= 0),
  total_cents         integer not null check (total_cents >= 0),

  -- Pagamento híbrido
  point_value_cents   integer not null,
  points_used         integer not null default 0 check (points_used >= 0),
  points_value_cents  integer not null default 0 check (points_value_cents >= 0),
  money_due_cents     integer not null check (money_due_cents >= 0),

  -- Entrega
  delivery_method     text not null check (delivery_method in ('pickup','delivery')),
  contact_name        text,
  contact_phone       text,
  address_cep         text,
  address_street      text,
  address_number      text,
  address_complement  text,
  address_district    text,
  address_city        text,
  address_state       text,
  address_notes       text,

  -- Mercado Pago
  payment_status      text not null default 'none'
    check (payment_status in ('none','pending','approved','rejected','refunded')),
  payment_method      text,
  mp_preference_id    text,
  mp_payment_id       text,
  paid_at             timestamptz,

  admin_note          text,
  cancel_reason       text,
  ready_at            timestamptz,
  delivered_at        timestamptz,
  cancelled_at        timestamptz,
  created_at          timestamptz not null default now(),
  updated_at          timestamptz not null default now()
);

create index if not exists orders_customer_idx on public.orders (customer_id, created_at desc);
create index if not exists orders_status_idx   on public.orders (status, created_at desc);
create unique index if not exists orders_mp_payment_key
  on public.orders (mp_payment_id) where mp_payment_id is not null;

create table if not exists public.order_items (
  id                uuid primary key default gen_random_uuid(),
  order_id          uuid not null references public.orders(id) on delete cascade,
  product_id        uuid not null references public.products(id) on delete restrict,
  variant_id        uuid references public.product_variants(id) on delete restrict,
  name_snapshot     text not null,
  variant_snapshot  text,
  sku_snapshot      text,
  image_snapshot    text,
  unit_price_cents  integer not null check (unit_price_cents >= 0),
  quantity          integer not null check (quantity > 0),
  line_total_cents  integer not null check (line_total_cents >= 0),
  created_at        timestamptz not null default now()
);

create index if not exists order_items_order_idx on public.order_items (order_id);

-- ============================================================
-- 7. POINTS LEDGER (extrato auditável da carteira)
-- ============================================================
create table if not exists public.points_ledger (
  id            uuid primary key default gen_random_uuid(),
  customer_id   uuid not null references public.customers(id) on delete cascade,
  delta         integer not null,
  reason        text not null
    check (reason in ('lavsync','order_spend','order_refund','redemption','manual','purchase')),
  order_id      uuid references public.orders(id) on delete set null,
  balance_after integer not null,
  note          text,
  created_by    uuid references auth.users(id),
  created_at    timestamptz not null default now()
);

create index if not exists points_ledger_customer_idx
  on public.points_ledger (customer_id, created_at desc);

-- ============================================================
-- 8. RPC: criação de pedido (atômica, preços vindos do banco)
--     p_items: [{ product_id, variant_id (opcional), quantity }]
-- ============================================================
create or replace function public.fn_create_order(
  p_items           jsonb,
  p_points_to_use   integer,
  p_delivery_method text,
  p_contact         jsonb,
  p_address         jsonb
) returns public.orders
language plpgsql
security definer
set search_path = public
as $func$
declare
  v_user_id    uuid := auth.uid();
  v_settings   public.store_settings%rowtype;
  v_item       jsonb;
  v_product    public.products%rowtype;
  v_variant    public.product_variants%rowtype;
  v_qty        integer;
  v_unit       integer;
  v_items_total integer := 0;
  v_fee        integer := 0;
  v_total      integer;
  v_points     integer;
  v_points_val integer;
  v_money_due  integer;
  v_balance    integer;
  v_order      public.orders%rowtype;
  v_label      text;
  v_image      text;
  v_stock      integer;
begin
  if v_user_id is null then raise exception 'not_authenticated'; end if;
  if p_items is null or jsonb_array_length(p_items) = 0 then raise exception 'empty_cart'; end if;
  if p_delivery_method not in ('pickup','delivery') then raise exception 'invalid_delivery_method'; end if;

  select * into v_settings from public.store_settings where id = true;

  if p_delivery_method = 'delivery' and not v_settings.delivery_enabled then
    raise exception 'delivery_unavailable';
  end if;
  if p_delivery_method = 'pickup' and not v_settings.pickup_enabled then
    raise exception 'pickup_unavailable';
  end if;
  if p_delivery_method = 'delivery' and coalesce(p_address->>'street','') = '' then
    raise exception 'address_required';
  end if;

  -- Cria o pedido vazio primeiro para termos o id nos itens.
  insert into public.orders (
    customer_id, status, items_total_cents, delivery_fee_cents, total_cents,
    point_value_cents, points_used, points_value_cents, money_due_cents,
    delivery_method, contact_name, contact_phone,
    address_cep, address_street, address_number, address_complement,
    address_district, address_city, address_state, address_notes
  ) values (
    v_user_id, 'pending_payment', 0, 0, 0,
    v_settings.point_value_cents, 0, 0, 0,
    p_delivery_method,
    nullif(p_contact->>'name',''), nullif(p_contact->>'phone',''),
    nullif(p_address->>'cep',''), nullif(p_address->>'street',''),
    nullif(p_address->>'number',''), nullif(p_address->>'complement',''),
    nullif(p_address->>'district',''), nullif(p_address->>'city',''),
    nullif(p_address->>'state',''), nullif(p_address->>'notes','')
  ) returning * into v_order;

  -- Percorre os itens: trava linhas, valida, baixa estoque e grava snapshot.
  for v_item in select * from jsonb_array_elements(p_items) loop
    v_qty := coalesce((v_item->>'quantity')::integer, 0);
    if v_qty <= 0 then raise exception 'invalid_quantity'; end if;

    select * into v_product from public.products
      where id = (v_item->>'product_id')::uuid for update;
    if not found then raise exception 'product_not_found'; end if;
    if v_product.status <> 'active' then raise exception 'product_inactive'; end if;
    if v_product.money_price_cents is null then raise exception 'product_without_price'; end if;
    if p_delivery_method = 'pickup'   and not v_product.allow_pickup   then raise exception 'product_pickup_unavailable'; end if;
    if p_delivery_method = 'delivery' and not v_product.allow_delivery then raise exception 'product_delivery_unavailable'; end if;

    v_label := null;
    v_variant := null;

    if v_item ? 'variant_id' and nullif(v_item->>'variant_id','') is not null then
      select * into v_variant from public.product_variants
        where id = (v_item->>'variant_id')::uuid and product_id = v_product.id for update;
      if not found then raise exception 'variant_not_found'; end if;
      if v_variant.status <> 'active' then raise exception 'variant_inactive'; end if;
      v_label := v_variant.label;
      v_unit  := coalesce(v_variant.price_cents, v_product.money_price_cents);
      v_stock := v_variant.stock;
    elsif v_product.has_variants then
      raise exception 'variant_required';
    else
      v_unit  := v_product.money_price_cents;
      v_stock := v_product.stock;
    end if;

    if v_stock is not null and v_stock < v_qty then raise exception 'out_of_stock'; end if;

    -- Reserva o estoque já na criação do pedido; devolvido no cancelamento.
    if v_variant.id is not null then
      if v_variant.stock is not null then
        update public.product_variants set stock = stock - v_qty where id = v_variant.id;
      end if;
    elsif v_product.stock is not null then
      update public.products set stock = stock - v_qty where id = v_product.id;
    end if;

    select url into v_image from public.product_images
      where product_id = v_product.id order by display_order limit 1;

    insert into public.order_items (
      order_id, product_id, variant_id, name_snapshot, variant_snapshot,
      sku_snapshot, image_snapshot, unit_price_cents, quantity, line_total_cents
    ) values (
      v_order.id, v_product.id, v_variant.id, v_product.name, v_label,
      coalesce(v_variant.sku, v_product.sku), coalesce(v_image, v_product.image_url),
      v_unit, v_qty, v_unit * v_qty
    );

    v_items_total := v_items_total + (v_unit * v_qty);
  end loop;

  -- Frete
  if p_delivery_method = 'delivery' then
    v_fee := v_settings.delivery_fee_cents;
    if v_settings.free_delivery_above_cents is not null
       and v_items_total >= v_settings.free_delivery_above_cents then
      v_fee := 0;
    end if;
  end if;

  v_total := v_items_total + v_fee;

  -- Pontos: nunca mais que o saldo, nunca mais que o total do pedido.
  select lifetime_points into v_balance from public.customers
    where id = v_user_id for update;
  if v_balance is null then raise exception 'customer_not_found'; end if;

  v_points := greatest(0, coalesce(p_points_to_use, 0));
  if v_points > v_balance then raise exception 'insufficient_points'; end if;
  -- Teto: pontos que cobrem exatamente o total (arredonda pra baixo o excedente inútil).
  if v_points * v_settings.point_value_cents > v_total then
    v_points := v_total / v_settings.point_value_cents;
  end if;

  v_points_val := v_points * v_settings.point_value_cents;
  v_money_due  := v_total - v_points_val;

  -- Valor residual impagável no gateway: força fechar 100% em pontos ou usar menos.
  if v_money_due > 0 and v_money_due < v_settings.min_money_cents then
    raise exception 'money_due_below_minimum';
  end if;

  if v_points > 0 then
    update public.customers
       set lifetime_points = lifetime_points - v_points
     where id = v_user_id;

    insert into public.points_ledger (customer_id, delta, reason, order_id, balance_after, note)
    values (v_user_id, -v_points, 'order_spend', v_order.id, v_balance - v_points,
            'Pedido ' || v_order.code);
  end if;

  update public.orders set
    items_total_cents  = v_items_total,
    delivery_fee_cents = v_fee,
    total_cents        = v_total,
    points_used        = v_points,
    points_value_cents = v_points_val,
    money_due_cents    = v_money_due,
    -- Pedido 100% em pontos já nasce pago.
    status             = case when v_money_due = 0 then 'paid' else 'pending_payment' end,
    payment_status     = case when v_money_due = 0 then 'approved' else 'none' end,
    paid_at            = case when v_money_due = 0 then now() else null end
  where id = v_order.id
  returning * into v_order;

  return v_order;
end;
$func$;

-- ATENÇÃO: "revoke from public" NÃO remove os grants que o Supabase concede por
-- default a anon/authenticated/service_role (alter default privileges no schema
-- public). É preciso revogar de cada papel nominalmente, senão qualquer cliente
-- logado consegue chamar as funções security definer abaixo.
revoke all on function public.fn_create_order(jsonb, integer, text, jsonb, jsonb) from public, anon;
grant execute on function public.fn_create_order(jsonb, integer, text, jsonb, jsonb) to authenticated;

-- ============================================================
-- 8b. RPC: confirmação de pagamento (webhook Mercado Pago) — idempotente
-- ============================================================
create or replace function public.fn_confirm_order_payment(
  p_order_id      uuid,
  p_mp_payment_id text,
  p_amount_cents  integer,
  p_method        text
) returns public.orders
language plpgsql
security definer
set search_path = public
as $func$
declare
  v_order public.orders%rowtype;
begin
  select * into v_order from public.orders where id = p_order_id for update;
  if not found then raise exception 'order_not_found'; end if;

  -- Já aprovado: não faz nada (reentrega de webhook).
  if v_order.payment_status = 'approved' then
    return v_order;
  end if;
  if v_order.status = 'cancelled' then raise exception 'order_cancelled'; end if;
  if p_amount_cents is not null and p_amount_cents < v_order.money_due_cents then
    raise exception 'amount_mismatch';
  end if;

  update public.orders set
    status         = 'paid',
    payment_status = 'approved',
    payment_method = coalesce(p_method, payment_method),
    mp_payment_id  = coalesce(p_mp_payment_id, mp_payment_id),
    paid_at        = now()
  where id = p_order_id
  returning * into v_order;

  return v_order;
end;
$func$;

-- Só o service role (webhook do Mercado Pago) pode confirmar pagamento.
revoke all on function public.fn_confirm_order_payment(uuid, text, integer, text) from public, anon, authenticated;

-- ============================================================
-- 8c. RPC: cancelamento (devolve pontos e estoque) — idempotente
-- ============================================================
create or replace function public.fn_cancel_order(
  p_order_id uuid,
  p_reason   text
) returns public.orders
language plpgsql
security definer
set search_path = public
as $func$
declare
  v_order   public.orders%rowtype;
  v_item    public.order_items%rowtype;
  v_balance integer;
begin
  select * into v_order from public.orders where id = p_order_id for update;
  if not found then raise exception 'order_not_found'; end if;
  if v_order.status = 'cancelled' then return v_order; end if;
  if v_order.status = 'delivered' then raise exception 'order_already_delivered'; end if;

  -- Devolve estoque
  for v_item in select * from public.order_items where order_id = p_order_id loop
    if v_item.variant_id is not null then
      update public.product_variants set stock = stock + v_item.quantity
       where id = v_item.variant_id and stock is not null;
    else
      update public.products set stock = stock + v_item.quantity
       where id = v_item.product_id and stock is not null;
    end if;
  end loop;

  -- Devolve pontos
  if v_order.points_used > 0 then
    update public.customers
       set lifetime_points = lifetime_points + v_order.points_used
     where id = v_order.customer_id
     returning lifetime_points into v_balance;

    insert into public.points_ledger (customer_id, delta, reason, order_id, balance_after, note)
    values (v_order.customer_id, v_order.points_used, 'order_refund', v_order.id, v_balance,
            'Estorno do pedido ' || v_order.code);
  end if;

  update public.orders set
    status         = 'cancelled',
    payment_status = case when payment_status = 'approved' then 'refunded' else payment_status end,
    cancel_reason  = p_reason,
    cancelled_at   = now()
  where id = p_order_id
  returning * into v_order;

  return v_order;
end;
$func$;

-- Só o service role (painel admin) pode cancelar.
revoke all on function public.fn_cancel_order(uuid, text) from public, anon, authenticated;

-- ============================================================
-- 9. RLS
-- ============================================================
alter table public.store_settings     enable row level security;
alter table public.product_categories enable row level security;
alter table public.product_images     enable row level security;
alter table public.product_variants   enable row level security;
alter table public.orders             enable row level security;
alter table public.order_items        enable row level security;
alter table public.points_ledger      enable row level security;

drop policy if exists "store_settings_read" on public.store_settings;
create policy "store_settings_read" on public.store_settings for select using (true);

drop policy if exists "categories_select_active" on public.product_categories;
create policy "categories_select_active" on public.product_categories
  for select using (status = 'active');

drop policy if exists "product_images_select" on public.product_images;
create policy "product_images_select" on public.product_images
  for select using (
    exists (select 1 from public.products p where p.id = product_id and p.status = 'active')
  );

drop policy if exists "product_variants_select" on public.product_variants;
create policy "product_variants_select" on public.product_variants
  for select using (
    status = 'active' and
    exists (select 1 from public.products p where p.id = product_id and p.status = 'active')
  );

drop policy if exists "orders_select_own" on public.orders;
create policy "orders_select_own" on public.orders
  for select using (auth.uid() = customer_id);

drop policy if exists "order_items_select_own" on public.order_items;
create policy "order_items_select_own" on public.order_items
  for select using (
    exists (select 1 from public.orders o where o.id = order_id and o.customer_id = auth.uid())
  );

drop policy if exists "points_ledger_select_own" on public.points_ledger;
create policy "points_ledger_select_own" on public.points_ledger
  for select using (auth.uid() = customer_id);

-- ============================================================
-- 10. Triggers de updated_at
-- ============================================================
drop trigger if exists product_categories_touch on public.product_categories;
create trigger product_categories_touch before update on public.product_categories
  for each row execute function public.tg_touch_updated_at();

drop trigger if exists product_variants_touch on public.product_variants;
create trigger product_variants_touch before update on public.product_variants
  for each row execute function public.tg_touch_updated_at();

drop trigger if exists orders_touch on public.orders;
create trigger orders_touch before update on public.orders
  for each row execute function public.tg_touch_updated_at();

drop trigger if exists store_settings_touch on public.store_settings;
create trigger store_settings_touch before update on public.store_settings
  for each row execute function public.tg_touch_updated_at();

-- ============================================================
-- 11. Storage: bucket público de fotos de produto
--     (upload só pelo painel, via service role — sem policy de insert pro client)
-- ============================================================
insert into storage.buckets (id, name, public)
values ('product-images', 'product-images', true)
on conflict (id) do update set public = true;

drop policy if exists "product_images_public_read" on storage.objects;
create policy "product_images_public_read" on storage.objects
  for select using (bucket_id = 'product-images');
`;

const url = `https://api.supabase.com/v1/projects/${REF}/database/query`;

async function run(query, label) {
  const res = await fetch(url, {
    method: "POST",
    headers: { Authorization: `Bearer ${PAT}`, "Content-Type": "application/json" },
    body: JSON.stringify({ query }),
  });
  const text = await res.text();
  console.log(`\n=== ${label} === status=${res.status}`);
  console.log(text.slice(0, 2000));
  return res.ok;
}

const ok = await run(sql, "migration 9");
if (!ok) process.exit(1);

await run(
  `select table_name from information_schema.tables
    where table_schema='public'
      and table_name in ('store_settings','product_categories','product_images','product_variants','orders','order_items','points_ledger')
    order by table_name;`,
  "verify tables",
);

await run(
  `select routine_name from information_schema.routines
    where routine_schema='public'
      and routine_name in ('fn_create_order','fn_confirm_order_payment','fn_cancel_order')
    order by routine_name;`,
  "verify functions",
);

await run(
  `select (select count(*) from public.product_categories) as categorias,
          (select count(*) from public.product_images)     as fotos_migradas,
          (select count(*) from public.products where category_id is not null) as produtos_categorizados,
          (select point_value_cents from public.store_settings where id) as centavos_por_ponto;`,
  "verify data",
);
