"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { FormField, TextInput, Textarea } from "../../_components/FormField";
import { CONTENT_GROUPS } from "@/lib/content-schema";

interface Props {
  values: Record<string, string>;
  action: (formData: FormData) => Promise<{ ok: true } | { ok: false; error: string }>;
}

export function ContentForm({ values, action }: Props) {
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setSaved(false);
    const fd = new FormData(e.currentTarget);
    startTransition(async () => {
      const res = await action(fd);
      if (res && "ok" in res && !res.ok) {
        setError(res.error);
      } else {
        setSaved(true);
        router.refresh();
      }
    });
  }

  return (
    <form onSubmit={onSubmit} className="space-y-8 max-w-3xl pb-24">
      {error ? (
        <div role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700 ring-1 ring-red-200">
          {error}
        </div>
      ) : null}

      {CONTENT_GROUPS.map((group) => (
        <section
          key={group.title}
          className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-xv-gray-200/60"
        >
          <h2 className="font-display text-xl font-bold text-xv-navy">{group.title}</h2>
          <p className="mt-1 text-sm text-xv-gray-500">{group.description}</p>

          <div className="mt-5 space-y-4">
            {group.fields.map((field) => {
              const value = values[field.key] ?? "";
              return (
                <FormField key={field.key} label={field.label} hint={field.hint}>
                  {field.type === "textarea" ? (
                    <Textarea name={field.key} defaultValue={value} rows={3} />
                  ) : (
                    <TextInput
                      name={field.key}
                      defaultValue={value}
                      placeholder={field.type === "image" ? "/images/... ou https://..." : ""}
                    />
                  )}
                </FormField>
              );
            })}
          </div>
        </section>
      ))}

      {/* Barra fixa de salvar */}
      <div className="fixed bottom-0 left-60 right-0 border-t border-xv-gray-200 bg-white/95 backdrop-blur px-8 py-4 z-40">
        <div className="flex items-center gap-4 max-w-3xl">
          <button
            type="submit"
            disabled={isPending}
            className="rounded-full bg-xv-orange px-7 py-2.5 text-sm font-bold text-white shadow-md hover:bg-xv-orange-light disabled:opacity-60"
          >
            {isPending ? "Salvando…" : "Salvar alterações"}
          </button>
          {saved && !isPending ? (
            <span className="text-sm font-bold text-green-600">✓ Salvo! As mudanças já estão no site.</span>
          ) : (
            <span className="text-sm text-xv-gray-500">
              As alterações aparecem no site imediatamente após salvar.
            </span>
          )}
        </div>
      </div>
    </form>
  );
}
