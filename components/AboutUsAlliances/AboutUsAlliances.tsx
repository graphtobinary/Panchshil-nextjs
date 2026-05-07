"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import ArrowLeftIcon from "@/assets/svgs/ArrowLeftIcon";
import ArrowRightIcon from "@/assets/svgs/ArrowRightIcon";
import { AboutUsAlliancesContent } from "@/app/about/about.data";
import Link from "next/link";

type AboutUsAlliancesProps = {
  content: AboutUsAlliancesContent;
};

export default function AboutUsAlliances({ content }: AboutUsAlliancesProps) {
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);
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
    const rafSelect = requestAnimationFrame(onSelect);
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);

    return () => {
      cancelAnimationFrame(rafSelect);
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  const activeTab = content.tabs[selectedTabIndex] ?? content.tabs[0];
  const activeSlides = activeTab?.slides ?? [];

  useEffect(() => {
    if (emblaApi) {
      emblaApi.scrollTo(0);
      requestAnimationFrame(onSelect);
    }
  }, [selectedTabIndex, emblaApi, onSelect]);

  if (!activeTab) {
    return null;
  }

  return (
    <section className="bg-white py-14 md:py-20">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <h2 className="text-center text-2xl md:text-[28px] tracking-[0.04em] font-display-semi text-black-chocolate uppercase">
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
                className={`text-sm md:text-base font-medium tracking-wider transition-colors pb-1 uppercase ${
                  isTabActive
                    ? "text-[#B09E81] border-b-2 border-[#B09E81]"
                    : "text-[#B09E81]/60 hover:text-[#B09E81]"
                }`}
              >
                {tab.tabLabel}
              </button>
            );
          })}
        </div>

        <div className="relative mt-8 md:mt-12">
          {/* Navigation Arrows on Top Right */}
          <div className="absolute -top-12 right-0 z-20 md:flex items-center gap-3 hidden">
            <button
              aria-label="Previous"
              onClick={() => emblaApi?.scrollPrev()}
              disabled={!canPrev}
              className={`grid place-items-center text-[#B09E81] transition-opacity ${
                canPrev ? "opacity-100" : "opacity-40 cursor-not-allowed"
              }`}
            >
              <ArrowLeftIcon />
            </button>
            <button
              aria-label="Next"
              onClick={() => emblaApi?.scrollNext()}
              disabled={!canNext}
              className={`grid place-items-center text-[#B09E81] transition-opacity ${
                canNext ? "opacity-100" : "opacity-40 cursor-not-allowed"
              }`}
            >
              <ArrowRightIcon />
            </button>
          </div>

          <div
            className="embla-projects overflow-hidden"
            ref={emblaRef}
            key={activeTab.tabLabel}
          >
            <div className="embla-projects__container flex gap-6">
              {activeSlides.map((slide, index) => (
                <div
                  key={`${activeTab.tabLabel}-${index}`}
                  className="embla-projects__slide basis-[85%] md:basis-[calc(33.333%-1rem)] shrink-0 grow-0 min-w-0"
                >
                  <div className="border border-black/10 p-8 h-full flex flex-col justify-between">
                    <div>
                      <h3 className="text-2xl font-display-semi text-black-chocolate mb-5">
                        {slide.title}
                      </h3>
                      <p className="text-black/80 text-sm leading-relaxed">
                        {slide.description}
                      </p>
                    </div>
                    <div className="mt-8">
                      <Link
                        href={slide.linkHref}
                        className="text-[#B09E81] text-sm underline underline-offset-4 hover:text-[#8C7A5B] transition-colors"
                      >
                        {slide.linkLabel}
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
