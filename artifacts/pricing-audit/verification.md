# ChatBeds pricing audit fixes — 2026-10-09

Applied the requested fixes without changing the existing page layout or adding dependencies. Prior uncommitted workflow, branding and hero-link changes were preserved.

## Files

Created:
- `lib/pricing/config.ts`: one country-scoped Founding 100 gate; disabled guarantee/trial policy configuration.
- `lib/pricing/proof.ts`: empty typed testimonial and customer-logo arrays.
- `lib/socials.ts`: empty typed social-profile configuration.
- `components/pricing/FoundingOffer.tsx`: gated announcement under the controls.
- `components/pricing/Testimonial.tsx`: real-data-only testimonial slot; null when empty.
- `components/pricing/CustomerLogos.tsx`: real-data-only logo slot; null when empty.
- `components/pricing/PricingPolicies.tsx`: enabled, nonempty policy statements only.
- `components/LegalDraft.tsx`: shared notice and headings-only legal structure.
- `app/(marketing)/privacy/page.tsx` and `app/(marketing)/terms/page.tsx`: draft pages with noindex/nofollow metadata.
- `scripts/verify-pricing.cjs`: development-only arithmetic assertions using the existing TypeScript dependency.
- `artifacts/pricing-audit/`: this report, desktop/mobile captures and `control-orders.json`.

Changed:
- `app/(marketing)/pricing/page.tsx`
- `app/(marketing)/pricing/pricing.css`
- `app/globals.css` (footer legal/social layout only; theme values unchanged)
- `components/Footer.tsx`
- `components/pricing/NoSurprises.tsx`
- `components/pricing/PayAsYouStay.tsx`
- `components/pricing/PaymentMethods.tsx`
- `components/pricing/PlanCards.tsx`
- `components/pricing/PricingCalculator.tsx`
- `components/pricing/PricingHero.tsx`
- `components/pricing/WaysToSave.tsx`
- `lib/pricing/calculate.ts`
- `lib/pricing/countries.ts`
- `lib/pricing/faq.ts`

Deleted: none in this audit task.

## Price consistency

The existing PAYG component already called `calcPayAsYouStay` per render. Its presentation is now explicit: the banner, full summary, difference, break-even and debounced live announcement all use that single result. Both cost amounts are included in the summary; the comparison explicitly labels regular Pro with monthly billing so yearly cards and optional founding prices are not confused with it. No calculated price is stored in state or memoized. The only stored summary string is the required 400ms-debounced accessibility announcement.

Country-dependent payment chips, offer, savings and FAQ now follow the current client selection immediately rather than waiting for a debounced server response. Server-only static sections remain passed as slots. FAQ text and FAQPage JSON-LD use the same data function.

## Arithmetic output

Run `node scripts/verify-pricing.cjs` from the repository root:

```text
20 rooms, 55%: 330 nights; PAYG PKR 9,240; Pro PKR 8,400; pro cheaper by PKR 840; break-even 50.00%.
20 rooms, 30%: 180 nights; PAYG PKR 5,040; Pro PKR 8,400; payg cheaper by PKR 3,360; break-even 50.00%.
50 rooms, 55%: 825 nights; PAYG PKR 23,100; Pro PKR 21,000; pro cheaper by PKR 2,100; break-even 50.00%.
60 rooms, 55%: 990 nights; PAYG PKR 27,720; Pro PKR 21,400; pro cheaper by PKR 6,320; break-even 42.46%.
PASS: monthly/yearly totals, volume discount, Free eligibility, Group quote-only and pending countries.
PASS: Founding disabled; no promotional price is returned.
TODO: confirm PAYG volume discount policy. Current PAYG rate remains PKR 28 per sold night, including at 60 rooms.
```

Also verified with `NEXT_PUBLIC_FOUNDING_100_ENABLED=true`:

```text
PASS: Founding enabled for PK Essentials/Pro only; 20 rooms PKR 3,000 / PKR 5,000 monthly; yearly PKR 30,000 / PKR 50,000; 60-room Pro PKR 15,100, no stacking.
```

The unchanged PKR-100 rounding rule applies to promotional monthly totals too. Thus 20-room Pro's unrounded founding total of PKR 5,040 displays as PKR 5,000. Yearly billed amounts remain 10 times the rounded monthly total; displayed effective monthly amounts are annual totals divided by 12.

At exactly 50 rooms there is no volume discount: the existing threshold is *above* 50. At 60 rooms Pro gets 15% off the whole bill before PKR-100 rounding. PAYG still charges PKR 28 per sold night; whether it receives a volume discount is unconfirmed and marked TODO.

## Exact existing colors reused

No color placeholders or replacement palette were introduced.

| Purpose / token | Value |
| --- | --- |
| Logo Chat / bubble | `#1800A2` |
| Logo Beds / bed | `#D16046` |
| Primary purple | `#623acb` |
| Dark purple | `#5130af` |
| Interface orange | `#ed7a2f` |
| Small orange text | `#a64614` |
| Warm background | `#fffdf9` |
| White surface | `#ffffff` |
| Lavender surface | `#f5f1fc` |
| Peach surface | `#fff3e8` |
| Main text | `#2c243a` |
| Muted text | `#6c6378` |
| Border | `#e5deee` |
| Success | `#167456` |

## Validation

- TypeScript passed after each requested implementation item: 1, 3, 4, 5, 6, 7 and 8. The supplied task has no item 2.
- Final lint and `tsc --noEmit`: passed.
- Production builds with Founding enabled and disabled: both passed. The enabled build was tested using an isolated temporary production server; that server was stopped afterward. The final production output has the flag disabled.
- 96 live control-order checks passed: four requested Pakistan cases, each through all 24 permutations of rooms, occupancy, billing and country. Each step checked visible prices; each completed sequence also checked debounced live values. Country switches included a pending country and return to PK. Evidence: `control-orders.json`.
- Offer enabled: both announcement and WaysToSave card present for PK; two promotional card lines; all absent for pending US. Monthly/yearly and 60-room values checked in the browser. Group/Free remain excluded from the offer.
- Offer disabled: no announcement, savings card or promotional card line.
- Empty testimonials, customer logos, social links, guarantee and trial render no UI.
- Payment chips exactly match PK data: JazzCash, Easypaisa, Raast, Bank transfer. No logo images or invented payment methods.
- Both added FAQ answers present verbatim in FAQPage JSON-LD. No trial statement appended while disabled.
- 1440, 1280, 1024, 768, 390 and 360px: no horizontal overflow, including the enabled-offer layout. Desktop and mobile screenshots saved.
- Keyboard room/occupancy sliders, billing radio arrows and FAQ Enter toggle passed. Comparison table retains visually hidden Included/Not included text. No cross icon remains on positive benefits.
- axe WCAG 2 A/AA: zero violations for pricing main content and footer. One incomplete contrast rule on existing gradients was checked against both light endpoints: minimum ratios for muted text, main text, success and purple are 5.09, 13.23, 5.12 and 6.29 respectively, above 4.5:1.
- Privacy and Terms load with HTTP 200, draft notices, noindex metadata and shared footer legal links.
- No new customer claims, testimonials, third-party logos, competitor copy, band letters or commercial margin figures.

## TODOs and assumptions

New / directly requested:
- Confirm Founding 100 is actually live before setting the existing `NEXT_PUBLIC_FOUNDING_100_ENABLED` flag to `true` and rebuilding. Default remains disabled. Enabled country list currently contains only PK.
- Confirm Founding 100 for Group and PAYG and stacking with volume discounts/referrals. For now it applies only to Essentials/Pro; the larger discount is used instead of stacking. Group/PAYG and all regular comparison prices are unchanged.
- Confirm PAYG volume-discount policy. Current flat rate is preserved.
- Confirm guarantee and trial policies. Both are disabled with empty text. No guarantee, refund period or general trial was invented.
- Supply real approved testimonial quotes/names/roles/properties/countries and customer-logo assets with publication permission. Arrays remain empty.
- Supply approved payment logo files, then map method keys in `countries.ts` to those existing assets. Map is empty; text chips work without images.
- Supply reviewed Privacy and Terms text. Current pages are headings-only drafts and excluded from indexing. They make no retention, deletion, backup or other legal promises.
- Supply real approved social URLs. Social configuration remains empty and its row is hidden.

Existing business TODOs preserved:
- Confirm whole-bill versus marginal volume discounts and nearest-PKR-100 rounding; current whole-bill/nearest-100 behavior retained.
- Confirm Group minimum bill; Group remains quote-only with no total.
- Supply approved prices for pending countries; none inherit PK pricing.
- Confirm approved self-signup URL; current Book a Demo fallback remains.
- Confirm plan assignment for Unified Inbox and AI-assisted replies.
- Confirm add-on prices for AI tour videos and a second WhatsApp number.

Other assumptions preserved: PAYG estimates a 30-day month; occupancy is a scenario input, not a business claim. Regular Pro is compared on monthly billing regardless of the annual-card toggle, clearly labeled. The typical room-night note reads the selected confirmed country's configured typical room rate (PKR 9,000), not a statement about the user's property.
