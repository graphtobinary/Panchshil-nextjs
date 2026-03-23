"use client";

import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { CareerHero } from "@/components/CareerHero";
import { AwardsListing } from "@/components/AwardsListing";
import { AwardsPageData } from "@/app/awards/awards.data";

type AwardsPageClientProps = {
  data: AwardsPageData;
};

export default function AwardsPageClient({ data }: AwardsPageClientProps) {
  return (
    <main className="min-h-screen overflow-x-hidden bg-[#FFFAF7]">
      <Header />
      <section className="min-h-screen flex flex-col bg-white">
        <CareerHero hero={data.hero} />
      </section>
      <AwardsListing awards={data.awards} itemsPerPage={6} />
      <Footer />
    </main>
  );
}
