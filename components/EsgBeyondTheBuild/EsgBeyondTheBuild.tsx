"use client";

import Image from "next/image";
import { EsgPageData } from "@/app/esg/esg.data";

type EsgBeyondTheBuildProps = {
  content: EsgPageData["beyondTheBuild"];
};

export default function EsgBeyondTheBuild({ content }: EsgBeyondTheBuildProps) {
  const leftColumnStats = content.stats.filter((_, i) => i % 2 === 0);
  const rightColumnStats = content.stats.filter((_, i) => i % 2 === 1);

  return (
    <>
      <section className="relative bg-[#FFFAF7] py-14 md:py-20 overflow-visible">
        {/* Decorative: Leaf top-left */}
        {content.leafImageSrc && (
          <div className="absolute -top-30 left-0 z-0 w-48 md:w-68 h-48 md:h-68 opacity-90">
            <Image
              src={content.leafImageSrc}
              alt=""
              fill
              className="object-contain object-top-left"
              aria-hidden
            />
          </div>
        )}
        {/* Decorative: Bird top-right */}
        {content.birdImageSrc && (
          <div className="absolute top-50 right-50 z-0 w-32 md:w-48 h-32 md:h-48 opacity-90">
            <Image
              src={content.birdImageSrc}
              alt=""
              fill
              className="object-contain object-top-right"
              aria-hidden
            />
          </div>
        )}

        {/* Decorative: Leaf bottom-right */}
        {content.leafImageSrc && (
          <div className="absolute bottom-30 -right-14 z-0 w-40 md:w-90 h-40 md:h-90 opacity-90">
            <Image
              src={content.leafImageSrc2}
              alt=""
              fill
              className="object-contain object-bottom-right"
              aria-hidden
            />
          </div>
        )}

        <div className="relative z-10 mx-auto px-6 md:px-20">
          <h2 className="text-center text-2xl md:text-[28px] font-display-semi text-black mb-4">
            {content.title}
          </h2>
          <p className="text-center text-sm md:text-base text-black/70 max-w-[800px] mx-auto mb-12 md:mb-16 leading-relaxed">
            {content.description}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 md:gap-x-20 gap-y-0">
            {/* Left column */}
            <div className="flex flex-col">
              {leftColumnStats.map((stat, index) => (
                <div
                  key={`left-${index}`}
                  className="py-6 border-b border-black/15 last:border-b-0"
                >
                  <span className="block text-2xl md:text-[32px] font-display-semi text-gold-beige">
                    {stat.value}
                  </span>
                  <span className="block mt-1 text-sm md:text-base text-black/75">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>

            {/* Right column */}
            <div className="flex flex-col">
              {rightColumnStats.map((stat, index) => (
                <div
                  key={`right-${index}`}
                  className="py-6 border-b border-black/15 last:border-b-0"
                >
                  <span className="block text-2xl md:text-[32px] font-display-semi text-gold-beige">
                    {stat.value}
                  </span>
                  <span className="block mt-1 text-sm md:text-base text-black/75">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
