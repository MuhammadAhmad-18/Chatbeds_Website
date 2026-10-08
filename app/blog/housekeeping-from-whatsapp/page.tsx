import { pageMetadata } from "@/lib/page-metadata";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Check } from "lucide-react";
import { DemoButton } from "@/components/DemoProvider";

export const metadata = pageMetadata(
  "Housekeeping from WhatsApp: checkout to Ready",
  "Follow a room from checkout through cleaning and supervisor inspection to Ready, with WhatsApp updates connected to the ChatBeds PMS.",
  "/blog/housekeeping-from-whatsapp",
);

const steps = [
  {
    title: "The guest checks out.",
    text: "Front desk records the checkout in ChatBeds. That event starts the room turnaround in the PMS, keeping the departure and room status connected.",
  },
  {
    title: "The room is marked for cleaning.",
    text: "Room 301 moves to To clean. Housekeeping has a clear starting point, rather than relying on another team to repeat the update.",
  },
  {
    title: "The right cleaner receives a message.",
    text: "ChatBeds notifies the relevant cleaner and manager through WhatsApp. The message identifies the room and the work that needs to happen: Room 301 is ready for cleaning.",
  },
  {
    title: "The cleaner reports back from WhatsApp.",
    text: "After cleaning, the cleaner can reply with 301 clean. Staff can also use voice notes as part of the operational workflow. They can report the work where they received it, while ChatBeds keeps the room record updated.",
    command: "301 clean",
  },
  {
    title: "The supervisor gets an inspection notification.",
    text: "The room moves to To inspect. The supervisor can check readiness and pass or fail the inspection. Cleaning completion and guest readiness remain separate decisions.",
  },
  {
    title: "The room becomes Ready.",
    text: "Once the supervisor approves the room, its status becomes Ready in ChatBeds. The housekeeping sequence is explicit: To clean → Being cleaned → To inspect → Ready.",
  },
  {
    title: "Front desk sees the updated availability.",
    text: "The room status is visible in the same PMS that manages reservations and front desk work. The team can see the room is ready without asking housekeeping to repeat the update.",
  },
];

export default function HousekeepingGuide() {
  return (
    <article className="container guide-page">
      <Link href="/blog" className="guide-back">
        <ArrowLeft size={16} aria-hidden="true" />
        All guides
      </Link>
      <header className="guide-header">
        <span className="eyebrow">OPERATIONS GUIDE</span>
        <h1>From checkout to Ready: housekeeping from WhatsApp.</h1>
        <p>
          A room turnaround involves front desk, a cleaner and a supervisor.
          Here is how ChatBeds connects their work, using Room 301 as an
          example.
        </p>
      </header>
      <div className="guide-body">
        <p className="guide-lead">
          Your property runs in ChatBeds. Your team runs it from WhatsApp.
          Housekeeping shows what that means in practice: an event in the PMS
          reaches the right person, and their response becomes an update
          everyone can see.
        </p>
        <ol className="guide-steps">
          {steps.map((step, index) => (
            <li key={step.title}>
              <span className="guide-step-number" aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div>
                <h2>{step.title}</h2>
                <p>{step.text}</p>
                {step.command && (
                  <code className="guide-command">
                    {step.command}
                    <Check size={17} aria-hidden="true" />
                  </code>
                )}
              </div>
            </li>
          ))}
        </ol>
        <aside className="guide-takeaway">
          <h2>Clear responsibilities. A shared room status.</h2>
          <p>
            <strong>For frontline staff:</strong> receive the assignment and
            report work through WhatsApp.
          </p>
          <p>
            <strong>For supervisors:</strong> review readiness before a room is
            released.
          </p>
          <p>
            <strong>For front desk:</strong> see the updated status alongside
            the rest of your property operation.
          </p>
        </aside>
        <div className="guide-cta">
          <h2>See the workflow in your property context.</h2>
          <p>
            Explore housekeeping as part of a complete PMS, alongside
            reservations, maintenance, staff and guest communication.
          </p>
          <DemoButton className="button button-primary">Book a Demo</DemoButton>
          <Link href="/#workflow">
            Explore the workflow <ArrowUpRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </article>
  );
}
