import { ArrowUpRight } from "lucide-react";
import { PageLink } from "@/components/PageLink";
// TODO: Confirm prices for AI tour videos and a second WhatsApp number.
const addons = [
  {
    name: "Owner Portal on Pro",
    value: "20% of your plan fee",
    note: "Included in Group",
  },
  {
    name: "AI tour videos",
    value: "Ask us for current pricing",
    note: "Priced per video",
  },
  {
    name: "Second WhatsApp number",
    value: "Ask us for current pricing",
    note: "For your property",
  },
];
export function AddOns() {
  return (
    <section className="pricing-section pricing-addons">
      <div className="container pricing-two-column">
        <div className="pricing-section-heading">
          <span className="eyebrow">WHEN YOU NEED A LITTLE MORE</span>
          <h2>A few useful extras.</h2>
          <p>
            Add the tools that fit your property. Ask us about the details
            before you decide.
          </p>
          <PageLink href="/contact" className="page-text-link">
            Talk to our team
            <ArrowUpRight size={16} aria-hidden="true" />
          </PageLink>
        </div>
        <table>
          <caption className="sr-only">Optional ChatBeds add-ons</caption>
          <thead>
            <tr>
              <th scope="col">Add-on</th>
              <th scope="col">Pricing</th>
            </tr>
          </thead>
          <tbody>
            {addons.map((addon) => (
              <tr key={addon.name}>
                <th scope="row">
                  {addon.name}
                  <small>{addon.note}</small>
                </th>
                <td>{addon.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
