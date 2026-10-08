import Image from "next/image";
import { customerLogos } from "@/lib/pricing/proof";

export function CustomerLogos() {
  if (!customerLogos.length) return null;
  return (
    <ul className="container pricing-customer-logos" aria-label="ChatBeds customers">
      {customerLogos.map((logo) => (
        <li key={logo.name}>
          <Image src={logo.src} width={logo.width} height={logo.height} alt={logo.name} />
        </li>
      ))}
    </ul>
  );
}
