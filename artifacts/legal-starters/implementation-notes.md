# Starter legal policy implementation

Created: lib/legal-content.ts
Changed: components/LegalDraft.tsx, app/(marketing)/privacy/page.tsx, app/(marketing)/terms/page.tsx, app/pages.css, README.md
Deleted: none

Structured policies replace headings-only drafts. Shared server component renders a readable introduction, numbered H2 sections, actual contact email/address and reciprocal policy link. Privacy and Terms and Conditions keep visible Draft, pending legal review, noindex/nofollow metadata and no invented effective date. Scoped legal CSS reuses the existing theme and prose typography; header/footer and other pages unchanged. No dependencies or client JS added.

Privacy scope is the marketing website/enquiries, not every PMS/app practice. Accurate observations: website forms prepare mailto drafts without automatic submission; visitors review/send; demo context may include property/type/room count; external app/calendar/email services have separate policies. No analytics/tracking implementation found, while provider logs/cookies/sharing remain to confirm. Requests may be made by email without a promised deadline/outcome.

Terms cover basic website use, accurate authorized enquiries, avoiding sensitive information, account responsibility, selected-country pricing/Group quote and the existing approved free export/monthly cancellation statements. No invented jurisdiction, indemnity, liability, refunds, annual cancellation, trial, guarantee or guest-data ownership clauses.

Remaining confirmations: app-specific privacy, actual providers/hosting logs/cookies and sharing, enquiry retention, request handling and applicable rights, agreed subscription/application terms, annual cancellation/refunds/taxes/renewals, final legal review/effective dates.

Research principle references (original wording, no copied legal text or claim that UK rules apply):
- https://www.ftc.gov/business-guidance/privacy-security/consumer-privacy
- https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/individual-rights/individual-rights/right-to-be-informed/

Scoped ESLint completed exit0 for data/component/both routes. Root handles full lint/type/build, six-width checks and independent evaluation.

Four ordinary viewport screenshots at desktop1440 and mobile390 saved: privacy-desktop.png, privacy-mobile.png, terms-desktop.png, terms-mobile.png. Own legal-starters-design browser closed after capture; existing dev server untouched.
