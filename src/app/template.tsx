"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { EASE_CINEMA } from "@/lib/motion";

/** Page transition: every route fades in like a scene cut. */
export default function Template({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: EASE_CINEMA }}
    >
      {children}
    </motion.div>
  );
}
