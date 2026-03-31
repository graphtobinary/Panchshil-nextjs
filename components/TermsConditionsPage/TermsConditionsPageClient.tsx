"use client";

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CareerHero } from "@/components/CareerHero";
import { TermsConditionsPageData } from "@/app/terms-and-conditions/terms-conditions-page.data";
import TermsConditionsLegalBody from "./TermsConditionsLegalBody";

type TermsConditionsPageClientProps = {
  data: TermsConditionsPageData;
};

export default function TermsConditionsPageClient({
  data,
}: TermsConditionsPageClientProps) {
  return (
    <main className="min-h-screen overflow-x-hidden bg-[#FFFAF7]">
      <Header />

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
