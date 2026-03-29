import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { KNOWN_PROPERTY_CATEGORY_SLUGS } from "@/lib/property-category-slugs";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const segments = pathname.split("/").filter(Boolean);

  // Match: /categorySlug/page
  if (segments.length === 2) {
    const [categorySlug, pageSegment] = segments;

    if (
      KNOWN_PROPERTY_CATEGORY_SLUGS.has(categorySlug) &&
      pageSegment === "page"
    ) {
      const targetUrl = new URL(`/${categorySlug}/page/1`, request.url);

      return NextResponse.redirect(targetUrl, 301);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/:categorySlug/page"],
};
