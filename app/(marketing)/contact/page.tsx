import { DemoLink } from "@/components/DemoLink";
import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import { EnquiryForm } from "@/components/EnquiryForm";
import { PageHero } from "@/components/MarketingPage";
import { company, contactEmail } from "@/lib/company";
import { pageMetadata } from "@/lib/page-metadata";

export const metadata = pageMetadata(
  "Contact us",
  "Talk to ChatBeds about your property, product enquiries, pricing or account access. Email contact@chatbeds.app or call +1 (601) 978-7767.",
  "/contact",
);
export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="CONTACT CHATBEDS"
        title="Let’s talk about"
        accent="your property."
        compact
      >
        <p>
          Exploring a new PMS, connecting your team or finding your way back to
          your account? Start a conversation with the ChatBeds team.
        </p>
      </PageHero>
      <section className="page-section page-contact-section">
        <div className="container contact-layout">
          <div className="contact-details">
            <h2>A real conversation starts here.</h2>
            <p>
              Tell us what you run and what you would like to improve. For
              account help, include your property name and the email associated
              with your account. Please do not share passwords.
            </p>
            <address className="page-contact-address">
              <a href={`mailto:${contactEmail}`}>
                <Mail size={21} aria-hidden="true" />
                <span>
                  <small>EMAIL</small>
                  <strong>{contactEmail}</strong>
                </span>
                <ArrowUpRight size={16} aria-hidden="true" />
              </a>
              <a href={company.phoneHref}>
                <Phone size={21} aria-hidden="true" />
                <span>
                  <small>PHONE</small>
                  <strong>{company.phone}</strong>
                </span>
                <ArrowUpRight size={16} aria-hidden="true" />
              </a>
              <div>
                <MapPin size={21} aria-hidden="true" />
                <span>
                  <small>ADDRESS</small>
                  <strong>{company.address}</strong>
                </span>
              </div>
            </address>
            <div className="contact-product-note">
              <span>A proud product of</span>
              <a
                href={company.parentUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                {company.parentName}
                <ArrowUpRight size={16} aria-hidden="true" />
              </a>
            </div>
            <div className="contact-demo-note">
              <h3>Want to see the platform?</h3>
              <p>Explore the complete PMS and a connected WhatsApp workflow.</p>
              <DemoLink className="page-text-link">
                Book a Demo
                <ArrowUpRight size={17} aria-hidden="true" />
              </DemoLink>
            </div>
          </div>
          <div className="page-form-panel">
            <EnquiryForm kind="contact" />
          </div>
        </div>
      </section>
    </>
  );
}
