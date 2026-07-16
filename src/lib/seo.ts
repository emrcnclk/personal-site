import type { Metadata } from "next";
import { site } from "@/config/site";

/**
 * Per-page metadata factory. Keeps canonical URLs, OG and Twitter
 * cards consistent without repeating boilerplate in every route.
 */
export function pageMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: `${title} — ${site.name}`,
      description,
      url: path,
      siteName: site.name,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} — ${site.name}`,
      description,
    },
  };
}

/** JSON-LD Person entity injected once in the root layout. */
export function personJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.fullName,
    url: site.url,
    email: `mailto:${site.email}`,
    jobTitle: site.roles.join(", "),
    address: { "@type": "PostalAddress", addressLocality: site.location },
    sameAs: Object.values(site.socials),
  };
}

/** JSON-LD Article entity for MDX posts. */
export function articleJsonLd({
  title,
  description,
  path,
  date,
}: {
  title: string;
  description: string;
  path: string;
  date: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    datePublished: date,
    url: `${site.url}${path}`,
    author: { "@type": "Person", name: site.fullName, url: site.url },
  };
}
