/**
 * Live GitHub sync for Projects.
 * Falls back to curated data/projects.ts if the API is unreachable.
 */
import { site } from "@/config/site";
import {
  projects as curatedProjects,
  type Discipline,
  type Project,
} from "@/data/projects";

export type GithubRepo = {
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  stargazers_count: number;
  topics: string[];
  created_at: string;
  updated_at: string;
  pushed_at: string;
  archived: boolean;
  fork: boolean;
};

function inferDiscipline(repo: GithubRepo): Discipline {
  const hay = `${repo.name} ${repo.description ?? ""} ${repo.topics.join(" ")} ${repo.language ?? ""}`.toLowerCase();
  if (/(unity|game|puzzle|lumenbra|blockslide|godot|unreal)/.test(hay)) return "game";
  if (/(ai|ml|llm|model|torch|openai|kiel-ai)/.test(hay)) return "ai";
  if (/(mobile|ios|android|react-native|flutter|swift|kiel-app)/.test(hay)) return "mobile";
  if (repo.language === "C#") return "game";
  if (repo.language === "Swift" || repo.language === "Kotlin") return "mobile";
  return "software";
}

function statusFor(repo: GithubRepo): Project["status"] {
  if (repo.archived) return "archived";
  const days =
    (Date.now() - new Date(repo.pushed_at || repo.updated_at).getTime()) /
    (1000 * 60 * 60 * 24);
  return days < 120 ? "in-progress" : "shipped";
}

function curatedMatch(slug: string) {
  return curatedProjects.find((p) => p.slug === slug || p.link?.includes(`/${slug}`));
}

export function repoToProject(repo: GithubRepo): Project {
  const slug = repo.name.toLowerCase();
  const known = curatedMatch(slug);
  const year = new Date(repo.created_at).getFullYear();
  const stack = [
    repo.language,
    ...repo.topics.slice(0, 4),
  ].filter(Boolean) as string[];

  return {
    slug,
    title: known?.title ?? repo.name,
    year: known?.year ?? year,
    discipline: known?.discipline ?? inferDiscipline(repo),
    logline:
      known?.logline ??
      repo.description ??
      "A live repository from the hangar — open the source to see what it's doing.",
    summary:
      known?.summary ??
      repo.description ??
      "Pulled live from GitHub. Description pending — the code is the note.",
    status: known?.status ?? statusFor(repo),
    stack: known?.stack?.length ? known.stack : stack.length ? stack : ["GitHub"],
    link: repo.html_url,
    featured: known?.featured ?? repo.stargazers_count > 0,
    stars: repo.stargazers_count,
  };
}

export async function fetchGithubRepos(): Promise<GithubRepo[]> {
  const res = await fetch(
    `https://api.github.com/users/${site.githubUser}/repos?per_page=100&sort=updated`,
    {
      headers: {
        Accept: "application/vnd.github+json",
        "User-Agent": `${site.githubUser}-personal-site`,
      },
      next: { revalidate: 60 * 30 },
    },
  );

  if (!res.ok) {
    throw new Error(`GitHub API ${res.status}`);
  }

  const data = (await res.json()) as GithubRepo[];
  return data.filter((r) => !r.fork);
}

/** Live projects sorted by last push — curated copy when API fails. */
export async function getLiveProjects(): Promise<Project[]> {
  try {
    const repos = await fetchGithubRepos();
    if (repos.length === 0) return curatedProjects;
    return repos
      .map(repoToProject)
      .sort((a, b) => b.year - a.year || a.title.localeCompare(b.title));
  } catch {
    return curatedProjects;
  }
}

export async function getFeaturedProjects(): Promise<Project[]> {
  const all = await getLiveProjects();
  const featured = all.filter((p) => p.featured);
  return featured.length > 0 ? featured : all.slice(0, 4);
}
