# Navigation implementation

## Files
Created `lib/navigation.ts`. Changed `components/Navbar.tsx`, `components/Footer.tsx`, `app/navbar.css`. No files deleted and no dependencies added. No pages created: existing Privacy and Terms draft/noindex pages retained.

## Navigation
Header center: Integrations, How it works, Pricing, Company, Resources, Contact. Login and Book a Demo retain their existing action components and destinations. Integrations retains its original three items, descriptions, icons and View all integrations link.

Company live: About and Blog. News and Careers are explicitly unavailable and hidden. Resources live: Privacy Policy and Terms and Conditions. Developer docs and Help Center are explicitly unavailable and hidden because no pages or real URLs exist.

Footer reads the same source: Product unchanged; Company includes About, Blog and Contact; Resources is hidden while docs/help are unavailable; Legal retains Privacy and Terms. Company contacts, Bang Tech Inc., optional real social configuration and actions preserved. No Solutions column existed, so none was added or removed.

## Behaviour
One controlled menu identifier covers all desktop dropdowns and mobile accordions. Desktop supports hover with 150ms delayed close and pointer bridge, click, native Enter/Space, Arrow Up/Down, Home/End, normal Tab flow, outside click and Escape/focus return. Panel alignment clamps to the viewport. Current links use exact pathname aria-current; a group trigger stays section-active for descendant routes.

Mobile uses the existing 1200px breakpoint to preserve readable desktop text and prevent crowding at 1024px. Login and Book a Demo remain visible in the header. An open menu locks body/document scroll, preserves styles and scroll position, restores original inert flags, prevents background focus, traps Tab inside the header/menu, and closes in one Escape with focus returned to the hamburger. Link activation, route remount, desktop resize and outside click close menus. Route/link navigation skips old scroll restoration so the existing home/current-page top-navigation fix continues to work.

## Visual consistency
Header width 1200px and navbar heights 80px desktop/76px tablet/72px mobile retained. Existing Geist typography and theme tokens retained. Logo blue #1800A2 and orange #D16046 unchanged. New menu surfaces and shadows use existing --surface, --surface-soft, --border, --text, --muted, --purple-dark and --shadow-float tokens. Reduced motion disables chevron transitions.

## Screenshots
- navbar-desktop-company.png — 1440px, Company open
- navbar-desktop-resources.png — 1440px, Resources open
- navbar-mobile-company.png — 390px, Company open
- navbar-mobile-resources.png — 390px, Resources open

Initial TypeScript and scoped ESLint passed. Mobile header axe audit reported zero violations; aria-controls/haspopup checks need manual review because the plain list panels intentionally do not implement role=menu. IDs and controls exist. Full technical QA/build is performed by the orchestrator.
