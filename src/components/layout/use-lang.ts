"use client";

import { useCallback, useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { LANG_COOKIE, normalizeLang, type Lang } from "@/lib/i18n";

function readCookieLang(): Lang | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(/(?:^|; )lang=(en|tr)/i);
  return match ? normalizeLang(match[1]) : null;
}

export function writeLangCookie(lang: Lang) {
  document.cookie = `${LANG_COOKIE}=${lang};path=/;max-age=31536000;samesite=lax`;
  document.documentElement.lang = lang;
}

/** Client lang: URL ?lang= wins, then cookie. */
export function useLang(): Lang {
  const searchParams = useSearchParams();
  const fromQuery = searchParams.get("lang");
  const [lang, setLang] = useState<Lang>(() =>
    normalizeLang(fromQuery ?? (typeof document !== "undefined" ? readCookieLang() : "en")),
  );

  useEffect(() => {
    if (fromQuery) {
      const next = normalizeLang(fromQuery);
      writeLangCookie(next);
      setLang(next);
      return;
    }
    const cookie = readCookieLang();
    if (cookie) setLang(cookie);
  }, [fromQuery]);

  return lang;
}

export function useSetLang() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  return useCallback(
    (nextLang: Lang) => {
      writeLangCookie(nextLang);
      const params = new URLSearchParams(searchParams.toString());
      params.set("lang", nextLang);
      const qs = params.toString();
      router.replace(qs ? `${pathname}?${qs}` : pathname);
      router.refresh();
    },
    [pathname, router, searchParams],
  );
}
