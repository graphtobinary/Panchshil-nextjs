"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";
import ArrowLeftIcon from "@/assets/svgs/ArrowLeftIcon";
import ArrowRightIcon from "@/assets/svgs/ArrowRightIcon";
import { EsgPageData } from "@/app/esg/esg.data";

type EsgReportsProps = {
  content: EsgPageData["reports"];
};

export default function EsgReports({ content }: EsgReportsProps) {
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
    <section className="w-full bg-white py-10 md:py-20">
      <div className=" mx-auto px-6 md:px-0">
        <div className="text-center mb-10">
          <div className="text-lg font-medium tracking-[0.2em] text-gold-beige mb-2">
            {content.heading}
          </div>
          <h2 className="text-2xl md:text-[28px] font-display-semi text-black max-w-[900px] mx-auto">
            {content.title}
          </h2>
        </div>

        <div className="relative">
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
            <div className="embla-projects__container gap-4 md:gap-6">
              {content.reports.map((report, i) => (
                <Link
                  key={i}
                  href={report.href}
                  className="embla-projects__slide basis-[80%] md:basis-[25.571%] shrink-0 grow-0 group"
                >
                  <div className="relative h-[340px] md:h-[420px] overflow-hidden transition-all duration-300">
                    <Image
                      src={report.imageSrc}
                      alt={report.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      sizes="(min-width: 768px) 28vw, 80vw"
                    />
                    <div className="absolute inset-0 bg-linear-to-b from-black/10 via-white/40 to-black/70" />

                    <div className="absolute inset-0 flex flex-col items-center justify-end p-6">
                      <span className="text-xs md:text-sm font-medium tracking-wider text-white uppercase">
                        {report.subtitle}
                      </span>
                      <span className="text-2xl md:text-lg font-display-semi tracking-wide text-white mt-1">
                        {report.title}
                      </span>

                      <div className="mt-4">
                        <span className="inline-flex h-12 w-12 items-center justify-center border border-gold-beige group-hover:border-gold-beige group-hover:bg-gold-beige transition-all duration-300 [&_svg]:fill-gold-beige group-hover:[&_svg]:fill-white [&_svg]:transition-colors [&_svg]:duration-300">
                          <ArrowRightIcon
                            fill="#9E8C70"
                            width={28}
                            height={18}
                          />
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
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
