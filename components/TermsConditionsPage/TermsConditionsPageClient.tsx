"use client";

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CareerHero } from "@/components/CareerHero";
import { TermsConditionsPageData } from "@/app/terms-and-conditions/terms-conditions-page.data";
import TermsConditionsLegalBody from "./TermsConditionsLegalBody";
import Head from "next/head";
import { isValidString } from "@/utils/utils";

type TermsConditionsPageClientProps = {
  data: TermsConditionsPageData;
};

export default function TermsConditionsPageClient({
  data,
}: TermsConditionsPageClientProps) {
  const metaData = data?.metaData;
  return (
    <main className="min-h-screen overflow-x-hidden bg-[#FFFAF7]">
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

      <section className="w-full bg-white">
        <TermsConditionsLegalBody />
      </section>

      <Footer />
    </main>
  );
}
