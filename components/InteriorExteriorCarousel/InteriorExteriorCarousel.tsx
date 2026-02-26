"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import ArrowLeftIcon from "@/assets/svgs/ArrowLeftIcon";
import ArrowRightIcon from "@/assets/svgs/ArrowRightIcon";
import { CarouselItem, InteriorExteriorCarouselProps } from "@/interfaces";

function SingleColumnCarousel({
  title,
  items,
}: {
  title: string;
  items: CarouselItem[];
}) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    dragFree: false,
    slidesToScroll: 1,
    loop: false,
    containScroll: "trimSnaps",
  });

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  // Reset carousel when items change
  useEffect(() => {
    if (emblaApi && items.length > 0) {
      emblaApi.reInit();
      emblaApi.scrollTo(0);
    }
  }, [emblaApi, items]);

  // Sync main carousel with selected index
  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    const selected = emblaApi.selectedScrollSnap();
    setSelectedIndex(selected);
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

  const onThumbnailClick = useCallback(
    (index: number) => {
      if (emblaApi) {
        emblaApi.scrollTo(index);
      }
    },
    [emblaApi]
  );

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

  if (items.length === 0) return null;
  return (
    <div className="relative w-full">
      {/* Header with title and navigation arrows */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl md:text-[28px] font-display-semi text-black">
          {title}
        </h3>
        {/* Top right nav */}
        <div className="flex items-center gap-3">
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
      </div>

      {/* Main image carousel with thumbnail overlay */}
      <div className="relative mb-6 overflow-hidden">
        <div className="embla-projects" ref={emblaRef}>
          <div className="embla-projects__container">
            {items.map((item, index) => {
              return (
                <div
                  key={index}
                  className="embla-projects__slide basis-full shrink-0 grow-0 relative h-[400px] md:h-[500px] overflow-hidden"
                >
                  <Image
                    src={item.image}
                    alt={item.caption}
                    fill
                    className="object-cover"
                    sizes="(min-width: 768px) 50vw, 100vw"
                  />
                </div>
              );
            })}
          </div>
        </div>

        {/* Thumbnail overlay - positioned at bottom of main slider, rendered once */}
        <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 z-10 overflow-hidden pointer-events-none">
          <div className="pointer-events-auto flex flex-row gap-2 md:gap-3 w-full">
            {items.map((thumbItem, thumbIndex) => (
              <button
                key={thumbIndex}
                onClick={() => onThumbnailClick(thumbIndex)}
                className={`relative flex-1 min-w-0 max-w-[64px] md:max-w-[80px] aspect-square overflow-hidden border-2 transition-all ${
                  selectedIndex === thumbIndex
                    ? "border-gold-beige opacity-100"
                    : "border-transparent opacity-70 hover:opacity-90"
                }`}
              >
                <Image
                  src={thumbItem.image}
                  alt={thumbItem.caption}
                  fill
                  className="object-cover"
                  sizes="(min-width: 768px) 80px, 64px"
                />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Progress bar */}
      <div className="w-full">
        <div className="h-0.5 bg-gold-beige/20">
          <div
            className="h-full bg-gold-beige transition-[width] duration-300 ease-out"
            style={{ width: `${Math.max(2, scrollProgress * 100)}%` }}
          />
        </div>
      </div>
    </div>
  );
}

export function InteriorExteriorCarousel({
  interiorItems,
  exteriorItems,
}: InteriorExteriorCarouselProps) {
  const safeInteriorItems = Array.isArray(interiorItems) ? interiorItems : [];
  const safeExteriorItems = Array.isArray(exteriorItems) ? exteriorItems : [];

  const normalizedInteriorItems: CarouselItem[] = safeInteriorItems
    .map((item) => ({
      image: item?.property_interior_slider_image,
      caption: item?.property_interior_slider_caption || "Interior image",
    }))
    .filter((item) => !!item.image);

  const normalizedExteriorItems: CarouselItem[] = safeExteriorItems
    .map((item) => ({
      image: item?.property_exterior_slider_image,
      caption: item?.property_exterior_slider_caption || "Exterior image",
    }))
    .filter((item) => !!item.image);

  return (
    <section className="w-full bg-[#FFFAF7] py-12 md:py-20">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {/* Interior Column */}
          <SingleColumnCarousel
            title="INTERIOR"
            items={normalizedInteriorItems}
          />

          {/* Exterior Column */}
          <SingleColumnCarousel
            title="EXTERIOR"
            items={normalizedExteriorItems}
          />
        </div>
      </div>
    </section>
  );
}
