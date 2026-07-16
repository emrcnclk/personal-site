import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";
import { Reveal } from "@/components/motion/reveal";
import { photoSets, type PhotoSet } from "@/data/creative";
import { getPageUi } from "@/lib/i18n-pages";
import { resolvePageLang } from "@/lib/i18n-server";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Photography",
  description:
    "Night photography sets: wet streets, warm windows, terminals after midnight.",
  path: "/photography",
});

const tones: Record<PhotoSet["tone"], string> = {
  amber:
    "radial-gradient(80% 90% at 30% 80%, rgba(217,160,91,0.22) 0%, rgba(12,14,20,1) 75%)",
  cyan:
    "radial-gradient(80% 90% at 70% 20%, rgba(143,184,198,0.18) 0%, rgba(12,14,20,1) 75%)",
  neutral:
    "radial-gradient(80% 90% at 50% 50%, rgba(232,226,214,0.10) 0%, rgba(12,14,20,1) 78%)",
};

export default async function PhotographyPage({
  searchParams,
}: {
  searchParams?: Promise<{ lang?: string }> | { lang?: string };
}) {
  const lang = await resolvePageLang(searchParams);
  const ui = getPageUi("photography", lang);

  return (
    <>
      <PageHeader kicker={ui.kicker} title={ui.title} lede={ui.lede} />
      <Container size="wide" className="pb-32">
        <div className="grid gap-8 md:grid-cols-3">
          {photoSets.map((set, i) => (
            <Reveal key={set.slug} delay={Math.min(i * 0.08, 0.3)}>
              <figure className="group">
                <div
                  className="relative aspect-[4/5] overflow-hidden border border-line transition-colors duration-500 group-hover:border-line-strong"
                  style={{ background: tones[set.tone] }}
                >
                  <span className="absolute left-4 top-4 font-mono text-[0.6rem] uppercase tracking-[0.25em] text-faint">
                    {ui.setLabel} {String(i + 1).padStart(2, "0")} — {set.frames} {ui.frames}
                  </span>
                  <span className="absolute bottom-4 right-4 font-mono text-[0.6rem] uppercase tracking-[0.25em] text-faint">
                    {set.year}
                  </span>
                </div>
                <figcaption className="mt-5">
                  <h2 className="display text-xl transition-colors duration-300 group-hover:text-amber">
                    {set.title}
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{set.description}</p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.25} className="mt-16">
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-faint">{ui.footer}</p>
        </Reveal>
      </Container>
    </>
  );
}
