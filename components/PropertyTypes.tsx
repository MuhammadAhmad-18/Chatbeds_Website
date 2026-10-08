import { Building2, Building, Hotel, House, KeyRound } from "lucide-react";
import { SectionHeading } from "./SectionHeading";
const properties = [
  {
    Icon: Hotel,
    title: "Hotels",
    text: "A shared operating rhythm for front desk, housekeeping and every stay.",
  },
  {
    Icon: House,
    title: "Guest Houses",
    text: "Keep a personal welcome and give the team a simple way to stay connected.",
  },
  {
    Icon: KeyRound,
    title: "Serviced Apartments",
    text: "Coordinate longer stays, unit readiness and the details between arrivals.",
  },
  {
    Icon: Building,
    title: "Vacation Rentals",
    text: "Bring reservations, turnovers and guest conversations into one place.",
  },
  {
    Icon: Building2,
    title: "Multi-property Groups",
    text: "Connect local teams while management keeps a view across properties.",
  },
];
export function PropertyTypes() {
  return (
    <section id="solutions" className="section property-section">
      <div className="container">
        <SectionHeading
          eyebrow="HOSPITALITY COMES IN MANY FORMS"
          title={
            <>
              Built for modern <br />
              <span className="text-muted-light">hospitality teams.</span>
            </>
          }
        >
          One property or a growing portfolio. The right tools for the way you
          operate.
        </SectionHeading>
        <div className="property-list">
          {properties.map(({ Icon, title, text }, index) => (
            <article key={title}>
              <span className="property-index">0{index + 1}</span>
              <Icon size={27} strokeWidth={1.4} />
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
