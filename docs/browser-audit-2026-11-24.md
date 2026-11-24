# Browser audit — 24 November 2026

## Result and scope

No unexpected console warnings/errors, uncaught JavaScript exceptions, failed network requests,
HTTP failures or automated accessibility violations remained in the tested scenarios after fixes.
This is a local laboratory audit, not a guarantee for every browser, extension or production environment.

The user's existing browser did not expose a remote debugging endpoint. Tests ran in a separate
Chrome session against the same development application at `http://localhost:3001`, then against
the production static export at `http://127.0.0.1:4173`. The user's browser profile and open tabs
were not changed. The existing development server was left running.

## Browser coverage

- All 12 localized content routes: EN/FA home and Ganotic, MSSP, Payesh, PicoPet and Salam Operator detail pages.
- 48 route/viewport/theme combinations: 12 routes × mobile/desktop × light/dark.
- Every home section: work, about, skills, experience, research and contact.
- Additional home widths: 320, 768, 1024 and 1280 px; main route matrix: 390 and 1440 px.
- Mobile dialog opening, keyboard focus containment, Escape, focus restoration and contact navigation.
- Client navigation from Contact to a case study, correct active Work navigation, locale switching, browser Back and persistent theme selection.
- Root redirect, EN/FA localized 404 at 320/1440 px, animation pause and locale links preserving unknown paths.
- Reduced-motion content visibility, loaded visible images and valid PDF download.
- Axe-core 4.14.0 checks tagged WCAG 2 A/AA, WCAG 2.1 A/AA and WCAG 2.2 AA. Scans run after finite transitions settle; this does not replace manual assistive-technology testing.

Four intentionally missing document requests correctly returned HTTP 404. Their browser-generated
resource messages are recorded as expected 404 behavior, separately from application errors.
No unexpected failure was omitted from the report.

## Fixes

- Recompute active home sections after client navigation and viewport changes; discard another route's stale selection and mark Work on project detail pages. Handle the final section at the bottom of the document. Added three regression tests.
- Remove unsolicited prefetching from the locale switch and brand home link. Route navigation still works on activation.
- Load the mobile menu avatar on demand, using the small WebP with explicit dimensions. The closed menu no longer downloads the JPEG fallback.
- Give the brand link a native text name that includes the visible initials and localized full name.
- Improve small-label contrast in light mode and remove reduced text opacity from mobile navigation labels.

## Lighthouse 13.6.0

Each final row is one cold lab run. Mobile uses simulated 4× CPU slowdown, 150 ms RTT and
approximately 1.6 Mbps throughput; desktop uses Lighthouse's desktop preset. The static server
has no gzip/Brotli or production CDN caching. These scores are not field Core Web Vitals;
TBT is not INP. No Lighthouse run warnings or audit execution errors were recorded.

| Scenario          | Performance | Accessibility | Best practices | SEO |    LCP |   TBT | CLS |
| ----------------- | ----------: | ------------: | -------------: | --: | -----: | ----: | --: |
| en-home-mobile    |          87 |           100 |            100 | 100 | 3.15 s | 87 ms |   0 |
| fa-home-mobile    |          87 |           100 |            100 | 100 | 3.15 s | 42 ms |   0 |
| en-project-mobile |         100 |           100 |            100 | 100 | 1.35 s | 81 ms |   0 |
| en-home-desktop   |         100 |           100 |            100 | 100 | 0.64 s |  0 ms |   0 |

The initial English mobile run transferred 1,629,883 bytes across 27 requests. The final run
transferred 1,154,907 bytes across 17 requests (about 29% fewer transferred bytes). Only the
responsive WebP portrait was requested; neither the hidden-menu JPEG nor speculative locale
RSC payloads were downloaded. This reduces transfer cost; the English mobile performance score
remained 87, and simulated LCP remained about 3.15 s. The Persian mobile score changed from
85 to 87; a single-run score difference is not proof of a consistent speed improvement.

## Deployment requirement and limits

Enable Brotli or gzip for HTML, CSS, JS, JSON and Next.js route `.txt` payloads on the hosting
CDN, and cache versioned `/_next/static/` files as immutable. Revalidate HTML and route payloads
after deployments. The uncompressed English HTML is about 411 KB; gzip produces about 61 KB.
The server configuration was not changed or deployed during this task. Repeat the audit on the
real HTTPS domain after deployment; mobile LCP on the uncompressed test server remains an
optimization concern despite the absence of runtime errors.

External product sites, mail, telephone and WhatsApp destinations were not activated. Local
link targets and the resume were checked. Other browsers, real devices and production analytics
are outside this local Chrome run. Unwritten case-study decisions/results remain hidden as before.

## Verification and artifacts

- `yarn test`: 42 passing tests across 9 files.
- `yarn lint`, `yarn format:check`, `yarn i18n:check`: passed. Existing hidden case-study TODO copy remains listed by the translation checker.
- `yarn build`: passed, including TypeScript.
- `yarn launch:check --built`: passed.
- Static reference audit: 16 HTML files, 533 local href/src references, zero missing targets.

Local raw artifacts (outside the application bundle):

- `/tmp/portfolio-dev-audit.json`
- `/tmp/portfolio-full-browser-audit.json`
- `/tmp/portfolio-menu-a11y-final.json`
- `/tmp/portfolio-lighthouse-audit/summary.json`
- `/tmp/portfolio-lighthouse-audit/*.report.html` and `*.report.json`

No application dependencies were added. Browser automation and Lighthouse were run as external audit tools.

## Cursor companion follow-up

Added a shared decorative SVG butterfly to the site shell and standalone 404 page. It follows
mouse coordinates with at most one pending animation frame; wing animation stops after movement.
It inherits the theme accent, stays inside viewport edges, ignores clicks and keyboard navigation,
and is disabled for touch pointers and reduced motion. A native manual popover keeps it visible
over the mobile navigation dialog. No dependencies or bitmap assets were added.

Browser testing exposed a detached-popover error during client-side locale changes. The cursor
now checks its connection before painting, and the header language switch loads the destination
document, including its locale-specific html/head and theme initialization script.

The production export passed 24 focused Chrome checks covering pointer tracking, edge containment,
idle animations and DOM writes, event batching, clicks, themes, keyboard use, runtime motion
preferences, project navigation, Persian/RTL switching, native dialog behavior, 404, blur and touch.
There were zero unexpected console errors, warnings, runtime errors or failed requests. The
deliberately missing document correctly returned HTTP 404 and produced one expected network message.
The development server also passed the functional checks; Next's development-only CSS preload
warning was absent from the production export. The earlier Lighthouse scores above were not rerun
for this feature.

All 42 tests, lint, formatting, translations, production build/TypeScript and built launch checks
passed after the code changes. Raw focused audit: `/tmp/portfolio-cursor-audit.json`.
