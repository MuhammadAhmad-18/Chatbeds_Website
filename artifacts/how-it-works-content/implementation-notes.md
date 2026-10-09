# How it works content implementation

Created: components/HowItWorksDetails.tsx
Changed: app/(marketing)/how-it-works/page.tsx
Deleted: none

Added three server-rendered sections only:
- Complete PMS explanation between the existing event strip and static workflow.
- Four data-driven reservation-to-daily-close stages after the existing Beyond housekeeping section.
- Four native FAQ items before the existing setup section.

Reused SectionIntro, FAQ and existing editorial, prose and pillar-grid styles. No stylesheet, animation, dependency, existing content, shared workflow or metadata changes. Setup remains immediately followed by PageCTA. Original route changed only by import and three component insertions.

Content uses approved capabilities: PMS meaning, relationships between reservation and room status, dashboard and frontline WhatsApp roles, Unified Inbox, maintenance, finance and night audit. Supervisor approval before Ready is explicitly explained. No new technical, hiring, customer, timing, security or partnership claims.

Scoped ESLint passed (exit0) after escaping one JSX apostrophe. Root handles full lint/type/build, preservation comparison and responsive QA/evaluation.

Six corrected viewport screenshots saved:
- overview-desktop.png / overview-mobile.png
- daily-story-desktop.png / daily-story-mobile.png
- questions-desktop.png / questions-mobile.png

Desktop capture width1440, mobile width390 with tall1800 viewport to show full added sections. Explicit instant positioning avoids smooth-scroll/cropping artifacts. Desktop overview/daily-story and mobile overview/daily-story screenshots inspected. All screenshot captures completed; own how-content-design browser closed. User dev server untouched.
