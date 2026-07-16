/**
 * Project registry — sourced from github.com/emrcnclk.
 * Re-run `npm run sync:github` (or update this file) when new repos ship.
 * Curated loglines keep the editorial tone; links stay live to GitHub.
 */

export type Discipline = "ai" | "game" | "mobile" | "software";

export type Project = {
  slug: string;
  title: string;
  year: number;
  discipline: Discipline;
  logline: string;
  summary: string;
  status: "shipped" | "in-progress" | "archived";
  stack: string[];
  link?: string;
  featured?: boolean;
  stars?: number;
};

export const disciplineLabels: Record<Discipline, string> = {
  ai: "Artificial Intelligence",
  game: "Game Development",
  mobile: "Mobile",
  software: "Software",
};

export const projects: Project[] = [
  {
    slug: "blockslide",
    title: "BlockSlide",
    year: 2026,
    discipline: "game",
    logline: "A Unity 6 mobile puzzle — sliding blocks, tight loops, iOS-first.",
    summary:
      "Inkframe's BlockSlide is a Unity 6 puzzle built for App Store first. Monetization, IAP and privacy pipeline wired for shipping — game feel tuned for one-thumb sessions.",
    status: "in-progress",
    stack: ["Unity 6", "C#", "iOS", "AdMob", "Firebase"],
    link: "https://github.com/emrcnclk/BlockSlide",
    featured: true,
    stars: 0,
  },
  {
    slug: "kiel-app",
    title: "Kiel",
    year: 2025,
    discipline: "mobile",
    logline: "A support system for autistic children and their families — routines, experts, progress.",
    summary:
      "React Native client plus Node backend: daily activity tracking, educational games, expert appointments and development reports. Capstone-born, product-shaped.",
    status: "shipped",
    stack: ["React Native", "TypeScript", "Node.js", "MongoDB", "JWT"],
    link: "https://github.com/emrcnclk/kiel-app",
    featured: true,
    stars: 2,
  },
  {
    slug: "kiel-ai-full",
    title: "Kiel AI",
    year: 2026,
    discipline: "ai",
    logline: "AI layer for Kiel — smarter support signals on top of the care platform.",
    summary:
      "TypeScript AI stack extending the Kiel ecosystem. Exploring how machine intelligence can assist therapists and families without replacing human judgment.",
    status: "in-progress",
    stack: ["TypeScript", "AI", "Node.js"],
    link: "https://github.com/emrcnclk/kiel-ai-full",
    featured: true,
    stars: 0,
  },
  {
    slug: "lumenbra",
    title: "Lumenbra",
    year: 2025,
    discipline: "game",
    logline: "Light and dark as mechanics — a 2D puzzle from a game jam sprint.",
    summary:
      "Unity C# puzzle built around illumination and shadow. Born in Lumenbra Game Jam: small scope, strong mechanic, player-first puzzle design.",
    status: "shipped",
    stack: ["Unity", "C#", "2D"],
    link: "https://github.com/emrcnclk/Lumenbra-LightAndDark-2D-Puzzle",
    featured: true,
    stars: 0,
  },
  {
    slug: "game-interview-solutions",
    title: "Game Interview Solutions",
    year: 2026,
    discipline: "software",
    logline: "A living notebook of game-dev interview problems — solved, annotated, reusable.",
    summary:
      "Technical interview drills for game engineering: algorithms, systems thinking and craft notes for the next studio conversation.",
    status: "in-progress",
    stack: ["Game Eng"],
    link: "https://github.com/emrcnclk/GameInterviewSolutions",
    stars: 0,
  },
  {
    slug: "bitirme-kiel",
    title: "Bitirme — Kiel",
    year: 2025,
    discipline: "software",
    logline: "Graduation thesis codebase that seeded the Kiel product line.",
    summary:
      "The academic root of Kiel: research questions, early architecture and the first vertical slice that proved the idea deserved a real app.",
    status: "archived",
    stack: ["TypeScript", "Research"],
    link: "https://github.com/emrcnclk/BitirmeProjeKiel",
    stars: 0,
  },
];

export const featuredProjects = projects.filter((p) => p.featured);

export const projectsByDiscipline = (d: Discipline) =>
  projects.filter((p) => p.discipline === d);
