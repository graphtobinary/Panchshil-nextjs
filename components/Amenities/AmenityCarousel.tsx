"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import ArrowLeftIcon from "@/assets/svgs/ArrowLeftIcon";
import ArrowRightIcon from "@/assets/svgs/ArrowRightIcon";

interface AmenityCarouselProps {
  images: string[];
  isInView: boolean;
}

export function AmenityCarousel({ images, isInView }: AmenityCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    dragFree: false,
    slidesToScroll: 2, // Scroll 2 slides at a time
    loop: false,
    containScroll: "trimSnaps",
  });

  const [scrollProgress, setScrollProgress] = useState(0);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  // Reset carousel when images change
  useEffect(() => {
    if (emblaApi && images.length > 0) {
      emblaApi.reInit();
      emblaApi.scrollTo(0);
    }
  }, [emblaApi, images]);

  // Sync carousel with selected index
  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCanPrev(emblaApi.canScrollPrev());
    setCanNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  const onScroll = useCallback(() => {
    if (!emblaApi) return;
    const progress = emblaApi.scrollProgress();
    setScrollProgress(progress);
  }, [emblaApi]);

  const scrollPrev = useCallback(() => {
    if (emblaApi) {
      emblaApi.scrollPrev();
    }
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) {
      emblaApi.scrollNext();
    }
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect);
    emblaApi.on("scroll", onScroll);
    emblaApi.on("reInit", onSelect);
    const raf = requestAnimationFrame(() => {
      onSelect();
      onScroll();
    });
    return () => {
      cancelAnimationFrame(raf);
      emblaApi.off("select", onSelect);
      emblaApi.off("scroll", onScroll);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect, onScroll]);

  if (images.length === 0) return null;

  return (
    <div
      className={`relative w-full ${
        isInView ? "animate-fade-in-up-delay-2" : "opacity-0"
      }`}
    >
      {/* Navigation arrows at top right */}
      {images.length > 2 && (
        <div className="flex items-center justify-end gap-3 mb-4 mr-8">
          <button
            aria-label="Previous"
            onClick={scrollPrev}
            disabled={!canPrev}
            className={`grid place-items-center text-gold-beige transition-opacity ${
              canPrev ? "opacity-100" : "opacity-40 cursor-not-allowed"
            }`}
          >
            <ArrowLeftIcon />
          </button>
          <button
            aria-label="Next"
            onClick={scrollNext}
            disabled={!canNext}
            className={`grid place-items-center text-gold-beige transition-opacity ${
              canNext ? "opacity-100" : "opacity-40 cursor-not-allowed"
            }`}
          >
            <ArrowRightIcon />
          </button>
        </div>
      )}

      {/* Carousel container */}
      <div className="relative mb-4 overflow-hidden">
        <div className="embla-amenities" ref={emblaRef}>
          <div className="embla-amenities__container">
            {images.map((image, index) => (
              <div
                key={index}
                className="embla-amenities__slide basis-[48%] shrink-0 grow-0 mr-[2%] last:mr-0 relative aspect-[4/3]  overflow-hidden"
              >
                <Image
                  src={image}
                  alt={`Amenity - Image ${index + 1}`}
                  fill
                  className="object-cover"
                  priority={index < 2}
                  sizes="(min-width: 768px) 48vw, 48vw"
                  onError={(e) => {
                    console.error(`Failed to load amenity image: ${image}`, e);
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Progress bar */}
      {images.length > 2 && (
        <div className="w-1/2 mx-auto">
          <div className="h-0.5 bg-gold-beige/20">
            <div
              className="h-full bg-gold-beige transition-[width] duration-300 ease-out"
              style={{ width: `${Math.max(2, scrollProgress * 100)}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
