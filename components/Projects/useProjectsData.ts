import { useMemo } from "react";
import { PropertiesData, Property } from "@/interfaces";
import { RegionKey, TabKey, CountryKey, ProjectCardData } from "@/interfaces";

// Map API category names to TabKey
const CATEGORY_MAP: Record<string, TabKey> = {
  Residential: "residential",
  "Office Parks": "office",
  Hospitality: "hospitality",
  "Data Centres": "datacenter",
  "Retail & F&B": "retail",
};

// Map API country names to CountryKey
const COUNTRY_MAP: Record<string, CountryKey> = {
  "United Arab Emirates": "dubai",
  Maldives: "maldives",
  "Sri Lanka": "srilanka",
};

// Tab labels
const TAB_LABELS: Record<TabKey, string> = {
  residential: "Residential",
  office: "Office parks",
  hospitality: "Hospitality",
  retail: "Retail & F&B",
  datacenter: "Data Centres",
};

// Country labels
const COUNTRY_LABELS: Record<CountryKey, string> = {
  dubai: "Dubai",
  maldives: "Maldives",
  srilanka: "Sri Lanka",
};

// Convert Property to ProjectCardData
function propertyToProjectCard(property: Property): ProjectCardData {
  const id = property.property_link
    ? property.property_link.split("/").pop() ||
      property.property_name.toLowerCase().replace(/\s+/g, "-")
    : property.property_name.toLowerCase().replace(/\s+/g, "-");

  return {
    id,
    title: property.property_name,
    location: property.property_location,
    image: property.property_thumbnail,
    link: property.property_link,
  };
}

// Process India region data
function processIndiaData(
  indiaData: Array<Record<string, Property[]>>
): Record<TabKey, ProjectCardData[]> {
  const result: Record<TabKey, ProjectCardData[]> = {
    residential: [],
    office: [],
    hospitality: [],
    datacenter: [],
    retail: [],
  };

  indiaData.forEach((categoryGroup) => {
    Object.entries(categoryGroup).forEach(([categoryName, properties]) => {
      const tabKey = CATEGORY_MAP[categoryName];
      if (tabKey && Array.isArray(properties)) {
        result[tabKey] = properties.map(propertyToProjectCard);
      }
    });
  });

  return result;
}

// Process International region data
function processInternationalData(
  internationalData: Array<
    Record<string, Property[] | Record<string, Property[]>>
  >
): Record<CountryKey, Record<TabKey, ProjectCardData[]>> {
  const result: Record<CountryKey, Record<TabKey, ProjectCardData[]>> = {
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

  internationalData.forEach((countryGroup) => {
    Object.entries(countryGroup).forEach(([countryName, countryData]) => {
      const countryKey = COUNTRY_MAP[countryName];
      if (!countryKey) return;

      if (Array.isArray(countryData)) {
        // Direct array of properties - assign to residential
        result[countryKey].residential = countryData.map(propertyToProjectCard);
      } else if (typeof countryData === "object" && countryData !== null) {
        // Object with categories
        Object.entries(countryData).forEach(([categoryName, properties]) => {
          const tabKey = CATEGORY_MAP[categoryName];
          if (tabKey && Array.isArray(properties)) {
            result[countryKey][tabKey] = properties.map(propertyToProjectCard);
          }
        });
      }
    });
  });

  return result;
}

export function useProjectsData(properties: PropertiesData | null) {
  const transformedData = useMemo(() => {
    if (!properties || properties.length === 0) {
      return {
        regions: [] as RegionKey[],
        indiaData: {} as Record<TabKey, ProjectCardData[]>,
        internationalData: {} as Record<
          CountryKey,
          Record<TabKey, ProjectCardData[]>
        >,
      };
    }

    const indiaData: Record<TabKey, ProjectCardData[]> = {
      residential: [],
      office: [],
      hospitality: [],
      retail: [],
      datacenter: [],
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

    // Process each region data
    properties.forEach((regionData) => {
      if (regionData.India && Array.isArray(regionData.India)) {
        const processed = processIndiaData(regionData.India);
        Object.keys(processed).forEach((key) => {
          const tabKey = key as TabKey;
          // Accumulate data from multiple entries, creating fresh arrays
          if (processed[tabKey].length > 0) {
            indiaData[tabKey] = [...indiaData[tabKey], ...processed[tabKey]];
          }
        });
      }

      if (regionData.International && Array.isArray(regionData.International)) {
        const processed = processInternationalData(regionData.International);
        Object.keys(processed).forEach((countryKey) => {
          const key = countryKey as CountryKey;
          Object.keys(processed[key]).forEach((tabKey) => {
            const categoryKey = tabKey as TabKey;
            // Accumulate data from multiple entries, creating fresh arrays
            if (processed[key][categoryKey].length > 0) {
              internationalData[key][categoryKey] = [
                ...internationalData[key][categoryKey],
                ...processed[key][categoryKey],
              ];
            }
          });
        });
      }
    });

    // Determine available regions
    const hasIndiaData = Object.values(indiaData).some(
      (data) => data.length > 0
    );
    const hasInternationalData = Object.values(internationalData).some(
      (countryData) =>
        Object.values(countryData).some(
          (categoryData) => categoryData.length > 0
        )
    );

    const regions: RegionKey[] = [];
    if (hasIndiaData) regions.push("india");
    if (hasInternationalData) regions.push("international");

    return {
      regions: regions.length > 0 ? regions : (["india"] as RegionKey[]),
      indiaData,
      internationalData,
    };
  }, [properties]);

  // Get available categories for India
  const indiaCategories = useMemo(() => {
    return (Object.keys(transformedData.indiaData) as TabKey[])
      .filter((key) => transformedData.indiaData[key].length > 0)
      .map((key) => ({
        key,
        label: TAB_LABELS[key],
      }));
  }, [transformedData.indiaData]);

  // Get available countries for International
  const internationalCountries = useMemo(() => {
    return (Object.keys(transformedData.internationalData) as CountryKey[])
      .filter((countryKey) => {
        const countryData = transformedData.internationalData[countryKey];
        return Object.values(countryData).some((data) => data.length > 0);
      })
      .map((key) => ({
        key,
        label: COUNTRY_LABELS[key],
      }));
  }, [transformedData.internationalData]);

  // Get carousel items based on selections
  // Memoize this function to ensure stable reference and return fresh array
  const getCarouselItems = useMemo(
    () =>
      (
        region: RegionKey,
        category: TabKey,
        country: CountryKey
      ): ProjectCardData[] => {
        if (region === "india") {
          const items = transformedData.indiaData[category] || [];
          // Return a fresh array copy to prevent reference issues
          return [...items];
        }
        const items =
          transformedData.internationalData[country]?.[category] || [];
        // Return a fresh array copy to prevent reference issues
        return [...items];
      },
    [transformedData]
  );

  return {
    regions: transformedData.regions,
    indiaCategories,
    internationalCountries,
    getCarouselItems,
  };
}
