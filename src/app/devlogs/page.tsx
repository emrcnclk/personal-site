import { PostIndex } from "@/components/post/post-index";
import { getPageUi } from "@/lib/i18n-pages";
import { resolvePageLang } from "@/lib/i18n-server";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Devlogs",
  description:
    "Build notes from active projects: decisions, dead ends, benchmarks and honest postmortems.",
  path: "/devlogs",
});

export default async function DevlogsPage({
  searchParams,
}: {
  searchParams?: Promise<{ lang?: string | string[] }>;
}) {
  const lang = await resolvePageLang(searchParams);
  const ui = getPageUi("devlogs", lang);

  return (
    <PostIndex
      collection="devlogs"
      kicker={ui.kicker}
      title={ui.title}
      lede={ui.lede}
      empty={ui.empty}
      lang={lang}
    />
  );
}
