"use client";

import { useEffect, useRef, useState } from "react";
import { AmenityCarousel } from "./AmenityCarousel";
import { PropertyAmenitiesSection } from "@/interfaces";

interface AmenitiesProps {
  title?: string;
  property_amenities_section: PropertyAmenitiesSection | undefined;
}

export function Amenities({
  title = "AMENITIES",
  property_amenities_section,
}: AmenitiesProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [isInView, setIsInView] = useState(false);
  const [selectedTab, setSelectedTab] = useState<string>("");
  const amenityCategories =
    property_amenities_section?.property_amenities || [];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -100px 0px" }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const activeTab = amenityCategories.some(
    (category) => category.property_amenity_slider_title === selectedTab
  )
    ? selectedTab
    : amenityCategories[0]?.property_amenity_slider_title || "";

  const selectedCategory = amenityCategories.find(
    (category) => category.property_amenity_slider_title === activeTab
  );

  // Get image gallery from selected category
  const imageGallery =
    selectedCategory?.property_amenity_sliders.map(
      (amenity) => amenity.property_amenity_slider_image
    ) || [];

  return (
    <section ref={sectionRef} className="w-full py-10 md:py-20 bg-white">
      <div className="mx-auto">
        {/* Title and Description */}
        <div
          className={`text-center mb-10 px-4 md:px-0 ${
            isInView ? "animate-fade-in-up" : "opacity-0"
          }`}
        >
          <div className="text-lg font-medium tracking-[0.2em] text-gold-beige mb-2">
            {title}
          </div>
          <h2 className="text-2xl md:text-[28px] font-display-semi text-black">
            {property_amenities_section?.property_amenities_caption}
          </h2>
        </div>

        {/* Tabs */}
        <div
          className={`flex flex-wrap items-center justify-center gap-6 md:gap-12 mb-10 ${
            isInView ? "animate-fade-in-up-delay-1" : "opacity-0"
          }`}
        >
          {property_amenities_section?.property_amenities.map((category) => {
            const isActive =
              category?.property_amenity_slider_title === activeTab;
            return (
              <button
                key={category?.property_amenity_slider_title}
                onClick={() =>
                  setSelectedTab(category?.property_amenity_slider_title)
                }
                className={`text-[12px] md:text-[16px] font-medium tracking-wider transition-colors ${
                  isActive
                    ? "text-gold-beige border-b-3 border-gold-beige"
                    : "text-gold-beige/60 hover:text-gold-beige"
                }`}
              >
                {category?.property_amenity_slider_title}
              </button>
            );
          })}
        </div>

        {/* Amenities Image Carousel */}
        {selectedCategory && imageGallery.length > 0 && (
          <AmenityCarousel images={imageGallery} isInView={isInView} />
        )}
      </div>
    </section>
  );
}
