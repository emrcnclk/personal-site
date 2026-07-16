import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Formats a date as an editorial byline, e.g. "16 Jul 2026". */
export function formatDate(date: string | Date, lang: "en" | "tr" = "en") {
  return new Date(date).toLocaleDateString(lang === "tr" ? "tr-TR" : "en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

/** Zero-padded editorial index, e.g. 3 -> "03". */
export function pad(n: number) {
  return String(n).padStart(2, "0");
}
