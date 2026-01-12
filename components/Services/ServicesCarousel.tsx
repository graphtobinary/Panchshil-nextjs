"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import ArrowLeftIcon from "@/assets/svgs/ArrowLeftIcon";
import ArrowRightIcon from "@/assets/svgs/ArrowRightIcon";
import { ServicesProps } from "@/interfaces";
import Link from "next/link";

export interface ServiceCardData {
  id: string;
  title: string;
  image: string;
}

export function ServicesCarousel({ items }: { items: ServicesProps[] }) {
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
      {/* Top right nav */}
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

      <div className="embla-projects mx-2 md:mx-0" ref={emblaRef}>
        <div className="embla-projects__container gap-6 md:gap-8">
          {items.map((item, i) => (
            <Link
              className="cursor-pointer embla-projects__slide basis-[80%] md:basis-[28.571%] shrink-0 grow-0 relative rounded-sm overflow-hidden border border-black-chocolate/10 bg-white"
              href={item?.service_link || ""}
              key={i}
            >
              <div>
                <div className="relative h-[260px] md:h-[320px]">
                  <Image
                    src={item?.service_thumbnail || ""}
                    alt={item?.service_title || "Service"}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="p-5 flex items-center flex-col">
                  <div className="text-black-chocolate font-display-semi text-xl md:text-base">
                    {item?.service_title}
                  </div>
                  <div className="mt-2 text-[12px] text-gold-beige underline underline-offset-4">
                    {item?.service_link_label}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Progress bar */}
      <div className="mt-12 w-4/5 mx-auto">
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
