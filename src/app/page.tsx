import Link from "next/link";
import { Hero } from "@/components/home/hero";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { Kicker } from "@/components/ui/kicker";
import { NoirLink } from "@/components/ui/noir-link";
import { ProjectRow } from "@/components/cards/project-row";
import { Reveal } from "@/components/motion/reveal";
import { TextReveal } from "@/components/motion/text-reveal";
import { Parallax } from "@/components/motion/parallax";
import { nowUpdated } from "@/data/now";
import { getFeaturedProjects } from "@/lib/github";
import { getHomeUi, getMotto, getNowItems } from "@/lib/i18n";
import { resolvePageLang } from "@/lib/i18n-server";
import { formatDate } from "@/lib/utils";

export default async function HomePage({
  searchParams,
}: {
  searchParams?: Promise<{ lang?: string }> | { lang?: string };
}) {
  const lang = await resolvePageLang(searchParams);
  const ui = getHomeUi(lang);
  const motto = getMotto(lang);
  const nowItems = getNowItems(lang);
  const featured = await getFeaturedProjects();

  return (
    <>
      <Hero lang={lang} />

      <Section>
        <Container>
          <div className="grid gap-10 md:grid-cols-[8rem_1fr]">
            <Reveal distance={10}>
              <Kicker>{ui.ethosKicker}</Kicker>
            </Reveal>
            <div>
              <TextReveal
                as="p"
                text={ui.ethosHeadline}
                className="display max-w-3xl text-3xl leading-tight md:text-5xl"
              />
              <Reveal delay={0.4} className="mt-10 max-w-xl">
                <p className="leading-relaxed text-muted">{motto}</p>
                <p className="mt-5 leading-relaxed text-muted">{ui.ethosBody}</p>
              </Reveal>
              <Reveal delay={0.55} className="mt-8">
                <NoirLink href="/about">{ui.fullStory}</NoirLink>
              </Reveal>
            </div>
          </div>
        </Container>
      </Section>

      <Section compact>
        <Container>
          <SectionHeading
            kicker={ui.hangarKicker}
            title={ui.hangarTitle}
            action={{ label: ui.allProjects, href: "/projects" }}
          />
          <ul className="border-b border-line">
            {featured.map((project, i) => (
              <ProjectRow key={project.slug} project={project} index={i} lang={lang} />
            ))}
          </ul>
          <Reveal delay={0.2} className="mt-8">
            <NoirLink href="/projects">{ui.openHangar}</NoirLink>
          </Reveal>
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionHeading kicker={ui.universeKicker} title={ui.universeTitle} />
          <div className="relative z-10 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
            {ui.universe.map((item, i) => (
              <Reveal key={item.href} delay={Math.min(i * 0.07, 0.35)} className="bg-night">
                <Link
                  href={item.href}
                  className="group relative z-10 flex h-full flex-col justify-between gap-16 p-8 transition-colors duration-500 hover:bg-panel md:p-10"
                >
                  <span className="font-mono text-xs text-faint">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span>
                    <span className="display block text-3xl transition-colors duration-300 group-hover:text-amber">
                      {item.label}
                    </span>
                    <span className="mt-2 block font-mono text-[0.65rem] uppercase tracking-[0.18em] text-faint">
                      {item.note}
                    </span>
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <Parallax offset={24}>
            <div className="relative z-10 overflow-hidden border border-line bg-panel/50 p-8 md:p-14">
              <div className="relative mb-10 flex flex-wrap items-center justify-between gap-4">
                <Kicker signal>
                  {ui.currentlyPrefix} {formatDate(nowUpdated, lang)}
                </Kicker>
                <NoirLink href="/now">{ui.nowPage}</NoirLink>
              </div>
              <dl className="relative grid gap-x-12 gap-y-8 md:grid-cols-2">
                {nowItems.slice(0, 4).map((item, i) => {
                  const body = (
                    <>
                      <dt className="font-mono text-xs uppercase tracking-[0.2em] text-faint transition-colors group-hover:text-amber">
                        {item.label}
                      </dt>
                      <dd className="mt-2 leading-relaxed text-muted">{item.detail}</dd>
                    </>
                  );
                  return (
                    <Reveal key={item.label} delay={Math.min(i * 0.08, 0.3)}>
                      {item.href ? (
                        <Link href={item.href} className="group block">
                          {body}
                        </Link>
                      ) : (
                        <div>{body}</div>
                      )}
                    </Reveal>
                  );
                })}
              </dl>
            </div>
          </Parallax>
        </Container>
      </Section>
    </>
  );
}
