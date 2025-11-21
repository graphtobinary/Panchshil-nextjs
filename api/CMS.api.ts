import API_CONSTANTS from "./constants";
import { doGet } from "@/api";

export const getAuthToken = () => {
  return doGet(
    API_CONSTANTS.AUTH_TOKEN,
    {},
    {
      headers: {
        "x-secret-key": process.env.X_SECRET_KEY || "",
      },
    }
  );
};

export const getMasterSlider = (token: string) => {
  return doGet(
    API_CONSTANTS.HOME_MASTER_SLIDER,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const getFeaturedProperties = (token: string) => {
  return doGet(
    API_CONSTANTS.HOME_FEATURED_PROPERTIES,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const getFeaturedPropertiesIntro = (token: string) => {
  return doGet(
    API_CONSTANTS.HOME_FEATURED_PROPERTIES_INTRO,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const getProperties = (token: string) => {
  return doGet(
    API_CONSTANTS.HOME_PROPERTIES,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const getPropertiesIntro = (token: string) => {
  return doGet(
    API_CONSTANTS.HOME_PROPERTIES_INTRO,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const getPropertyCategories = (token: string) => {
  return doGet(
    API_CONSTANTS.HOME_PROPERTY_CATEGORIES,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const getAboutIntro = (token: string) => {
  return doGet(
    API_CONSTANTS.HOME_ABOUT_INTRO,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const getServices = (token: string) => {
  return doGet(
    API_CONSTANTS.HOME_SERVICES,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const getServicesIntro = (token: string) => {
  return doGet(
    API_CONSTANTS.HOME_SERVICES_INTRO,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const getContactDetails = (token: string) => {
  return doGet(
    API_CONSTANTS.CONTACT_DETAILS,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const getSubscriberFormDetails = (token: string) => {
  return doGet(
    API_CONSTANTS.SUBSCRIBER_FORM_DETAILS,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
