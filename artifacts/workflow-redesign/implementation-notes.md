# Static workflow redesign

- Rebuilt `components/WhatsAppWorkflow.tsx` as a server component. All seven operational actions remain, grouped into three readable stages: checkout and cleaner alert; cleaner reply and supervisor inspection; Ready status and front desk availability.
- The full four-message WhatsApp exchange and the final green PMS room result are always present. No replay control, selectable steps, scroll prompt, hidden messages, state, timers, scroll listeners, pinning or forced scroll distance remain.
- Replaced `app/workflow.css` with scoped static presentation. The section retains the site's pale lavender background, white panel, plum text, Geist typography, purple accents and green success state. Shared WhatsApp UI and current blue/orange SVG logo are reused.
- Deleted the unreferenced `components/useScrollWorkflow.ts` hook. `components/ScrollReveal.tsx` excludes the workflow subtree. Scoped animation/transition overrides ensure the section also stays still if shared styles gain motion later.
- Desktop uses an editorial split: concise numbered stages beside the full connected conversation. At widths below 900px the stages and conversation stack. Body/message text remains 14px or larger on mobile. All content renders in the server HTML and stays readable without JavaScript.
- The same component continues to serve both the homepage and `/how-it-works`; the `#workflow` anchor remains.

## Visual checks

Inspected 1440px desktop and 390px mobile captures. At 360px, the document width is 360px with no overflowing workflow descendants, and all three stages/four messages remain present. Root agent owns the full six-width check, accessibility audit, lint, TypeScript and production build.

- `artifacts/workflow-redesign/workflow-desktop.png`: complete section at 1440px.
- `artifacts/workflow-redesign/workflow-mobile.png`: complete section at 390px.

No dependencies, generated images or fonts added. Existing uncommitted logo/theme changes were preserved. No unresolved implementation issues.
