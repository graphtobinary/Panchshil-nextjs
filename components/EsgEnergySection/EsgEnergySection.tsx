"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import energySolar from "@/assets/images/esg/energy-solar.png";
import { useCountUp } from "@/hooks/useCountUp";

interface MetricItem {
  value: string;
  unit: string;
  label: string;
}

const metrics: MetricItem[] = [
  { value: "2.34", unit: "MWp", label: "ROOFTOP SOLAR CAPACITY" },
  { value: "2.34", unit: "MN KWH", label: "SOLAR ENERGY GENERATED" },
  { value: "1,740", unit: "MN KWH", label: "EMISSION SAVINGS THROUGH SOLAR" },
  { value: "55.48", unit: "MN KWH", label: "RE PURCHASED AT SEZ OFFICE PARKS" },
  {
    value: "~39,726",
    unit: "TCO₂E",
    label: "CARBON EMISSION SAVINGS (RE MIX)",
  },
  {
    value: "~9,169",
    unit: "TCO₂E",
    label: "CARBON REDUCTION THROUGH WIND ENERGY",
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

export default function EsgEnergySection() {
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
      id="energy"
      ref={sectionRef}
      className="w-full bg-[#F8F5EE] py-16 md:py-24 transition-colors duration-300"
    >
      <div className="max-w-[1540px] mx-auto px-6 md:px-10 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <div className="lg:col-span-5 flex flex-col">
            <span className="text-[#40A937] text-xs md:text-sm font-normal tracking-widest uppercase block mb-3 font-sans">
              — 01 / POWER RESPONSIBLY
            </span>
            <h2 className="text-3xl md:text-5xl lg:text-[56px] font-display text-[#1F180D] leading-[1.1] tracking-tight font-medium">
              Energy.
            </h2>
            <p className="mt-4 text-sm md:text-base text-gray-600 font-sans font-light mb-8 max-w-md">
              Driving the transition with clean and renewable energy.
            </p>
            <div className="w-full relative aspect-[4/3] max-w-[460px] overflow-hidden rounded-[2px] shadow-sm">
              <Image
                src={energySolar}
                alt="Solar Panels Banner"
                fill
                className="object-cover object-center"
              />
            </div>
          </div>
          <div className="lg:col-span-7 lg:pt-16">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-6">
              {metrics.map((item, index) => (
                <div
                  key={index}
                  className="flex flex-col p-6 transition-all duration-300"
                >
                  <div>
                    <span className="font-display text-3xl md:text-[44px] lg:text-[48px] font-normal text-[#1F180D] leading-none tracking-tight">
                      <AnimatedMetric value={item.value} isActive={isInView} />
                    </span>
                    <span className="font-display text-[10px] md:text-xs font-normal text-[#7F847E] font-sans ml-2 tracking-wide uppercase select-none align-baseline">
                      {item.unit}
                    </span>
                  </div>
                  <div className="w-44">
                    <span className="text-[10px] md:text-[11px] font-normal text-[#40A937] tracking-wider font-sans mt-3 block leading-relaxed">
                      {item.label}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
