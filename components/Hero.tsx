import { ArrowRight, Check, MoveUpRight } from "lucide-react";
import { DemoButton } from "./DemoProvider";
import { DashboardFrame } from "./DashboardFrame";
import { ChatPhoneMockup } from "./ChatPhoneMockup";

export function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero-grid-pattern" aria-hidden="true" />
      <div className="container hero-layout">
        <div className="hero-copy">
          <span className="hero-eyebrow">
            <span className="live-dot" /> A COMPLETE PMS. A MORE CONNECTED TEAM.
          </span>
          <h1 id="hero-title">
            The PMS your entire hotel can use{" "}
            <span className="hero-dash">—</span>{" "}
            <span className="hero-accent">from WhatsApp.</span>
          </h1>
          <p>
            Manage reservations, rooms, housekeeping, maintenance, staff,
            revenue, guest communication and more from one complete PMS — while
            your team gets work done directly through WhatsApp.
          </p>
          <div className="hero-actions">
            <DemoButton />
            <a href="#platform" className="button button-secondary">
              Explore the Platform <ArrowRight size={17} />
            </a>
          </div>
          <div className="hero-reassurance">
            <span>
              <Check size={14} /> Full PMS. Front to back.
            </span>
            <span>
              <Check size={14} /> Your team’s familiar chat.
            </span>
          </div>
        </div>
        <div className="hero-visual">
          <div className="visual-overline">
            <span className="live-dot" /> YOUR PROPERTY, CONNECTED
            <span>ONE PMS. EVERY TEAM.</span>
          </div>
          <DashboardFrame />
          <div className="hero-connector" aria-hidden="true">
            <span />
            <MoveUpRight size={18} />
          </div>
          <ChatPhoneMockup compact />
          <div className="hero-sync-label">
            <span className="live-dot" />
            One conversation. Real operational progress.
          </div>
        </div>
      </div>
      <div className="container hero-bottom">
        <span>Your property runs in ChatBeds.</span>
        <span>
          Your team runs it from WhatsApp.
          <ArrowRight size={15} />
        </span>
      </div>
    </section>
  );
}
