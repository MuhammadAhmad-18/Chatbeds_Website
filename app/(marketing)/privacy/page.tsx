import { LegalDraft } from "@/components/LegalDraft";
import { pageMetadata } from "@/lib/page-metadata";

export const metadata = {
  ...pageMetadata("Privacy", "Draft, pending legal review", "/privacy"),
  robots: { index: false, follow: false },
};
export default function PrivacyPage() {
  return <LegalDraft title="Privacy" headings={["Information collected", "Use of information", "Sharing of information", "Data retention", "Your choices", "Contact"]} />;
}
