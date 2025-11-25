"use client";

import { useRef, useState, useMemo } from "react";
import { ProjectsCarousel } from "./ProjectsCarousel";
import { RegionTabs } from "./RegionTabs";
import { CategoryTabs } from "./CategoryTabs";
import { CountryTabs } from "./CountryTabs";
import { useProjectsData } from "./useProjectsData";
import { useIntersectionObserver } from "./useIntersectionObserver";
import { PropertiesData, PropertiesIntroProps } from "@/interfaces";
import { RegionKey, TabKey, CountryKey } from "@/interfaces";

interface ProjectsProps {
  properties: PropertiesData | null;
  propertiesIntro: PropertiesIntroProps;
}

export function Projects({ properties, propertiesIntro }: ProjectsProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const isInView = useIntersectionObserver(
    sectionRef as React.RefObject<HTMLElement>
  );

  // Transform and organize data
  const { regions, indiaCategories, internationalCountries, getCarouselItems } =
    useProjectsData(properties);

  // State management
  const [selectedRegion, setSelectedRegion] = useState<RegionKey>(() =>
    regions.length > 0 ? regions[0] : "india"
  );
  const [selectedCategory, setSelectedCategory] =
    useState<TabKey>("residential");
  const [selectedCountry, setSelectedCountry] = useState<CountryKey>("dubai");

  // Get available second-level tabs based on selected region
  // Note: Type is different for India (categories) vs International (countries)
  const secondLevelTabs = useMemo(() => {
    return selectedRegion === "india"
      ? indiaCategories
      : internationalCountries;
  }, [selectedRegion, indiaCategories, internationalCountries]);

  // Get carousel items based on current selections
  const carouselItems = useMemo(() => {
    return getCarouselItems(selectedRegion, selectedCategory, selectedCountry);
  }, [selectedRegion, selectedCategory, selectedCountry, getCarouselItems]);

  // Handle region change
  const handleRegionChange = (region: RegionKey) => {
    setSelectedRegion(region);
    if (region === "india") {
      // Reset to first available category for India
      if (indiaCategories.length > 0) {
        setSelectedCategory(indiaCategories[0].key);
      }
    } else {
      // Reset to first available country for International
      if (internationalCountries.length > 0) {
        setSelectedCountry(internationalCountries[0].key);
        setSelectedCategory("residential"); // Default category for international
      }
    }
  };

  // Handle category change (for India)
  const handleCategoryChange = (category: TabKey) => {
    setSelectedCategory(category);
  };

  // Handle country change (for International)
  const handleCountryChange = (country: CountryKey) => {
    setSelectedCountry(country);
    setSelectedCategory("residential"); // Reset to default category
  };
  console.log(carouselItems, "carouselItems");
  return (
    <section ref={sectionRef} className="w-full bg-[#FFFAF7] py-20">
      <div className="mx-auto">
        {/* Header */}
        <PropertiesHeader
          heading={propertiesIntro?.properties_intro_heading}
          subHeading={propertiesIntro?.properties_intro_sub_heading}
          isInView={isInView}
        />

        {/* Top Level Tabs - Regions */}
        {regions.length > 0 && (
          <RegionTabs
            regions={regions}
            selectedRegion={selectedRegion}
            onRegionChange={handleRegionChange}
            isInView={isInView}
          />
        )}

        {/* Second Level Tabs */}
        {selectedRegion === "india" ? (
          <CategoryTabs
            categories={
              secondLevelTabs as Array<{ key: TabKey; label: string }>
            }
            selectedCategory={selectedCategory}
            onCategoryChange={handleCategoryChange}
            isInView={isInView}
          />
        ) : (
          <CountryTabs
            countries={
              secondLevelTabs as Array<{ key: CountryKey; label: string }>
            }
            selectedCountry={selectedCountry}
            onCountryChange={handleCountryChange}
            isInView={isInView}
          />
        )}

        {/* Carousel */}
        <div
          className={`relative ${isInView ? "animate-fade-in-up-delay-3" : "opacity-0"}`}
        >
          <ProjectsCarousel
            key={`${selectedRegion}-${selectedCategory}-${selectedCountry}`}
            items={carouselItems}
          />
        </div>
      </div>
    </section>
  );
}

// Header Component
function PropertiesHeader({
  heading,
  subHeading,
  isInView,
}: {
  heading?: string;
  subHeading?: string;
  isInView: boolean;
}) {
  return (
    <div
      className={`text-center mb-10 ${isInView ? "animate-fade-in-up" : "opacity-0"}`}
    >
      <div className="text-lg tracking-[0.2em] font-medium text-gold-beige mb-2">
        {heading}
      </div>
      <h2 className="text-2xl md:text-[28px] font-display-semi text-black">
        {subHeading}
      </h2>
    </div>
  );
}
