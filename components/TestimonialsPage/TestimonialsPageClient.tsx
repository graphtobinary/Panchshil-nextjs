"use client";

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CareerHero } from "@/components/CareerHero";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { TestimonialsPageData } from "@/app/testimonials/testimonials-page.data";
import Head from "next/head";
import { isValidString } from "@/utils/utils";

type TestimonialsPageClientProps = {
  data: TestimonialsPageData;
};

export default function TestimonialsPageClient({
  data,
}: TestimonialsPageClientProps) {
  const metaData = data?.metaData;
  console.log(
    isValidString(metaData?.canonical_tag),
    "isValidString(metaData?.canonical_tag)"
  );
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

      <TestimonialsSection items={data.testimonials} itemsPerPage={8} />

      <Footer />
    </main>
  );
}
