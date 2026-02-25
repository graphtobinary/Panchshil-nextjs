"use client";

import { CareerHowWeWorkContent } from "@/app/careers/career-page.data";
import Image from "next/image";

type CareerHowWeWorkProps = {
  content: CareerHowWeWorkContent;
};

export default function CareerHowWeWork({ content }: CareerHowWeWorkProps) {
  return (
    <section className="bg-white py-16 md:py-24">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="max-w-[940px] mx-auto text-center mb-20">
          <h2 className="text-2xl md:text-[28px] font-display-semi text-black-chocolate">
            {content.title}
          </h2>
          <p className="mt-3 text-sm md:text-lg text-black/80 leading-relaxed">
            {content.description}
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-x-12 gap-y-10">
          {content.items.map((item, index) => (
            <article
              key={`${item.title}-${index}`}
              className={`${
                content.items.length === 5 && index === 3
                  ? "md:col-start-1"
                  : content.items.length === 5 && index === 4
                    ? "md:col-start-2"
                    : ""
              } text-center`}
            >
              <Image
                src={item.iconSrc}
                alt={item.title}
                width={34}
                height={34}
                className="mx-auto opacity-75"
              />
              <h3 className="mt-2 text-xl md:text-base font-display-semi text-black-chocolate">
                {item.title}
              </h3>
              <p className="mt-2 text-sm md:text-base text-black/80 leading-relaxed max-w-[360px] mx-auto">
                {item.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
