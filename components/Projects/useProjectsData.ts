import { useMemo } from "react";
import { PropertiesData, Property } from "@/interfaces";
import { RegionKey, ProjectCardData } from "@/interfaces";

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

// Create a normalized key from category/country name (for consistent keys)
function normalizeKey(name: string): string {
  return name.toLowerCase().replace(/\s+/g, "-").replace(/&/g, "and");
}

export function useProjectsData(properties: PropertiesData | null) {
  const transformedData = useMemo(() => {
    if (!properties || properties.length === 0) {
      return {
        regions: [] as RegionKey[],
        indiaData: {} as Record<string, ProjectCardData[]>,
        internationalData: {} as Record<
          string,
          Record<string, ProjectCardData[]>
        >,
        indiaCategories: [] as Array<{ key: string; label: string }>,
        internationalCountries: [] as Array<{ key: string; label: string }>,
        internationalCategoryMaps: {} as Record<string, Record<string, string>>,
      };
    }

    // Dynamic data structures
    const indiaData: Record<string, ProjectCardData[]> = {};
    const internationalData: Record<
      string,
      Record<string, ProjectCardData[]>
    > = {};
    // Use arrays to preserve insertion order
    const indiaCategoryNames: string[] = [];
    const countryNames: string[] = [];
    // Map to store category names per country (countryKey -> Map<categoryKey, originalName>)
    const countryCategoryMaps = new Map<string, Map<string, string>>();

    // Process each region data
    properties.forEach((regionData) => {
      // Process India region
      if (regionData.India && Array.isArray(regionData.India)) {
        regionData.India.forEach((categoryGroup) => {
          Object.entries(categoryGroup).forEach(
            ([categoryName, properties]) => {
              if (!Array.isArray(properties)) return;

              const normalizedKey = normalizeKey(categoryName);
              // Preserve order - only add if not already in array
              if (!indiaCategoryNames.includes(categoryName)) {
                indiaCategoryNames.push(categoryName);
              }

              if (!indiaData[normalizedKey]) {
                indiaData[normalizedKey] = [];
              }

              // Accumulate properties for this category
              indiaData[normalizedKey] = [
                ...indiaData[normalizedKey],
                ...properties.map(propertyToProjectCard),
              ];
            }
          );
        });
      }

      // Process International region
      if (regionData.International && Array.isArray(regionData.International)) {
        regionData.International.forEach((countryGroup) => {
          Object.entries(countryGroup).forEach(([countryName, countryData]) => {
            const normalizedCountryKey = normalizeKey(countryName);
            // Preserve order - only add if not already in array
            if (!countryNames.includes(countryName)) {
              countryNames.push(countryName);
            }

            if (!internationalData[normalizedCountryKey]) {
              internationalData[normalizedCountryKey] = {};
            }

            if (Array.isArray(countryData)) {
              // Direct array of properties - assign to a default category
              const defaultCategory = "properties";
              if (!internationalData[normalizedCountryKey][defaultCategory]) {
                internationalData[normalizedCountryKey][defaultCategory] = [];
              }
              internationalData[normalizedCountryKey][defaultCategory] = [
                ...internationalData[normalizedCountryKey][defaultCategory],
                ...countryData.map(propertyToProjectCard),
              ];
            } else if (
              typeof countryData === "object" &&
              countryData !== null
            ) {
              // Object with categories
              if (!countryCategoryMaps.has(normalizedCountryKey)) {
                countryCategoryMaps.set(normalizedCountryKey, new Map());
              }
              const countryCategories =
                countryCategoryMaps.get(normalizedCountryKey)!;

              Object.entries(countryData).forEach(
                ([categoryName, properties]) => {
                  if (!Array.isArray(properties)) return;

                  const normalizedCategoryKey = normalizeKey(categoryName);
                  countryCategories.set(normalizedCategoryKey, categoryName);

                  if (
                    !internationalData[normalizedCountryKey][
                      normalizedCategoryKey
                    ]
                  ) {
                    internationalData[normalizedCountryKey][
                      normalizedCategoryKey
                    ] = [];
                  }

                  internationalData[normalizedCountryKey][
                    normalizedCategoryKey
                  ] = [
                    ...internationalData[normalizedCountryKey][
                      normalizedCategoryKey
                    ],
                    ...properties.map(propertyToProjectCard),
                  ];
                }
              );
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

    // Build category list for India (with original names) - preserve order
    const indiaCategories = indiaCategoryNames
      .map((categoryName) => {
        const normalizedKey = normalizeKey(categoryName);
        return {
          key: normalizedKey,
          label: categoryName,
        };
      })
      .filter((cat) => indiaData[cat.key] && indiaData[cat.key].length > 0);

    // Build country list for International (with original names) - preserve order
    const internationalCountries = countryNames
      .map((countryName) => {
        const normalizedKey = normalizeKey(countryName);
        return {
          key: normalizedKey,
          label: countryName,
        };
      })
      .filter((country) => {
        const countryData = internationalData[country.key];
        return (
          countryData &&
          Object.values(countryData).some((data) => data.length > 0)
        );
      });

    // Store category name mappings for International countries
    const internationalCategoryMaps: Record<
      string,
      Record<string, string>
    > = {};
    Object.entries(internationalData).forEach(([countryKey, categories]) => {
      internationalCategoryMaps[countryKey] = {};
      const countryCategoryMap = countryCategoryMaps.get(countryKey);
      Object.keys(categories).forEach((categoryKey) => {
        // Get original name from the country-specific map
        const originalName = countryCategoryMap?.get(categoryKey);
        if (originalName) {
          internationalCategoryMaps[countryKey][categoryKey] = originalName;
        } else {
          // Fallback: format the key
          internationalCategoryMaps[countryKey][categoryKey] = categoryKey
            .split("-")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ")
            .replace(/And/g, "&");
        }
      });
    });

    return {
      regions: regions.length > 0 ? regions : (["india"] as RegionKey[]),
      indiaData,
      internationalData,
      indiaCategories,
      internationalCountries,
      internationalCategoryMaps,
    };
  }, [properties]);

  // Get carousel items based on selections
  const getCarouselItems = useMemo(
    () =>
      (
        region: RegionKey,
        category: string,
        country: string
      ): ProjectCardData[] => {
        if (region === "india") {
          const items = transformedData.indiaData[category] || [];
          return [...items];
        }
        const items =
          transformedData.internationalData[country]?.[category] || [];
        return [...items];
      },
    [transformedData]
  );

  // Get available categories for a specific country (for International) - preserve order
  const getCountryCategories = useMemo(
    () =>
      (country: string): Array<{ key: string; label: string }> => {
        const countryData = transformedData.internationalData[country];
        if (!countryData) return [];

        const categoryMap =
          transformedData.internationalCategoryMaps?.[country] || {};

        // Use Object.entries which preserves insertion order in modern JS
        // Filter and map while preserving order
        return Object.entries(countryData)
          .filter(([categoryKey, properties]) => {
            // Filter out "properties" or "all-properties" category (hide "All Properties" tab)
            const normalizedKey = categoryKey.toLowerCase();
            return (
              properties.length > 0 &&
              normalizedKey !== "properties" &&
              normalizedKey !== "all-properties"
            );
          })
          .map(([categoryKey]) => {
            // Use stored original name or fallback to formatted key
            const label =
              categoryMap[categoryKey] ||
              categoryKey
                .split("-")
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(" ")
                .replace(/And/g, "&");

            return {
              key: categoryKey,
              label,
            };
          });
      },
    [transformedData]
  );

  return {
    regions: transformedData.regions,
    indiaCategories: transformedData.indiaCategories,
    internationalCountries: transformedData.internationalCountries,
    getCarouselItems,
    getCountryCategories,
  };
}
