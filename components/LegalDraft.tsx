import { PageHero } from "./MarketingPage";

export function LegalDraft({ title, headings }: { title: string; headings: readonly string[] }) {
  return (
    <>
      <PageHero eyebrow="LEGAL" title={title} compact>
        <p role="note">Draft, pending legal review</p>
      </PageHero>
      <section className="page-section">
        <div className="container">
          {headings.map((heading) => (
            <div className="page-section-intro" key={heading}><h2>{heading}</h2></div>
          ))}
        </div>
      </section>
    </>
  );
}
