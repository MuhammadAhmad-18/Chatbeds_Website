import { LegalDraft } from "@/components/LegalDraft";
import { pageMetadata } from "@/lib/page-metadata";
import { privacyPolicy } from "@/lib/legal-content";

export const metadata = {
  ...pageMetadata("Privacy Policy", "Starter privacy policy for the ChatBeds marketing website and enquiries. Draft, pending legal review.", "/privacy"),
  robots: { index: false, follow: false },
};
export default function PrivacyPage() {
  return <LegalDraft policy={privacyPolicy} />;
}
