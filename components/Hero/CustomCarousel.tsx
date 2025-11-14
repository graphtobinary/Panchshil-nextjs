"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import { Button } from "../Button/Button";

export interface SlideData {
  image?: string;
  video?: string;
  title: string;
  description: string;
  ctaText: string;
}

interface CustomCarouselProps {
  slides: SlideData[];
}

export function CustomCarousel({ slides }: CustomCarouselProps) {
  const autoplay = useRef(
    Autoplay({ delay: 15000, stopOnInteraction: false, stopOnMouseEnter: true })
  );

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: "start",
      skipSnaps: false,
      dragFree: false,
      watchDrag: true,
    },
    [autoplay.current]
  );
  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    emblaApi.on("select", onSelect);
    onSelect(); // Call once to set initial state

    return () => {
      emblaApi.off("select", onSelect);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [emblaApi]);

  const currentSlide = slides[selectedIndex];

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Carousel */}
      <div className="embla h-full" ref={emblaRef}>
        <div className="embla__container flex h-full">
          {slides.map((slide, index) => (
            <div key={index} className="embla__slide flex-[0_0_100%] relative">
              {slide.video ? (
                <video
                  src={slide.video}
                  className="absolute inset-0 h-full w-full object-cover"
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="auto"
                />
              ) : (
                <Image
                  src={slide.image ?? ""}
                  alt={slide.title}
                  fill
                  className="object-cover"
                  priority={index === 0}
                />
              )}
              {/* Overlay for better text readability */}
              <div className="absolute inset-0 bg-black/20"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Content Overlay */}
      <div className="absolute inset-0 flex items-end justify-center z-40 pb-16 pointer-events-none">
        <div className="max-w-[1200px] mx-auto px-6 text-center">
          {/* Main Title */}
          <h1 className="text-3xl md:text-6xl lg:text-7xl font-display-semi text-white mb-6 tracking-tight">
            {currentSlide.title}
          </h1>

          {/* Description */}
          <p className="text-sm md:text-lg lg:text-lg text-white/90 max-w-4xl mx-auto mb-8 leading-relaxed">
            {currentSlide.description}
          </p>

          {/* CTA Button */}
          <Button variant="hero" size="lg" className="w-48">
            {currentSlide.ctaText}
          </Button>
          {/* <button className="relative w-36 h-12 pointer-events-auto">
              <span className="absolute top-0 left-0 right-0 bottom-0 bg-white opacity-40 hover:opacity-50 cursor-pointer text-white transition-opacity font-medium text-lg"></span>
              <div className=" w-full absolute z-10 left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2">
                {currentSlide.ctaText}
              </div>
            </button> */}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-50 w-full max-w-[1200px] px-6 pointer-events-none">
        <div className="h-0.5 bg-white/30 overflow-hidden">
          <div
            className="h-full bg-white transition-all duration-500 ease-out"
            style={{
              width: `${((selectedIndex + 1) / slides.length) * 100}%`,
            }}
          />
        </div>
      </div>
    </div>
  );
}
