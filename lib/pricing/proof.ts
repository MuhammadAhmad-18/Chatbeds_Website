export type PricingTestimonial = {
  quote: string;
  name: string;
  role: string;
  property: string;
  country: string;
};
// TODO: Add real, approved testimonials with permission to publish.
export const testimonials: readonly PricingTestimonial[] = [];

export type CustomerLogo = {
  name: string;
  src: string;
  width: number;
  height: number;
};
// TODO: Add real customer logo assets with permission to publish.
export const customerLogos: readonly CustomerLogo[] = [];
