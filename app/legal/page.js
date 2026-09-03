import LegalHero from "@/components/legal/LegalHero";
import LegalContent from "@/components/legal/LegalContent";
import Footer from "@/components/layout/Footer";

export const metadata = {
  title: "Disclaimer & Legal Information",
  description:
    "The information on this website is for general informational purposes only and does not constitute investment advice, a recommendation, or an offer to buy or sell any security or financial instrument.",
  alternates: {
    canonical: "/legal",
  },
  openGraph: {
    title: "Disclaimer & Legal Information | RichMonks",
    description:
      "The information on this website is for general informational purposes only and does not constitute investment advice, a recommendation, or an offer to buy or sell any security or financial instrument.",
    url: "https://www.richmonks.in/legal",
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
    title: "Disclaimer & Legal Information | RichMonks",
    description:
      "The information on this website is for general informational purposes only and does not constitute investment advice, a recommendation, or an offer to buy or sell any security or financial instrument.",
    images: ["/assets/Brand/logo.png"],
  },
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
