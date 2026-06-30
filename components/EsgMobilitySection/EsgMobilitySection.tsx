"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import mobilityBanner from "@/assets/images/esg/mobility-banner.png";
import { useCountUp } from "@/hooks/useCountUp";

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

export default function EsgMobilitySection() {
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
      id="mobility"
      ref={sectionRef}
      className="w-full relative min-h-[600px] flex flex-col justify-between py-16 md:py-24 overflow-hidden "
    >
      <div className="absolute inset-0 z-0">
        <Image
          src={mobilityBanner}
          alt="Mobility Banner Background"
          fill
          className="object-cover object-center"
        />
      </div>

      <div className="max-w-[1540px] w-full mx-auto px-6 md:px-10 lg:px-12 relative z-10 flex-1 flex flex-col justify-between">
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

        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-x-10 gap-y-6 pt-4">
          {metrics.map((item, index) => (
            <div
              key={index}
              className={`p-8 md:p-6 min-h-[140px] flex flex-col justify-between bg-transparent transition-all duration-300 group ${item.borderClass}`}
            >
              <div>
                <div>
                  <span
                    className={`font-display text-white leading-none tracking-tight font-normal transition-colors duration-300 group-hover:text-white ${
                      item.isTextValue
                        ? "text-2xl md:text-3xl lg:text-[34px]"
                        : "text-3xl md:text-[40px] lg:text-[44px]"
                    }`}
                  >
                    {item.isTextValue ? (
                      item.value
                    ) : (
                      <AnimatedMetric value={item.value} isActive={isInView} />
                    )}
                  </span>
                  {item.unit && (
                    <span className="text-[10px] md:text-xs font-semibold text-white/50 font-sans ml-1.5 tracking-wide uppercase align-baseline transition-colors duration-300 group-hover:text-white/75">
                      {item.unit}
                    </span>
                  )}
                </div>

                <span className="text-[10px] md:text-[11px] font-normal text-[#40A937] tracking-wider font-sans mt-3 block leading-relaxed uppercase">
                  {item.label}
                </span>
              </div>

              <div className="w-0 h-[1px] bg-white/20 mt-5 transition-all duration-1000 group-hover:bg-[#40A937] group-hover:w-full" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
