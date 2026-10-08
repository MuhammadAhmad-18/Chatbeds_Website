import Link from "next/link";
import {
  ArrowUpRight,
  Globe2,
  MessagesSquare,
  MessageCircle,
} from "lucide-react";
import {
  PageHero,
  PageActions,
  PageCTA,
  PropertyConnectionVisual,
  SectionIntro,
} from "@/components/MarketingPage";
import { pageMetadata } from "@/lib/page-metadata";
import { integrationPages } from "@/lib/integrations";

export const metadata = pageMetadata(
  "Integrations",
  "Connect WhatsApp operations, guest messaging and distribution calendars with the complete ChatBeds property management system.",
  "/integrations",
);
const icons = [MessageCircle, MessagesSquare, Globe2];
export default function IntegrationsPage() {
  return (
    <>
      <PageHero
        eyebrow="CONNECTED WITH CHATBEDS"
        title="The conversations. The channels."
        accent="One property platform."
        visual={<PropertyConnectionVisual />}
      >
        <p>
          Connect the tools your teams and guests use with the PMS running your
          property. Keep operational work, guest communication and distribution
          in the same picture.
        </p>
        <PageActions secondary="Explore connections" href="#connections" />
      </PageHero>
      <section className="page-section" id="connections">
        <div className="container">
          <SectionIntro
            eyebrow="THREE WAYS TO CONNECT"
            title="Built around your everyday operation."
          />
          <div className="integration-index">
            {Object.entries(integrationPages).map(([slug, page], i) => {
              const Icon = icons[i];
              return (
                <article key={slug}>
                  <span className="integration-index-icon">
                    <Icon size={25} aria-hidden="true" />
                  </span>
                  <div>
                    <span className="eyebrow">0{i + 1}</span>
                    <h3>{page.label}</h3>
                    <p>{page.description}</p>
                    <Link
                      href={`/integrations/${slug}`}
                      className="page-text-link"
                    >
                      Explore {page.label.toLowerCase()}
                      <ArrowUpRight size={17} aria-hidden="true" />
                    </Link>
                  </div>
                  <div className="integration-index-tags">
                    {(i === 0
                      ? ["Staff alerts", "Operational replies", "PMS updates"]
                      : i === 1
                        ? [
                            "Unified Inbox",
                            "Assisted replies",
                            "Guest journeys",
                          ]
                        : ["Calendar sync", "Linked rooms", "Rate plans"]
                    ).map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>
      <section className="page-section page-peach">
        <div className="container page-editorial">
          <SectionIntro title="Start with your workflows, then review the connections." />
          <div className="page-prose">
            <p>
              Every property has its own staff structure, guest journeys and
              channel mix. Bring those details to a demo so the team can walk
              through the connections that matter to your operation.
            </p>
          </div>
        </div>
      </section>
      <PageCTA title="Connect the work around your property." />
    </>
  );
}
