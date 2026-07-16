import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type ContainerProps = {
  children: ReactNode;
  className?: string;
  /** "narrow" for reading columns, "wide" for galleries. */
  size?: "default" | "narrow" | "wide";
};

const sizes = {
  narrow: "max-w-3xl",
  default: "max-w-6xl",
  wide: "max-w-7xl",
} as const;

export function Container({ children, className, size = "default" }: ContainerProps) {
  return (
    <div className={cn("mx-auto w-full px-6 md:px-10", sizes[size], className)}>
      {children}
    </div>
  );
}
