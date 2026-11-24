import { Card, ChipList, Heading, Section } from "@/components/ui";
import { familiarSkills, skillGroups } from "@/content/skills";
import { getT } from "@/i18n/getT";
import type { Locale } from "@/i18n/settings";

export async function Skills({ locale }: { locale: Locale }) {
  const t = await getT(locale, "home");

  return (
    <Section id="skills" title={t("skills.title")}>
      <p className="mb-6 text-sm text-muted">{t("skills.production")}</p>
      <div className="grid gap-4 md:grid-cols-2">
        {skillGroups.map((group) => (
          <Card key={group.labelKey}>
            <Heading level={3} className="text-base">
              {t(group.labelKey)}
            </Heading>
            <ChipList items={group.items} className="mt-5" />
          </Card>
        ))}
      </div>
      <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3 rounded-card border border-dashed border-border px-6 py-5">
        <p className="text-sm text-muted">{t("skills.learningTitle")}</p>
        <ChipList items={familiarSkills} tone="accent" />
      </div>
    </Section>
  );
}
