"use client";

import React from "react";
import Image from "next/image";
import esgPageHeroBanner from "@/assets/images/esg/esg-page-hero-banner.png";

export interface EsgHeroCard {
  value: string;
  unit: string;
  label: string;
}

export interface EsgHeroTickerItem {
  number: string;
  text: string;
}

const defaultCards: EsgHeroCard[] = [
  {
    value: "21.68",
    unit: "MN SQ.FT.",
    label: "LEED Core & Shell Certified",
  },
  {
    value: "14.5",
    unit: "MN SQ.FT.",
    label: "LEED EBOM V4.1 Existing Buildings",
  },
  {
    value: "51%",
    unit: "",
    label: "Water Demand Met Through Recycling",
  },
  {
    value: "16.6",
    unit: "MN SQ.FT.",
    label: "Certified under Four ISO Management Systems",
  },
  {
    value: "100%",
    unit: "",
    label: "Organic Food Waste Recycled",
  },
];

// Items displayed in the scrolling ticker
const tickerItems: EsgHeroTickerItem[] = [
  { number: "WASTE RECYCLED", text: "" },
  { number: "2.43", text: "MN KWH SOLAR ENERGY GENERATED" },
  { number: "1,740", text: "TCO₂E EMISSION SAVINGS THROUGH SOLAR" },
  { number: "6,10,247", text: "KL WATER RECYCLED THROUGH STPS" },
];

// Duplicate items list to cover screen width before marquee loops
const defaultTicker: EsgHeroTickerItem[] = [
  ...tickerItems,
  ...tickerItems,
  ...tickerItems,
  ...tickerItems,
];

export default function EsgHero() {
  return (
    <section className="relative w-full min-h-screen flex flex-col justify-between overflow-hidden bg-[#0F140D]">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={esgPageHeroBanner}
          alt="ESG at Panchshil Hero Banner"
          fill
          priority
          className="object-cover object-center"
        />
        {/* Subtle dark overlay for readability */}
        <div className="absolute inset-0 bg-black/20 z-0" />
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 flex-1 flex flex-col justify-end w-full max-w-[1540px] mx-auto px-6 md:px-10 lg:px-12 pt-36 pb-8">
        <div className="w-full mb-12">
          {/* Badge */}
          <span className="text-[#40A937] text-xs md:text-sm font-normal tracking-widest uppercase block mb-4 animate-fade-in-up">
            — ESG AT PANCHSHIL
          </span>

          {/* Heading */}
          <h1 className="text-4xl md:text-5xl lg:text-[64px] font-display text-white leading-[1.1] tracking-tight max-w-4xl animate-fade-in-up-delay-1">
            Building Workplaces That <br className="hidden md:inline" />
            Work <span className="text-[#40A937]">Better</span> for the Planet.
          </h1>

          {/* Description */}
          <p className="mt-6 text-sm md:text-base lg:text-[17px] text-[#E5E7EB] max-w-3xl leading-relaxed animate-fade-in-up-delay-2 font-sans font-light">
            At Panchshil Office Parks, sustainability is integrated into the way
            we design, build and operate commercial ecosystems. Across energy,
            water, waste, mobility, indoor environmental quality and safety, our
            ESG initiatives are designed to reduce impact, improve efficiency
            and create healthier, future-ready workplaces.
          </p>
        </div>

        {/* Backdrop Blurred Cards */}
        <div className="relative z-10 w-full animate-fade-in-up-delay-3 mt-4">
          <div className="flex overflow-x-auto gap-4 md:gap-5 pb-4 md:pb-0 no-scrollbar md:grid md:grid-cols-5 md:overflow-x-visible">
            {defaultCards.map((card, index) => (
              <div
                key={index}
                className="w-[283px] md:w-full h-40 shrink-0 flex flex-col justify-between p-5 md:p-6  border border-white/10 backdrop-blur-[2px] transition-all duration-300 group hover:-translate-y-[3px]
                bg-linear-to-b from-white/3 to-white/1 hover:border-[#4ade80] hover:bg-emerald-950/20 hover:shadow-[0_0_30px_rgba(74,222,128,0.15)]"
              >
                <div>
                  <span className="text-3xl md:text-[36px] font-display text-white leading-none font-medium">
                    {card.value}
                  </span>
                </div>
                <div className="flex flex-col mt-4">
                  {card.unit && (
                    <span className="text-[10px] md:text-[11px] font-semibold tracking-wider text-[#7F847E] font-sans uppercase">
                      {card.unit}
                    </span>
                  )}
                  <span className="text-xs md:text-[13px] text-[#40A937] font-sans font-medium mt-1 leading-snug">
                    {card.label}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Infinite Horizontal Scrolling Ticker */}
      <div className="relative z-20 w-full  border-t border-b border-white/[0.05] backdrop-blur-[2px] py-4.5 overflow-hidden">
        <div className="flex whitespace-nowrap">
          {/* Main content group */}
          <div className="flex items-center gap-12 shrink-0 animate-marquee">
            {defaultTicker.map((item, idx) => (
              <div key={idx} className="flex items-center gap-12">
                <div className="flex items-center gap-2 font-sans text-xs md:text-xs tracking-widest uppercase font-normal">
                  {item.number.match(/[A-Z]/) ? (
                    <span className="text-[#40A937]">{item.number}</span>
                  ) : (
                    <span className="text-white">{item.number}</span>
                  )}
                  {item.text && (
                    <span className="text-[#40A937]">{item.text}</span>
                  )}
                </div>
                <span className="text-white/40 select-none px-2">•</span>
              </div>
            ))}
          </div>
          {/* Duplicate content group for seamless loop */}
          <div
            className="flex items-center gap-12 shrink-0 animate-marquee"
            aria-hidden="true"
          >
            {defaultTicker.map((item, idx) => (
              <div key={`dup-${idx}`} className="flex items-center gap-12">
                <div className="flex items-center gap-2 font-sans text-xs md:text-sm tracking-widest uppercase font-semibold">
                  {item.number.match(/[A-Z]/) ? (
                    <span className="text-[#40A937]">{item.number}</span>
                  ) : (
                    <span className="text-white">{item.number}</span>
                  )}
                  {item.text && (
                    <span className="text-[#40A937]">{item.text}</span>
                  )}
                </div>
                <span className="text-white/40 select-none px-2">•</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
