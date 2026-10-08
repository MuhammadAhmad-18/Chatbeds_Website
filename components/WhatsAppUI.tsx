import { Logo } from "./Logo";
import {
  Camera,
  CheckCheck,
  ChevronLeft,
  Mic,
  MoreVertical,
  Paperclip,
  Phone,
  Smile,
  Video,
} from "lucide-react";
import type { ReactNode } from "react";

/** Presentational controls intentionally have no tab stops or live inputs. */
export function WhatsAppHeader({
  name = "ChatBeds Operations",
  status = "Business account",
  initials,
  compact = false,
  back = true,
}: {
  name?: string;
  status?: string;
  initials?: string;
  compact?: boolean;
  back?: boolean;
}) {
  return (
    <div className={`wa-header${compact ? " wa-header-compact" : ""}`}>
      {back && <ChevronLeft className="wa-back" size={21} aria-hidden="true" />}
      <span
        className={`wa-avatar${initials ? " wa-avatar-guest" : ""}`}
        aria-hidden="true"
      >
        {initials || (
          <Logo variant="icon" height={28} decorative />
        )}
      </span>
      <span className="wa-contact">
        <strong>{name}</strong>
        <small>{status}</small>
      </span>
      <span className="wa-header-actions" aria-hidden="true">
        <Video className="wa-video" size={20} />
        <Phone size={18} />
        <MoreVertical size={19} />
      </span>
    </div>
  );
}

export function WhatsAppMessage({
  children,
  outgoing = false,
  time = "09:52",
  label,
}: {
  children: ReactNode;
  outgoing?: boolean;
  time?: string;
  label?: string;
}) {
  return (
    <div className={`wa-bubble ${outgoing ? "wa-outgoing" : "wa-incoming"}`}>
      {label && <span className="wa-sender">{label}</span>}
      <p>{children}</p>
      <span className="wa-time">
        {time}
        {outgoing && <CheckCheck size={15} aria-label="Read" />}
      </span>
    </div>
  );
}

export function WhatsAppComposer() {
  return (
    <div className="wa-composer" aria-hidden="true">
      <div className="wa-compose-field">
        <Smile size={21} />
        <span>Message</span>
        <Paperclip size={20} />
        <Camera className="wa-camera" size={20} />
      </div>
      <span className="wa-mic">
        <Mic size={20} />
      </span>
    </div>
  );
}

export function WhatsAppDate() {
  return <span className="wa-date">Today</span>;
}
