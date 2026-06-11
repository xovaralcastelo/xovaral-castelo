import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { createAdminClient } from "@/lib/supabase/admin";
import { TestimonialForm } from "../../_components/TestimonialForm";
import { updateTestimonial } from "../../../_actions";
import type { Testimonial } from "@/lib/types";

export const dynamic = "force-dynamic";

export default async function EditTestimonialPage({
  params,
}: {
  params: { id: string };
}) {
  const sb = createAdminClient();
  const { data } = await sb
    .from("testimonials")
    .select("*")
    .eq("id", params.id)
    .single();

  if (!data) notFound();
  const testimonial = data as Testimonial;

  return (
    <div className="space-y-6">
      <header>
        <Link
          href="/admin/testimonials"
          className="inline-flex items-center gap-2 text-sm font-bold text-xv-gray-700 hover:text-xv-navy"
        >
          <ArrowLeft size={14} />
          Voltar
        </Link>
        <h1 className="mt-2 font-display text-2xl md:text-3xl font-bold text-xv-navy">Editar depoimento</h1>
      </header>

      <TestimonialForm
        testimonial={testimonial}
        action={updateTestimonial.bind(null, testimonial.id)}
        submitLabel="Salvar alterações"
      />
    </div>
  );
}
