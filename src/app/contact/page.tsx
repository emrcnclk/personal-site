import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";
import { Section } from "@/components/ui/section";
import { Kicker } from "@/components/ui/kicker";
import { Reveal } from "@/components/motion/reveal";
import { site } from "@/config/site";
import { getPageUi } from "@/lib/i18n-pages";
import { resolvePageLang } from "@/lib/i18n-server";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Contact",
  description:
    "Open a channel: collaborations, interesting problems, or a good record recommendation.",
  path: "/contact",
});

export default async function ContactPage({
  searchParams,
}: {
  searchParams?: Promise<{ lang?: string | string[] }>;
}) {
  const lang = await resolvePageLang(searchParams);
  const ui = getPageUi("contact", lang);

  return (
    <>
      <PageHeader kicker={ui.kicker} title={ui.title} lede={ui.lede} />

      <Section compact className="pt-0">
        <Container>
          <Reveal>
            <a
              href={`mailto:${site.email}`}
              className="group block border border-line bg-panel/50 p-10 transition-colors duration-500 hover:border-amber/40 md:p-16"
            >
              <Kicker signal>{ui.primary}</Kicker>
              <span className="display mt-6 block text-3xl transition-colors duration-300 group-hover:text-amber md:text-6xl">
                {site.email}
              </span>
            </a>
          </Reveal>

          <div className="mt-16 grid gap-px border border-line bg-line md:grid-cols-3">
            {ui.reasons.map((r, i) => (
              <Reveal key={r.title} delay={Math.min(i * 0.08, 0.3)} className="bg-night">
                <div className="h-full p-8 md:p-10">
                  <span className="font-mono text-xs text-faint">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h2 className="display mt-5 text-xl">{r.title}</h2>
                  <p className="mt-3 text-sm leading-relaxed text-muted">{r.note}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.25} className="mt-16">
            <div className="flex flex-wrap items-center gap-x-10 gap-y-4">
              <Kicker className="text-faint">{ui.elsewhere}</Kicker>
              {Object.entries(site.socials).map(([name, url]) => (
                <a
                  key={name}
                  href={url}
                  target="_blank"
                  rel="noreferrer"
                  className="font-mono text-xs uppercase tracking-[0.22em] text-muted transition-colors hover:text-amber"
                >
                  {name}
                </a>
              ))}
            </div>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
