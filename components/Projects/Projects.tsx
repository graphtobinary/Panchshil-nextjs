"use client";

import { useEffect, useRef, useState } from "react";
import { ProjectsCarousel } from "./ProjectsCarousel";
import { ProjectCardData, RegionKey, TabKey, CountryKey } from "@/interfaces";

const tabs: { key: TabKey; label: string }[] = [
  { key: "residential", label: "Residential" },
  { key: "office", label: "Office parks" },
  { key: "hospitality", label: "Hospitality" },
  { key: "datacenter", label: "Data center" },
  { key: "retail", label: "Retail & F&B" },
];

const indiaDataByTab: Record<TabKey, ProjectCardData[]> = {
  residential: [
    {
      id: "trump",
      title: "Trump Tower",
      location: "Pune, India",
      image: "/assets/images/trump-thumbnil.jpg",
    },
    {
      id: "yoopune",
      title: "yoopune",

      location: "Pune, India",
      image: "/assets/images/yoopune thumbnil.jpg",
    },
    {
      id: "yoovillas",
      title: "YOO Villas",
      location: "Pune, India",
      image: "/assets/images/yoovillas-thumbnil.jpg",
    },
    {
      id: "omnia",
      title: "Omnia",
      location: "Mumbai, India",
      image: "/assets/images/omnia-thumbnil.png",
    },
  ],
  office: [
    {
      id: "businessbay",
      title: "Business Bay",
      location: "Pune, India",
      image: "/assets/images/business-bay-thumbnil.webp",
    },
    {
      id: "freezone",
      title: "EON Free Zone I",
      location: "Pune, India",
      image: "/assets/images/Eon-free-zone.webp",
    },
    {
      id: "techpark",
      title: "Tech Park One",
      location: "Pune, India",
      image: "/assets/images/techparkone.webp",
    },
    {
      id: "wts",
      title: "World Trade Center",
      location: "Pune, India",
      image: "/assets/images/worldtradecenter.jpg",
    },
  ],
  hospitality: [
    {
      id: "carlton",
      title: "The Ritz-Carlton",
      location: "Pune, India",
      image: "/assets/images/ritz.webp",
    },
    {
      id: "marriott",
      title: "JW Marriott",
      location: "Pune, India",
      image: "/assets/images/jw.jpg",
    },
    {
      id: "aloft",
      title: "Aloft Bangalore",
      location: "Bangalore, India",
      image: "/assets/images/aloft.webp",
    },
    {
      id: "msuites",
      title: "Marriott Suites",
      location: "Pune, India",
      image: "/assets/images/marriott suits.jpg",
    },
  ],
  datacenter: [
    {
      id: "lpanchshil",
      title: "Lumina Panchshil JV LBOM 1",
      location: "Navi Mumbai, India",
      image: "/assets/images/Lumina-PANCHSHIL-JV-LBOM-I.jpg",
    },
    {
      id: "lpanchshil2",
      title: "Lumina Panchshil JV LBOM 2",
      location: "Navi Mumbai, India",
      image: "/assets/images/Lumina-Panchshil-JV-LBOM-II.jpg",
    },
    {
      id: "airoli",
      title: "NTT NAV - Airoli DC - Phase 1",
      location: "Navi Mumbai, India",
      image: "/assets/images/Airoli-DC.jpg",
    },
  ],
  retail: [
    {
      id: "balewadi",
      title: "Balewadi High Street",
      location: "Pune, India",
      image: "/assets/images/Balewadi-High-Street.webp",
    },
    {
      id: "waterfront",
      title: "SOHO Street",
      location: "Pune, India",
      image: "/assets/images/soho.webp",
    },
    {
      id: "pavillion",
      title: "The Pavillion",
      location: "Pune, India",
      image: "/assets/images/The-Pavillion.jpg",
    },
    {
      id: "highstreet",
      title: "ICC High street",
      location: "Pune, India",
      image: "/assets/images/ICC-High-Street.webp",
    },
  ],
};

// International data: Country -> Category -> Projects
const dubaiDataByTab: Record<TabKey, ProjectCardData[]> = {
  residential: [
    {
      id: "east-residences",
      title: "42 East Residences",
      location: "Dubai, UAE",
      image: "/assets/images/42east-dubai-project.png",
    },
    // {
    //   id: "dubai-towers1",
    //   title: "DUBAI TOWERS",
    //   location: "Dubai, UAE",
    //   image: "/assets/images/panchshil-towers.jpg",
    // },
    // {
    //   id: "dubai-waterfront1",
    //   title: "DUBAI WATERFRONT",
    //   location: "Dubai, UAE",
    //   image: "/assets/images/waterfront.jpg",
    // },
  ],
  office: [
    // {
    //   id: "dubai-office1",
    //   title: "BUSINESS DISTRICT",
    //   location: "Dubai, UAE",
    //   image: "/assets/images/panchshil-towers.jpg",
    // },
    // {
    //   id: "dubai-office2",
    //   title: "COMMERCIAL HUB",
    //   location: "Dubai, UAE",
    //   image: "/assets/images/yoo-pune.jpg",
    // },
  ],
  hospitality: [
    // {
    //   id: "dubai-hotel1",
    //   title: "URBAN SUITES",
    //   location: "Dubai, UAE",
    //   image: "/assets/images/hospitality.jpg",
    // },
    // {
    //   id: "dubai-hotel2",
    //   title: "DUBAI RESORT",
    //   location: "Dubai, UAE",
    //   image: "/assets/images/yoo-pune.jpg",
    // },
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
      id: "raaya-atmosphere",
      title: "Raaya by atmosphere",
      location: "Raa Atoll, Kudakurathu Island, Maldives",
      image: "/assets/images/raaya.webp",
    },
    {
      id: "anantara-resort",
      title: "Anantara Dhigu Maldives Resort",
      location: "Dhigufinolu, Maldives",
      image: "/assets/images/dhigu.jpg",
    },
    {
      id: "anantara-resort2",
      title: "Anantara Veli Maldives Resort",
      location: "Veligandu South Male Atoll, Maldives",
      image: "/assets/images/veli.jpg",
    },
    {
      id: "anantara-resort3",
      title: "Anantara Naladhu Private Island",
      location: "Dhigufinolu, Maldives",
      image: "/assets/images/naladu.png",
    },
    {
      id: "anantara-resort4",
      title: "Conrad Maldives Rangali Island",
      location: "Rangali Island, Maldives",
      image: "/assets/images/conrad.webp",
    },
  ],
  office: [],
  hospitality: [],
  datacenter: [],
  retail: [],
};

const srilankaDataByTab: Record<TabKey, ProjectCardData[]> = {
  residential: [
    {
      id: "srilanka-carlton",
      title: "The Ritz-Carlton Reserve",
      location: "Pottuvil, Sri Lanka",
      image: "/assets/images/ritz-carlton-srilanka.jpeg",
    },
    //   {
    //     id: "srilanka-res2",
    //     title: "URBAN LIFESTYLE",
    //     location: "Colombo, Sri Lanka",
    //     image: "/assets/images/yoo-pune.jpg",
    //   },
    // ],
    // office: [
    //   {
    //     id: "srilanka-office1",
    //     title: "BAY FRONT",
    //     location: "Colombo, Sri Lanka",
    //     image: "/assets/images/waterfront.jpg",
    //   },
    //   {
    //     id: "srilanka-office2",
    //     title: "ICONIC HUB",
    //     location: "Colombo, Sri Lanka",
    //     image: "/assets/images/yoo-pune.jpg",
    //   },
  ],
  office: [],
  hospitality: [],
  datacenter: [],
  retail: [],
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
                  "text-[12px] md:text-[16px] font-medium tracking-wider capitalize transition-colors " +
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
                    "text-[12px] md:text-[16px] font-medium tracking-wider capitalize transition-colors " +
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
                    "text-[12px] md:text-[16px] font-medium tracking-wider capitalize transition-colors " +
                    (isActive
                      ? "text-gold-beige border-b-3 border-gold-beige"
                      : "text-gold-beige/60 hover:text-gold-beige")
                  }
                >
                  {c === "srilanka" ? "Sri Lanka" : c}
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
