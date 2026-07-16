import { DisciplinePage } from "@/components/work/discipline-page";
import { getPageUi } from "@/lib/i18n-pages";
import { resolvePageLang } from "@/lib/i18n-server";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Game Development",
  description:
    "Unity games built around feel: handling tuned by hand, systems that respect the player's time.",
  path: "/game-development",
});

export default async function GameDevPage({
  searchParams,
}: {
  searchParams?: Promise<{ lang?: string }> | { lang?: string };
}) {
  const lang = await resolvePageLang(searchParams);
  const ui = getPageUi("game", lang);

  return (
    <DisciplinePage
      lang={lang}
      content={{
        discipline: "game",
        kicker: ui.kicker,
        title: ui.title,
        lede: ui.lede,
        principles: [...ui.principles],
      }}
    />
  );
}
