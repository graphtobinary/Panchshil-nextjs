"use client";

import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import ListHeroBanner from "@/components/ListHeroBanner/ListHeroBanner";
import { StickyBottomBar } from "@/components/StickyBottomBar";
import { PropertyList } from "@/components/PropertyList";
import { useState, useRef, useEffect, useMemo } from "react";
import DevelopmentForYou from "@/components/DevelopmentForYou";
import ListContactBanner from "@/components/ListContactBanner";
import { useThemeStore } from "@/store/themeStore";
import { isAllowedPageForTheme } from "@/utils/utils";
import { useParams } from "next/navigation";
import OurOtherProjects from "@/components/OurOtherProjects";
import {
  CategoryFooterBlocksProps,
  MetaDataProps,
  PropertyCategories,
  PropertyCategoryProps,
  PropertyProps,
} from "@/interfaces";

interface ListClientProps {
  propertyCategory?: PropertyCategoryProps;
  propertyCities?: string[];
  propertyStatuses?: string[];
  otherPropertyCategories?: PropertyCategories[];
  propertyFooterBlocks?: CategoryFooterBlocksProps;
  properties?: PropertyProps[];
}

export default function ListClient({
  propertyCategory,
  propertyCities,
  propertyStatuses,
  properties,
  otherPropertyCategories,
  propertyFooterBlocks,
}: ListClientProps) {
  const [selectedLocation, setSelectedLocation] = useState<string[]>([]);
  const [selectedProperty, setSelectedProperty] = useState<string[]>([]);

  const { theme } = useThemeStore();
  const params = useParams();
  const isAllowedPage = isAllowedPageForTheme(
    params as { [key: string]: string }
  );
  const isDarkMode = isAllowedPage ? theme === "night" : false;
  const footerRef = useRef<HTMLElement>(null);
  const [isStickyBarVisible, setIsStickyBarVisible] = useState(true);

  // Detect when footer enters viewport
  useEffect(() => {
    const footerElement = footerRef.current;
    if (!footerElement) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Hide sticky bar when footer is in view
          setIsStickyBarVisible(!entry.isIntersecting);
        });
      },
      {
        threshold: 0.1, // Trigger when 10% of footer is visible
        rootMargin: "0px",
      }
    );

    observer.observe(footerElement);

    return () => {
      observer.disconnect();
    };
  }, []);

  // Handler functions that match the interface signature
  const handleLocationChange = (value: string[] | null) => {
    setSelectedLocation(value || []);
  };

  const handlePropertyChange = (value: string[] | null) => {
    setSelectedProperty(value || []);
  };

  // Filter properties based on selectedLocation and selectedProperty
  const filteredProperties = useMemo(() => {
    if (!properties) return [];

    return properties.filter((property) => {
      // Filter by location (property_city_name)
      const matchesLocation =
        selectedLocation.length === 0 ||
        selectedLocation.includes(property.property_city_name);

      // Filter by status (property_status)
      const matchesStatus =
        selectedProperty.length === 0 ||
        selectedProperty.includes(property.property_status);

      return matchesLocation && matchesStatus;
    });
  }, [properties, selectedLocation, selectedProperty]);

  return (
    <>
      <main
        className={`min-h-screen ${isDarkMode ? "bg-[#232323]" : "bg-[#FFFAF7]"}`}
      >
        <Header metaData={{ metaData: propertyCategory } as MetaDataProps} />
        <ListHeroBanner
          propertyCategory={propertyCategory as PropertyCategoryProps}
        />
        {/* Properties List */}
        <PropertyList properties={filteredProperties} />
        <DevelopmentForYou />
        <OurOtherProjects
          otherPropertyCategories={
            otherPropertyCategories as PropertyCategories[]
          }
        />
        <ListContactBanner
          propertyFooterBlocks={
            propertyFooterBlocks as CategoryFooterBlocksProps
          }
        />
        <Footer ref={footerRef} />
        <StickyBottomBar
          projectCount={filteredProperties.length}
          selectedLocation={selectedLocation}
          selectedProperty={selectedProperty}
          onLocationChange={handleLocationChange}
          onPropertyChange={handlePropertyChange}
          isVisible={isStickyBarVisible}
          propertyCities={propertyCities}
          propertyStatuses={propertyStatuses}
        />
      </main>
    </>
  );
}
