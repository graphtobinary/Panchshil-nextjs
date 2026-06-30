"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import wasteBanner from "@/assets/images/esg/waste-banner.png";
import { useCountUp } from "@/hooks/useCountUp";

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

function parseNumericValue(value: string): {
  target: number;
  prefix: string;
  suffix: string;
} {
  const suffixMatch = value.match(/%/);
  const prefixMatch = value.match(/^~/);
  const clean = value.replace(/[~%]/g, "").replace(/,/g, "");
  return {
    target: parseFloat(clean) || 0,
    prefix: prefixMatch ? "~" : "",
    suffix: suffixMatch ? "%" : "",
  };
}

function formatNumber(num: number, decimals: number): string {
  if (decimals > 0) {
    return num.toLocaleString("en-IN", {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    });
  }
  return num.toLocaleString("en-IN");
}

function AnimatedMetric({
  value,
  isActive,
}: {
  value: string;
  isActive: boolean;
}) {
  const { target, prefix, suffix } = parseNumericValue(value);
  const animatedValue = useCountUp(Math.round(target), isActive);
  const decimals = value.includes(".")
    ? value.split(".")[1].replace(/,/g, "").length
    : 0;
  const display = prefix + formatNumber(animatedValue, decimals) + suffix;
  return <>{display}</>;
}

export default function EsgWasteSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -100px 0px" }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="waste"
      ref={sectionRef}
      className="w-full bg-[#F8F5EE] py-16 md:py-24 border-t border-[#E2DFD7]/30 transition-colors duration-300"
    >
      <div className="max-w-[1540px] mx-auto px-6 md:px-10 lg:px-12">
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

        <div className="w-full relative aspect-[21/8] min-h-[220px] md:min-h-[380px] overflow-hidden mb-12 md:mb-16 rounded-[2px] shadow-sm">
          <Image
            src={wasteBanner}
            alt="Waste Management Banner"
            fill
            className="object-cover object-center"
          />
        </div>

        <div className="w-full grid grid-cols-1 md:grid-cols-3 ">
          {metrics.map((item, index) => (
            <div key={index} className="bg-[#ddd]">
              <div
                className={`relative p-8 min-h-[150px] flex flex-col justify-between bg-[#F8F5EE] transition-all duration-300 hover:bg-[#fff]  hover:-translate-y-[3px] group ${item.borderClass}`}
              >
                <div className="relative">
                  <span className="absolute top-0 right-0 text-[10px] md:text-xs font-normal text-[#7F847E]/60 font-sans select-none">
                    {item.id}
                  </span>

                  <div className="mt-2">
                    <span className="font-display text-3xl md:text-[40px] lg:text-[44px] font-normal text-[#1F180D] leading-none tracking-tight">
                      <AnimatedMetric value={item.value} isActive={isInView} />
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

                <div className="w-[50px] h-[1px] bg-black/80 mt-5 transition-all duration-1000 group-hover:bg-[#40A937] group-hover:w-1/2" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
