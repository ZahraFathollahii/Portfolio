"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { FiArrowLeft, FiArrowUpRight, FiPause, FiPlay } from "react-icons/fi";

import { CursorCompanion } from "@/components/layout/CursorCompanion";
import { LocaleSwitch } from "@/components/layout/LocaleSwitch";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import {
  ButtonLink,
  Container,
  Eyebrow,
  Heading,
  IconButton,
} from "@/components/ui";
import { BASE_PATH, SHOW_LOCALE_SWITCH } from "@/config/site";
import { I18nProvider } from "@/i18n/I18nProvider";
import type { ClientResources } from "@/i18n/resources";
import { defaultLocale, localeDir, type Locale } from "@/i18n/settings";
import { assetPath } from "@/lib/paths";

import styles from "./not-found.module.css";

type NotFoundCopy = {
  title: string;
  body: string;
  label: string;
  hint: string;
  pauseAnimation: string;
  backHome: string;
  allProjects: string;
  name: string;
  resources: ClientResources;
};

function getLocale(pathname: string): Locale {
  const segment = pathname.split("/")[1];
  return segment === "fa" ? "fa" : defaultLocale;
}

function getPathname(): string {
  return window.location.pathname.slice(BASE_PATH.length);
}

function subscribe(onChange: () => void) {
  window.addEventListener("popstate", onChange);
  return () => window.removeEventListener("popstate", onChange);
}

function getServerPathname(): string {
  return `/${defaultLocale}/`;
}

export function NotFoundContent({
  content,
}: {
  content: Record<Locale, NotFoundCopy>;
}) {
  const pathname = useSyncExternalStore(
    subscribe,
    getPathname,
    getServerPathname,
  );
  const locale = getLocale(pathname);
  const [motionPaused, setMotionPaused] = useState(false);
  const copy = content[locale];
  const home = assetPath(`/${locale}/`);

  useEffect(() => {
    // Read the actual URL even during the initial default-locale hydration pass.
    const current = getLocale(getPathname());
    document.documentElement.lang = current;
    document.documentElement.dir = localeDir[current];
  }, [locale]);

  return (
    <I18nProvider key={locale} locale={locale} resources={copy.resources}>
      <CursorCompanion />
      <div
        className={styles.page}
        data-locale={locale}
        lang={locale}
        dir={localeDir[locale]}
      >
        <div className={styles.backdrop} aria-hidden="true" />

        <Container className={`relative z-10 ${styles.localized}`}>
          <header className="flex min-h-20 items-center justify-between gap-3 border-b border-border/70">
            <a
              href={home}
              aria-label={`ZF — ${copy.name}`}
              className="flex size-10 items-center justify-center rounded-xl border border-border bg-surface font-mono text-sm font-bold text-accent transition-colors hover:border-accent/50"
            >
              ZF
            </a>
            <div className="flex items-center gap-1">
              <IconButton
                label={copy.pauseAnimation}
                title={copy.pauseAnimation}
                icon={motionPaused ? FiPlay : FiPause}
                aria-pressed={motionPaused}
                onClick={() => setMotionPaused((paused) => !paused)}
                className="motion-reduce:hidden"
              />
              {SHOW_LOCALE_SWITCH && (
                <LocaleSwitch reloadDocument pathname={pathname} />
              )}
              <ThemeToggle />
            </div>
          </header>
        </Container>

        <main id="main-content" className={styles.main}>
          <div
            className={styles.scene}
            data-paused={motionPaused}
            aria-hidden="true"
            dir="ltr"
          >
            <div className={styles.halo} />
            <div className={styles.orbit}>
              <span />
            </div>
            <div className={styles.outerOrbit}>
              <span />
            </div>
            <div className={styles.digits}>
              <span className={styles.four}>4</span>
              <div className={styles.portal}>
                <div className={styles.portalRim} />
                <div className={styles.portalCore} />
                <div className={styles.portalInner} />
              </div>
              <span className={styles.lastFour}>4</span>
            </div>
            <span className={styles.spark} />
            <span className={styles.spark} />
            <span className={styles.spark} />
            <span className={styles.spark} />
            <span className={styles.spark} />
            <span className={styles.spark} />
          </div>

          <div
            className={`relative z-10 mx-auto max-w-xl space-y-5 px-6 text-center ${styles.localized}`}
          >
            <Eyebrow>{copy.label}</Eyebrow>
            <Heading level={1} size="h2">
              {copy.title}
            </Heading>
            <p className="mx-auto max-w-md text-base text-muted sm:text-lg">
              {copy.body}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 pt-3">
              <ButtonLink href={home} icon={FiArrowLeft} mirrorIcon>
                {copy.backHome}
              </ButtonLink>
              <ButtonLink
                href={`${home}#work`}
                variant="secondary"
                icon={FiArrowUpRight}
                iconPosition="end"
                mirrorIcon
              >
                {copy.allProjects}
              </ButtonLink>
            </div>
          </div>
        </main>

        <footer
          className={`relative z-10 px-6 pt-8 pb-6 text-center text-xs text-muted ${styles.localized}`}
        >
          <span
            className="me-2 inline-block size-1.5 rounded-full bg-accent align-middle"
            aria-hidden="true"
          />
          {copy.hint}
        </footer>
      </div>
    </I18nProvider>
  );
}
