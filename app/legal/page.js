import LegalHero from "@/components/legal/LegalHero";
import LegalContent from "@/components/legal/LegalContent";
import Footer from "@/components/layout/Footer";

export const metadata = {
  title: "Disclaimer & Legal Information | RichMonks",
  description:
    "The information on this website is for general informational purposes only and does not constitute investment advice, a recommendation, or an offer to buy or sell any security or financial instrument.",
};

export default function LegalPage() {
  return (
    <>
      <LegalHero />
      <LegalContent />
      <Footer />
    </>
  );
}

