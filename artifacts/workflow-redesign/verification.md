# Static workflow verification

Verified the homepage redesign and the shared How it works workflow on 2026-10-08.

- `npm run lint`: passed.
- `npm run typecheck` (`tsc --noEmit`): passed.
- `npm run build`: passed; homepage and How it works prerender successfully.
- Homepage checked at 1440, 1280, 1024, 768, 390 and 360px: document width equals viewport width, no overflowing workflow descendants, three stages and four messages at every size.
- Computed styles at all six widths: zero running animations, sticky/fixed elements, workflow buttons or scroll-reveal classes in this section.
- Scrolling above, through and below the section leaves its content and height unchanged.
- Server HTML contains all stages and messages, including the cleaner reply and supervisor approval; JavaScript is not required for the story.
- How it works checked at 768px: same three stages and four messages, no horizontal overflow or section animation.
- axe WCAG 2 A/AA scan scoped to the section at 360px: zero violations, zero incomplete results.
- Browser error log: empty.
- Removed scroll hook has no remaining references. No dependencies or fonts added.

Desktop and mobile screenshots: `workflow-desktop.png` and `workflow-mobile.png`.
Implementation/file notes: `implementation-notes.md`.
