"use client";

import { useEffect } from "react";

/**
 * Enables the Spike cursor pack on fine pointers.
 * Actual art lives in /public/cursors — CSS applies the .cur/.png files.
 * Reduced-motion / touch devices keep the system cursor.
 */
export function CustomCursor() {
  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;

    document.documentElement.dataset.spikeCursor = "true";
    return () => {
      delete document.documentElement.dataset.spikeCursor;
    };
  }, []);

  return null;
}
