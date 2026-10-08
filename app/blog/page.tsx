import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Check, MessageCircle } from "lucide-react";
import { pageMetadata } from "@/lib/page-metadata";

export const metadata: Metadata = pageMetadata(
  "Practical guides for hospitality teams",
  "Explore practical guides to connected hotel operations: housekeeping, maintenance and the front desk, with WhatsApp work connected to a complete PMS.",
  "/blog",
);

export default function BlogPage() {
  return (
    <div className="container blog-index">
      <header className="blog-intro">
        <span className="eyebrow">THE CHATBEDS BLOG</span>
        <h1>
          Good operations.
          <br />
          <span>One conversation at a time.</span>
        </h1>
        <p>
          Practical guides to the work behind every stay. See how connected
          teams keep the property moving.
        </p>
      </header>
      <article className="blog-feature">
        <div className="blog-feature-copy">
          <span className="blog-category">OPERATIONS GUIDE</span>
          <h2>
            <Link href="/blog/housekeeping-from-whatsapp">
              From checkout to Ready: housekeeping from WhatsApp.
            </Link>
          </h2>
          <p>
            A room changes hands several times before the next guest arrives.
            Follow Room 301 through cleaning, inspection and back to your front
            desk.
          </p>
          <Link
            className="blog-read-link"
            href="/blog/housekeeping-from-whatsapp"
          >
            Read the guide <ArrowUpRight size={18} aria-hidden="true" />
          </Link>
        </div>
        <figure
          className="blog-workflow"
          aria-label="Housekeeping workflow example"
        >
          <span className="blog-room-label">ROOM 301 · EXAMPLE WORKFLOW</span>
          <div className="blog-status">
            <span>Guest checks out</span>
            <small>To clean</small>
          </div>
          <div className="blog-chat">
            <MessageCircle size={19} aria-hidden="true" />
            <span>301 clean</span>
            <Check size={17} aria-hidden="true" />
          </div>
          <div className="blog-status">
            <span>Supervisor inspects</span>
            <small className="blog-ready">
              Ready <Check size={12} aria-hidden="true" />
            </small>
          </div>
          <p>WhatsApp updates. One connected PMS.</p>
        </figure>
      </article>
      <section className="blog-more" aria-labelledby="more-guides">
        <h2 id="more-guides">More from the property floor.</h2>
        <div className="blog-guide-list">
          <article>
            <span className="blog-category">MAINTENANCE GUIDE</span>
            <h3>
              <Link href="/blog/maintenance-from-whatsapp">
                A room issue. A clear ticket. A connected team.
              </Link>
            </h3>
            <p>
              Turn a specific room report into work your maintenance team can
              track. Keep assignment and completion in the property picture.
            </p>
            <Link
              href="/blog/maintenance-from-whatsapp"
              className="blog-read-link"
            >
              Read the guide
              <ArrowUpRight size={17} aria-hidden="true" />
            </Link>
          </article>
          <article>
            <span className="blog-category">FRONT DESK GUIDE</span>
            <h3>
              <Link href="/blog/connected-front-desk">
                Your front desk needs the whole room story.
              </Link>
            </h3>
            <p>
              Connect arrivals and room timelines with readiness, maintenance
              and the guest conversation behind each stay.
            </p>
            <Link href="/blog/connected-front-desk" className="blog-read-link">
              Read the guide
              <ArrowUpRight size={17} aria-hidden="true" />
            </Link>
          </article>
        </div>
      </section>
    </div>
  );
}
