"use client";

import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { EsgHero } from "@/components/EsgHero";
import { EsgTabBar } from "@/components/EsgTabBar";
import { EsgOverviewSection } from "@/components/EsgOverviewSection";
import { EsgEnergySection } from "@/components/EsgEnergySection";
import { EsgWaterSection } from "@/components/EsgWaterSection";
import { EsgWasteSection } from "@/components/EsgWasteSection";
import { EsgMobilitySection } from "@/components/EsgMobilitySection";
import { EsgIndoorAirSection } from "@/components/EsgIndoorAirSection";
import { EsgCertificationsSection } from "@/components/EsgCertificationsSection";
import { EsgReportsSection } from "@/components/EsgReportsSection";
import { EsgPageData } from "@/app/esg/esg.data";

type EsgPageClientProps = {
  data: EsgPageData;
};

export default function EsgPageClient({ data }: EsgPageClientProps) {
  return (
    <main className="min-h-screen bg-[#0F140D]">
      <Header />
      <EsgHero
        hero={data.hero}
        milestones={data.milestones}
        ticker={data.ticker}
      />
      <EsgTabBar />
      <EsgOverviewSection introduction={data.introduction} />
      <EsgEnergySection performance={data.performance} />
      <EsgWaterSection />
      <EsgWasteSection />
      <EsgMobilitySection />
      <EsgIndoorAirSection />
      <EsgCertificationsSection safetyGovernance={data.safetyGovernance} />
      <EsgReportsSection
        reportsIntro={data.reportsIntro}
        reportsList={data.reportsList}
      />
      <Footer />
    </main>
  );
}
