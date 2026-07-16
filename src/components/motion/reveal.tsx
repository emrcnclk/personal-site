"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { EASE_CINEMA, viewportOnce } from "@/lib/motion";
import { cn } from "@/lib/utils";

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Extra delay in seconds, for manual choreography. */
  delay?: number;
  /** Vertical travel distance in px. */
  distance?: number;
  as?: "div" | "section" | "li" | "span" | "article";
};

/** Scroll-triggered fade-and-rise. The workhorse reveal of the site. */
export function Reveal({
  children,
  className,
  delay = 0,
  distance = 28,
  as = "div",
}: RevealProps) {
  const reduced = useReducedMotion();
  const Comp = motion[as];

  return (
    <Comp
      className={cn(className)}
      initial={reduced ? false : { opacity: 0, y: distance }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewportOnce}
      transition={{ duration: 0.9, ease: EASE_CINEMA, delay }}
    >
      {children}
    </Comp>
  );
}
