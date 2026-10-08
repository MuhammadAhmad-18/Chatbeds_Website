import { headers } from "next/headers";
import { pageMetadata } from "@/lib/page-metadata";
import { getCountry } from "@/lib/pricing/countries";
import { normaliseRooms } from "@/lib/pricing/calculate";
import { PricingHero } from "@/components/pricing/PricingHero";
import { PricingCalculator } from "@/components/pricing/PricingCalculator";
import { CompareTable } from "@/components/pricing/CompareTable";
import { WhatsAppCosts } from "@/components/pricing/WhatsAppCosts";
import { AddOns } from "@/components/pricing/AddOns";
import { NoSurprises } from "@/components/pricing/NoSurprises";
import { Testimonial } from "@/components/pricing/Testimonial";
import { CustomerLogos } from "@/components/pricing/CustomerLogos";
import { PageCTA } from "@/components/MarketingPage";
import "./pricing.css";

const description =
  "Simple per-room pricing in your own currency. No setup fees, no commission. Run your hotel from WhatsApp.";
export const metadata = {
  ...pageMetadata("Pricing", description, "/pricing"),
  title: "Pricing - ChatBeds",
  openGraph: {
    ...pageMetadata("Pricing", description, "/pricing").openGraph,
    title: "Pricing - ChatBeds",
  },
};
function single(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}
export default async function PricingPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const countryCode =
    single(params.country) ??
    (await headers()).get("x-vercel-ip-country") ??
    "PK";
  const country = getCountry(countryCode);
  const initial = {
    country: country.code,
    rooms: normaliseRooms(Number(single(params.rooms) ?? 20)),
    billing:
      single(params.billing) === "yearly"
        ? ("yearly" as const)
        : ("monthly" as const),
  };
  return (
    <div className="pricing-page">
      <PricingHero country={country} />
      <PricingCalculator initial={initial} details={<><CustomerLogos /><Testimonial /><CompareTable /><WhatsAppCosts /></>} beforeFAQ={<><AddOns /><NoSurprises /></>}>
        <div className="pricing-final-cta">
          <PageCTA title="Ready to run your property differently?">
            Tell us about your property and we’ll show you how ChatBeds works
            for your team.
          </PageCTA>
        </div>
      </PricingCalculator>
    </div>
  );
}
