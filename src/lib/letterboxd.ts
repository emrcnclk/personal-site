import https from "node:https";
import { site } from "@/config/site";

export type LetterboxdEntry = {
  title: string;
  filmTitle: string;
  filmYear: string;
  rating: string | null;
  watchedDate: string | null;
  link: string;
  poster: string | null;
  review: string;
};

export type LetterboxdProfile = {
  username: string;
  displayName: string;
  bio: string;
  avatar: string | null;
  url: string;
  recentCount: number;
};

const USER = site.letterboxdUser.toLowerCase();
const PROFILE_URL = `https://letterboxd.com/${USER}/`;
const RSS_URL = `https://letterboxd.com/${USER}/rss/`;

/**
 * Letterboxd TLS often fails in local/corporate Windows cert stores
 * (UNABLE_TO_VERIFY_LEAF_SIGNATURE). Fetch via https with
 * rejectUnauthorized:false — scoped to Letterboxd only.
 */
function fetchLetterboxd(url: string, timeoutMs = 20_000): Promise<string> {
  return new Promise((resolve, reject) => {
    const req = https.get(
      url,
      {
        rejectUnauthorized: false,
        headers: {
          "User-Agent": `${site.githubUser}-personal-site/1.0`,
          Accept: "application/rss+xml, application/xml, text/xml, text/html, */*",
        },
        timeout: timeoutMs,
      },
      (res) => {
        const status = res.statusCode ?? 0;
        // Follow one redirect (Letterboxd sometimes 301s trailing slash).
        if (status >= 300 && status < 400 && res.headers.location) {
          res.resume();
          const next = res.headers.location.startsWith("http")
            ? res.headers.location
            : `https://letterboxd.com${res.headers.location}`;
          fetchLetterboxd(next, timeoutMs).then(resolve, reject);
          return;
        }

        if (status < 200 || status >= 300) {
          res.resume();
          reject(new Error(`Letterboxd HTTP ${status}`));
          return;
        }

        const chunks: Buffer[] = [];
        res.on("data", (c) => chunks.push(Buffer.isBuffer(c) ? c : Buffer.from(c)));
        res.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
        res.on("error", reject);
      },
    );

    req.on("timeout", () => {
      req.destroy(new Error("Letterboxd request timed out"));
    });
    req.on("error", reject);
  });
}

function decodeEntities(value: string) {
  return value
    .replaceAll("&amp;", "&")
    .replaceAll("&quot;", '"')
    .replaceAll("&#039;", "'")
    .replaceAll("&apos;", "'")
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">")
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)))
    .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCharCode(parseInt(h, 16)));
}

function tag(item: string, name: string) {
  const escaped = name.replace(":", "\\:");
  const match = item.match(new RegExp(`<${escaped}(?:\\s[^>]*)?>([\\s\\S]*?)<\\/${escaped}>`, "i"));
  return match ? decodeEntities(match[1].trim()) : null;
}

function descriptionHtml(item: string) {
  const cdata = item.match(/<description>\s*<!\[CDATA\[([\s\S]*?)\]\]>\s*<\/description>/i);
  if (cdata) return cdata[1];
  const plain = item.match(/<description>([\s\S]*?)<\/description>/i);
  return plain ? decodeEntities(plain[1]) : "";
}

function stripReview(html: string) {
  return decodeEntities(
    html
      .replace(/<p>\s*<img[\s\S]*?<\/p>/gi, "")
      .replace(/<p>\s*<em>[\s\S]*?<\/em>\s*<\/p>/gi, "")
      .replace(/<br\s*\/?>/gi, "\n")
      .replace(/<[^>]*>/g, "")
      .replace(/[ \t]+\n/g, "\n")
      .replace(/\n{3,}/g, "\n\n")
      .trim(),
  );
}

function posterFrom(html: string) {
  const match =
    html.match(/<img[^>]+src=["']([^"']+)["']/i) ??
    html.match(/src=["'](https:\/\/a\.ltrbxd\.com\/[^"']+)["']/i);
  return match?.[1] ?? null;
}

function isReviewItem(item: string) {
  const guid = tag(item, "guid") ?? "";
  return /letterboxd-review/i.test(guid) || /letterboxd-review/i.test(item);
}

export function parseLetterboxdRss(xml: string): LetterboxdEntry[] {
  const items = xml.match(/<item>[\s\S]*?<\/item>/gi) ?? [];

  const parsed = items.map((item) => {
    const description = descriptionHtml(item);
    const review = stripReview(description);
    return {
      title: tag(item, "title") ?? "Untitled",
      filmTitle: tag(item, "letterboxd:filmTitle") ?? tag(item, "title") ?? "Untitled",
      filmYear: tag(item, "letterboxd:filmYear") ?? "",
      rating: tag(item, "letterboxd:memberRating"),
      watchedDate: tag(item, "letterboxd:watchedDate"),
      link: tag(item, "link") ?? PROFILE_URL,
      poster: posterFrom(description),
      review,
      _isReview: isReviewItem(item),
    };
  });

  // Prefer actual reviews; fall back to diary entries if feed is watch-only.
  const reviews = parsed.filter((e) => e._isReview || e.review.length > 0);
  const list = (reviews.length > 0 ? reviews : parsed).slice(0, 12);

  return list.map((entry) => ({
    title: entry.title,
    filmTitle: entry.filmTitle,
    filmYear: entry.filmYear,
    rating: entry.rating,
    watchedDate: entry.watchedDate,
    link: entry.link,
    poster: entry.poster,
    review: entry.review,
  }));
}

export async function getLetterboxdEntries(): Promise<LetterboxdEntry[]> {
  try {
    const xml = await fetchLetterboxd(RSS_URL);
    const entries = parseLetterboxdRss(xml);
    if (entries.length === 0) {
      console.warn("[letterboxd] RSS parsed empty");
      return [];
    }
    return entries;
  } catch (err) {
    console.error("[letterboxd] RSS fetch failed:", err);
    return [];
  }
}

function parseProfile(html: string, recentCount: number): LetterboxdProfile {
  const fallback: LetterboxdProfile = {
    username: site.letterboxdUser,
    displayName: site.name,
    bio: "Films logged after midnight. Opinions may contain spoilers and feelings.",
    avatar: null,
    url: PROFILE_URL,
    recentCount,
  };

  const ogImage =
    html.match(/property=["']og:image["']\s+content=["']([^"']+)["']/i)?.[1] ??
    html.match(/content=["']([^"']+)["']\s+property=["']og:image["']/i)?.[1] ??
    html.match(/class="profile-avatar"[\s\S]*?<img[^>]+src=["']([^"']+)["']/i)?.[1] ??
    null;

  const ogTitle =
    html.match(/property=["']og:title["']\s+content=["']([^"']+)["']/i)?.[1] ??
    html.match(/content=["']([^"']+)["']\s+property=["']og:title["']/i)?.[1];

  const ogDesc =
    html.match(/property=["']og:description["']\s+content=["']([^"']+)["']/i)?.[1] ??
    html.match(/content=["']([^"']+)["']\s+property=["']og:description["']/i)?.[1];

  return {
    username: site.letterboxdUser,
    displayName: ogTitle
      ? decodeEntities(ogTitle).replace(/\s+on Letterboxd.*/i, "")
      : site.name,
    bio: ogDesc ? decodeEntities(ogDesc) : fallback.bio,
    avatar: ogImage,
    url: PROFILE_URL,
    recentCount,
  };
}

/** Lightweight profile card for the Cinema page header. */
export async function getLetterboxdProfile(
  recentCount = 0,
): Promise<LetterboxdProfile> {
  const fallback: LetterboxdProfile = {
    username: site.letterboxdUser,
    displayName: site.name,
    bio: "Films logged after midnight. Opinions may contain spoilers and feelings.",
    avatar: null,
    url: PROFILE_URL,
    recentCount,
  };

  try {
    const html = await fetchLetterboxd(PROFILE_URL);
    return parseProfile(html, recentCount);
  } catch (err) {
    console.error("[letterboxd] profile fetch failed:", err);
    return fallback;
  }
}
