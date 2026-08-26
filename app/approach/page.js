import ApproachHero from "@/components/approach/ApproachHero";
import OurPipeline from "@/components/approach/OurPipeline";
import RiskOversight from "@/components/approach/RiskOversight";
import OurFramework from "@/components/approach/OurFramework";
import Footer from "@/components/layout/Footer";

export const metadata = {
  title: "Approach | RichMonks",
  description:
    "Richmonks integrates proprietary quantitative research with backtested algorithms to generate risk-controlled strategies for superior alpha generation.",
};

export default function ApproachPage() {
  return (
    <>
      <ApproachHero />
      <OurPipeline />
      <RiskOversight />
      <OurFramework />
      <Footer />
    </>
  );
}

