import DownloadHero from "@/components/download/DownloadHero";
import Footer from "@/components/layout/Footer";

export const metadata = {
  title: "Download App",
  description:
    "Download the RichMonks mobile app for powerful market intelligence, F&O insights, stock rankings, and real-time market data — available on iOS and Android.",
  alternates: {
    canonical: "/download",
  },
  openGraph: {
    title: "Download RichMonks App | Market Intelligence & F&O Insights",
    description:
      "Download the RichMonks mobile app for powerful market intelligence, F&O insights, stock rankings, and real-time market data — available on iOS and Android.",
    url: "https://www.richmonks.in/download",
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
    title: "Download RichMonks App | Market Intelligence & F&O Insights",
    description:
      "Download the RichMonks mobile app for powerful market intelligence, F&O insights, stock rankings, and real-time market data — available on iOS and Android.",
    images: ["/assets/Brand/logo.png"],
  },
};

export default function DownloadPage() {
  return (
    <>
      <DownloadHero />
      <Footer />
    </>
  );
}
