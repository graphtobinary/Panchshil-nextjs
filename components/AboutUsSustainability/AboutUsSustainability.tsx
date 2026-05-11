"use client";

import { useState } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import Link from "next/link";
import ArrowLeftIcon from "@/assets/svgs/ArrowLeftIcon";
import ArrowRightIcon from "@/assets/svgs/ArrowRightIcon";
import { AboutUsSustainabilityContent } from "@/app/about/about.data";

export default function AboutUsSustainability({
  content,
}: {
  content: AboutUsSustainabilityContent;
}) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    loop: false,
  });

  const [canPrev] = useState(false);
  const [canNext] = useState(false);

  // const onSelect = useCallback(() => {
  //   if (!emblaApi) return;
  //   setCanPrev(emblaApi.canScrollPrev());
  //   setCanNext(emblaApi.canScrollNext());
  // }, [emblaApi]);
  // const onSelect = useCallback(() => {
  //   if (!emblaApi) return;

  //   const prev = emblaApi.canScrollPrev();
  //   const next = emblaApi.canScrollNext();

  //   setCanPrev((p) => (p !== prev ? prev : p));
  //   setCanNext((n) => (n !== next ? next : n));
  // }, [emblaApi]);

  // useEffect(() => {
  //   if (!emblaApi) return;

  //   // Run after paint safely
  //   Promise.resolve().then(onSelect);

  //   emblaApi.on("select", onSelect);
  //   emblaApi.on("reInit", onSelect);

  //   return () => {
  //     emblaApi.off("select", onSelect);
  //     emblaApi.off("reInit", onSelect);
  //   };
  // }, [emblaApi, onSelect]);

  return (
    <section className="bg-[#FFFAF7] py-16 md:py-24 relative">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        {/* Top right nav */}
        <div className="flex justify-end mb-8 gap-3">
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

        {/* Carousel */}
        <div className="embla overflow-hidden" ref={emblaRef}>
          <div className="embla__container flex">
            {content.slides.map((slide, index) => (
              <div
                key={index}
                className="embla__slide basis-full shrink-0 grow-0 min-w-0"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
                  <div className="relative w-full aspect-[4/3] md:aspect-[16/11]">
                    <Image
                      src={slide.imageSrc}
                      alt="Sustainability"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-col items-start text-center md:text-left px-4 md:px-0">
                    <h2 className="text-2xl md:text-[28px] font-display-semi text-black">
                      {slide.title}
                    </h2>
                    <p className="mt-8 mb-10 text-black/80 text-sm md:text-base leading-relaxed text-center w-full max-w-[560px] mx-auto">
                      {slide.description}
                    </p>
                    <div className="w-full flex justify-center">
                      <Link href={slide.ctaHref}>
                        <button
                          className={`px-4 py-3 cursor-pointer text-sm font-medium hover:opacity-90 transition-all shadow-sm w-fit bg-gold-beige text-white`}
                        >
                          {slide.ctaLabel}
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
