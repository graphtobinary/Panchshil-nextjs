"use client";

import React from "react";
import Image from "next/image";
import wasteBanner from "@/assets/images/esg/waste-banner.png";

interface MetricItem {
  id: string;
  value: string;
  unit: string;
  label: string;
  borderClass: string;
}

const metrics: MetricItem[] = [
  {
    id: "01",
    value: "4,15,897",
    unit: "KG",
    label: "PAPER WASTE RECYCLED",
    borderClass: "border-b md:border-r border-[#E2DFD7]",
  },
  {
    id: "02",
    value: "2,73,734",
    unit: "KG",
    label: "PLASTIC WASTE RECYCLED",
    borderClass: "border-b md:border-r border-[#E2DFD7]",
  },
  {
    id: "03",
    value: "80,715",
    unit: "KG",
    label: "MULTI-LAYERED PLASTIC WASTE RECYCLED",
    borderClass: "border-b border-[#E2DFD7]",
  },
  {
    id: "04",
    value: "16,523",
    unit: "LITRES",
    label: "OIL RECYCLED FOR INDUSTRIAL USE",
    borderClass: "border-b md:border-b-0 md:border-r border-[#E2DFD7]",
  },
  {
    id: "05",
    value: "100%",
    unit: "",
    label: "BATTERIES DISPOSED VIA OEM PARTNERS",
    borderClass:
      "border-b md:border-b-0 md:border-r border-[#E2DFD7] last:border-b-0",
  },
  {
    id: "06",
    value: "100%",
    unit: "",
    label: "ORGANIC FOOD WASTE RECYCLED",
    borderClass: "border-none",
  },
];

export default function EsgWasteSection() {
  return (
    <section
      id="waste"
      className="w-full bg-[#F8F5EE] py-16 md:py-24 border-t border-[#E2DFD7]/30 transition-colors duration-300"
    >
      <div className="max-w-[1540px] mx-auto px-6 md:px-10 lg:px-12">
        {/* Header split layout */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-10 md:mb-14">
          <div className="flex flex-col">
            <span className="text-[#40A937] text-xs md:text-sm font-normal tracking-widest uppercase block mb-3 font-sans">
              — 03 / REDUCE. REUSE. REPURPOSE.
            </span>

            <h2 className="text-3xl md:text-5xl lg:text-[56px] font-display text-[#1F180D] leading-[1.1] tracking-tight font-medium">
              Waste.
            </h2>
          </div>

          <div className="mt-4 md:mt-0">
            <p className="text-sm md:text-base text-gray-600 font-sans font-light tracking-wide md:text-right">
              Managing resources responsibly across operations.
            </p>
          </div>
        </div>

        {/* Full-width Banner Image */}
        <div className="w-full relative aspect-[21/8] min-h-[220px] md:min-h-[380px] overflow-hidden mb-12 md:mb-16 rounded-[2px] shadow-sm">
          <Image
            src={wasteBanner}
            alt="Waste Management Banner"
            fill
            className="object-cover object-center"
          />
        </div>

        {/* 3x2 Grid of Metrics */}
        <div className="w-full grid grid-cols-1 md:grid-cols-3 ">
          {metrics.map((item, index) => (
            <div
              key={index}
              className={`relative p-8 min-h-[140px] flex flex-col justify-between bg-transparent ${item.borderClass}`}
            >
              <div className="relative">
                {/* Index number in the top-right corner of each cell */}
                <span className="absolute top-0 right-0 text-[10px] md:text-xs font-normal text-[#7F847E]/60 font-sans select-none">
                  {item.id}
                </span>

                <div className="mt-2">
                  <span className="font-display text-3xl md:text-[40px] lg:text-[44px] font-normal text-[#1F180D] leading-none tracking-tight">
                    {item.value}
                  </span>
                  {item.unit && (
                    <span className="font-display text-[10px] md:text-xs font-normal text-[#7F847E] font-sans ml-1.5 tracking-wide uppercase align-baseline">
                      {item.unit}
                    </span>
                  )}
                </div>

                <span className="text-[10px] md:text-[11px] font-normal text-[#40A937] tracking-wider font-sans mt-4 block leading-normal">
                  {item.label}
                </span>
              </div>

              {/* Bottom Accent line */}
              <div className="w-12 h-px bg-[#AB9B81] mt-5" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
