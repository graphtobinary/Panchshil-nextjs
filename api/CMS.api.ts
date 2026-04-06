import API_CONSTANTS from "./constants";
import { doFetch, doGet, doPost } from "@/api";

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

export const getPropertyDetail = (
  token: string,
  property_category_url_slug: string,
  property_url_slug: string
) => {
  return doGet(
    API_CONSTANTS.PROPERTY_DETAIL,
    { property_category_url_slug, property_url_slug },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const getAwards = (token: string) => {
  return doGet(
    API_CONSTANTS.AWARDS,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const getAwardsAPI = (baseUrl?: string) => {
  const apiUrl = baseUrl
    ? `${baseUrl.replace(/\/$/, "")}${API_CONSTANTS.AWARDS_API}`
    : API_CONSTANTS.AWARDS_API;

  return doFetch(apiUrl, {
    method: "GET",
    cache: "no-store",
  });
};

export const getClients = (token: string) => {
  return doGet(
    API_CONSTANTS.CLIENTS,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const getClientsAPI = (baseUrl?: string) => {
  const apiUrl = baseUrl
    ? `${baseUrl.replace(/\/$/, "")}${API_CONSTANTS.CLIENTS_API}`
    : API_CONSTANTS.CLIENTS_API;

  return doFetch(apiUrl, {
    method: "GET",
    cache: "no-store",
  });
};

export const getTestimonials = (token: string) => {
  return doGet(
    API_CONSTANTS.TESTIMONIALS,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const getTestimonialsAPI = (baseUrl?: string) => {
  const apiUrl = baseUrl
    ? `${baseUrl.replace(/\/$/, "")}${API_CONSTANTS.TESTIMONIALS_API}`
    : API_CONSTANTS.TESTIMONIALS_API;

  return doFetch(apiUrl, {
    method: "GET",
    cache: "no-store",
  });
};

export const getPrecIntro = (token: string) => {
  return doGet(
    API_CONSTANTS.PREC_INTRO,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const getPrecIntroAPI = (baseUrl?: string) => {
  const apiUrl = baseUrl
    ? `${baseUrl.replace(/\/$/, "")}${API_CONSTANTS.PREC_INTRO_API}`
    : API_CONSTANTS.PREC_INTRO_API;

  return doFetch(apiUrl, {
    method: "GET",
    cache: "no-store",
  });
};

export const getPrecBenefits = (token: string) => {
  return doGet(
    API_CONSTANTS.PREC_BENEFITS,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const getPrecBenefitsAPI = (baseUrl?: string) => {
  const apiUrl = baseUrl
    ? `${baseUrl.replace(/\/$/, "")}${API_CONSTANTS.PREC_BENEFITS_API}`
    : API_CONSTANTS.PREC_BENEFITS_API;

  return doFetch(apiUrl, {
    method: "GET",
    cache: "no-store",
  });
};

export const getPrecFaqs = (token: string) => {
  return doGet(
    API_CONSTANTS.PREC_FAQS,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const getPrecFaqsAPI = (baseUrl?: string) => {
  const apiUrl = baseUrl
    ? `${baseUrl.replace(/\/$/, "")}${API_CONSTANTS.PREC_FAQS_API}`
    : API_CONSTANTS.PREC_FAQS_API;

  return doFetch(apiUrl, {
    method: "GET",
    cache: "no-store",
  });
};

export const getMeetTheCityMagazines = (token: string) => {
  return doGet(
    API_CONSTANTS.MEET_THE_CITY_MAGAZINES,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const getMeetTheCityMagazinesAPI = (baseUrl?: string) => {
  const apiUrl = baseUrl
    ? `${baseUrl.replace(/\/$/, "")}${API_CONSTANTS.MEET_THE_CITY_MAGAZINES_API}`
    : API_CONSTANTS.MEET_THE_CITY_MAGAZINES_API;

  return doFetch(apiUrl, {
    method: "GET",
    cache: "no-store",
  });
};

const esgBearerGet = (path: string) => (token: string) =>
  doGet(
    path,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

const esgProxyGet = (apiPath: string) => (baseUrl?: string) => {
  const apiUrl = baseUrl ? `${baseUrl.replace(/\/$/, "")}${apiPath}` : apiPath;

  return doFetch(apiUrl, {
    method: "GET",
    cache: "no-store",
  });
};

export const getEsgInitiatives = esgBearerGet(API_CONSTANTS.ESG_INITIATIVES);
export const getEsgInitiativesAPI = esgProxyGet(
  API_CONSTANTS.ESG_INITIATIVES_API
);
export const getEsgCommunities = esgBearerGet(API_CONSTANTS.ESG_COMMUNITIES);
export const getEsgCommunitiesAPI = esgProxyGet(
  API_CONSTANTS.ESG_COMMUNITIES_API
);
export const getEsgPolicies = esgBearerGet(API_CONSTANTS.ESG_POLICIES);
export const getEsgPoliciesAPI = esgProxyGet(API_CONSTANTS.ESG_POLICIES_API);
export const getEsgMilestonesIntro = esgBearerGet(
  API_CONSTANTS.ESG_MILESTONES_INTRO
);
export const getEsgMilestonesIntroAPI = esgProxyGet(
  API_CONSTANTS.ESG_MILESTONES_INTRO_API
);
export const getEsgMilestones = esgBearerGet(API_CONSTANTS.ESG_MILESTONES);
export const getEsgMilestonesAPI = esgProxyGet(
  API_CONSTANTS.ESG_MILESTONES_API
);
export const getEsgAwards = esgBearerGet(API_CONSTANTS.ESG_AWARDS);
export const getEsgAwardsAPI = esgProxyGet(API_CONSTANTS.ESG_AWARDS_API);
export const getEsgReportsIntro = esgBearerGet(API_CONSTANTS.ESG_REPORTS_INTRO);
export const getEsgReportsIntroAPI = esgProxyGet(
  API_CONSTANTS.ESG_REPORTS_INTRO_API
);
export const getEsgReports = esgBearerGet(API_CONSTANTS.ESG_REPORTS);
export const getEsgReportsAPI = esgProxyGet(API_CONSTANTS.ESG_REPORTS_API);
