import { getAuthToken, getPropertyDetail } from "@/api/CMS.api";
import ApiException from "@/api/Api.exception";
import PropertyDetailsPageClient from "@/components/PropertyDetailsPage/PropertyDetailsPageClient";
import type {
  AuthTokenResponse,
  MasterSliderData,
  Property,
  PropertyDetailResponse,
  PropertyInfoData,
  PropertyLocationCoOrdinatesProps,
} from "@/interfaces";
import { notFound, redirect } from "next/navigation";
import type { Metadata } from "next";

interface PropertyDetailtPageProps {
  params: {
    "category-slug": string;
    "property-slug": string;
  };
}

// Revalidate this page every 10 minutes
export const revalidate = 600;

function extractImageUrls(input: unknown): string[] {
  if (!input) return [];
  if (Array.isArray(input)) {
    // string[]
    if (input.every((x) => typeof x === "string")) return input as string[];
    // {url|image|src}[]
    return (input as unknown[])
      .map((x) => {
        if (!x || typeof x !== "object") return "";
        const obj = x as Record<string, unknown>;
        const url = obj.url ?? obj.image ?? obj.src ?? obj.path;
        return typeof url === "string" ? url : "";
      })
      .filter(Boolean);
  }
  return [];
}

export async function generateMetadata({
  params,
}: PropertyDetailtPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const propertyCategoryUrlSlug = resolvedParams["category-slug"];
  const propertyUrlSlug = resolvedParams["property-slug"];

  let token: string | null = null;
  try {
    const tokenResponse = (await getAuthToken()) as AuthTokenResponse;
    if (tokenResponse?.token && typeof tokenResponse.token === "string") {
      token = tokenResponse.token;
    }
  } catch (error) {
    console.error("Error fetching auth token for metadata:", error);
  }

  if (!token) {
    return {};
  }

  try {
    const detail = (await getPropertyDetail(
      token,
      propertyCategoryUrlSlug,
      propertyUrlSlug
    )) as PropertyDetailResponse;

    return {
      title: detail?.meta_data?.meta_title || detail?.property_name || "",
      description: detail?.meta_data?.meta_description || "",
      alternates: detail?.meta_data?.canonical_tag
        ? { canonical: detail.meta_data.canonical_tag }
        : undefined,
    };
  } catch (error) {
    console.error("Error fetching property detail for metadata:", error);
    return {};
  }
}

export default async function PropertyDetailPage({
  params,
}: PropertyDetailtPageProps) {
  const resolvedParams = await params;
  const propertyCategoryUrlSlug = resolvedParams["category-slug"];
  const propertyUrlSlug = resolvedParams["property-slug"];

  if (!propertyCategoryUrlSlug || !propertyUrlSlug) {
    notFound();
  }

  // Backward-compat: old pagination URLs were /:category/:page (e.g. /luxury-residences/1)
  // Redirect numeric slugs to the new /:category/page/:page route.
  if (/^\d+$/.test(propertyUrlSlug)) {
    redirect(`/${propertyCategoryUrlSlug}/page/${propertyUrlSlug}`);
  }

  // Fetch token
  let token: string | null = null;
  try {
    const tokenResponse = (await getAuthToken()) as AuthTokenResponse;
    if (tokenResponse?.token && typeof tokenResponse.token === "string") {
      token = tokenResponse.token;
    }
  } catch (error) {
    console.error("Error fetching auth token:", error);
  }

  if (!token) {
    notFound();
  }

  // Fetch property details (server-side)
  let propertyDetail: unknown = null;
  try {
    propertyDetail = await getPropertyDetail(
      token,
      propertyCategoryUrlSlug,
      propertyUrlSlug
    );
  } catch (error) {
    // If the API says the resource doesn't exist, show 404
    if (error instanceof ApiException && error.statusCode === 404) {
      notFound();
    }
    console.error("Error fetching property detail:", error);
  }

  const detail = (propertyDetail || {}) as PropertyDetailResponse;

  // Hero slide mapping (best-effort)
  const heroSlide: MasterSliderData | undefined = (() => {
    const title = detail?.property_name || detail?.meta_data?.meta_title || "";

    const description =
      detail?.property_introduction_description ||
      detail?.banner_data?.banner_image_description ||
      "";

    const link = detail?.meta_data?.canonical_tag || "";

    const image = detail?.banner_data?.banner_image ?? null;

    const video = "";

    const buttonCaption =
      detail?.property_introduction_caption ||
      detail?.banner_data?.banner_image_caption ||
      "Discover";

    // Only return if we have at least a title (otherwise use client fallback)
    if (!title) return undefined;
    return {
      master_slider_title: title,
      master_slider_description: description,
      master_slider_link: link,
      master_slider_image: image,
      master_slider_video: video,
      master_slider_button_caption: buttonCaption,
    };
  })();

  // Property info mapping (best-effort)
  const propertyInfo: PropertyInfoData | undefined = (() => {
    const location = detail?.property_band?.property_location || "";
    const configuration = detail?.property_band?.property_configuration || "";
    const status = detail?.property_band?.property_status || "";
    const price = detail?.property_band?.property_pricing || "";
    const brochureUrl = detail?.property_brochure || "#";
    const contactUrl = detail?.meta_data?.canonical_tag || "#";

    // If we have nothing useful, let the client component fallback
    if (!location && !configuration && !status && !price) return undefined;
    return { location, configuration, status, price, brochureUrl, contactUrl };
  })();

  // Try to build carousel items from image gallery if present
  const interiorUrls = extractImageUrls(detail?.property_interior_sliders);
  const exteriorUrls = extractImageUrls(detail?.property_exterior_sliders);

  const makeCarouselItems = (urls: string[]): Property[] =>
    urls.filter(Boolean).map((url, idx) => ({
      property_name: detail?.property_name || `Image ${idx + 1}`,
      property_thumbnail: url,
      property_location: detail?.property_band?.property_location || "",
      property_link: detail?.meta_data?.canonical_tag || "",
    }));

  const interiorItems =
    interiorUrls.length > 0 ? makeCarouselItems(interiorUrls) : undefined;
  const exteriorItems =
    exteriorUrls.length > 0 ? makeCarouselItems(exteriorUrls) : undefined;

  const property_location_co_ordinates =
    detail?.property_location?.property_location_co_ordinates || "";

  return (
    <PropertyDetailsPageClient
      heroSlide={heroSlide}
      propertyInfo={propertyInfo}
      interiorItems={interiorItems}
      exteriorItems={exteriorItems}
      property_location_co_ordinates={
        property_location_co_ordinates as PropertyLocationCoOrdinatesProps
      }
    />
  );
}
