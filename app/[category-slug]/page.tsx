import { redirect } from "next/navigation";

interface ListPageProps {
  params: {
    "category-slug": string;
  };
}

export default async function ListPage({ params }: ListPageProps) {
  const resolvedParams = await params;
  const propertyCategoryUrlSlug = resolvedParams["category-slug"];

  // Redirect to page 1
  redirect(`/${propertyCategoryUrlSlug}/1`);
}
