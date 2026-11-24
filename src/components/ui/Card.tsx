import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

type CardProps = {
  as?: "div" | "article" | "li";
  /** Hover affordance for cards that are (or contain) a stretched link. */
  interactive?: boolean;
  padding?: "default" | "none";
  className?: string;
  children: ReactNode;
};

export function Card({
  as: Tag = "div",
  interactive = false,
  padding = "default",
  className,
  children,
}: CardProps) {
  return (
    <Tag
      className={cn(
        "group relative rounded-card border border-border bg-surface shadow-card",
        padding === "default" && "p-6 sm:p-7",
        interactive &&
          "transition-[border-color,box-shadow,translate] duration-300 focus-within:border-accent/60 hover:border-accent/60 hover:shadow-card-hover motion-safe:hover:-translate-y-1",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
