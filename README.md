# Zahra Fathollahi — Portfolio

Bilingual (English / Persian) portfolio of Zahra Fathollahi, front-end developer.
Live at **https://zahrafathollahi.ir**.

<!-- TODO(screenshots): add home page screenshots (EN + FA, dark + light) before launch. -->

## What's inside

- Home page: hero, selected work, about, grouped skills, experience timeline, research & education, contact
- Case studies for projects with confirmed supporting content: context → my scope → key decisions → challenges → result
- Full RTL/LTR parity, Persian digits and Jalali dates in FA, dark/light theme without a flash on load
- Fully static export — no server, no API routes

## Stack

- [Next.js](https://nextjs.org) (App Router, static export) · React · TypeScript (strict)
- Tailwind CSS v4 with CSS-first design tokens
- i18next + react-i18next (`en`, `fa`)
- react-icons · self-hosted Inter + Vazirmatn
- Vitest + React Testing Library

No UI, state-management or animation libraries.

## Local setup

Requires Node 24 (see `.nvmrc`) and Yarn 4 via Corepack.

```bash
corepack enable
yarn install
yarn dev        # http://localhost:3000/en/
```

## Scripts

| Command                        | What it does                                                                                |
| ------------------------------ | ------------------------------------------------------------------------------------------- |
| `yarn build`                   | Static export to `out/`                                                                     |
| `yarn lint` · `yarn typecheck` | ESLint · route types + `tsc`                                                                |
| `yarn format` · `format:check` | Prettier (with Tailwind class sorting)                                                      |
| `yarn test`                    | Vitest                                                                                      |
| `yarn i18n:check`              | FA/EN translation keys match, nothing empty or unused; lists `TODO` values                  |
| `yarn launch:check [--built]`  | Fails while launch content is missing; `--built` also scans `out/` for rendered `TODO` text |
| `yarn photo:build`             | Profile photo → stripped, square WebP/JPEG in `public/images/profile/`                      |
| `yarn og:build`                | Regenerates the per-locale Open Graph images in `public/og/` (needs Chrome)                 |

## Project layout

```
src/
  app/          routes: /[locale], /[locale]/projects/[slug], sitemap, robots, 404
  components/   ui/ (primitives) and layout/ (shell)
  features/     home sections, project cards and case-study parts, shared domain types
  content/      non-translatable data: dates, URLs, tech lists, translation keys
  locales/      en/ and fa/ JSON (translator notes in locales/CONTEXT.md)
  config/       base path, site URL and feature flags
scripts/        i18n, launch, photo and OG tooling (Node 24 type stripping)
```

Hosting paths are defined once in `src/config/site.ts`.

The supplied English resume lives at `public/resume/zahra-fathollahi-en.pdf`.
Persian pages use this PDF until a Persian version is added. Profile, experience, education and
the original project summaries follow that resume. Additional frontend projects have two concise
contribution bullets per card, based on source inspection and the author’s contribution notes.
The local education workspace is explicitly labeled as a demo, and unconfirmed public URLs are
omitted. Detailed case-study decisions, challenges, results and screenshots remain pending author input.
Copy decks are in `docs/project-descriptions-en.md` and `docs/project-descriptions-fa.md`;
source evidence and scope limitations are recorded in `docs/project-evidence.md`. The older HTML resume source is kept in
`docs/resume-draft.html` as a draft; the PDF is the current source of truth.

## Deployment

- **CI** (`.github/workflows/ci.yml`) runs lint, typecheck, format, tests, `i18n:check` and the build on every push and pull request.
- **Deploy** (`.github/workflows/deploy-arvan.yml`) is started manually from the Actions tab. It runs the quality and launch checks, builds, checks the generated pages and syncs `out/` to ArvanCloud Object Storage on `https://zahrafathollahi.ir`.

The production CDN should enable Brotli or gzip for HTML, CSS, JavaScript, JSON and Next.js
route payloads (`.txt`). Cache versioned `/_next/static/` assets as immutable; revalidate HTML
and route payloads when deploying. A bare local static server has no compression and is not
representative of production transfer sizes. Browser and Lighthouse audit results are recorded in
`docs/browser-audit-2026-11-24.md`.

## License

Code © Zahra Fathollahi — all rights reserved. No open-source license is granted.

The content — text and translations, profile photo, resume, project descriptions and screenshots — is
**not licensed for reuse** in any form.

Third-party fonts keep their own license: Inter and Vazirmatn are under the SIL Open Font License
(`src/assets/fonts/`).

## Visual design

A full-width portfolio with horizontal navigation, warm ink-and-paper colors, an editorial portrait,
numbered sections and original graphic covers for six featured projects. The archive keeps the other
projects and their two technical contributions visible. The home page currently includes 21 projects
and experiments; the hero separately displays the author-confirmed 15+ project experience.

Shared primitives own spacing, card padding, buttons and typography. Persian uses Vazirmatn,
including monospace-styled labels; English uses Inter. Both locales, light/dark themes, keyboard
navigation and reduced-motion preferences are supported. Project cover graphics are decorative
identities, not screenshots of the applications. No UI library or animation dependency was added.
