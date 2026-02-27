"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import ArrowLeftIcon from "@/assets/svgs/ArrowLeftIcon";
import ArrowRightIcon from "@/assets/svgs/ArrowRightIcon";
import { CareerGrowthSlide } from "@/app/careers/career-page.data";

type CareerGrowthExposureCarouselProps = {
  slides: CareerGrowthSlide[];
};

export default function CareerGrowthExposureCarousel({
  slides,
}: CareerGrowthExposureCarouselProps) {
  const autoplay = useRef(
    Autoplay({ delay: 3000, stopOnInteraction: false, stopOnMouseEnter: true })
  );

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      align: "start",
      loop: false,
      containScroll: "trimSnaps",
    },
    [autoplay.current]
  );

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
      <div className="absolute -top-12 right-8 z-20 md:flex items-center gap-3 hidden">
        <button
          aria-label="Previous"
          onClick={() => {
            emblaApi?.scrollPrev();
            autoplay.current?.reset();
          }}
          disabled={!canPrev}
          className={`grid place-items-center text-gold-beige transition-opacity ${
            canPrev ? "opacity-100" : "opacity-40 cursor-not-allowed"
          }`}
        >
          <ArrowLeftIcon />
        </button>
        <button
          aria-label="Next"
          onClick={() => {
            emblaApi?.scrollNext();
            autoplay.current?.reset();
          }}
          disabled={!canNext}
          className={`grid place-items-center text-gold-beige transition-opacity ${
            canNext ? "opacity-100" : "opacity-40 cursor-not-allowed"
          }`}
        >
          <ArrowRightIcon />
        </button>
      </div>

      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-4 md:gap-6">
          {slides.map((slide, index) => (
            <article
              key={`${slide.title}-${index}`}
              className="flex-[0_0_88%] md:flex-[0_0_32%] bg-white border border-black/10"
            >
              <div className="relative w-full h-[260px] md:h-[360px]">
                <Image
                  src={slide.imageSrc}
                  alt={slide.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-5 md:p-6">
                <h3 className="text-[25px] leading-tight text-black-chocolate font-display-semi">
                  {slide.title}
                </h3>
                <p className="mt-2 text-sm md:text-base text-black/75 leading-relaxed">
                  {slide.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className="mt-8 w-[70%] mx-auto">
        <div className="h-0.5 bg-gold-beige/25">
          <div
            className="h-full bg-gold-beige transition-[width] duration-300 ease-out"
            style={{ width: `${Math.max(2, scrollProgress * 100)}%` }}
          />
        </div>
      </div>
    </div>
  );
}
