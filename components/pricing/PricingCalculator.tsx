"use client";
import { useEffect, useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { getCountry } from "@/lib/pricing/countries";
import {
  calcPlanPrice,
  formatMoney,
  normaliseRooms,
} from "@/lib/pricing/calculate";
import type { PricingSelection } from "@/lib/pricing/types";
import { PricingControls } from "./PricingControls";
import { PlanCards } from "./PlanCards";
import { PayAsYouStay } from "./PayAsYouStay";
import { FoundingOffer } from "./FoundingOffer";
import { WaysToSave } from "./WaysToSave";
import { PaymentMethods } from "./PaymentMethods";
import { PricingPolicies } from "./PricingPolicies";
import { PricingFAQ } from "./PricingFAQ";

export function PricingCalculator({
  initial,
  children,
  details,
  beforeFAQ,
}: {
  initial: PricingSelection;
  children: ReactNode;
  details: ReactNode;
  beforeFAQ: ReactNode;
}) {
  const [selection, setSelection] = useState(initial);
  const [announcement, setAnnouncement] = useState("");
  const incomingKey = JSON.stringify(initial);
  const [seenInitial, setSeenInitial] = useState(incomingKey);
  const [requestedSelections, setRequestedSelections] = useState<
    ReadonlySet<string>
  >(() => new Set());
  // Server responses to our own debounced replacements must not overwrite newer input.
  // A genuinely new page selection (including browser navigation) restores its values.
  if (seenInitial !== incomingKey) {
    setSeenInitial(incomingKey);
    if (!requestedSelections.has(incomingKey)) setSelection(initial);
    const remaining = new Set(requestedSelections);
    remaining.delete(incomingKey);
    setRequestedSelections(remaining);
  }
  const router = useRouter();
  const country = getCountry(selection.country);
  useEffect(() => {
    const timer = window.setTimeout(() => {
      const url = new URL(window.location.href);
      url.searchParams.set("country", selection.country);
      url.searchParams.set("rooms", String(selection.rooms));
      url.searchParams.set("billing", selection.billing);
      const next = `${url.pathname}${url.search}${url.hash}`;
      if (
        next !==
        `${window.location.pathname}${window.location.search}${window.location.hash}`
      ) {
        setRequestedSelections(
          (previous) => new Set([...previous, JSON.stringify(selection)]),
        );
        router.replace(next, { scroll: false });
      }
      const pro = calcPlanPrice({
        country,
        plan: "pro",
        rooms: selection.rooms,
        billing: selection.billing,
      });
      const essentials = calcPlanPrice({
        country,
        plan: "essentials",
        rooms: selection.rooms,
        billing: selection.billing,
      });
      setAnnouncement(
        country.status === "pending"
          ? `Local pricing for ${country.name} is being finalised.`
          : `Prices for ${country.name}, ${selection.rooms} ${selection.rooms === 1 ? "room" : "rooms"}, ${selection.billing} billing. ${selection.rooms <= 3 ? "Free is available for your property. " : ""}Essentials ${formatMoney(essentials.billedAmount!, country)}, Pro ${formatMoney(pro.billedAmount!, country)} ${selection.billing === "yearly" ? "per year" : "per month"}.`,
      );
    }, 400);
    return () => window.clearTimeout(timer);
  }, [selection, country, router]);
  useEffect(() => {
    const restore = () => {
      const params = new URLSearchParams(window.location.search);
      setSelection({
        country: getCountry(params.get("country") ?? initial.country).code,
        rooms: normaliseRooms(Number(params.get("rooms") ?? 20)),
        billing: params.get("billing") === "yearly" ? "yearly" : "monthly",
      });
    };
    window.addEventListener("popstate", restore);
    return () => window.removeEventListener("popstate", restore);
  }, [initial.country]);
  return (
    <>
      <PricingControls
        selection={selection}
        onChange={setSelection}
        announcement={announcement}
      />
      <FoundingOffer country={country} />
      <PlanCards country={country} selection={selection} />
      <PayAsYouStay country={country} rooms={selection.rooms} />
      <PaymentMethods country={country} />
      <PricingPolicies />
      {details}
      <WaysToSave country={country} />
      {beforeFAQ}
      <PricingFAQ country={country} />
      {children}
    </>
  );
}
