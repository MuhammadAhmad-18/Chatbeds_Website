# Careers Open positions verification

Created `lib/careers.ts` and `components/OpenPositions.tsx`. Updated Careers page, its metadata description, scoped Careers styles in `app/pages.css` and the README. No dependencies, extra routes, fake vacancies or source-file deletions. Earlier uncommitted work is preserved.

Removed the requested CAREER ENQUIRIES block, its general-enquiry paragraph and Send a career enquiry email CTA. Existing hero, product context and Learn about ChatBeds link remain.

Open positions uses an empty typed array until approved roles are supplied. It displays an honest published-list empty state, without claiming anything about company-wide hiring. Real entries display title, description, optional department/location/employment type, and a per-role HTTPS or mailto application link. Missing optional metadata produces no empty labels or separators. Invalid application URLs are omitted.

## Checks

- Fresh visual evaluation: PASS, first attempt.
- `npm run lint`: passed.
- `npm run typecheck` (`tsc --noEmit`): passed.
- `npm run build` (`next build`): passed.
- At 1440, 1280, 1024, 768, 390 and 360px: no horizontal overflow, one main H1, Open positions heading and honest empty state present; requested enquiry text and main-content email CTA absent; existing About link present.
- Browser WCAG A/AA scan scoped to Open positions: zero violations and zero incomplete checks.
- Browser runtime error log empty.
- Private throwaway server-render verification using temporary fixtures outside the repository: empty state PASS; two valid HTTPS/mailto listings rendered; three invalid destinations (javascript, HTTP, blank) hidden; optional metadata omitted correctly; external link rel PASS. Zero fixture vacancies were published or added to the real config.
- Desktop and mobile screenshots inspected, showing consistent typography/materials and the new empty state. Existing user dev server left running at `http://localhost:3000/careers`.

The README Careers listings section explains the required fields. Supply approved entries in `lib/careers.ts` to publish actual vacancies. No job opening, salary, location, benefits or application policy was assumed.

Artifacts: `careers-desktop.png`, `careers-mobile.png`, `implementation-notes.md` and this report.
