import type { CountryPricing, PendingCountryPricing } from "./types";

function pending(
  code: string,
  name: string,
  currency: string,
  locale: string,
): PendingCountryPricing {
  return {
    code,
    name,
    currency,
    currencySymbol: `${currency} `,
    locale,
    status: "pending",
    paymentMethods: [],
  };
}

// TODO: Add confirmed prices per country here. Do not guess.
export const countries: readonly CountryPricing[] = [
  {
    code: "PK",
    name: "Pakistan",
    currency: "PKR",
    currencySymbol: "PKR ",
    locale: "en-PK",
    status: "confirmed",
    rounding: { totalStep: 100 },
    typicalRoomRate: 9000,
    perRoom: { essentials: 250, pro: 420, group: 350 },
    payAsYouStayPerRoomNight: 28,
    paymentMethods: ["JazzCash", "Easypaisa", "Raast", "Bank transfer"],
    allowsQuarterlyPrepaid: true,
  },
  // Launch countries without approved prices. These never inherit Pakistan pricing.
  pending("AE", "United Arab Emirates", "AED", "en-AE"),
  pending("SA", "Saudi Arabia", "SAR", "en-SA"),
  pending("QA", "Qatar", "QAR", "en-QA"),
  pending("KW", "Kuwait", "KWD", "en-KW"),
  pending("BH", "Bahrain", "BHD", "en-BH"),
  pending("OM", "Oman", "OMR", "en-OM"),
  pending("IN", "India", "INR", "en-IN"),
  pending("BD", "Bangladesh", "BDT", "en-BD"),
  pending("LK", "Sri Lanka", "LKR", "en-LK"),
  pending("NP", "Nepal", "NPR", "en-NP"),
  pending("GB", "United Kingdom", "GBP", "en-GB"),
  pending("DE", "Germany", "EUR", "de-DE"),
  pending("US", "United States", "USD", "en-US"),
  pending("TR", "Turkey", "TRY", "tr-TR"),
  pending("TH", "Thailand", "THB", "en-TH"),
];
export const otherCountry: PendingCountryPricing = pending(
  "OTHER",
  "your country",
  "local currency",
  "en",
);
export function getCountry(code: string | undefined): CountryPricing {
  return (
    countries.find((country) => country.code === code?.toUpperCase()) ??
    otherCountry
  );
}
export function paymentText(country: CountryPricing): string {
  if (!country.paymentMethods.length)
    return `Contact us for payment options in ${country.name}.`;
  const methods = country.paymentMethods.map((method) =>
    method === "Bank transfer" ? "bank transfer" : method,
  );
  return `In ${country.name} you can pay with ${methods.slice(0, -1).join(", ")} or ${methods.at(-1)}.`;
}
