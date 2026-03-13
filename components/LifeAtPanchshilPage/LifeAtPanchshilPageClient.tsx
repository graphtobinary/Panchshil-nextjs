"use client";

import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { CareerHero } from "@/components/CareerHero";
import { CareerVisibleImpact } from "@/components/CareerVisibleImpact";
import { CareerTracks } from "@/components/CareerTracks";
import { LifeTeamsThatMakeProject } from "@/components/LifeTeamsThatMakeProject";
import { LifeHowPeopleGrow } from "@/components/LifeHowPeopleGrow";
import { LifeEverydayLife } from "@/components/LifeEverydayLife";
import { LifeResidentsVoices } from "@/components/LifeResidentsVoices";
import { CareerFitInBanner } from "@/components/CareerFitInBanner";
import { LifeAtPanchshilPageData } from "@/app/careers/life-at-panchshil/life-at-panchshil.data";

type LifeAtPanchshilPageClientProps = {
  data: LifeAtPanchshilPageData;
};

export default function LifeAtPanchshilPageClient({
  data,
}: LifeAtPanchshilPageClientProps) {
  return (
    <main className="min-h-screen bg-[#FFFAF7]">
      <Header />
      <section className="min-h-screen flex flex-col bg-white">
        <CareerHero hero={data.hero} />
      </section>
      <CareerVisibleImpact content={data.visibleImpact} />
      <CareerTracks content={data.careerTracks} />
      <LifeTeamsThatMakeProject content={data.teamsThatMakeProject} />
      <LifeHowPeopleGrow content={data.howPeopleGrow} />
      <LifeEverydayLife content={data.everydayLife} />
      <LifeResidentsVoices content={data.residentsVoices} />
      <CareerFitInBanner content={data.fitInBanner} />
      <Footer />
    </main>
  );
}
