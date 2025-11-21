"use client";

import { useEffect, useRef, useState, useMemo, startTransition } from "react";
import { ProjectsCarousel } from "./ProjectsCarousel";
import { ProjectCardData, RegionKey, TabKey, CountryKey } from "@/interfaces";
import { PropertiesData, PropertiesIntroProps, Property } from "@/interfaces";

// Helper function to convert Property to ProjectCardData
const propertyToProjectCard = (property: Property): ProjectCardData => {
  // Generate id from property_link or property_name
  const id = property.property_link
    ? property.property_link.split("/").pop() ||
      property.property_name.toLowerCase().replace(/\s+/g, "-")
    : property.property_name.toLowerCase().replace(/\s+/g, "-");

  return {
    id,
    title: property.property_name,
    location: property.property_location,
    image: property.property_thumbnail,
  };
};

// Map API category names to TabKey
const categoryToTabKey = (category: string): TabKey | null => {
  const mapping: Record<string, TabKey> = {
    Residential: "residential",
    "Office Parks": "office",
    Hospitality: "hospitality",
    "Data Centres": "datacenter",
    "Retail & F&B": "retail",
  };
  return mapping[category] || null;
};

// Map API country names to CountryKey
const countryToCountryKey = (country: string): CountryKey | null => {
  const mapping: Record<string, CountryKey> = {
    "United Arab Emirates": "dubai",
    Maldives: "maldives",
    "Sri Lanka": "srilanka",
  };
  return mapping[country] || null;
};

export function Projects({
  properties,
  propertiesIntro,
}: {
  properties: PropertiesData | null;
  propertiesIntro: PropertiesIntroProps;
}) {
  // Initialize region state based on available data
  const getInitialRegion = (): RegionKey => {
    if (!properties || properties.length === 0) return "india";

    // Check if India has data
    const hasIndiaData = properties.some(
      (regionData) =>
        regionData.India &&
        Array.isArray(regionData.India) &&
        regionData.India.length > 0
    );

    // Check if International has data
    const hasInternationalData = properties.some(
      (regionData) =>
        regionData.International &&
        Array.isArray(regionData.International) &&
        regionData.International.length > 0
    );

    // Prefer India if available, otherwise International, otherwise default to India
    if (hasIndiaData) return "india";
    if (hasInternationalData) return "international";
    return "india";
  };

  const [region, setRegion] = useState<RegionKey>(getInitialRegion());
  const [country, setCountry] = useState<CountryKey>("dubai");
  const [active, setActive] = useState<TabKey>("residential");

  const sectionRef = useRef<HTMLElement>(null);
  const [isInView, setIsInView] = useState(false);
  const prevRegionRef = useRef<RegionKey>(region);
  const prevCountryRef = useRef<CountryKey>(country);

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

  // Transform API data to component format
  const transformedData = useMemo(() => {
    if (!properties || properties.length === 0) {
      return {
        india: {} as Record<TabKey, ProjectCardData[]>,
        international: {} as Record<
          CountryKey,
          Record<TabKey, ProjectCardData[]>
        >,
        availableTabs: [] as TabKey[],
        availableCountries: [] as CountryKey[],
        availableRegions: ["india"] as RegionKey[],
      };
    }

    const indiaData: Record<TabKey, ProjectCardData[]> = {
      residential: [],
      office: [],
      hospitality: [],
      datacenter: [],
      retail: [],
    };

    const internationalData: Record<
      CountryKey,
      Record<TabKey, ProjectCardData[]>
    > = {
      dubai: {
        residential: [],
        office: [],
        hospitality: [],
        datacenter: [],
        retail: [],
      },
      maldives: {
        residential: [],
        office: [],
        hospitality: [],
        datacenter: [],
        retail: [],
      },
      srilanka: {
        residential: [],
        office: [],
        hospitality: [],
        datacenter: [],
        retail: [],
      },
    };

    // Process properties data
    properties.forEach((regionData) => {
      // Process India region
      if (regionData.India && Array.isArray(regionData.India)) {
        regionData.India.forEach((categoryGroup) => {
          Object.keys(categoryGroup).forEach((categoryName) => {
            const tabKey = categoryToTabKey(categoryName);
            if (
              tabKey &&
              categoryGroup[categoryName as keyof typeof categoryGroup]
            ) {
              const properties = categoryGroup[
                categoryName as keyof typeof categoryGroup
              ] as Property[];
              if (properties && Array.isArray(properties)) {
                indiaData[tabKey] = properties.map(propertyToProjectCard);
              }
            }
          });
        });
      }

      // Process International region
      if (regionData.International && Array.isArray(regionData.International)) {
        regionData.International.forEach((countryGroup) => {
          Object.keys(countryGroup).forEach((countryName) => {
            const countryKey = countryToCountryKey(countryName);
            if (
              countryKey &&
              countryGroup[countryName as keyof typeof countryGroup]
            ) {
              const countryData =
                countryGroup[countryName as keyof typeof countryGroup];

              // Check if countryData is an array of properties (direct) or an object with categories
              if (Array.isArray(countryData)) {
                // Properties are directly in the country array - assign to residential
                internationalData[countryKey].residential = countryData.map(
                  propertyToProjectCard
                );
              } else if (
                typeof countryData === "object" &&
                countryData !== null
              ) {
                // Country has categories - process each category
                Object.keys(countryData).forEach((categoryName) => {
                  const tabKey = categoryToTabKey(categoryName);
                  if (
                    tabKey &&
                    countryData[categoryName as keyof typeof countryData]
                  ) {
                    const properties = countryData[
                      categoryName as keyof typeof countryData
                    ] as Property[];
                    if (properties && Array.isArray(properties)) {
                      internationalData[countryKey][tabKey] = properties.map(
                        propertyToProjectCard
                      );
                    }
                  }
                });
              }
            }
          });
        });
      }
    });

    // Get available tabs (tabs that have data)
    const availableTabs = (Object.keys(indiaData) as TabKey[]).filter(
      (tab) => indiaData[tab].length > 0
    );

    // Get available countries (countries that have data)
    const availableCountries = (
      Object.keys(internationalData) as CountryKey[]
    ).filter((country) => {
      const countryData = internationalData[country];
      return Object.values(countryData).some((tabData) => tabData.length > 0);
    });

    // Get available regions (regions that have data)
    const availableRegions: RegionKey[] = [];
    const hasIndiaData = Object.values(indiaData).some(
      (tabData) => tabData.length > 0
    );
    const hasInternationalData = availableCountries.length > 0;

    if (hasIndiaData) {
      availableRegions.push("india");
    }
    if (hasInternationalData) {
      availableRegions.push("international");
    }

    return {
      india: indiaData,
      international: internationalData,
      availableTabs:
        availableTabs.length > 0
          ? availableTabs
          : (["residential"] as TabKey[]),
      availableCountries:
        availableCountries.length > 0
          ? availableCountries
          : (["dubai"] as CountryKey[]),
      availableRegions:
        availableRegions.length > 0
          ? availableRegions
          : (["india"] as RegionKey[]),
    };
  }, [properties]);

  // Generate tabs from available data
  const tabs = useMemo(() => {
    const tabLabels: Record<TabKey, string> = {
      residential: "Residential",
      office: "Office parks",
      hospitality: "Hospitality",
      datacenter: "Data center",
      retail: "Retail & F&B",
    };

    return transformedData.availableTabs.map((key) => ({
      key,
      label: tabLabels[key],
    }));
  }, [transformedData.availableTabs]);

  // Update region if current region is no longer available
  useEffect(() => {
    if (
      transformedData.availableRegions.length > 0 &&
      !transformedData.availableRegions.includes(region)
    ) {
      startTransition(() => {
        setRegion(transformedData.availableRegions[0]);
      });
    }
  }, [transformedData.availableRegions, region]);

  // Reset active tab when switching regions if current tab has no data
  useEffect(() => {
    const regionChanged = prevRegionRef.current !== region;
    const countryChanged = prevCountryRef.current !== country;

    // Only update when region or country changes, not when active changes
    if (regionChanged || countryChanged) {
      prevRegionRef.current = region;
      prevCountryRef.current = country;

      if (region === "india") {
        const currentTabData = transformedData.india[active];
        if (!currentTabData || currentTabData.length === 0) {
          // Set to first available tab
          if (transformedData.availableTabs.length > 0) {
            const firstAvailableTab = transformedData.availableTabs[0];
            if (firstAvailableTab !== active) {
              startTransition(() => {
                setActive(firstAvailableTab);
              });
            }
          }
        }
      } else {
        const currentTabData = transformedData.international[country]?.[active];
        if (!currentTabData || currentTabData.length === 0) {
          // Set to residential as default for international
          if (active !== "residential") {
            startTransition(() => {
              setActive("residential");
            });
          }
        }
      }
    }
  }, [region, country, active, transformedData]);
  return (
    <section ref={sectionRef} className="w-full bg-[#FFFAF7] py-20">
      <div className=" mx-auto">
        {/* Title + Subtitle */}
        <div
          className={`text-center mb-10 ${isInView ? "animate-fade-in-up" : "opacity-0"}`}
        >
          <div className="text-lg tracking-[0.2em] font-medium text-gold-beige mb-2">
            {propertiesIntro?.properties_intro_heading}
          </div>
          <h2 className="text-2xl md:text-[28px] font-display-semi text-black">
            {propertiesIntro?.properties_intro_sub_heading}
          </h2>
        </div>

        {/* Region Tabs */}
        {transformedData.availableRegions.length > 0 && (
          <div
            className={`flex items-center justify-center gap-12 mb-12 ${isInView ? "animate-fade-in-up-delay-1" : "opacity-0"}`}
          >
            {transformedData.availableRegions.map((r) => {
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
        )}

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
            {transformedData.availableCountries.map((c) => {
              const isActive = c === country;
              const countryLabels: Record<CountryKey, string> = {
                dubai: "Dubai",
                maldives: "Maldives",
                srilanka: "Sri Lanka",
              };
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
                  {countryLabels[c]}
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
                ? transformedData.india[active] || []
                : transformedData.international[country]?.[active] || []
            }
          />
        </div>
      </div>
    </section>
  );
}
