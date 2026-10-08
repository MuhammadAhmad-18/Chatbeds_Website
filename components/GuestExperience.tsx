import {
  ArrowRight,
  Check,
  CheckCheck,
  MessageSquarePlus,
  MoreVertical,
  Search,
  Sparkles,
} from "lucide-react";
import { SectionHeading } from "./SectionHeading";
import {
  WhatsAppComposer,
  WhatsAppDate,
  WhatsAppHeader,
  WhatsAppMessage,
} from "./WhatsAppUI";

const contacts = [
  {
    initials: "JL",
    name: "Jamie Lewis",
    message: "Could we check in a little early?",
    time: "10:24",
    active: true,
  },
  {
    initials: "SK",
    name: "Sam Kim",
    message: "Thank you, see you soon!",
    time: "09:58",
    active: false,
  },
  {
    initials: "AR",
    name: "Alex Rivera",
    message: "Is breakfast included?",
    time: "09:42",
    active: false,
  },
];

export function GuestExperience() {
  return (
    <section id="guest-experience" className="section guest-section">
      <div className="container guest-layout">
        <div className="wa-inbox-showcase">
          <div className="wa-inbox-caption">
            <span className="live-dot" />
            Guest WhatsApp inbox
          </div>
          <div
            className="wa-web"
            role="group"
            aria-label="Illustrative WhatsApp guest inbox"
          >
            <aside
              className="wa-web-sidebar"
              aria-label="Example guest conversations"
            >
              <div className="wa-chats-heading">
                <strong>Chats</strong>
                <span aria-hidden="true">
                  <MessageSquarePlus size={19} />
                  <MoreVertical size={19} />
                </span>
              </div>
              <div className="wa-search" aria-hidden="true">
                <Search size={16} />
                <span>Search or start a new chat</span>
              </div>
              <div className="wa-chat-filters" aria-hidden="true">
                <span className="wa-filter-active">All</span>
                <span>Unread</span>
                <span>Groups</span>
              </div>
              {contacts.map(({ initials, name, message, time, active }) => (
                <div
                  className={`wa-web-contact${active ? " wa-selected" : ""}`}
                  key={name}
                >
                  <span
                    className="wa-avatar wa-avatar-guest"
                    aria-hidden="true"
                  >
                    {initials}
                  </span>
                  <span className="wa-contact-preview">
                    <strong>{name}</strong>
                    <small>{message}</small>
                  </span>
                  <span className="wa-contact-time">
                    {time}
                    {active && <span className="wa-unread">1</span>}
                  </span>
                </div>
              ))}
            </aside>
            <div className="wa-web-conversation">
              <WhatsAppHeader
                name="Jamie Lewis"
                initials="JL"
                status="Arriving today · Deluxe double"
                back={false}
              />
              <div className="wa-wallpaper wa-guest-messages">
                <WhatsAppDate />
                <WhatsAppMessage time="10:24">
                  Hello! Could we check in a little early?
                </WhatsAppMessage>
              </div>
              <WhatsAppComposer />
            </div>
          </div>
          <div className="wa-draft-panel">
            <div className="wa-draft-label">
              <Sparkles size={15} />
              <strong>ChatBeds · AI-assisted reply</strong>
              <span>Unsent draft</span>
            </div>
            <p>
              Hi Jamie! We’d be happy to check availability for an early
              arrival. What time are you planning to reach us?
            </p>
            <small>Review and edit in ChatBeds before sending.</small>
          </div>
          <div className="wa-guest-journey">
            <span>
              <Check size={13} /> Before arrival
            </span>
            <ArrowRight size={13} />
            <span className="active">
              <CheckCheck size={13} /> During the stay
            </span>
            <ArrowRight size={13} />
            <span>After checkout</span>
          </div>
        </div>
        <div>
          <SectionHeading
            eyebrow="A BETTER STAY STARTS WITH A CONVERSATION"
            title={
              <>
                One inbox for every <br />
                <span className="text-muted-light">guest conversation.</span>
              </>
            }
          >
            Give your team the context to respond thoughtfully. Bring guest
            WhatsApp messages, AI-assisted replies and automated journeys into
            one connected place.
          </SectionHeading>
          <ul className="feature-checks">
            {[
              "Guest conversations with stay details close by",
              "Check-in, stay and checkout messaging flows",
              "Upsells, add-ons and a connected guest portal",
              "Reply drafts your team can review and refine",
            ].map((item) => (
              <li key={item}>
                <Check size={16} />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
