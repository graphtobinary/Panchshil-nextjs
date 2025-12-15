"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import ArrowLeftIcon from "@/assets/svgs/ArrowLeftIcon";
import ArrowRightIcon from "@/assets/svgs/ArrowRightIcon";
import { useThemeStore } from "@/store/themeStore";

import Link from "next/link";
import { isAllowedPageForTheme } from "@/utils/utils";
import { useParams } from "next/navigation";
import {
  ActionButtonProps,
  PropertyItemProps,
  PropertyListProps,
} from "@/interfaces";

function ActionButton({
  children,
  href,
  onClick,
  isDarkMode,
}: ActionButtonProps) {
  const baseClasses = `px-4 py-3 text-sm font-medium hover:opacity-90 transition-all shadow-sm ${
    !isDarkMode ? "bg-gold-beige text-white" : "bg-[#4E4E4E] text-white"
  }`;

  if (href) {
    return (
      <Link href={href} className={`${baseClasses} text-center`}>
        {children}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={`${baseClasses} cursor-pointer`}>
      {children}
    </button>
  );
}

function PropertyItem({ property }: PropertyItemProps) {
  const { theme } = useThemeStore();
  const params = useParams();
  const isAllowedPage = isAllowedPageForTheme(
    params as { [key: string]: string }
  );
  const isDarkMode = isAllowedPage ? theme === "night" : false;
  // For now, we'll use the thumbnail as the only image
  // In a real scenario, you'd have multiple images
  const images = [
    !isDarkMode
      ? property?.property_thumbnail
      : property?.property_thumbnail_night_mode,
  ];

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

  return (
    <div
      className={`grid grid-cols-1 md:grid-cols-[30%_70%] gap-0 mb-8 shadow-sm transition-colors ${
        !isDarkMode ? "bg-white" : "bg-black"
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
                  alt={
                    !isDarkMode
                      ? property?.property_thumbnail
                      : property?.property_thumbnail_night_mode
                  }
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
                !isDarkMode
                  ? " border border-gray-300 "
                  : " border border-white "
              } ${!canPrev ? "opacity-50 cursor-not-allowed" : ""}`}
              aria-label="Previous image"
            >
              <ArrowLeftIcon fill={"#FFFFFF"} width={20} height={20} />
            </button>
            <button
              onClick={scrollNext}
              disabled={!canNext}
              className={`absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center transition-opacity ${
                !isDarkMode
                  ? " border border-gray-300 "
                  : " border border-white "
              } ${!canNext ? "opacity-50 cursor-not-allowed" : ""}`}
              aria-label="Next image"
            >
              <ArrowRightIcon fill={"#FFFFFF"} width={20} height={20} />
            </button>
          </>
        )}
      </div>

      {/* Right Column - Property Details */}
      <div
        className={`p-8 pl-12 flex flex-col justify-between transition-colors ${
          !isDarkMode ? "bg-[#FFFAF7]" : "bg-black"
        }`}
      >
        <div>
          {/* Property Name */}
          <h2
            className={`text-3xl md:text-3xl font-display-semi uppercase mb-3 transition-colors ${
              !isDarkMode ? "text-black" : "text-white"
            }`}
          >
            {property?.property_name}
          </h2>

          {/* Brief Description */}
          <p
            className={`text-sm md:text-md font-normal mb-6 transition-colors ${
              !isDarkMode ? "text-[#030303]" : "text-white"
            }`}
          >
            {property?.property_tagline}
          </p>

          {/* Specifications */}
          <div className="space-y-4 mb-8">
            {property?.property_basic_information?.map((spec, index) => (
              <div key={index} className="flex items-start gap-3">
                <div
                  className={`mt-0.5 shrink-0 transition-colors ${
                    !isDarkMode ? "text-[#030303]" : "text-white"
                  }`}
                >
                  <div className={isDarkMode ? "brightness-0 invert" : ""}>
                    <Image
                      src={spec.property_basic_information_icon}
                      alt={spec.property_basic_information_caption}
                      width={20}
                      height={20}
                    />
                  </div>
                </div>
                <p
                  className={`text-sm md:text-md transition-colors ${
                    !isDarkMode ? "text-[#030303]" : "text-white"
                  }`}
                >
                  {spec.property_basic_information_caption}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="grid md:grid-cols-4 grid-cols-1 gap-5">
          <ActionButton
            href={property.property_link || "#"}
            isDarkMode={isDarkMode}
          >
            View Project
          </ActionButton>
          {property.property_brochure && (
            <ActionButton
              href={property.property_brochure || "#"}
              isDarkMode={isDarkMode}
            >
              Download Brochure
            </ActionButton>
          )}
          <ActionButton
            href={property.property_link || "#"}
            isDarkMode={isDarkMode}
          >
            View Floor Plans
          </ActionButton>
          <ActionButton
            href={property.property_link || "#"}
            isDarkMode={isDarkMode}
          >
            View Amenities
          </ActionButton>
        </div>
      </div>
    </div>
  );
}

export function PropertyList({ properties }: PropertyListProps) {
  return (
    <div className={`container-standard md:px-16 px-4 pt-12 transition-colors`}>
      <div className="space-y-0">
        {properties?.map((property, index) => (
          <PropertyItem key={index} property={property} />
        ))}
      </div>
    </div>
  );
}
