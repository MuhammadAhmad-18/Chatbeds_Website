import type { ReactNode } from "react";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  MessageCircle,
  BedDouble,
  ClipboardCheck,
  CalendarDays,
} from "lucide-react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { Logo } from "./Logo";
import { DemoLink } from "./DemoLink";
import { loginUrl } from "@/lib/site-links";
import {
  WhatsAppComposer,
  WhatsAppDate,
  WhatsAppHeader,
  WhatsAppMessage,
} from "./WhatsAppUI";

export function MarketingShell({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Navbar />
      <main id="main" className={`marketing-main ${className}`}>
        {children}
      </main>
      <Footer />
    </>
  );
}

export function PageHero({
  eyebrow,
  title,
  accent,
  children,
  visual,
  compact = false,
}: {
  eyebrow: string;
  title: string;
  accent?: string;
  children: ReactNode;
  visual?: ReactNode;
  compact?: boolean;
}) {
  return (
    <header
      className={`page-hero${compact ? " page-hero-compact" : ""}${visual ? " page-hero-split" : ""}`}
    >
      <div className="container page-hero-grid">
        <div className="page-hero-copy">
          <span className="eyebrow">
            <span className="eyebrow-line" />
            {eyebrow}
          </span>
          <h1>
            {title}
            {accent && (
              <>
                <br />
                <span>{accent}</span>
              </>
            )}
          </h1>
          <div className="page-hero-description">{children}</div>
        </div>
        {visual && <div className="page-hero-visual">{visual}</div>}
      </div>
    </header>
  );
}

export function PageActions({
  secondary = "Explore the Platform",
  href = loginUrl,
}: {
  secondary?: string;
  href?: string;
}) {
  return (
    <div className="page-actions">
      <DemoLink className="button button-primary">
        Book a Demo
        <ArrowUpRight size={17} aria-hidden="true" />
      </DemoLink>
      <Link href={href} className="page-text-link">
        {secondary}
        <ArrowRight size={17} aria-hidden="true" />
      </Link>
    </div>
  );
}

export function PageCTA({
  title = "Bring the whole property into the conversation.",
  children = "See a complete PMS and WhatsApp operations working together, in the context of your property.",
}: {
  title?: string;
  children?: ReactNode;
}) {
  return (
    <section className="page-cta-section">
      <div className="container">
        <div className="page-cta">
          <div>
            <span className="eyebrow">LET’S TALK ABOUT YOUR PROPERTY</span>
            <h2>{title}</h2>
            <p>{children}</p>
          </div>
          <div className="page-cta-actions">
            <DemoLink className="button button-primary">
              Book a Demo
              <ArrowUpRight size={17} aria-hidden="true" />
            </DemoLink>
            <Link href="/contact" className="page-text-link">
              Contact Sales
              <ArrowRight size={17} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export function SectionIntro({
  eyebrow,
  title,
  children,
}: {
  eyebrow?: string;
  title: string;
  children?: ReactNode;
}) {
  return (
    <div className="page-section-intro">
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <h2>{title}</h2>
      {children && <p>{children}</p>}
    </div>
  );
}

export function CheckList({ items }: { items: readonly string[] }) {
  return (
    <ul className="page-check-list">
      {items.map((item) => (
        <li key={item}>
          <Check size={16} aria-hidden="true" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function OperationsVisual({
  mode = "housekeeping",
}: {
  mode?: "housekeeping" | "maintenance" | "guest";
}) {
  const guest = mode === "guest";
  return (
    <div className="page-operation-visual">
      <div className="page-pms-state">
        <span className="page-pms-icon">
          {mode === "maintenance" ? (
            <ClipboardCheck size={26} />
          ) : (
            <BedDouble size={26} />
          )}
        </span>
        <div>
          <small>CHATBEDS PMS</small>
          <strong>
            {guest
              ? "Guest experience"
              : mode === "maintenance"
                ? "Maintenance · Room 305"
                : "Housekeeping · Room 301"}
          </strong>
        </div>
        <span className="page-state-badge">
          {guest
            ? "Unified Inbox"
            : mode === "maintenance"
              ? "Open ticket"
              : "To inspect"}
        </span>
      </div>
      <div className="page-visual-connector" aria-hidden="true">
        <span />
        <MessageCircle size={20} />
        <span />
      </div>
      <div className="wa-chat page-example-chat">
        <WhatsAppHeader
          status={guest ? "Guest conversation" : "Team conversation"}
        />
        <div className="wa-wallpaper page-chat-body">
          <WhatsAppDate />
          {guest ? (
            <>
              <WhatsAppMessage time="14:20" label="Guest">
                Hi, can we arrange a late checkout?
              </WhatsAppMessage>
              <div className="page-ai-draft">
                <span>AI-ASSISTED DRAFT · NOT SENT</span>
                <p>
                  Let me check the room availability and checkout options for
                  your stay.
                </p>
              </div>
            </>
          ) : mode === "maintenance" ? (
            <>
              <WhatsAppMessage outgoing time="10:15" label="Staff">
                AC leaking in 305
              </WhatsAppMessage>
              <WhatsAppMessage time="10:15" label="ChatBeds">
                Room 305 has a maintenance issue. The ticket is ready for the
                team to review.
              </WhatsAppMessage>
            </>
          ) : (
            <>
              <WhatsAppMessage time="09:52" label="ChatBeds">
                Room 301 is ready for cleaning.
              </WhatsAppMessage>
              <WhatsAppMessage outgoing time="10:14" label="Cleaner">
                301 clean
              </WhatsAppMessage>
              <WhatsAppMessage time="10:14" label="To supervisor">
                Room 301 ready for inspection. Please review.
              </WhatsAppMessage>
            </>
          )}
        </div>
        <WhatsAppComposer />
      </div>
      <p className="page-visual-caption">
        <Check size={14} aria-hidden="true" />
        {guest
          ? "Conversations and guest journeys, in one platform."
          : "Team replies stay connected to the property record."}
      </p>
    </div>
  );
}

export function PropertyConnectionVisual() {
  return (
    <div className="property-connection">
      <div className="connection-top">
        <span className="eyebrow">ONE PROPERTY. ONE SHARED PICTURE.</span>
        <Logo height={37} decorative />
      </div>
      <div className="connection-core">
        <BedDouble size={28} aria-hidden="true" />
        <strong>Your complete PMS</strong>
        <span>Reservations · Rooms · Operations · Revenue</span>
      </div>
      <div className="connection-stem" aria-hidden="true" />
      <div className="connection-roles">
        {[
          {
            title: "Management",
            icon: CalendarDays,
            text: "Visibility and control",
          },
          {
            title: "Frontline teams",
            icon: MessageCircle,
            text: "Work from WhatsApp",
          },
          { title: "Guests", icon: BedDouble, text: "A connected stay" },
        ].map(({ title, icon: Icon, text }) => (
          <div key={title}>
            <Icon size={22} aria-hidden="true" />
            <strong>{title}</strong>
            <span>{text}</span>
          </div>
        ))}
      </div>
      <div className="connection-note">
        <span className="live-dot" aria-hidden="true" />
        Your property runs in ChatBeds.
        <br />
        Your team runs it from WhatsApp.
      </div>
    </div>
  );
}

export function FAQ({
  items,
}: {
  items: readonly { question: string; answer: string }[];
}) {
  return (
    <div className="page-faq">
      {items.map(({ question, answer }) => (
        <details key={question}>
          <summary>
            {question}
            <span aria-hidden="true">+</span>
          </summary>
          <p>{answer}</p>
        </details>
      ))}
    </div>
  );
}
