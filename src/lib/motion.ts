import type { Transition, Variants } from "framer-motion";

/**
 * Centralized animation grammar.
 * Slow, weighted, cinematic — nothing snaps, everything settles.
 */

export const EASE_CINEMA = [0.16, 1, 0.3, 1] as const;

export const transitions = {
  /** Default settle for reveals. */
  settle: { duration: 0.9, ease: EASE_CINEMA } satisfies Transition,
  /** Slower, for large hero elements. */
  slow: { duration: 1.4, ease: EASE_CINEMA } satisfies Transition,
  /** Quick response for hover-level feedback. */
  quick: { duration: 0.35, ease: EASE_CINEMA } satisfies Transition,
} as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: transitions.settle },
};

export const fade: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: transitions.slow },
};

export const stagger = (delayChildren = 0.08, staggerChildren = 0.09): Variants => ({
  hidden: {},
  visible: { transition: { delayChildren, staggerChildren } },
});

/** Word-level reveal used by TextReveal. */
export const wordReveal: Variants = {
  hidden: { opacity: 0, y: "60%", rotate: 1.5 },
  visible: {
    opacity: 1,
    y: "0%",
    rotate: 0,
    transition: { duration: 0.8, ease: EASE_CINEMA },
  },
};

/** Viewport config shared by all scroll reveals. */
export const viewportOnce = { once: true, margin: "0px 0px -12% 0px" } as const;
