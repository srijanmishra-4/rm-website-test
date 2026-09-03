import MarketTicker from "@/components/layout/MarketTicker";
import Navbar from "@/components/layout/Navbar";
import PageTransition from "@/components/layout/PageTransition";

import "../styles/globals.css";
import "../styles/motion.css";

export const metadata = {
  metadataBase: new URL("https://www.richmonks.in"),
  title: {
    default: "RichMonks | Quantitative & Algorithmic Trading Firm in India",
    template: "%s | RichMonks",
  },
  description:
    "Richmonks is a quantitative trading and algorithmic investment firm in India, focused on the equity and derivatives (F&O) markets. Where disciplined research meets intelligent execution.",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://www.richmonks.in/",
    siteName: "RichMonks",
    title: "RichMonks | Quantitative & Algorithmic Trading Firm in India",
    description:
      "Quantitative trading and algorithmic investment firm focused on India's equity and derivatives (F&O) markets. Where disciplined research meets intelligent execution.",
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
      "Quantitative trading and algorithmic investment firm focused on India's equity and derivatives (F&O) markets. Where disciplined research meets intelligent execution.",
    images: ["/assets/Brand/logo.png"],
  },
  icons: {
    icon: "/assets/Brand/favicon.png",
    shortcut: "/assets/Brand/favicon.png",
    apple: "/assets/Brand/favicon.png",
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "RichMonks",
  url: "https://www.richmonks.in",
  logo: "https://www.richmonks.in/assets/Brand/logo.png",
  description:
    "Quantitative trading and algorithmic investment firm in India, focused on equity and derivatives (F&O) markets.",
  email: "info@richmonks.in",
  address: {
    "@type": "PostalAddress",
    streetAddress: "702, Sunil Enclave, Off Andheri Kurla Road",
    addressLocality: "Mumbai",
    addressRegion: "Maharashtra",
    postalCode: "400099",
    addressCountry: "IN",
  },
  founder: [
    {
      "@type": "Person",
      name: "Rajesh Mehra",
      jobTitle: "Founder & Market Strategist",
    },
    {
      "@type": "Person",
      name: "Ayush Kharkia",
      jobTitle: "Co-Founder & Chief Technology Officer",
    },
  ],
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "RichMonks",
  url: "https://www.richmonks.in",
  publisher: {
    "@type": "Organization",
    name: "RichMonks",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteJsonLd),
          }}
        />
      </head>
      <body className="font-body antialiased">
        <div className="sticky top-0 z-[105] w-full">
          <MarketTicker />
          <Navbar />
        </div>
        <main>
          <PageTransition>{children}</PageTransition>
        </main>
      </body>
    </html>
  );
}
