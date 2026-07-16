import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";
import { Reveal } from "@/components/motion/reveal";
import { NoirLink } from "@/components/ui/noir-link";
import { SceneBackdrop } from "@/components/atmosphere/scene-backdrop";
import { atmosphere } from "@/data/atmosphere";
import { site } from "@/config/site";
import { getLetterboxdEntries, getLetterboxdProfile } from "@/lib/letterboxd";
import { pageMetadata } from "@/lib/seo";
import { getCinemaUi } from "@/lib/i18n";
import { resolvePageLang } from "@/lib/i18n-server";

export const metadata = pageMetadata({
  title: "Cinema",
  description:
    "Letterboxd profil önizlemesi ve son incelemeler — posters, scores, short notes.",
  path: "/cinema",
});

/** Always hit Letterboxd fresh enough that recent reviews show up. */
export const revalidate = 300;

function ratingLabel(rating: string | null, unrated: string) {
  if (!rating) return unrated;
  return `${rating}/5`;
}

export default async function CinemaPage({
  searchParams,
}: {
  searchParams?: Promise<{ lang?: string | string[] }>;
}) {
  const lang = await resolvePageLang(searchParams);
  const ui = getCinemaUi(lang);

  const entries = await getLetterboxdEntries();
  const profile = await getLetterboxdProfile(entries.length);
  const emptyCopy =
    lang === "tr"
      ? {
          title: "Henüz sinyal yok",
          body: "Letterboxd akışı şu an boş geldi. Profil hâlâ açık — birazdan yenile veya Letterboxd’dan kontrol et.",
        }
      : {
          title: "No signal yet",
          body: "The Letterboxd feed came back empty. Profile is still open — refresh shortly or check Letterboxd.",
        };

  return (
    <div className="relative overflow-hidden">
      <SceneBackdrop
        src={atmosphere.watching}
        opacity={28}
        fit="cover"
        position="center 30%"
      />
      <div className="relative z-10">
        <PageHeader
          kicker={ui.kicker}
          title={ui.title}
          lede={ui.lede}
        >
          <Reveal delay={0.55} className="mt-8">
            <NoirLink href={site.socials.letterboxd} external>
              {ui.openProfile}
            </NoirLink>
          </Reveal>
        </PageHeader>

        <Container className="pb-12">
          <Reveal>
            <a
              href={profile.url}
              target="_blank"
              rel="noreferrer"
              className="group grid gap-6 border border-line bg-night/70 p-6 transition-colors duration-500 hover:border-amber/40 md:grid-cols-[7rem_1fr] md:p-8"
            >
              <div className="relative size-28 overflow-hidden border border-line bg-panel md:size-full md:min-h-28">
                {profile.avatar ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={profile.avatar}
                    alt={`${profile.displayName} on Letterboxd`}
                    className="size-full object-cover opacity-90 transition duration-500 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="flex size-full items-center justify-center font-mono text-xs uppercase tracking-[0.2em] text-faint">
                    @{profile.username}
                  </div>
                )}
              </div>
              <div className="flex flex-col justify-center">
                <p className="kicker text-amber">{ui.profilePreview}</p>
                <h2 className="display mt-3 text-3xl transition-colors group-hover:text-amber md:text-4xl">
                  {profile.displayName}
                </h2>
                <p className="mt-1 font-mono text-xs uppercase tracking-[0.18em] text-cyan">
                  @{profile.username} · letterboxd
                </p>
                <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted">
                  {profile.bio}
                </p>
                <p className="mt-5 font-mono text-[0.65rem] uppercase tracking-[0.2em] text-faint">
                  {profile.recentCount} {ui.recentSignalsSuffix}
                </p>
              </div>
            </a>
          </Reveal>
        </Container>

        <Container size="wide" className="pb-32">
          <p className="kicker mb-8">{ui.latestReviews}</p>
          {entries.length === 0 ? (
            <div className="border border-line bg-night/90 p-10 md:p-14">
              <h2 className="display text-2xl">{emptyCopy.title}</h2>
              <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted">
                {emptyCopy.body}
              </p>
              <div className="mt-8">
                <NoirLink href={site.socials.letterboxd} external>
                  {ui.openProfile}
                </NoirLink>
              </div>
            </div>
          ) : (
            <div className="grid gap-px border border-line bg-line md:grid-cols-3">
              {entries.map((entry, i) => (
                <Reveal
                  key={`${entry.link}-${i}`}
                  delay={Math.min(i * 0.06, 0.35)}
                  className="bg-night/90"
                >
                  <a
                    href={entry.link}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex h-full flex-col"
                  >
                    <div className="relative aspect-[2/3] overflow-hidden bg-panel">
                      {entry.poster ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={entry.poster}
                          alt={`${entry.filmTitle} poster`}
                          className="size-full object-cover opacity-80 saturate-[0.85] transition duration-700 group-hover:scale-105 group-hover:opacity-100"
                          referrerPolicy="no-referrer"
                        />
                      ) : (
                        <div className="flex size-full items-center justify-center bg-elevated">
                          <span className="font-mono text-xs uppercase tracking-[0.22em] text-faint">
                            {ui.noPoster}
                          </span>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-night via-transparent to-transparent" />
                      <span className="absolute left-4 top-4 font-mono text-[0.6rem] uppercase tracking-[0.2em] text-amber">
                        {ratingLabel(entry.rating, ui.unrated)}
                      </span>
                    </div>

                    <div className="flex flex-1 flex-col justify-between p-7">
                      <div>
                        <p className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-faint">
                          {entry.watchedDate ?? "recent"} · {entry.filmYear}
                        </p>
                        <h2 className="display mt-2 text-2xl transition-colors duration-300 group-hover:text-amber">
                          {entry.filmTitle}
                        </h2>
                        {entry.review ? (
                          <p className="mt-4 line-clamp-5 text-sm leading-relaxed text-muted">
                            {entry.review}
                          </p>
                        ) : null}
                      </div>
                      <span className="mt-8 font-mono text-[0.65rem] uppercase tracking-[0.2em] text-faint transition-colors group-hover:text-cyan">
                        {ui.readOn}
                      </span>
                    </div>
                  </a>
                </Reveal>
              ))}
            </div>
          )}
        </Container>
      </div>
    </div>
  );
}
