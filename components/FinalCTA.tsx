import { ArrowRight, MessageCircle } from "lucide-react";
import { DemoButton } from "./DemoProvider";
import { contactEmail } from "@/lib/company";
export function FinalCTA() {
  return (
    <section id="demo" className="section cta-section">
      <div className="container">
        <div className="cta-panel">
          <div className="cta-decoration" aria-hidden="true">
            <MessageCircle size={180} strokeWidth={0.6} />
          </div>
          <span className="eyebrow">
            ONE PROPERTY. ONE PLATFORM. ONE CONNECTED TEAM.
          </span>
          <h2>
            Ready to run your <br />
            property differently?
          </h2>
          <p>
            See how ChatBeds brings your front desk, operations, guest
            communication and revenue tools into one connected PMS.
          </p>
          <div className="cta-actions">
            <DemoButton />
            <a className="button button-text" href={`mailto:${contactEmail}`}>
              Contact Sales <ArrowRight size={17} />
            </a>
          </div>
          <span className="cta-signature">
            Your property runs in ChatBeds. Your team runs it from WhatsApp.
          </span>
        </div>
      </div>
    </section>
  );
}
