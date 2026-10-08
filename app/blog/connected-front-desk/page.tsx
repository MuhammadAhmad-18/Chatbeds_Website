import { BlogGuide } from "@/components/BlogGuide";
import { pageMetadata } from "@/lib/page-metadata";

export const metadata = pageMetadata(
  "A connected front desk",
  "Explore arrivals, departures, reservations, room readiness and guest conversations as one connected front desk operation in ChatBeds.",
  "/blog/connected-front-desk",
);
export default function FrontDeskGuide() {
  return (
    <BlogGuide
      title="Your front desk needs the whole room story."
      intro="A reservation tells you who is arriving. Room readiness tells you whether the property is ready to welcome them. The front desk needs both."
      lead="Front desk work brings together bookings, guest details, arrivals, departures and the condition of each room. ChatBeds puts those records in one PMS, with WhatsApp operations connecting the frontline teams behind them."
      sections={[
        {
          title: "Begin with arrivals, departures and in-house guests.",
          text: "The front desk view brings the day’s arrivals, departures and in-house guests together. Guest and room search help staff find the relevant record, while reservations keep upcoming, in-house, past and cancelled bookings in view.",
        },
        {
          title: "Use the calendar to understand the room timeline.",
          text: "The tape chart shows room-by-room availability and booking timelines, with booked, in-house and checked-out states. Room assignment and 7, 14 or 30 day views help the team look beyond a single arrival.",
        },
        {
          title: "Distinguish an empty room from a Ready room.",
          text: "Checkout is the start of a room turnaround. Housekeeping moves through To clean, Being cleaned, To inspect and Ready. A cleaner’s update and a supervisor’s approval keep the room status connected to the PMS, so front desk can see when the room is ready.",
        },
        {
          title: "Keep guest conversations connected to the stay.",
          text: "Hotel WhatsApp messages belong in the Unified Inbox. AI-assisted reply drafts, automated messaging flows and the guest portal support the communication around a stay, while the team reviews what should be sent.",
        },
        {
          title: "Review the handovers, not just the screens.",
          text: "The important questions are practical: who updates checkout, who cleans, who inspects and who sees readiness? ChatBeds combines the management view of a complete PMS with WhatsApp updates from the people doing the work.",
        },
      ]}
      takeaway="A shared room status is a better handover."
      takeawayText="Reservations, housekeeping, maintenance and guest communication all contribute to the front desk picture. Review them together when you explore a new PMS."
      relatedHref="/blog/housekeeping-from-whatsapp"
      relatedTitle="Follow checkout through housekeeping"
    />
  );
}
