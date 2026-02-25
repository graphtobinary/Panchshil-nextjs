import Image from "next/image";
import { CareerVisibleImpactContent } from "@/app/careers/career-page.data";

type CareerVisibleImpactProps = {
  content: CareerVisibleImpactContent;
};

export default function CareerVisibleImpact({
  content,
}: CareerVisibleImpactProps) {
  return (
    <section className="bg-white py-14 md:py-20">
      <div className="max-w-[1320px] mx-auto px-6 md:px-10 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        <div>
          <h2 className="text-black-chocolate text-2xl md:text-4xl uppercase tracking-tight font-display-semi leading-tight">
            {content.title}
          </h2>

          <p className="mt-5 text-sm md:text-base text-black/80 leading-relaxed max-w-[640px]">
            {content.description}
          </p>

          <div className="mt-7">
            {content.points.map((point) => (
              <p
                key={point}
                className="text-black/85 text-sm md:text-base py-4 border-b border-black/10"
              >
                {point}
              </p>
            ))}
          </div>
        </div>

        <div className="relative w-full aspect-16/10 overflow-hidden">
          <Image
            src={content.imageSrc}
            alt={content.imageAlt}
            fill
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
