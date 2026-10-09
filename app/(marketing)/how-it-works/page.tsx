import { ClipboardCheck, Boxes, UsersRound } from "lucide-react";
import {
  PageHero,
  PageActions,
  PageCTA,
  SectionIntro,
} from "@/components/MarketingPage";
import { WhatsAppWorkflow } from "@/components/WhatsAppWorkflow";
import {
  CompletePMSExplanation,
  ReservationToDailyClose,
  HowItWorksQuestions,
} from "@/components/HowItWorksDetails";
import { pageMetadata } from "@/lib/page-metadata";

export const metadata = pageMetadata(
  "How it works",
  "Follow a checkout through cleaning, inspection and room readiness. See how staff WhatsApp replies update the complete ChatBeds PMS.",
  "/how-it-works",
);
export default function HowItWorksPage() {
  return (
    <>
      <PageHero
        eyebrow="HOW CHATBEDS WORKS"
        title="Something happens in your hotel."
        accent="The right person knows what to do."
        compact
      >
        <p>
          ChatBeds connects an event in the PMS to a conversation with your
          team. Staff respond from WhatsApp. The property record stays in sync.
        </p>
        <PageActions secondary="Follow Room 301" href="#workflow" />
      </PageHero>
      <section
        className="page-event-strip"
        aria-label="The ChatBeds operating model"
      >
        <div className="container">
          {[
            "An event in the PMS",
            "A message to the right person",
            "A reply from WhatsApp",
            "An updated property record",
          ].map((item, i) => (
            <div key={item}>
              <span>0{i + 1}</span>
              <strong>{item}</strong>
            </div>
          ))}
        </div>
      </section>
      <CompletePMSExplanation />
      <WhatsAppWorkflow />
      <section className="page-section">
        <div className="container">
          <SectionIntro
            eyebrow="BEYOND HOUSEKEEPING"
            title="The same connected approach, across your operation."
          >
            Give each team a practical way to receive work and keep everyone
            else informed.
          </SectionIntro>
          <div className="page-role-grid">
            <article>
              <ClipboardCheck size={25} aria-hidden="true" />
              <h3>Maintenance</h3>
              <p>
                Report a room issue, assign a ticket and keep completion visible
                to the team.
              </p>
              <code>AC leaking in 305</code>
            </article>
            <article>
              <Boxes size={25} aria-hidden="true" />
              <h3>Inventory</h3>
              <p>
                Check stock, record usage and report replenishment through
                operational commands.
              </p>
              <code>restock 50 towels</code>
            </article>
            <article>
              <UsersRound size={25} aria-hidden="true" />
              <h3>Managers and front desk</h3>
              <p>
                Keep staff, shifts and room readiness connected to the
                reservations and property overview.
              </p>
              <span className="page-role-note">
                A shared view of the property
              </span>
            </article>
          </div>
        </div>
      </section>
      <ReservationToDailyClose />
      <HowItWorksQuestions />
      <section className="page-section page-peach workflow-setup-section">
        <div className="container page-editorial">
          <SectionIntro title="Connect people once. Keep responsibilities clear." />
          <div className="page-prose">
            <p>
              Link staff to WhatsApp and review who receives each alert.
              Cleaners report completion; supervisors review readiness; front
              desk sees the updated room status.
            </p>
            <p>
              During a demo, walk through your team’s handovers and the PMS
              modules behind them. The conversation is only one part of a
              complete property operation.
            </p>
          </div>
        </div>
      </section>
      <PageCTA title="See your own workflow in ChatBeds." />
    </>
  );
}
