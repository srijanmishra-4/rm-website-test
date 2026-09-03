import AboutHero from "@/components/about/AboutHero";
import OurFoundation from "@/components/about/OurFoundation";
import OurEdge from "@/components/about/OurEdge";
import OurFounders from "@/components/about/OurFounders";
import TheRichmonksWay from "@/components/about/TheRichmonksWay";
import Footer from "@/components/layout/Footer";

export const metadata = {
  title: "About",
  description:
    "Learn about Richmonks — a quantitative trading and algorithmic investment firm in India. Discover our foundation, proprietary variables, and systematic approach to equity and derivatives (F&O) markets.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About RichMonks | Quantitative & Algorithmic Trading",
    description:
      "Learn about Richmonks — a quantitative trading and algorithmic investment firm in India. Discover our foundation, proprietary variables, and systematic approach.",
    url: "https://www.richmonks.in/about",
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
    title: "About RichMonks | Quantitative & Algorithmic Trading",
    description:
      "Learn about Richmonks — a quantitative trading and algorithmic investment firm in India. Discover our foundation, proprietary variables, and systematic approach.",
    images: ["/assets/Brand/logo.png"],
  },
};

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <OurFoundation />
      <OurEdge />
      <OurFounders />
      <TheRichmonksWay />
      <Footer />
    </>
  );
}
