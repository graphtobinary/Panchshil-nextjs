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
import Head from "next/head";
import { isValidString } from "@/utils/utils";

export default function HomeClient({
  banner,
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
  metaData,
}: HomeClientProps) {
  return (
    <main className="min-h-screen bg-[#FFFAF7]">
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
      <Footer />
    </main>
  );
}
