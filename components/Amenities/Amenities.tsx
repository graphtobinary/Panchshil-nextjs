"use client";

import { useEffect, useRef, useState } from "react";
import { amenitiesCategories } from "./amenitiesData";
import { AmenityCarousel } from "./AmenityCarousel";

interface AmenitiesProps {
  title?: string;
}

export function Amenities({ title = "AMENITIES" }: AmenitiesProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [isInView, setIsInView] = useState(false);
  const [selectedTab, setSelectedTab] = useState<string>(
    amenitiesCategories[0]?.id || ""
  );

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

  const selectedCategory = amenitiesCategories.find(
    (category) => category.id === selectedTab
  );

  // Get image gallery from selected category
  const imageGallery =
    selectedCategory?.amenities.map((amenity) => amenity.image) || [];

  return (
    <section ref={sectionRef} className="w-full py-20">
      <div className="mx-auto">
        {/* Title and Description */}
        <div
          className={`text-center mb-10 ${
            isInView ? "animate-fade-in-up" : "opacity-0"
          }`}
        >
          <div className="text-lg font-medium tracking-[0.2em] text-gold-beige mb-2">
            {title}
          </div>
          <h2 className="text-2xl md:text-[28px] font-display-semi text-black">
            SPACES DESIGNED TO SUPPORT WELL-BEING, DAILY COMFORT AND <br />
            CONNECTED LIVING
          </h2>
        </div>

        {/* Tabs */}
        <div
          className={`flex flex-wrap items-center justify-center gap-6 md:gap-12 mb-10 ${
            isInView ? "animate-fade-in-up-delay-1" : "opacity-0"
          }`}
        >
          {amenitiesCategories.map((category) => {
            const isActive = category.id === selectedTab;
            return (
              <button
                key={category.id}
                onClick={() => setSelectedTab(category.id)}
                className={`text-[12px] md:text-[16px] font-medium tracking-wider transition-colors ${
                  isActive
                    ? "text-gold-beige border-b-3 border-gold-beige"
                    : "text-gold-beige/60 hover:text-gold-beige"
                }`}
              >
                {category.title}
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
