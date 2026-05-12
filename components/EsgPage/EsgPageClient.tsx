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
import Head from "next/head";
import { isValidString } from "@/utils/utils";

type EsgPageClientProps = {
  data: EsgPageData;
};

export default function EsgPageClient({ data }: EsgPageClientProps) {
  const metaData = data?.metaData;
  return (
    <main className="min-h-screen bg-[#FFFAF7]">
      <Header />
      <Head>
        {isValidString(metaData?.meta_title) && (
          <title key="title">{metaData?.meta_title}</title>
        )}
        {isValidString(metaData?.meta_description) && (
          <meta
            name="description"
            key="description"
            content={metaData?.meta_description}
          />
        )}
        {isValidString(metaData?.meta_keywords) && (
          <meta
            name="keywords"
            key="keywords"
            content={metaData?.meta_keywords}
          />
        )}
        {isValidString(metaData?.canonical_tag) && (
          <link
            rel="canonical"
            key="canonical"
            href={metaData?.canonical_tag}
          />
        )}
      </Head>
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
