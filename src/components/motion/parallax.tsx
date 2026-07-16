"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type ParallaxProps = {
  children: ReactNode;
  className?: string;
  /** Positive drifts down, negative drifts up. Keep within ±80. */
  offset?: number;
};

/** Gentle scroll parallax. Subtle by design — depth, not spectacle. */
export function Parallax({ children, className, offset = 40 }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [offset, -offset]);

  return (
    <motion.div ref={ref} style={reduced ? undefined : { y }} className={cn(className)}>
      {children}
    </motion.div>
  );
}
