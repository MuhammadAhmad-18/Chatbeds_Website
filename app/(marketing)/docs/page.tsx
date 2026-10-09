import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { PageHero, SectionIntro } from "@/components/MarketingPage";
import { contactEmail } from "@/lib/company";
import { pageMetadata } from "@/lib/page-metadata";

export const metadata = pageMetadata(
  "Developer documentation",
  "Contact ChatBeds for technical documentation and discuss your integration requirements. Explore the product overview of its complete PMS and WhatsApp operations.",
  "/docs",
);

export default function DeveloperDocsPage() {
  return (
    <>
      <PageHero
        eyebrow="CHATBEDS RESOURCES"
        title="Developer documentation."
        compact
      >
        <p>
          ChatBeds connects a complete property management system with WhatsApp
          operations. Discuss how your tools could fit your property workflow
          with the team.
        </p>
      </PageHero>
      <section className="page-section">
        <div className="container page-editorial">
          <SectionIntro
            eyebrow="TECHNICAL DOCUMENTATION"
            title="Tell us what you need to connect."
          >
            A public API reference is not published here. Contact the team to ask
            for technical documentation and discuss your integration requirements.
          </SectionIntro>
          <div className="page-prose">
            <p>
              Include the systems you use and the hotel workflow you want to
              connect, so the conversation can focus on your requirements.
            </p>
            <a
              href={`mailto:${contactEmail}?subject=ChatBeds%20documentation%20enquiry`}
              className="page-text-link"
            >
              Request technical documentation
              <ArrowUpRight size={17} aria-hidden="true" />
            </a>
            <div className="page-company-note">
              <span>PRODUCT OVERVIEW</span>
              <p>
                Explore how ChatBeds brings property operations and guest
                communication together. This is a product overview, rather than
                a technical integration guide.
              </p>
              <Link href="/integrations" className="page-text-link">
                View the integration overview
                <ArrowRight size={17} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
