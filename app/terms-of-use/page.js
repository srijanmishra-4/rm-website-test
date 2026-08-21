import LegalHero from "@/components/legal/LegalHero";
import TermsOfUseContent from "@/components/legal/TermsOfUseContent";
import Footer from "@/components/layout/Footer";

export const metadata = {
  title: "Terms of Use | RichMonks",
  description:
    "Review the terms and conditions governing the use of the RichMonks website, analytics services, and platforms.",
};

export default function TermsOfUsePage() {
  return (
    <>
      <LegalHero
        eyebrow="LEGAL & COMPLIANCE"
        title="Terms of Use"
        description="These terms and conditions govern your access to and use of the RichMonks website, analytical tools, and related services."
        lastUpdated="2026"
        watermark="TERMS"
      />
      <TermsOfUseContent />
      <Footer />
    </>
  );
}
