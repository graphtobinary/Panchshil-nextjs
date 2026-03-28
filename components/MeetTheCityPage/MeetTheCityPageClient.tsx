"use client";

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CareerHero } from "@/components/CareerHero";
import { MeetTheCityMagazineGrid } from "@/components/MeetTheCityMagazineGrid";
import { MeetTheCityPageData } from "@/app/meet-the-city/meet-the-city-page.data";

type MeetTheCityPageClientProps = {
  data: MeetTheCityPageData;
};

export default function MeetTheCityPageClient({
  data,
}: MeetTheCityPageClientProps) {
  return (
    <main className="min-h-screen overflow-x-hidden bg-[#FFFAF7]">
      <Header />

      <section className="min-h-screen flex flex-col bg-white">
        <CareerHero hero={data.hero} />
      </section>

      <MeetTheCityMagazineGrid editions={data.editions} itemsPerPage={6} />

      <Footer />
    </main>
  );
}
