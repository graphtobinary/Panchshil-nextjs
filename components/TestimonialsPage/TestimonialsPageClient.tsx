"use client";

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CareerHero } from "@/components/CareerHero";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { TestimonialsPageData } from "@/app/testimonials/testimonials-page.data";

type TestimonialsPageClientProps = {
  data: TestimonialsPageData;
};

export default function TestimonialsPageClient({
  data,
}: TestimonialsPageClientProps) {
  return (
    <main className="min-h-screen overflow-x-hidden bg-[#FFFAF7]">
      <Header />

      <section className="min-h-screen flex flex-col bg-white">
        <CareerHero hero={data.hero} />
      </section>

      <TestimonialsSection items={data.testimonials} itemsPerPage={8} />

      <Footer />
    </main>
  );
}
