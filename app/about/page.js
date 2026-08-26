import AboutHero from "@/components/about/AboutHero";
import OurFoundation from "@/components/about/OurFoundation";
import OurFounders from "@/components/about/OurFounders";
import OurEdge from "@/components/about/OurEdge";
import TheRichmonksWay from "@/components/about/TheRichmonksWay";
import Footer from "@/components/layout/Footer";

export const metadata = {
  title: "About | RichMonks",
  description:
    "Richmonks is a quantitative trading and algorithmic investment firm in India, focused on the equity and derivatives (F&O) markets.",
};

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <OurFoundation />
      <OurFounders />
      <OurEdge />
      <TheRichmonksWay />
      <Footer />
    </>
  );
}

