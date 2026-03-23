"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import ArrowLeftIcon from "@/assets/svgs/ArrowLeftIcon";
import ArrowRightIcon from "@/assets/svgs/ArrowRightIcon";
import { EsgRecognitionSlide } from "@/app/esg/esg.data";

interface EsgRecognitionsCarouselProps {
  slides: EsgRecognitionSlide[];
}

export function EsgRecognitionsCarousel({
  slides,
}: EsgRecognitionsCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    loop: false,
    containScroll: "trimSnaps",
  });

  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

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
          {slides.map((slide, i) => (
            <div key={i} className="embla-signature__slide">
              <div className="relative h-[60vh] md:h-[70vh]">
                <Image
                  src={slide.imageSrc}
                  alt={slide.title}
                  fill
                  className="object-cover"
                  sizes="100vw"
                />
              </div>

              <div className="bg-[#F5EEE6] py-10 md:py-12">
                <div className="mx-auto px-6 md:px-10 max-w-[1200px] text-center">
                  <h3 className="text-black-chocolate text-2xl md:text-[25px] font-display-semi tracking-wide mb-4">
                    {slide.title}
                  </h3>

                  <p className="text-sm md:text-base text-black/80 leading-relaxed mb-8 max-w-[900px] mx-auto">
                    {slide.description}
                  </p>

                  <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 md:gap-12 text-gold-beige mb-10">
                    {slide.stats.map((stat, statIndex) => (
                      <div
                        key={statIndex}
                        className="flex items-center gap-4 md:gap-6"
                      >
                        <span className="text-sm md:text-base font-display-semi uppercase tracking-wider">
                          {stat}
                        </span>
                        {statIndex < slide.stats.length - 1 && (
                          <span className="hidden md:inline h-6 w-px bg-black-chocolate/20" />
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10">
                    {slide.sdgImages.map((imageSrc, imageIndex) => (
                      <Image
                        key={imageIndex}
                        src={imageSrc}
                        alt=""
                        width={80}
                        height={80}
                        className="object-contain"
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-center gap-2 mt-8 md:hidden">
        {slides.map((_, index) => (
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
