import LegalHero from "@/components/legal/LegalHero";
import PrivacyPolicyContent from "@/components/legal/PrivacyPolicyContent";
import Footer from "@/components/layout/Footer";

export const metadata = {
  title: "Privacy Policy",
  description:
    "RichMonks is committed to maintaining robust privacy protections for its users. Learn how we collect, use, and safeguard your information.",
  alternates: {
    canonical: "/privacy-policy",
  },
  openGraph: {
    title: "Privacy Policy | RichMonks",
    description:
      "RichMonks is committed to maintaining robust privacy protections for its users. Learn how we collect, use, and safeguard your information.",
    url: "https://www.richmonks.in/privacy-policy",
    images: [
      {
        url: "/assets/Brand/logo.png",
        width: 204,
        height: 66,
        alt: "RichMonks — Trust. Trade. Earn.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Privacy Policy | RichMonks",
    description:
      "RichMonks is committed to maintaining robust privacy protections for its users. Learn how we collect, use, and safeguard your information.",
    images: ["/assets/Brand/logo.png"],
  },
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
