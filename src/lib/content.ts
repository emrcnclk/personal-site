import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

/**
 * File-based content layer.
 * Every collection is a folder of MDX files under /content.
 * Publishing = dropping a new .mdx file. No code changes, ever.
 */

export type Collection = "devlogs" | "journal";

export type PostMeta = {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  collection: Collection;
  readingMinutes: number;
};

export type Post = PostMeta & { content: string };

const CONTENT_DIR = path.join(process.cwd(), "content");

function readingTime(text: string) {
  const words = text.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 220));
}

export function getPosts(collection: Collection): PostMeta[] {
  const dir = path.join(CONTENT_DIR, collection);
  if (!fs.existsSync(dir)) return [];

  return fs
    .readdirSync(dir)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => {
      const raw = fs.readFileSync(path.join(dir, file), "utf-8");
      const { data, content } = matter(raw);
      return {
        slug: file.replace(/\.mdx$/, ""),
        title: String(data.title ?? "Untitled"),
        description: String(data.description ?? ""),
        date: String(data.date ?? ""),
        tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
        collection,
        readingMinutes: readingTime(content),
      } satisfies PostMeta;
    })
    .sort((a, b) => +new Date(b.date) - +new Date(a.date));
}

export function getPost(collection: Collection, slug: string): Post | null {
  const file = path.join(CONTENT_DIR, collection, `${slug}.mdx`);
  if (!fs.existsSync(file)) return null;

  const raw = fs.readFileSync(file, "utf-8");
  const { data, content } = matter(raw);
  return {
    slug,
    title: String(data.title ?? "Untitled"),
    description: String(data.description ?? ""),
    date: String(data.date ?? ""),
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    collection,
    readingMinutes: readingTime(content),
    content,
  };
}
