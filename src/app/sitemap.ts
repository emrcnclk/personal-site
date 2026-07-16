import type { MetadataRoute } from "next";
import { allNavItems } from "@/config/navigation";
import { site } from "@/config/site";
import { getPosts } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = allNavItems
    .filter((item) => !item.external && item.href.startsWith("/"))
    .map((item) => ({
      url: `${site.url}${item.href === "/" ? "" : item.href}`,
      changeFrequency: "monthly" as const,
      priority: item.href === "/" ? 1 : 0.7,
    }));

  const posts = (["devlogs", "journal"] as const).flatMap((collection) =>
    getPosts(collection).map((post) => ({
      url: `${site.url}/${collection}/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
  );

  return [...staticPages, ...posts];
}
