"use client";

import { useState, type ReactNode } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

type MoreProjectsToggleProps = {
  showMoreLabel: string;
  showFewerLabel: string;
  children: ReactNode;
};

/** Collapses the secondary project archive on initial load to keep page scroll manageable. */
export function MoreProjectsToggle({
  showMoreLabel,
  showFewerLabel,
  children,
}: MoreProjectsToggleProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div>
      {expanded && <div id="more-projects-list">{children}</div>}
      <div className="mt-7 flex justify-center sm:justify-start">
        <button
          type="button"
          aria-expanded={expanded}
          aria-controls="more-projects-list"
          onClick={() => setExpanded((prev) => !prev)}
          className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-control border border-border bg-surface px-5 py-2.5 text-sm font-semibold text-text transition-colors duration-200 hover:border-accent hover:text-accent"
        >
          <span>{expanded ? showFewerLabel : showMoreLabel}</span>
          {expanded ? (
            <FiChevronUp aria-hidden className="size-4" />
          ) : (
            <FiChevronDown aria-hidden className="size-4" />
          )}
        </button>
      </div>
    </div>
  );
}
