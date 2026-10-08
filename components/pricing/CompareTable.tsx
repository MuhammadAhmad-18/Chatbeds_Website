"use client";
import { useState } from "react";
import { Check, ChevronDown, Minus } from "lucide-react";
import { featureGroups, plans } from "@/lib/pricing/plans";
import type { PlanId } from "@/lib/pricing/types";
function FeatureValue({ value }: { value: boolean | string }) {
  return typeof value === "boolean" ? (
    <span
      className={`pricing-feature-value ${value ? "included" : "excluded"}`}
    >
      {value ? (
        <Check size={18} aria-hidden="true" />
      ) : (
        <Minus size={18} aria-hidden="true" />
      )}
      <span className="sr-only">{value ? "Included" : "Not included"}</span>
    </span>
  ) : (
    <span>{value}</span>
  );
}
export function CompareTable() {
  const [selected, setSelected] = useState<PlanId>("pro");
  return (
    <section id="compare" className="pricing-section pricing-compare">
      <div className="container">
        <div className="pricing-section-heading">
          <span className="eyebrow">THE DETAILS, SIDE BY SIDE</span>
          <h2>
            A complete PMS. <br />
            <span>The right fit for your team.</span>
          </h2>
          <p>
            Start with the essentials. Add guest messaging, revenue tools and
            group visibility as your operation grows.
          </p>
        </div>
        <div className="pricing-table-desktop">
          <table>
            <caption className="sr-only">
              ChatBeds plan features: Free, Essentials, Pro and Group
            </caption>
            <thead>
              <tr>
                <th scope="col">What’s included</th>
                {plans.map((plan) => (
                  <th
                    key={plan.id}
                    scope="col"
                    className={plan.id === "pro" ? "pricing-pro-column" : ""}
                  >
                    {plan.name}
                  </th>
                ))}
              </tr>
            </thead>
            {featureGroups.map((group) => (
              <tbody
                key={group.title}
                aria-labelledby={`feature-group-${group.title.replaceAll(" ", "-").toLowerCase()}`}
              >
                <tr className="pricing-table-group">
                  <td
                    colSpan={5}
                    id={`feature-group-${group.title.replaceAll(" ", "-").toLowerCase()}`}
                  >
                    {group.title}
                  </td>
                </tr>
                {group.rows.map((row) => (
                  <tr key={row.label}>
                    <th scope="row">{row.label}</th>
                    {plans.map((plan) => (
                      <td
                        key={plan.id}
                        className={
                          plan.id === "pro" ? "pricing-pro-column" : ""
                        }
                      >
                        <FeatureValue value={row.values[plan.id]} />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            ))}
          </table>
        </div>
        <div className="pricing-compare-mobile">
          <fieldset className="pricing-plan-picker">
            <legend>Compare a plan</legend>
            <div>
              {plans.map((plan) => (
                <label key={plan.id}>
                  <input
                    type="radio"
                    name="compare-plan"
                    value={plan.id}
                    checked={selected === plan.id}
                    onChange={() => setSelected(plan.id)}
                  />
                  <span>{plan.name}</span>
                </label>
              ))}
            </div>
          </fieldset>
          {featureGroups.map((group, index) => (
            <details key={group.title} open={index === 0}>
              <summary>
                {group.title}
                <ChevronDown size={18} aria-hidden="true" />
              </summary>
              <dl>
                {group.rows.map((row) => (
                  <div key={row.label}>
                    <dt>{row.label}</dt>
                    <dd>
                      <FeatureValue value={row.values[selected]} />
                    </dd>
                  </div>
                ))}
              </dl>
            </details>
          ))}
        </div>
        <p className="pricing-trademark-note">
          Airbnb, Booking.com and Vrbo are trademarks of their respective
          owners. ChatBeds is not endorsed by or affiliated with them.
        </p>
      </div>
    </section>
  );
}
