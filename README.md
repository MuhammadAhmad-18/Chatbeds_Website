# ChatBeds marketing website

Next.js App Router, TypeScript, Tailwind CSS 4 and locally bundled Geist. Built around the root AGENTS.md specification, with a light, cozy brand theme as requested: warm white, lavender and peach surfaces, deep purple actions, orange accents and dark readable text.

## Run locally

```sh
npm install
npm run dev
```

Open http://localhost:3000.

### Keep the server running on Windows

`npm run dev` runs in the foreground and needs its terminal to stay open. To run in the background instead, stop the foreground server with Ctrl+C, then use:

```sh
npm run dev:bg
```

Wait for the ready message, then close the terminal or editor. Open http://localhost:3000 as usual. Running the command again will reuse the existing background server. Start it once each time you restart Windows; this does not install a service or change startup settings.

```sh
npm run dev:status
npm run dev:stop
```

Output and errors are saved in `.dev-server/output.log` and `.dev-server/error.log`. If the server exits by itself, inspect the error log. These background commands use Windows PowerShell and require no extra dependencies. The normal `npm run dev` command remains available on all platforms.

## Quality checks

```sh
npm run lint
npm run typecheck
npm run build
```

## Contact configuration

Copy `.env.example` to `.env.local` and add real values when available:

- `NEXT_PUBLIC_DEMO_URL`: public Google Calendar appointment booking URL. Every Book a Demo link opens this URL in a new tab when configured. Use the shareable appointment booking page, not a personal calendar or event-creation link.
- `NEXT_PUBLIC_CONTACT_EMAIL`: optional override for `contact@chatbeds.app`. Without a booking page, the request form prepares an email in the visitor’s email application. The visitor must send it.
- `NEXT_PUBLIC_SITE_URL`: public marketing URL for metadata and social image URLs. Defaults to `https://chatbeds.app`, based on the supplied contact domain; override it if the marketing site uses another domain.

The supplied ChatBeds contact email is the default for sales links and demo enquiries. The demo dialog prepares an email draft; it does not submit anything automatically. The footer includes the supplied company description, Bang Tech Inc. attribution, US address and clickable phone/email links. Shared public company details live in `lib/company.ts`.

Login links go directly to `https://app.chatbeds.app`, and `/login` redirects there too. The marketing website and app can be hosted by different providers; these links use the app's full HTTPS address. The shared destination is in `lib/site-links.ts`.

Set `NEXT_PUBLIC_DEMO_URL` in `.env.local` for local development and in the Google Cloud build environment for deployment. Restart local development after changing it. Next.js includes public variables in browser assets at build time, so rebuild and redeploy when the booking URL changes.

The compact header centers Integrations, How it works, Pricing, Company, Resources and Contact on desktop. About and Blog are grouped under Company; Privacy Policy and Terms and Conditions are grouped under Resources. The shared configuration in `lib/navigation.ts` controls destinations and availability for desktop navigation, mobile accordions and footer columns. News, Careers, Developer docs and Help Center remain hidden until their routes or approved external URLs are available. Existing Privacy and Terms pages are noindex drafts pending legal review. The three integration detail pages and three practical Blog guides remain available.

## Assets and content

`components/Logo.tsx` renders the ChatBeds mark and wordmark entirely as inline SVG, based on the supplied bitmap artwork. It supports full/icon variants, explicit height/aspect ratio, default/light/mono tones and accessible or decorative rendering. The navbar and footer use it through the home-link wrapper `BrandLogo`; WhatsApp contact avatars use its icon variant. No logo bitmap or font request is needed. The original bubble, dots, pillows and bed silhouette are retained; raster shadows were simplified into crisp vector highlights. The horizontal wordmark uses outlined existing Geist at weight 750 rather than the unidentified original font, and follows the requested text color instead of the bitmap's purple/orange lettering.

Shared artwork and literal social colors are in `lib/logo-artwork.ts`. `app/icon.svg` duplicates the same icon geometry for the favicon. `app/apple-icon.tsx` and `app/opengraph-image.tsx` reuse the vector renderer with Next.js `ImageResponse` on the original navy background. If editing the icon paths, update the favicon to match. The obsolete standalone PNG/JPEG logos and JPEG favicon have been removed. The supplied composite banner remains in `public/brand/` as a source asset, unused by the homepage. Product UIs are code-native illustrations of the capabilities in AGENTS.md, not actual product screenshots. Sample hotel activity and financial figures are labeled illustrative. No customer or performance claims are used.

Most sections render on the server. Client components provide the accessible navigation, native modal, role examples and commercial tabs. Motion respects reduced-motion preferences. Tailwind utilities and the custom design system in `app/globals.css` can be reused on future pages.

Messaging illustrations share the light WhatsApp-style header, wallpaper, bubbles and composer in `components/WhatsAppUI.tsx` and the scoped `app/whatsapp.css` stylesheet. They are visual examples, not live messaging controls. The guest inbox keeps the ChatBeds AI reply clearly marked as an unsent draft outside the conversation.

The housekeeping workflow on the homepage and How it works page is a static, server-rendered story. Three stages explain checkout and the cleaning alert, the cleaner's WhatsApp reply and supervisor inspection, and a Ready room visible to front desk. The complete conversation and final PMS state are shown together without step controls, replay, scroll pinning or extra scroll travel. `components/WhatsAppWorkflow.tsx` contains the presentation and `app/workflow.css` supplies responsive styles. The generic ScrollReveal observer excludes this section, so its content remains visible without scroll-triggered animation.

## Dependency audit

`npm audit --omit=dev` reports no production dependency vulnerabilities. The full audit currently reports a development-only advisory in the ESLint dependency chain (`braces` via `fast-glob` / `micromatch`). The registry does not yet provide a patched compatible version; forcing the suggested downgrade would move the Next.js lint configuration to an incompatible major. Recheck this advisory when updating the tooling.
