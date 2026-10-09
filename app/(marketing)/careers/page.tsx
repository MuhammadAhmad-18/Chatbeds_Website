import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHero, SectionIntro } from "@/components/MarketingPage";
import { OpenPositions } from "@/components/OpenPositions";
import { pageMetadata } from "@/lib/page-metadata";

export const metadata = pageMetadata(
  "Careers",
  "Learn about the product behind ChatBeds and find published open positions, role details and application links. A complete PMS with WhatsApp operations for hospitality teams.",
  "/careers",
);

export default function CareersPage() {
  return (
    <>
      <PageHero eyebrow="CAREERS AT CHATBEDS" title="Connect the work behind every stay." compact>
        <p>
          ChatBeds brings a complete PMS and WhatsApp operations together, so
          management and frontline teams share one view of the property.
        </p>
      </PageHero>
      <section className="page-section">
        <div className="container page-editorial">
          <SectionIntro
            eyebrow="THE PRODUCT WE BUILD"
            title="One property. Many people working together."
          >
            Reservations, housekeeping, maintenance, finance and guest
            communication all belong to the same operation.
          </SectionIntro>
          <div className="page-prose">
            <p>
              Management gets the control of a complete property management
              system. Cleaners, maintenance staff and supervisors receive
              operational messages and report work through WhatsApp, keeping the
              PMS in sync.
            </p>
            <Link href="/about" className="page-text-link">
              Learn about ChatBeds
              <ArrowRight size={17} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
      <OpenPositions />
    </>
  );
}
