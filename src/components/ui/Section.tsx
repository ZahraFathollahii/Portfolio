import type { ReactNode } from "react";

import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/cn";

type SectionProps = {
  id: string;
  title: string;
  description?: string;
  className?: string;
  children: ReactNode;
};

const sectionNumbers: Record<string, string> = {
  work: "01",
  about: "02",
  skills: "03",
  experience: "04",
  research: "05",
  contact: "06",
};

/** Shared spacing, section index and reveal behavior for the home page. */
export function Section({
  id,
  title,
  description,
  className,
  children,
}: SectionProps) {
  const titleId = `${id}-title`;

  return (
    <section
      id={id}
      aria-labelledby={titleId}
      className={cn("scroll-mt-20 py-14 sm:py-20", className)}
    >
      <Container>
        <Reveal>
          <div className="mb-9 flex items-center gap-4 sm:mb-12 sm:gap-6">
            {sectionNumbers[id] && (
              <span aria-hidden className="font-mono text-sm text-accent">
                {sectionNumbers[id]}
              </span>
            )}
            <Heading level={2} id={titleId}>
              {title}
            </Heading>
            <span aria-hidden className="h-px min-w-6 flex-1 bg-border" />
          </div>
          {description && (
            <p className="mb-8 max-w-2xl text-base text-muted sm:mb-10 sm:text-lg">
              {description}
            </p>
          )}
          {children}
        </Reveal>
      </Container>
    </section>
  );
}
