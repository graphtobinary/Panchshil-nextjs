"use client";

import { useState } from "react";
import { ProjectsCarousel } from "./ProjectsCarousel";
import { ProjectCardData, RegionKey, TabKey } from "@/interfaces";

const tabs: { key: TabKey; label: string }[] = [
  { key: "residential", label: "RESIDENTIAL" },
  { key: "office", label: "OFFICE PARKS" },
  { key: "hospitality", label: "HOSPITALITY" },
  { key: "datacenter", label: "DATA CENTER" },
  { key: "retail", label: "RETAIL & FB" },
];

const indiaDataByTab: Record<TabKey, ProjectCardData[]> = {
  residential: [
    {
      id: "yoo",
      title: "YOO PUNE",
      location: "Pune, India",
      image: "/assets/images/yoo-pune.jpg",
    },
    {
      id: "towers",
      title: "PANCHSHIL TOWERS",
      location: "Pune, India",
      image: "/assets/images/panchshil-towers.jpg",
    },
    {
      id: "waterfront",
      title: "WATERFRONT",
      location: "Pune, India",
      image: "/assets/images/waterfront.jpg",
    },
    {
      id: "yoo2",
      title: "YOO PUNE",
      location: "Pune, India",
      image: "/assets/images/yoo-pune.jpg",
    },
  ],
  office: [
    {
      id: "towers",
      title: "PANCHSHIL TOWERS",
      location: "Pune, India",
      image: "/assets/images/panchshil-towers.jpg",
    },
    {
      id: "waterfront",
      title: "WATERFRONT",
      location: "Pune, India",
      image: "/assets/images/waterfront.jpg",
    },
    {
      id: "yoo",
      title: "YOO PUNE",
      location: "Pune, India",
      image: "/assets/images/yoo-pune.jpg",
    },
    {
      id: "towers2",
      title: "PANCHSHIL TOWERS",
      location: "Pune, India",
      image: "/assets/images/panchshil-towers.jpg",
    },
  ],
  hospitality: [
    {
      id: "waterfront",
      title: "WATERFRONT",
      location: "Pune, India",
      image: "/assets/images/waterfront.jpg",
    },
    {
      id: "yoo",
      title: "YOO PUNE",
      location: "Pune, India",
      image: "/assets/images/yoo-pune.jpg",
    },
    {
      id: "towers",
      title: "PANCHSHIL TOWERS",
      location: "Pune, India",
      image: "/assets/images/panchshil-towers.jpg",
    },
    {
      id: "yoo2",
      title: "YOO PUNE",
      location: "Pune, India",
      image: "/assets/images/yoo-pune.jpg",
    },
  ],
  datacenter: [
    {
      id: "towers",
      title: "PANCHSHIL TOWERS",
      location: "Pune, India",
      image: "/assets/images/panchshil-towers.jpg",
    },
    {
      id: "yoo",
      title: "YOO PUNE",
      location: "Pune, India",
      image: "/assets/images/yoo-pune.jpg",
    },
    {
      id: "waterfront",
      title: "WATERFRONT",
      location: "Pune, India",
      image: "/assets/images/waterfront.jpg",
    },
    {
      id: "towers2",
      title: "PANCHSHIL TOWERS",
      location: "Pune, India",
      image: "/assets/images/panchshil-towers.jpg",
    },
  ],
  retail: [
    {
      id: "yoo",
      title: "YOO PUNE",
      location: "Pune, India",
      image: "/assets/images/yoo-pune.jpg",
    },
    {
      id: "waterfront",
      title: "WATERFRONT",
      location: "Pune, India",
      image: "/assets/images/waterfront.jpg",
    },
    {
      id: "towers",
      title: "PANCHSHIL TOWERS",
      location: "Pune, India",
      image: "/assets/images/panchshil-towers.jpg",
    },
    {
      id: "yoo2",
      title: "YOO PUNE",
      location: "Pune, India",
      image: "/assets/images/yoo-pune.jpg",
    },
  ],
};

// For demo purposes, international reuses images but could be different
const internationalDataByTab: Record<TabKey, ProjectCardData[]> = {
  residential: [
    {
      id: "intl-yoo",
      title: "YOO RESIDENCES",
      location: "Dubai, UAE",
      image: "/assets/images/yoo-pune.jpg",
    },
    {
      id: "intl-towers",
      title: "SKY TOWERS",
      location: "Colombo, Sri Lanka",
      image: "/assets/images/panchshil-towers.jpg",
    },
    {
      id: "intl-waterfront",
      title: "WATERFRONT",
      location: "Male, Maldives",
      image: "/assets/images/waterfront.jpg",
    },
    {
      id: "intl-yoo2",
      title: "YOO RESIDENCES",
      location: "Dubai, UAE",
      image: "/assets/images/yoo-pune.jpg",
    },
  ],
  office: [
    {
      id: "intl-towers2",
      title: "GLOBAL TOWERS",
      location: "Dubai, UAE",
      image: "/assets/images/panchshil-towers.jpg",
    },
    {
      id: "intl-waterfront2",
      title: "BAY FRONT",
      location: "Colombo, Sri Lanka",
      image: "/assets/images/waterfront.jpg",
    },
    {
      id: "intl-yoo3",
      title: "ICONIC HUB",
      location: "Male, Maldives",
      image: "/assets/images/yoo-pune.jpg",
    },
    {
      id: "intl-towers3",
      title: "GLOBAL TOWERS",
      location: "Dubai, UAE",
      image: "/assets/images/panchshil-towers.jpg",
    },
  ],
  hospitality: [
    {
      id: "intl-waterfront3",
      title: "COASTAL RESORT",
      location: "Male, Maldives",
      image: "/assets/images/waterfront.jpg",
    },
    {
      id: "intl-yoo4",
      title: "URBAN SUITES",
      location: "Dubai, UAE",
      image: "/assets/images/yoo-pune.jpg",
    },
    {
      id: "intl-towers4",
      title: "GRAND TOWER",
      location: "Colombo, Sri Lanka",
      image: "/assets/images/panchshil-towers.jpg",
    },
    {
      id: "intl-yoo5",
      title: "URBAN SUITES",
      location: "Dubai, UAE",
      image: "/assets/images/yoo-pune.jpg",
    },
  ],
  datacenter: [
    {
      id: "intl-towers5",
      title: "DATA HUB",
      location: "Dubai, UAE",
      image: "/assets/images/panchshil-towers.jpg",
    },
    {
      id: "intl-yoo6",
      title: "EDGE DC",
      location: "Colombo, Sri Lanka",
      image: "/assets/images/yoo-pune.jpg",
    },
    {
      id: "intl-waterfront4",
      title: "OCEAN DC",
      location: "Male, Maldives",
      image: "/assets/images/waterfront.jpg",
    },
    {
      id: "intl-towers6",
      title: "DATA HUB",
      location: "Dubai, UAE",
      image: "/assets/images/panchshil-towers.jpg",
    },
  ],
  retail: [
    {
      id: "intl-yoo7",
      title: "BOUTIQUE MALL",
      location: "Dubai, UAE",
      image: "/assets/images/yoo-pune.jpg",
    },
    {
      id: "intl-waterfront5",
      title: "SEAVIEW RETAIL",
      location: "Male, Maldives",
      image: "/assets/images/waterfront.jpg",
    },
    {
      id: "intl-towers7",
      title: "GLOBAL GALLERIA",
      location: "Colombo, Sri Lanka",
      image: "/assets/images/panchshil-towers.jpg",
    },
    {
      id: "intl-yoo8",
      title: "BOUTIQUE MALL",
      location: "Dubai, UAE",
      image: "/assets/images/yoo-pune.jpg",
    },
  ],
};

// Root: Region -> Categories -> Projects
const projectsByRegion: Record<RegionKey, Record<TabKey, ProjectCardData[]>> = {
  india: indiaDataByTab,
  international: internationalDataByTab,
};

export function Projects() {
  const [region, setRegion] = useState<RegionKey>("india");
  const [active, setActive] = useState<TabKey>("residential");

  return (
    <section className="w-full bg-[#FFFAF7] py-20">
      <div className=" mx-auto">
        {/* Title + Subtitle */}
        <div className="text-center mb-10">
          <div className="text-lg tracking-[0.2em] font-medium text-gold-beige mb-2">
            WE ARE NOW
          </div>
          <h2 className="text-2xl md:text-[28px] font-display-semi text-black">
            SHAPING SKYLINES BEYOND BORDERS
          </h2>
        </div>

        {/* Region Tabs */}
        <div className="flex items-center justify-center gap-12 mb-12">
          {(["india", "international"] as RegionKey[]).map((r) => {
            const isActive = r === region;
            return (
              <button
                key={r}
                onClick={() => setRegion(r)}
                className={
                  "text-[12px] md:text-[16px] font-medium tracking-wider uppercase transition-colors " +
                  (isActive
                    ? "text-gold-beige border-b-3 border-gold-beige"
                    : "text-gold-beige/60 hover:text-gold-beige")
                }
              >
                {r}
              </button>
            );
          })}
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-6 md:gap-12 mb-20">
          {tabs.map((t) => {
            const isActive = t.key === active;
            return (
              <button
                key={t.key}
                onClick={() => setActive(t.key)}
                className={
                  "text-[12px] md:text-[16px] font-medium tracking-wider uppercase transition-colors " +
                  (isActive
                    ? "text-gold-beige border-b-3 border-gold-beige"
                    : "text-gold-beige/60 hover:text-gold-beige")
                }
              >
                {t.label}
              </button>
            );
          })}
        </div>

        {/* Carousel with progress + top-right arrows inside */}
        <div className="relative">
          <ProjectsCarousel items={projectsByRegion[region][active]} />
        </div>
      </div>
    </section>
  );
}
