import MeetTheCityPageClient from "@/components/MeetTheCityPage/MeetTheCityPageClient";
import {
  MeetTheCityEdition,
  MeetTheCityPageData,
  emptyMeetTheCityEditions,
  meetTheCityPageDummyData,
} from "./meet-the-city-page.data";
import {
  getAuthToken,
  getMeetTheCityMagazines,
  getMeetTheCityMagazinesAPI,
} from "@/api/CMS.api";
import { AuthTokenResponse, MeetTheCityMagazineApiItem } from "@/interfaces";

const toAbsoluteAssetUrl = (url: string | undefined): string => {
  if (!url) return "";
  if (url.startsWith("http://") || url.startsWith("https://")) {
    return url;
  }

  const baseUrl = process.env.NEXT_PUBLIC_BASE_API_ENDPOINT || "";
  if (!baseUrl) {
    return url;
  }

  return `${baseUrl.replace(/\/$/, "")}/${url.replace(/^\//, "")}`;
};

function mapMagazinesFromApi(
  items: MeetTheCityMagazineApiItem[]
): MeetTheCityEdition[] {
  return items
    .map((row, index) => {
      const title = row.magazine_edition?.trim() ?? "";
      const imageSrc = toAbsoluteAssetUrl(row.magazine_thumbnail);
      const pdfUrl = toAbsoluteAssetUrl(row.magazine_pdf);

      return {
        id: String(index + 1),
        title,
        imageSrc,
        imageAlt: title
          ? `Meet The City ${title}`
          : "Meet The City magazine cover",
        pdfUrl: pdfUrl || undefined,
      };
    })
    .filter((edition) => edition.imageSrc.length > 0);
}

export default async function MeetTheCityPage() {
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || process.env.NEXT_PUBLIC_BASE_URL || "";

  let magazinesFromApi: MeetTheCityMagazineApiItem[] | null = null;

  if (siteUrl) {
    try {
      const raw = await getMeetTheCityMagazinesAPI(siteUrl);
      const wrapped = raw as { success?: boolean; data?: unknown };
      if (wrapped?.success && Array.isArray(wrapped.data)) {
        magazinesFromApi = wrapped.data as MeetTheCityMagazineApiItem[];
      }
    } catch (error) {
      console.error(
        "Error fetching Meet The City magazines from proxy API:",
        error
      );
    }
  }

  if (magazinesFromApi === null || magazinesFromApi.length === 0) {
    let token: string | null = null;
    try {
      const tokenResponse = (await getAuthToken()) as AuthTokenResponse;
      if (tokenResponse?.token && typeof tokenResponse.token === "string") {
        token = tokenResponse.token;
      }
    } catch (error) {
      console.error("Error fetching auth token for Meet The City:", error);
    }

    if (token) {
      try {
        const response = await getMeetTheCityMagazines(token);
        if (Array.isArray(response) && response.length > 0) {
          magazinesFromApi = response as MeetTheCityMagazineApiItem[];
        }
      } catch (error) {
        console.error("Error fetching Meet The City magazines:", error);
      }
    }
  }

  const editions =
    magazinesFromApi && magazinesFromApi.length > 0
      ? mapMagazinesFromApi(magazinesFromApi)
      : emptyMeetTheCityEditions;

  const data: MeetTheCityPageData = {
    hero: meetTheCityPageDummyData.hero,
    editions,
  };

  return <MeetTheCityPageClient data={data} />;
}
