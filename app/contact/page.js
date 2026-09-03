import ConnectHero from "@/components/connect/ConnectHero";
import ConnectDetails from "@/components/connect/ConnectDetails";
import Footer from "@/components/layout/Footer";

export const metadata = {
  title: "Contact Us",
  description:
    "Richmonks welcomes professional inquiries and collaborations related to quantitative research, algorithmic trading systems, and technological innovation.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact RichMonks | Quantitative Trading Firm",
    description:
      "Get in touch with Richmonks for professional inquiries and collaborations related to quantitative research, algorithmic trading systems, and technological innovation.",
    url: "https://www.richmonks.in/contact",
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
    title: "Contact RichMonks | Quantitative Trading Firm",
    description:
      "Get in touch with Richmonks for professional inquiries and collaborations related to quantitative research, algorithmic trading systems, and technological innovation.",
    images: ["/assets/Brand/logo.png"],
  },
};

export default function ContactPage() {
  return (
    <>
      <ConnectHero />
      <ConnectDetails />
      <Footer />
    </>
  );
}
