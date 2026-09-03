import HomeClient from "@/components/home/HomeClient";

export const metadata = {
  title: "RichMonks | Quantitative & Algorithmic Trading Firm in India",
  description:
    "Richmonks is a quantitative trading and algorithmic investment firm in India, focused on the equity and derivatives (F&O) markets. Where disciplined research meets intelligent execution.",
  alternates: {
    canonical: "https://www.richmonks.in/",
  },
  openGraph: {
    title: "RichMonks | Quantitative & Algorithmic Trading Firm in India",
    description:
      "Where disciplined research meets intelligent execution. Quantitative trading and algorithmic investment firm focused on India's equity and derivatives (F&O) markets.",
    url: "https://www.richmonks.in/",
    siteName: "RichMonks",
    locale: "en_IN",
    type: "website",
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
    title: "RichMonks | Quantitative & Algorithmic Trading Firm in India",
    description:
      "Where disciplined research meets intelligent execution. Quantitative trading and algorithmic investment firm focused on India's equity and derivatives (F&O) markets.",
    images: ["/assets/Brand/logo.png"],
  },
};

export default function Home() {
  return <HomeClient />;
}
