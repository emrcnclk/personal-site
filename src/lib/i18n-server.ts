import { cookies } from "next/headers";
import { LANG_COOKIE, normalizeLang, type Lang } from "@/lib/i18n";

/** Server: query param wins, then cookie, else EN. */
export async function getServerLang(
  searchParam?: string | string[] | null,
): Promise<Lang> {
  const fromQuery = Array.isArray(searchParam) ? searchParam[0] : searchParam;
  if (fromQuery) return normalizeLang(fromQuery);
  try {
    const jar = await cookies();
    return normalizeLang(jar.get(LANG_COOKIE)?.value);
  } catch {
    return "en";
  }
}

type LangSearch =
  | Promise<{ lang?: string }>
  | { lang?: string }
  | undefined;

/** Resolve lang from Next.js page searchParams (Promise or plain). */
export async function resolvePageLang(searchParams?: LangSearch): Promise<Lang> {
  const resolved =
    searchParams && typeof (searchParams as Promise<unknown>).then === "function"
      ? await (searchParams as Promise<{ lang?: string }>)
      : ((searchParams as { lang?: string } | undefined) ?? {});
  return getServerLang(resolved.lang);
}
