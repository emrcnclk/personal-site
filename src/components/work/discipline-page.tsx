import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";
import { Section } from "@/components/ui/section";
import { Kicker } from "@/components/ui/kicker";
import { NoirLink } from "@/components/ui/noir-link";
import { Reveal } from "@/components/motion/reveal";
import { ProjectRow } from "@/components/cards/project-row";
import type { Discipline } from "@/data/projects";
import { getLiveProjects } from "@/lib/github";
import { getPageUi } from "@/lib/i18n-pages";
import type { Lang } from "@/lib/i18n";

export type DisciplineContent = {
  discipline: Discipline;
  kicker: string;
  title: string;
  lede: string;
  principles: { title: string; body: string }[];
};

/**
 * Shared template for AI / Game Development / Mobile.
 * Projects come live from GitHub, filtered by discipline.
 */
export async function DisciplinePage({
  content,
  lang = "en",
}: {
  content: DisciplineContent;
  lang?: Lang;
}) {
  const shared = getPageUi("disciplineShared", lang);
  const all = await getLiveProjects();
  const projects = all.filter((p) => p.discipline === content.discipline);

  return (
    <>
      <PageHeader kicker={content.kicker} title={content.title} lede={content.lede} />

      <Section compact className="pt-0">
        <Container>
          <div className="relative z-10 grid gap-px border border-line bg-line md:grid-cols-3">
            {content.principles.map((p, i) => (
              <Reveal key={p.title} delay={Math.min(i * 0.08, 0.3)} className="bg-night">
                <div className="h-full p-8 md:p-10">
                  <span className="font-mono text-xs text-faint">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h2 className="display mt-6 text-xl">{p.title}</h2>
                  <p className="mt-3 text-sm leading-relaxed text-muted">{p.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <Section compact>
        <Container>
          <div className="mb-12 flex flex-wrap items-center justify-between gap-4">
            <Kicker>{shared.fieldWork}</Kicker>
            <NoirLink href="/projects">{shared.allProjects}</NoirLink>
          </div>
          {projects.length === 0 ? (
            <p className="border-t border-line pt-10 font-mono text-sm text-faint">
              {shared.empty}
            </p>
          ) : (
            <ul className="relative z-10 border-b border-line">
              {projects.map((project, i) => (
                <ProjectRow key={project.slug} project={project} index={i} lang={lang} />
              ))}
            </ul>
          )}
        </Container>
      </Section>
    </>
  );
}
