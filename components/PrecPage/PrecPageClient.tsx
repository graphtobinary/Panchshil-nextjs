"use client";

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CareerHero } from "@/components/CareerHero";
import { PrecPageData } from "@/app/prec/prec-page.data";
import PrecIntroSection from "./PrecIntroSection";
import PrecBenefitsSection from "./PrecBenefitsSection";
import PrecFaqSection from "./PrecFaqSection";

type PrecPageClientProps = {
  data: PrecPageData;
};

export default function PrecPageClient({ data }: PrecPageClientProps) {
  return (
    <main className="min-h-screen overflow-x-hidden bg-[#FFFAF7]">
      <Header />

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
