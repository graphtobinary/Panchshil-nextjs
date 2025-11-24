"use client";

import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { WelcomeSection } from "@/components/WelcomeSection";
import { Accordion } from "@/components/Accordion";
import { Projects } from "@/components/Projects";
import { Signature } from "@/components/Signature";
import { Services } from "@/components/Services";
import { LatestNews } from "@/components/LatestNews";
import { Footer } from "@/components/Footer";
import { HomeClientProps } from "@/interfaces";

export default function HomeClient({
  metaData,
  banner,
  contactDetails,
  servicesIntro,
  services,
  aboutIntro,
  milestones,
  propertyCategories,
  propertiesIntro,
  properties,
  featuredPropertiesIntro,
  featuredProperties,
  masterSlider,
  footerBlocks,
}: HomeClientProps) {
  return (
    <main className="min-h-screen bg-[#FFFAF7]">
      <Header metaData={metaData} />
      <Hero masterSliderData={masterSlider} />
      <WelcomeSection
        aboutIntroData={aboutIntro}
        banner={banner}
        milestones={milestones}
      />
      <Accordion propertyCategories={propertyCategories} defaultOpen={1} />
      <Projects propertiesIntro={propertiesIntro} properties={properties} />
      <Signature
        featuredPropertiesIntro={featuredPropertiesIntro}
        featuredProperties={featuredProperties}
      />
      <Services servicesIntro={servicesIntro} services={services} />
      <LatestNews footerBlocks={footerBlocks} />
      <Footer contactDetails={contactDetails} />
    </main>
  );
}
