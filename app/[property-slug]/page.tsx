"use client";

import { FloorPlans } from "@/components/FloorPlans";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { useParams } from "next/navigation";

const PropertDetails = () => {
  const params = useParams();
  const propertySlug = params["property-slug"] as string;
  console.log(propertySlug, "propertySlug");
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
