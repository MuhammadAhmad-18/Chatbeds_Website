"use client";
import { Globe2, LockKeyhole } from "lucide-react";
import { countries, getCountry } from "@/lib/pricing/countries";
import { normaliseRooms } from "@/lib/pricing/calculate";
import { useEffect, useRef, useState } from "react";
import type { PricingSelection } from "@/lib/pricing/types";
export function PricingControls({
  selection,
  onChange,
  announcement,
}: {
  selection: PricingSelection;
  onChange: (selection: PricingSelection) => void;
  announcement: string;
}) {
  const country = getCountry(selection.country);
  const stickyRef = useRef<HTMLDivElement>(null);
  const [roomDraft, setRoomDraft] = useState(String(selection.rooms));
  const [lastRooms, setLastRooms] = useState(selection.rooms);
  if (lastRooms !== selection.rooms) {
    setLastRooms(selection.rooms);
    setRoomDraft(String(selection.rooms));
  }
  useEffect(() => {
    const node = stickyRef.current;
    if (!node) return;
    const observer = new ResizeObserver(() =>
      node
        .closest<HTMLElement>(".pricing-page")
        ?.style.setProperty(
          "--pricing-sticky-height",
          `${node.getBoundingClientRect().height}px`,
        ),
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);
  return (
    <div className="pricing-sticky" ref={stickyRef}>
      <div className="container">
        <div className="pricing-controls">
          <div className="pricing-country-control">
            <label htmlFor="pricing-country">
              <Globe2 size={15} aria-hidden="true" /> Prices for{" "}
              <span>Change</span>
            </label>
            <select
              id="pricing-country"
              title={`${country.name} (${country.currency})`}
              value={country.code}
              onChange={(event) =>
                onChange({ ...selection, country: event.target.value })
              }
            >
              {countries.map((item) => (
                <option key={item.code} value={item.code}>
                  {item.name} ({item.currency})
                </option>
              ))}
              <option value="OTHER">Other country</option>
            </select>
          </div>
          <div className="pricing-room-control">
            <div>
              <label htmlFor="pricing-rooms">Rooms or units</label>
              <input
                id="pricing-rooms"
                type="number"
                min={1}
                max={300}
                step={1}
                inputMode="numeric"
                value={roomDraft}
                onChange={(event) => {
                  const raw = event.target.value;
                  setRoomDraft(raw);
                  const count = event.target.valueAsNumber;
                  if (
                    raw !== "" &&
                    Number.isInteger(count) &&
                    count >= 1 &&
                    count <= 300
                  )
                    onChange({ ...selection, rooms: count });
                }}
                onBlur={() => {
                  const count =
                    roomDraft.trim() === ""
                      ? selection.rooms
                      : normaliseRooms(Number(roomDraft));
                  setRoomDraft(String(count));
                  onChange({ ...selection, rooms: count });
                }}
              />
            </div>
            <label className="sr-only" htmlFor="pricing-room-range">
              Rooms or units slider
            </label>
            <input
              id="pricing-room-range"
              type="range"
              min={1}
              max={300}
              step={1}
              value={selection.rooms}
              aria-valuetext={`${selection.rooms} ${selection.rooms === 1 ? "room" : "rooms"}`}
              onChange={(event) =>
                onChange({ ...selection, rooms: Number(event.target.value) })
              }
            />
          </div>
          <fieldset className="pricing-billing" role="radiogroup">
            <legend>Billing</legend>
            <div>
              {(["monthly", "yearly"] as const).map((billing) => (
                <label key={billing}>
                  <input
                    type="radio"
                    name="pricing-billing"
                    value={billing}
                    checked={selection.billing === billing}
                    onChange={() => onChange({ ...selection, billing })}
                  />
                  <span>
                    {billing === "monthly" ? (
                      "Monthly"
                    ) : (
                      <>
                        Yearly <small>2 months free</small>
                      </>
                    )}
                  </span>
                </label>
              ))}
            </div>
          </fieldset>
          <p className="pricing-tax-note">
            <LockKeyhole size={12} aria-hidden="true" />
            Prices are in {country.currency}, before local sales tax. They don’t
            change for 12 months.
          </p>
        </div>
        <nav className="pricing-mini-nav" aria-label="Pricing sections">
          <a href="#plans">Plans</a>
          <a href="#compare">Compare</a>
          <a href="#save">Save</a>
          <a href="#pricing-faq">FAQ</a>
          <span>
            {selection.rooms} {selection.rooms === 1 ? "room" : "rooms"} ·{" "}
            {selection.billing === "yearly"
              ? "Yearly billing"
              : "Monthly billing"}
          </span>
        </nav>
      </div>
      <p
        className="sr-only"
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        {announcement}
      </p>
    </div>
  );
}
