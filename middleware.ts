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
  const pathname = request.nextUrl.pathname;
  const segments = pathname.split("/").filter(Boolean);

  if (segments.length !== 1) {
    return NextResponse.next();
  }

  const categorySlug = segments[0];
  if (CATEGORY_SLUGS.has(categorySlug)) {
    const targetUrl = new URL(`/${categorySlug}/page/1`, request.url);
    return NextResponse.redirect(targetUrl, 301);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/:categorySlug"],
};
