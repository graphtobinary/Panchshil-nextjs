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
  property_category_url_slug: string
) => {
  return doGet(
    API_CONSTANTS.PROPERTIES_BY_CATEGORY,
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
