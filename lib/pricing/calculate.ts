import type {
  BillingCycle,
  CountryPricing,
  PayAsYouStayPrice,
  PlanId,
  PlanPrice,
} from "./types";
import { foundingOffer, hasFoundingOffer } from "./config";

export const volumeDiscounts = [
  { aboveRooms: 150, percent: 25 },
  { aboveRooms: 50, percent: 15 },
] as const;
// TODO: Confirm with business whether discount is whole-bill or marginal.
// TODO: Confirm whether totals should round to the nearest 100 PKR.
// Assumption: apply each country's totalStep uniformly, including small properties.
export function normaliseRooms(value: number): number {
  return Number.isFinite(value)
    ? Math.min(300, Math.max(1, Math.round(value)))
    : 20;
}
export function recommendPlan(rooms: number): "free" | "pro" {
  return normaliseRooms(rooms) <= 3 ? "free" : "pro";
}
export function calcPlanPrice({
  country,
  plan,
  rooms,
  billing,
  promotionDiscountPct = 0,
}: {
  country: CountryPricing;
  plan: PlanId;
  rooms: number;
  billing: BillingCycle;
  promotionDiscountPct?: number;
}): PlanPrice {
  const count = normaliseRooms(rooms);
  const empty: PlanPrice = {
    available: false,
    perRoomEffective: null,
    monthlyTotal: null,
    billedAmount: null,
    billingNote: "",
    volumeDiscountPct: 0,
    roomNightsEquivalent: null,
    isQuote: plan === "group",
  };
  if (country.status === "pending")
    return { ...empty, reason: "Local pricing is being finalised." };
  if (plan === "free")
    return count <= 3
      ? {
          ...empty,
          available: true,
          perRoomEffective: 0,
          monthlyTotal: 0,
          billedAmount: 0,
        }
      : { ...empty, reason: "This property needs Essentials or Pro." };
  // TODO: Confirm the Group minimum bill amount. Until then, Group is quote-only.
  if (plan === "group")
    return {
      ...empty,
      available: true,
      perRoomEffective: country.perRoom.group,
      billingNote: "Minimum bill applies",
    };
  const volumeDiscountPct =
    volumeDiscounts.find((discount) => count > discount.aboveRooms)?.percent ??
    0;
  const perRoomEffective =
    country.perRoom[plan] * (1 - Math.max(volumeDiscountPct, promotionDiscountPct) / 100);
  const monthlyTotal =
    Math.round((perRoomEffective * count) / country.rounding.totalStep) *
    country.rounding.totalStep;
  const billedAmount = monthlyTotal * (billing === "yearly" ? 10 : 1);
  const effectiveMonthly =
    billing === "yearly" ? billedAmount / 12 : monthlyTotal;
  return {
    available: true,
    perRoomEffective,
    monthlyTotal,
    billedAmount,
    billingNote:
      billing === "yearly" ? "Billed yearly · 2 months free" : "Billed monthly",
    volumeDiscountPct,
    roomNightsEquivalent:
      Math.round((effectiveMonthly / country.typicalRoomRate) * 10) / 10,
    isQuote: false,
  };
}
export function calcFoundingPrice(input: {
  country: CountryPricing;
  plan: PlanId;
  rooms: number;
  billing: BillingCycle;
}): PlanPrice | null {
  if (!hasFoundingOffer(input.country) || (input.plan !== "essentials" && input.plan !== "pro")) return null;
  return calcPlanPrice({ ...input, promotionDiscountPct: foundingOffer.discountPct });
}
export function calcPayAsYouStay({
  country,
  rooms,
  occupancyPct,
}: {
  country: CountryPricing;
  rooms: number;
  occupancyPct: number;
}): PayAsYouStayPrice | null {
  if (country.status !== "confirmed") return null;
  const count = normaliseRooms(rooms);
  const occupancy = Number.isFinite(occupancyPct)
    ? Math.min(100, Math.max(0, occupancyPct))
    : 55;
  const nightsSold = Math.round((count * 30 * occupancy) / 100);
  // TODO: Confirm whether pay-as-you-stay receives volume discounts.
  // Until approved, its per-sold-night rate stays unchanged at every room count.
  const cost = nightsSold * country.payAsYouStayPerRoomNight;
  const proMonthly = calcPlanPrice({
    country,
    plan: "pro",
    rooms: count,
    billing: "monthly",
  }).monthlyTotal!;
  return {
    nightsSold,
    cost,
    proMonthly,
    cheaperPlan: cost < proMonthly ? "payg" : "pro",
    difference: Math.abs(cost - proMonthly),
    breakEvenOccupancyPct:
      (proMonthly / (count * 30 * country.payAsYouStayPerRoomNight)) * 100,
  };
}
export function formatMoney(amount: number, country: CountryPricing): string {
  return new Intl.NumberFormat(country.locale, {
    style: "currency",
    currency: country.currency,
    currencyDisplay: "code",
    maximumFractionDigits: 0,
  })
    .format(amount)
    .replace(/\u00a0/g, " ");
}
export function formatPerRoom(amount: number, country: CountryPricing): string {
  return new Intl.NumberFormat(country.locale, {
    style: "currency",
    currency: country.currency,
    currencyDisplay: "code",
    minimumFractionDigits: Number.isInteger(amount) ? 0 : 2,
    maximumFractionDigits: 2,
  })
    .format(amount)
    .replace(/\u00a0/g, " ");
}
