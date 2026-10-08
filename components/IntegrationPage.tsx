import Link from "next/link";
import { ArrowRight, CalendarDays, Check, Globe2, Layers3 } from "lucide-react";
import { integrationPages, type IntegrationSlug } from "@/lib/integrations";
import {
  CheckList,
  FAQ,
  OperationsVisual,
  PageActions,
  PageCTA,
  PageHero,
  SectionIntro,
} from "./MarketingPage";

export function DistributionVisual() {
  return (
    <div className="distribution-visual">
      <span className="eyebrow">ROOMS, RATES AND AVAILABILITY</span>
      <div className="distribution-core">
        <Layers3 size={27} aria-hidden="true" />
        <strong>ChatBeds PMS</strong>
        <span>Rooms · Reservations · Rate plans</span>
      </div>
      <div className="distribution-lines" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
      <div className="distribution-channels">
        {["Airbnb", "Booking.com", "Vrbo"].map((name) => (
          <div key={name}>
            <Globe2 size={18} aria-hidden="true" />
            <strong>{name}</strong>
          </div>
        ))}
      </div>
      <div className="distribution-calendar">
        <CalendarDays size={20} aria-hidden="true" />
        <div>
          <strong>Calendar & availability synchronization</strong>
          <span>Linked rooms, rate plans and channel control</span>
        </div>
      </div>
      <p>
        <Check size={14} aria-hidden="true" />
        Part of your complete property platform
      </p>
    </div>
  );
}

export function IntegrationPage({ slug }: { slug: IntegrationSlug }) {
  const page = integrationPages[slug];
  return (
    <>
      <PageHero
        eyebrow={page.eyebrow}
        title={page.title}
        accent={page.accent}
        visual={
          page.mode === "distribution" ? (
            <DistributionVisual />
          ) : (
            <OperationsVisual mode={page.mode} />
          )
        }
      >
        <p>{page.description}</p>
        <PageActions secondary="All integrations" href="/integrations" />
      </PageHero>
      <section className="page-section">
        <div className="container page-editorial">
          <SectionIntro
            eyebrow="CONNECTED TO YOUR PROPERTY"
            title={page.storyTitle}
          />
          <div className="page-prose">
            <p>{page.story}</p>
            <Link href="/how-it-works" className="page-text-link">
              See how ChatBeds works
              <ArrowRight size={17} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
      <section className="page-section page-lavender">
        <div className="container">
          <SectionIntro title="Practical connections. Clear responsibilities." />
          <div className="page-feature-rows">
            {page.features.map((feature, i) => (
              <article key={feature.title}>
                <span className="page-row-number">0{i + 1}</span>
                <h3>{feature.title}</h3>
                <p>{feature.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="page-section">
        <div className="container page-editorial">
          <SectionIntro
            eyebrow="A CONVERSATION ABOUT SETUP"
            title="Start with the way your property works."
          >
            Use these points to prepare a focused conversation with the ChatBeds
            team.
          </SectionIntro>
          <CheckList items={page.setup} />
        </div>
      </section>
      <section className="page-section page-faq-section">
        <div className="container page-editorial">
          <SectionIntro eyebrow="GOOD QUESTIONS" title="Before you connect." />
          <FAQ items={page.faq} />
        </div>
      </section>
      <section className="page-related container">
        <h2>Explore another connection</h2>
        <div>
          {Object.entries(integrationPages)
            .filter(([key]) => key !== slug)
            .map(([key, item]) => (
              <Link key={key} href={`/integrations/${key}`}>
                {item.label}
                <ArrowRight size={17} aria-hidden="true" />
              </Link>
            ))}
        </div>
      </section>
      <PageCTA />
    </>
  );
}
