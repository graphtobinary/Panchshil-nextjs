import { getAuthToken } from "@/api/CMS.api";
import {
  getPropertyCategory,
  getPropertyCities,
  getPropertyStatuses,
  getOtherPropertyCategories,
  getPropertyFooterBlocks,
  getPropertiesByCategory,
} from "@/api/property";
import {
  AuthTokenResponse,
  CategoryFooterBlocksProps,
  PropertyCategories,
  PropertyCategoryProps,
  PropertyProps,
} from "@/interfaces";
import { PER_PAGE_LIMIT } from "@/api/constants";
import ListClient from "../../ListClient";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

// Disable page-level caching - we'll handle caching per API call
export const revalidate = 600; // 10 minutes

// Generate metadata for the page
export async function generateMetadata({
  params,
}: PaginatedListPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const propertyCategoryUrlSlug = resolvedParams["category-slug"];

  // Fetch token and property category for metadata
  let token: string | null = null;
  let propertyCategory: PropertyCategoryProps | null = null;

  try {
    const tokenResponse = (await getAuthToken()) as AuthTokenResponse;
    if (tokenResponse?.token && typeof tokenResponse.token === "string") {
      token = tokenResponse.token;

      // Fetch property category for metadata
      if (token && propertyCategoryUrlSlug) {
        try {
          const categoryResponse = await getPropertyCategory(
            token,
            propertyCategoryUrlSlug
          );
          propertyCategory = categoryResponse as PropertyCategoryProps;
        } catch (error) {
          console.error(
            "Error fetching property category for metadata:",
            error
          );
        }
      }
    }
  } catch (error) {
    console.error("Error fetching auth token for metadata:", error);
  }

  // Return metadata if available, otherwise use defaults
  return {
    title:
      propertyCategory?.meta_title ||
      "Panchshil - India's Leading Luxury Developer",
    description:
      propertyCategory?.meta_description ||
      "Since 2002, Panchshil Realty has set benchmarks in design, delivery and urban placemaking.",
    alternates: propertyCategory?.canonical_tag
      ? {
          canonical: propertyCategory.canonical_tag,
        }
      : undefined,
  };
}

interface PaginatedListPageProps {
  params: {
    "category-slug": string;
    page: string;
  };
}

export default async function PaginatedListPage({
  params,
}: PaginatedListPageProps) {
  const resolvedParams = await params;

  // Get property_category_url_slug and page from params
  const propertyCategoryUrlSlug = resolvedParams["category-slug"];
  const pageParam = resolvedParams.page;
  const page = pageParam ? parseInt(pageParam, 10) : 1;

  // Validate page number
  if (isNaN(page) || page < 1) {
    notFound();
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

  // Fetch all data in parallel if token is available, otherwise return null promises
  // Calculate pagination: limit = PER_PAGE_LIMIT (items per page), skip = PER_PAGE_LIMIT * (page - 1)
  const apiCalls =
    token && propertyCategoryUrlSlug
      ? [
          getPropertyCategory(token, propertyCategoryUrlSlug),
          getPropertyCities(token, propertyCategoryUrlSlug),
          getPropertyStatuses(token, propertyCategoryUrlSlug),
          getPropertiesByCategory(
            token,
            propertyCategoryUrlSlug,
            PER_PAGE_LIMIT, // limit = 5 (items per page)
            PER_PAGE_LIMIT * (page - 1) // skip = 5 * (page - 1)
          ),
          getOtherPropertyCategories(token, propertyCategoryUrlSlug),
          getPropertyFooterBlocks(token),
        ]
      : Array.from({ length: 1 }, () => Promise.resolve(null));

  const [
    propertyCategory,
    propertyCities,
    propertyStatuses,
    properties,
    otherPropertyCategories,
    propertyFooterBlocks,
  ] = await Promise.allSettled(apiCalls);

  // Extract data from settled promises with type assertions
  const data = {
    propertyCategory:
      propertyCategory.status === "fulfilled" ? propertyCategory.value : null,
    propertyCities:
      propertyCities.status === "fulfilled" ? propertyCities.value : null,
    propertyStatuses:
      propertyStatuses.status === "fulfilled" ? propertyStatuses.value : null,
    properties: properties.status === "fulfilled" ? properties.value : null,
    otherPropertyCategories:
      otherPropertyCategories.status === "fulfilled"
        ? otherPropertyCategories.value
        : null,
    propertyFooterBlocks:
      propertyFooterBlocks.status === "fulfilled"
        ? propertyFooterBlocks.value
        : null,
  };

  return (
    <ListClient
      propertyCategory={data.propertyCategory as PropertyCategoryProps}
      propertyCities={data.propertyCities as string[]}
      propertyStatuses={data.propertyStatuses as string[]}
      properties={data.properties as PropertyProps[]}
      otherPropertyCategories={
        data.otherPropertyCategories as PropertyCategories[]
      }
      propertyFooterBlocks={
        data.propertyFooterBlocks as CategoryFooterBlocksProps
      }
      currentPage={page}
    />
  );
}
