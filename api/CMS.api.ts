import API_CONSTANTS from "./constants";
import { doGet, doPost } from "@/api";

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

export const getMetaData = (token: string, pageName: string = "Home") => {
  const formData = new URLSearchParams();
  formData.append("page_name", pageName);

  return doPost(
    API_CONSTANTS.META_DATA,
    {},
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Bearer ${token}`,
      },
      body: formData.toString(),
    }
  );
};

export const getBanner = (token: string, pageName: string = "Home") => {
  const formData = new URLSearchParams();
  formData.append("page_name", pageName);

  return doPost(
    API_CONSTANTS.BANNER,
    {},
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Bearer ${token}`,
      },
      body: formData.toString(),
    }
  );
};

export const updateSubscriberFormDetailsAPI = (formData: FormData) => {
  return fetch(API_CONSTANTS.SUBSCRIBER_FORM_DETAILS_API, {
    method: "POST",
    body: formData,
  });
};

export const updateSubscriberFormDetails = (
  token: string,
  subscriberEmailId: string,
  ipAddress: string
) => {
  const formData = new URLSearchParams();
  formData.append("subscriber_email_id", subscriberEmailId);
  formData.append("ip_address", ipAddress);
  return doPost(
    API_CONSTANTS.SUBSCRIBER_FORM_DETAILS,
    {},
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Bearer ${token}`,
      },
      body: formData.toString(),
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

export const getMilestones = (token: string) => {
  return doGet(
    API_CONSTANTS.HOME_MILESTONES,
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

export const getFooterBlocks = (token: string) => {
  return doGet(
    API_CONSTANTS.FOOTER_BLOCKS,
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

export const getNavigationMenu = (token: string) => {
  return doGet(
    API_CONSTANTS.NAVIGATION_MENU,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
