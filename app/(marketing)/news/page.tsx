import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { PageHero, SectionIntro } from "@/components/MarketingPage";
import { pageMetadata } from "@/lib/page-metadata";

export const metadata = pageMetadata(
  "News",
  "Company announcements from ChatBeds. Read practical hospitality guides or contact the team for company and press enquiries.",
  "/news",
);

export default function NewsPage() {
  return (
    <>
      <PageHero eyebrow="CHATBEDS NEWS" title="News from ChatBeds." compact>
        <p>Company announcements and updates, in one place.</p>
      </PageHero>
      <section className="page-section">
        <div className="container page-editorial">
          <SectionIntro
            eyebrow="COMPANY ANNOUNCEMENTS"
            title="Updates will appear here when published."
          >
            There are no company announcements published here yet.
          </SectionIntro>
          <div className="page-prose">
            <p>
              In the meantime, explore practical guides to connected hotel
              operations, housekeeping and guest communication on the ChatBeds
              Blog.
            </p>
            <Link href="/blog" className="page-text-link">
              Read the Blog
              <ArrowRight size={17} aria-hidden="true" />
            </Link>
            <div className="page-company-note">
              <span>COMPANY &amp; PRESS ENQUIRIES</span>
              <p>
                Have a question about ChatBeds or need information for a story?
                Get in touch with the team.
              </p>
              <Link href="/contact" className="page-text-link">
                Contact us
                <ArrowUpRight size={17} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
