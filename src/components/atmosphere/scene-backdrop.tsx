"use client";

import { cn } from "@/lib/utils";

type SceneBackdropProps = {
  src: string;
  /** Soften how much of the image shows through. 0–100. */
  opacity?: number;
  /** Prefer cover for full-bleed, contain for portrait/circular stills. */
  fit?: "cover" | "contain";
  /** Position hint for the image. */
  position?: string;
  className?: string;
  /** Use <img> for animated GIF (Next/Image freezes loops). */
  animated?: boolean;
};

/**
 * Semi-transparent scene plate behind a section.
 * Keeps type readable via a night wash over the media.
 */
export function SceneBackdrop({
  src,
  opacity = 28,
  fit = "cover",
  position = "center",
  className,
  animated = false,
}: SceneBackdropProps) {
  return (
    <div
      aria-hidden
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt=""
        className={cn(
          "absolute inset-0 size-full select-none",
          fit === "cover" ? "object-cover" : "object-contain",
        )}
        style={{
          opacity: opacity / 100,
          objectPosition: position,
          ...(animated ? {} : { filter: "saturate(0.85) contrast(1.05)" }),
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-night/55 via-night/70 to-night/90" />
      <div className="absolute inset-0 bg-night/25" />
    </div>
  );
}
