import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import type { Project } from "@/data/projects";
import { disciplineUi, projectStatusUi, type Lang } from "@/lib/i18n";
import { pad } from "@/lib/utils";

const statusDot: Record<Project["status"], string> = {
  shipped: "bg-cyan",
  "in-progress": "bg-amber animate-flicker",
  archived: "bg-faint",
};

export function ProjectRow({
  project,
  index,
  lang = "en",
}: {
  project: Project;
  index: number;
  lang?: Lang;
}) {
  return (
    <Reveal as="li" delay={Math.min(index * 0.06, 0.3)}>
      <div className="group relative border-t border-line py-10 transition-colors duration-500 hover:border-line-strong md:py-12">
        <div className="grid gap-4 md:grid-cols-[5rem_1fr_16rem] md:gap-8">
          <span className="pt-2 font-mono text-xs text-faint">{pad(index + 1)}</span>

          <div>
            {project.link ? (
              <a
                href={project.link}
                target="_blank"
                rel="noreferrer"
                className="display inline-flex items-center gap-2 text-3xl transition-colors duration-300 group-hover:text-amber md:text-4xl"
              >
                {project.title}
                <ArrowUpRight
                  aria-hidden
                  className="size-5 text-faint transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-amber"
                />
              </a>
            ) : (
              <h3 className="display text-3xl transition-colors duration-300 group-hover:text-amber md:text-4xl">
                {project.title}
              </h3>
            )}
            <p className="mt-3 max-w-xl leading-relaxed text-muted">{project.logline}</p>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-faint opacity-0 transition-opacity duration-500 group-hover:opacity-100">
              {project.summary}
            </p>
          </div>

          <div className="flex flex-row flex-wrap items-start gap-x-6 gap-y-2 pt-2 md:flex-col md:items-end md:gap-y-3">
            <span className="font-mono text-xs uppercase tracking-[0.18em] text-faint">
              {project.year} · {disciplineUi[lang][project.discipline]}
            </span>
            <span className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-muted">
              <span aria-hidden className={`size-1 rounded-full ${statusDot[project.status]}`} />
              {projectStatusUi[lang][project.status]}
            </span>
            <span className="font-mono text-[0.65rem] text-faint">
              {project.stack.join(" / ")}
            </span>
          </div>
        </div>
      </div>
    </Reveal>
  );
}
