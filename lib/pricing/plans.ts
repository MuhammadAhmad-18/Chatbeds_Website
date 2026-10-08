import type { PlanId } from "./types";
export const plans: readonly {
  id: PlanId;
  name: string;
  audience: string;
  bullets: readonly string[];
  cta: string;
}[] = [
  {
    id: "free",
    name: "Free",
    audience: "Up to 3 rooms",
    bullets: [
      "Front desk, calendar, booking page",
      "1 channel calendar",
      "Owner on WhatsApp",
      'Booking page shows "Powered by ChatBeds"',
    ],
    cta: "Book a Demo",
  },
  {
    id: "essentials",
    name: "Essentials",
    audience: "Run the whole hotel from WhatsApp.",
    bullets: [
      "Everything in Free, any size",
      "Unlimited channel calendars",
      "Housekeeping, maintenance, stock",
      "Up to 10 staff on WhatsApp",
      "Briefings, reports, night audit",
    ],
    cta: "Book a Demo",
  },
  {
    id: "pro",
    name: "Pro",
    audience: "Guest messaging, payments and RevBot.",
    bullets: [
      "Everything in Essentials",
      "WhatsApp messages to guests",
      "Card payments and extras",
      "RevBot pricing, partner API",
      "Unlimited staff and logins",
    ],
    cta: "Book a Demo",
  },
  {
    id: "group",
    name: "Group",
    audience: "2+ properties",
    bullets: [
      "Pro for every property",
      "Owner Portal included",
      "Logins limited per hotel",
      "Named account manager",
    ],
    cta: "Talk to us",
  },
];
type FeatureRow = { label: string; values: Record<PlanId, string | boolean> };
const row = (
  label: string,
  free: string | boolean,
  essentials: string | boolean,
  pro: string | boolean,
  group: string | boolean,
): FeatureRow => ({ label, values: { free, essentials, pro, group } });
// TODO: Confirm plan assignment for Unified Inbox and AI-assisted reply drafting.
export const featureGroups: readonly {
  title: string;
  rows: readonly FeatureRow[];
}[] = [
  {
    title: "Basics",
    rows: [
      row("Rooms or units", "Up to 3", "Any", "Any", "2+ properties"),
      row("Front desk, calendar, reservations, guests", true, true, true, true),
      row(
        "Booking page, 0% commission",
        'Yes ("Powered by ChatBeds" shown)',
        true,
        true,
        true,
      ),
      row(
        "Channel calendars (Airbnb, Booking.com, Vrbo)",
        "1 channel",
        "Unlimited",
        "Unlimited",
        "Unlimited",
      ),
    ],
  },
  {
    title: "WhatsApp operations",
    rows: [
      row(
        "Run the hotel from WhatsApp (staff linked)",
        "Owner only",
        "Up to 10 staff",
        "Unlimited",
        "Unlimited",
      ),
      row("Housekeeping, maintenance, inventory", false, true, true, true),
      row("Morning, evening and operations briefings", false, true, true, true),
    ],
  },
  {
    title: "Guests and payments",
    rows: [
      row(
        "WhatsApp messages to guests (confirmation, reminders, extras)",
        false,
        false,
        "Yes, with credit",
        "Yes, with credit",
      ),
      row(
        "Card payments, payment links, extras on the guest page",
        false,
        "Payment links",
        true,
        true,
      ),
    ],
  },
  {
    title: "Revenue and finance",
    rows: [
      row("RevBot rate suggestions and autopilot", false, false, true, true),
      row("Finance, P&L, night audit, reports", "Basic", true, true, true),
    ],
  },
  {
    title: "Team and tools",
    rows: [
      row(
        "Team logins with roles",
        "1",
        "5",
        "Unlimited",
        "Unlimited, per-hotel access",
      ),
      row("Partner API, reviews replies, AI tools", false, false, true, true),
      row("Owner Portal", false, false, "Add-on", true),
    ],
  },
  {
    title: "Support",
    rows: [
      row(
        "Support",
        "Help centre",
        "WhatsApp, business hours",
        "WhatsApp, 7 days",
        "Named manager, onboarding call",
      ),
    ],
  },
];
