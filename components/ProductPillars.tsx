import {
  BedDouble,
  BriefcaseBusiness,
  CalendarDays,
  Check,
  ClipboardList,
  DoorOpen,
  LayoutDashboard,
  MessageSquare,
  Wallet,
  Wrench,
} from "lucide-react";
import { SectionHeading } from "./SectionHeading";
const pillars = [
  {
    id: "01",
    title: "A confident front desk.",
    category: "FRONT OFFICE",
    text: "Know who’s arriving, what’s available and where every reservation stands.",
    Icon: BedDouble,
    features: [
      "Dashboard & live overview",
      "Calendar & tape chart",
      "Front desk & reservations",
      "Rooms & multi-property management",
    ],
    type: "calendar",
  },
  {
    id: "02",
    title: "Operations, connected.",
    category: "PROPERTY OPERATIONS",
    text: "Keep every room, task and shift moving with one shared view of the work.",
    Icon: Wrench,
    features: [
      "Housekeeping & inspections",
      "Maintenance & staff shifts",
      "Stock & purchase orders",
      "Night audit & daily close",
    ],
    type: "tasks",
  },
  {
    id: "03",
    title: "Room to grow revenue.",
    category: "COMMERCIAL",
    text: "Bring pricing, channels and group business together, with control over every change.",
    Icon: BriefcaseBusiness,
    features: [
      "Rates, plans & seasonal rules",
      "Revenue tools & RevBot",
      "Channel distribution & calendar sync",
      "Group blocks & master folios",
    ],
    type: "revenue",
  },
  {
    id: "04",
    title: "Every detail accounted for.",
    category: "GUEST & FINANCE",
    text: "Connect the guest journey to payments, reporting and a clear view for owners.",
    Icon: Wallet,
    features: [
      "Unified inbox & guest journeys",
      "Upsells, add-ons & guest portal",
      "Payments, expenses & balances",
      "Reports, analytics & owner visibility",
    ],
    type: "finance",
  },
];
function PillarVisual({ type }: { type: string }) {
  if (type === "calendar")
    return (
      <div className="pillar-visual mini-calendar">
        <div>
          <CalendarDays size={14} />
          <strong>Room calendar</strong>
          <span>Week view</span>
        </div>
        <div className="mini-calendar-grid">
          <span>ROOM</span>
          {["MON", "TUE", "WED", "THU"].map((day) => (
            <span key={day}>{day}</span>
          ))}
          {["301", "302", "303"].map((room, i) => (
            <div className="calendar-demo-row" key={room}>
              <span>{room}</span>
              <span className={`calendar-booking booking-${i}`}>
                {["In house", "Reservation", "Available"][i]}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  if (type === "tasks")
    return (
      <div className="pillar-visual mini-tasks">
        <div>
          <ClipboardList size={14} />
          <strong>Today’s operations</strong>
          <span className="live-dot" />
        </div>
        {[
          ["301", "Inspection complete", "Ready"],
          ["305", "AC maintenance", "Assigned"],
          ["308", "Housekeeping", "Cleaning"],
        ].map(([room, label, status]) => (
          <div className="mini-task" key={room}>
            <span className="mini-room">{room}</span>
            <span>{label}</span>
            <small className={status === "Ready" ? "green" : ""}>
              {status}
            </small>
          </div>
        ))}
      </div>
    );
  if (type === "revenue")
    return (
      <div className="pillar-visual mini-revenue">
        <div>
          <BriefcaseBusiness size={14} />
          <strong>Rates & availability</strong>
          <span>In sync</span>
        </div>
        <div className="rate-mini-grid">
          {["Standard", "Deluxe", "Suite"].map((room, i) => (
            <div key={room}>
              <span>{room}</span>
              <strong>{["$120", "$165", "$240"][i]}</strong>
              <small>Flexible rate</small>
            </div>
          ))}
        </div>
        <p>
          <Check size={12} />
          Your rates. Your rules. Your control.
        </p>
      </div>
    );
  return (
    <div className="pillar-visual mini-finance">
      <div>
        <Wallet size={14} />
        <strong>Financial overview</strong>
        <span>Daily view</span>
      </div>
      <div className="mini-finance-row">
        <span>
          Payments<small>Tracked together</small>
        </span>
        <span className="finance-line">
          <i />
          <i />
          <i />
          <i />
          <i />
          <i />
        </span>
        <Check size={16} className="green" />
      </div>
      <div className="mini-finance-row">
        <span>
          Guest balances<small>Clear and visible</small>
        </span>
        <span className="status">Up to date</span>
      </div>
    </div>
  );
}
export function ProductPillars() {
  return (
    <section id="platform" className="section platform-section">
      <div className="container">
        <div className="platform-heading">
          <SectionHeading
            eyebrow="A COMPLETE PROPERTY MANAGEMENT SYSTEM"
            title={
              <>
                Everything you expect from a modern PMS. <br />
                <span className="text-muted-light">
                  Built into one platform.
                </span>
              </>
            }
          >
            From the first reservation to the daily close, ChatBeds is the
            system behind your entire property.
          </SectionHeading>
        </div>
        <div className="pillar-grid">
          {pillars.map(
            ({ id, title, category, text, Icon, features, type }) => (
              <article
                id={`platform-${type}`}
                className={`pillar pillar-${type}`}
                key={id}
              >
                <div className="pillar-top">
                  <span className="pillar-icon">
                    <Icon size={22} strokeWidth={1.6} />
                  </span>
                  <span>
                    {id} / {category}
                  </span>
                </div>
                <h3>{title}</h3>
                <p>{text}</p>
                <PillarVisual type={type} />
                <ul>
                  {features.map((feature) => (
                    <li key={feature}>
                      <Check size={14} />
                      {feature}
                    </li>
                  ))}
                </ul>
              </article>
            ),
          )}
        </div>
        <div className="platform-footnote">
          <LayoutDashboard size={17} />
          <span>
            One PMS for management. One familiar conversation for your team.
          </span>
          <DoorOpen size={17} />
          <MessageSquare size={17} />
        </div>
      </div>
    </section>
  );
}
