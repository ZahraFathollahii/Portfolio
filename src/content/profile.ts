import type { Locale } from "@/i18n/settings";

export const socialUrls = {
  github: "https://github.com/ZahraFathollahii",
  linkedin: "https://www.linkedin.com/in/zahra-fathollahi",
  whatsapp: "https://wa.me/989905724725",
} as const;

export const profile = {
  email: "zahrafathollaahi@gmail.com",
  phone: "+989905724725",
  phoneFormatted: "+98 990 572 4725",
  whatsapp: socialUrls.whatsapp,
  location: "Tehran, Iran",
  /** Shown next to the role in the hero, as separate items. */
  headlineTechs: [
    "React",
    "Next.js",
    "TypeScript",
    "JavaScript (ES6+)",
    "Tailwind CSS",
    "Ant Design",
  ],
  /**
   * Per-locale resume. A missing file falls back to the EN one at build time (see lib/resume.ts);
   * "Download CV" stays hidden if that doesn't exist either.
   * The English PDF is the fallback until a Persian resume is provided.
   */
  resume: {
    en: "/resume/zahra-fathollahi-en.pdf",
    fa: "/resume/zahra-fathollahi-fa.pdf",
  } satisfies Record<Locale, `/${string}`>,
} as const;

export const socialLinks = [
  {
    id: "linkedin",
    href: socialUrls.linkedin,
    labelKey: "social.linkedin",
  },
  {
    id: "github",
    href: socialUrls.github,
    labelKey: "social.github",
  },
  {
    id: "whatsapp",
    href: socialUrls.whatsapp,
    labelKey: "social.whatsapp",
  },
] as const;

export type SocialId = (typeof socialLinks)[number]["id"];
