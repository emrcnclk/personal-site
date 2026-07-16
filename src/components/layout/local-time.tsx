"use client";

import { useEffect, useState } from "react";
import { site } from "@/config/site";
import { cn } from "@/lib/utils";
import { useLang } from "@/components/layout/use-lang";

/** Live local time of my city — a quiet reminder there's a person here. */
export function LocalTime({ className }: { className?: string }) {
  const lang = useLang();
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const update = () =>
      setTime(
        new Intl.DateTimeFormat(lang === "tr" ? "tr-TR" : "en-GB", {
          hour: "2-digit",
          minute: "2-digit",
          timeZone: site.timezone,
        }).format(new Date()),
      );
    update();
    const id = setInterval(update, 30_000);
    return () => clearInterval(id);
  }, [lang]);

  return (
    <span
      className={cn("font-mono text-xs tracking-[0.22em] text-faint uppercase", className)}
      suppressHydrationWarning
    >
      {site.location.split(",")[0]} — {time ?? "--:--"}
    </span>
  );
}
