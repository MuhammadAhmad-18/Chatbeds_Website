import {
  CalendarDays,
  ClipboardCheck,
  MessagesSquare,
  ReceiptText,
} from "lucide-react";
import { FAQ, SectionIntro } from "./MarketingPage";

const dailyStages = [
  {
    icon: CalendarDays,
    title: "Book and assign",
    text: "Create a reservation, assign a room and see the stay on the calendar. Front desk works from the same booking record to manage arrivals, departures and in-house guests, with room availability in view.",
  },
  {
    icon: MessagesSquare,
    title: "Support the stay",
    text: "Keep guest conversations in the Unified Inbox and organize messages around the guest journey. A room issue can become a maintenance ticket, so the operational work stays connected to the guest's stay and the room.",
  },
  {
    icon: ClipboardCheck,
    title: "Check out and hand over",
    text: "Complete checkout and move the room into housekeeping. The cleaner reports completion, the supervisor inspects it and front desk sees readiness. Reservations and room status remain part of the same property picture.",
  },
  {
    icon: ReceiptText,
    title: "Review and close",
    text: "Review payments, expenses and outstanding balances in finance. Night audit brings the daily close into the same platform, while daily revenue and financial reports help managers understand the activity behind the day's results.",
  },
] as const;

const practicalQuestions = [
  {
    question: "Can staff still use the ChatBeds dashboard?",
    answer:
      "Yes. Management and front desk can use the dashboard, calendar and other PMS modules. Housekeeping can report through the dashboard or WhatsApp. The team works with the same property records, so a frontline reply stays connected to what management sees.",
  },
  {
    question: "Does a cleaner's reply make the room Ready immediately?",
    answer:
      "No. The cleaner reports that cleaning is complete, which moves the work to inspection. The supervisor reviews the room and approves readiness before its status becomes Ready. Front desk then sees the updated availability in ChatBeds.",
  },
  {
    question: "How are guest messages different from staff operations?",
    answer:
      "Guest messages are conversations about the stay, handled in the Unified Inbox and guest messaging flows. Staff operations are alerts and work updates, such as reporting a room issue or completing cleaning. Both are connected to the complete PMS, with different purposes.",
  },
  {
    question: "Is ChatBeds only for hotels?",
    answer:
      "ChatBeds also supports guest houses, serviced apartments, vacation rentals and multi-property groups. The core idea stays the same: keep reservations, rooms and property operations together, while frontline teams receive relevant work and report updates through WhatsApp.",
  },
] as const;

export function CompletePMSExplanation() {
  return (
    <section id="complete-pms-explanation" className="page-section">
      <div className="container page-editorial">
        <SectionIntro
          eyebrow="THE PLATFORM BEHIND THE CONVERSATION"
          title="A complete PMS. One connected property."
        >
          PMS means property management system. It keeps bookings, rooms, people
          and the business side of your property in one place.
        </SectionIntro>
        <div className="page-prose">
          <p>
            A reservation identifies the guest, their dates and their room.
            Front desk uses that record for arrivals and checkout. Housekeeping
            and maintenance work with the room&apos;s status, so the next team can see
            what needs attention before another stay begins.
          </p>
          <p>
            Management and front desk can work in the dashboard. Frontline staff
            receive relevant WhatsApp alerts and reply from the conversation.
            Those replies update the same PMS record, keeping the property view
            connected to the work happening on the floor.
          </p>
          <p>
            Reservations, rooms, staff, inventory, finance, rates, distribution
            and reports are all part of ChatBeds. Guest communication is another
            part of that complete operation, alongside the tools used behind the
            scenes.
          </p>
        </div>
      </div>
    </section>
  );
}

export function ReservationToDailyClose() {
  return (
    <section id="reservation-to-close" className="page-section page-lavender">
      <div className="container">
        <SectionIntro
          eyebrow="THROUGH THE PROPERTY DAY"
          title="From reservation to daily close."
        >
          Each team handles a different part of the stay. ChatBeds keeps those
          handovers connected to the same reservations, rooms and business records.
        </SectionIntro>
        <div className="page-pillar-grid">
          {dailyStages.map(({ icon: Icon, title, text }) => (
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

export function HowItWorksQuestions() {
  return (
    <section id="how-it-works-questions" className="page-section">
      <div className="container page-editorial">
        <SectionIntro
          eyebrow="PRACTICAL QUESTIONS"
          title="How the dashboard and conversations work together."
        >
          A few details about where teams work and how updates move through the
          property.
        </SectionIntro>
        <FAQ items={practicalQuestions} />
      </div>
    </section>
  );
}
