import {
  getAuthToken,
  getContactDetails,
  getServicesIntro,
  getServices,
  getAboutIntro,
  getPropertyCategories,
  getPropertiesIntro,
  getProperties,
  getFeaturedPropertiesIntro,
  getFeaturedProperties,
  getMasterSlider,
  getMetaData,
  getBanner,
} from "@/api/CMS.api";
import HomeClient from "./HomeClient";
import {
  PropertyCategories,
  PropertiesIntroProps,
  PropertiesData,
  FeaturedPropertiesIntroProps,
  FeaturedPropertiesProps,
  ServicesIntroProps,
  ServicesProps,
  ContactDetailsProps,
  AboutIntroData,
  AuthTokenResponse,
  MetaDataProps,
  BannersProps,
} from "@/interfaces";
import { MasterSliderData } from "@/components/Hero/CustomCarousel";

export default async function Home() {
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
  const apiCalls = token
    ? [
        getMetaData(token, "Home"),
        getBanner(token, "Home"),
        getContactDetails(token),
        getServicesIntro(token),
        getServices(token),
        getAboutIntro(token),
        getPropertyCategories(token),
        getPropertiesIntro(token),
        getProperties(token),
        getFeaturedPropertiesIntro(token),
        getFeaturedProperties(token),
        getMasterSlider(token),
      ]
    : Array.from({ length: 10 }, () => Promise.resolve(null));

  const [
    metaData,
    banner,
    contactDetails,
    servicesIntro,
    services,
    aboutIntro,
    propertyCategories,
    propertiesIntro,
    properties,
    featuredPropertiesIntro,
    featuredProperties,
    masterSlider,
  ] = await Promise.allSettled(apiCalls);

  // Extract data from settled promises with type assertions
  const data = {
    metaData:
      metaData.status === "fulfilled"
        ? (metaData.value as MetaDataProps)
        : { meta_data_heading: "", meta_data_sub_heading: "" },
    banner:
      banner?.status === "fulfilled" ? (banner.value as BannersProps) : [],
    contactDetails:
      contactDetails?.status === "fulfilled"
        ? (contactDetails.value as ContactDetailsProps)
        : [],
    servicesIntro:
      servicesIntro?.status === "fulfilled"
        ? (servicesIntro.value as ServicesIntroProps)
        : { services_intro_heading: "", services_intro_sub_heading: "" },
    services:
      services?.status === "fulfilled"
        ? (services.value as ServicesProps[])
        : [],
    aboutIntro:
      aboutIntro?.status === "fulfilled"
        ? (aboutIntro.value as AboutIntroData)
        : {
            about_intro_heading: "",
            about_intro_description: "",
            about_intro_link: "",
            about_intro_image: "",
            about_intro_video: "",
            about_intro_button_caption: "",
          },
    propertyCategories:
      propertyCategories?.status === "fulfilled"
        ? (propertyCategories.value as PropertyCategories[])
        : [],
    propertiesIntro:
      propertiesIntro?.status === "fulfilled"
        ? (propertiesIntro.value as PropertiesIntroProps)
        : { properties_intro_heading: "", properties_intro_sub_heading: "" },
    properties:
      properties?.status === "fulfilled"
        ? (properties.value as PropertiesData | null)
        : null,
    featuredPropertiesIntro:
      featuredPropertiesIntro?.status === "fulfilled"
        ? (featuredPropertiesIntro.value as FeaturedPropertiesIntroProps)
        : {
            featured_properties_intro_heading: "",
            featured_properties_intro_sub_heading: "",
          },
    featuredProperties:
      featuredProperties?.status === "fulfilled"
        ? (featuredProperties.value as FeaturedPropertiesProps)
        : [],
    masterSlider:
      masterSlider?.status === "fulfilled"
        ? (masterSlider.value as MasterSliderData[])
        : [],
  };

  return (
    <HomeClient
      metaData={data.metaData as MetaDataProps}
      banner={data.banner as BannersProps}
      contactDetails={data.contactDetails}
      servicesIntro={data.servicesIntro}
      services={data.services}
      aboutIntro={data.aboutIntro}
      propertyCategories={data.propertyCategories}
      propertiesIntro={data.propertiesIntro}
      properties={data.properties}
      featuredPropertiesIntro={data.featuredPropertiesIntro}
      featuredProperties={data.featuredProperties}
      masterSlider={data.masterSlider}
    />
  );
}
