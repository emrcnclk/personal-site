import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type NoirLinkProps = {
  href: string;
  children: ReactNode;
  className?: string;
  external?: boolean;
};

/** Understated text link with a sliding underline and drifting arrow. */
export function NoirLink({ href, children, className, external }: NoirLinkProps) {
  const isExternal = external ?? href.startsWith("http");
  return (
    <Link
      href={href}
      {...(isExternal ? { target: "_blank", rel: "noreferrer" } : {})}
      className={cn(
        "group inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-[0.18em] text-muted transition-colors duration-300 hover:text-foreground",
        className,
      )}
    >
      <span className="relative">
        {children}
        <span
          aria-hidden
          className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-amber transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100"
        />
      </span>
      <ArrowUpRight
        aria-hidden
        className="size-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
      />
    </Link>
  );
}
