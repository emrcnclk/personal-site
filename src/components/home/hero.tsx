"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { site } from "@/config/site";
import { atmosphere } from "@/data/atmosphere";
import { EASE_CINEMA, stagger, wordReveal } from "@/lib/motion";
import { Kicker } from "@/components/ui/kicker";
import { SceneBackdrop } from "@/components/atmosphere/scene-backdrop";
import {
  getHeroUi,
  getMotto,
  getRoles,
  type Lang,
} from "@/lib/i18n";

/**
 * Opening title card — late-night jazz club meets space western.
 * The GIF sits soft behind the type: atmosphere, not a sticker.
 */
export function Hero({ lang = "en" }: { lang?: Lang }) {
  const ui = getHeroUi(lang);
  const motto = getMotto(lang);
  const roles = getRoles(lang);
  const headline = [...ui.headline];

  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} className="relative flex min-h-dvh flex-col justify-center overflow-hidden">
      <SceneBackdrop
        src={atmosphere.first}
        animated
        opacity={32}
        fit="cover"
        position="center 30%"
      />

      <div
        aria-hidden
        className="absolute inset-0 animate-drift"
        style={{
          background:
            "radial-gradient(48% 40% at 72% 22%, rgba(232,140,70,0.12) 0%, transparent 68%), radial-gradient(36% 30% at 14% 75%, rgba(90,190,210,0.06) 0%, transparent 70%)",
        }}
      />

      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-[18%] hidden h-px bg-line md:block"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-[22%] hidden h-px bg-line md:block"
      />

      <motion.div
        style={reduced ? undefined : { y, opacity }}
        className="relative mx-auto w-full max-w-6xl px-6 md:px-10"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="flex flex-wrap items-center gap-4"
        >
          <Kicker signal>
            {ui.session} — {site.location}
          </Kicker>
          <span className="hidden font-mono text-[0.6rem] uppercase tracking-[0.28em] text-faint sm:inline">
            {ui.live}
          </span>
        </motion.div>

        <motion.h1
          key={lang}
          className="display mt-8 text-[clamp(2.6rem,9.5vw,7.5rem)]"
          variants={stagger(0.35, 0.12)}
          initial={reduced ? false : "hidden"}
          animate="visible"
          aria-label={headline.join(" ")}
        >
          {headline.map((line, i) => (
            <span key={`${lang}-${i}`} className="block overflow-hidden pb-[0.06em] -mb-[0.06em]">
              <motion.span variants={wordReveal} className="block will-change-transform">
                {i === headline.length - 1 ? (
                  <em className="text-amber not-italic">{line}</em>
                ) : (
                  line
                )}
              </motion.span>
            </span>
          ))}
        </motion.h1>

        <motion.p
          className="mt-8 max-w-xl text-base leading-relaxed text-muted md:text-lg"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE_CINEMA, delay: 1.0 }}
        >
          {motto}
        </motion.p>

        <motion.div
          className="mt-10 flex flex-wrap items-center gap-x-3 gap-y-2"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE_CINEMA, delay: 1.2 }}
        >
          {roles.map((role, i) => (
            <span
              key={role}
              className="flex items-center gap-3 font-mono text-[0.65rem] uppercase tracking-[0.2em] text-muted"
            >
              {i > 0 && (
                <span aria-hidden className="text-faint">
                  ·
                </span>
              )}
              {role}
            </span>
          ))}
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        aria-hidden
      >
        <div className="flex flex-col items-center gap-3">
          <span className="font-mono text-[0.6rem] uppercase tracking-[0.3em] text-faint">
            {ui.drop}
          </span>
          <motion.span
            className="block h-10 w-px bg-gradient-to-b from-amber/70 to-transparent"
            animate={reduced ? undefined : { scaleY: [1, 0.4, 1], opacity: [0.8, 0.3, 0.8] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
            style={{ transformOrigin: "top" }}
          />
        </div>
      </motion.div>
    </section>
  );
}
