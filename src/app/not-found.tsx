import type { Metadata } from "next";

import { ThemeScript } from "@/components/layout";
import { BASE_PATH } from "@/config/site";
import { getT } from "@/i18n/getT";
import { getClientResources } from "@/i18n/resources";
import { defaultLocale, type Locale } from "@/i18n/settings";
import { cn } from "@/lib/cn";
import { inter, vazirmatn } from "@/lib/fonts";

import { NotFoundContent } from "./not-found-content";

export const metadata: Metadata = {
  title: "404",
  robots: { index: false },
};

async function getContent(locale: Locale) {
  const t = await getT(locale, "errors");
  const tActions = await getT(locale, "actions");
  const tCommon = await getT(locale, "common");
  return {
    title: t("notFound.title"),
    body: t("notFound.body"),
    label: t("notFound.label"),
    hint: t("notFound.hint"),
    pauseAnimation: t("notFound.pauseAnimation"),
    backHome: tActions("backHome"),
    allProjects: tActions("allProjects"),
    name: tCommon("site.name"),
    resources: getClientResources(locale),
  };
}

// The export has a single 404.html. Set the document locale before paint; CSS hides
// the default copy on FA paths until React selects that locale (no English flash).
const localeScript = `(function(){var p=location.pathname.slice(${BASE_PATH.length}).split('/')[1];var d=document.documentElement;d.lang=p==='fa'?'fa':'en';d.dir=p==='fa'?'rtl':'ltr'})();`;

export default async function NotFound() {
  const [en, fa] = await Promise.all([getContent("en"), getContent("fa")]);

  return (
    <html
      lang={defaultLocale}
      dir="ltr"
      className={cn(inter.variable, vazirmatn.variable)}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <head>
        <ThemeScript />
        <script dangerouslySetInnerHTML={{ __html: localeScript }} />
      </head>
      <body suppressHydrationWarning>
        <NotFoundContent content={{ en, fa }} />
      </body>
    </html>
  );
}
