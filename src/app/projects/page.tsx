import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";
import { ProjectRow } from "@/components/cards/project-row";
import { SceneBackdrop } from "@/components/atmosphere/scene-backdrop";
import { NoirLink } from "@/components/ui/noir-link";
import { atmosphere } from "@/data/atmosphere";
import { site } from "@/config/site";
import { getLiveProjects } from "@/lib/github";
import { getPageUi } from "@/lib/i18n-pages";
import { resolvePageLang } from "@/lib/i18n-server";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Projects",
  description:
    "Live hangar from GitHub — latest public repos, curated when the signal is strong.",
  path: "/projects",
});

export default async function ProjectsPage({
  searchParams,
}: {
  searchParams?: Promise<{ lang?: string | string[] }>;
}) {
  const lang = await resolvePageLang(searchParams);
  const ui = getPageUi("projects", lang);
  const projects = await getLiveProjects();

  return (
    <div className="relative overflow-hidden">
      <SceneBackdrop
        src={atmosphere.github}
        opacity={22}
        fit="cover"
        position="center center"
      />
      <div className="relative z-10">
        <PageHeader kicker={ui.kicker} title={ui.title} lede={ui.lede}>
          <div className="mt-8">
            <NoirLink href={site.socials.github} external>
              github.com/{site.githubUser}
            </NoirLink>
          </div>
        </PageHeader>
        <Container className="pb-32">
          <ul className="border-b border-line">
            {projects.map((project, i) => (
              <ProjectRow key={project.slug} project={project} index={i} lang={lang} />
            ))}
          </ul>
        </Container>
      </div>
    </div>
  );
}
