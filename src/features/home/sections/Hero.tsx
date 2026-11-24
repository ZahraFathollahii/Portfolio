import { FiArrowDownRight, FiDownload, FiMapPin } from "react-icons/fi";

import { SocialLinks } from "@/components/layout/SocialLinks";
import { ButtonLink, Container, Eyebrow, Heading } from "@/components/ui";
import { SHOW_AVAILABILITY_BADGE } from "@/config/site";
import { profile } from "@/content/profile";
import { getT } from "@/i18n/getT";
import type { Locale } from "@/i18n/settings";
import { formatNumber } from "@/lib/format";
import { getProfilePhoto } from "@/lib/photo";
import { getResume } from "@/lib/resume";

import styles from "./Hero.module.css";

type HeroProps = { locale: Locale };

export async function Hero({ locale }: HeroProps) {
  const t = await getT(locale, "home");
  const tCommon = await getT(locale, "common");
  const tActions = await getT(locale, "actions");
  const resume = getResume(locale);
  const photo = getProfilePhoto();

  return (
    <section aria-labelledby="hero-title" className="overflow-clip">
      <Container>
        <div className={styles.hero}>
          <div className={styles.copy}>
            {SHOW_AVAILABILITY_BADGE && (
              <p className="mb-7 inline-flex items-center gap-2.5 text-xs font-medium text-muted">
                <span aria-hidden className="size-2 rounded-full bg-accent" />
                {t("hero.available")}
              </p>
            )}
            <Eyebrow className="mb-5 text-muted">
              {tCommon("site.name")}{" "}
              <span aria-hidden className="mx-1.5 text-accent">
                /
              </span>{" "}
              {t("hero.role")}
            </Eyebrow>
            <Heading level={1} id="hero-title" className={styles.title}>
              <span>{t("hero.headline")}</span>
              <span className="text-accent">{t("hero.headlineAccent")}</span>
            </Heading>
            <p className="mt-7 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
              {t("hero.intro")}
            </p>
            <div className={styles.actions}>
              <ButtonLink
                href="#work"
                icon={FiArrowDownRight}
                iconPosition="end"
                mirrorIcon
              >
                {t("hero.exploreWork")}
              </ButtonLink>
              {resume && (
                <ButtonLink
                  href={resume.href}
                  hrefLang={resume.locale}
                  download
                  variant="secondary"
                  icon={FiDownload}
                >
                  {tActions("downloadCv")}
                </ButtonLink>
              )}
            </div>
            <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-3 text-xs text-muted">
              <span className="inline-flex items-center gap-1.5">
                <FiMapPin aria-hidden className="size-3.5" />
                {t("hero.location")}
              </span>
              <span>{t("hero.workMode")}</span>
            </div>
          </div>

          <div className={styles.visual}>
            <div className={styles.portraitFrame}>
              <div className={styles.frameLabel}>
                <span>{t("hero.portraitLabel")}</span>
                <span aria-hidden className="font-mono">
                  ZF / 01
                </span>
              </div>
              {photo ? (
                <picture className={styles.portrait}>
                  <source
                    type="image/webp"
                    srcSet={photo.srcSet}
                    sizes="(min-width: 1024px) 360px, 280px"
                  />
                  <img
                    src={photo.src}
                    width={photo.size}
                    height={photo.size}
                    alt={t("hero.photoAlt")}
                    loading="eager"
                    fetchPriority="high"
                    decoding="async"
                  />
                </picture>
              ) : (
                <div className={styles.portraitFallback} aria-hidden>
                  ZF
                </div>
              )}
              <div className={styles.caption}>
                <span className="font-semibold text-text">
                  {tCommon("site.name")}
                </span>
                <span className="text-xs text-muted">
                  {t("hero.designToCode")}
                </span>
              </div>
            </div>
            <svg
              className={styles.flower}
              viewBox="0 0 120 120"
              fill="none"
              aria-hidden
            >
              {[0, 30, 60, 90, 120, 150].map((angle) => (
                <ellipse
                  key={angle}
                  cx="60"
                  cy="60"
                  rx="17"
                  ry="54"
                  transform={`rotate(${angle} 60 60)`}
                />
              ))}
              <circle cx="60" cy="60" r="9" />
            </svg>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-x-10 gap-y-7 border-y border-border py-6 sm:py-7">
          <dl className="flex flex-wrap items-center gap-8 sm:gap-12">
            <div className="flex items-center gap-3">
              <dt className="max-w-24 text-xs text-muted">
                {t("hero.experienceLabel")}
              </dt>
              <dd
                className="order-first text-3xl font-semibold tracking-tight text-text"
                dir="ltr"
              >
                {formatNumber(3, locale)}+
              </dd>
            </div>
            <div className="flex items-center gap-3">
              <dt className="max-w-24 text-xs text-muted">
                {t("hero.projectsLabel")}
              </dt>
              <dd
                className="order-first text-3xl font-semibold text-text"
                dir="ltr"
              >
                {formatNumber(15, locale)}+
              </dd>
            </div>
            <div className="hidden sm:block">
              <dt className="mb-1 text-xs text-muted">
                {t("hero.stackLabel")}
              </dt>
              <dd className="text-sm font-medium text-text" dir="ltr">
                {profile.headlineTechs.slice(0, 3).join(" / ")}
              </dd>
            </div>
          </dl>
          <SocialLinks locale={locale} />
        </div>
      </Container>
    </section>
  );
}
