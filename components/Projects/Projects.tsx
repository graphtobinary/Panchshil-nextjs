"use client";

import { useRef, useState, useMemo } from "react";
import { ProjectsCarousel } from "./ProjectsCarousel";
import { RegionTabs } from "./RegionTabs";
import { CategoryTabs } from "./CategoryTabs";
import { CountryTabs } from "./CountryTabs";
import { useProjectsData } from "./useProjectsData";
import { useIntersectionObserver } from "./useIntersectionObserver";
import { PropertiesData, PropertiesIntroProps } from "@/interfaces";
import { RegionKey } from "@/interfaces";

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
  const {
    regions,
    indiaCategories,
    internationalCountries,
    getCarouselItems,
    getCountryCategories,
  } = useProjectsData(properties);

  // State management with lazy initialization
  const [selectedRegion, setSelectedRegion] = useState<RegionKey>(() =>
    regions.length > 0 ? regions[0] : "india"
  );

  // Initialize category and country based on region
  const getInitialCategory = () => {
    if (regions.length === 0) return "";
    const initialRegion = regions[0];
    if (initialRegion === "india" && indiaCategories.length > 0) {
      return indiaCategories[0].key;
    }
    return "";
  };

  const getInitialCountry = () => {
    if (regions.length === 0) return "";
    const initialRegion = regions[0];
    if (
      initialRegion === "international" &&
      internationalCountries.length > 0
    ) {
      return internationalCountries[0].key;
    }
    return "";
  };

  const [selectedCategory, setSelectedCategory] =
    useState<string>(getInitialCategory);
  const [selectedCountry, setSelectedCountry] =
    useState<string>(getInitialCountry);

  // Get available categories for selected country (International only)
  const countryCategories = useMemo(() => {
    if (selectedRegion === "international" && selectedCountry) {
      return getCountryCategories(selectedCountry);
    }
    return [];
  }, [selectedRegion, selectedCountry, getCountryCategories]);

  // Get available second-level tabs based on selected region
  const secondLevelTabs = useMemo(() => {
    if (selectedRegion === "india") {
      return indiaCategories;
    }
    // For International, show countries first, then categories when country is selected
    return internationalCountries;
  }, [selectedRegion, indiaCategories, internationalCountries]);

  // Ensure valid category is selected - use computed value if current is invalid
  const effectiveCategory = useMemo(() => {
    if (selectedRegion === "india") {
      const categoryExists = indiaCategories.some(
        (cat) => cat.key === selectedCategory
      );
      if (categoryExists || !selectedCategory) {
        return (
          selectedCategory ||
          (indiaCategories.length > 0 ? indiaCategories[0].key : "")
        );
      }
      return indiaCategories.length > 0 ? indiaCategories[0].key : "";
    }
    if (selectedRegion === "international" && selectedCountry) {
      const categories = getCountryCategories(selectedCountry);

      // If no categories after filtering, check if country has "properties" category (direct array)
      if (categories.length === 0) {
        // Use "properties" as fallback if it exists (for countries with direct property arrays)
        return "properties";
      }

      const categoryExists = categories.some(
        (cat) => cat.key === selectedCategory
      );
      if (categoryExists || !selectedCategory) {
        return (
          selectedCategory || (categories.length > 0 ? categories[0].key : "")
        );
      }
      return categories.length > 0 ? categories[0].key : "";
    }
    return selectedCategory;
  }, [
    selectedRegion,
    selectedCountry,
    selectedCategory,
    indiaCategories,
    getCountryCategories,
  ]);

  // Get carousel items based on current selections (use effective category)
  const carouselItems = useMemo(() => {
    return getCarouselItems(selectedRegion, effectiveCategory, selectedCountry);
  }, [selectedRegion, effectiveCategory, selectedCountry, getCarouselItems]);

  // Handle region change
  const handleRegionChange = (region: RegionKey) => {
    setSelectedRegion(region);
    if (region === "india") {
      // Reset to first available category for India
      if (indiaCategories.length > 0) {
        setSelectedCategory(indiaCategories[0].key);
      } else {
        setSelectedCategory("");
      }
      setSelectedCountry("");
    } else {
      // Reset to first available country for International
      if (internationalCountries.length > 0) {
        const firstCountry = internationalCountries[0].key;
        setSelectedCountry(firstCountry);
        const categories = getCountryCategories(firstCountry);
        if (categories.length > 0) {
          setSelectedCategory(categories[0].key);
        } else {
          setSelectedCategory("");
        }
      } else {
        setSelectedCountry("");
        setSelectedCategory("");
      }
    }
  };

  // Handle category change (for India)
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  // Handle country change (for International)
  const handleCountryChange = (country: string) => {
    setSelectedCountry(country);
    // Set first available category for the selected country
    const categories = getCountryCategories(country);
    if (categories.length > 0) {
      setSelectedCategory(categories[0].key);
    } else {
      setSelectedCategory("");
    }
  };

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
              secondLevelTabs as Array<{ key: string; label: string }>
            }
            selectedCategory={effectiveCategory}
            onCategoryChange={handleCategoryChange}
            isInView={isInView}
          />
        ) : (
          <>
            <CountryTabs
              countries={
                secondLevelTabs as Array<{ key: string; label: string }>
              }
              selectedCountry={selectedCountry}
              onCountryChange={handleCountryChange}
              isInView={isInView}
            />
            {selectedCountry && countryCategories.length > 0 && (
              <CategoryTabs
                categories={countryCategories}
                selectedCategory={effectiveCategory}
                onCategoryChange={handleCategoryChange}
                isInView={isInView}
              />
            )}
          </>
        )}

        {/* Carousel */}
        <div
          className={`relative ${isInView ? "animate-fade-in-up-delay-3" : "opacity-0"}`}
        >
          <ProjectsCarousel
            key={`${selectedRegion}-${effectiveCategory}-${selectedCountry}`}
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
      className={`text-center mb-10 ${isInView ? "animate-fade-in-up" : "opacity-0"} px-4 md:px-0`}
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
