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
import ListClient from "../ListClient";

// Disable page-level caching - we'll handle caching per API call
export const revalidate = 0; // Always fetch fresh data

interface ListPageProps {
  params: {
    "category-slug": string;
  };
}

export default async function ListPage({ params }: ListPageProps) {
  const resolvedParams = await params; // FIX

  // Get property_category_url_slug from params
  const propertyCategoryUrlSlug = resolvedParams["category-slug"];

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
  const apiCalls =
    token && propertyCategoryUrlSlug
      ? [
          getPropertyCategory(token, propertyCategoryUrlSlug),
          getPropertyCities(token, propertyCategoryUrlSlug),
          getPropertyStatuses(token, propertyCategoryUrlSlug),
          getPropertiesByCategory(token, propertyCategoryUrlSlug),
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
    />
  );
}
