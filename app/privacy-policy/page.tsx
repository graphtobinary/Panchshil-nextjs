import PrivacyPolicyPageClient from "@/components/PrivacyPolicyPage/PrivacyPolicyPageClient";
import { privacyPolicyPageData } from "./privacy-policy-page.data";

export default function PrivacyPolicyPage() {
  return <PrivacyPolicyPageClient data={privacyPolicyPageData} />;
}
