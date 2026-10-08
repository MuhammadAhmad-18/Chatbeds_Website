import { FAQ } from "@/components/MarketingPage";
import { pricingFAQ } from "@/lib/pricing/faq";
import type { CountryPricing } from "@/lib/pricing/types";
export function PricingFAQ({ country }: { country: CountryPricing }) {
  const items = pricingFAQ(country);
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
  return (
    <section id="pricing-faq" className="pricing-section pricing-faq">
      <div className="container pricing-two-column">
        <div className="pricing-section-heading">
          <span className="eyebrow">A FEW MORE DETAILS</span>
          <h2>
            Good questions. <br />
            <span>Straight answers.</span>
          </h2>
          <p>
            Everything else you might want to know before choosing your plan.
          </p>
        </div>
        <FAQ items={items} />
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema).replace(/</g, "\\u003c"),
        }}
      />
    </section>
  );
}
