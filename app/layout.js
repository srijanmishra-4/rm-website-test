import MarketTicker from "@/components/layout/MarketTicker";
import Navbar from "@/components/layout/Navbar";

import "../styles/globals.css";

export const metadata = {
  title: "RichMonks",
  description: "RichMonks F&O analytics",
  icons: {
    icon: "/assets/Brand/favicon.png",
    shortcut: "/assets/Brand/favicon.png",
    apple: "/assets/Brand/favicon.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="font-body antialiased">
        <MarketTicker />
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}
