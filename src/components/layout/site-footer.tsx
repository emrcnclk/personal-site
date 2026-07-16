import Link from "next/link";
import { navigation } from "@/config/navigation";
import { site } from "@/config/site";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/motion/reveal";
import { getFooterUi, tNavGroupTitle, tNavItemLabel } from "@/lib/i18n";
import { getServerLang } from "@/lib/i18n-server";

export async function SiteFooter() {
  const lang = await getServerLang();
  const ui = getFooterUi(lang);

  return (
    <footer className="relative border-t border-line bg-panel/40">
      <Container className="py-20 md:py-28">
        <Reveal>
          <p className="kicker mb-6">{ui.endSession}</p>
          <p className="display max-w-3xl text-3xl md:text-5xl">
            {ui.farewell}{" "}
            <span className="text-muted">{ui.farewellMuted}</span>
          </p>
          <a
            href={`mailto:${site.email}`}
            className="mt-8 inline-block border-b border-amber/50 pb-1 font-mono text-sm tracking-[0.18em] uppercase text-foreground transition-colors hover:border-amber hover:text-amber"
          >
            {site.email}
          </a>
        </Reveal>

        <div className="mt-20 grid grid-cols-2 gap-10 md:grid-cols-4">
          {navigation.map((group) => (
            <nav key={group.title} aria-label={tNavGroupTitle(group.title, lang)}>
              <p className="kicker mb-5 text-faint">{tNavGroupTitle(group.title, lang)}</p>
              <ul className="space-y-2.5">
                {group.items.map((item) => (
                  <li key={item.href}>
                    {item.external ? (
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noreferrer"
                        className="text-sm text-muted transition-colors duration-300 hover:text-foreground"
                      >
                        {tNavItemLabel(item.label, lang)}
                      </a>
                    ) : (
                      <Link
                        href={item.href}
                        className="text-sm text-muted transition-colors duration-300 hover:text-foreground"
                      >
                        {tNavItemLabel(item.label, lang)}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-20 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-8">
          <p className="font-mono text-[0.65rem] tracking-[0.2em] uppercase text-faint">
            © {new Date().getFullYear()} {site.fullName} — {ui.credit}
          </p>
          <div className="flex flex-wrap gap-5">
            {Object.entries(site.socials).map(([name, url]) => (
              <a
                key={name}
                href={url}
                target="_blank"
                rel="noreferrer"
                className="font-mono text-[0.65rem] tracking-[0.2em] uppercase text-faint transition-colors hover:text-amber"
              >
                {name}
              </a>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
}
