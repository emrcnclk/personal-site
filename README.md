# Personal Universe

An award-quality personal website. Late-90s neo-noir atmosphere: deep blacks, midnight blue, warm amber, muted cyan, film grain, slow cinematic motion.

## Stack

- **Next.js 15** (App Router, static generation) + **React 19** + strict **TypeScript**
- **Tailwind CSS v4** — all design tokens live in `src/app/globals.css` (`@theme`)
- **Framer Motion** — animation grammar centralized in `src/lib/motion.ts`
- **MDX** via `next-mdx-remote` + `gray-matter` — file-based writing collections
- **Lucide** icons, self-hosted fonts (Fraunces, Geist Sans/Mono)

## Make it yours

1. **Identity** — edit `src/config/site.ts` (name, domain, email, socials, location).
2. **Navigation** — `src/config/navigation.ts` is the single map of all sections.
3. **Projects & lists** — replace the sample entries in `src/data/*.ts` with real work.
4. **Writing** — drop `.mdx` files into `content/articles`, `content/devlogs`, `content/journal`. Frontmatter: `title`, `description`, `date`, `tags`. No code changes needed.
5. **Now page** — update `src/data/now.ts` each season.

## Architecture

```
content/            MDX collections (articles, devlogs, journal)
src/
  app/              Routes — one folder per section, SEO files (sitemap, robots, OG)
  components/
    atmosphere/     Film grain, stardust canvas, custom cursor
    cards/          ProjectRow, PostRow (editorial index rows)
    layout/         Header, full-screen menu, footer, local time
    motion/         Reveal, TextReveal, Parallax (reusable animation primitives)
    post/           Shared MDX reading + index templates
    ui/             Container, Section, Kicker, PageHeader, NoirLink, SectionHeading
    work/           DisciplinePage template, ExperimentList
  config/           site.ts (identity), navigation.ts (site map)
  data/             Typed registries: projects, experiments, media, creative, now
  lib/              content loader, motion presets, SEO factories, utils
```

Adding a new section = one route folder + one entry in `navigation.ts`. Adding content = one file. Nothing else moves.

## Commands

```bash
npm run dev     # develop at localhost:3000
npm run build   # production build
npm run lint    # eslint
```

## Design system rules

- Colors, spacing, type scale and easing are tokens — never hardcode values in components.
- All scroll animation goes through `Reveal` / `TextReveal` / `Parallax`.
- All motion respects `prefers-reduced-motion`.
- Section rhythm: `<Section>` + `<Container>` only; whitespace is part of the design.
