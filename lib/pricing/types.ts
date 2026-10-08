export type PlanId = "free" | "essentials" | "pro" | "group";
export type BillingCycle = "monthly" | "yearly";
type CountryBase = {
  code: string;
  name: string;
  currency: string;
  currencySymbol: string;
  locale: string;
  paymentMethods: readonly string[];
  allowsQuarterlyPrepaid?: boolean;
};
export type ConfirmedCountryPricing = CountryBase & {
  status: "confirmed";
  rounding: { totalStep: number };
  typicalRoomRate: number;
  perRoom: { essentials: number; pro: number; group: number };
  payAsYouStayPerRoomNight: number;
};
export type PendingCountryPricing = CountryBase & { status: "pending" };
export type CountryPricing = ConfirmedCountryPricing | PendingCountryPricing;
export type PricingSelection = {
  country: string;
  rooms: number;
  billing: BillingCycle;
};
export type PlanPrice = {
  available: boolean;
  reason?: string;
  perRoomEffective: number | null;
  monthlyTotal: number | null;
  billedAmount: number | null;
  billingNote: string;
  volumeDiscountPct: number;
  roomNightsEquivalent: number | null;
  isQuote: boolean;
};
export type PayAsYouStayPrice = {
  nightsSold: number;
  cost: number;
  proMonthly: number;
  cheaperPlan: "payg" | "pro";
  difference: number;
  breakEvenOccupancyPct: number;
};
