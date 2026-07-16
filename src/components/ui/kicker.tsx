import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type KickerProps = {
  children: ReactNode;
  className?: string;
  /** Show the small amber signal dot before the label. */
  signal?: boolean;
};

/** Small mono eyebrow label — the site's typographic punctuation. */
export function Kicker({ children, className, signal }: KickerProps) {
  return (
    <span className={cn("kicker inline-flex items-center gap-2.5", className)}>
      {signal && (
        <span aria-hidden className="size-1 rounded-full bg-amber animate-flicker" />
      )}
      {children}
    </span>
  );
}
