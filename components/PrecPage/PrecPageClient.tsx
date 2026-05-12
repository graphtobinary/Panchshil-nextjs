"use client";

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CareerHero } from "@/components/CareerHero";
import { PrecPageData } from "@/app/prec/prec-page.data";
import PrecIntroSection from "./PrecIntroSection";
import PrecBenefitsSection from "./PrecBenefitsSection";
import PrecFaqSection from "./PrecFaqSection";
import Head from "next/head";
import { isValidString } from "@/utils/utils";

type PrecPageClientProps = {
  data: PrecPageData;
};

export default function PrecPageClient({ data }: PrecPageClientProps) {
  const { metaData } = data;
  return (
    <main className="min-h-screen overflow-x-hidden bg-[#FFFAF7]">
      <Header />
      <Head>
        {isValidString(metaData?.canonical_tag) && (
          <link
            rel="canonical"
            key="canonical"
            href={metaData?.canonical_tag}
          />
        )}
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
      </Head>
      <section className="min-h-screen flex flex-col bg-white">
        <CareerHero hero={data.hero} />
      </section>

      <PrecIntroSection content={data.intro} />
      <PrecBenefitsSection content={data.benefits} />
      <PrecFaqSection content={data.faqs} />

      <Footer />
    </main>
  );
}
