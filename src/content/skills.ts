import type { ParseKeys } from "i18next";
import type { Skill } from "@/features/home/types";
import {
  SiAntdesign,
  SiFigma,
  SiFramer,
  SiGit,
  SiHtml5,
  SiI18Next,
  SiJavascript,
  SiNextdotjs,
  SiPwa,
  SiReact,
  SiReactquery,
  SiReactrouter,
  SiRedux,
  SiTailwindcss,
  SiTestinglibrary,
  SiTypescript,
  SiVite,
} from "react-icons/si";
import { TbApi, TbChartBar } from "react-icons/tb";

export const skillGroups = [
  {
    labelKey: "skills.groups.interfaces",
    items: [
      { name: "React", icon: SiReact },
      { name: "Next.js", icon: SiNextdotjs },
      { name: "TypeScript", icon: SiTypescript },
      { name: "JavaScript (ES6+)", icon: SiJavascript },
      { name: "HTML5/CSS3", icon: SiHtml5 },
      { name: "Tailwind CSS", icon: SiTailwindcss },
      { name: "Ant Design", icon: SiAntdesign },
    ],
  },
  {
    labelKey: "skills.groups.data",
    items: [
      { name: "Redux Toolkit", icon: SiRedux },
      { name: "TanStack Query", icon: SiReactquery },
      { name: "REST APIs", icon: TbApi },
      { name: "Axios", icon: TbApi },
      { name: "React Hook Form" },
      { name: "Zod" },
    ],
  },
  {
    labelKey: "skills.groups.interaction",
    items: [
      { name: "i18next (RTL/LTR)", icon: SiI18Next },
      { name: "PWA", icon: SiPwa },
      { name: "React Router", icon: SiReactrouter },
      { name: "Framer Motion", icon: SiFramer },
      { name: "Recharts", icon: TbChartBar },
      { name: "React Flow" },
      { name: "Highcharts", icon: TbChartBar },
      { name: "Leaflet" },
      { name: "Service Workers", icon: SiPwa },
      { name: "WebSockets (Socket.IO)" },
      { name: "Server-Sent Events (SSE)" },
    ],
  },
  {
    labelKey: "skills.groups.workflow",
    items: [
      { name: "Vite", icon: SiVite },
      { name: "Git/GitLab", icon: SiGit },
      { name: "Figma", icon: SiFigma },
      { name: "Vitest" },
      { name: "GitHub Actions", icon: SiGit },
      { name: "Chrome DevTools" },
    ],
  },
] as const satisfies readonly {
  labelKey: ParseKeys<"home">;
  items: readonly Skill[];
}[];

export const familiarSkills = [
  { name: "Zustand" },
  { name: "React Testing Library", icon: SiTestinglibrary },
  { name: "Cypress" },
] as const satisfies readonly Skill[];
