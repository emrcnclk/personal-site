import Link from "next/link";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";
import { Reveal } from "@/components/motion/reveal";
import { Kicker } from "@/components/ui/kicker";
import { nowUpdated } from "@/data/now";
import { formatDate } from "@/lib/utils";
import { pageMetadata } from "@/lib/seo";
import { getNowItems } from "@/lib/i18n";
import { getPageUi } from "@/lib/i18n-pages";
import { resolvePageLang } from "@/lib/i18n-server";

export const metadata = pageMetadata({
  title: "Now",
  description: "What I'm building, learning, listening and watching this season.",
  path: "/now",
});

export default async function NowPage({
  searchParams,
}: {
  searchParams?: Promise<{ lang?: string | string[] }>;
}) {
  const lang = await resolvePageLang(searchParams);
  const ui = getPageUi("now", lang);
  const nowItems = getNowItems(lang);

  return (
    <>
      <PageHeader
        kicker={`${ui.kickerPrefix} ${formatDate(nowUpdated, lang)}`}
        title={ui.title}
        lede={ui.lede}
      />
      <Container size="narrow" className="pb-32">
        <dl className="relative z-10 border-b border-line">
          {nowItems.map((item, i) => {
            const row = (
              <div className="grid gap-3 border-t border-line py-10 transition-colors md:grid-cols-[10rem_1fr] md:gap-8">
                <dt className="pt-0.5">
                  <Kicker className="text-amber">{item.label}</Kicker>
                </dt>
                <dd className="text-lg leading-relaxed text-muted group-hover:text-foreground">
                  {item.detail}
                </dd>
              </div>
            );

            return (
              <Reveal key={item.label} delay={Math.min(i * 0.07, 0.35)}>
                {item.href ? (
                  <Link href={item.href} className="group block">
                    {row}
                  </Link>
                ) : (
                  row
                )}
              </Reveal>
            );
          })}
        </dl>
      </Container>
    </>
  );
}
