import {
  CalendarDays,
  Gift,
  Handshake,
  TrendingUp,
  Sparkles,
} from "lucide-react";
import type { CountryPricing } from "@/lib/pricing/types";
// TODO: Confirm whether Founding 100 is live; disabled unless explicitly enabled.
const foundingEnabled = process.env.NEXT_PUBLIC_FOUNDING_100_ENABLED === "true";
export function WaysToSave({ country }: { country: CountryPricing }) {
  const items = [
    {
      icon: CalendarDays,
      title: "Seasonal Pause",
      text: "Closed for the season? Pay 20% of your plan for up to 4 closed months a year. Your data, booking page and future bookings stay live.",
    },
    {
      icon: TrendingUp,
      title: "Grow-with-you discounts",
      text: "Price per room falls 15% above 50 rooms and 25% above 150.",
    },
    {
      icon: Gift,
      title: "Referrals",
      text: "Refer another hotel and you both get one month free.",
    },
    {
      icon: Handshake,
      title: "Association members",
      text:
        country.code === "PK"
          ? "10% off for members of hotel associations, including the Pakistan Hotels Association."
          : "10% off for members of hotel associations. Ask us about your association.",
    },
    ...(foundingEnabled
      ? [
          {
            icon: Sparkles,
            title: "Founding 100",
            text: "The first 100 properties in your country get 40% off, locked for as long as you stay.",
          },
        ]
      : []),
  ];
  return (
    <section id="save" className="pricing-section pricing-save">
      <div className="container">
        <div className="pricing-section-heading">
          <span className="eyebrow">FLEXIBLE BY DESIGN</span>
          <h2>
            Built around the way <br />
            <span>your property runs.</span>
          </h2>
          <p>
            Opening, growing or taking a seasonal break? Your plan can fit the
            way you work.
          </p>
        </div>
        <div className="pricing-save-grid">
          {items.map(({ icon: Icon, title, text }) => (
            <article key={title}>
              <Icon size={25} aria-hidden="true" />
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
