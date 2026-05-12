import MediaPageClient from "@/components/MediaPage/MediaPageClient";
import { mediaPageDummyData } from "./media-page.data";

// Revalidate this route every 30 minutes.
export const revalidate = 1800;

export default async function MediaPage() {
  return <MediaPageClient data={mediaPageDummyData} />;
}
