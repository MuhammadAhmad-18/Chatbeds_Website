import {
  BedDouble,
  BrushCleaning,
  Wrench,
  Wallet,
  ChartNoAxesCombined,
  MessageCircle,
} from "lucide-react";
const capabilities = [
  [BedDouble, "Front Desk"],
  [BrushCleaning, "Housekeeping"],
  [Wrench, "Maintenance"],
  [Wallet, "Finance"],
  [ChartNoAxesCombined, "Revenue"],
  [MessageCircle, "Guest Experience"],
] as const;
export function TrustStrip() {
  return (
    <section className="trust-strip">
      <div className="container">
        <p>One platform for your entire property operation</p>
        <ul>
          {capabilities.map(([Icon, label]) => (
            <li key={label}>
              <Icon size={19} strokeWidth={1.5} />
              {label}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
