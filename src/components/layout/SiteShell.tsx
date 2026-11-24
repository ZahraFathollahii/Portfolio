import type { ReactNode } from "react";

import { CursorCompanion } from "@/components/layout/CursorCompanion";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { ScrollToTop } from "@/components/layout/ScrollToTop";
import { SkipLink } from "@/components/layout/SkipLink";
import type { Locale } from "@/i18n/settings";

type SiteShellProps = {
  locale: Locale;
  children: ReactNode;
};

export function SiteShell({ locale, children }: SiteShellProps) {
  return (
    <>
      <CursorCompanion />
      <SkipLink locale={locale} />
      <ScrollProgress />
      <Header locale={locale} />
      <main id="main" tabIndex={-1} className="outline-none">
        {children}
      </main>
      <Footer locale={locale} />
      <ScrollToTop />
    </>
  );
}
