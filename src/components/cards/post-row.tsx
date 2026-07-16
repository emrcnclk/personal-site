import Link from "next/link";
import { Reveal } from "@/components/motion/reveal";
import type { PostMeta } from "@/lib/content";
import { formatDate } from "@/lib/utils";

/** A single entry in a writing index — date, title, one line, duration. */
export function PostRow({ post, index = 0 }: { post: PostMeta; index?: number }) {
  return (
    <Reveal as="li" delay={Math.min(index * 0.06, 0.3)}>
      <Link
        href={`/${post.collection}/${post.slug}`}
        className="group grid gap-2 border-t border-line py-8 transition-colors duration-500 hover:border-line-strong md:grid-cols-[10rem_1fr_6rem] md:gap-8 md:py-10"
      >
        <time
          dateTime={post.date}
          className="font-mono text-xs tracking-[0.15em] uppercase text-faint pt-1.5"
        >
          {formatDate(post.date)}
        </time>
        <div>
          <h3 className="display text-2xl transition-colors duration-300 group-hover:text-amber md:text-3xl">
            {post.title}
          </h3>
          <p className="mt-2 max-w-xl leading-relaxed text-muted">{post.description}</p>
        </div>
        <span className="font-mono text-xs text-faint pt-1.5 md:text-right">
          {post.readingMinutes} min
        </span>
      </Link>
    </Reveal>
  );
}
