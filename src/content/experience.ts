import type { ExperienceEntry } from "@/features/home/types";

// Dates: Resume has month + year only → day 01 by convention.
export const experience = [
  {
    id: "pardazeshgaran-sepehr",
    companyKey: "experience.sepehr.company",
    locationKey: "experience.locations.tehran",
    roles: [
      {
        id: "frontend",
        titleKey: "experience.sepehr.frontend.title",
        descriptionKey: "experience.sepehr.frontend.description",
        start: "2023-07-01",
        end: null,
        techs: [
          "JavaScript",
          "TypeScript",
          "React",
          "Next.js",
          "Tailwind CSS",
          "Ant Design",
          "Figma",
        ],
      },
    ],
  },
  {
    id: "sigma",
    companyKey: "experience.sigma.company",
    locationKey: "experience.locations.tehran",
    roles: [
      {
        id: "instructor",
        titleKey: "experience.sigma.instructor.title",
        descriptionKey: "experience.sigma.instructor.description",
        start: "2021-07-01",
        end: "2023-06-01",
        techs: ["Arduino", "mBlock", "Scratch"],
      },
    ],
  },
] as const satisfies readonly ExperienceEntry[];
