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
  getBanner,
  getMetaData,
} from "@/api/CMS.api";
import {
  AuthTokenResponse,
  MeetTheCityMagazineApiItem,
  BannersProps,
  MetaDataProps,
} from "@/interfaces";
// Revalidate this route every 30 minutes.
export const revalidate = 1800;

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

  let token: string | null = null;
  if (magazinesFromApi === null || magazinesFromApi.length === 0) {
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
      banner = (await getBanner(token, "Meet The City")) as BannersProps;
    } catch (error) {
      console.error("Error fetching banner:", error);
    }
  }

  let metaData: MetaDataProps | null = null;
  if (token) {
    try {
      metaData = (await getMetaData(token, "Meet The City")) as MetaDataProps;
    } catch (error) {
      console.error("Error fetching meta data:", error);
    }
  }

  const editions =
    magazinesFromApi && magazinesFromApi.length > 0
      ? mapMagazinesFromApi(magazinesFromApi)
      : emptyMeetTheCityEditions;

  const hero = { ...meetTheCityPageDummyData.hero };
  if (banner) {
    hero.imageSrc = toAbsoluteAssetUrl(banner.banner_image) || hero.imageSrc;
    hero.title = banner.banner_image_caption || hero.title;
    hero.description = banner.banner_image_description || hero.description;
  }

  const data: MeetTheCityPageData = {
    hero,
    editions,
    metaData: metaData || {},
  };

  return <MeetTheCityPageClient data={data} />;
}
