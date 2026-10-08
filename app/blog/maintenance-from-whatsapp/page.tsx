import { BlogGuide } from "@/components/BlogGuide";
import { pageMetadata } from "@/lib/page-metadata";

export const metadata = pageMetadata(
  "Room maintenance from WhatsApp",
  "A practical guide to reporting room issues through WhatsApp and keeping maintenance tickets, assignments and completion visible in the ChatBeds PMS.",
  "/blog/maintenance-from-whatsapp",
);
export default function MaintenanceGuide() {
  return (
    <BlogGuide
      title="A room issue. A clear ticket. A connected team."
      intro="Maintenance starts with someone noticing something. Here is how a simple WhatsApp report can become work the property team can track."
      lead="An air conditioner leaking in Room 305 affects more than a maintenance list. It can influence room readiness and the next guest’s stay. The useful handover identifies the room, describes the issue and keeps responsibility visible."
      sections={[
        {
          title: "Report the room and the problem together.",
          text: "Staff can report maintenance through WhatsApp. A short, specific message gives the team a useful starting point: which room is affected and what needs attention. Keep the report factual, and add context through the operational conversation when needed.",
          command: "AC leaking in 305",
        },
        {
          title: "Keep the issue in a maintenance record.",
          text: "ChatBeds supports room-based maintenance tickets with a priority and an open, fixed or cancelled status. The ticket gives the team a shared record of the issue, rather than leaving the report only in a conversation.",
        },
        {
          title: "Make responsibility clear.",
          text: "Staff assignment and ticket taking help the maintenance team coordinate the work. Review who is responsible for an issue, how priority should be set and who needs to be informed before the work starts.",
        },
        {
          title: "Report completion and review the room.",
          text: "Completion alerts bring the update back to the relevant people. A fixed maintenance ticket and a guest-ready room are related but distinct: your team should still review any cleaning, inspection or room-status work needed after a repair.",
        },
        {
          title: "Keep front desk in the same property picture.",
          text: "Maintenance sits alongside rooms, housekeeping and reservations in the complete PMS. When an issue affects use of the room, the team can review room status and take it out of service where necessary, while keeping the operational context visible.",
        },
      ]}
      takeaway="Decide the handover before the next issue."
      takeawayText="Agree who reports the issue, who takes the ticket, how priority is reviewed and who receives the completion update. A connected system works best when the team knows what each stage means."
      relatedHref="/integrations/whatsapp"
      relatedTitle="Explore WhatsApp operations"
    />
  );
}
