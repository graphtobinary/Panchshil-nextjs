"use client";

import React from "react";
import Image from "next/image";
import esgReports from "@/assets/images/esg/esg-reports.png";

interface ReportItem {
  meta: string;
  title: string;
  href: string;
  gridClass: string;
}

const reports: ReportItem[] = [
  {
    meta: "PDF • 4.2 MB",
    title: "ESG Report — FY 2024-25",
    href: "#",
    gridClass:
      "border-b md:border-b-0 md:border-r border-[#E2DFD7]/60 pb-8 md:pb-0 md:pr-12",
  },
  {
    meta: "PDF • 1.8 MB",
    title: "Sustainability Highlights — FY 2024-25",
    href: "#",
    gridClass:
      "border-b md:border-b-0 md:border-r border-[#E2DFD7]/60 py-8 md:py-0 md:px-12",
  },
  {
    meta: "PDF • 1.1 MB",
    title: "Energy & Emissions Disclosure",
    href: "#",
    gridClass: "pt-8 md:pt-0 md:pl-12",
  },
];

export default function EsgReportsSection() {
  return (
    <section
      id="reports"
      className="w-full bg-[#FFFFFF] py-16 md:py-24 border-t border-[#E2DFD7]/30 transition-colors duration-300"
    >
      <div className="max-w-[1540px] mx-auto px-6 md:px-10 lg:px-12">
        {/* Header split layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center mb-16 md:mb-20">
          {/* Left Side: Mockup Image */}
          <div className="lg:col-span-5 flex justify-start">
            <div className="w-full relative aspect-[5/3] max-w-[460px] overflow-hidden shadow-sm">
              <Image
                src={esgReports}
                alt="ESG Reports Mockup Banner"
                fill
                className="object-cover object-center"
              />
            </div>
          </div>

          {/* Right Side: Text */}
          <div className="lg:col-span-7 flex flex-col">
            <span className="text-[#40A937] text-xs md:text-sm font-normal tracking-widest uppercase block mb-3 font-sans">
              — REPORTS
            </span>

            <h2 className="text-3xl md:text-5xl lg:text-[56px] font-display text-[#1F180D] leading-[1.1] tracking-tight font-medium">
              ESG Reports & Downloads
            </h2>

            <p className="mt-4 text-sm md:text-base text-[#626A70] font-sans font-light max-w-xl">
              Detailed reports published annually. Reach out for past editions
              or asset-level documentation.
            </p>
          </div>
        </div>

        {/* 3-column downloads grid */}
        <div className="w-full grid grid-cols-1 md:grid-cols-3  py-10 md:py-8 items-center">
          {reports.map((report, idx) => (
            <a
              key={idx}
              href={report.href}
              className={`flex items-center justify-between group transition-all duration-300 ${report.gridClass} min-h-30`}
            >
              <div className="flex flex-col">
                <span className="text-[10px] md:text-xs font-normal text-[#7F847E] font-sans tracking-wide uppercase">
                  {report.meta}
                </span>
                <h3 className="font-display text-lg md:text-[22px] font-normal text-[#1F180D] mt-2 group-hover:text-[#40A937] transition-colors leading-tight">
                  {report.title}
                </h3>
              </div>

              {/* Download Icon */}
              <div className="ml-4 shrink-0 w-8 h-8   flex items-end justify-center text-gray-500  transition-all duration-300">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  width="24"
                  height="31"
                  viewBox="0 0 24 31"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5.93031 21.18L12.0003 27.25L18.0703 21.18"
                    stroke="black"
                    stroke-width="1.5"
                    stroke-miterlimit="10"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M12 0.75L12 26.75"
                    stroke="black"
                    stroke-width="1.5"
                    stroke-miterlimit="10"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>
            </a>
          ))}
        </div>

        {/* Disclaimer Footer Text */}
        <div className="w-full mt-2">
          <span className="text-[11px] md:text-xs text-gray-500 font-sans font-light tracking-wide block">
            All data is for FY 2025-26 unless stated otherwise.
          </span>
        </div>
      </div>
    </section>
  );
}
