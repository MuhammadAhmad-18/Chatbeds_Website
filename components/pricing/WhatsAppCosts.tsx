import { Check, MessageCircle } from "lucide-react";
const points = [
  "Staff messages to ChatBeds are free.",
  "Guest replies are free.",
  "Pro and Group include a message credit worth 15% of your plan fee.",
  "Above the credit, guest messages are billed at Meta’s published rate for the guest’s country, with no markup.",
];
export function WhatsAppCosts() {
  return (
    <section className="pricing-section pricing-whatsapp">
      <div className="container pricing-two-column">
        <div className="pricing-section-heading">
          <span className="eyebrow">CLEAR FROM THE FIRST MESSAGE</span>
          <h2>
            WhatsApp costs, <br />
            <span>explained.</span>
          </h2>
          <p>
            Keep your team in the conversation, with clear pricing for guest
            messages.
          </p>
          <MessageCircle
            size={37}
            className="pricing-section-icon"
            aria-hidden="true"
          />
        </div>
        <ol>
          {points.map((point, index) => (
            <li key={point}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <p>{point}</p>
              <Check size={17} aria-hidden="true" />
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
