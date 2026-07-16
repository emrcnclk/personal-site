import type { ReactNode } from "react";
import { Container } from "@/components/ui/container";
import { Kicker } from "@/components/ui/kicker";
import { Reveal } from "@/components/motion/reveal";
import { TextReveal } from "@/components/motion/text-reveal";
import { cn } from "@/lib/utils";

type PageHeaderProps = {
  /** Mono eyebrow, e.g. "SEC. 04 — GAME DEVELOPMENT". */
  kicker: string;
  title: string;
  lede?: string;
  children?: ReactNode;
  className?: string;
};

/**
 * The opening frame of every inner page: eyebrow, display title,
 * one-paragraph lede. Consistent enough to feel like chapters
 * of the same film.
 */
export function PageHeader({ kicker, title, lede, children, className }: PageHeaderProps) {
  return (
    <header className={cn("pt-40 pb-20 md:pt-52 md:pb-28", className)}>
      <Container>
        <Reveal distance={12}>
          <Kicker signal>{kicker}</Kicker>
        </Reveal>
        <TextReveal
          as="h1"
          text={title}
          delay={0.15}
          className="display mt-6 text-5xl md:text-7xl lg:text-8xl"
        />
        {lede && (
          <Reveal delay={0.5} className="mt-8 max-w-xl">
            <p className="text-lg leading-relaxed text-muted">{lede}</p>
          </Reveal>
        )}
        {children}
      </Container>
    </header>
  );
}
