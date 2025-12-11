"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import ArrowLeftIcon from "@/assets/svgs/ArrowLeftIcon";
import ArrowRightIcon from "@/assets/svgs/ArrowRightIcon";
import { useThemeStore } from "@/store/themeStore";

import Link from "next/link";

interface Property {
  property_name: string;
  property_thumbnail: string;
  property_location: string;
  property_link: string;
  image_gallery: string[];
}

interface PropertyListProps {
  properties: Property[];
}

interface PropertyItemProps {
  property: Property;
}

function PropertyItem({ property }: PropertyItemProps) {
  const { theme } = useThemeStore();
  // For now, we'll use the thumbnail as the only image
  // In a real scenario, you'd have multiple images
  const images = property.image_gallery;

  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    dragFree: false,
    slidesToScroll: 1,
    loop: false,
  });

  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);
  const initializedRef = useRef(false);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCanPrev(emblaApi.canScrollPrev());
    setCanNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    // Set initial state only once using a ref to avoid linter warning
    if (!initializedRef.current) {
      initializedRef.current = true;
      // Use setTimeout to defer state update and avoid synchronous setState warning
      setTimeout(() => {
        setCanPrev(emblaApi.canScrollPrev());
        setCanNext(emblaApi.canScrollNext());
      }, 0);
    }

    // Subscribe to events
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);

    // Cleanup event listeners
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  const scrollPrev = useCallback(
    () => emblaApi && emblaApi.scrollPrev(),
    [emblaApi]
  );
  const scrollNext = useCallback(
    () => emblaApi && emblaApi.scrollNext(),
    [emblaApi]
  );

  // Dummy data for specifications
  const specifications = [
    {
      icon: (
        <Image
          src={"/assets/svgs/location-icon.svg"}
          alt="Location Icon"
          width={20}
          height={20}
        />
      ),
      label: property.property_location,
    },
    {
      icon: (
        <Image
          src={"/assets/svgs/residences.svg"}
          alt="House Icon"
          width={20}
          height={20}
        />
      ),
      label: "3BHK, 4.5BHK Residences",
    },
    {
      icon: (
        <Image
          src={"/assets/svgs/platinum-project.svg"}
          alt="Star Icon"
          width={20}
          height={20}
        />
      ),
      label: "Platinum Project",
    },
    {
      icon: (
        <Image
          src={"/assets/svgs/underconstruction.svg"}
          alt="Building Icon"
          width={20}
          height={20}
        />
      ),
      label: "Under Construction",
    },
    {
      icon: (
        <Image
          src={"/assets/svgs/development-size.svg"}
          alt="Dimensions Icon"
          width={20}
          height={20}
        />
      ),
      label: "Development Size: 6,114sq.m or 65,808 sq.ft.",
    },
    {
      icon: (
        <Image
          src={"/assets/svgs/rupee.svg"}
          alt="Rupee Icon"
          width={20}
          height={20}
        />
      ),
      label: "INR 20Cr* Onwards",
    },
  ];

  return (
    <div
      className={`grid grid-cols-1 md:grid-cols-[30%_70%] gap-0 mb-8 shadow-sm transition-colors ${
        theme === "day" ? "bg-white" : "bg-black"
      }`}
    >
      {/* Left Column - Image Slider */}
      <div className="relative w-full h-[500px] md:h-[600px]">
        <div className="overflow-hidden h-full" ref={emblaRef}>
          <div className="flex h-full">
            {images?.map((image, index) => (
              <div key={index} className="flex-[0_0_100%] relative">
                <Image
                  src={image}
                  alt={property.property_name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 60vw"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Arrows */}
        {images?.length > 1 && (
          <>
            <button
              onClick={scrollPrev}
              disabled={!canPrev}
              className={`absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center transition-opacity ${
                theme === "day"
                  ? "bg-white/80 border border-gray-300 hover:bg-white"
                  : "bg-white border border-white hover:bg-white/90"
              } ${!canPrev ? "opacity-50 cursor-not-allowed" : ""}`}
              aria-label="Previous image"
            >
              <ArrowLeftIcon
                fill={theme === "day" ? "#1F180D" : "#1F180D"}
                width={20}
                height={20}
              />
            </button>
            <button
              onClick={scrollNext}
              disabled={!canNext}
              className={`absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center transition-opacity ${
                theme === "day"
                  ? "bg-white/80 border border-gray-300 hover:bg-white"
                  : "bg-white border border-white hover:bg-white/90"
              } ${!canNext ? "opacity-50 cursor-not-allowed" : ""}`}
              aria-label="Next image"
            >
              <ArrowRightIcon
                fill={theme === "day" ? "#1F180D" : "#1F180D"}
                width={20}
                height={20}
              />
            </button>
          </>
        )}
      </div>

      {/* Right Column - Property Details */}
      <div
        className={`p-8 pl-12 flex flex-col justify-between transition-colors ${
          theme === "day" ? "bg-[#FFFAF7]" : "bg-black"
        }`}
      >
        <div>
          {/* Property Name */}
          <h2
            className={`text-3xl md:text-2xl font-medium uppercase mb-3 transition-colors ${
              theme === "day" ? "text-black-chocolate" : "text-white"
            }`}
          >
            {property.property_name}
          </h2>

          {/* Brief Description */}
          <p
            className={`text-sm md:text-md font-normal mb-6 transition-colors ${
              theme === "day" ? "text-black-chocolate" : "text-white"
            }`}
          >
            Large format full floor residences
          </p>

          {/* Specifications */}
          <div className="space-y-4 mb-8">
            {specifications.map((spec, index) => (
              <div key={index} className="flex items-start gap-3">
                <div
                  className={`mt-0.5 shrink-0 transition-colors ${
                    theme === "day" ? "text-black-chocolate" : "text-white"
                  }`}
                >
                  <div
                    className={theme === "night" ? "brightness-0 invert" : ""}
                  >
                    {spec.icon}
                  </div>
                </div>
                <p
                  className={`text-sm md:text-md transition-colors ${
                    theme === "day" ? "text-black-chocolate" : "text-white"
                  }`}
                >
                  {spec.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="grid md:grid-cols-4 grid-cols-1 gap-5">
          <Link
            href={property.property_link || "#"}
            className={`px-4 py-3 text-sm font-medium hover:opacity-90 transition-all text-center shadow-sm ${
              theme === "day"
                ? "bg-gold-beige text-white"
                : "bg-gray-700 text-white"
            }`}
          >
            View Project
          </Link>
          <button
            className={`px-4 py-3 text-sm cursor-pointer font-medium hover:opacity-90 transition-all shadow-sm ${
              theme === "day"
                ? "bg-gold-beige text-white"
                : "bg-gray-700 text-white"
            }`}
          >
            Download Brochure
          </button>
          <button
            className={`px-4 py-3 text-sm cursor-pointer font-medium hover:opacity-90 transition-all shadow-sm ${
              theme === "day"
                ? "bg-gold-beige text-white"
                : "bg-gray-700 text-white"
            }`}
          >
            View Floor Plans
          </button>
          <button
            className={`px-4 py-3 text-sm cursor-pointer font-medium hover:opacity-90 transition-all shadow-sm ${
              theme === "day"
                ? "bg-gold-beige text-white"
                : "bg-gray-700 text-white"
            }`}
          >
            View Amenities
          </button>
        </div>
      </div>
    </div>
  );
}

export function PropertyList({ properties }: PropertyListProps) {
  const { theme } = useThemeStore();
  return (
    <div
      className={`container-standard md:px-16 px-4 py-12 transition-colors ${
        theme === "day" ? "bg-[#FFFAF7]" : "bg-gray-600"
      }`}
    >
      <div className="space-y-0">
        {properties.map((property, index) => (
          <PropertyItem key={index} property={property} />
        ))}
      </div>
    </div>
  );
}
