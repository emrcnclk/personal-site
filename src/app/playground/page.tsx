import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";
import { ExperimentList } from "@/components/work/experiment-list";
import { playgroundToys } from "@/data/experiments";
import { getPageUi } from "@/lib/i18n-pages";
import { resolvePageLang } from "@/lib/i18n-server";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Playground",
  description:
    "Toys, one-night builds, and things that exist purely because they were fun to make.",
  path: "/playground",
});

export default async function PlaygroundPage({
  searchParams,
}: {
  searchParams?: Promise<{ lang?: string | string[] }>;
}) {
  const lang = await resolvePageLang(searchParams);
  const ui = getPageUi("playground", lang);

  return (
    <>
      <PageHeader kicker={ui.kicker} title={ui.title} lede={ui.lede} />
      <Container className="pb-32">
        <ExperimentList items={playgroundToys} lang={lang} />
      </Container>
    </>
  );
}
