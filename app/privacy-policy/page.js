import LegalHero from "@/components/legal/LegalHero";
import PrivacyPolicyContent from "@/components/legal/PrivacyPolicyContent";
import Footer from "@/components/layout/Footer";

export const metadata = {
  title: "Privacy Policy | RichMonks",
  description:
    "RichMonks is committed to maintaining robust privacy protections for its users. Learn how we collect, use, and safeguard your information.",
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <LegalHero
        eyebrow="LEGAL & COMPLIANCE"
        title="Privacy Policy"
        description="RichMonks is committed to maintaining robust privacy protections for its users. This policy outlines how we collect, use, and safeguard your information."
        lastUpdated="2026"
        watermark="PRIVACY"
      />
      <PrivacyPolicyContent />
      <Footer />
    </>
  );
}
