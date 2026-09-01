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
        <div className="sticky top-0 z-[105] w-full">
          <MarketTicker />
          <Navbar />
        </div>
        <main>{children}</main>
      </body>
    </html>
  );
}
