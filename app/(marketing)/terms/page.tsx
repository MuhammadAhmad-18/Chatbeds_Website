import { LegalDraft } from "@/components/LegalDraft";
import { pageMetadata } from "@/lib/page-metadata";

export const metadata = {
  ...pageMetadata("Terms", "Draft, pending legal review", "/terms"),
  robots: { index: false, follow: false },
};
export default function TermsPage() {
  return <LegalDraft title="Terms" headings={["Service", "Accounts", "Billing", "Cancellation", "Responsibilities", "Contact"]} />;
}
