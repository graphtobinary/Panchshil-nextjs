/** Grouped cities API shape: [{ india: [...], maldives: [...] }] or a single { india: [...] } */
export type GroupedPropertyCities = Array<Record<string, string[]>>;
export type PropertyCitiesInput =
  | string[]
  | GroupedPropertyCities
  | Record<string, string[]>
  | undefined;

function isFlatStringList(value: unknown): value is string[] {
  return (
    Array.isArray(value) && value.length > 0 && typeof value[0] === "string"
  );
}

/** Normalize API payloads: flat string[], array of country buckets, or one country bucket object. */
function collectCountryGroups(
  propertyCities: PropertyCitiesInput
): Record<string, string[]>[] {
  if (propertyCities == null) return [];

  if (isFlatStringList(propertyCities)) {
    return [];
  }

  if (Array.isArray(propertyCities)) {
    if (propertyCities.length === 0) return [];
    return propertyCities.filter(
      (g): g is Record<string, string[]> =>
        g != null && typeof g === "object" && !Array.isArray(g)
    );
  }

  if (typeof propertyCities === "object" && !Array.isArray(propertyCities)) {
    return [propertyCities as Record<string, string[]>];
  }

  return [];
}

export function flattenPropertyCities(
  propertyCities: PropertyCitiesInput
): string[] {
  if (propertyCities == null) return [];

  if (isFlatStringList(propertyCities)) {
    return propertyCities as string[];
  }

  const groups = collectCountryGroups(propertyCities);
  const flattened: string[] = [];
  for (const group of groups) {
    for (const cities of Object.values(group)) {
      if (!Array.isArray(cities)) continue;
      for (const city of cities) {
        if (typeof city === "string" && city.trim()) flattened.push(city);
      }
    }
  }
  return Array.from(new Set(flattened));
}

export function getCitiesForPropertyCountries(
  propertyCities: PropertyCitiesInput,
  countrySlugs: string[]
): string[] {
  if (!countrySlugs.length) return [];
  if (propertyCities == null) return [];
  if (isFlatStringList(propertyCities)) return [];

  const normalizedSlugs = new Set(
    countrySlugs.map((s) => s.trim().toLowerCase()).filter(Boolean)
  );

  const groups = collectCountryGroups(propertyCities);
  const cities: string[] = [];
  for (const group of groups) {
    for (const [key, vals] of Object.entries(group)) {
      if (!normalizedSlugs.has(key.toLowerCase())) continue;
      if (!Array.isArray(vals)) continue;
      for (const c of vals) {
        if (typeof c === "string" && c.trim()) cities.push(c);
      }
    }
  }
  return Array.from(new Set(cities));
}

function locationTextMatchesCountrySlug(text: string, slug: string): boolean {
  const t = text.toLowerCase();
  switch (slug) {
    case "maldives":
      return t.includes("maldives");
    case "sri-lanka":
    case "srilanka":
      return (
        t.includes("sri lanka") ||
        t.includes("srilanka") ||
        /sri[\s-]?lanka/.test(t)
      );
    case "india":
      return t.includes("india");
    case "dubai":
    case "uae":
    case "united-arab-emirates":
      return (
        t.includes("dubai") ||
        t.includes("uae") ||
        t.includes("united arab emirates")
      );
    default:
      // Never substring-match arbitrary slugs (e.g. "ho" matches "hotel").
      return false;
  }
}

/**
 * Allowed `property-country` query values only (full slug match after trim + lowercase).
 * Unknown or partial strings like `ho`, `mi`, `rte` are ignored.
 */
export const VALID_PROPERTY_COUNTRY_SLUGS = new Set([
  "india",
  "maldives",
  "sri-lanka",
  "srilanka",
  "dubai",
  "uae",
  "united-arab-emirates",
]);

function normalizePropertyCountrySlugInput(raw: string): string {
  return raw.trim().toLowerCase().replace(/\s+/g, "-");
}

/** Keep only whitelisted country slugs (deduped). */
export function sanitizePropertyCountrySlugs(slugs: string[]): string[] {
  const out: string[] = [];
  for (const s of slugs) {
    const n = normalizePropertyCountrySlugInput(s);
    if (!n) continue;
    if (VALID_PROPERTY_COUNTRY_SLUGS.has(n)) {
      out.push(n);
    }
  }
  return Array.from(new Set(out));
}

/**
 * When the cities API returns one flat list, Indian listings often omit the word "India"
 * (e.g. "Pune", "Candolim, Goa"). Exclude known Maldives / Sri Lanka city names from the
 * same list so `?property-country=india` still selects all domestic cities.
 */
const CITY_NAMES_NOT_INDIA = new Set(
  [
    "Dhigufinolhu",
    "Kudakurathu",
    "Pottuvil",
    "Rangali Island",
    "Veligandu Huraa",
  ].map((c) => c.toLowerCase())
);

function isClearlyInternationalListing(text: string): boolean {
  const t = text.toLowerCase();
  return (
    t.includes("maldives") ||
    /sri[\s-]?lanka/.test(t) ||
    t.includes("srilanka") ||
    t.includes("dubai") ||
    t.includes("uae") ||
    t.includes("united arab emirates")
  );
}

/** India: explicit "India" in text, or known Indian city in allow list and not intl. */
function countryMatchesForFlatListInference(
  blob: string,
  slug: string,
  canonicalCityFromAllowList: string | undefined
): boolean {
  if (locationTextMatchesCountrySlug(blob, slug)) return true;

  if (slug !== "india" || !canonicalCityFromAllowList) return false;

  const cityLower = canonicalCityFromAllowList.trim().toLowerCase();
  if (CITY_NAMES_NOT_INDIA.has(cityLower)) return false;
  if (isClearlyInternationalListing(blob)) return false;

  return true;
}

export type PropertyRowForCityInference = {
  property_city_name?: string;
  property_location?: string;
  property_tagline?: string;
  property_basic_information?: Array<{
    property_basic_information_caption?: string;
  }>;
};

function buildInferenceBlob(p: PropertyRowForCityInference): string {
  const parts = [
    p.property_location,
    p.property_tagline,
    ...(p.property_basic_information?.map(
      (i) => i.property_basic_information_caption
    ) ?? []),
  ];
  return parts.filter(Boolean).join(" ");
}

/**
 * When the cities API returns a flat `string[]` (no country keys), infer which cities
 * belong to `countrySlugs` using listing text (location, tagline, basic info captions).
 */
export function inferCitiesForCountrySlugsFromProperties(
  flatCityAllowList: string[],
  countrySlugs: string[],
  properties: PropertyRowForCityInference[] | undefined
): string[] {
  if (
    !countrySlugs.length ||
    !flatCityAllowList.length ||
    !properties?.length
  ) {
    return [];
  }

  const allowByLower = new Map(
    flatCityAllowList.map((c) => {
      const t = c.trim();
      return [t.toLowerCase(), t] as const;
    })
  );

  const slugs = countrySlugs.map((s) => s.trim().toLowerCase()).filter(Boolean);
  const out = new Set<string>();

  for (const p of properties) {
    const blob = buildInferenceBlob(p);
    const rawCity = p.property_city_name?.trim();
    const canonical = rawCity
      ? allowByLower.get(rawCity.toLowerCase())
      : undefined;

    const countryMatch = slugs.some((slug) =>
      countryMatchesForFlatListInference(blob, slug, canonical)
    );
    if (!countryMatch) continue;

    if (canonical) {
      out.add(canonical);
      continue;
    }

    const blobLower = blob.toLowerCase();
    const byLength = [...flatCityAllowList].sort(
      (a, b) => b.trim().length - a.trim().length
    );
    for (const c of byLength) {
      const t = c.trim();
      if (!t) continue;
      if (blobLower.includes(t.toLowerCase())) {
        out.add(t);
      }
    }
  }

  return Array.from(out);
}

/** Grouped lookup first; if empty and payload is a flat list, infer from property rows. */
export function resolveCitiesForPropertyCountries(
  propertyCities: PropertyCitiesInput,
  countrySlugs: string[],
  allProperties?: PropertyRowForCityInference[] | undefined,
  /** Used when `allProperties` is empty (e.g. API) so page slice can still drive inference. */
  pageProperties?: PropertyRowForCityInference[] | undefined
): string[] {
  const countrySlugsSafe = sanitizePropertyCountrySlugs(countrySlugs);
  if (!countrySlugsSafe.length) return [];

  const fromGroups = getCitiesForPropertyCountries(
    propertyCities,
    countrySlugsSafe
  );
  if (fromGroups.length > 0) return fromGroups;

  if (isFlatStringList(propertyCities)) {
    const slugs = countrySlugsSafe;

    // Flat list has no country keys: `?property-country=india` should select every Indian
    // city in the list, not only cities that happen to appear on a property whose copy
    // contains the word "India".
    if (slugs.length === 1 && slugs[0] === "india") {
      const indiaCities = propertyCities.filter(
        (c) => !CITY_NAMES_NOT_INDIA.has(c.trim().toLowerCase())
      );
      if (indiaCities.length > 0) {
        return Array.from(new Set(indiaCities));
      }
    }

    const rows =
      allProperties && allProperties.length > 0
        ? allProperties
        : pageProperties && pageProperties.length > 0
          ? pageProperties
          : undefined;
    return inferCitiesForCountrySlugsFromProperties(
      propertyCities,
      countrySlugsSafe,
      rows
    );
  }

  return [];
}

/** Parse `?property-country=a&property-country=b` from a Next.js page `searchParams` object. */
export function parsePropertyCountryKeysFromPageSearchParams(
  searchParams: Record<string, string | string[] | undefined> | undefined
): string[] {
  if (!searchParams) return [];
  const raw = searchParams["property-country"];
  if (raw == null) return [];
  const parts = Array.isArray(raw) ? raw : [raw];
  const keys = parts.flatMap((p) => String(p).split(","));
  const trimmed = keys.map((k) => k.trim()).filter(Boolean);
  return sanitizePropertyCountrySlugs(trimmed);
}

/**
 * Unwrap common CMS/API shapes so country-key → cities[] can be read.
 * Handles stringified JSON, `{ data: ... }`, and single bucket objects.
 */
export function normalizePropertyCitiesRaw(
  raw: unknown
): PropertyCitiesInput | undefined {
  if (raw == null) return undefined;

  if (typeof raw === "string") {
    try {
      return normalizePropertyCitiesRaw(JSON.parse(raw));
    } catch {
      return undefined;
    }
  }

  if (Array.isArray(raw)) {
    if (raw.length === 0) return undefined;
    if (typeof raw[0] === "string") return raw as string[];
    return raw as GroupedPropertyCities;
  }

  if (typeof raw !== "object") return undefined;

  const o = raw as Record<string, unknown>;

  const inner =
    o["data"] ??
    o["property_cities"] ??
    o["propertyCities"] ??
    o["cities"] ??
    o["result"] ??
    o["items"] ??
    o["body"];

  if (inner !== undefined && inner !== o) {
    return normalizePropertyCitiesRaw(inner);
  }

  const vals = Object.values(o);
  const looksLikeCountryBucket =
    vals.length > 0 &&
    vals.every(
      (v) =>
        Array.isArray(v) && (v as unknown[]).every((x) => typeof x === "string")
    );

  if (looksLikeCountryBucket) {
    return o as Record<string, string[]>;
  }

  return undefined;
}
