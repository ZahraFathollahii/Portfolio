import Link from "next/link";
import type { IconType } from "react-icons";
import {
  FiActivity,
  FiAperture,
  FiArrowRight,
  FiArrowUpRight,
  FiHeart,
  FiLayers,
  FiMessageCircle,
  FiShield,
  FiShoppingBag,
} from "react-icons/fi";

import {
  ButtonLink,
  Card,
  Chip,
  ChipList,
  Eyebrow,
  Heading,
} from "@/components/ui";
import { projects, type ProjectSlug } from "@/features/projects/projects.data";
import { getT } from "@/i18n/getT";
import type { Locale } from "@/i18n/settings";
import { cn } from "@/lib/cn";
import { isTodo } from "@/lib/todo";

import styles from "./ProjectCard.module.css";

type ProjectCardProps = {
  project: (typeof projects)[number];
  locale: Locale;
};

const projectIcons: Partial<Record<ProjectSlug, IconType>> = {
  ganotic: FiShoppingBag,
  mssp: FiShield,
  payesh: FiActivity,
  picopet: FiHeart,
  "salam-operator": FiMessageCircle,
  cancermed: FiAperture,
};

/** Covers are decorative project identities, rather than unverified product screenshots. */
export async function ProjectCard({ project, locale }: ProjectCardProps) {
  const t = await getT(locale, "projects");
  const tActions = await getT(locale, "actions");
  const { slug } = project;
  const role = t(`${slug}.role`);
  const highlights = t(`${slug}.highlights`, { returnObjects: true });
  const titleId = `project-${slug}-title`;
  const Icon = projectIcons[slug] ?? FiLayers;

  return (
    <Card
      as="li"
      interactive={project.hasCaseStudy}
      padding="none"
      className="min-w-0"
    >
      <article
        aria-labelledby={titleId}
        className="flex h-full min-w-0 flex-col"
      >
        {project.featured && (
          <div className={styles.cover} data-project={slug} aria-hidden>
            <span className={styles.initial}>{slug[0]?.toUpperCase()}</span>
            <span className={styles.identifier}>{slug.toUpperCase()}</span>
            <div className={styles.symbol}>
              <span className={styles.ring} />
              <span className={styles.innerRing} />
              <Icon />
            </div>
            <span className={styles.coverName}>{t(`${slug}.title`)}</span>
            <span className={styles.coverRule} />
          </div>
        )}
        <div
          className={cn("flex grow flex-col p-6", project.featured && "sm:p-7")}
        >
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
            <Eyebrow>{t(`${slug}.category`)}</Eyebrow>
            {project.statusKey && (
              <Chip tone="accent">{t(project.statusKey)}</Chip>
            )}
          </div>
          <Heading level={3} id={titleId} className="mt-3">
            {project.hasCaseStudy ? (
              <Link
                href={`/${locale}/projects/${slug}/`}
                className="after:absolute after:inset-0 after:rounded-card focus-visible:outline-none focus-visible:after:outline-2 focus-visible:after:outline-offset-4 focus-visible:after:outline-accent"
              >
                {t(`${slug}.title`)}
              </Link>
            ) : (
              t(`${slug}.title`)
            )}
          </Heading>
          <p className="mt-1.5 text-sm text-muted">{t(`${slug}.subtitle`)}</p>
          <ul
            aria-label={t("labels.contributions")}
            className="mt-5 list-disc space-y-2 ps-4 text-sm leading-relaxed text-pretty marker:text-accent"
          >
            {highlights.map((highlight) => (
              <li key={highlight}>{highlight}</li>
            ))}
          </ul>
          {!isTodo(role) && (
            <dl className="mt-5 flex flex-wrap gap-x-2 text-xs">
              <dt className="text-muted">{t("labels.role")}</dt>
              <dd className="font-medium">{role}</dd>
            </dl>
          )}
          <ChipList
            items={project.techs}
            label={t("labels.stack")}
            className="mt-4"
          />
          {(project.hasCaseStudy || project.url) && (
            <div className="mt-auto pt-6">
              <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border/70 pt-4">
                {project.hasCaseStudy && (
                  <span
                    aria-hidden
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-text"
                  >
                    {tActions("viewCaseStudy")}
                    <FiArrowRight className="size-3.5 rtl:-scale-x-100" />
                  </span>
                )}
                {project.url && (
                  <ButtonLink
                    href={project.url}
                    aria-describedby={titleId}
                    variant="ghost"
                    size="sm"
                    icon={FiArrowUpRight}
                    iconPosition="end"
                    mirrorIcon
                    newTabHint={tActions("newTab")}
                    className="relative z-10 -mx-4"
                  >
                    {tActions("visitLiveSite")}
                  </ButtonLink>
                )}
              </div>
            </div>
          )}
        </div>
      </article>
    </Card>
  );
}
