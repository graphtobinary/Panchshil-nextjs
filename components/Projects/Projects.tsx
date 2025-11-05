"use client";

import { useEffect, useRef, useState } from "react";
import { ProjectsCarousel } from "./ProjectsCarousel";
import { ProjectCardData, RegionKey, TabKey, CountryKey } from "@/interfaces";

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

// International data: Country -> Category -> Projects
const dubaiDataByTab: Record<TabKey, ProjectCardData[]> = {
  residential: [
    {
      id: "dubai-yoo1",
      title: "YOO RESIDENCES",
      location: "Dubai, UAE",
      image: "/assets/images/yoo-pune.jpg",
    },
    {
      id: "dubai-towers1",
      title: "DUBAI TOWERS",
      location: "Dubai, UAE",
      image: "/assets/images/panchshil-towers.jpg",
    },
    {
      id: "dubai-waterfront1",
      title: "DUBAI WATERFRONT",
      location: "Dubai, UAE",
      image: "/assets/images/waterfront.jpg",
    },
  ],
  office: [
    {
      id: "dubai-office1",
      title: "BUSINESS DISTRICT",
      location: "Dubai, UAE",
      image: "/assets/images/panchshil-towers.jpg",
    },
    {
      id: "dubai-office2",
      title: "COMMERCIAL HUB",
      location: "Dubai, UAE",
      image: "/assets/images/yoo-pune.jpg",
    },
  ],
  hospitality: [
    {
      id: "dubai-hotel1",
      title: "URBAN SUITES",
      location: "Dubai, UAE",
      image: "/assets/images/hospitality.jpg",
    },
    {
      id: "dubai-hotel2",
      title: "DUBAI RESORT",
      location: "Dubai, UAE",
      image: "/assets/images/yoo-pune.jpg",
    },
  ],
  datacenter: [
    {
      id: "dubai-dc1",
      title: "DATA HUB DUBAI",
      location: "Dubai, UAE",
      image: "/assets/images/panchshil-towers.jpg",
    },
  ],
  retail: [
    {
      id: "dubai-retail1",
      title: "BOUTIQUE MALL",
      location: "Dubai, UAE",
      image: "/assets/images/yoo-pune.jpg",
    },
    {
      id: "dubai-retail2",
      title: "LUXURY GALLERIA",
      location: "Dubai, UAE",
      image: "/assets/images/waterfront.jpg",
    },
  ],
};

const maldivesDataByTab: Record<TabKey, ProjectCardData[]> = {
  residential: [
    {
      id: "maldives-res1",
      title: "ISLAND VILLAS",
      location: "Male, Maldives",
      image: "/assets/images/waterfront.jpg",
    },
    {
      id: "maldives-res2",
      title: "COASTAL RESIDENCES",
      location: "Male, Maldives",
      image: "/assets/images/yoo-pune.jpg",
    },
  ],
  office: [
    {
      id: "maldives-office1",
      title: "BUSINESS CENTER",
      location: "Male, Maldives",
      image: "/assets/images/panchshil-towers.jpg",
    },
  ],
  hospitality: [
    {
      id: "maldives-hotel1",
      title: "COASTAL RESORT",
      location: "Male, Maldives",
      image: "/assets/images/waterfront.jpg",
    },
    {
      id: "maldives-hotel2",
      title: "RAYYA BY ATMOSPHERE",
      location: "Male, Maldives",
      image: "/assets/images/raya-by-atmosphere.jpg",
    },
  ],
  datacenter: [
    {
      id: "maldives-dc1",
      title: "OCEAN DC",
      location: "Male, Maldives",
      image: "/assets/images/waterfront.jpg",
    },
  ],
  retail: [
    {
      id: "maldives-retail1",
      title: "SEAVIEW RETAIL",
      location: "Male, Maldives",
      image: "/assets/images/waterfront.jpg",
    },
  ],
};

const srilankaDataByTab: Record<TabKey, ProjectCardData[]> = {
  residential: [
    {
      id: "srilanka-res1",
      title: "SKY TOWERS",
      location: "Colombo, Sri Lanka",
      image: "/assets/images/panchshil-towers.jpg",
    },
    {
      id: "srilanka-res2",
      title: "URBAN LIFESTYLE",
      location: "Colombo, Sri Lanka",
      image: "/assets/images/yoo-pune.jpg",
    },
  ],
  office: [
    {
      id: "srilanka-office1",
      title: "BAY FRONT",
      location: "Colombo, Sri Lanka",
      image: "/assets/images/waterfront.jpg",
    },
    {
      id: "srilanka-office2",
      title: "ICONIC HUB",
      location: "Colombo, Sri Lanka",
      image: "/assets/images/yoo-pune.jpg",
    },
  ],
  hospitality: [
    {
      id: "srilanka-hotel1",
      title: "GRAND TOWER",
      location: "Colombo, Sri Lanka",
      image: "/assets/images/panchshil-towers.jpg",
    },
    {
      id: "srilanka-hotel2",
      title: "METRO RESORT",
      location: "Colombo, Sri Lanka",
      image: "/assets/images/hospitality.jpg",
    },
  ],
  datacenter: [
    {
      id: "srilanka-dc1",
      title: "EDGE DC",
      location: "Colombo, Sri Lanka",
      image: "/assets/images/yoo-pune.jpg",
    },
  ],
  retail: [
    {
      id: "srilanka-retail1",
      title: "GLOBAL GALLERIA",
      location: "Colombo, Sri Lanka",
      image: "/assets/images/panchshil-towers.jpg",
    },
  ],
};

// Root: Region -> Country -> Category -> Projects
const projectsByCountry: Record<
  CountryKey,
  Record<TabKey, ProjectCardData[]>
> = {
  dubai: dubaiDataByTab,
  maldives: maldivesDataByTab,
  srilanka: srilankaDataByTab,
};

const projectsByRegion: Record<RegionKey, Record<TabKey, ProjectCardData[]>> = {
  india: indiaDataByTab,
  international: dubaiDataByTab, // Default to Dubai when International is selected
};

export function Projects() {
  const [region, setRegion] = useState<RegionKey>("india");
  const [country, setCountry] = useState<CountryKey>("dubai");
  const [active, setActive] = useState<TabKey>("residential");

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
    <section ref={sectionRef} className="w-full bg-[#FFFAF7] py-20">
      <div className=" mx-auto">
        {/* Title + Subtitle */}
        <div
          className={`text-center mb-10 ${isInView ? "animate-fade-in-up" : "opacity-0"}`}
        >
          <div className="text-lg tracking-[0.2em] font-medium text-gold-beige mb-2">
            WE ARE NOW
          </div>
          <h2 className="text-2xl md:text-[28px] font-display-semi text-black">
            SHAPING SKYLINES BEYOND BORDERS
          </h2>
        </div>

        {/* Region Tabs */}
        <div
          className={`flex items-center justify-center gap-12 mb-12 ${isInView ? "animate-fade-in-up-delay-1" : "opacity-0"}`}
        >
          {(["india", "international"] as RegionKey[]).map((r) => {
            const isActive = r === region;
            return (
              <button
                key={r}
                onClick={() => {
                  setRegion(r);
                  if (r === "international") setCountry("dubai");
                  if (r === "india") setActive("residential");
                }}
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

        {/* Category Tabs (for India) or Country Tabs (for International) */}
        {region === "india" ? (
          <div
            className={`flex flex-wrap items-center justify-center gap-6 md:gap-12 mb-20 ${isInView ? "animate-fade-in-up-delay-2" : "opacity-0"}`}
          >
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
        ) : (
          <div
            className={`flex flex-wrap items-center justify-center gap-8 md:gap-10 mb-20 ${isInView ? "animate-fade-in-up-delay-2" : "opacity-0"}`}
          >
            {(["dubai", "maldives", "srilanka"] as CountryKey[]).map((c) => {
              const isActive = c === country;
              return (
                <button
                  key={c}
                  onClick={() => {
                    setCountry(c);
                    setActive("residential");
                  }}
                  className={
                    "text-[12px] md:text-[16px] font-medium tracking-wider uppercase transition-colors " +
                    (isActive
                      ? "text-gold-beige border-b-3 border-gold-beige"
                      : "text-gold-beige/60 hover:text-gold-beige")
                  }
                >
                  {c}
                </button>
              );
            })}
          </div>
        )}

        {/* Carousel with progress + top-right arrows inside */}
        <div
          className={`relative ${isInView ? "animate-fade-in-up-delay-3" : "opacity-0"}`}
        >
          <ProjectsCarousel
            items={
              region === "india"
                ? projectsByRegion[region][active]
                : projectsByCountry[country][active]
            }
          />
        </div>
      </div>
    </section>
  );
}
