import { Section } from "@/components/ui";
import { MoreProjectsToggle } from "@/features/projects/MoreProjectsToggle";
import { ProjectCard } from "@/features/projects/ProjectCard";
import { projects } from "@/features/projects/projects.data";
import { getT } from "@/i18n/getT";
import type { Locale } from "@/i18n/settings";
import { formatNumber } from "@/lib/format";

type SelectedWorkProps = {
  locale: Locale;
};

const ARCHIVE_PREVIEW_LIMIT = 6;

export async function SelectedWork({ locale }: SelectedWorkProps) {
  const t = await getT(locale, "home");
  const tActions = await getT(locale, "actions");
  const tProjects = await getT(locale, "projects");
  const featured = projects.filter((project) => project.featured);
  const more = projects.filter((project) => !project.featured);

  const previewTitles = more
    .slice(0, ARCHIVE_PREVIEW_LIMIT)
    .map((project) => tProjects(`${project.slug}.title`));
  const remaining = more.length - previewTitles.length;
  const moreCountLabel =
    remaining > 0 ? `+${formatNumber(remaining, locale)}` : undefined;

  return (
    <Section id="work" title={t("work.title")} description={t("work.intro")}>
      <ul className="grid gap-6 md:grid-cols-2 lg:gap-8">
        {featured.map((project) => (
          <ProjectCard key={project.slug} project={project} locale={locale} />
        ))}
      </ul>
      {more.length > 0 && (
        <MoreProjectsToggle
          title={t("work.moreTitle")}
          description={t("work.moreIntro")}
          previewTitles={previewTitles}
          moreCountLabel={moreCountLabel}
          showMoreLabel={tActions("showMoreProjects", {
            count: formatNumber(more.length, locale),
          })}
          showFewerLabel={tActions("showFewerProjects")}
        >
          <ul className="mt-7 grid gap-4 md:grid-cols-2">
            {more.map((project) => (
              <ProjectCard
                key={project.slug}
                project={project}
                locale={locale}
              />
            ))}
          </ul>
        </MoreProjectsToggle>
      )}
    </Section>
  );
}
