import type { Degree } from "@/features/home/types";

export const degrees = [
  {
    id: "msc",
    degreeKey: "research.degrees.msc.degree",
    schoolKey: "research.degrees.msc.school",
    yearKey: "research.degrees.msc.year",
    noteKey: null,
    gpa: { value: 18.79, scale: 20 },
  },
  {
    id: "bsc",
    degreeKey: "research.degrees.bsc.degree",
    schoolKey: "research.degrees.bsc.school",
    yearKey: "research.degrees.bsc.year",
    noteKey: null,
    gpa: { value: 17.91, scale: 20 },
  },
] as const satisfies readonly Degree[];

export const thesis = {
  labelKey: "research.thesis.label",
  titleKey: "research.thesis.title",
  summaryKey: "research.thesis.summary",
  methods: ["Multi-agent systems", "ATAM", "CSP", "PAT"],
} as const;
