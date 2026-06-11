import { getContentMap } from "@/lib/content";
import { ALL_SCHEMA_KEYS } from "@/lib/content-schema";
import { saveContent } from "../_actions";
import { ContentForm } from "./_components/ContentForm";

export const dynamic = "force-dynamic";

export default async function AdminContentPage() {
  const values = await getContentMap(ALL_SCHEMA_KEYS);

  return (
    <div className="space-y-6">
      <header>
        <h1 className="font-display text-2xl md:text-3xl font-bold text-xv-navy">
          Conteúdo do site
        </h1>
        <p className="text-sm text-xv-gray-700 mt-1">
          Edite os textos e imagens da página inicial. Deixe um campo vazio para
          usar o texto padrão.
        </p>
      </header>

      <ContentForm values={values} action={saveContent} />
    </div>
  );
}
