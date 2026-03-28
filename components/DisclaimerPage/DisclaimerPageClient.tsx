"use client";

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CareerHero } from "@/components/CareerHero";
import { DisclaimerPageData } from "@/app/disclaimer/disclaimer-page.data";
import DisclaimerLegalBody from "./DisclaimerLegalBody";

type DisclaimerPageClientProps = {
  data: DisclaimerPageData;
};

export default function DisclaimerPageClient({
  data,
}: DisclaimerPageClientProps) {
  return (
    <main className="min-h-screen overflow-x-hidden bg-[#FFFAF7]">
      <Header />

      <section className="min-h-screen flex flex-col bg-white">
        <CareerHero hero={data.hero} />
      </section>

      <section className="w-full bg-white">
        <DisclaimerLegalBody />
      </section>

      <Footer />
    </main>
  );
}
