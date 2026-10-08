import { BedDouble, Check } from "lucide-react";
import type { CountryPricing } from "@/lib/pricing/types";
export function PricingHero({ country }: { country: CountryPricing }) {
  return (
    <header className="pricing-hero">
      <div className="container pricing-hero-layout">
        <div>
          <span className="eyebrow">
            <span className="eyebrow-line" />
            PRICING
          </span>
          <h1>
            Simple pricing that fits <br className="pricing-desktop-break" />
            your country
            <span> and your hotel.</span>
          </h1>
          <p>
            Pay per room, in your own currency.
            <br className="pricing-mobile-break" /> No setup fees. No
            commission.
          </p>
        </div>
        <aside className="pricing-proof">
          <span className="pricing-proof-icon">
            <BedDouble size={24} aria-hidden="true" />
          </span>
          {country.status === "confirmed" ? (
            <>
              <p>
                For a typical property, ChatBeds Pro costs less than{" "}
                <strong>one room night a month.</strong>
              </p>
              <span>
                <Check size={14} aria-hidden="true" />
                More room for your operation.
              </span>
            </>
          ) : (
            <>
              <p>
                Your property. Your currency. <br />
                <strong>A clear plan for your team.</strong>
              </p>
              <span>
                <Check size={14} aria-hidden="true" />
                One complete PMS. No desktop friction.
              </span>
            </>
          )}
        </aside>
      </div>
    </header>
  );
}
