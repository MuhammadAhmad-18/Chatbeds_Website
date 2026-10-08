"use client";
import {
  ArrowUpRight,
  Check,
  LockKeyhole,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { PageLink } from "@/components/PageLink";
import {
  calcPlanPrice,
  calcFoundingPrice,
  formatMoney,
  formatPerRoom,
  recommendPlan,
} from "@/lib/pricing/calculate";
import { plans } from "@/lib/pricing/plans";
import type { CountryPricing, PricingSelection } from "@/lib/pricing/types";

// TODO: Confirm whether self-signup exists; only enable with an approved public URL.
const signupUrl = process.env.NEXT_PUBLIC_SIGNUP_URL?.trim();
export function PlanCards({
  country,
  selection,
}: {
  country: CountryPricing;
  selection: PricingSelection;
}) {
  if (country.status === "pending")
    return (
      <section id="plans" className="pricing-plan-section container">
        <div className="pricing-pending">
          <GlobeMark />
          <span className="eyebrow">LOCAL PRICING, MADE CLEAR</span>
          <h2>We’re finalising local pricing for {country.name}.</h2>
          <p>
            Tell us about your property and we’ll send exact prices in{" "}
            {country.currency}.
          </p>
          <PageLink href="/book-a-demo" className="button button-primary">
            Book a Demo
            <ArrowUpRight size={16} aria-hidden="true" />
          </PageLink>
          <div className="pricing-trust-line">
            <span>
              <Check size={14} aria-hidden="true" />
              No setup fee
            </span>
            <span>
              <Check size={14} aria-hidden="true" />
              No commission
            </span>
            <span>
              <Check size={14} aria-hidden="true" />
              Cancel any time
            </span>
          </div>
        </div>
      </section>
    );
  const recommended = recommendPlan(selection.rooms);
  return (
    <section
      id="plans"
      className="pricing-plan-section container"
      aria-label="Plans and prices"
    >
      <div className="pricing-plan-grid">
        {plans.map((plan) => {
          const price = calcPlanPrice({
            country,
            plan: plan.id,
            rooms: selection.rooms,
            billing: selection.billing,
          });
          const active = recommended === plan.id;
          const foundingPrice = calcFoundingPrice({ country, plan: plan.id, rooms: selection.rooms, billing: selection.billing });
          const effectiveMonthly =
            price.billedAmount === null
              ? null
              : selection.billing === "yearly"
                ? price.billedAmount / 12
                : price.monthlyTotal;
          return (
            <article
              key={plan.id}
              className={`pricing-plan${active ? " is-recommended" : ""}${!price.available ? " is-unavailable" : ""}`}
              aria-labelledby={`plan-${plan.id}`}
            >
              <div className="pricing-plan-label">
                {plan.id === "pro" ? (
                  <span
                    className={`pricing-most-hotels${active ? " active" : ""}`}
                  >
                    <Sparkles size={12} aria-hidden="true" />
                    Most hotels
                  </span>
                ) : active ? (
                  <span className="pricing-most-hotels active">
                    Fits your property
                  </span>
                ) : (
                  <span aria-hidden="true">&nbsp;</span>
                )}
              </div>
              <h2 id={`plan-${plan.id}`}>{plan.name}</h2>
              <p className="pricing-plan-audience">{plan.audience}</p>
              <div className="pricing-plan-price">
                {plan.id === "free" ? (
                  <>
                    <strong>Free</strong>
                    <span>No monthly plan fee</span>
                  </>
                ) : price.isQuote ? (
                  <>
                    <span className="pricing-from">from</span>
                    <strong>
                      {formatMoney(price.perRoomEffective!, country)}
                    </strong>
                    <span>per room / month</span>
                    <small>Minimum bill applies</small>
                  </>
                ) : (
                  <>
                    <strong key={`${selection.billing}-${price.billedAmount}`}>
                      {formatMoney(effectiveMonthly!, country)}
                      <small>/mo</small>
                    </strong>
                    <span>
                      {formatPerRoom(price.perRoomEffective!, country)} per room
                      / month
                      {price.volumeDiscountPct ? " before total rounding" : ""}
                    </span>
                    {selection.billing === "yearly" ? (
                      <small>
                        {formatMoney(price.billedAmount!, country)} billed
                        yearly · 2 months free
                      </small>
                    ) : (
                      <small>
                        For {selection.rooms}{" "}
                        {selection.rooms === 1 ? "room" : "rooms"} · billed
                        monthly
                      </small>
                    )}
                  </>
                )}
                {foundingPrice && (
                  <p className="pricing-founding-price">
                    Founding price: {formatMoney(selection.billing === "yearly" ? foundingPrice.billedAmount! / 12 : foundingPrice.monthlyTotal!, country)} / month
                    {selection.billing === "yearly" && <small>{formatMoney(foundingPrice.billedAmount!, country)} billed yearly</small>}
                  </p>
                )}
                {(plan.id === "essentials" || plan.id === "pro") && (
                  <p className="pricing-room-nights">
                    <Check size={13} aria-hidden="true" />={" "}
                    {price.roomNightsEquivalent!.toFixed(1)} room nights a month
                  </p>
                )}
              </div>
              <div className="pricing-volume-note">
                {price.volumeDiscountPct > 0 && (
                  <span>
                    {price.volumeDiscountPct}% volume discount applied
                  </span>
                )}
              </div>
              <ul>
                {plan.bullets.map((bullet) => (
                  <li key={bullet}>
                    <Check size={15} aria-hidden="true" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
              <div className="pricing-plan-actions">
                {!price.available ? (
                  <p>{price.reason}</p>
                ) : plan.id === "group" ? (
                  <PageLink className="button button-secondary" href="/contact">
                    {plan.cta}
                    <ArrowUpRight size={15} aria-hidden="true" />
                  </PageLink>
                ) : (
                  <>
                    {signupUrl ? (
                      <>
                        <a
                          className={`button ${active ? "button-primary" : "button-secondary"}`}
                          href={signupUrl}
                        >
                          Get started
                          <ArrowUpRight size={15} aria-hidden="true" />
                        </a>
                        <PageLink
                          href="/book-a-demo"
                          className="pricing-secondary-demo"
                        >
                          Book a Demo
                        </PageLink>
                      </>
                    ) : (
                      <PageLink
                        className={`button ${active ? "button-primary" : "button-secondary"}`}
                        href="/book-a-demo"
                      >
                        {plan.cta}
                        <ArrowUpRight size={15} aria-hidden="true" />
                      </PageLink>
                    )}
                  </>
                )}
              </div>
            </article>
          );
        })}
      </div>
      <p className="pricing-trademark-note">
        Based on a typical room rate of {formatMoney(country.typicalRoomRate, country)} a night.
      </p>
      <div className="pricing-trust-line">
        <span>
          <LockKeyhole size={14} aria-hidden="true" />
          Price locked for 12 months
        </span>
        <span>
          <ShieldCheck size={14} aria-hidden="true" />
          No setup fee
        </span>
        <span>
          <Check size={14} aria-hidden="true" />
          No commission
        </span>
      </div>
    </section>
  );
}
function GlobeMark() {
  return (
    <span className="pricing-pending-mark" aria-hidden="true">
      ↗
    </span>
  );
}
