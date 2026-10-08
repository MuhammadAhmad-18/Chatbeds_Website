import Link from "next/link";
import {
  ArrowUpRight,
  Building2,
  ClipboardList,
  Layers3,
  UsersRound,
} from "lucide-react";
import {
  CheckList,
  FAQ,
  PageHero,
  PageCTA,
  SectionIntro,
} from "@/components/MarketingPage";
import { pageMetadata } from "@/lib/page-metadata";
import { DemoLink } from "@/components/DemoLink";

export const metadata = pageMetadata(
  "Pricing for your property",
  "Talk with ChatBeds about your property, team and workflows. Get current pricing and explore the complete PMS with WhatsApp operations.",
  "/pricing",
);
const scope = [
  {
    icon: Building2,
    title: "Your property",
    text: "Property type, rooms or units, and the number of properties you manage.",
  },
  {
    icon: UsersRound,
    title: "Your teams",
    text: "Front desk, housekeeping, maintenance and the people who need operational visibility.",
  },
  {
    icon: ClipboardList,
    title: "Your workflows",
    text: "The handovers, guest journeys and reporting needs you want to bring together.",
  },
  {
    icon: Layers3,
    title: "Your connections",
    text: "The WhatsApp conversations, booking channels and calendars used by your property.",
  },
];
export default function PricingPage() {
  return (
    <>
      <PageHero
        eyebrow="CHATBEDS PRICING"
        title="Find the right fit"
        accent="for your property."
        compact
      >
        <p>
          Talk through your property, your team and the way you work. Get
          current pricing from the ChatBeds team, with a clear conversation
          about the platform you need.
        </p>
      </PageHero>
      <section className="page-section page-pricing-section">
        <div className="container pricing-layout">
          <div>
            <SectionIntro
              eyebrow="MAKE THE CONVERSATION USEFUL"
              title="Start with the operation you run."
            />
            <div className="pricing-scope">
              {scope.map(({ icon: Icon, title, text }) => (
                <article key={title}>
                  <Icon size={23} aria-hidden="true" />
                  <div>
                    <h3>{title}</h3>
                    <p>{text}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
          <aside className="pricing-conversation">
            <span className="eyebrow">YOUR PROPERTY, IN CONTEXT</span>
            <h2>
              A complete PMS.
              <br />A focused conversation.
            </h2>
            <p>
              Walk through the platform and discuss pricing with the team. Bring
              your property details and the work you want to connect.
            </p>
            <CheckList
              items={[
                "Review reservations, rooms and front desk",
                "Follow a WhatsApp operations workflow",
                "Discuss guest communication and commercial tools",
                "Ask for current pricing for your requirements",
              ]}
            />
            <DemoLink className="button button-primary">
              Book a Demo
              <ArrowUpRight size={17} aria-hidden="true" />
            </DemoLink>
            <Link href="/contact" className="page-text-link">
              Ask about pricing
              <ArrowUpRight size={16} aria-hidden="true" />
            </Link>
          </aside>
        </div>
      </section>
      <section className="page-section page-lavender">
        <div className="container page-editorial">
          <SectionIntro
            eyebrow="PLATFORM BREADTH"
            title="Consider the whole property, from the start."
          />
          <div className="page-prose">
            <p>
              ChatBeds brings together front office, housekeeping, maintenance,
              staff, inventory, finance, night audit, revenue, distribution,
              guest communication and reports.
            </p>
            <p>
              Use the demo to explore the capabilities relevant to your
              operation, then discuss your commercial requirements directly with
              the team.
            </p>
            <Link href="/#platform" className="page-text-link">
              Explore the platform
              <ArrowUpRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
      <section className="page-section">
        <div className="container page-editorial">
          <SectionIntro
            eyebrow="PRICING QUESTIONS"
            title="What to know before we talk."
          />
          <FAQ
            items={[
              {
                question: "Where can I get current pricing?",
                answer:
                  "Contact the ChatBeds team or book a demo to discuss your requirements and request current pricing.",
              },
              {
                question: "What details should I bring?",
                answer:
                  "Your property type, room or unit count, number of properties, teams and current booking channels will help make the conversation specific to your operation.",
              },
              {
                question: "Can I see WhatsApp operations before deciding?",
                answer:
                  "Yes. Ask to follow a checkout through cleaning, inspection and room readiness, with the staff conversation shown alongside the PMS.",
              },
              {
                question: "Can we discuss more than one property?",
                answer:
                  "Yes. ChatBeds includes multi-property management. Bring the properties and teams you manage so the demo and pricing conversation can address that context.",
              },
            ]}
          />
        </div>
      </section>
      <PageCTA title="Let’s talk about the way your property runs." />
    </>
  );
}
