import { FaLinkedinIn, FaWhatsapp } from "react-icons/fa6";
import { FiMail, FiPhone } from "react-icons/fi";
import { SiGithub } from "react-icons/si";

import { ButtonLink, Card, Heading, Section } from "@/components/ui";
import { profile, socialUrls } from "@/content/profile";
import { getT } from "@/i18n/getT";
import type { Locale } from "@/i18n/settings";

type ContactProps = {
  locale: Locale;
};

export async function Contact({ locale }: ContactProps) {
  const t = await getT(locale, "home");
  const tCommon = await getT(locale, "common");
  const tActions = await getT(locale, "actions");

  return (
    <Section
      id="contact"
      title={t("contact.title")}
      description={t("contact.body")}
    >
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <Card interactive className="flex min-w-0 flex-col justify-between">
          <div>
            <div
              aria-hidden
              className="flex size-11 items-center justify-center rounded-2xl bg-accent/10 text-accent"
            >
              <FiMail className="size-5" />
            </div>
            <Heading level={3} className="mt-4 text-base font-bold text-text">
              {t("contact.emailLabel")}
            </Heading>
            <p
              className="mt-2 font-mono text-sm break-all text-muted select-all"
              dir="ltr"
            >
              {profile.email}
            </p>
          </div>
          <div className="mt-7">
            <ButtonLink
              href={`mailto:${profile.email}`}
              size="sm"
              icon={FiMail}
              className="w-full"
            >
              {tActions("sendEmail")}
            </ButtonLink>
          </div>
        </Card>

        <Card interactive className="flex min-w-0 flex-col justify-between">
          <div>
            <div
              aria-hidden
              className="flex size-11 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-700 in-data-[theme=dark]:text-emerald-300"
            >
              <FaWhatsapp className="size-5" />
            </div>
            <Heading level={3} className="mt-4 text-base font-bold text-text">
              {t("contact.phoneLabel")}
            </Heading>
            <p
              className="mt-2 font-mono text-sm break-all text-muted select-all"
              dir="ltr"
            >
              {profile.phoneFormatted}
            </p>
          </div>
          <div className="mt-7 flex flex-wrap gap-2">
            <ButtonLink
              href={profile.whatsapp}
              variant="secondary"
              size="sm"
              icon={FaWhatsapp}
              newTabHint={tActions("newTab")}
              className="flex-1"
            >
              {tActions("messageWhatsapp")}
            </ButtonLink>
            <ButtonLink
              href={`tel:${profile.phone}`}
              variant="secondary"
              size="sm"
              icon={FiPhone}
              className="flex-1"
            >
              {tActions("callPhone")}
            </ButtonLink>
          </div>
        </Card>

        <Card interactive className="flex min-w-0 flex-col justify-between">
          <div>
            <div
              aria-hidden
              className="flex size-11 items-center justify-center rounded-2xl bg-sky-500/10 text-sky-700 in-data-[theme=dark]:text-sky-300"
            >
              <FaLinkedinIn className="size-5" />
            </div>
            <Heading level={3} className="mt-4 text-base font-bold text-text">
              {t("contact.linkedinLabel")}
            </Heading>
            <p
              className="mt-2 font-mono text-sm break-all text-muted"
              dir="ltr"
            >
              zahra-fathollahi
            </p>
          </div>
          <div className="mt-7">
            <ButtonLink
              href={socialUrls.linkedin}
              variant="secondary"
              size="sm"
              icon={FaLinkedinIn}
              newTabHint={tActions("newTab")}
              className="w-full"
            >
              {tCommon("social.linkedin")}
            </ButtonLink>
          </div>
        </Card>

        <Card interactive className="flex min-w-0 flex-col justify-between">
          <div>
            <div
              aria-hidden
              className="flex size-11 items-center justify-center rounded-2xl bg-accent/10 text-accent"
            >
              <SiGithub className="size-5" />
            </div>
            <Heading level={3} className="mt-4 text-base font-bold text-text">
              {t("contact.projectsLabel")}
            </Heading>
            <p className="mt-2 font-mono text-sm text-muted">
              <bdi>ZahraFathollahii</bdi>
            </p>
          </div>
          <div className="mt-7 flex flex-wrap gap-2">
            <ButtonLink
              href={socialUrls.github}
              variant="secondary"
              size="sm"
              icon={SiGithub}
              newTabHint={tActions("newTab")}
              className="flex-1"
            >
              {tCommon("social.github")}
            </ButtonLink>
          </div>
        </Card>
      </div>
    </Section>
  );
}
