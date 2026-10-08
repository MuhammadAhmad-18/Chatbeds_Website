import {
  CalendarDays,
  Clapperboard,
  MessageSquare,
  Sparkles,
  Workflow,
} from "lucide-react";
import { SectionHeading } from "./SectionHeading";
const features = [
  {
    Icon: MessageSquare,
    title: "Thoughtful replies, less typing.",
    name: "AI-assisted replies",
    text: "Start with a draft, add your team’s personal touch and send a helpful reply.",
  },
  {
    Icon: CalendarDays,
    title: "A clearer view of your rates.",
    name: "RevBot & AI calendar",
    text: "Bring rate suggestions and competitor context into your pricing workflow.",
  },
  {
    Icon: Workflow,
    title: "The next step, connected.",
    name: "Operational workflows",
    text: "Route updates to the right team and keep room status in step with the work.",
  },
  {
    Icon: Clapperboard,
    title: "Let your property tell its story.",
    name: "AI Tour Builder",
    text: "Turn your property photos into a cinematic tour for guests to explore.",
  },
];
export function AIFeatures() {
  return (
    <section id="ai" className="section ai-section">
      <div className="container">
        <div className="ai-heading">
          <SectionHeading
            eyebrow="PRACTICAL INTELLIGENCE"
            title={
              <>
                AI where it actually <br />
                <span className="text-muted-light">helps operations.</span>
              </>
            }
          >
            Useful assistance, built around real hotel work. Your team stays in
            control.
          </SectionHeading>
          <span className="ai-mark" aria-hidden="true">
            <Sparkles size={38} strokeWidth={1} />
          </span>
        </div>
        <div className="ai-grid">
          {features.map(({ Icon, title, name, text }) => (
            <article key={name}>
              <Icon size={24} strokeWidth={1.5} />
              <span>{name}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
