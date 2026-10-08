# Homepage verification

Verified on 7 October 2026 against the production build.

The current homepage uses the requested light orange, purple and white theme. The new supplied `chatbedsapp_logo.jpg` is used unmodified for the header/footer and app icon. Desktop/mobile screenshots have been refreshed for this theme. Automated WCAG A/AA scans of the homepage, selected commercial/staff tabs and demo dialog report zero violations; all six viewport widths retain their overflow and hero-spacing checks.

- ESLint: passed, zero warnings or errors.
- TypeScript: passed.
- Next.js production build: passed; homepage statically prerendered.
- Browser widths: 1440, 1280, 1024, 768, 390 and 360 pixels.
- All six widths: no document horizontal overflow, no broken section links, hero phone clears closing slogan, status caption clears dashboard.
- Real logo loads through `next/image`; footer logo lazy loads.
- Mobile navigation opens, closes with Escape, and returns keyboard focus.
- Staff tabs support arrow-key navigation and update the corresponding conversation.
- Commercial tabs support arrow-key navigation and reveal the distribution channels.
- Workflow: cleaner command updates the example to “To inspect”; full playback ends with “Ready” and front-desk availability.
- Reduced motion: replay immediately presents the completed state; individual steps remain selectable.
- Native demo dialog traps focus, closes with Escape, and restores focus to its trigger.
- Local demo request download verified by reading the saved text file and checking Chrome reports the download complete. Test data only; no external submission.
- Automated axe WCAG A/AA scan: zero violations. Gradient/background contrast checks still include manual-review items; this is not an accessibility certification.
- Browser runtime errors: none observed.
- Independent design evaluation: passed; mobile heading spacing, tab discoverability and dialog centering refinements applied.

Initial-build local production performance observation: LCP 316 ms and CLS 0. These are historical local browser observations, not a Lighthouse score or a claim about the updated theme's deployed performance.

Production dependency audit reports zero vulnerabilities. The unpatched development-only ESLint dependency advisory and contact configuration are documented in the root README.

Screenshots are in `artifacts/screenshots/` and `artifacts/screenshots/light-theme/`. `desktop-1440.png`, `mobile-390.png`, and both `*-full.png` files show the current light production build. Product interfaces are illustrations based on AGENTS.md; actual product screenshots were not available.
