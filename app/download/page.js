import DownloadHero from "@/components/download/DownloadHero";
import Footer from "@/components/layout/Footer";

export const metadata = {
  title: "Download App | RichMonks",
  description:
    "Download the RichMonks mobile app for powerful market intelligence, F&O insights, stock rankings, and real-time market data — available on iOS and Android.",
};

export default function DownloadPage() {
  return (
    <>
      <DownloadHero />
      <Footer />
    </>
  );
}

