"use client";

import { CareerInsideLifeSlide } from "@/app/careers/career-page.data";
import ArrowLeftIcon from "@/assets/svgs/ArrowLeftIcon";
import ArrowRightIcon from "@/assets/svgs/ArrowRightIcon";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";

type CareerInsideLifeCarouselProps = {
  slides: CareerInsideLifeSlide[];
};

export default function CareerInsideLifeCarousel({
  slides,
}: CareerInsideLifeCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    loop: false,
    containScroll: "trimSnaps",
  });

  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCanPrev(emblaApi.canScrollPrev());
    setCanNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const raf = requestAnimationFrame(onSelect);
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);

    return () => {
      cancelAnimationFrame(raf);
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <div className="relative w-full">
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

      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {slides.map((slide, index) => (
            <article
              key={`${slide.title}-${index}`}
              className="flex-[0_0_100%] relative h-[380px] md:h-[620px] overflow-hidden"
            >
              <Image
                src={slide.imageSrc}
                alt={slide.title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 h-2/5 bg-linear-to-t from-black/90 via-black/55 to-transparent" />
              <div className="absolute bottom-5 md:bottom-8 left-5 md:left-10 right-5 text-white">
                <p className="text-xl md:text-[25px] leading-tight font-display-semi">
                  {slide.title}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
