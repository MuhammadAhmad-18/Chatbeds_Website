import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { DemoLink } from "./DemoLink";

export type GuideSection = { title: string; text: string; command?: string };
export function BlogGuide({
  title,
  intro,
  lead,
  sections,
  takeaway,
  takeawayText,
  relatedHref,
  relatedTitle,
}: {
  title: string;
  intro: string;
  lead: string;
  sections: readonly GuideSection[];
  takeaway: string;
  takeawayText: string;
  relatedHref: string;
  relatedTitle: string;
}) {
  return (
    <article className="container guide-page">
      <Link href="/blog" className="guide-back">
        <ArrowLeft size={16} aria-hidden="true" />
        All guides
      </Link>
      <header className="guide-header">
        <span className="eyebrow">OPERATIONS GUIDE</span>
        <h1>{title}</h1>
        <p>{intro}</p>
      </header>
      <div className="guide-body">
        <p className="guide-lead">{lead}</p>
        <ol className="guide-steps">
          {sections.map((section, i) => (
            <li key={section.title}>
              <span className="guide-step-number" aria-hidden="true">
                0{i + 1}
              </span>
              <div>
                <h2>{section.title}</h2>
                <p>{section.text}</p>
                {section.command && (
                  <code className="guide-command">{section.command}</code>
                )}
              </div>
            </li>
          ))}
        </ol>
        <aside className="guide-takeaway">
          <h2>{takeaway}</h2>
          <p>{takeawayText}</p>
          <Link href={relatedHref} className="page-text-link">
            {relatedTitle}
            <ArrowUpRight size={16} aria-hidden="true" />
          </Link>
        </aside>
        <div className="guide-cta">
          <h2>Bring your own handovers to a demo.</h2>
          <p>
            Explore the operational workflow alongside the reservations, rooms,
            staff and guest tools behind it.
          </p>
          <DemoLink className="button button-primary">
            Book a Demo
            <ArrowUpRight size={17} aria-hidden="true" />
          </DemoLink>
          <Link href="/how-it-works">
            See how it works
            <ArrowUpRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </article>
  );
}
