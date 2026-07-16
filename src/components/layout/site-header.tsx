"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { site } from "@/config/site";
import { MenuOverlay } from "@/components/layout/menu-overlay";
import { LocalTime } from "@/components/layout/local-time";
import { LanguageSwitcher } from "@/components/layout/language-switcher";
import { useLang } from "@/components/layout/use-lang";
import { headerUi } from "@/lib/i18n";

/**
 * Fixed chrome: wordmark, local time, language, menu trigger.
 * Backgroundless — the page scrolls beneath it like credits.
 */
export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const lang = useLang();
  const ui = headerUi[lang];

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-[80]">
        <div className="flex items-center justify-between gap-4 px-6 py-5 md:px-10 md:py-6">
          <Link
            href="/"
            onClick={() => setOpen(false)}
            className="font-mono text-sm tracking-[0.3em] text-foreground transition-opacity hover:opacity-70"
            aria-label={`${site.name} — home`}
          >
            {site.monogram}
          </Link>

          <LocalTime className="hidden md:block" />

          <div className="flex items-center gap-4 md:gap-6">
            <LanguageSwitcher className="hidden sm:block" />
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-label={open ? ui.closeAria : ui.openAria}
              className="group flex items-center gap-3 font-mono text-xs uppercase tracking-[0.22em] text-muted transition-colors hover:text-foreground"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={open ? "close" : "menu"}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.25 }}
                >
                  {open ? ui.close : ui.menu}
                </motion.span>
              </AnimatePresence>
              <span className="relative flex h-3 w-6 flex-col justify-between" aria-hidden>
                <span
                  className={`h-px w-full bg-current transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    open ? "translate-y-[5.5px] rotate-[135deg]" : ""
                  }`}
                />
                <span
                  className={`h-px w-full bg-current transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    open ? "-translate-y-[5.5px] -rotate-[135deg]" : "group-hover:scale-x-75 origin-right"
                  }`}
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      <MenuOverlay open={open} onClose={() => setOpen(false)} />
    </>
  );
}
