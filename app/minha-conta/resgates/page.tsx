import Link from "next/link";
import { redirect } from "next/navigation";
import { ArrowLeft, Gift, Clock, Check } from "lucide-react";
import { createClient } from "@/lib/supabase/server";

export const metadata = {
  title: "Meus resgates — Clube Xô Varal",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

interface RedemptionWithProduct {
  id: string;
  points_spent: number;
  voucher_code: string | null;
  status: "pending" | "fulfilled" | "cancelled";
  created_at: string;
  fulfilled_at: string | null;
  products: {
    name: string;
    slug: string;
    image_url: string | null;
    fulfillment_type: "voucher" | "pickup";
  } | null;
}

export default async function ResgatesPage() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/clube-de-vantagens/entrar?next=/minha-conta/resgates");

  const { data } = await supabase
    .from("redemptions")
    .select(
      "id, points_spent, voucher_code, status, created_at, fulfilled_at, products(name, slug, image_url, fulfillment_type)",
    )
    .order("created_at", { ascending: false });

  const list = (data ?? []) as unknown as RedemptionWithProduct[];

  return (
    <div
      className="min-h-screen px-4 py-10"
      style={{
        background:
          "linear-gradient(135deg, #f0fafe 0%, #fff8f2 50%, #fff3ea 100%)",
      }}
    >
      <div className="mx-auto max-w-md space-y-6">
        <Link
          href="/minha-conta"
          className="inline-flex items-center gap-2 text-sm font-bold text-xv-gray-700 hover:text-xv-navy"
        >
          <ArrowLeft size={14} />
          Voltar à minha conta
        </Link>

        <header>
          <h1 className="font-display text-2xl font-bold text-xv-navy">
            Meus resgates
          </h1>
          <p className="text-sm text-xv-gray-700 mt-1">
            Histórico dos produtos que você resgatou na Store Xô Varal.
          </p>
        </header>

        {list.length === 0 ? (
          <div className="bg-white rounded-3xl p-8 shadow-card ring-1 ring-xv-gray-200/60 text-center">
            <Gift size={48} className="mx-auto text-xv-gray-300" />
            <p className="mt-3 font-display text-lg text-xv-navy">
              Você ainda não resgatou nada.
            </p>
            <Link
              href="/store"
              className="mt-4 inline-flex items-center gap-2 rounded-full bg-xv-orange px-5 py-2.5 text-sm font-bold text-white shadow-md hover:bg-xv-orange-light"
            >
              Ir para a Store
            </Link>
          </div>
        ) : (
          <ul className="space-y-3">
            {list.map((r) => (
              <li
                key={r.id}
                className="bg-white rounded-2xl p-4 shadow-sm ring-1 ring-xv-gray-200/60"
              >
                <div className="flex items-center gap-3">
                  {r.products?.image_url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={r.products.image_url}
                      alt=""
                      className="h-14 w-14 rounded-lg object-cover flex-shrink-0"
                    />
                  ) : (
                    <div className="h-14 w-14 rounded-lg bg-xv-gray-100 flex items-center justify-center flex-shrink-0">
                      <Gift size={20} className="text-xv-gray-300" />
                    </div>
                  )}
                  <div className="min-w-0 flex-1">
                    <p className="font-bold text-xv-navy truncate">
                      {r.products?.name ?? "Produto removido"}
                    </p>
                    <p className="text-xs text-xv-gray-500">
                      {new Date(r.created_at).toLocaleDateString("pt-BR", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}{" "}
                      · {r.points_spent} pts
                    </p>
                  </div>
                  <StatusPill status={r.status} />
                </div>

                {r.voucher_code ? (
                  <div className="mt-3 bg-xv-gray-50 rounded-lg px-3 py-2 flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-xv-gray-500">
                      Código
                    </span>
                    <span className="font-mono text-sm font-black text-xv-navy">
                      {r.voucher_code}
                    </span>
                  </div>
                ) : r.status === "pending" ? (
                  <p className="mt-3 text-xs text-xv-gray-700">
                    Passe na loja pra retirar. A equipe confirma a entrega.
                  </p>
                ) : null}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

function StatusPill({
  status,
}: {
  status: "pending" | "fulfilled" | "cancelled";
}) {
  const map = {
    pending: { bg: "bg-yellow-100", text: "text-yellow-800", label: "pendente", Icon: Clock },
    fulfilled: { bg: "bg-green-100", text: "text-green-800", label: "entregue", Icon: Check },
    cancelled: { bg: "bg-red-100", text: "text-red-800", label: "cancelado", Icon: Clock },
  } as const;
  const { bg, text, label, Icon } = map[status];
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-bold ${bg} ${text} flex-shrink-0`}
    >
      <Icon size={10} />
      {label}
    </span>
  );
}
