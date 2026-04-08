import { AwardsPageClient } from "@/components/AwardsPage";
import { awardsPageData } from "./awards.data";
import { getAuthToken, getAwards, getAwardsAPI } from "@/api/CMS.api";
import { AuthTokenResponse, AwardsApiItem } from "@/interfaces";

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

export default async function AwardsPage() {
  let token: string | null = null;
  let awardsFromApi: AwardsApiItem[] = [];
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || process.env.NEXT_PUBLIC_BASE_URL || "";

  if (siteUrl) {
    try {
      const proxyResponse = (await getAwardsAPI(siteUrl)) as {
        success?: boolean;
        data?: unknown;
      };

      if (proxyResponse?.success && Array.isArray(proxyResponse.data)) {
        awardsFromApi = proxyResponse.data as AwardsApiItem[];
      }
    } catch (error) {
      console.error("Error fetching awards from proxy API:", error);
    }
  }

  if (awardsFromApi.length === 0) {
    try {
      const tokenResponse = (await getAuthToken()) as AuthTokenResponse;
      if (tokenResponse?.token && typeof tokenResponse.token === "string") {
        token = tokenResponse.token;
      }
    } catch (error) {
      console.error("Error fetching auth token for awards:", error);
    }
  }

  if (awardsFromApi.length === 0 && token) {
    try {
      const response = await getAwards(token);
      if (Array.isArray(response)) {
        awardsFromApi = response as AwardsApiItem[];
      }
    } catch (error) {
      console.error("Error fetching awards:", error);
    }
  }

  const mappedAwards =
    awardsFromApi.length > 0
      ? awardsFromApi.map((award, index) => ({
          id: String(award.id ?? award._id ?? index + 1),
          title: award.title || award.name || award.award_name || "Award",
          description: award.description || award.award_description || "",
          imageSrc: toAbsoluteAssetUrl(
            award.image ||
              award.image_url ||
              award.image_path ||
              award.award_image
          ),
          imageAlt:
            award.title || award.name || award.award_name || "Award image",
        }))
      : awardsPageData.awards;

  return (
    <AwardsPageClient
      data={{
        hero: awardsPageData.hero,
        awards: mappedAwards,
      }}
    />
  );
}
