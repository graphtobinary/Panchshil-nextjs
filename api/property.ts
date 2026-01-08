import { doGet } from ".";
import API_CONSTANTS from "./constants";

export const getPropertyCategory = (
  token: string,
  property_category_url_slug: string
) => {
  return doGet(
    API_CONSTANTS.PROPERTY_CATEGORY,
    { property_category_url_slug },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const getPropertyCities = (
  token: string,
  property_category_url_slug: string
) => {
  return doGet(
    API_CONSTANTS.PROPERTY_CITIES,
    { property_category_url_slug },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const getPropertyStatuses = (
  token: string,
  property_category_url_slug: string
) => {
  return doGet(
    API_CONSTANTS.PROPERTY_STATUSES,
    { property_category_url_slug },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const getPropertiesByCategory = (
  token: string,
  property_category_url_slug: string,
  limit?: number,
  skip?: number
) => {
  // Build the API path
  let apiPath = API_CONSTANTS.PROPERTIES_BY_CATEGORY.replace(
    "{property_category_url_slug}",
    property_category_url_slug
  );

  // Add query parameters if limit and skip are provided
  if (limit !== undefined && skip !== undefined) {
    apiPath = `${apiPath}?limit=${limit}&skip=${skip}`;
  }

  return doGet(
    apiPath,
    { property_category_url_slug },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const getOtherPropertyCategories = (
  token: string,
  property_category_url_slug: string
) => {
  return doGet(
    API_CONSTANTS.OTHER_PROPERTY_CATEGORIES,
    { property_category_url_slug },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const getPropertyFooterBlocks = (token: string) => {
  return doGet(
    API_CONSTANTS.PROPERTY_FOOTER_BLOCKS,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
