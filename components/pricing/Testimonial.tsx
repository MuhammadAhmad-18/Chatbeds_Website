import { testimonials } from "@/lib/pricing/proof";

export function Testimonial() {
  if (!testimonials.length) return null;
  return (
    <section className="container pricing-testimonials" aria-label="Customer experiences">
      {testimonials.map((item) => (
        <figure key={`${item.name}-${item.property}`}>
          <blockquote><p>{item.quote}</p></blockquote>
          <figcaption>{item.name}, {item.role} · {item.property}, {item.country}</figcaption>
        </figure>
      ))}
    </section>
  );
}
