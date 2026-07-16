import { Kicker } from "@/components/ui/kicker";
import { NoirLink } from "@/components/ui/noir-link";
import { Reveal } from "@/components/motion/reveal";
import { TextReveal } from "@/components/motion/text-reveal";

type SectionHeadingProps = {
  kicker: string;
  title: string;
  action?: { label: string; href: string };
};

/** Consistent section opener used on the home page and hubs. */
export function SectionHeading({ kicker, title, action }: SectionHeadingProps) {
  return (
    <div className="mb-14 flex flex-wrap items-end justify-between gap-6 md:mb-20">
      <div>
        <Reveal distance={10}>
          <Kicker>{kicker}</Kicker>
        </Reveal>
        <TextReveal as="h2" text={title} delay={0.1} className="display mt-4 text-4xl md:text-5xl" />
      </div>
      {action && (
        <Reveal delay={0.3}>
          <NoirLink href={action.href}>{action.label}</NoirLink>
        </Reveal>
      )}
    </div>
  );
}
