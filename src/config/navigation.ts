/** Sections in document order, shared by desktop and mobile navigation. */
export const homeSections = [
  { id: "work", labelKey: "nav.work" },
  { id: "about", labelKey: "nav.about" },
  { id: "experience", labelKey: "nav.experience" },
  { id: "research", labelKey: "nav.research" },
  { id: "contact", labelKey: "nav.contact" },
] as const;

export type HomeSectionId = (typeof homeSections)[number]["id"];

export const homeSectionIds: readonly HomeSectionId[] = homeSections.map(
  (section) => section.id,
);
