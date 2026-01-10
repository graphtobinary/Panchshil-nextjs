import { MasterSliderData } from "@/interfaces";
import { CustomCarousel } from "./CustomCarousel";

export function Hero({
  masterSliderData,
}: {
  masterSliderData: MasterSliderData[];
}) {
  return (
    <section className="relative w-full h-screen">
      <CustomCarousel slides={masterSliderData} />
    </section>
  );
}
