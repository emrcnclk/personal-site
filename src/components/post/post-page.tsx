import { MDXRemote } from "next-mdx-remote/rsc";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/container";
import { Kicker } from "@/components/ui/kicker";
import { NoirLink } from "@/components/ui/noir-link";
import { Reveal } from "@/components/motion/reveal";
import { TextReveal } from "@/components/motion/text-reveal";
import { getPost, type Collection } from "@/lib/content";
import { articleJsonLd } from "@/lib/seo";
import { formatDate } from "@/lib/utils";
import { getPageUi } from "@/lib/i18n-pages";
import type { Lang } from "@/lib/i18n";

/**
 * Shared reading experience for every MDX collection.
 * One narrow column, generous leading, nothing else on stage.
 */
export function PostPage({
  collection,
  slug,
  lang = "en",
}: {
  collection: Collection;
  slug: string;
  lang?: Lang;
}) {
  const post = getPost(collection, slug);
  if (!post) notFound();

  const labels = getPageUi("postLabels", lang)[collection];

  return (
    <article className="pt-40 pb-28 md:pt-52">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            articleJsonLd({
              title: post.title,
              description: post.description,
              path: `/${collection}/${slug}`,
              date: post.date,
            }),
          ),
        }}
      />
      <Container size="narrow">
        <header className="mb-16">
          <Reveal distance={12}>
            <Kicker signal>
              {labels.kicker} — {formatDate(post.date, lang)} — {post.readingMinutes}{" "}
              {labels.minRead}
            </Kicker>
          </Reveal>
          <TextReveal
            as="h1"
            text={post.title}
            delay={0.15}
            className="display mt-6 text-4xl md:text-6xl"
          />
          <Reveal delay={0.45}>
            <p className="mt-6 text-lg leading-relaxed text-muted">{post.description}</p>
          </Reveal>
        </header>

        <Reveal delay={0.2}>
          <div className="prose-noir">
            <MDXRemote source={post.content} />
          </div>
        </Reveal>

        <footer className="mt-20 flex items-center justify-between border-t border-line pt-8">
          <NoirLink href={`/${collection}`}>{labels.back}</NoirLink>
          {post.tags.length > 0 && (
            <span className="font-mono text-[0.65rem] tracking-[0.18em] uppercase text-faint">
              {post.tags.join(" · ")}
            </span>
          )}
        </footer>
      </Container>
    </article>
  );
}
