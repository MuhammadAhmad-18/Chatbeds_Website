import {
  CalendarDays,
  MessageCircle,
  Layers3,
  ArrowUpRight,
} from "lucide-react";
import { EnquiryForm } from "@/components/EnquiryForm";
import { PageHero } from "@/components/MarketingPage";
import { pageMetadata } from "@/lib/page-metadata";
import { demoBookingUrl } from "@/lib/site-links";

export const metadata = pageMetadata(
  "Book a Demo",
  "See the complete ChatBeds PMS and WhatsApp operations in action. Request a property-focused demo covering front desk, operations, guests and commercial tools.",
  "/book-a-demo",
);
export default function BookDemoPage() {
  const bookingUrl = demoBookingUrl;
  return (
    <>
      <PageHero
        eyebrow="BOOK A CHATBEDS DEMO"
        title="Your whole property."
        accent="One connected conversation."
        compact
      >
        <p>
          See the complete PMS, then follow the work from a property event to a
          WhatsApp reply and back to the PMS. Let’s make it relevant to your
          team.
        </p>
      </PageHero>
      <section className="page-section page-demo-section">
        <div className="container demo-layout">
          <div className="demo-agenda">
            <span className="eyebrow">WHAT WE CAN WALK THROUGH</span>
            <h2>
              Start with the platform.
              <br />
              See the people behind it.
            </h2>
            {[
              {
                icon: CalendarDays,
                title: "The property overview",
                text: "Reservations, calendar, front desk and rooms. See how the PMS brings your daily operation into view.",
              },
              {
                icon: MessageCircle,
                title: "A real operational handover",
                text: "Follow checkout, housekeeping, inspection and room readiness, with WhatsApp updates connected to the PMS.",
              },
              {
                icon: Layers3,
                title: "The tools around the stay",
                text: "Discuss maintenance, staff, inventory, guest communication, finance, revenue, distribution and reporting.",
              },
            ].map(({ icon: Icon, title, text }, i) => (
              <article key={title}>
                <span>
                  <Icon size={22} aria-hidden="true" />
                </span>
                <div>
                  <small>0{i + 1}</small>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </div>
              </article>
            ))}
            <div className="demo-prepare">
              <h3>Bring your property into the conversation.</h3>
              <p>
                Your property type, room or unit count, number of properties and
                a couple of everyday handovers will help us focus the demo.
              </p>
            </div>
          </div>
          <div className="page-form-panel">
            {bookingUrl ? (
              <div className="demo-booking-panel">
                <span className="eyebrow">LET’S FIND A TIME</span>
                <h2>Arrange your demo.</h2>
                <p>
                  Use the ChatBeds scheduling page to choose the next step.
                  Bring a little context about your property and the teams you
                  want to connect.
                </p>
                <a
                  href={bookingUrl}
                  className="button button-primary"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Open demo scheduling
                  <ArrowUpRight size={17} aria-hidden="true" />
                </a>
                <p className="page-form-note">
                  The scheduling page opens in a new tab.
                </p>
              </div>
            ) : (
              <EnquiryForm />
            )}
          </div>
        </div>
      </section>
    </>
  );
}
