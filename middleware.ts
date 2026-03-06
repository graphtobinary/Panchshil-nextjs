import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const CATEGORY_SLUGS = new Set([
  "luxury-residences",
  "office-parks",
  "hospitality",
  "data-centres",
  "retail",
]);

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const segments = pathname.split("/").filter(Boolean);

  // Match: /categorySlug/page
  if (segments.length === 2) {
    const [categorySlug, pageSegment] = segments;

    if (CATEGORY_SLUGS.has(categorySlug) && pageSegment === "page") {
      const targetUrl = new URL(`/${categorySlug}/page/1`, request.url);

      return NextResponse.redirect(targetUrl, 301);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/:categorySlug/page"],
};
