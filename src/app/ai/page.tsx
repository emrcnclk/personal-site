import { DisciplinePage } from "@/components/work/discipline-page";
import { getPageUi } from "@/lib/i18n-pages";
import { resolvePageLang } from "@/lib/i18n-server";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "AI",
  description:
    "Applied machine learning with a bias for small, sharp, local-first systems that respect privacy and hardware.",
  path: "/ai",
});

export default async function AiPage({
  searchParams,
}: {
  searchParams?: Promise<{ lang?: string }> | { lang?: string };
}) {
  const lang = await resolvePageLang(searchParams);
  const ui = getPageUi("ai", lang);

  return (
    <DisciplinePage
      lang={lang}
      content={{
        discipline: "ai",
        kicker: ui.kicker,
        title: ui.title,
        lede: ui.lede,
        principles: [...ui.principles],
      }}
    />
  );
}
