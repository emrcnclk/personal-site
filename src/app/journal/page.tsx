import { PostIndex } from "@/components/post/post-index";
import { getPageUi } from "@/lib/i18n-pages";
import { resolvePageLang } from "@/lib/i18n-server";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Journal",
  description:
    "Loose thoughts, night walks and unstructured notes. The notebook, not the blog.",
  path: "/journal",
});

export default async function JournalPage({
  searchParams,
}: {
  searchParams?: Promise<{ lang?: string }> | { lang?: string };
}) {
  const lang = await resolvePageLang(searchParams);
  const ui = getPageUi("journal", lang);

  return (
    <PostIndex
      collection="journal"
      kicker={ui.kicker}
      title={ui.title}
      lede={ui.lede}
      empty={ui.empty}
      lang={lang}
    />
  );
}
