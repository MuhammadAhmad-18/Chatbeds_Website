import { BatteryFull, Check, Signal, Wifi } from "lucide-react";
import {
  WhatsAppComposer,
  WhatsAppDate,
  WhatsAppHeader,
  WhatsAppMessage,
} from "./WhatsAppUI";

export function ChatPhoneMockup({ compact = false }: { compact?: boolean }) {
  return (
    <div
      className={`chat-phone wa-phone${compact ? " chat-compact" : ""}`}
      role="group"
      aria-label="Illustrative WhatsApp staff conversation"
    >
      <div className="wa-phone-status" aria-hidden="true">
        <span>9:41</span>
        <span className="wa-phone-island" />
        <span>
          <Signal size={12} />
          <Wifi size={12} />
          <BatteryFull size={17} />
        </span>
      </div>
      <WhatsAppHeader compact name="ChatBeds" />
      <div className="wa-wallpaper wa-phone-messages">
        <WhatsAppDate />
        <WhatsAppMessage time="09:41" label="Housekeeping">
          Room <strong>301</strong> is ready for cleaning.
        </WhatsAppMessage>
        <WhatsAppMessage outgoing>301 clean</WhatsAppMessage>
        <WhatsAppMessage>
          Thanks! Room 301 is ready for inspection.
        </WhatsAppMessage>
        {!compact && (
          <WhatsAppMessage outgoing time="09:56">
            301 inspected — ready
          </WhatsAppMessage>
        )}
      </div>
      <WhatsAppComposer />
      <div className="wa-pms-sync">
        <Check size={13} />
        <span>PMS updated. Front desk is in sync.</span>
      </div>
    </div>
  );
}
