# How it works content extension

Created `components/HowItWorksDetails.tsx` and added one import block and three component insertions to `app/(marketing)/how-it-works/page.tsx`. No dependencies, new client components, CSS changes or source deletions. Earlier Company/Resources work is preserved.

## Added content

- Complete PMS explanation: what property management system means; how reservations, room status, frontline replies and management's dashboard relate; operational and commercial breadth.
- Four daily-operation cards: book and assign; support the stay; check out and hand over; review finance and daily close.
- Four practical questions: dashboard access, supervisor inspection before Ready, guest messaging versus staff work, and supported property types. Reuses the existing native FAQ component.

## Preservation

Compared against source snapshots taken before this task: every original route line is retained in its original order (zero missing lines). Shared workflow source is byte-for-byte unchanged. `app/pages.css` and `components/MarketingPage.tsx` SHA256 hashes are also unchanged.

Existing hero, four-event strip, Room 301 workflow, Beyond housekeeping cards, peach setup section, final CTA and their original copy remain. Setup section still directly precedes the final CTA, retaining its existing padding rule. At 1440px the hero font remains 58px and CTA top padding remains 72px, matching baseline. No scroll animation or step controls were introduced.

## Checks

- Fresh visual evaluation: PASS, first attempt.
- Final `npm run lint`: passed after fixing an unescaped JSX apostrophe in added content.
- Final `npm run typecheck` (`tsc --noEmit`): passed.
- Final `npm run build` (`next build`): passed after the correction.
- At 1440, 1280, 1024, 768, 390 and 360px: no horizontal overflow, one main H1, all three added sections present, four daily cards/four FAQs, three original workflow stages/four messages retained.
- FAQ Enter and Space open answers; Tab reaches the next question; visible focus outline verified. Expanded mobile answers do not cause horizontal overflow.
- Main-content WCAG A/AA scan: zero violations. Existing gradient hero produced a contrast incomplete check; existing token contrasts were previously manually confirmed at 5.09:1 or greater against both gradient endpoints. New sections use existing solid-surface styles.
- Browser runtime error log empty.

The original `Follow Room 301` anchor and demo/sales actions remain unchanged. No invented customer proof, statistics, policies or extra integration capabilities were added.

Screenshots in this directory show the new overview, daily story and questions on desktop/mobile. The existing dev server remains running at `http://localhost:3000/how-it-works`.
