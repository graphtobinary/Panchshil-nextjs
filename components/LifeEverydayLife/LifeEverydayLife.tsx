"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import ArrowLeftIcon from "@/assets/svgs/ArrowLeftIcon";
import ArrowRightIcon from "@/assets/svgs/ArrowRightIcon";
import { LifeAtPanchshilPageData } from "@/app/careers/life-at-panchshil/life-at-panchshil.data";

type LifeEverydayLifeProps = {
  content: LifeAtPanchshilPageData["everydayLife"];
};

export default function LifeEverydayLife({ content }: LifeEverydayLifeProps) {
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
    emblaApi.on("reInit", onSelect);

    return () => {
      cancelAnimationFrame(rafScroll);
      cancelAnimationFrame(rafSelect);
      emblaApi.off("scroll", onScroll);
      emblaApi.off("reInit", onScroll);
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onScroll, onSelect]);

  return (
    <section className="bg-white py-14 md:py-20">
      <div className="max-w-[1540px] mx-auto px-6 md:px-10">
        <div className="text-center">
          <div className="text-lg tracking-[0.2em] font-medium text-gold-beige mb-2">
            {content.heading}
          </div>
          <h2 className="text-2xl md:text-[28px] font-display-semi text-black-chocolate">
            {content.title}
          </h2>
          <p className="mt-3 text-sm md:text-base text-black/75 max-w-[960px] mx-auto leading-relaxed">
            {content.description}
          </p>
        </div>

        <div className="relative mt-8 md:mt-12">
          <div className="absolute -top-10 right-0 z-20 md:flex items-center gap-3 hidden">
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
              {content.slides.map((slide, index) => (
                <div
                  key={`${slide.caption}-${index}`}
                  className="embla-signature__slide"
                >
                  <div className="relative w-full aspect-video overflow-hidden">
                    <Image
                      src={slide.imageSrc}
                      alt={slide.imageAlt}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-linear-to-b from-white/45 via-black/25 to-black/90" />
                    <div className="absolute left-6 md:left-12 bottom-6 md:bottom-8 z-10">
                      <p className="text-white text-lg md:text-[18px] font-display-semi">
                        {slide.caption}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 w-4/5 mx-auto">
          <div className="h-0.5 bg-gold-beige/20">
            <div
              className="h-full bg-gold-beige transition-[width] duration-300 ease-out"
              style={{ width: `${Math.max(2, scrollProgress * 100)}%` }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
