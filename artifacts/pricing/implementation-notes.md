# Pricing page implementation

The pricing page keeps the existing warm white, lavender, purple and orange identity, Geist font, shared Navbar/Footer and existing button styles. No dependency was added. Data and pure calculations live in `lib/pricing`; reusable presentation components live in `components/pricing`. Only the calculator state and mobile comparison picker require client interactivity. Static explanatory sections and country-aware FAQ/schema render on the server.

## Calculator behavior

- Pakistan is the only confirmed country. A query country overrides Vercel's country header; absent both, Pakistan is selected. Unrecognised country codes use a generic pending country, never Pakistan pricing.
- Room counts are integer values from 1–300. The numeric field permits an empty draft while editing and sanitises on blur. Slider and field stay in sync.
- Local totals change immediately; debounced URL replacements retain scroll position. Responses to previous replacements do not overwrite newer input. Browser navigation restores selection.
- Monthly total rounding is applied uniformly to the nearest country `totalStep`. This produces **PKR800 for 3-room Essentials**, rather than the conflicting PKR750 example. Pro is PKR1,300. Business confirmation is still required.
- Discounts apply to the whole bill: 15% above50 rooms, 25% above150. Fractional per-room rates retain2 decimals; final totals are rounded separately.
- Yearly charges10 rounded monthly totals, with effective monthly amount and2 months free displayed. Room-night equivalents use that effective monthly amount.
- Group is always quote-only: fromPKR350 per room, with no computed total and no invented minimum.
- Pay-as-you-stay uses30 days, rounded room nights, and a monthly Pro comparison even when yearly billing is selected. Equal costs receive an honest equal-price message.
- Live announcements are debounced400ms for both plan totals and occupancy results. Reduced motion disables number arrival animation.
- Controls measure their own sticky height. The site's existing header scrolls away, so controls stick at viewporttop0. Comparison column headings sit directly below them; anchored sections use that measured height.

## Approved example results

- 20 rooms monthly: EssentialsPKR5,000 /0.6 room nights; ProPKR8,400 /0.9 room nights. Free unavailable.
- 3 rooms monthly: Free available; EssentialsPKR800; ProPKR1,300.
- 20 rooms yearly: EssentialsPKR50,000/year andPKR4,167 effective/month; ProPKR84,000/year andPKR7,000 effective/month.
- 20 rooms55% occupancy:330 sold nights, pay-as-you-stayPKR9,240; monthly ProPKR8,400 is cheaper; break-even50%.
- 60 rooms: EssentialsPKR12,800 andProPKR21,400 after15% discount and total rounding.
- 200 rooms: EssentialsPKR37,500 andProPKR63,000 after25% discount.

Root's independent arithmetic/HTTP/browser evidence is stored alongside this file. Implementation typecheck and lint passed before final handoff. Root performs final lint/type/build and fresh design evaluation.

## Outstanding business TODOs

All eight open questions remain clearly marked in source:

1. Confirm country prices beyond Pakistan (`countries.ts`).
2. Confirm Group minimum bill (`calculate.ts`).
3. Confirm whole-bill versus marginal discounts (`calculate.ts`); whole-bill is implemented as instructed.
4. Assign Unified Inbox and AI-assisted reply drafting to plans (`plans.ts`); neither is invented in the comparison.
5. Confirm self-signup (`PlanCards.tsx`); `NEXT_PUBLIC_SIGNUP_URL` is empty by default, so demo CTAs remain.
6. Confirm Founding100 availability (`WaysToSave.tsx`); only exact environment value`true` enables it, defaultfalse.
7. Confirm AI tour and second WhatsApp number prices (`AddOns.tsx`); both say ask for current pricing.
8. Confirm nearestPKR100 rounding (`calculate.ts`), including the3-room Essentials conflict above.

The room-night proof is qualified as a typical20-room Pakistan property and omitted for pending countries. FAQ guest-message credit is explicitly scoped toPro/Group. Both these clarifications avoid unconfirmed claims.

Screenshots: `pricing-desktop.png`, `pricing-mobile.png`, and matching `-full.png` captures. Earlier `pricing-mobile-plans.png` /`pricing-mobile-compare.png` are development captures before final typography/sticky improvements; use the final primary captures for review.
