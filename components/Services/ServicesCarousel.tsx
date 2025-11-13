"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import ArrowLeftIcon from "@/assets/svgs/ArrowLeftIcon";
import ArrowRightIcon from "@/assets/svgs/ArrowRightIcon";

export interface ServiceCardData {
  id: string;
  title: string;
  image: string;
}

interface ServicesCarouselProps {
  items: ServiceCardData[];
}

export function ServicesCarousel({ items }: ServicesCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    loop: false,
    containScroll: "trimSnaps",
  });

  const [scrollProgress, setScrollProgress] = useState(0);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  const onScroll = useCallback(() => {
    if (!emblaApi) return;
    setScrollProgress(emblaApi.scrollProgress());
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCanPrev(emblaApi.canScrollPrev());
    setCanNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const rafScroll = requestAnimationFrame(onScroll);
    const rafSelect = requestAnimationFrame(onSelect);
    emblaApi.on("scroll", onScroll);
    emblaApi.on("reInit", onScroll);
    emblaApi.on("select", onSelect);
    return () => {
      cancelAnimationFrame(rafScroll);
      cancelAnimationFrame(rafSelect);
      emblaApi.off("scroll", onScroll);
      emblaApi.off("reInit", onScroll);
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onScroll, onSelect]);

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

      <div className="embla-projects" ref={emblaRef}>
        <div className="embla-projects__container gap-6 md:gap-8">
          {items.map((item) => (
            <div
              key={item.id}
              className="cursor-pointer embla-projects__slide basis-[80%] md:basis-[28.571%] shrink-0 grow-0 relative rounded-sm overflow-hidden border border-black-chocolate/10 bg-white"
            >
              <div className="relative h-[260px] md:h-[320px]">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="p-5 flex items-center flex-col">
                <div className="text-black-chocolate font-display-semi text-[15px] md:text-base">
                  {item.title}
                </div>
                <div className="mt-2 text-[12px] text-gold-beige underline underline-offset-4">
                  Read More
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Progress bar */}
      <div className="mt-12 w-4/5 mx-auto">
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
