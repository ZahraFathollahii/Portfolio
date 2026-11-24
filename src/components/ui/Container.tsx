import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

type ContainerProps = {
  className?: string;
  children: ReactNode;
};

export function Container({ className, children }: ContainerProps) {
  return (
    <div className={cn("mx-auto w-full max-w-7xl px-6 sm:px-10", className)}>
      {children}
    </div>
  );
}
