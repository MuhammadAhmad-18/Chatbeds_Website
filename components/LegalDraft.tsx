import { PageHero } from "./MarketingPage";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { company, contactEmail } from "@/lib/company";
import type { LegalPolicy } from "@/lib/legal-content";

export function LegalDraft({ policy }: { policy: LegalPolicy }) {
  return (
    <>
      <PageHero eyebrow="LEGAL" title={policy.title} compact>
        <p role="note">Draft, pending legal review</p>
      </PageHero>
      <section className="page-section">
        <div className="container legal-document page-prose">
          <p className="legal-introduction">{policy.introduction}</p>
          {policy.sections.map((section, index) => (
            <section className="legal-policy-section" key={section.id} aria-labelledby={section.id}>
              <h2 id={section.id}>
                <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                {section.title}
              </h2>
              {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              {section.links?.map((link) => (
                <Link key={link.href} href={link.href} className="page-text-link">
                  {link.label}<ArrowRight size={17} aria-hidden="true" />
                </Link>
              ))}
            </section>
          ))}
          <section className="legal-policy-section legal-contact" aria-labelledby="legal-contact-title">
            <h2 id="legal-contact-title"><span aria-hidden="true">{String(policy.sections.length + 1).padStart(2, "0")}</span>Contact</h2>
            <p>For questions about this draft or your enquiry information, contact the ChatBeds team.</p>
            <a className="page-text-link" href={`mailto:${contactEmail}`}>{contactEmail}<ArrowRight size={17} aria-hidden="true" /></a>
            <address>{company.parentName}<br />{company.address}</address>
          </section>
          <div className="legal-related">
            <span>Related policy</span>
            <Link href={policy.relatedPolicy.href} className="page-text-link">
              {policy.relatedPolicy.label}<ArrowRight size={17} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
