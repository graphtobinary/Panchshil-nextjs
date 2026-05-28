import { notFound } from "next/navigation";

// Revalidate this route every 30 minutes.
export const revalidate = 1800;

interface ListPageProps {
  params: Promise<{
    "category-slug": string;
  }>;
}

export default async function ListPage({ params }: ListPageProps) {
  // Middleware handles redirect from /categorySlug to /categorySlug/page/1 with 301
  // If we reach here, it's an invalid category
  notFound();
}
