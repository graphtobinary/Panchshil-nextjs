"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import ArrowLeftIcon from "@/assets/svgs/ArrowLeftIcon";
import ArrowRightIcon from "@/assets/svgs/ArrowRightIcon";
import { ProjectsCarouselProps } from "@/interfaces";
import Link from "next/link";

export function ProjectsCarousel({ items }: ProjectsCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    dragFree: false,
    slidesToScroll: 1,
    loop: false,
    containScroll: "trimSnaps",
  });

  // Reset carousel to start when items change
  useEffect(() => {
    if (emblaApi && items.length > 0) {
      emblaApi.reInit();
      emblaApi.scrollTo(0);
    }
  }, [emblaApi, items]);

  const [scrollProgress, setScrollProgress] = useState(0);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  const onScroll = useCallback(() => {
    if (!emblaApi) return;
    const progress = emblaApi.scrollProgress();
    setScrollProgress(progress);
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCanPrev(emblaApi.canScrollPrev());
    setCanNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  const scrollPrev = useCallback(
    () => emblaApi && emblaApi.scrollPrev(),
    [emblaApi]
  );
  const scrollNext = useCallback(
    () => emblaApi && emblaApi.scrollNext(),
    [emblaApi]
  );

  useEffect(() => {
    if (!emblaApi) return;
    // Defer initial progress update outside the effect body
    const raf = requestAnimationFrame(() => onScroll());
    emblaApi.on("scroll", onScroll);
    emblaApi.on("reInit", onScroll);
    emblaApi.on("select", onSelect);
    const rafSelect = requestAnimationFrame(() => onSelect());
    return () => {
      cancelAnimationFrame(raf);
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

      {/* Carousel viewport */}
      <div className="embla-projects mx-2 md:mx-0" ref={emblaRef}>
        <div className="embla-projects__container gap-6 md:gap-8 ">
          {items.map((item, i) => {
            const slideContent = (
              <>
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-fill"
                  sizes="(min-width: 1024px) 28vw, 80vw"
                />

                {/* bottom gradient */}
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 via-black/50 to-transparent"></div>

                {/* text overlay */}
                <div className="absolute left-0 right-0 bottom-0 p-5 text-white">
                  <div className="mt-1 text-xl font-display-semi ">
                    {item.title}
                  </div>
                  <div className="text-base tracking-wide opacity-90">
                    {item.location}
                  </div>
                </div>
              </>
            );

            const slideClassName = `embla-projects__slide basis-[80%] md:basis-[28.571%] shrink-0 grow-0 relative h-[300px] md:h-[420px] overflow-hidden ${
              item.link ? "cursor-pointer" : ""
            }`;

            return item.link ? (
              <Link
                key={item.id + i}
                href={item.link}
                className={slideClassName}
              >
                {slideContent}
              </Link>
            ) : (
              <div key={item.id + i} className={slideClassName}>
                {slideContent}
              </div>
            );
          })}
        </div>
      </div>

      {/* Progress bar */}
      <div className="mt-8 w-4/5 mx-auto">
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
