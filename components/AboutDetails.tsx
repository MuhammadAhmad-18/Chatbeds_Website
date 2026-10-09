import {
  CalendarDays,
  ClipboardCheck,
  UsersRound,
  SlidersHorizontal,
  Globe2,
  Gift,
  ChartNoAxesCombined,
} from "lucide-react";
import { SectionIntro } from "./MarketingPage";

const operationalRoles = [
  {
    icon: CalendarDays,
    title: "Front desk sees the whole stay",
    text: "Work from the calendar and reservation record to review arrivals, departures and room assignments. Cleaning and inspection updates show which rooms are ready, so front desk can plan the next arrival with the operational context in view.",
  },
  {
    icon: ClipboardCheck,
    title: "Operations knows the next step",
    text: "The relevant staff receive WhatsApp alerts about cleaning and room issues. A cleaner replies with 301 clean; a supervisor reviews the room before it becomes Ready. Maintenance tickets keep the issue, assignment and completion connected to the room.",
  },
  {
    icon: UsersRound,
    title: "Managers keep work visible",
    text: "Review staff and shifts alongside inventory, finance and night audit. Room status, open work and reports give managers a shared record to review, with responsibilities and handovers visible rather than scattered across separate status conversations.",
  },
] as const;

const revenueOpportunities = [
  {
    icon: SlidersHorizontal,
    title: "Set and review rates",
    text: "Use the rate grid, rate plans and seasonal rules to organize what you charge. Make bulk updates, review change history and undo rate changes when needed, keeping pricing decisions visible.",
  },
  {
    icon: Globe2,
    title: "Keep channels in view",
    text: "Review linked rooms, rate plans and availability across distribution channels. Calendar and availability synchronization connect where you sell with the rooms and reservations managed inside the PMS.",
  },
  {
    icon: Gift,
    title: "Offer useful extras",
    text: "Use guest journeys, upsells and add-ons to present relevant purchase opportunities around the stay. Keep guest communication and the guest portal connected to the wider experience your property provides.",
  },
  {
    icon: ChartNoAxesCombined,
    title: "See what needs attention",
    text: "Review occupancy, daily revenue, average daily rate (ADR) and revenue per available room (RevPAR). Outstanding balances and financial reports give the team more context for its next commercial decision.",
  },
] as const;

export function WhatChatBedsIs() {
  return (
    <section id="what-chatbeds-is" className="page-section page-peach">
      <div className="container page-editorial">
        <SectionIntro
          eyebrow="WHAT CHATBEDS IS"
          title="The operating platform behind your property."
        >
          ChatBeds is a complete property management system, or PMS. It brings
          the records and daily work of a hospitality business into one platform.
        </SectionIntro>
        <div className="page-prose">
          <p>
            Reservations identify who is staying, when they arrive and which room
            they use. Front desk manages the stay, while housekeeping and
            maintenance keep the room ready. Staff, inventory, finance and night
            audit support the work behind it.
          </p>
          <p>
            Rates, distribution, guest conversations and reports belong to that
            same operation. The Unified Inbox helps the team handle guest
            messages alongside the rest of the property, with the PMS as the
            shared record.
          </p>
          <p>
            Managers can work in the dashboard. Frontline teams receive relevant
            WhatsApp messages and report work from the conversation. Both ways
            of working connect to the same room, task and property information.
          </p>
        </div>
      </div>
    </section>
  );
}

export function StreamlinedOperations() {
  return (
    <section id="streamlined-operations" className="page-section">
      <div className="container">
        <SectionIntro
          eyebrow="CLEARER DAILY OPERATIONS"
          title="Give each team a clear next step."
        >
          Connect the update to the people responsible for it. Teams can see the
          state of the work and act on the next handover, with less need to chase
          status across the property.
        </SectionIntro>
        <div className="page-role-grid">
          {operationalRoles.map(({ icon: Icon, title, text }) => (
            <article key={title}>
              <Icon size={25} strokeWidth={1.5} aria-hidden="true" />
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function RevenueOpportunities() {
  return (
    <section id="revenue-opportunities" className="page-section page-peach">
      <div className="container">
        <SectionIntro
          eyebrow="YOUR COMMERCIAL TOOLS, TOGETHER"
          title="Make the most of every available room."
        >
          Manage rates, distribution and guest add-ons alongside daily operations.
          Review the records behind each stay to decide what to offer and where
          to focus attention. Use these tools to identify opportunities to grow
          room and add-on revenue, then review the results in your reports.
        </SectionIntro>
        <div className="page-pillar-grid">
          {revenueOpportunities.map(({ icon: Icon, title, text }) => (
            <article key={title}>
              <Icon size={25} strokeWidth={1.5} aria-hidden="true" />
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
