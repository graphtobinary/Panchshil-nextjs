"use client";

import React, { useState } from "react";
import Image from "next/image";
import certificationSafety from "@/assets/images/esg/certification-safety.png";

interface GeneralMetric {
  value: string;
  unit: string;
  label: string;
}

interface SubGridItem {
  value: string;
  label: string;
  desc: string;
}

interface AccordionItem {
  title: string;
  subtitle: string;
  subGrid?: SubGridItem[];
}

const generalMetrics: GeneralMetric[] = [
  {
    value: "~21.68",
    unit: "MN SQ. FT.",
    label: "LEED CORE & SHELL PORTFOLIO COVERAGE",
  },
  {
    value: "14.5",
    unit: "MN SQ. FT.",
    label: "EMISSION SAVINGS THROUGH SOLAR",
  },
  {
    value: "16.6",
    unit: "MN SQ. FT.",
    label: "CERTIFIED UNDER FOUR ISO MANAGEMENT SYSTEMS",
  },
  {
    value: "12",
    unit: "",
    label: "OFFICE PARKS COVERED UNDER IMS",
  },
  {
    value: "11",
    unit: "",
    label: "OFFICE PARKS UNDER BRITISH SAFETY COUNCIL FIVE STAR AUDIT",
  },
  {
    value: "7 Years",
    unit: "",
    label: "CONSECUTIVE FIVE STAR RATINGS AT FLAGSHIP SITES",
  },
];

const accordionData: AccordionItem[] = [
  {
    title: "LEED Core & Shell Certification",
    subtitle: "GREEN BUILDING BENCHMARK • 21.68 MN SQ. FT.",
    subGrid: [
      {
        value: "~21.68",
        label: "LEED CORE & SHELL PORTFOLIO",
        desc: "Green building benchmark coverage across Panchshil's office park portfolio.",
      },
      {
        value: "11.62 Mn sq. ft.",
        label: "LEED CERTIFIED PORTFOLIO",
        desc: "Certified green building coverage across IGBC and USGBC ratings.",
      },
      {
        value: "1.15 Mn sq. ft.",
        label: "IGBC PLATINUM CERTIFIED",
        desc: "Portfolio area certified under IGBC Platinum rating.",
      },
      {
        value: "6.07 Mn sq. ft.",
        label: "IGBC GOLD CERTIFIED",
        desc: "Portfolio area certified under IGBC Gold rating.",
      },
      {
        value: "4.4 Mn sq. ft.",
        label: "USGBC GOLD CERTIFIED",
        desc: "Portfolio area certified under USGBC Gold rating.",
      },
      {
        value: "5.23 Mn sq. ft.",
        label: "LEED PRE-CERTIFIED PORTFOLIO",
        desc: "Additional office park area pre-certified under green building benchmarks.",
      },
      {
        value: "4.83 Mn sq. ft.",
        label: "IGBC GOLD CERTIFIED",
        desc: "Portfolio area certified under IGBC Gold rating.",
      },
    ],
  },
  {
    title: "LEED EBOM V4.1 — Existing Buildings",
    subtitle: "OPERATIONS & MAINTENANCE • 14.5 MN SQ. FT.",
    subGrid: [
      {
        value: "14.5 Mn sq. ft.",
        label: "LEED EBOM V4.1 PORTFOLIO",
        desc: "Operations and maintenance sustainability standards applied across existing buildings.",
      },
      {
        value: "5 Office Parks",
        label: "CERTIFIED CAMPUSES",
        desc: "Five key office park locations certified under LEED EBOM V4.1 standards.",
      },
    ],
  },
  {
    title: "ISO Integrated Management Systems",
    subtitle: "FOUR-SYSTEM FRAMEWORK • 16.6 MN SQ. FT. • 12 OFFICE PARKS",
    subGrid: [
      {
        value: "16.6 Mn sq. ft.",
        label: "ISO SYSTEM COVERAGE",
        desc: "Integration of ISO Quality, Environment, Safety, and Asset management standards.",
      },
      {
        value: "12 Office Parks",
        label: "IMS COMPLIANT",
        desc: "Twelve major business campuses operating under audited Integrated Management Systems.",
      },
    ],
  },
  {
    title: "British Safety Council — Five Star Audit",
    subtitle: "11 OFFICE PARKS • 7 CONSECUTIVE YEARS",
    subGrid: [
      {
        value: "11",
        label: "OFFICE PARKS AUDITED",
        desc: "Eleven offices audited under British Safety Council standards.",
      },
      {
        value: "7 Years",
        label: "CONSECUTIVE RATINGS",
        desc: "Flagship locations achieving continuous five star safety ratings.",
      },
    ],
  },
  {
    title: "British Safety Council — Sword of Honour",
    subtitle: "AMONG THE HIGHEST GLOBAL SAFETY HONOURS",
    subGrid: [
      {
        value: "Sword of Honour",
        label: "SAFETY EXCELLENCE",
        desc: "Panchshil projects recognized with prestigious global safety honors.",
      },
    ],
  },
  {
    title: "British Safety Council — International Safety Awards",
    subtitle: "6 YEARS OF YEAR-ON-YEAR RECOGNITION",
    subGrid: [
      {
        value: "6 Years",
        label: "SAFETY RECOGNITION",
        desc: "Multiple consecutive years of winning International Safety Awards.",
      },
    ],
  },
  {
    title: "Global Accreditation Frameworks",
    subtitle: "IAF • NABCB • EGAC",
    subGrid: [
      {
        value: "IAF, NABCB, EGAC",
        label: "ACCREDITED COMPLIANCE",
        desc: "Adherence to globally benchmarked accreditation and verification boards.",
      },
    ],
  },
];

export default function EsgCertificationsSection() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <section
      id="certifications"
      className="w-full bg-[#F8F5EE] py-16 md:py-24 border-t border-[#E2DFD7]/30 transition-colors duration-300"
    >
      <div className="max-w-[1540px] mx-auto px-6 md:px-10 lg:px-12">
        {/* Header split layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start mb-16">
          {/* Left Text */}
          <div className="lg:col-span-6 flex flex-col">
            <span className="text-[#40A937] text-xs md:text-sm font-normal tracking-widest uppercase block mb-3 font-sans">
              — 06 / CERTIFIED FOR PERFORMANCE
            </span>

            <h2 className="text-3xl md:text-5xl lg:text-[56px] font-display text-[#1F180D] leading-[1.1] tracking-tight font-medium">
              Certifications & <br />
              <span className="text-[#40A937]">Safety.</span>
            </h2>

            <p className="mt-4 text-sm md:text-base text-gray-600 font-sans font-light max-w-xl">
              Validated by globally recognised standards. Benchmarked across
              every Panchshil Office Park.
            </p>
          </div>

          {/* Right Image */}
          <div className="lg:col-span-6 flex lg:justify-end justify-start">
            <div className="w-full relative aspect-[7/3] max-w-[600px] overflow-hidden rounded-[2px] shadow-sm">
              <Image
                src={certificationSafety}
                alt="Certifications Facade Banner"
                fill
                className="object-cover object-center"
              />
            </div>
          </div>
        </div>

        {/* General Metrics Grid (Borderless with subtle row separators) */}
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-y-6 gap-x-6 py-6 mb-16">
          {generalMetrics.map((item, index) => (
            <div
              key={index}
              className="flex flex-col border-t border-[#E2DFD7]/80 pt-8 p-6 transition-all duration-300 group"
            >
              <div>
                <span className="font-display text-3xl md:text-[40px] lg:text-[44px] font-normal text-[#1F180D] leading-none tracking-tight">
                  {item.value}
                </span>
                {item.unit && (
                  <span className="font-display text-[10px] md:text-xs font-normal text-[#7F847E] font-sans ml-1.5 tracking-wide uppercase align-baseline">
                    {item.unit}
                  </span>
                )}
              </div>
              <div className="w-44">
                <span className="text-[10px] md:text-[11px] font-normal text-[#40A937] tracking-wider font-sans mt-3 block leading-relaxed">
                  {item.label}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Accordion UI Section (Safety & Governance ID placed here for precise target scrolls) */}
        <div id="safety-governance" className="w-full scroll-mt-24">
          <div className="w-full flex flex-col border-t border-[#E2DFD7]/80">
            {accordionData.map((item, index) => {
              const isExpanded = expandedIndex === index;
              return (
                <div key={index} className="border-b border-[#E2DFD7]/80">
                  {/* Header Bar */}
                  <button
                    onClick={() => toggleAccordion(index)}
                    className="cursor-pointer w-full py-6 md:py-8 flex flex-col md:flex-row md:items-center md:justify-between text-left group transition-colors duration-200"
                  >
                    <span className="font-display text-lg md:text-[22px] font-medium text-[#1F180D]  transition-colors leading-tight">
                      {item.title}
                    </span>

                    <div className="flex items-center gap-6 mt-2 md:mt-0 justify-between md:justify-end w-full md:w-auto">
                      <span className="font-display text-[10px] md:text-[11px] font-normal tracking-wider text-[#35393B]/80 font-sans uppercase">
                        {item.subtitle}
                      </span>
                      {/* Accordion Arrow Icon */}
                      <svg
                        className={`w-4 h-4 text-[#7F847E]  transition-transform duration-300 transform ${
                          isExpanded ? "rotate-180" : ""
                        }`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                  </button>

                  {/* Expanded Content Wrapper */}
                  <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                      isExpanded
                        ? "max-h-[1200px] opacity-100 pb-10"
                        : "max-h-0 opacity-0"
                    }`}
                  >
                    {item.subGrid && (
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
                        {item.subGrid.map((sub, sIdx) => (
                          <div
                            key={sIdx}
                            className="flex flex-col border-t border-[#E2DFD7]/80 pt-8 p-6 transition-all duration-300  group"
                          >
                            <span className="font-display text-2xl md:text-3xl font-normal text-[#1F180D] leading-none tracking-tight">
                              {sub.value}
                            </span>
                            <span className="text-[10px] md:text-[11px] font-normal text-[#40A937] tracking-wider font-sans mt-2 block">
                              {sub.label}
                            </span>
                            <p className="font-sans text-xs text-[#626A70] mt-2 leading-relaxed font-light">
                              {sub.desc}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
