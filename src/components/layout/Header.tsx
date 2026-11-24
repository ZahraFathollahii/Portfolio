import Link from "next/link";
import { FiArrowUpRight } from "react-icons/fi";

import { LocaleSwitch } from "@/components/layout/LocaleSwitch";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { SectionRail } from "@/components/layout/SectionRail";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { ButtonLink, Container } from "@/components/ui";
import { SHOW_LOCALE_SWITCH } from "@/config/site";
import { getT } from "@/i18n/getT";
import type { Locale } from "@/i18n/settings";
import { getProfilePhoto } from "@/lib/photo";
import { getResume } from "@/lib/resume";

type HeaderProps = {
  locale: Locale;
};

export async function Header({ locale }: HeaderProps) {
  const t = await getT(locale, "common");
  const tActions = await getT(locale, "actions");
  const tHome = await getT(locale, "home");
  const resume = getResume(locale);
  const photo = getProfilePhoto();
  const role = tHome("hero.role");
  const availableText = tHome("hero.available");

  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-bg/95 backdrop-blur-md">
      <Container className="flex h-18 items-center justify-between gap-4 sm:h-20">
        <Link
          href={`/${locale}/`}
          prefetch={false}
          className="group flex shrink-0 items-center gap-3"
        >
          <span className="flex size-10 items-center justify-center rounded-full border border-accent/40 font-mono text-sm font-semibold text-accent transition-colors group-hover:bg-accent/10">
            ZF
          </span>
          <span className="sr-only text-sm font-semibold text-text transition-colors group-hover:text-accent sm:not-sr-only">
            {t("site.name")}
          </span>
        </Link>
        <SectionRail />
        <div className="flex items-center gap-1">
          {/* Each locale renders its own html/head; load that document in full. */}
          {SHOW_LOCALE_SWITCH && <LocaleSwitch reloadDocument />}
          <ThemeToggle />
          <div className="ms-2 hidden sm:block">
            <ButtonLink
              href={`/${locale}/#contact`}
              size="sm"
              icon={FiArrowUpRight}
              iconPosition="end"
              mirrorIcon
            >
              {tActions("getInTouch")}
            </ButtonLink>
          </div>
          <MobileMenu
            locale={locale}
            resume={resume}
            photo={photo}
            role={role}
            availableText={availableText}
            location={tHome("hero.location")}
          />
        </div>
      </Container>
    </header>
  );
}
