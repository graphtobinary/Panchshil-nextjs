"use client";

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CareerHero } from "@/components/CareerHero";
import { PrivacyPolicyPageData } from "@/app/privacy-policy/privacy-policy-page.data";
import PrivacyPolicyLegalBody from "./PrivacyPolicyLegalBody";

type PrivacyPolicyPageClientProps = {
  data: PrivacyPolicyPageData;
};

export default function PrivacyPolicyPageClient({
  data,
}: PrivacyPolicyPageClientProps) {
  return (
    <main className="min-h-screen overflow-x-hidden bg-[#FFFAF7]">
      <Header />

      <section className="min-h-screen flex flex-col bg-white">
        <CareerHero hero={data.hero} />
      </section>

      <section className="w-full bg-white">
        <PrivacyPolicyLegalBody />
      </section>

      <Footer />
    </main>
  );
}
