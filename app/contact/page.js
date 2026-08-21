import ConnectHero from "@/components/connect/ConnectHero";
import ConnectDetails from "@/components/connect/ConnectDetails";
import Footer from "@/components/layout/Footer";

export const metadata = {
  title: "Contact Us | RichMonks",
  description:
    "Richmonks welcomes professional inquiries and collaborations related to quantitative research, algorithmic systems, and technological innovation.",
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
