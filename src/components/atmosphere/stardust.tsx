"use client";

import { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  r: number;
  vx: number;
  vy: number;
  baseAlpha: number;
  phase: number;
  warm: boolean;
};

/**
 * Sparse drifting stardust on a fixed canvas.
 * Density scales with viewport, capped low — atmosphere, not fireworks.
 * Pauses when the tab is hidden; disabled for reduced-motion users.
 */
export function Stardust() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let particles: Particle[] = [];
    let width = 0;
    let height = 0;

    const seed = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.min(Math.round((width * height) / 26000), 70);
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        r: 0.4 + Math.random() * 1.1,
        vx: (Math.random() - 0.5) * 0.08,
        vy: -0.02 - Math.random() * 0.06,
        baseAlpha: 0.12 + Math.random() * 0.3,
        phase: Math.random() * Math.PI * 2,
        warm: Math.random() < 0.18,
      }));
    };

    const tick = (t: number) => {
      ctx.clearRect(0, 0, width, height);
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.y < -4) { p.y = height + 4; p.x = Math.random() * width; }
        if (p.x < -4) p.x = width + 4;
        if (p.x > width + 4) p.x = -4;

        const twinkle = 0.65 + 0.35 * Math.sin(t / 2400 + p.phase);
        ctx.globalAlpha = p.baseAlpha * twinkle;
        ctx.fillStyle = p.warm ? "#e88c46" : "#5abec8";
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
      raf = requestAnimationFrame(tick);
    };

    const onVisibility = () => {
      cancelAnimationFrame(raf);
      if (!document.hidden) raf = requestAnimationFrame(tick);
    };

    seed();
    raf = requestAnimationFrame(tick);
    window.addEventListener("resize", seed);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", seed);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0"
    />
  );
}
