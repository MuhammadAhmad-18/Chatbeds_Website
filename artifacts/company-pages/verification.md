# News and Careers verification

Created `app/(marketing)/news/page.tsx` and `app/(marketing)/careers/page.tsx` as server-rendered marketing pages. Changed `lib/navigation.ts` to enable both existing destinations and updated the navigation paragraph in `README.md`. No dependency or CSS changes, no deletions. Both routes inherit the existing marketing layout, Navbar, Footer, fonts and theme.

Company now lists About, Blog, News and Careers in that order on desktop and mobile. The shared footer Company column includes both new links. Developer docs and Help Center remain unavailable.

News has an honest empty company-announcement state, with existing Blog and contact links. Careers explains the approved product context and offers a general career enquiry through the existing contact email. No announcements, dates, vacancies, hiring policies, benefits or recruitment promises were invented.

## Checks

- Fresh visual evaluation: PASS, first attempt.
- `npm run lint`: passed.
- `npm run typecheck` (`tsc --noEmit`): passed.
- `npm run build` (`next build`): passed; both new routes prerendered successfully.
- `/news` and `/careers`: HTTP 200, complete semantic main content and page titles.
- Both pages tested at 1440, 1280, 1024, 768, 390 and 360px: no horizontal overflow, one main H1, Company active, exact matching child link has `aria-current="page"`.
- Expanded Company at 360px: all four links visible, 48px link targets, no overflow and existing body scroll lock working.
- Keyboard End reaches Careers in the expanded group. Desktop Enter/Home/Arrow Down/Enter navigation reaches News, closes the dropdown and starts at the top. Mobile Careers link navigation closes navigation, clears body scroll lock/background inert state and starts at the top.
- Careers enquiry points to `mailto:contact@chatbeds.app?subject=ChatBeds%20career%20enquiry` using existing configurable contact data. News canonical is `https://chatbeds.app/news`, with page-specific description from the shared metadata helper.
- Main content accessibility scans: zero WCAG A/AA violations for both pages. Gradient backgrounds caused automated contrast checks to be marked incomplete; manual token comparison against both gradient endpoints confirmed minimum contrast ratios of 13.23:1 for text, 5.09:1 muted, 6.29:1 purple and 7.86:1 purple-dark.
- Browser error log empty.

## Artifacts

`news-desktop.png`, `news-mobile.png`, `careers-desktop.png`, `careers-mobile.png`, `company-desktop.png`, `company-mobile.png` and `implementation-notes.md` are saved beside this report. Expanded Company captures confirm all four destinations.

The existing dev server was kept running at `http://localhost:3000/`. Real announcements and job listings can be supplied later; none were assumed for this task.
