"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import ArrowLeftIcon from "@/assets/svgs/ArrowLeftIcon";
import ArrowRightIcon from "@/assets/svgs/ArrowRightIcon";
import { LifeAtPanchshilPageData } from "@/app/careers/life-at-panchshil/life-at-panchshil.data";
import DoubleQuotesIcon from "@/assets/svgs/DoubleQuotesIcon";

type LifeResidentsVoicesProps = {
  content: LifeAtPanchshilPageData["residentsVoices"];
};

export default function LifeResidentsVoices({
  content,
}: LifeResidentsVoicesProps) {
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
    <section className="w-full bg-[#F7F4F1] py-14 md:py-20">
      <div className="mx-auto max-w-[1540px] px-6 md:px-10">
        <div className="mb-8 md:mb-10">
          <div className="text-lg tracking-[0.2em] font-medium text-gold-beige mb-2">
            {content.heading}
          </div>
          <h2 className="text-2xl md:text-[28px] font-display-semi text-black-chocolate">
            {content.title}
          </h2>
          <p className="mt-4 text-sm md:text-base text-black/75 leading-relaxed max-w-[1240px]">
            {content.description}
          </p>
        </div>

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

          <div className="embla-projects mx-0" ref={emblaRef}>
            <div className="embla-projects__container gap-8">
              {content.testimonials.map((item, index) => (
                <article
                  key={`${item.author}-${index}`}
                  className="embla-projects__slide basis-[96%] md:basis-[48%] shrink-0 grow-0 bg-[#F1EFEC] border border-black/5"
                >
                  <div className="p-6 md:p-8 bg-white">
                    <div className="flex items-start justify-end text-[64px] leading-[0.8] text-gold-beige font-display-semi rotate-180">
                      <DoubleQuotesIcon width={64} height={64} />
                    </div>
                    <p className="mt-2 text-base md:text-[16px] font-semibold text-black/90 leading-5">
                      {item.quote}
                    </p>
                    <p className="mt-6 text-sm md:text-base text-black/80 leading-relaxed">
                      {item.details}
                    </p>
                  </div>

                  <div className="bg-[#AB9B81] px-6 md:px-8 py-4 flex items-center gap-4">
                    <div className="relative w-14 h-14 shrink-0 overflow-hidden">
                      <Image
                        src={item.avatarSrc}
                        alt={item.avatarAlt}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <p className="text-white font-display-semi text-xl md:text-[18px] leading-tight">
                        {item.author}
                      </p>
                      <p className="text-white/90 text-sm md:text-lg">
                        {item.role}
                      </p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 md:mt-12 w-4/5 mx-auto">
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
