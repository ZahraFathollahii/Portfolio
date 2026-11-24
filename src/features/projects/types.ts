import type { ParseKeys } from "i18next";
import type { StaticImageData } from "next/image";

export type ProjectStatusKey = "status.ganoticLaunch";

/**
 * Non-translatable project data. All copy lives in `projects.json` under the slug:
 * `<slug>.title|subtitle|category|summary|role`, plus `<slug>.caseStudy.*` when `hasCaseStudy`.
 */
export type Project = {
  slug: string;
  /** Only a confirmed public website; null hides the live-site action. */
  url: string | null;
  techs: readonly string[];
  /** Company projects have no status line. */
  statusKey: ProjectStatusKey | null;
  /** Shown as a full card in "Selected work"; otherwise in the compact "More work" list. */
  featured: boolean;
  hasCaseStudy: boolean;
};

/** Statically imported (gets the base path and intrinsic size from next/image). */
export type Screenshot = {
  image: StaticImageData;
  altKey: ParseKeys<"projects">;
};
