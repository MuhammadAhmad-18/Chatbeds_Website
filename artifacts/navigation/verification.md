# Navigation update verification

## Scope and files

- Created `lib/navigation.ts`: shared availability, destinations, group definitions and footer selections.
- Changed `components/Navbar.tsx`, `components/Footer.tsx`, `app/navbar.css` and `README.md`.
- No source files deleted, dependencies added or routes created for this task.
- Added this verification note, `implementation-notes.md` and four desktop/mobile screenshots in `artifacts/navigation/`.

## Final navigation

Logo links home. Center order: Integrations, How it works, Pricing, Company, Resources, Contact. Login and Book a Demo retain their existing destinations and behavior.

- Integrations keeps its existing WhatsApp operations, Guest communication, Distribution and View all integrations links.
- Company: About and Blog live; News and Careers hidden.
- Resources: Privacy Policy and Terms and Conditions live; Developer docs and Help Center hidden.
- Footer uses the same configuration. Product remains; Company contains About, Blog and Contact us. Resources is hidden while empty. Privacy and Terms remain under Legal. Existing brand, address, contact and action content is preserved.
- Existing `/privacy` and `/terms` drafts retain their pending legal review notices and noindex metadata. No legal text was added.

## Checks

- `npm run lint`: passed.
- `npm run typecheck` (`tsc --noEmit`): passed.
- `npm run build` (`next build`): passed.
- Fresh visual evaluation: PASS, first attempt.
- Tested 1440, 1280, 1024, 768, 390 and 360px: no horizontal overflow, closed or with each dropdown/accordion expanded; all panels remained within viewport bounds.
- Login, demo and hamburger targets are 44px tall. Header heights remain 81px desktop, 77px tablet and 73px phone, including the border; the desktop bar remains at its existing 1200px maximum width and positioning.
- Desktop Enter, Space, Arrow Up/Down (including wrap), Home, End, Tab and Escape passed. Escape returns focus to the trigger. Hover survives the panel gap, then closes after leaving; click after hover keeps the panel open. Outside clicking, including the blank header area, closes it. Opening another group leaves only that group open.
- Mobile body/HTML scroll lock and background inert state passed. Tab and Shift+Tab wrap within the header and open navigation. A single Escape closes the full navigation, restores hamburger focus and restores the previous scroll position/styles/inert state.
- Mobile link activation closes navigation and clears scroll lock/inert state. Clicking the home logo while already home returns to the top even with mobile navigation open. Resizing an open mobile menu to desktop cleans up the lock and menu state.
- About and Blog activate Company; Privacy activates Resources; `/integrations/whatsapp` activates Integrations and applies exact `aria-current="page"` only to its matching child, not the overview link. Newly opened routes have no open dropdowns.
- Browser accessibility scans: zero WCAG A/AA violations in desktop/mobile headers and footer. Header scans marked `aria-controls`/`aria-haspopup` checks incomplete; manually verified all seven controls IDs exist and their panels use plain link lists with the requested keyboard behavior. Footer scan had no incomplete checks.
- Browser runtime error log was empty.
- Destination checks for `/about`, `/blog`, `/privacy`, `/terms`, `/integrations`, `/how-it-works`, `/pricing` and `/contact` returned HTTP 200. Home `#home` and `#platform` targets exist. Unavailable items never render as links.
- Configuration checks confirmed zero-item groups disappear and one-item groups resolve to a normal link.

## Assumptions and remaining content

- No approved docs/help URLs or routes were found, so those items remain unavailable. News and Careers also remain unavailable until implemented.
- Retained the existing 1200px desktop breakpoint, as permitted by the request's larger-breakpoint exception, to avoid crowding the expanded navigation.
- The existing footer had no Solutions column following earlier requested link cleanup; none was added or removed here.
- The legal drafts predate this task and still need supplied legal text. The actual demo booking URL is still controlled by the existing configuration; this task does not invent one.
- Kept the current warm white/lavender/purple theme and existing SVG branding: Chat blue `#1800A2`, Beds orange `#D16046`.

## Screenshots

- `navbar-desktop-company.png`
- `navbar-desktop-resources.png`
- `navbar-mobile-company.png`
- `navbar-mobile-resources.png`

View locally at `http://localhost:3000/` with the existing dev server, or run `npm run dev` when no server is running.
