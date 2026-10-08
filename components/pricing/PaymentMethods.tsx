import { CreditCard } from "lucide-react";
import Image from "next/image";
import { paymentLogos } from "@/lib/pricing/countries";
import type { CountryPricing } from "@/lib/pricing/types";
export function PaymentMethods({ country }: { country: CountryPricing }) {
  return (
    <div className="container pricing-payment">
      <CreditCard size={19} aria-hidden="true" />
      <div>
        <p><strong>How you pay</strong>{country.paymentMethods.length ? ` in ${country.name}` : `: Contact us for payment options in ${country.name}.`}</p>
        {country.paymentMethods.length > 0 && (
          <>
            <ul className="pricing-payment-chips" aria-label={`Payment methods in ${country.name}`}>
              {country.paymentMethods.map((method) => {
                const logo = paymentLogos[method.toLowerCase().replaceAll(" ", "-")];
                return <li key={method}><span>{method}</span>{logo && <Image src={logo.src} width={logo.width} height={logo.height} alt="" />}</li>;
              })}
            </ul>
            <p className="pricing-payment-ownership">Payment brand names belong to their owners.</p>
          </>
        )}
        {country.allowsQuarterlyPrepaid && <p>Quarterly prepaid billing is also available.</p>}
      </div>
    </div>
  );
}
