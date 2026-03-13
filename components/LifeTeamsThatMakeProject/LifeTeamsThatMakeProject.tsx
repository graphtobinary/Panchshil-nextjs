"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import ArrowLeftIcon from "@/assets/svgs/ArrowLeftIcon";
import ArrowRightIcon from "@/assets/svgs/ArrowRightIcon";
import { TeamsThatMakeProjectContent } from "@/app/careers/life-at-panchshil/life-at-panchshil.data";

type LifeTeamsThatMakeProjectProps = {
  content: TeamsThatMakeProjectContent;
};

export default function LifeTeamsThatMakeProject({
  content,
}: LifeTeamsThatMakeProjectProps) {
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    loop: false,
    containScroll: "trimSnaps",
  });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  const onScroll = useCallback(() => {
    if (!emblaApi) return;
    setScrollProgress(emblaApi.scrollProgress());
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
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

  const activeTab = content.tabs[selectedTabIndex] ?? content.tabs[0];
  const activeSlides = activeTab?.slides ?? [];
  const activeSlide = activeSlides[selectedIndex] ?? activeSlides[0];

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSelectedIndex(0);
    setScrollProgress(0);
    setCanPrev(false);
    setCanNext((activeSlides?.length ?? 0) > 1);
  }, [selectedTabIndex, activeSlides.length]);

  if (!activeSlide || !activeTab) {
    return null;
  }

  return (
    <section className="bg-white py-14 md:py-20">
      <div className="max-w-[1540px] mx-auto px-6 md:px-10">
        <h2 className="text-center text-2xl md:text-[28px] tracking-[0.04em] font-display-semi text-black-chocolate">
          {content.title}
        </h2>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-6 md:gap-12 mb-10">
          {content.tabs.map((tab, index) => {
            const isTabActive = index === selectedTabIndex;

            return (
              <button
                type="button"
                key={tab.tabLabel}
                onClick={() => setSelectedTabIndex(index)}
                className={`text-lg md:text-[16px] font-medium tracking-wider transition-colors ${
                  isTabActive
                    ? "text-gold-beige border-b-3 border-gold-beige"
                    : "text-gold-beige/60 hover:text-gold-beige"
                }`}
              >
                {tab.tabLabel}
              </button>
            );
          })}
        </div>

        <p className="mt-8 text-center text-sm md:text-base text-black/75 max-w-[960px] mx-auto leading-relaxed">
          {activeSlide.description}
        </p>

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

          <div
            className="embla-signature"
            ref={emblaRef}
            key={activeTab.tabLabel}
          >
            <div className="embla-signature__container">
              {activeSlides.map((slide, index) => (
                <div
                  key={`${activeTab.tabLabel}-${index}`}
                  className="embla-signature__slide"
                >
                  <div className="relative w-full aspect-video overflow-hidden">
                    <Image
                      src={slide.imageSrc}
                      alt={slide.imageAlt}
                      fill
                      className="object-cover"
                    />
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
