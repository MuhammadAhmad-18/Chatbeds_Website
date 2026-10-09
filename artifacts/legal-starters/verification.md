# Starter policy verification

Task: Add basic Privacy Policy and Terms and Conditions content, preserving the current website UI.

Created: lib/legal-content.ts; artifacts/legal-starters/{implementation-notes.md,verification.md,privacy-desktop.png,privacy-mobile.png,terms-desktop.png,terms-mobile.png}.
Changed: components/LegalDraft.tsx, app/(marketing)/privacy/page.tsx, app/(marketing)/terms/page.tsx, app/pages.css (legal classes only), README.md. Deleted: none. Existing unrelated edits preserved.

Checks:
- npm run lint: PASS (exit 0).
- npx tsc --noEmit: PASS (exit 0).
- npm run build: PASS (exit 0); /privacy and /terms statically generated.
- Both pages at 1440, 1280, 1024, 768, 390, 360: zero document horizontal overflow and no overflowing policy headings. Body type 16px desktop/tablet, 15px mobile. One H1 per page; six Privacy and seven Terms H2 sections.
- Both metadata titles match their navigation labels. noindex, nofollow retained. Visible draft notice retained.
- Both pages axe WCAG A/AA main-content audit: zero violations; gradient color-contrast check incomplete. Manual contrast at both hero gradient stops: LEGAL eyebrow at least 6.29:1, H1 13.23:1, draft text 5.09:1.
- Terms-to-Privacy related link focused by keyboard with 2px purple focus outline; Enter opens /privacy at scrollY 0. Correct real mailto, pricing and reciprocal policy destinations. Footer Privacy Policy and Terms and Conditions labels/destinations retained.
- Browser error list empty. Own legal-qa browser closed; user's dev server left running.
- Desktop/mobile screenshots inspected. No new dependency, client component or data collection added.

Content grounded in website enquiry form implementation, company data and approved pricing FAQs. No invented retention/deletion period, security certification, refunds/renewals, trial/guarantee, jurisdiction or compliance claim. Remaining policy confirmations are clearly identified in the draft and README.

Brand unchanged: logo Chat #1800A2 / Beds #D16046; interface bg #fffdf9, text #2c243a, muted #6c6378, purple #623acb, border #e5deee.

Independent visual evaluation: PASS (attempt 1), reported by the fresh evaluator. Root did not read the evaluator report.
