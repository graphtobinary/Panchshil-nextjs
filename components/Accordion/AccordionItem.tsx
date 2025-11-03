"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { Button } from "../Button";

interface AccordionItemProps {
  id: number;
  title: string;
  description: string;
  image: string;
  stats?: Array<{ label: string }>;
  isOpen: boolean;
  onToggle: () => void;
}

export function AccordionItem({
  id,
  title,
  description,
  image,
  stats,
  isOpen,
  onToggle,
}: AccordionItemProps) {
  const itemRef = useRef<HTMLDivElement>(null);
  const clickRef = useRef(false);

  // When an item opens, scroll it to the top of the viewport smoothly
  useEffect(() => {
    if (isOpen && clickRef.current && itemRef.current) {
      itemRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
      clickRef.current = false; // reset after scroll
    }
  }, [isOpen]);
  return (
    <div ref={itemRef}>
      {/* Accordion Header */}
      <button
        onClick={() => {
          clickRef.current = true;
          onToggle();
        }}
        className="flex cursor-pointer items-center gap-4 justify-between py-6 px-4 md:px-8 bg-[#FFFAF7] border-b border-gray-200 hover:bg-gray-50 transition-colors w-4/5 mx-auto"
      >
        <div className="flex items-center gap-6 w-full justify-between">
          <span className="text-2xl font-display-semi text-black-chocolate">
            {String(id).padStart(2, "0")}
          </span>
          <span className="text-lg md:text-xl font-display-semi text-black-chocolate">
            {title}
          </span>
        </div>
        <span className="text-xl  font-light text-black-chocolate">
          {isOpen ? "−" : "+"}
        </span>
      </button>

      {/* Accordion Content */}
      {isOpen && (
        <div className="relative w-full h-[70vh] md:h-[80vh] overflow-hidden bg-black-chocolate">
          {/* Background Image */}
          <div className="absolute inset-0">
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/60 via-black/40 to-black/80 "></div>

          {/* Content Overlay */}
          <div className="relative z-10 h-full flex flex-col justify-end items-center max-w-[1200px] mx-auto px-6 md:px-12 py-16">
            {/* Title */}
            <h3 className="text-5xl uppercase md:text-4xl  font-display-semi text-white mb-6 max-w-3xl">
              {title}
            </h3>

            {/* Description */}
            <p className="text-base md:text-lg text-center text-white/95 mb-8 max-w-3xl leading-relaxed">
              {description}
            </p>

            {/* Stats */}
            {stats && stats.length > 0 && (
              <div className="flex flex-wrap gap-6 md:gap-8 text-white">
                {stats.map((stat, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <span className="text-lg md:text-xl">•</span>
                    <span className="text-base md:text-lg font-display-semi">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>
            )}
            {/* CTA Button */}
            <div className="flex justify-center pt-5">
              <Button variant="hero" size="lg" className="w-48">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
