# Pricing implementation and verification

The `/pricing` page uses the current warm white, lavender, purple and orange theme, the existing Geist font, and shared navigation, footer and demo flow. No dependencies or test runner were added.

## Files

Changed: `app/(marketing)/pricing/page.tsx` and `.env.example`.

Created:

- `app/(marketing)/pricing/pricing.css`
- `lib/pricing/types.ts`, `countries.ts`, `plans.ts`, `calculate.ts`, `faq.ts`
- `components/pricing/PricingHero.tsx`, `PricingControls.tsx`, `PricingCalculator.tsx`, `PlanCards.tsx`, `PayAsYouStay.tsx`, `CompareTable.tsx`, `WhatsAppCosts.tsx`, `WaysToSave.tsx`, `AddOns.tsx`, `NoSurprises.tsx`, `PaymentMethods.tsx`, `PricingFAQ.tsx`
- Screenshots, implementation notes and verification evidence in `artifacts/pricing/`.

No project files were deleted. Existing uncommitted navigation fixes were preserved.

## Calculation checks

Pure TypeScript functions were executed through the existing TypeScript compiler in a throwaway Node script, with assertions against the supplied business examples. See `calculation-verification.json`.

| Pakistan example | Essentials | Pro |
| --- | --- | --- |
| 20 rooms, monthly | PKR 5,000; 0.6 room nights | PKR 8,400; 0.9 room nights |
| 3 rooms, monthly | PKR 800 | PKR 1,300 |
| 20 rooms, yearly | PKR 50,000/year; PKR 4,167 effective/month | PKR 84,000/year; PKR 7,000 effective/month |
| 60 rooms, monthly, 15% discount | PKR 12,800 | PKR 21,400 |
| 200 rooms, monthly, 25% discount | PKR 37,500 | PKR 63,000 |

Free is available at three rooms and unavailable above three. Group displays a starting rate of PKR 350 per room and never computes a total. Pending countries return no prices.

For 20 rooms at 55% occupancy, 330 sold room nights cost PKR 9,240 on pay-as-you-stay; Pro at PKR 8,400 is cheaper. Break-even is 50%. Browser checks also covered 0%, 40%, 50%, 55% and 100%, including honest equal-price wording and debounced announcements.

## Assumptions and business TODOs

1. Only Pakistan has confirmed prices. Other listed countries and unknown country codes show pending pricing without a Pakistan fallback. Confirm remaining country prices.
2. Group is quote-only. Confirm its minimum bill.
3. Volume discounts apply to the whole bill, as instructed. Confirm whether that policy should instead be marginal.
4. Confirm plan assignment for Unified Inbox and AI-assisted reply drafting; neither was assigned in the comparison.
5. Confirm self-signup. `NEXT_PUBLIC_SIGNUP_URL` defaults to empty, so eligible cards link to the existing demo route.
6. Confirm whether Founding 100 is live. It only renders when `NEXT_PUBLIC_FOUNDING_100_ENABLED` is exactly `true`; the example default is `false`.
7. Confirm AI tour video and second WhatsApp number prices. Both remain enquiries.
8. Confirm rounding. Uniform nearest-PKR 100 rounding makes three-room Essentials **PKR 800**, conflicting with the supplied PKR 750 example. Pro rounds from PKR 1,260 to PKR 1,300. Fractional discounted per-room rates retain precision; only totals are rounded.

Yearly billing charges ten rounded monthly totals. The occupancy calculator assumes 30 days and compares against monthly Pro, including when yearly billing is selected. The room-night proof identifies its 20-room Pakistan context; pending countries do not receive that claim.

## Technical checks

- ESLint, `tsc --noEmit`, and `next build` passed.
- Production route is server-rendered on demand; country query parameters override the Vercel country header. Server checks covered the US header, Pakistan override, Germany and an unknown country.
- Browser checks covered shared URL restoration, rapid room changes, editable empty numeric input, bounds on blur, synchronized slider, billing changes, country changes without a scroll jump, and mobile plan selection by keyboard.
- Sticky controls align at viewport top; desktop comparison headings align directly beneath their measured height.
- Comparison table accessibility audit: zero violations and zero incomplete checks. Page audit: zero automated WCAG A/AA violations; gradient backgrounds require manual contrast inspection.
- Reduced-motion mode disables price arrival animation. No browser runtime errors were observed in development or production.
- Responsive and production browser evidence is saved alongside this file. Desktop uses four cards from 1280px, two cards from 768px, and a single column below 768px. Mobile comparison uses a plan picker and native disclosure groups.
- Final production checks passed at 1440, 1280, 1024, 768, 390 and 360px with no horizontal overflow. All eleven internal page destinations returned HTTP 200, and all section anchors exist.
- Browser Back restored three rooms and the prior 900px scroll position. Clicking the header Pricing link reset the page to its default 20 rooms and scroll position zero.
- A fresh design evaluation passed on desktop, tablet and mobile. The evaluator confirmed consistent light styling, usable sticky mobile controls and comparison, and a clean pending-country state.
- Final accessibility polish adds explicit spaces in split headings and a full country/currency title on the native selector. Long country names can visually truncate in the compact mobile field; the full selected name remains available to assistive technology and in the dropdown. Lint, type check and production build passed again after this polish.

Final screenshots: `pricing-desktop.png`, `pricing-desktop-full.png`, `pricing-mobile.png`, and `pricing-mobile-full.png`.
