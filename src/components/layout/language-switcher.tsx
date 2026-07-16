"use client";

import { langLabel } from "@/lib/i18n";
import { useLang, useSetLang } from "@/components/layout/use-lang";

export function LanguageSwitcher({ className }: { className?: string }) {
  const current = useLang();
  const setLang = useSetLang();

  return (
    <div className={className}>
      <div
        className="inline-flex rounded-full border border-line bg-night/60 p-1"
        role="group"
        aria-label="Language"
      >
        <button
          type="button"
          onClick={() => setLang("en")}
          className={`rounded-full px-3 py-1.5 font-mono text-xs tracking-[0.18em] uppercase transition-colors ${
            current === "en" ? "bg-panel text-foreground" : "text-muted hover:text-foreground"
          }`}
          aria-pressed={current === "en"}
          title={langLabel("en")}
        >
          EN
        </button>
        <button
          type="button"
          onClick={() => setLang("tr")}
          className={`rounded-full px-3 py-1.5 font-mono text-xs tracking-[0.18em] uppercase transition-colors ${
            current === "tr" ? "bg-panel text-foreground" : "text-muted hover:text-foreground"
          }`}
          aria-pressed={current === "tr"}
          title={langLabel("tr")}
        >
          TR
        </button>
      </div>
    </div>
  );
}
