import { ServicesPageClient } from "@/components/ServicesPage";
import { servicesPageDummyData } from "./services.data";
import {
  getAuthToken,
  getAboutServicesIntro,
  getServicesList,
} from "@/api/CMS.api";
import {
  AuthTokenResponse,
  ServicesIntroData,
  ServiceItem,
} from "@/interfaces";

export const revalidate = 600;

export default async function ServicesPage() {
  let token: string | null = null;
  try {
    const tokenResponse = (await getAuthToken()) as AuthTokenResponse;
    if (tokenResponse?.token && typeof tokenResponse.token === "string") {
      token = tokenResponse.token;
    }
  } catch (error) {
    console.error("Error fetching auth token:", error);
  }

  const apiCalls = token
    ? [getAboutServicesIntro(token), getServicesList(token)]
    : [Promise.resolve(null), Promise.resolve(null)];

  const [servicesIntroRes, servicesListRes] =
    await Promise.allSettled(apiCalls);

  const mergedData = { ...servicesPageDummyData };

  if (servicesIntroRes.status === "fulfilled" && servicesIntroRes.value) {
    const introData = servicesIntroRes.value as ServicesIntroData;
    mergedData.servicesIntroData = {
      services_headling:
        introData.services_headling ||
        mergedData.servicesIntroData.services_headling,
      services_description:
        introData.services_description ||
        mergedData.servicesIntroData.services_description,
    };
  }

  if (servicesListRes.status === "fulfilled" && servicesListRes.value) {
    const services = servicesListRes.value as ServiceItem[];
    if (Array.isArray(services) && services.length > 0) {
      mergedData.servicesData = services.map((service) => ({
        service_name: service.service_name,
        service_description: service.service_description,
        service_thumbnail: service.service_thumbnail,
        service_capabilities: service.service_capabilities,
      }));
    }
  }

  return <ServicesPageClient data={mergedData} />;
}
