import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type SectionProps = {
  children: ReactNode;
  className?: string;
  id?: string;
  /** Compact halves the vertical rhythm. */
  compact?: boolean;
};

/** Vertical rhythm unit. All page sections breathe the same way. */
export function Section({ children, className, id, compact }: SectionProps) {
  return (
    <section
      id={id}
      className={cn(compact ? "py-section-sm" : "py-section", className)}
    >
      {children}
    </section>
  );
}
