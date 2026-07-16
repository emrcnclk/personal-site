import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";
import { Reveal } from "@/components/motion/reveal";
import { drawings } from "@/data/creative";
import { getPageUi } from "@/lib/i18n-pages";
import { resolvePageLang } from "@/lib/i18n-server";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Drawings",
  description: "Pages from the sketchbook: ink studies, concept work, and hands — always hands.",
  path: "/drawings",
});

export default async function DrawingsPage({
  searchParams,
}: {
  searchParams?: Promise<{ lang?: string | string[] }>;
}) {
  const lang = await resolvePageLang(searchParams);
  const ui = getPageUi("drawings", lang);

  return (
    <>
      <PageHeader kicker={ui.kicker} title={ui.title} lede={ui.lede} />
      <Container className="pb-32">
        <ul className="border-b border-line">
          {drawings.map((d, i) => (
            <Reveal as="li" key={d.id} delay={Math.min(i * 0.07, 0.3)}>
              <div className="grid gap-3 border-t border-line py-8 md:grid-cols-[7rem_1fr_12rem] md:gap-8 md:py-10">
                <span className="pt-1 font-mono text-xs uppercase tracking-[0.15em] text-faint">
                  {d.id} · {d.year}
                </span>
                <div>
                  <h2 className="display text-2xl">{d.title}</h2>
                  <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted">{d.note}</p>
                </div>
                <span className="pt-1 font-mono text-xs uppercase tracking-[0.15em] text-cyan md:text-right">
                  {d.medium}
                </span>
              </div>
            </Reveal>
          ))}
        </ul>
      </Container>
    </>
  );
}
