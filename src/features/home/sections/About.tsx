import { FiActivity, FiLayers, FiPenTool } from "react-icons/fi";

import { Card, Heading, Section } from "@/components/ui";
import { SHOW_GANOTIC } from "@/config/site";
import { getT } from "@/i18n/getT";
import type { Locale } from "@/i18n/settings";

export async function About({ locale }: { locale: Locale }) {
  const t = await getT(locale, "home");
  const pillars = [
    ...(SHOW_GANOTIC
      ? [
          {
            icon: FiLayers,
            title: t("hero.commerceBadge"),
            description: t("hero.commerceDesc"),
          },
        ]
      : []),
    {
      icon: FiActivity,
      title: t("hero.healthcareBadge"),
      description: t("hero.healthcareDesc"),
    },
    {
      icon: FiPenTool,
      title: t("hero.craftBadge"),
      description: t("hero.craftDesc"),
    },
  ];

  return (
    <Section id="about" title={t("about.title")}>
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
        <div className="space-y-6 text-muted lg:col-span-7">
          <p className="text-lead text-pretty text-text">{t("about.p1")}</p>
          <p className="text-base text-pretty">{t("about.p2")}</p>
          <p className="text-base text-pretty">{t("about.p3")}</p>
        </div>
        <div className="lg:col-span-5">
          <Card className="lg:sticky lg:top-28">
            <ul className="divide-y divide-border">
              {pillars.map(({ icon: Icon, title, description }) => (
                <li
                  key={title}
                  className="flex gap-4 py-6 first:pt-0 last:pb-0"
                >
                  <Icon
                    aria-hidden
                    className="mt-1 size-5 shrink-0 text-accent"
                  />
                  <div>
                    <Heading level={3} className="text-base">
                      {title}
                    </Heading>
                    <p className="mt-2 text-sm text-muted">{description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </div>
    </Section>
  );
}
