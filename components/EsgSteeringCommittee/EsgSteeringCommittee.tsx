"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import ArrowLeftIcon from "@/assets/svgs/ArrowLeftIcon";
import ArrowRightIcon from "@/assets/svgs/ArrowRightIcon";
import { EsgPageData } from "@/app/esg/esg.data";

type EsgSteeringCommitteeProps = {
  content: EsgPageData["steeringCommittee"];
};

export default function EsgSteeringCommittee({
  content,
}: EsgSteeringCommitteeProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    dragFree: false,
    slidesToScroll: 1,
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
    const raf = requestAnimationFrame(() => onScroll());
    const rafSelect = requestAnimationFrame(() => onSelect());
    emblaApi.on("scroll", onScroll);
    emblaApi.on("reInit", onScroll);
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => {
      cancelAnimationFrame(raf);
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
        <div className="text-center mb-12 md:mb-16 px-4 md:px-0">
          {content.heading && (
            <div className="text-lg tracking-[0.2em] font-medium text-gold-beige mb-2">
              {content.heading}
            </div>
          )}
          <h2 className="text-2xl md:text-[28px] font-display-semi text-black max-w-[1200px] mx-auto">
            {content.title ||
              "OUR ESG STEERING COMMITTEE ENSURES THAT 24 GROUP WIDE POLICIES UPHOLD TRANSPARENCY, ETHICS AND ACCOUNTABILITY"}
          </h2>
        </div>

        <div className="relative">
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

          <div className="embla-projects mx-2 md:mx-0" ref={emblaRef}>
            <div className="embla-projects__container gap-6 md:gap-8">
              {content.cards.map((card, index) => (
                <article
                  key={`${card.title}-${index}`}
                  className="embla-projects__slide basis-[80%] md:basis-[28.571%] shrink-0 grow-0"
                >
                  <div className="relative w-full aspect-[4/3] overflow-hidden">
                    <Image
                      src={card.imageSrc}
                      alt={card.imageAlt}
                      fill
                      className="object-cover"
                      sizes="(min-width: 768px) 28vw, 80vw"
                    />
                  </div>
                  <h3 className="mt-4 text-2xl md:text-[25px] leading-tight text-black-chocolate font-display-semi">
                    {card.title}
                  </h3>
                  <p className="mt-2 text-sm md:text-base text-black/75 leading-relaxed">
                    {card.description}
                  </p>
                </article>
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
