"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import certificationSafety from "@/assets/images/esg/certification-safety.png";
import { useCountUp } from "@/hooks/useCountUp";

interface GeneralMetric {
  value: string;
  unit: string;
  label: string;
  borderClass: string;
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
    borderClass: "border-b md:border-r border-[#E2DFD7]",
  },
  {
    value: "14.5",
    unit: "MN SQ. FT.",
    label: "EMISSION SAVINGS THROUGH SOLAR",
    borderClass: "border-b md:border-r border-[#E2DFD7]",
  },
  {
    value: "16.6",
    unit: "MN SQ. FT.",
    label: "CERTIFIED UNDER FOUR ISO MANAGEMENT SYSTEMS",
    borderClass: "border-b md:border-r border-[#E2DFD7]",
  },
  {
    value: "12",
    unit: "",
    label: "OFFICE PARKS COVERED UNDER IMS",
    borderClass: " md:border-r border-[#E2DFD7]",
  },
  {
    value: "11",
    unit: "",
    label: "OFFICE PARKS UNDER BRITISH SAFETY COUNCIL FIVE STAR AUDIT",
    borderClass: " md:border-r border-[#E2DFD7]",
  },
  {
    value: "7 Years",
    unit: "",
    label: "CONSECUTIVE FIVE STAR RATINGS AT FLAGSHIP SITES",
    borderClass: " md:border-r border-[#E2DFD7]",
  },
];

const accordionData: AccordionItem[] = [
  {
    title: "LEED Core & Shell Certification",
    subtitle: "GREEN BUILDING BENCHMARK • 21.68 MN SQ. FT.",
    subGrid: [
      {
        value: "~21.68 Mn sq. ft.",
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
        value: "12.16 Mn sq. ft.",
        label: "LEED EBOM Certified Portfolio",
        desc: "Existing office park assets certified for operations and maintenance performance.",
      },
      {
        value: "11.82 Mn sq. ft.",
        label: "LEED EBOM Platinum Certified",
        desc: "Majority of certified existing building portfolio is Platinum rated.",
      },
      {
        value: "0.34 Mn sq. ft.",
        label: "LEED EBOM Gold Certified",
        desc: "Additional existing building area certified under Gold rating.",
      },
      {
        value: "2.34 Mn sq. ft.",
        label: "LEED EBOM in Process",
        desc: "Further existing office park area is under certification.",
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
      {
        value: "ISO 9001:2015",
        label: "Quality Management",
        desc: "Certified quality management systems supporting consistent operational performance.",
      },
      {
        value: "ISO 14001:2015",
        label: "Environmental Management",
        desc: "Certified environmental management systems supporting responsible operations.",
      },
      {
        value: "ISO 45001:2018",
        label: "Occupational Health & Safety",
        desc: "Certified systems for workplace safety and occupational health management.",
      },
      {
        value: "ISO 41001:2018",
        label: "Facility Management",
        desc: "Certified facility management systems for integrated building operations.",
      },
      {
        value: "4 ISO Standards",
        label: "Four-System Certification Framework",
        desc: "One integrated framework covering quality, environment, safety and facility management.",
      },
    ],
  },
  {
    title: "British Safety Council — Five Star Audit",
    subtitle: "11 OFFICE PARKS • 7 CONSECUTIVE YEARS",
    subGrid: [
      {
        value: "Five Star Rating",
        label: "BRITISH SAFETY COUNCIL FIVE STAR AUDIT",
        desc: "Panchshil Office Parks continue to demonstrate globally benchmarked occupational health and safety practices.",
      },
      {
        value: "16.19 Mn sq. ft.",
        label: "SAFETY-CERTIFIED PORTFOLIO COVERAGE",
        desc: "Safety practices benchmarked across 11 Panchshil Office Parks in 2025-26.",
      },
      {
        value: "11 Office Parks",
        label: "PORTFOLIO-WIDE SAFETY BENCHMARKING",
        desc: "Occupational health and safety systems assessed across 11 office park assets.",
      },
      {
        value: "7 Years",
        label: "CONSECUTIVE FIVE STAR RATINGS",
        desc: "Flagship campuses have achieved consecutive Five Star ratings for seven years.",
      },
      {
        value: "50 Elements",
        label: "COMPREHENSIVE SAFETY EVALUATION",
        desc: "The audit evaluates 50 health and safety system elements and five best-practice indicators.",
      },
      {
        value: "92%+ Benchmark",
        label: "EXCEEDING GLOBAL SAFETY STANDARDS",
        desc: "Panchshil campuses exceeded the minimum qualifying benchmark for Five Star recognition.",
      },
    ],
  },
  {
    title: "British Safety Council — Sword of Honour",
    subtitle: "AMONG THE HIGHEST GLOBAL SAFETY HONOURS",
    subGrid: [
      {
        value: "Sword of Honour",
        label: "Global Safety Recognition",
        desc: "Awarded for exemplary occupational health and safety management systems.",
      },
      {
        value: "16.19 Mn sq. ft.",
        label: "Expanding Award Coverage",
        desc: "Award coverage spans 16.19 Mn sq. ft. across 11 office parks.",
      },
      {
        value: "11 Office Parks",
        label: "Recognised Safety Portfolio",
        desc: "Eleven office parks are covered under British Safety Council recognition.",
      },
      {
        value: "7 Years",
        label: "Sustained Safety Excellence",
        desc: "Flagship sites have received the Sword of Honour for seven years.",
      },
      {
        value: "Global Standard",
        label: "Among the Highest Safety Honours",
        desc: "Recognised among the most respected occupational health and safety awards globally.",
      },
    ],
  },
  {
    title: "British Safety Council — International Safety Awards",
    subtitle: "6 YEARS OF YEAR-ON-YEAR RECOGNITION",
    subGrid: [
      {
        value: "International Safety Awards",
        label: "RECOGNISED FOR GLOBAL SAFETY EXCELLENCE",
        desc: "Panchshil Office Parks have been recognised for excellence in health and safety management.",
      },
      {
        value: "16.19 Mn sq. ft.",
        label: "AWARDED SAFETY COVERAGE",
        desc: "International Safety Awards coverage spans 16.19 Mn sq. ft. across 11 office parks.",
      },
      {
        value: "6 Years",
        label: "YEAR-ON-YEAR RECOGNITION",
        desc: "Recognised consistently for six consecutive years across campuses.",
      },
      {
        value: "March 2026",
        label: "RECOGNITION FOR 2025-26 PERFORMANCE",
        desc: "Recognition received in March 2026 for the 2025-26 performance year.",
      },
      {
        value: "11 Office Parks",
        label: "SAFETY ACROSS CAMPUSES",
        desc: "Health and safety excellence recognised across 11 Panchshil Office Parks.",
      },
    ],
  },
  {
    title: "Global Accreditation Frameworks",
    subtitle: "IAF • NABCB • EGAC",
    subGrid: [
      {
        value: "IAF",
        label: "International Accreditation Forum",
        desc: "The certifications are backed by the International Accreditation Forum framework, supporting global credibility and recognition.",
      },
      {
        value: "NABCB",
        label: "National Accreditation Board for Certification Bodies",
        desc: "NABCB accreditation adds national-level credibility to Panchshil's management system certifications.",
      },
      {
        value: "EGAC",
        label: "Egyptian Accreditation Council",
        desc: "EGAC, a member of the IAF, forms part of the global accreditation framework supporting the certification process.",
      },
    ],
  },
];

function parseNumericValue(value: string): {
  target: number;
  prefix: string;
  suffix: string;
  isTextValue: boolean;
} {
  const prefix = value.match(/^~/) ? "~" : "";
  const suffix = value.match(/%$/) ? "%" : "";
  const clean = value.replace(/^~/, "").replace(/%$/, "").replace(/,/g, "");

  if (/^\d+(\.\d+)?$/.test(clean)) {
    return { target: parseFloat(clean), prefix, suffix, isTextValue: false };
  }

  const leadingNumber = clean.match(/^([\d.]+)\s*/);
  if (leadingNumber) {
    return {
      target: parseFloat(leadingNumber[1]),
      prefix,
      suffix: " " + clean.slice(leadingNumber[0].length),
      isTextValue: false,
    };
  }

  return { target: 0, prefix: "", suffix: "", isTextValue: true };
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
  const { target, prefix, suffix, isTextValue } = parseNumericValue(value);
  if (isTextValue) {
    return <>{value}</>;
  }
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const animatedValue = useCountUp(Math.round(target), isActive);
  const decimals = 0;
  const display = prefix + formatNumber(animatedValue, decimals) + suffix;
  return <>{display}</>;
}

export default function EsgCertificationsSection() {
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

  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <section
      id="certifications"
      ref={sectionRef}
      className="w-full bg-[#F8F5EE] py-16 md:py-24 border-t border-[#E2DFD7]/30 transition-colors duration-300"
    >
      <div className="max-w-[1540px] mx-auto px-6 md:px-10 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start mb-5">
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

        <div className="w-full grid grid-cols-1 md:grid-cols-3 py-6 mb-16">
          {generalMetrics.map((item, index) => (
            <div key={index} className="bg-[#ddd]">
              <div
                className={`relative p-6 min-h-[186px] flex flex-col justify-between bg-[#F8F5EE] transition-all duration-300 hover:bg-[#fff]  hover:-translate-y-[3px] group ${item.borderClass} `}
              >
                <div className="relative">
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

        <div id="safety-governance" className="w-full scroll-mt-24">
          <div className="w-full flex flex-col border-t border-[#E2DFD7]/80">
            {accordionData.map((item, index) => {
              const isExpanded = expandedIndex === index;
              return (
                <div key={index} className="border-b border-[#E2DFD7]/80">
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
                              <AnimatedMetric
                                value={sub.value}
                                isActive={isInView}
                              />
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
