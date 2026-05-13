import { ClientsPageClient } from "@/components/ClientsPage";
import { ClientItem, clientsPageData } from "./clients.data";
import {
  getAuthToken,
  getClients,
  getClientsAPI,
  getBanner,
  getMetaData,
} from "@/api/CMS.api";
import {
  AuthTokenResponse,
  ClientsApiItem,
  BannersProps,
  MetaDataProps,
} from "@/interfaces";
import type { Metadata } from "next";
// Revalidate this route every 30 minutes.
export const revalidate = 1800;

async function getPageMetaData(): Promise<MetaDataProps | null> {
  let token: string | null = null;
  try {
    const tokenResponse = (await getAuthToken()) as AuthTokenResponse;
    if (tokenResponse?.token && typeof tokenResponse.token === "string") {
      token = tokenResponse.token;
    }
  } catch (error) {
    console.error("Error fetching auth token for metadata:", error);
    return null;
  }

  if (!token) return null;

  try {
    return (await getMetaData(token, "Clients")) as MetaDataProps;
  } catch (error) {
    console.error("Error fetching meta data:", error);
    return null;
  }
}

export async function generateMetadata(): Promise<Metadata> {
  const metaData = await getPageMetaData();
  return {
    title: metaData?.meta_title || "",
    description: metaData?.meta_description || "",
    keywords: metaData?.meta_keywords || "",
    alternates: {
      canonical: metaData?.canonical_tag || "",
    },
  };
}

const toAbsoluteAssetUrl = (imageUrl: string | undefined): string => {
  if (!imageUrl) return "";
  if (imageUrl.startsWith("http://") || imageUrl.startsWith("https://")) {
    return imageUrl;
  }

  const baseUrl = process.env.NEXT_PUBLIC_BASE_API_ENDPOINT || "";
  if (!baseUrl) {
    return imageUrl;
  }

  return `${baseUrl.replace(/\/$/, "")}/${imageUrl.replace(/^\//, "")}`;
};

export default async function ClientsPage() {
  let token: string | null = null;
  let clientsFromApi: ClientsApiItem[] = [];
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || process.env.NEXT_PUBLIC_BASE_URL || "";

  if (siteUrl) {
    try {
      const proxyResponse = (await getClientsAPI(siteUrl)) as {
        success?: boolean;
        data?: unknown;
      };

      if (proxyResponse?.success && Array.isArray(proxyResponse.data)) {
        clientsFromApi = proxyResponse.data as ClientsApiItem[];
      }
    } catch (error) {
      console.error("Error fetching clients from proxy API:", error);
    }
  }

  if (clientsFromApi.length === 0) {
    try {
      const tokenResponse = (await getAuthToken()) as AuthTokenResponse;
      if (tokenResponse?.token && typeof tokenResponse.token === "string") {
        token = tokenResponse.token;
      }
    } catch (error) {
      console.error("Error fetching auth token for clients:", error);
    }
  }

  if (clientsFromApi.length === 0 && token) {
    try {
      const response = await getClients(token);
      if (Array.isArray(response)) {
        clientsFromApi = response as ClientsApiItem[];
      }
    } catch (error) {
      console.error("Error fetching clients:", error);
    }
  }

  // Fetch banner
  if (!token) {
    try {
      const tokenResponse = (await getAuthToken()) as AuthTokenResponse;
      if (tokenResponse?.token && typeof tokenResponse.token === "string") {
        token = tokenResponse.token;
      }
    } catch (error) {
      console.error("Error fetching auth token for banner:", error);
    }
  }

  let banner: BannersProps | null = null;
  if (token) {
    try {
      banner = (await getBanner(token, "Clients")) as BannersProps;
    } catch (error) {
      console.error("Error fetching banner:", error);
    }
  }

  const mappedClients =
    clientsFromApi.length > 0
      ? clientsFromApi.map((client, index) => {
          const clientName = client.client_name;
          return {
            id: String(client.id ?? client._id ?? index + 1),
            name: clientName,
            imageSrc: toAbsoluteAssetUrl(client.client_logo),
            imageAlt: clientName,
          };
        })
      : clientsPageData.clients;

  const hero = { ...clientsPageData.hero };
  if (banner) {
    hero.imageSrc = toAbsoluteAssetUrl(banner.banner_image) || hero.imageSrc;
    hero.title = banner.banner_image_caption || hero.title;
    hero.description = banner.banner_image_description || hero.description;
  }

  return (
    <ClientsPageClient
      data={{
        hero,
        clients: mappedClients as ClientItem[],
      }}
    />
  );
}
