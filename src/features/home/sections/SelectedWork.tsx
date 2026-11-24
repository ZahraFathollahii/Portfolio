import { Heading, Section } from "@/components/ui";
import { ProjectCard } from "@/features/projects/ProjectCard";
import { projects } from "@/features/projects/projects.data";
import { getT } from "@/i18n/getT";
import type { Locale } from "@/i18n/settings";

type SelectedWorkProps = {
  locale: Locale;
};

export async function SelectedWork({ locale }: SelectedWorkProps) {
  const t = await getT(locale, "home");
  const featured = projects.filter((project) => project.featured);
  const more = projects.filter((project) => !project.featured);

  return (
    <Section id="work" title={t("work.title")} description={t("work.intro")}>
      <ul className="grid gap-6 md:grid-cols-2 lg:gap-8">
        {featured.map((project) => (
          <ProjectCard key={project.slug} project={project} locale={locale} />
        ))}
      </ul>
      {more.length > 0 && (
        <>
          <div className="mt-14 flex flex-wrap items-baseline justify-between gap-4 border-t border-border pt-9">
            <Heading level={3}>{t("work.moreTitle")}</Heading>
            <p className="max-w-lg text-sm text-muted">{t("work.moreIntro")}</p>
          </div>
          <ul className="mt-7 grid gap-4 md:grid-cols-2">
            {more.map((project) => (
              <ProjectCard
                key={project.slug}
                project={project}
                locale={locale}
              />
            ))}
          </ul>
        </>
      )}
    </Section>
  );
}
