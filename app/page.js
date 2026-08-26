"use client";

import { useEffect, useState } from "react";

import HeroSection from "@/components/home/HeroSection";
import MarketDataSection from "@/components/home/MarketDataSection";
import ReportsSection from "@/components/home/ReportsSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import Footer from "@/components/layout/Footer";

function getGlanceUrl() {
  const base = process.env.NEXT_PUBLIC_API_BASE_URL?.trim();
  return base ? `${base.replace(/\/$/, "")}/glance` : null;
}

export default function Home() {
  const [requestKey, setRequestKey] = useState(0);
  const [glanceStatus, setGlanceStatus] = useState("loading");
  const [glanceData, setGlanceData] = useState(null);

  useEffect(() => {
    let active = true;
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 10000);

    setGlanceStatus("loading");
    setGlanceData(null);

    const url = getGlanceUrl();
    if (!url) {
      setGlanceStatus("error");
      window.clearTimeout(timeout);
      return () => {
        active = false;
        window.clearTimeout(timeout);
        controller.abort();
      };
    }

    fetch(url, { cache: "no-store", signal: controller.signal })
      .then(async (response) => {
        if (!response.ok) {
          throw new Error(`Glance request failed with status ${response.status}`);
        }

        const result = (await response.json())?.result;
        if (!result || typeof result !== "object") {
          throw new Error("Glance response did not contain a result");
        }

        if (active) {
          setGlanceData(result);
          setGlanceStatus("success");
        }
      })
      .catch(() => {
        if (active) {
          setGlanceData(null);
          setGlanceStatus("error");
        }
      })
      .finally(() => window.clearTimeout(timeout));

    return () => {
      active = false;
      window.clearTimeout(timeout);
      controller.abort();
    };
  }, [requestKey]);

  const onRetry = () => setRequestKey((key) => key + 1);

  return (
    <>
      <HeroSection />
      <MarketDataSection
        glanceData={glanceData}
        glanceStatus={glanceStatus}
        onRetry={onRetry}
      />
      <ReportsSection />
      <TestimonialsSection />
      <Footer />
    </>
  );
}

