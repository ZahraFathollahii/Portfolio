"use client";

import { usePathname } from "next/navigation";
import { useTranslation } from "react-i18next";

import { homeSectionIds, homeSections } from "@/config/navigation";
import { useActiveSection } from "@/hooks/useActiveSection";

/** Desktop navigation; the same section list drives the mobile menu. */
export function SectionRail() {
  const { t, i18n } = useTranslation("common");
  const pathname = usePathname();
  const activeSection = useActiveSection(homeSectionIds);
  const activeId = pathname.includes("/projects/") ? "work" : activeSection;

  return (
    <nav aria-label={t("nav.sectionsLabel")} className="hidden lg:block">
      <ul className="flex items-center gap-6 xl:gap-8">
        {homeSections.map((section) => (
          <li key={section.id}>
            <a
              href={`/${i18n.language}/#${section.id}`}
              aria-current={activeId === section.id ? "location" : undefined}
              className="inline-flex min-h-11 items-center border-b border-transparent text-sm font-medium text-muted transition-colors duration-200 hover:text-text aria-[current]:border-accent aria-[current]:text-text"
            >
              {t(section.labelKey)}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
