import Image from "next/image";
import { PrecPageData } from "@/app/prec/prec-page.data";

type PrecBenefitsSectionProps = {
  content: PrecPageData["benefits"];
};

export default function PrecBenefitsSection({
  content,
}: PrecBenefitsSectionProps) {
  return (
    <section className="py-14 md:py-20 bg-[#F5F2F0]">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="text-center text-2xl md:text-[28px] font-display-semi text-black">
          {content.heading}
        </h2>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-x-10 gap-y-14">
          {content.items.map((item) => (
            <article key={item.title} className="text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center">
                <Image
                  src={item.iconSrc}
                  alt={item.iconAlt}
                  width={36}
                  height={36}
                  className="h-9 w-9 object-contain"
                />
              </div>
              <h3 className="mt-3 font-display-semi text-2xl md:text-[20px] text-black">
                {item.title}
              </h3>
              <p className="mx-auto mt-3 max-w-sm text-lg md:text-lg leading-relaxed text-black-chocolate">
                {item.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
