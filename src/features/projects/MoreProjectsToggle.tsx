"use client";

import { useState, type ReactNode } from "react";
import { FiChevronDown, FiChevronUp, FiFolder } from "react-icons/fi";

type MoreProjectsToggleProps = {
  title: string;
  description?: string;
  previewTitles: string[];
  moreCountLabel?: string;
  showMoreLabel: string;
  showFewerLabel: string;
  children: ReactNode;
};

/** Editorial archive bar that previews the secondary projects and expands them on demand. */
export function MoreProjectsToggle({
  title,
  description,
  previewTitles,
  moreCountLabel,
  showMoreLabel,
  showFewerLabel,
  children,
}: MoreProjectsToggleProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="mt-14">
      <div className="rounded-card border border-border bg-surface/80 p-6 sm:p-8">
        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div className="min-w-0">
            <div className="flex items-center gap-2.5">
              <span className="inline-flex size-8 shrink-0 items-center justify-center rounded-full border border-border bg-bg text-accent">
                <FiFolder aria-hidden className="size-4" />
              </span>
              <h3 className="text-xl font-semibold tracking-tight text-text">
                {title}
              </h3>
            </div>
            {description && (
              <p className="mt-2 max-w-xl text-sm text-muted">{description}</p>
            )}
          </div>
          <button
            type="button"
            aria-expanded={expanded}
            aria-controls="more-projects-list"
            onClick={() => setExpanded((prev) => !prev)}
            className="inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 rounded-control border border-border bg-bg px-5 py-2.5 text-sm font-semibold text-text transition-colors duration-200 hover:border-accent hover:text-accent"
          >
            <span>{expanded ? showFewerLabel : showMoreLabel}</span>
            {expanded ? (
              <FiChevronUp aria-hidden className="size-4" />
            ) : (
              <FiChevronDown aria-hidden className="size-4" />
            )}
          </button>
        </div>

        {!expanded && previewTitles.length > 0 && (
          <ul
            aria-label={title}
            className="mt-5 flex flex-wrap items-center gap-2 border-t border-border/60 pt-4"
          >
            {previewTitles.map((name) => (
              <li
                key={name}
                className="rounded-control border border-border/80 bg-bg px-3 py-1 text-xs font-medium text-muted"
              >
                {name}
              </li>
            ))}
            {moreCountLabel && (
              <li className="rounded-control bg-accent-soft px-3 py-1 text-xs font-semibold text-accent">
                {moreCountLabel}
              </li>
            )}
          </ul>
        )}
      </div>

      {expanded && <div id="more-projects-list">{children}</div>}
    </div>
  );
}
