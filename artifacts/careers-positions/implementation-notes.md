# Careers Open positions implementation

Created:
- lib/careers.ts: typed OpenPosition and empty readonly openPositions configuration.
- components/OpenPositions.tsx: server-rendered section accepting optional role data, with honest empty state and populated role list.

Changed:
- app/(marketing)/careers/page.tsx: removed full CAREER ENQUIRIES subtree and email CTA/unused imports; added OpenPositions and refreshed page description. Original hero/product copy/About link retained.
- app/pages.css: minimal careers-position/list scoped styles using existing tokens and typography, mobile padding, safe wrapping and existing44px application links.
- README.md: removed stale general enquiry description and documented approved listings configuration.

No files deleted, dependencies added, fake roles, application URLs, policies or JobPosting schema published. The public configuration remains empty.

Role rendering:
- Required id/title/description/applicationUrl.
- HTTPS or valid single-address mailto destination required; unsupported/invalid destinations and blank required visible fields do not render.
- Optional department/location/employmentType are trimmed and omitted when absent; no empty separators.
- Each role has an h3 and clear 'Apply for [title]' text. HTTPS destinations use target blank and noopener noreferrer.
- Empty state accurately says no roles have been published on this page yet, without company-wide hiring claims or replacement career enquiry CTA.

Scoped ESLint passed exit0 for config/component/Careers route. Root handles final project checks, responsive QA and private populated-state verification.

Screenshots careers-desktop.png (1440wide) and careers-mobile.png (390wide) use ordinary tall viewport captures and were visually inspected. Open positions section is readable and consistent with the original theme. Own careers-positions-design browser closed; dev server untouched.
