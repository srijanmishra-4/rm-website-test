import { Poppins } from "next/font/google";

import MarketTicker from "@/components/layout/MarketTicker";
import Navbar from "@/components/layout/Navbar";

import "../styles/globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata = {
  title: "RichMonks",
  description: "RichMonks F&O analytics",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={poppins.variable}>
      <body className="font-body antialiased">
        <MarketTicker />
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}
