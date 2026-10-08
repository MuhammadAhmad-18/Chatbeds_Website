import { CreditCard } from "lucide-react";
import { paymentText } from "@/lib/pricing/countries";
import type { CountryPricing } from "@/lib/pricing/types";
export function PaymentMethods({ country }: { country: CountryPricing }) {
  return (
    <div className="container pricing-payment">
      <CreditCard size={19} aria-hidden="true" />
      <p>
        {paymentText(country)}
        {country.allowsQuarterlyPrepaid && (
          <span> Quarterly prepaid billing is also available.</span>
        )}
      </p>
    </div>
  );
}
