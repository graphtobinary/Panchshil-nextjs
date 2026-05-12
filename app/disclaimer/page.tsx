import { DisclaimerPageClient } from "@/components/DisclaimerPage";
import { disclaimerPageData } from "./disclaimer-page.data";
import { getAuthToken, getBanner, getMetaData } from "@/api/CMS.api";
import { AuthTokenResponse, BannersProps, MetaDataProps } from "@/interfaces";
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

export default async function DisclaimerPage() {
  let banner: BannersProps | null = null;
  let token: string | null = null;
  try {
    const tokenResponse = (await getAuthToken()) as AuthTokenResponse;
    if (tokenResponse?.token && typeof tokenResponse.token === "string") {
      token = tokenResponse.token;
    }
  } catch (error) {
    console.error("Error fetching auth token:", error);
  }

  if (token) {
    try {
      banner = (await getBanner(token, "Disclaimer")) as BannersProps;
    } catch (error) {
      console.error("Error fetching banner:", error);
    }
  }

  let metaData: MetaDataProps | null = null;
  if (token) {
    try {
      metaData = (await getMetaData(token, "Disclaimer")) as MetaDataProps;
    } catch (error) {
      console.error("Error fetching meta data:", error);
    }
  }

  const data = { ...disclaimerPageData, metaData: metaData || {} };
  if (banner) {
    data.hero = {
      ...data.hero,
      imageSrc: toAbsoluteAssetUrl(banner.banner_image) || data.hero.imageSrc,
      title: banner.banner_image_caption || data.hero.title,
      description: banner.banner_image_description || data.hero.description,
    };
  }

  return <DisclaimerPageClient data={data} />;
}
