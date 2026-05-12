"use client";

import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { CareerHero } from "@/components/CareerHero";
import { AwardsListing } from "@/components/AwardsListing";
import { AwardsPageData } from "@/app/awards-and-recognitions/awards.data";
import Head from "next/head";
import { isValidString } from "@/utils/utils";

type AwardsPageClientProps = {
  data: AwardsPageData;
};

export default function AwardsPageClient({ data }: AwardsPageClientProps) {
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
      <AwardsListing
        awards={data.awards}
        // itemsPerPage={6}
      />
      <Footer />
    </main>
  );
}
