import { Reveal } from "@/components/motion/reveal";
import type { Experiment } from "@/data/experiments";
import { getPageUi } from "@/lib/i18n-pages";
import type { Lang } from "@/lib/i18n";

const statusDot: Record<Experiment["status"], string> = {
  live: "bg-amber animate-flicker",
  dormant: "bg-cyan",
  dissected: "bg-faint",
};

/** Log-book style list for playground experiments. */
export function ExperimentList({
  items,
  lang = "en",
}: {
  items: Experiment[];
  lang?: Lang;
}) {
  const statusLabels = getPageUi("experimentStatus", lang);

  return (
    <ul className="border-b border-line">
      {items.map((exp, i) => (
        <Reveal as="li" key={exp.id} delay={Math.min(i * 0.07, 0.3)}>
          <div className="grid gap-3 border-t border-line py-8 md:grid-cols-[7rem_1fr_10rem] md:gap-8 md:py-10">
            <span className="pt-1 font-mono text-xs uppercase tracking-[0.15em] text-faint">
              {exp.id} · {exp.year}
            </span>
            <div>
              <h3 className="display text-2xl">{exp.title}</h3>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">{exp.note}</p>
              <p className="mt-3 font-mono text-[0.65rem] uppercase tracking-[0.18em] text-faint">
                {exp.tags.join(" · ")}
              </p>
            </div>
            <span className="inline-flex items-start gap-2 pt-1 font-mono text-xs uppercase tracking-[0.18em] text-muted md:justify-end">
              <span aria-hidden className={`mt-1 size-1 rounded-full ${statusDot[exp.status]}`} />
              {statusLabels[exp.status]}
            </span>
          </div>
        </Reveal>
      ))}
    </ul>
  );
}
