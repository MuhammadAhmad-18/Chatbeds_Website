# Header destination pages

All header entries now lead to substantive routes using the homepage's Geist typography, warm white, lavender, peach and purple palette, shared SVG logo, compact navigation and footer.

## Routes

- `/about`: product mission, complete PMS breadth, operational handovers and Bang Tech attribution.
- `/integrations`: overview linking to WhatsApp operations, guest messaging and distribution.
- `/integrations/whatsapp`: staff linking, alerts, operational replies, shared room status and setup discussion.
- `/integrations/guest-messaging`: Unified Inbox, clearly unsent assisted draft, guest journeys and portal.
- `/integrations/distribution`: Airbnb, Booking.com, Vrbo, calendar synchronization, linked rooms and rate plans.
- `/how-it-works`: operating model, existing seven-stage scroll workflow, maintenance and inventory examples.
- `/pricing`: useful property-focused pricing enquiry, scope checklist and FAQs; no invented prices or tiers.
- `/blog`: three real practical guides; existing housekeeping article retained.
- `/blog/maintenance-from-whatsapp` and `/blog/connected-front-desk`: two new substantive operational guides.
- `/contact`: exact company contacts and email-draft enquiry form.
- `/login`: real portal link when configured; useful account-access help otherwise.
- `/book-a-demo`: property-focused agenda and email-draft request form, or configured scheduling link.

## Created

- `app/(marketing)/layout.tsx` and route page files for About, How it works, Integrations overview/details, Pricing, Contact, Login and Book a Demo.
- `app/pages.css` for shared scoped page styling.
- `components/MarketingPage.tsx`, `IntegrationPage.tsx`, `EnquiryForm.tsx`, `BlogGuide.tsx`.
- `lib/integrations.ts`, `lib/page-metadata.ts`.
- Two new blog article page files.

## Updated

- `components/Navbar.tsx`: real page links, integration dropdown destinations, overview link and active states.
- `components/LoginButton.tsx`: account-access route link; obsolete modal removed.
- `components/Footer.tsx`: new page links while preserving company/contact grouping and root-prefixed feature anchors.
- `app/layout.tsx`: shared page stylesheet import.
- `app/navbar.css`: unused old account-dialog styles removed.
- `app/blog/layout.tsx`: shared marketing shell.
- `app/blog/page.tsx`: real guide index expansion and route metadata.
- `app/blog/housekeeping-from-whatsapp/page.tsx`: retained article with page-specific SEO metadata and formatting.
- `app/blog/blog.css`: article link-button contrast styling.

No dependencies or fonts added. Homepage sections, SVG artwork and scroll-workflow logic remain unchanged.

## Behavior and configuration

`NEXT_PUBLIC_LOGIN_URL` enables the actual sign-in destination from the Login page. Without it, the page offers account-access support; it does not collect credentials or invent an authentication endpoint.

`NEXT_PUBLIC_DEMO_URL` enables external scheduling. Otherwise the demo and contact forms prepare an email draft in the visitor's email app. Visitors must review and send it themselves. A request download is also available after preparation. Forms use unique field IDs, native required/email validation and accurate status text.

Actual prices were not supplied, so Pricing gives a useful requirements and enquiry path without fabricated plans or commercial terms.

## Implementation QA

- Final lint (zero warnings), TypeScript check and production build passed after all source edits.
- Contact required-field and email-format validation checked without sending messages.
- Mobile navigation and Integrations dropdown tested through actual clicks to Guest messaging; menu closed on navigation.
- Contact and WhatsApp integration axe checks: zero violations; gradient contrast entries require manual review and use existing homepage brand tokens.
- Front-desk guide axe check: zero violations and zero incomplete checks.
- Desktop/mobile screenshots saved under `artifacts/screenshots/header-pages/`.
- All 15 reachable pages and their internal links/anchors passed route checks.
- All 15 pages passed layout checks at 1440, 1280, 1024, 768, 390 and 360px: no horizontal overflow, duplicate IDs or clipped header actions.
- Homepage and How it works each passed 22 workflow checks at desktop and mobile widths, including forward/reverse scrolling, manual controls and replay.
- Demo form rejects empty required fields, invalid email and zero rooms; valid input and explicit field labels passed. No email was submitted during QA.
- Unknown integration/blog URLs returned 404; icon, apple-icon and opengraph-image returned 200.
- Fresh independent visual evaluation: PASS. Existing background dev server remains available at http://localhost:3000.
