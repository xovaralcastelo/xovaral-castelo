// Migration 8 — integridade de pontos/ciclos:
//   1. cycle_events aceita cycles = 0 (auditoria de ajuste manual sem inflar o nível)
//   2. fn_increment_points — crédito/débito atômico de lifetime_points
//   3. fn_apply_lavsync_event — aplicação atômica e idempotente de evento LavSync
//   4. fn_cancel_redemption — cancelamento atômico com refund (sem refund duplo)
const PAT = process.env.SB_PAT;
const REF = process.env.SB_REF;
if (!PAT || !REF) {
  console.error("Missing SB_PAT or SB_REF env");
  process.exit(1);
}

const sql = `
-- ============================================================
-- 1. cycle_events: permitir cycles = 0.
--    Ajustes manuais de pontos registram um cycle_event de auditoria;
--    com cycles = 0 eles não inflam mais o nível do mês do cliente.
-- ============================================================
alter table public.cycle_events drop constraint if exists cycle_events_cycles_check;
alter table public.cycle_events add constraint cycle_events_cycles_check check (cycles >= 0);

-- Corrige os dados já gravados: ajustes manuais antigos entraram com
-- cycles = 1 (dummy) e estavam inflando o nível do mês dos clientes.
update public.cycle_events
   set cycles = 0
 where cycles = 1
   and points_earned = 0
   and note like 'Ajuste manual %';

-- ============================================================
-- 2. Incremento atômico de pontos (elimina read-modify-write).
--    Rejeita a operação se deixaria o saldo negativo.
-- ============================================================
create or replace function public.fn_increment_points(
  p_customer_id uuid,
  p_delta integer
) returns integer
language plpgsql
security definer
set search_path = public
as $func$
declare
  v_new integer;
begin
  update public.customers
     set lifetime_points = lifetime_points + p_delta
   where id = p_customer_id
     and lifetime_points + p_delta >= 0
  returning lifetime_points into v_new;

  if v_new is null then
    raise exception 'points_update_rejected';
  end if;
  return v_new;
end;
$func$;

revoke all on function public.fn_increment_points(uuid, integer) from public;
grant execute on function public.fn_increment_points(uuid, integer) to service_role;

-- ============================================================
-- 3. Aplicação atômica e idempotente de evento LavSync.
--    Trava a linha do evento (for update); se applied_at já está
--    preenchido, sai sem efeito — retry seguro, sem crédito duplo.
--    Ciclos + pontos + marcação acontecem na MESMA transação.
-- ============================================================
create or replace function public.fn_apply_lavsync_event(
  p_event_id uuid,
  p_customer_id uuid
) returns text
language plpgsql
security definer
set search_path = public
as $func$
declare
  v_event  public.lavsync_events%rowtype;
  v_points integer;
begin
  select * into v_event
    from public.lavsync_events
   where id = p_event_id
     and applied_at is null
   for update;
  if not found then
    return 'already_applied';
  end if;

  -- 1 ponto por real pago (amount_cents); fallback: campo points (legado)
  v_points := case
    when v_event.amount_cents is not null then greatest(0, v_event.amount_cents / 100)
    else greatest(0, coalesce(v_event.points, 0))
  end;

  if v_event.cycles > 0 then
    insert into public.cycle_events (customer_id, cycles, points_earned, note, occurred_at)
    values (
      p_customer_id,
      v_event.cycles,
      v_points,
      'LavSync (evento ' || v_event.event_id || ')',
      v_event.occurred_at
    );
  end if;

  if v_points > 0 then
    update public.customers
       set lifetime_points = lifetime_points + v_points
     where id = p_customer_id;
  end if;

  update public.lavsync_events
     set customer_id = p_customer_id,
         applied_at  = now()
   where id = p_event_id;

  return 'applied';
end;
$func$;

revoke all on function public.fn_apply_lavsync_event(uuid, uuid) from public;
grant execute on function public.fn_apply_lavsync_event(uuid, uuid) to service_role;

-- ============================================================
-- 4. Cancelamento atômico de resgate: reivindica o pending com
--    lock, devolve pontos e estoque na mesma transação.
--    Dois cancelamentos simultâneos: o segundo recebe not_pending.
-- ============================================================
create or replace function public.fn_cancel_redemption(p_redemption_id uuid)
returns public.redemptions
language plpgsql
security definer
set search_path = public
as $func$
declare
  v_row public.redemptions%rowtype;
begin
  select * into v_row
    from public.redemptions
   where id = p_redemption_id
     and status = 'pending'
   for update;
  if not found then
    raise exception 'not_pending';
  end if;

  update public.customers
     set lifetime_points = lifetime_points + v_row.points_spent
   where id = v_row.customer_id;

  -- devolve 1 unidade ao estoque quando o produto controla estoque
  update public.products
     set stock = stock + 1
   where id = v_row.product_id
     and stock is not null;

  update public.redemptions
     set status = 'cancelled'
   where id = p_redemption_id
  returning * into v_row;

  return v_row;
end;
$func$;

revoke all on function public.fn_cancel_redemption(uuid) from public;
grant execute on function public.fn_cancel_redemption(uuid) to service_role;
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
    query: `
      select
        (select count(*) from pg_proc p join pg_namespace n on n.oid = p.pronamespace
          where n.nspname = 'public'
            and p.proname in ('fn_increment_points','fn_apply_lavsync_event','fn_cancel_redemption'))::int as functions_created,
        (select pg_get_constraintdef(oid) from pg_constraint
          where conname = 'cycle_events_cycles_check') as cycles_constraint;
    `,
  }),
});
console.log("\n=== verificação ===");
console.log(await verify.text());
