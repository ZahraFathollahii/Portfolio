import { FiMapPin } from "react-icons/fi";

import { Card, ChipList, Heading, Section } from "@/components/ui";
import { experience } from "@/content/experience";
import { getT } from "@/i18n/getT";
import type { Locale } from "@/i18n/settings";
import { formatDateRange } from "@/lib/format";

type ExperienceProps = {
  locale: Locale;
};

/** Timeline grouped by company: sidebar summary + role cards with full-width desktop balance. */
export async function Experience({ locale }: ExperienceProps) {
  const t = await getT(locale, "home");

  return (
    <Section id="experience" title={t("experience.title")}>
      <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
        {/* Sticky sidebar summary */}
        <div className="lg:col-span-4">
          <div className="space-y-6 lg:sticky lg:top-24">
            <p className="text-base text-pretty text-muted">
              {t("experience.subtitle")}
            </p>
            <Card className="border-border">
              <Heading level={3} className="text-base text-text">
                {t("experience.focusTitle")}
              </Heading>
              <p className="mt-3 text-sm leading-relaxed text-pretty text-muted">
                {t("experience.focusDesc")}
              </p>
            </Card>
          </div>
        </div>

        {/* Timeline cards */}
        <div className="lg:col-span-8">
          <ol className="relative space-y-10 border-s border-border/80 ps-6 sm:ps-8">
            {experience.map((entry) => {
              return (
                <li key={entry.id} className="relative">
                  <span
                    aria-hidden
                    className="absolute -start-[29px] top-4 size-2 rounded-full bg-accent sm:-start-[37px]"
                  />
                  <div className="space-y-4">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <Heading level={3} className="text-xl">
                        {t(entry.companyKey)}
                      </Heading>
                      {entry.locationKey && (
                        <p className="inline-flex items-center gap-1.5 text-xs text-muted">
                          <FiMapPin
                            aria-hidden
                            className="size-3.5 text-accent"
                          />
                          {t(entry.locationKey)}
                        </p>
                      )}
                    </div>

                    <div className="space-y-4">
                      {entry.roles.map((role) => (
                        <Card key={role.id}>
                          <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2">
                            <Heading
                              level={4}
                              className="text-base font-medium text-text"
                            >
                              {t(role.titleKey)}
                            </Heading>
                            <span className="font-mono text-xs text-muted tabular-nums">
                              {formatDateRange(
                                role.start,
                                role.end,
                                locale,
                                t("experience.present"),
                              )}
                            </span>
                          </div>
                          <p className="mt-3 text-sm leading-relaxed text-pretty text-muted">
                            {t(role.descriptionKey)}
                          </p>
                          <ChipList items={role.techs} className="mt-4" />
                        </Card>
                      ))}
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </Section>
  );
}
