import { ClientsPageClient } from "@/components/ClientsPage";
import { ClientItem, clientsPageData } from "./clients.data";
import { getAuthToken, getClients, getClientsAPI } from "@/api/CMS.api";
import { AuthTokenResponse, ClientsApiItem } from "@/interfaces";

// Revalidate this route every 30 minutes.
export const revalidate = 1800;

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

  return (
    <ClientsPageClient
      data={{
        hero: clientsPageData.hero,
        clients: mappedClients as ClientItem[],
      }}
    />
  );
}
