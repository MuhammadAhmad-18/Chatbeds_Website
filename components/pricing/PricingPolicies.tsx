import { Check } from "lucide-react";
import { guarantee, trial } from "@/lib/pricing/config";

export function PricingPolicies() {
  const active = [guarantee, trial].filter((policy) => policy.enabled && policy.text.trim());
  if (!active.length) return null;
  return (
    <ul className="container pricing-policy-list" aria-label="Pricing policies">
      {active.map((policy) => <li key={policy.text}><Check size={16} aria-hidden="true" />{policy.text}</li>)}
    </ul>
  );
}
