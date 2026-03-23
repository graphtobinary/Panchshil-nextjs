"use client";

import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { CareerHero } from "@/components/CareerHero";
import { EsgAccordionSection } from "@/components/EsgAccordionSection";
import { EsgPeopleCommunities } from "@/components/EsgPeopleCommunities";
import { EsgSteeringCommittee } from "@/components/EsgSteeringCommittee";
import { EsgBeyondTheBuild } from "@/components/EsgBeyondTheBuild";
import { EsgRecognitionsCertificates } from "@/components/EsgRecognitionsCertificates";
import { EsgReports } from "@/components/EsgReports";
import { EsgPageData } from "@/app/esg/esg.data";

type EsgPageClientProps = {
  data: EsgPageData;
};

export default function EsgPageClient({ data }: EsgPageClientProps) {
  return (
    <main className="min-h-screen bg-[#FFFAF7]">
      <Header />
      <section className="min-h-screen flex flex-col bg-white">
        <CareerHero hero={data.hero} />
      </section>
      <EsgAccordionSection content={data.accordion} />
      <EsgPeopleCommunities content={data.peopleCommunities} />
      <EsgSteeringCommittee content={data.steeringCommittee} />
      <EsgBeyondTheBuild content={data.beyondTheBuild} />
      <EsgRecognitionsCertificates content={data.recognitionsCertificates} />
      <EsgReports content={data.reports} />
      <Footer />
    </main>
  );
}
