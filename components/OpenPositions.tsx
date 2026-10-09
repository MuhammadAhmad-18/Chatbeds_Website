import { ArrowUpRight } from "lucide-react";
import { openPositions, type OpenPosition } from "@/lib/careers";
import { SectionIntro } from "./MarketingPage";

function validApplicationUrl(value: string): boolean {
  try {
    const url = new URL(value);
    return (
      (url.protocol === "https:" && Boolean(url.hostname)) ||
      (url.protocol === "mailto:" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(url.pathname))
    );
  } catch {
    return false;
  }
}

export function OpenPositions({
  positions = openPositions,
}: {
  positions?: readonly OpenPosition[];
}) {
  const publishedPositions = positions.filter(
    (position) => position.title.trim() && position.description.trim() && validApplicationUrl(position.applicationUrl),
  );

  return (
    <section id="open-positions" className="page-section page-lavender" aria-label="Open positions">
      <div className="container page-editorial">
        <SectionIntro eyebrow="WORK WITH CHATBEDS" title="Open positions">
          Explore role details and application information when positions are
          published.
        </SectionIntro>
        {publishedPositions.length === 0 ? (
          <div className="page-prose careers-position">
            <p>No roles have been published on this page yet.</p>
            <p>
              Role details and application links will appear here when posted.
            </p>
          </div>
        ) : (
          <ul className="careers-positions-list">
            {publishedPositions.map((position) => {
              const details = [position.department, position.location, position.employmentType]
                .map((value) => value?.trim())
                .filter(Boolean);
              const external = new URL(position.applicationUrl).protocol === "https:";
              return (
                <li key={position.id}>
                  <article className="page-prose careers-position">
                    <h3>{position.title}</h3>
                    {details.length > 0 && <p className="careers-position-meta">{details.join(" · ")}</p>}
                    <p>{position.description}</p>
                    <a
                      href={position.applicationUrl}
                      className="page-text-link"
                      target={external ? "_blank" : undefined}
                      rel={external ? "noopener noreferrer" : undefined}
                    >
                      Apply for {position.title}
                      <ArrowUpRight size={17} aria-hidden="true" />
                    </a>
                  </article>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </section>
  );
}
