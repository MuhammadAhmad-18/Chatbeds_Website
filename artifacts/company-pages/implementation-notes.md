# Company pages implementation

Created:
- app/(marketing)/news/page.tsx
- app/(marketing)/careers/page.tsx

Changed:
- lib/navigation.ts: enable News and Careers. Shared Company order is About, Blog, News, Careers; desktop, mobile and footer reuse it.
- README.md: document live Company destinations and remaining unavailable Resources.

No source files deleted, dependencies added, styling changed, or sitemap amended (no sitemap is present).

Design and content:
- Reused PageHero, SectionIntro and the existing editorial/prose/company-note styles, Geist typography, warm white surfaces and purple links.
- News states that no company announcements are published yet and provides Blog and company/press-contact links. No fake announcements, dates or claims.
- Careers explains approved PMS/WhatsApp product context and provides a general career-enquiry email. No vacancies, hiring status, salaries, benefits or recruitment promises are invented.
- Both routes are server components with pageMetadata canonical/description, using the existing shared MarketingShell.

Scoped validation:
- ESLint for both pages and lib/navigation.ts: passed.
- Visually inspected desktop 1440px and mobile 390px page captures.
- Confirmed expanded Company shows About, Blog, News and Careers on desktop and mobile; captured snapshots and screenshots.
- Existing dev server remained running; own company-design browser session closed.
- Root owns final project lint, type check, build, responsive checks and evaluation.

Screenshots:
- news-desktop.png / news-mobile.png
- careers-desktop.png / careers-mobile.png
- company-desktop.png / company-mobile.png
