"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import ArrowLeftIcon from "@/assets/svgs/ArrowLeftIcon";
import ArrowRightIcon from "@/assets/svgs/ArrowRightIcon";
import { Button } from "@/components/Button";

import { FeaturedPropertiesProps, PropertyHighlight } from "@/interfaces";

interface SignatureCarouselProps {
  featuredProperties: FeaturedPropertiesProps[];
}

export function SignatureCarousel({
  featuredProperties,
}: SignatureCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    loop: false,
    containScroll: "trimSnaps",
  });

  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  // const isMobile = useIsMobile();

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCanPrev(emblaApi.canScrollPrev());
    setCanNext(emblaApi.canScrollNext());
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    const raf = requestAnimationFrame(() => onSelect());
    return () => {
      cancelAnimationFrame(raf);
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <div className="relative w-full">
      {/* Top right nav */}
      <div className="absolute -top-12 right-8 z-20 md:flex items-center gap-3 hidden">
        <button
          aria-label="Previous"
          onClick={() => emblaApi?.scrollPrev()}
          disabled={!canPrev}
          className={`grid place-items-center text-gold-beige transition-opacity ${
            canPrev ? "opacity-100" : "opacity-40 cursor-not-allowed"
          }`}
        >
          <ArrowLeftIcon />
        </button>
        <button
          aria-label="Next"
          onClick={() => emblaApi?.scrollNext()}
          disabled={!canNext}
          className={`grid place-items-center text-gold-beige transition-opacity ${
            canNext ? "opacity-100" : "opacity-40 cursor-not-allowed"
          }`}
        >
          <ArrowRightIcon />
        </button>
      </div>

      <div className="embla-signature" ref={emblaRef}>
        <div className="embla-signature__container">
          {featuredProperties?.map(
            (property: FeaturedPropertiesProps, i: number) => {
              const imageSrc = property.property_background_image;

              return (
                <div key={i} className="embla-signature__slide">
                  <div className="relative h-[60vh] md:h-[50vh]">
                    <Image
                      src={imageSrc}
                      alt={property.property_name}
                      fill
                      priority
                      className="object-cover"
                    />
                  </div>

                  {/* Text strip */}
                  <div className="bg-[#F5EEE6] py-10">
                    <div className="mx-auto px-2 md:px-6 text-center">
                      <h3 className="text-black-chocolate text-base font-display-semi md:text-xl tracking-wide mb-6">
                        {property.property_name}
                      </h3>

                      <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 md:gap-12 text-gold-beige">
                        {property.property_highlights.flatMap(
                          (feature: PropertyHighlight, featureIndex: number) =>
                            [
                              <div
                                key={`feature-${featureIndex}`}
                                className="flex items-start md:gap-3 gap-2"
                              >
                                <Image
                                  src={feature.property_highlight_icon}
                                  alt={feature.property_highlight_caption}
                                  width={28}
                                  height={28}
                                  className="w-5 h-5 md:w-6 md:h-6"
                                />
                                <span className="text-xs md:text-base font-display-semi">
                                  {feature.property_highlight_caption}
                                </span>
                              </div>,
                              featureIndex <
                                property.property_highlights.length - 1 && (
                                <span
                                  key={`separator-${featureIndex}`}
                                  className="hidden md:inline h-6 w-px bg-black-chocolate/20"
                                />
                              ),
                            ].filter(Boolean)
                        )}
                      </div>

                      <div className="mt-8">
                        <Button variant="signature" className="px-6">
                          {"Discover"}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            }
          )}
        </div>
      </div>

      {/* Carousel Dots */}
      <div className="flex items-center justify-center gap-2 mt-8 md:hidden">
        {featuredProperties?.map((_, index) => (
          <button
            key={index}
            onClick={() => emblaApi?.scrollTo(index)}
            aria-label={`Go to slide ${index + 1}`}
            className={`transition-all duration-300 rounded-full ${
              selectedIndex === index
                ? "bg-gold-beige w-8 h-2"
                : "bg-gold-beige/40 w-2 h-2 hover:bg-gold-beige/60"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
