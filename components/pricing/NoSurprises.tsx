import {
  Check,
  Download,
  LockKeyhole,
  ReceiptText,
  ShieldCheck,
} from "lucide-react";
const items = [
  { icon: ShieldCheck, text: "No setup fee" },
  { icon: Check, text: "0% commission on direct bookings" },
  { icon: Check, text: "Cancel any time" },
  { icon: Download, text: "Free data export" },
  { icon: LockKeyhole, text: "Price locked for 12 months" },
  { icon: ReceiptText, text: "Tax shown separately at checkout" },
];
export function NoSurprises() {
  return (
    <section className="pricing-no-surprises">
      <div className="container">
        <h2>No surprises. Just a clear plan.</h2>
        <ul>
          {items.map(({ icon: Icon, text }) => (
            <li key={text}>
              <Icon size={18} aria-hidden="true" />
              <span>{text}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
