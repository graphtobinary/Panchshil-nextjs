"use client";

import React from "react";
import Image from "next/image";
import mobilityBanner from "@/assets/images/esg/mobility-banner.png";

interface MetricItem {
  value: string;
  unit?: string;
  label: string;
  borderClass: string;
  isTextValue?: boolean;
}

const metrics: MetricItem[] = [
  {
    value: "85",
    label: "FOUR-WHEELER EV CHARGERS INSTALLED",
    borderClass: " md:border-t border-white/10",
  },
  {
    value: "454",
    label: "VEHICLES / DAY CHARGING CAPACITY",
    borderClass: "md:border-t border-white/10",
  },
  {
    value: "10,496",
    label: "EVs CHARGED ACROSS ALL PANCHSHIL OFFICE PARKS",
    borderClass: "border-t border-white/10",
  },
  {
    value: "~142",
    unit: "TCO₂E",
    label: "OIL RECYCLED FOR INDUSTRIAL USE",
    borderClass: "border-b md:border-b-0 md:border-t border-white/10",
  },
  {
    value: "20",
    label: "RECYCLED WATER USED FOR IRRIGATION",
    borderClass:
      "border-b md:border-b-0 md:border-t border-white/10 last:border-b-0",
  },
  {
    value: "E-Shuttle Services",
    label: "IN COLLABORATION WITH MAHA-METRO AND PMPML",
    borderClass:
      "border-b md:border-b-0 md:border-t border-white/10 last:border-b-0",
    isTextValue: true,
  },
];

export default function EsgMobilitySection() {
  return (
    <section
      id="mobility"
      className="w-full relative min-h-[600px] flex flex-col justify-between py-16 md:py-24 overflow-hidden "
    >
      {/* Background Banner Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={mobilityBanner}
          alt="Mobility Banner Background"
          fill
          className="object-cover object-center"
        />
        {/* Dark overlay for readability */}
        {/* <div className="absolute inset-0 bg-black/75 z-0" /> */}
      </div>

      <div className="max-w-[1540px] w-full mx-auto px-6 md:px-10 lg:px-12 relative z-10 flex-1 flex flex-col justify-between">
        {/* Header split layout */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16 md:mb-20">
          <div className="flex flex-col">
            <span className="text-[#40A937] text-xs md:text-sm font-normal tracking-widest uppercase block mb-3 font-sans">
              — 05 / MOVE CLEANER
            </span>

            <h2 className="text-3xl md:text-5xl lg:text-[56px] font-display text-white leading-[1.1] tracking-tight font-medium">
              Mobility.
            </h2>
          </div>

          <div className="mt-4 md:mt-0">
            <p className="text-sm md:text-base text-white/70 font-sans font-light tracking-wide md:text-right">
              Enabling cleaner commutes and connected ecosystems.
            </p>
          </div>
        </div>

        {/* 3x2 Grid of Metrics (Overlayed with faint white borders) */}
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-10 pt-4">
          {metrics.map((item, index) => (
            <div
              key={index}
              className={`p-8 md:p-5  min-h-30 flex flex-col justify-center bg-transparent ${item.borderClass} `}
            >
              <div>
                <span
                  className={`font-display text-white leading-none tracking-tight font-normal ${
                    item.isTextValue
                      ? "text-2xl md:text-3xl lg:text-[34px]"
                      : "text-3xl md:text-[40px] lg:text-[44px]"
                  }`}
                >
                  {item.value}
                </span>
                {item.unit && (
                  <span className="text-[10px] md:text-xs font-semibold text-white/50 font-sans ml-1.5 tracking-wide uppercase align-baseline">
                    {item.unit}
                  </span>
                )}
              </div>

              <span className="text-[10px] md:text-[11px] font-normal text-[#40A937] tracking-wider font-sans mt-3 block leading-relaxed uppercase">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
