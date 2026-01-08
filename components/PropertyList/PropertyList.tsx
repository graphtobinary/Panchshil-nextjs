"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import ArrowLeftIcon from "@/assets/svgs/ArrowLeftIcon";
import ArrowRightIcon from "@/assets/svgs/ArrowRightIcon";
import { useThemeStore } from "@/store/themeStore";
import { StickyBottomBar } from "@/components/StickyBottomBar";

import Link from "next/link";
import { isAllowedPageForTheme } from "@/utils/utils";
import { useParams } from "next/navigation";
import {
  ActionButtonProps,
  PropertyItemProps,
  PropertyListProps,
} from "@/interfaces";
import { usePropertiesPagination } from "@/hooks/usePropertiesPagination";

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

export function PropertyList({
  properties,
  propertyCategoryUrlSlug,
  totalPropertyCount,
  propertyCities = [],
  propertyStatuses = [],
  footerRef,
}: PropertyListProps) {
  const { theme } = useThemeStore();
  const params = useParams();
  const isAllowedPage = isAllowedPageForTheme(
    params as { [key: string]: string }
  );
  const isDarkMode = isAllowedPage ? theme === "night" : false;

  // Filter state management
  const [selectedLocation, setSelectedLocation] = useState<string[]>([]);
  const [selectedProperty, setSelectedProperty] = useState<string[]>([]);
  const [isStickyBarVisible, setIsStickyBarVisible] = useState(true);

  // Detect when footer enters viewport
  useEffect(() => {
    const footerElement = footerRef?.current;
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
  }, [footerRef]);

  // Handler functions for filter changes
  const handleLocationChange = (value: string[] | null) => {
    setSelectedLocation(value || []);
  };

  const handlePropertyChange = (value: string[] | null) => {
    setSelectedProperty(value || []);
  };

  // Use pagination hook if category slug is provided
  const {
    properties: paginatedProperties,
    isLoading,
    hasMore,
    error,
    sentinelRef,
    loadNextPage,
  } = usePropertiesPagination({
    initialProperties: properties || [],
    propertyCategoryUrlSlug: propertyCategoryUrlSlug || "",
    totalPropertyCount,
  });

  // Use paginated properties if category slug is provided, otherwise use original properties
  const allProperties = propertyCategoryUrlSlug
    ? paginatedProperties
    : properties || [];
  // Apply filters to all properties (including paginated ones)
  const displayProperties = allProperties.filter((property) => {
    // Filter by location - check both property_city_name and property_basic_information
    let matchesLocation = true;
    if (selectedLocation.length > 0) {
      // Check if property_city_name matches
      const cityNameMatch = selectedLocation.includes(
        property.property_city_name
      );

      // Check if any property_basic_information_caption contains the selected location
      const basicInfoMatch =
        property.property_basic_information?.some((info) => {
          const caption = info.property_basic_information_caption || "";
          return selectedLocation.some((location) =>
            caption.toLowerCase().includes(location.toLowerCase())
          );
        }) || false;

      matchesLocation = cityNameMatch || basicInfoMatch;
    }

    // Filter by status (property_status)
    const matchesStatus =
      selectedProperty.length === 0 ||
      selectedProperty.includes(property.property_status);

    return matchesLocation && matchesStatus;
  });

  // Ensure pagination continues to load all properties when filters are applied
  // This allows filters to work on the complete dataset
  useEffect(() => {
    if (!propertyCategoryUrlSlug || isLoading || !hasMore || !loadNextPage) {
      return;
    }

    // When filters are applied and we haven't loaded all properties yet,
    // ensure the sentinel is visible to trigger pagination
    if (
      allProperties.length < (totalPropertyCount || Infinity) &&
      hasMore &&
      !isLoading
    ) {
      const sentinel = sentinelRef.current;
      if (sentinel) {
        // Check if sentinel is visible or near viewport
        const rect = sentinel.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight + 200;

        // If sentinel is visible and we have filters, trigger load
        // This ensures we load all properties so filters can work on complete data
        if (
          isVisible &&
          (selectedLocation.length > 0 || selectedProperty.length > 0)
        ) {
          // Small delay to avoid rapid requests
          const timeoutId = setTimeout(() => {
            if (!isLoading && hasMore && loadNextPage) {
              loadNextPage();
            }
          }, 500);

          return () => clearTimeout(timeoutId);
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    selectedLocation.length,
    selectedProperty.length,
    allProperties.length,
    totalPropertyCount,
    hasMore,
    isLoading,
    propertyCategoryUrlSlug,
  ]);

  return (
    <>
      <div
        className={`container-standard md:px-16 px-4 pt-12 transition-colors`}
      >
        <div className="space-y-0">
          {displayProperties?.map((property, index) => (
            <PropertyItem key={index} property={property} />
          ))}

          {/* Loading indicator */}
          {isLoading && (
            <div
              className={`flex justify-center items-center py-8 transition-colors ${
                !isDarkMode ? "text-black" : "text-white"
              }`}
            >
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-current"></div>
              <span className="ml-3">Loading more properties...</span>
            </div>
          )}

          {/* Error message */}
          {error && (
            <div
              className={`text-center py-8 transition-colors ${
                !isDarkMode ? "text-red-600" : "text-red-400"
              }`}
            >
              {error}
            </div>
          )}

          {/* Sentinel element for Intersection Observer - Always show when there are more properties to load */}
          {/* This ensures pagination continues even when filters reduce visible items */}
          {propertyCategoryUrlSlug && hasMore && (
            <div
              ref={sentinelRef}
              className="h-20 w-full"
              aria-hidden="true"
              style={{ minHeight: "80px" }}
            />
          )}

          {/* Show message when no filtered results but more properties might be available */}
          {propertyCategoryUrlSlug &&
            displayProperties.length === 0 &&
            allProperties.length > 0 &&
            !isLoading && (
              <div
                className={`text-center py-8 transition-colors ${
                  !isDarkMode ? "text-gray-600" : "text-gray-400"
                }`}
              >
                No properties match the selected filters. Try adjusting your
                filters or scroll to load more properties.
              </div>
            )}
        </div>
      </div>

      {/* Sticky Bottom Bar */}
      {propertyCategoryUrlSlug && (
        <StickyBottomBar
          projectCount={displayProperties.length}
          selectedLocation={selectedLocation}
          selectedProperty={selectedProperty}
          onLocationChange={handleLocationChange}
          onPropertyChange={handlePropertyChange}
          isVisible={isStickyBarVisible}
          propertyCities={propertyCities}
          propertyStatuses={propertyStatuses}
        />
      )}
    </>
  );
}
