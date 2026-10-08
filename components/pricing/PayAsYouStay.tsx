"use client";
import { useEffect, useState } from "react";
import { ArrowRight, CalendarDays } from "lucide-react";
import { calcPayAsYouStay, formatMoney } from "@/lib/pricing/calculate";
import type { CountryPricing } from "@/lib/pricing/types";
export function PayAsYouStay({
  country,
  rooms,
}: {
  country: CountryPricing;
  rooms: number;
}) {
  const [occupancy, setOccupancy] = useState(55);
  const result = calcPayAsYouStay({ country, rooms, occupancyPct: occupancy });
  // Derive the banner, comparison and debounced announcement from this one result.
  const comparison = result
    ? `At ${occupancy}% occupancy, pay-as-you-stay costs ${formatMoney(result.cost, country)} per month. Regular Pro costs ${formatMoney(result.proMonthly, country)} per month (monthly billing). ${
        result.difference === 0
          ? "Both cost the same."
          : `${result.cheaperPlan === "payg" ? "Pay-as-you-stay" : "Pro"} is ${formatMoney(result.difference, country)} cheaper.`
      }`
    : "";
  const breakEven = result
    ? `Pro breaks even at about ${Math.round(result.breakEvenOccupancyPct)}% occupancy.`
    : "";
  const [announcement, setAnnouncement] = useState("");
  const liveText = result
    ? `${result.nightsSold} room nights sold. ${comparison} ${breakEven}`
    : "";
  useEffect(() => {
    const timer = window.setTimeout(() => setAnnouncement(liveText), 400);
    return () => window.clearTimeout(timer);
  }, [liveText]);
  if (!result) return null;
  return (
    <section className="container pricing-payg" aria-labelledby="payg-heading">
      <div className="pricing-payg-intro">
        <span className="pricing-small-icon">
          <CalendarDays size={21} aria-hidden="true" />
        </span>
        <h2 id="payg-heading">Seasonal or brand-new property?</h2>
        <p>
          Pay-as-you-stay gives you Pro features and charges only for room
          nights actually sold.
        </p>
      </div>
      <div className="pricing-occupancy">
        <label htmlFor="pricing-occupancy">
          Occupancy this month <strong>{occupancy}%</strong>
        </label>
        <input
          id="pricing-occupancy"
          type="range"
          min={0}
          max={100}
          value={occupancy}
          aria-valuetext={`${occupancy}% occupancy`}
          onChange={(event) => setOccupancy(Number(event.target.value))}
        />
        <div>
          <span>0%</span>
          <span>100%</span>
        </div>
        <small>
          {rooms} {rooms === 1 ? "room" : "rooms"} × 30 days ·{" "}
          {result.nightsSold} room nights sold
        </small>
      </div>
      <div className="pricing-payg-result">
        <span>Pay-as-you-stay / month</span>
        <strong>{formatMoney(result.cost, country)}</strong>
        <p>{comparison}</p>
        <small>
          <ArrowRight size={12} aria-hidden="true" />
          {breakEven}
        </small>
      </div>
      <p
        className="sr-only"
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        {announcement}
      </p>
    </section>
  );
}
