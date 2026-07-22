import { createAdminClient } from "@/lib/supabase/admin";
import { StoreSettingsForm } from "./_components/StoreSettingsForm";
import { DEFAULT_STORE_SETTINGS, type StoreSettings } from "@/lib/types";

export const dynamic = "force-dynamic";

export default async function AdminStoreSettingsPage() {
  const sb = createAdminClient();

  const [{ data: settings }, { count }] = await Promise.all([
    sb.from("store_settings").select("*").eq("id", true).maybeSingle<StoreSettings>(),
    sb
      .from("products")
      .select("id", { count: "exact", head: true })
      .not("money_price_cents", "is", null),
  ]);

  return (
    <div className="space-y-6">
      <header>
        <h1 className="font-display text-2xl md:text-3xl font-bold text-xv-navy">
          Configurações da Store
        </h1>
        <p className="text-sm text-xv-gray-700 mt-1">
          Regras de preço, retirada e entrega que valem para a loja inteira.
        </p>
      </header>

      <StoreSettingsForm
        settings={settings ?? DEFAULT_STORE_SETTINGS}
        productCount={count ?? 0}
      />
    </div>
  );
}
