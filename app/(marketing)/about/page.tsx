import Link from "next/link";
import {
  ArrowUpRight,
  CalendarDays,
  ClipboardCheck,
  Layers3,
  MessagesSquare,
} from "lucide-react";
import {
  PageHero,
  PageActions,
  PageCTA,
  PropertyConnectionVisual,
  SectionIntro,
} from "@/components/MarketingPage";
import { company } from "@/lib/company";
import { pageMetadata } from "@/lib/page-metadata";
import {
  WhatChatBedsIs,
  StreamlinedOperations,
  RevenueOpportunities,
} from "@/components/AboutDetails";

export const metadata = pageMetadata(
  "About us",
  "A complete property management system with WhatsApp as the frontline operating interface. Learn the idea behind ChatBeds, a product of Bang Tech Inc.",
  "/about",
);
const pillars = [
  {
    icon: CalendarDays,
    title: "Front office",
    text: "Reservations, calendar, arrivals and departures. Keep rooms, guests and availability connected.",
  },
  {
    icon: ClipboardCheck,
    title: "Property operations",
    text: "Housekeeping, maintenance, staff, inventory and night audit. Give every handover a clear next step.",
  },
  {
    icon: Layers3,
    title: "Commercial control",
    text: "Rates, revenue, distribution and group bookings. Manage the commercial side alongside the property.",
  },
  {
    icon: MessagesSquare,
    title: "Guests and finance",
    text: "Unified Inbox, guest journeys, finance and reports. Keep the guest relationship and business picture in view.",
  },
];
export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="ABOUT CHATBEDS"
        title="Built around the property."
        accent="And the people running it."
        visual={<PropertyConnectionVisual />}
      >
        <p>
          A hotel is a shared operation. Your PMS should connect the work, while
          letting each person get things done in the way that suits their role.
        </p>
        <PageActions secondary="See how it works" href="/how-it-works" />
      </PageHero>
      <WhatChatBedsIs />
      <section className="page-section">
        <div className="container page-editorial">
          <SectionIntro
            eyebrow="WHY CHATBEDS EXISTS"
            title="Great hospitality depends on what happens between teams."
          />
          <div className="page-prose">
            <p>
              A checkout changes a room’s status. A cleaner needs an assignment.
              A supervisor needs to inspect it. Front desk needs to know when it
              is ready. Each moment belongs to the same property operation.
            </p>
            <p>
              ChatBeds brings those moments into one complete PMS. Management
              gets a clear view of the property. Frontline teams receive the
              right message and report work through WhatsApp, with updates
              connected to the PMS.
            </p>
            <p className="page-prose-emphasis">
              Your property runs in ChatBeds.
              <br />
              Your team runs it from WhatsApp.
            </p>
          </div>
        </div>
      </section>
      <section className="page-section page-lavender">
        <div className="container">
          <SectionIntro
            eyebrow="COMPLETE PMS. CONVERSATIONAL OPERATIONS."
            title="The depth your property needs. The access your team needs."
          >
            WhatsApp is a frontline interface to the platform. Reservations,
            rooms, finance and the rest of your operation stay together.
          </SectionIntro>
          <div className="page-pillar-grid">
            {pillars.map(({ icon: Icon, title, text }) => (
              <article key={title}>
                <Icon size={25} strokeWidth={1.5} aria-hidden="true" />
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <StreamlinedOperations />
      <RevenueOpportunities />
      <section className="page-section">
        <div className="container page-editorial">
          <SectionIntro
            eyebrow="FOR MODERN HOSPITALITY"
            title="One idea. Many kinds of property."
          />
          <div className="page-prose">
            <p>
              Independent hotels, guest houses, serviced apartments, vacation
              rentals and multi-property groups all coordinate people, rooms and
              guest expectations. ChatBeds brings that work into a connected
              platform.
            </p>
            <div className="page-company-note">
              <span>A proud product of</span>
              <a
                href={company.parentUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                {company.parentName}
                <ArrowUpRight size={18} aria-hidden="true" />
              </a>
              <p>
                For product enquiries or a conversation about your property, get
                in touch with the ChatBeds team.
              </p>
              <Link href="/contact" className="page-text-link">
                Contact us
                <ArrowUpRight size={16} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </section>
      <PageCTA />
    </>
  );
}
