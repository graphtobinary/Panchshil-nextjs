import TestimonialsPageClient from "@/components/TestimonialsPage/TestimonialsPageClient";
import {
  TestimonialListItem,
  testimonialsPageDummyData,
} from "./testimonials-page.data";
import {
  getAuthToken,
  getTestimonials,
  getTestimonialsAPI,
} from "@/api/CMS.api";
import { AuthTokenResponse, TestimonialsApiItem } from "@/interfaces";

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

function splitQuoteAndDetails(content: string): {
  quote: string;
  details: string;
} {
  const bangSpace = content.indexOf("! ");
  if (bangSpace > 80 && bangSpace < content.length - 2) {
    return {
      quote: content.slice(0, bangSpace + 1),
      details: content.slice(bangSpace + 2).trim(),
    };
  }
  return { quote: content, details: "" };
}

function mapApiItemToListItem(
  item: TestimonialsApiItem,
  index: number
): TestimonialListItem {
  const content = item.testimonial_content ?? "";
  const { quote, details } = splitQuoteAndDetails(content);
  const author = item.testimonial_name ?? "";

  return {
    id: String(item.id ?? item._id ?? index + 1),
    category: "residential",
    quote,
    details,
    author,
    role: item.testimonial_designation ?? "",
    avatarSrc: toAbsoluteAssetUrl(item.testimonial_thumbnail),
    avatarAlt: author || "Testimonial profile",
  };
}

export default async function TestimonialsPage() {
  let testimonialsFromApi: TestimonialsApiItem[] = [];
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || process.env.NEXT_PUBLIC_BASE_URL || "";

  if (siteUrl) {
    try {
      const proxyResponse = (await getTestimonialsAPI(siteUrl)) as {
        success?: boolean;
        data?: unknown;
      };

      if (proxyResponse?.success && Array.isArray(proxyResponse.data)) {
        testimonialsFromApi = proxyResponse.data as TestimonialsApiItem[];
      }
    } catch (error) {
      console.error("Error fetching testimonials from proxy API:", error);
    }
  }

  if (testimonialsFromApi.length === 0) {
    let token: string | null = null;
    try {
      const tokenResponse = (await getAuthToken()) as AuthTokenResponse;
      if (tokenResponse?.token && typeof tokenResponse.token === "string") {
        token = tokenResponse.token;
      }
    } catch (error) {
      console.error("Error fetching auth token for testimonials:", error);
    }

    if (token) {
      try {
        const response = await getTestimonials(token);
        if (Array.isArray(response)) {
          testimonialsFromApi = response as TestimonialsApiItem[];
        }
      } catch (error) {
        console.error("Error fetching testimonials:", error);
      }
    }
  }

  const mappedTestimonials = testimonialsFromApi.map(mapApiItemToListItem);

  return (
    <TestimonialsPageClient
      data={{
        hero: testimonialsPageDummyData.hero,
        testimonials: mappedTestimonials,
      }}
    />
  );
}
