import Link from "next/link";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";
import { Reveal } from "@/components/motion/reveal";
import { getPageUi } from "@/lib/i18n-pages";
import { resolvePageLang } from "@/lib/i18n-server";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Creative Works",
  description:
    "The non-compiling output: music, cinema, photography, drawings and the journal.",
  path: "/creative",
});

export default async function CreativePage({
  searchParams,
}: {
  searchParams?: Promise<{ lang?: string | string[] }>;
}) {
  const lang = await resolvePageLang(searchParams);
  const ui = getPageUi("creative", lang);

  return (
    <>
      <PageHeader kicker={ui.kicker} title={ui.title} lede={ui.lede} />
      <Container className="pb-32">
        <ul className="border-b border-line">
          {ui.rooms.map((room, i) => (
            <Reveal as="li" key={room.href} delay={Math.min(i * 0.07, 0.3)}>
              <Link
                href={room.href}
                className="group grid gap-2 border-t border-line py-10 transition-colors duration-500 hover:border-line-strong md:grid-cols-[5rem_1fr] md:gap-8 md:py-14"
              >
                <span className="pt-2 font-mono text-xs text-faint">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="flex flex-wrap items-baseline justify-between gap-4">
                  <h2 className="display text-3xl transition-colors duration-300 group-hover:text-amber md:text-5xl">
                    {room.label}
                  </h2>
                  <p className="max-w-sm text-sm leading-relaxed text-muted">{room.note}</p>
                </div>
              </Link>
            </Reveal>
          ))}
        </ul>
      </Container>
    </>
  );
}
