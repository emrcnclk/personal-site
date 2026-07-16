import { DisciplinePage } from "@/components/work/discipline-page";
import { getPageUi } from "@/lib/i18n-pages";
import { resolvePageLang } from "@/lib/i18n-server";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Mobile Apps",
  description:
    "Native-quality mobile software: fast, battery-respectful, designed for real thumbs in real contexts.",
  path: "/mobile",
});

export default async function MobilePage({
  searchParams,
}: {
  searchParams?: Promise<{ lang?: string | string[] }>;
}) {
  const lang = await resolvePageLang(searchParams);
  const ui = getPageUi("mobile", lang);

  return (
    <DisciplinePage
      lang={lang}
      content={{
        discipline: "mobile",
        kicker: ui.kicker,
        title: ui.title,
        lede: ui.lede,
        principles: [...ui.principles],
      }}
    />
  );
}
