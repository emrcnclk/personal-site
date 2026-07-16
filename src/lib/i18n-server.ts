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

export type PageSearchParams = Promise<{ lang?: string | string[] }>;

/** Resolve lang from Next.js 15 page searchParams Promise. */
export async function resolvePageLang(
  searchParams?: PageSearchParams,
): Promise<Lang> {
  const resolved = searchParams ? await searchParams : {};
  return getServerLang(resolved.lang);
}
