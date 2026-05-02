"use client";

import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { AboutUsHero } from "@/components/AboutUsHero";
import { AboutUsStatsBar } from "@/components/AboutUsStatsBar";
import { AboutUsVisibleImpact } from "@/components/AboutUsVisibleImpact";
import { AboutUsSustainability } from "@/components/AboutUsSustainability";
import { AboutUsAlliances } from "@/components/AboutUsAlliances";
import { AboutUsPageDummyData } from "@/app/about/about.data";
import DevelopmentForYou from "@/components/DevelopmentForYou";
import { AboutUsClients } from "../AboutUsClients";

type AboutUsPageClientProps = {
  data: AboutUsPageDummyData;
};

export default function AboutUsPageClient({ data }: AboutUsPageClientProps) {
  return (
    <main className="min-h-screen bg-[#FFFAF7]">
      <Header />
      <section className="min-h-screen flex flex-col bg-white">
        <AboutUsHero hero={data.hero} />
        <AboutUsStatsBar stats={data.stats} />
      </section>
      <AboutUsVisibleImpact content={data.visibleImpact} />
      <div className="bg-white">
        <DevelopmentForYou
          title="FROM PUNE TO THE WORLD"
          subtitle="WE ARE NOW"
          description="With developments in Dubai, the Maldives, Sri Lanka and across Indian cities, panchshil brings global design sensibilities and international standards to every address-while staying deeply rooted in local context and community needs."
        />
      </div>
      <AboutUsSustainability content={data.sustainability} />
      <div>
        <AboutUsClients
          isAboutPage
          property_key_tenants={data.ourValuedClients}
          title={""}
          subtitle="OUR VALUED CLIENTS"
        />
      </div>
      <AboutUsAlliances content={data.alliances} />
      <Footer />
    </main>
  );
}
