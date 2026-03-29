import { redirect, notFound } from "next/navigation";
import { getAuthToken } from "@/api/CMS.api";
import { getPropertyCategory } from "@/api/property";
import { AuthTokenResponse, PropertyCategoryProps } from "@/interfaces";
import { KNOWN_PROPERTY_CATEGORY_SLUGS } from "@/lib/property-category-slugs";

interface ListPageProps {
  params: Promise<{
    "category-slug": string;
  }>;
}

export default async function ListPage({ params }: ListPageProps) {
  const resolvedParams = await params;
  const propertyCategoryUrlSlug = resolvedParams["category-slug"];

  let token: string | null = null;
  try {
    const tokenResponse = (await getAuthToken()) as AuthTokenResponse;
    if (tokenResponse?.token && typeof tokenResponse.token === "string") {
      token = tokenResponse.token;
    }
  } catch {
    // ignore; fall back to known slug list
  }

  if (token) {
    try {
      const raw = await getPropertyCategory(token, propertyCategoryUrlSlug);
      const category = raw as PropertyCategoryProps | null;
      if (
        category &&
        typeof category.property_category_title === "string" &&
        category.property_category_title.trim().length > 0
      ) {
        redirect(`/${propertyCategoryUrlSlug}/page/1`);
      }
    } catch {
      // invalid slug or API error — fall through to fallback / 404
    }
  }

  if (KNOWN_PROPERTY_CATEGORY_SLUGS.has(propertyCategoryUrlSlug)) {
    redirect(`/${propertyCategoryUrlSlug}/page/1`);
  }

  notFound();
}
