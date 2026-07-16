"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { navigation } from "@/config/navigation";
import { site } from "@/config/site";
import { EASE_CINEMA } from "@/lib/motion";
import { LanguageSwitcher } from "@/components/layout/language-switcher";
import { useLang } from "@/components/layout/use-lang";
import { getFooterUi, tNavGroupTitle, tNavItemLabel, tNavItemNote } from "@/lib/i18n";

type MenuOverlayProps = {
  open: boolean;
  onClose: () => void;
};

export function MenuOverlay({ open, onClose }: MenuOverlayProps) {
  const pathname = usePathname();
  const lang = useLang();
  const footer = getFooterUi(lang);

  return (
    <AnimatePresence>
      {open && (
        <motion.nav
          key="menu"
          aria-label="Site navigation"
          className="fixed inset-0 z-[75] overflow-y-auto bg-night/97 backdrop-blur-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.4 } }}
          transition={{ duration: 0.5, ease: EASE_CINEMA }}
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-60"
            style={{
              background:
                "radial-gradient(40% 30% at 15% 20%, rgba(232,140,70,0.08) 0%, transparent 70%), radial-gradient(35% 28% at 85% 70%, rgba(80,180,200,0.06) 0%, transparent 70%)",
            }}
          />

          <div className="relative mx-auto grid min-h-full w-full max-w-6xl content-center gap-12 px-6 py-32 md:grid-cols-2 md:px-10 lg:grid-cols-4 lg:gap-8">
            {navigation.map((group, gi) => (
              <motion.div
                key={group.title}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.7, ease: EASE_CINEMA, delay: 0.1 + gi * 0.08 }}
              >
                <p className="kicker mb-6 text-faint">
                  {String(gi + 1).padStart(2, "0")} / {tNavGroupTitle(group.title, lang)}
                </p>
                <ul className="space-y-1">
                  {group.items.map((item) => {
                    const active = !item.external && pathname === item.href;
                    const className =
                      "group flex items-baseline justify-between gap-4 py-1.5";
                    const label = (
                      <>
                        <span
                          className={`display text-2xl transition-colors duration-300 md:text-[1.7rem] ${
                            active
                              ? "text-amber"
                              : "text-foreground/80 group-hover:text-foreground"
                          }`}
                        >
                          {tNavItemLabel(item.label, lang)}
                        </span>
                        <span className="font-mono text-[0.6rem] uppercase tracking-[0.18em] text-faint opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                          {tNavItemNote(item.note, lang)}
                        </span>
                      </>
                    );

                    return (
                      <li key={item.href}>
                        {item.external ? (
                          <a
                            href={item.href}
                            target="_blank"
                            rel="noreferrer"
                            onClick={onClose}
                            className={className}
                          >
                            {label}
                          </a>
                        ) : (
                          <Link
                            href={item.href}
                            onClick={onClose}
                            className={className}
                            aria-current={active ? "page" : undefined}
                          >
                            {label}
                          </Link>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </motion.div>
            ))}

            <motion.div
              className="md:col-span-2 lg:col-span-4 flex flex-wrap items-center justify-between gap-6 border-t border-line pt-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7, delay: 0.5 }}
            >
              <span className="font-mono text-xs tracking-[0.22em] uppercase text-faint">
                {site.location} · {footer.freqOpen}
              </span>
              <div className="flex flex-wrap gap-5">
                {Object.entries(site.socials).map(([name, url]) => (
                  <a
                    key={name}
                    href={url}
                    target="_blank"
                    rel="noreferrer"
                    className="font-mono text-[0.65rem] tracking-[0.2em] uppercase text-muted transition-colors hover:text-amber"
                  >
                    {name}
                  </a>
                ))}
              </div>
              <div className="flex w-full justify-end sm:hidden md:w-auto">
                <LanguageSwitcher />
              </div>
            </motion.div>
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
