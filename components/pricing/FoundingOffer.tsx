import { Sparkles } from "lucide-react";
import { foundingOfferText, hasFoundingOffer } from "@/lib/pricing/config";
import type { CountryPricing } from "@/lib/pricing/types";

export function FoundingOffer({ country }: { country: CountryPricing }) {
  if (!hasFoundingOffer(country)) return null;
  return (
    <aside className="container pricing-founding-offer" aria-label="Founding 100 offer">
      <Sparkles size={18} aria-hidden="true" />
      <div>
        <p>{foundingOfferText(country)}</p>
        <small>Essentials and Pro only. Does not combine with volume discounts or referrals.</small>
      </div>
    </aside>
  );
}
