import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";
import { Section } from "@/components/ui/section";
import { Kicker } from "@/components/ui/kicker";
import { NoirLink } from "@/components/ui/noir-link";
import { Reveal } from "@/components/motion/reveal";
import { SceneBackdrop } from "@/components/atmosphere/scene-backdrop";
import { atmosphere } from "@/data/atmosphere";
import { site } from "@/config/site";
import { getMotto, getRoles } from "@/lib/i18n";
import { getPageUi } from "@/lib/i18n-pages";
import { resolvePageLang } from "@/lib/i18n-server";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "About",
  description: site.motto,
  path: "/about",
});

export default async function AboutPage({
  searchParams,
}: {
  searchParams?: Promise<{ lang?: string }> | { lang?: string };
}) {
  const lang = await resolvePageLang(searchParams);
  const ui = getPageUi("about", lang);
  const motto = getMotto(lang);
  const roles = getRoles(lang);

  return (
    <div className="relative overflow-hidden">
      <SceneBackdrop src={atmosphere.me} opacity={26} fit="cover" position="center 20%" />
      <div className="relative z-10">
        <PageHeader kicker={ui.kicker} title={ui.title} lede={motto} />

        <Section compact className="pt-0">
          <Container>
            <div className="grid gap-16 md:grid-cols-[1fr_20rem]">
              <div className="prose-noir max-w-2xl">
                {ui.paragraphs.map((paragraph, i) => (
                  <Reveal key={i} delay={i * 0.08}>
                    <p>{paragraph.replace("{name}", site.fullName)}</p>
                  </Reveal>
                ))}
              </div>

              <Reveal delay={0.2}>
                <div className="border border-line bg-panel/50 p-8">
                  <Kicker className="text-faint">{ui.capabilities}</Kicker>
                  <ul className="mt-6 space-y-3">
                    {roles.map((role) => (
                      <li
                        key={role}
                        className="border-b border-line pb-3 text-sm text-muted last:border-0"
                      >
                        {role}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-8 flex flex-col gap-3">
                    {Object.entries(site.socials).map(([name, url]) => (
                      <a
                        key={name}
                        href={url}
                        target="_blank"
                        rel="noreferrer"
                        className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-faint transition-colors hover:text-amber"
                      >
                        {name} ↗
                      </a>
                    ))}
                  </div>
                </div>
              </Reveal>
            </div>
          </Container>
        </Section>

        <Section compact>
          <Container>
            <Reveal>
              <Kicker>{ui.principles}</Kicker>
            </Reveal>
            <div className="mt-10 grid gap-px border border-line bg-line md:grid-cols-2">
              {ui.beliefs.map((b, i) => (
                <Reveal key={b.title} delay={Math.min(i * 0.08, 0.3)} className="bg-night">
                  <div className="h-full p-8 md:p-10">
                    <span className="font-mono text-xs text-faint">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h2 className="display mt-5 text-2xl">{b.title}</h2>
                    <p className="mt-3 text-sm leading-relaxed text-muted">{b.body}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </Container>
        </Section>

        <Section compact>
          <Container>
            <Reveal>
              <Kicker>{ui.trajectory}</Kicker>
            </Reveal>
            <ul className="mt-10 border-b border-line">
              {ui.timeline.map((t, i) => (
                <Reveal as="li" key={t.period} delay={Math.min(i * 0.08, 0.3)}>
                  <div className="grid gap-2 border-t border-line py-8 md:grid-cols-[10rem_1fr] md:gap-8">
                    <span className="pt-1 font-mono text-xs uppercase tracking-[0.18em] text-amber">
                      {t.period}
                    </span>
                    <p className="max-w-2xl leading-relaxed text-muted">{t.note}</p>
                  </div>
                </Reveal>
              ))}
            </ul>
            <Reveal delay={0.2} className="mt-12 flex flex-wrap gap-8">
              <NoirLink href="/contact">{ui.openChannel}</NoirLink>
              <NoirLink href={site.socials.github} external>
                GitHub
              </NoirLink>
            </Reveal>
          </Container>
        </Section>
      </div>
    </div>
  );
}
