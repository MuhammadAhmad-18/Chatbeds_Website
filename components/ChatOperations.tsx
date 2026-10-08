"use client";
import { useState } from "react";
import {
  ArrowRight,
  BrushCleaning,
  ClipboardList,
  Mic,
  Package,
  Users,
  Wrench,
} from "lucide-react";
import { SectionHeading } from "./SectionHeading";
import {
  WhatsAppComposer,
  WhatsAppDate,
  WhatsAppHeader,
  WhatsAppMessage,
} from "./WhatsAppUI";
const roles = [
  {
    title: "Housekeeping",
    Icon: BrushCleaning,
    description:
      "A clean room starts with a clear handoff. Get assignments, report progress and let supervisors know when it’s time to inspect.",
    command: "301 clean",
    reply: "Room 301 marked for inspection. Your supervisor has been notified.",
    note: "Room status, inspections and team alerts stay connected.",
  },
  {
    title: "Maintenance",
    Icon: Wrench,
    description:
      "Report an issue where you find it. Turn a room problem into an assigned ticket that the team can track through to completion.",
    command: "AC leaking in 305",
    reply:
      "Maintenance issue logged for Room 305. The maintenance team has been notified.",
    note: "Room-based tickets, priorities, assignments and completion alerts.",
  },
  {
    title: "Inventory",
    Icon: Package,
    description:
      "Keep supplies in step with the work. Check stock, record what’s used and manage restocking without leaving the conversation.",
    command: "restock 50 towels",
    reply:
      "50 towels added to the restock request. Inventory is up to date in ChatBeds.",
    note: "Stock levels, purchase orders and receiving in one place.",
  },
  {
    title: "Managers",
    Icon: Users,
    description:
      "Stay close to the operation, wherever your day takes you. Receive daily close summaries and keep the people on shift informed.",
    command: "Yesterday’s summary",
    reply:
      "Yesterday closed at 78% occupancy. Room revenue: $4,860. Your daily report is ready.",
    note: "Illustrative figures. Daily close, staff shifts and owner summaries.",
  },
];
export function ChatOperations() {
  const [active, setActive] = useState(0);
  const role = roles[active];
  function onKeyDown(e: React.KeyboardEvent<HTMLButtonElement>, index: number) {
    if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(e.key)) return;
    e.preventDefault();
    const next =
      e.key === "Home"
        ? 0
        : e.key === "End"
          ? roles.length - 1
          : (index + (e.key === "ArrowRight" ? 1 : -1) + roles.length) %
            roles.length;
    setActive(next);
    document.getElementById(`role-tab-${next}`)?.focus();
  }
  return (
    <section id="operations" className="section operations-section">
      <div className="container operations-layout">
        <div>
          <SectionHeading
            eyebrow="LESS APP SWITCHING. MORE WORK DONE."
            title={
              <>
                Your frontline team <br />
                does not need <br />
                <span className="text-green">another app.</span>
              </>
            }
          >
            Connect staff once, then let cleaners, maintenance teams, managers
            and operations staff receive alerts and update work directly from
            WhatsApp.
          </SectionHeading>
          <div className="operations-note">
            <Mic size={20} />
            <p>
              A quick message. A voice note. <br />
              <strong>A real update in your PMS.</strong>
            </p>
          </div>
        </div>
        <div className="operations-demo">
          <div
            className="role-tabs"
            role="tablist"
            aria-label="Staff conversation examples"
          >
            {roles.map(({ title, Icon }, index) => (
              <button
                key={title}
                id={`role-tab-${index}`}
                role="tab"
                aria-selected={active === index}
                aria-controls="role-panel"
                tabIndex={active === index ? 0 : -1}
                onClick={() => setActive(index)}
                onKeyDown={(e) => onKeyDown(e, index)}
              >
                <Icon size={16} />
                {title}
              </button>
            ))}
          </div>
          <div
            className="role-panel"
            role="tabpanel"
            id="role-panel"
            aria-labelledby={`role-tab-${active}`}
            tabIndex={0}
          >
            <div className="wa-chat wa-operations-chat">
              <WhatsAppHeader status={`${role.title} · Staff conversation`} />
              <div className="wa-wallpaper wa-operations-messages" key={active}>
                <WhatsAppDate />
                <WhatsAppMessage outgoing>{role.command}</WhatsAppMessage>
                <WhatsAppMessage label="ChatBeds">{role.reply}</WhatsAppMessage>
              </div>
              <WhatsAppComposer />
            </div>
            <div className="role-description">
              <ClipboardList size={18} />
              <span>{role.note}</span>
              <ArrowRight size={17} />
            </div>
          </div>
          <p className="operations-description">
            {role.description}
          </p>
        </div>
      </div>
    </section>
  );
}
