import { CareerSearchPageClient } from "@/components/CareerSearchPage";
import { careerSearchPageData } from "./career-search-page.data";

export default function CareerSearchPage() {
  return <CareerSearchPageClient data={careerSearchPageData} />;
}
