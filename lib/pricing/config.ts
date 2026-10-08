import type { CountryPricing } from "./types";

export const foundingOffer = {
  enabled: process.env.NEXT_PUBLIC_FOUNDING_100_ENABLED === "true",
  countries: ["PK"] as readonly string[],
  discountPct: 40,
};
// TODO: confirm policy before enabling either statement.
export const guarantee = { enabled: false, text: "" };
export const trial = { enabled: false, text: "" };
// TODO: Confirm Founding 100 eligibility for Group and pay-as-you-stay.
// TODO: Confirm stacking with volume discounts and referrals.
// Until approved: Essentials/Pro only; use the larger discount, never stack.
export function hasFoundingOffer(country: CountryPricing): boolean {
  return foundingOffer.enabled && country.status === "confirmed" && foundingOffer.countries.includes(country.code);
}
export function foundingOfferText(country: CountryPricing): string {
  return `Founding 100: the first 100 properties in ${country.name} get ${foundingOffer.discountPct}% off, locked for as long as you stay.`;
}
