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
  text2: string;
}

const defaultCards: EsgHeroCard[] = [
  {
    value: "21.68",
    unit: "MN SQ.FT.",
    label: "LEED EBOM V4.1 Existing Buildings",
  },
  {
    value: "14.5",
    unit: "MN SQ.FT.",
    label: "LEED EBOM V4.1 Existing Buildings",
  },
  {
    value: "51%",
    unit: "MN SQ.FT.",
    label: "Water Demand Met Through Recycling",
  },
  {
    value: "16.6",
    unit: "MN SQ.FT.",
    label: "Certified under Four ISO Management Systems",
  },
  {
    value: "100%",
    unit: "MN SQ.FT.",
    label: "LEED EBOM V4.1 Existing Buildings",
  },
];

const defaultTicker: EsgHeroTickerItem[] = Array(4).fill({
  number: "1,740",
  text: "EMISSION SAVINGS THROUGH SOLAR",
  text2: "tCO₂e",
});

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
          <div className="flex overflow-x-auto gap-4 md:gap-5 pb-4 md:pb-0 no-scrollbar md:grid md:grid-cols-5">
            {defaultCards.map((card, index) => (
              <div
                key={index}
                className="w-[283px] md:w-full h-[160px] flex-shrink-0 flex flex-col justify-between p-5 md:p-6 bg-white/[0.03] border border-white/[0.1] backdrop-blur-[2px] rounded-[2px] transition-all duration-300 hover:bg-white/[0.08] hover:border-white/[0.18]"
              >
                <div>
                  <span className="text-3xl md:text-[36px] font-display text-white leading-none font-medium">
                    {card.value}
                  </span>
                </div>
                <div className="flex flex-col mt-4">
                  <span className="text-[10px] md:text-[11px] font-semibold tracking-wider text-[#7F847E] font-sans uppercase">
                    {card.unit}
                  </span>
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
      <div className="relative z-20 w-full bg-white/[0.03] border border-white/[0.1] backdrop-blur-[2px] py-4.5 overflow-hidden px-6 mb-3">
        <div className="flex justify-center">
          {/* Main content group */}
          <div className="flex items-center gap-2 ">
            {defaultTicker.map((item, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <div className="flex items-center gap-2 font-sans text-[10px] md:text-[10px] tracking-widest uppercase font-semibold">
                  <span className="text-white text-sm">{item.number}</span>
                  <span className="text-[#7F847E]">{item.text2}</span>
                  <span className="text-[#40A937]">{item.text}</span>
                </div>
                {/* <span className="text-[#40A937] text-lg font-bold select-none">*</span> */}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
