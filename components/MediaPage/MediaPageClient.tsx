"use client";

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CareerHero } from "@/components/CareerHero";
import { MediaPageData } from "@/app/media/media-page.data";
import MediaFeaturedArticles from "./MediaFeaturedArticles";
import MediaInsightSection from "./MediaInsightSection";
import MediaNewsletter from "./MediaNewsletter";

type MediaPageClientProps = {
  data: MediaPageData;
};

export default function MediaPageClient({ data }: MediaPageClientProps) {
  return (
    <main className="min-h-screen overflow-x-hidden bg-[#FFFAF7]">
      <Header />

      <section className="min-h-screen flex flex-col bg-white">
        <CareerHero hero={data.hero} />
      </section>

      <MediaFeaturedArticles content={data.featuredArticles} />

      {/* Newsletter Section */}
      <MediaNewsletter />

      {/* Solution Insights Section */}
      <MediaInsightSection content={data.solutionInsights} bgColor="bg-white" />

      {/* Industry Features Section */}
      <MediaInsightSection
        content={data.industryFeatures}
        bgColor="bg-[#FFFAF7]"
      />
      <div className="h-10 w-full bg-white"></div>
      <Footer />
    </main>
  );
}
