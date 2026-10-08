"use client";
import { useState } from "react";
import {
  ArrowDownUp,
  ArrowRight,
  CalendarDays,
  Check,
  ChevronDown,
  Globe,
  History,
  SlidersHorizontal,
  Sparkles,
} from "lucide-react";
import { SectionHeading } from "./SectionHeading";
const tabs = ["Revenue & rates", "Distribution"];
export function RevenueDistribution() {
  const [active, setActive] = useState(0);
  function handleKey(e: React.KeyboardEvent<HTMLButtonElement>) {
    if (["ArrowRight", "ArrowLeft", "Home", "End"].includes(e.key)) {
      e.preventDefault();
      const next = e.key === "Home" ? 0 : e.key === "End" ? 1 : 1 - active;
      setActive(next);
      document.getElementById(`revenue-tab-${next}`)?.focus();
    }
  }
  return (
    <section id="distribution" className="section revenue-section">
      <div className="container">
        <div className="revenue-heading">
          <SectionHeading
            eyebrow="YOUR COMMERCIAL TOOLS, WORKING TOGETHER"
            title={
              <>
                Sell smarter. Price smarter. <br />
                <span className="text-muted-light">Stay in control.</span>
              </>
            }
          >
            Manage your rates and where you sell from the same platform that
            runs your property.
          </SectionHeading>
          <div
            className="revenue-tabs"
            role="tablist"
            aria-label="Commercial features"
          >
            {tabs.map((tab, i) => (
              <button
                role="tab"
                id={`revenue-tab-${i}`}
                aria-selected={active === i}
                aria-controls="revenue-panel"
                tabIndex={active === i ? 0 : -1}
                onClick={() => setActive(i)}
                onKeyDown={handleKey}
                key={tab}
              >
                {i === 0 ? (
                  <SlidersHorizontal size={16} />
                ) : (
                  <Globe size={16} />
                )}
                {tab}
              </button>
            ))}
          </div>
        </div>
        <div
          className="revenue-panel"
          role="tabpanel"
          id="revenue-panel"
          aria-labelledby={`revenue-tab-${active}`}
          tabIndex={0}
        >
          {active === 0 ? (
            <>
              <div className="revenue-copy">
                <span className="pillar-icon">
                  <SlidersHorizontal size={25} />
                </span>
                <h3>
                  The right rate. <br />
                  With the right oversight.
                </h3>
                <p>
                  Build rate plans, apply seasonal rules and make bulk changes
                  without losing sight of the details.
                </p>
                <ul className="feature-checks">
                  <li>
                    <Sparkles size={15} />
                    RevBot, AI calendar & competitor insight
                  </li>
                  <li>
                    <CalendarDays size={15} />
                    Rate grid, seasons & flexible plans
                  </li>
                  <li>
                    <History size={15} />
                    Change history & undo rate changes
                  </li>
                </ul>
              </div>
              <div className="rate-grid-frame">
                <div className="rate-grid-top">
                  <span>
                    <CalendarDays size={16} />
                    <strong>Rate grid</strong>
                  </span>
                  <span>Sample rates · USD</span>
                  <span>
                    7 days <ChevronDown size={12} />
                  </span>
                </div>
                <table className="rate-table">
                  <caption className="sr-only">
                    Illustrative nightly rate grid in US dollars
                  </caption>
                  <thead>
                    <tr>
                      <th>Room type</th>
                      {["Mon 12", "Tue 13", "Wed 14", "Thu 15"].map((day) => (
                        <th key={day}>{day}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ["Standard", 120, 120, 130, 135],
                      ["Deluxe double", 165, 165, 175, 180],
                      ["Suite", 240, 240, 260, 270],
                    ].map((row) => (
                      <tr key={row[0]}>
                        {row.map((cell, i) =>
                          i === 0 ? (
                            <th key={i}>
                              {cell}
                              <small>Flexible rate</small>
                            </th>
                          ) : (
                            <td
                              key={i}
                              className={i === 3 ? "rate-highlight" : ""}
                            >
                              ${cell}
                              <small>Available</small>
                            </td>
                          ),
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="rate-control">
                  <History size={14} /> Rate changes stay visible.
                  <span>
                    <Check size={13} />
                    You stay in control.
                  </span>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="revenue-copy">
                <span className="pillar-icon">
                  <Globe size={25} />
                </span>
                <h3>
                  Your availability. <br />A connected view.
                </h3>
                <p>
                  Manage linked rooms, rate plans and channel availability from
                  your property’s central system.
                </p>
                <ul className="feature-checks">
                  <li>
                    <Check size={15} />
                    Airbnb, Booking.com & Vrbo distribution
                  </li>
                  <li>
                    <Check size={15} />
                    Calendar & availability synchronization
                  </li>
                  <li>
                    <Check size={15} />
                    Linked rooms, rate plans & channel closing
                  </li>
                </ul>
                <p className="third-party-note">
                  Platform names describe product capabilities, not endorsements
                  or partnerships.
                </p>
              </div>
              <div className="distribution-visual">
                <div className="distribution-center">
                  <BedMini />
                  <strong>Your ChatBeds PMS</strong>
                  <span>Rooms · Rates · Availability</span>
                </div>
                <div className="distribution-connector">
                  <ArrowDownUp size={25} />
                  <span>Connected distribution</span>
                </div>
                <div className="distribution-channels">
                  {["Airbnb", "Booking.com", "Vrbo"].map((channel) => (
                    <div key={channel}>
                      <Globe size={19} />
                      <strong>{channel}</strong>
                      <span>Calendar & availability</span>
                    </div>
                  ))}
                </div>
                <p>
                  One clear view across your sales channels.{" "}
                  <ArrowRight size={14} />
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
function BedMini() {
  return <CalendarDays size={24} strokeWidth={1.5} />;
}
