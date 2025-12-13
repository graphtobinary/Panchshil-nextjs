"use client";

import { FloorPlans } from "@/components/FloorPlans";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";

const PropertDetails = () => {
  return (
    <>
      <main className="min-h-screen bg-[#FFFAF7]">
        <Header metaData={{}} />

        {/* Full width banner with play button */}
        <FloorPlans title="FLOOR PLANS" />
        <Footer />
      </main>
    </>
  );
};

export default PropertDetails;
