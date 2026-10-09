import { LegalDraft } from "@/components/LegalDraft";
import { pageMetadata } from "@/lib/page-metadata";
import { termsAndConditions } from "@/lib/legal-content";

export const metadata = {
  ...pageMetadata("Terms and Conditions", "Starter terms for the ChatBeds marketing website and enquiries. Draft, pending legal review.", "/terms"),
  robots: { index: false, follow: false },
};
export default function TermsPage() {
  return <LegalDraft policy={termsAndConditions} />;
}
