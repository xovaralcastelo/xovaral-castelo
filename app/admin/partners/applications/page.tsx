import { createAdminClient } from "@/lib/supabase/admin";
import { MessageCircle, Mail, AtSign, Globe } from "lucide-react";
import { PartnersTabs } from "../_components/PartnersTabs";
import { DeleteButton } from "../../_components/DeleteButton";
import { ReviewButtons } from "./_components/ReviewButtons";
import {
  approvePartnerApplication,
  rejectPartnerApplication,
  deletePartnerApplication,
} from "../../_actions";
import {
  PARTNER_CATEGORY_LABELS,
  type PartnerApplication,
} from "@/lib/types";

export const dynamic = "force-dynamic";

const STATUS_LABELS: Record<string, { label: string; cls: string }> = {
  pending: { label: "Pendente", cls: "bg-yellow-100 text-yellow-800" },
  approved: { label: "Aprovada", cls: "bg-green-100 text-green-800" },
  rejected: { label: "Recusada", cls: "bg-red-100 text-red-800" },
};

export default async function PartnerApplicationsPage() {
  const sb = createAdminClient();
  const { data } = await sb
    .from("partner_applications")
    .select("*")
    .order("created_at", { ascending: false });

  const list = (data ?? []) as PartnerApplication[];
  const pending = list.filter((a) => a.status === "pending");
  const reviewed = list.filter((a) => a.status !== "pending");

  return (
    <div className="space-y-6">
      <header>
        <h1 className="font-display text-2xl md:text-3xl font-bold text-xv-navy">
          Parceiros
        </h1>
        <p className="text-sm text-xv-gray-700 mt-1">
          Solicitações de parceria enviadas pelo formulário do site.
        </p>
      </header>

      <PartnersTabs active="applications" pendingCount={pending.length} />

      {list.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center text-sm text-xv-gray-500 shadow-sm ring-1 ring-xv-gray-200/60">
          Nenhuma solicitação recebida ainda. Quando alguém preencher o
          formulário “Seja parceiro” do site, ela aparece aqui.
        </div>
      ) : (
        <div className="space-y-4">
          {[...pending, ...reviewed].map((a) => {
            const st = STATUS_LABELS[a.status] ?? STATUS_LABELS.pending;
            return (
              <article
                key={a.id}
                className={`bg-white rounded-2xl p-5 sm:p-6 shadow-sm ring-1 ${
                  a.status === "pending"
                    ? "ring-xv-orange/40"
                    : "ring-xv-gray-200/60"
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="font-display text-lg font-bold text-xv-navy">
                        {a.business_name}
                      </h2>
                      <span className="inline-block rounded-full bg-xv-gray-100 px-2.5 py-0.5 text-xs font-bold text-xv-gray-700">
                        {PARTNER_CATEGORY_LABELS[a.category] ?? a.category}
                      </span>
                      <span
                        className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-bold ${st.cls}`}
                      >
                        {st.label}
                      </span>
                    </div>
                    <p className="text-xs text-xv-gray-500 mt-1">
                      {a.contact_name} ·{" "}
                      {new Date(a.created_at).toLocaleDateString("pt-BR", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>

                  {a.status === "pending" ? (
                    <ReviewButtons
                      approveAction={approvePartnerApplication.bind(null, a.id)}
                      rejectAction={rejectPartnerApplication.bind(null, a.id)}
                      businessName={a.business_name}
                    />
                  ) : (
                    <DeleteButton
                      action={deletePartnerApplication.bind(null, a.id)}
                      confirmText={`Excluir o registro da solicitação de "${a.business_name}"?`}
                      label="Excluir registro"
                    />
                  )}
                </div>

                {a.message ? (
                  <p className="mt-3 text-sm text-xv-gray-700 bg-xv-gray-50 rounded-xl px-4 py-3">
                    {a.message}
                  </p>
                ) : null}

                <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-xs font-bold">
                  <a
                    href={`https://wa.me/55${a.whatsapp.replace(/\D/g, "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-green-700 hover:underline"
                  >
                    <MessageCircle size={13} />
                    {a.whatsapp}
                  </a>
                  <a
                    href={`mailto:${a.email}`}
                    className="inline-flex items-center gap-1.5 text-xv-navy hover:underline"
                  >
                    <Mail size={13} />
                    {a.email}
                  </a>
                  {a.instagram ? (
                    <a
                      href={`https://instagram.com/${a.instagram}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-pink-600 hover:underline"
                    >
                      <AtSign size={13} />@{a.instagram}
                    </a>
                  ) : null}
                  {a.website_url ? (
                    <a
                      href={a.website_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xv-cyan hover:underline"
                    >
                      <Globe size={13} />
                      Site
                    </a>
                  ) : null}
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}
