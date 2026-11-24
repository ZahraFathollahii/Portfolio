"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslation } from "react-i18next";

import { locales, type Locale } from "@/i18n/settings";
import { cn } from "@/lib/cn";
import { assetPath } from "@/lib/paths";

type LocaleSwitchProps = {
  className?: string;
  /** Static hosts serve a shared 404 document, without a matching client route. */
  reloadDocument?: boolean;
  /** The shared static 404's router pathname is /_not-found, rather than the requested URL. */
  pathname?: string;
};

/** Same page in the other locale: swaps the first path segment, keeps the rest. */
export function switchLocalePath(
  pathname: string,
  target: Locale,
): `/${string}` {
  const segments = pathname.split("/");
  if (locales.some((locale) => locale === segments[1])) segments[1] = target;
  else segments.splice(1, 0, target);
  return `/${segments.slice(1).join("/")}`;
}

export function LocaleSwitch({
  className,
  reloadDocument = false,
  pathname,
}: LocaleSwitchProps) {
  const { t, i18n } = useTranslation("common");
  const routerPathname = usePathname();
  const target =
    locales.find((locale) => locale !== i18n.language) ?? locales[0];
  const href = switchLocalePath(pathname ?? routerPathname, target);
  const LinkComponent = reloadDocument ? "a" : Link;

  return (
    <LinkComponent
      href={reloadDocument ? assetPath(href) : href}
      hrefLang={target}
      {...(!reloadDocument && { prefetch: false })}
      className={cn(
        "inline-flex h-10 items-center rounded-control px-3 text-sm font-medium text-muted transition-colors duration-200 hover:bg-surface hover:text-text",
        className,
      )}
    >
      {/* Accessible name starts with the visible word (WCAG 2.5.3); only that word is in the target language. */}
      <span lang={target}>{t("locale.switchTo")}</span>
      <span className="sr-only"> ({t("locale.switchLabel")})</span>
    </LinkComponent>
  );
}
