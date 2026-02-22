"use client";

import { useEffect, useRef, useState } from "react";
import Image, { StaticImageData } from "next/image";
import { EmblaCardsCarousel } from "./EmblaCardsCarousel";

import bscAward1 from "@/assets/images/awards/award-1.png";

export type AwardsCertificateItem = {
  id: string;
  imageSrc?: string | StaticImageData;
  caption: string;
};

const fallbackAwards: AwardsCertificateItem[] = [
  {
    id: "bsc-1",
    imageSrc: bscAward1,
    caption: "British Safety Council’s International Safety Awards -2021, 2022",
  },
  {
    id: "bsc-2",
    imageSrc: bscAward1,
    caption: "British Safety Council’s International Safety Awards -2021, 2022",
  },
  {
    id: "bsc-3",
    imageSrc: bscAward1,
    caption: "British Safety Council’s International Safety Awards -2021, 2022",
  },
  {
    id: "bsc-4",
    imageSrc: bscAward1,
    caption: "British Safety Council’s International Safety Awards -2021, 2022",
  },
  {
    id: "bsc-5",
    imageSrc: bscAward1,
    caption: "British Safety Council’s International Safety Awards -2021, 2022",
  },
];

type Props = {
  title?: string;
  subTitle?: string;
  description?: string;
  items?: AwardsCertificateItem[];
};

export function AmenitiesAwardsCertificates({
  title = "AMENITIES",
  subTitle = "AWARDS & CERTIFICATES",
  description,
  items = fallbackAwards,
}: Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -100px 0px" }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const slides = items.map((item) => (
    <div key={item.id} className="w-full pb-10">
      <div className="overflow-hidden">
        <div className="relative  bg-white">
          {item.imageSrc ? (
            <Image
              src={item.imageSrc}
              alt={item.caption}
              width={479}
              height={243}
              className="h-auto w-[479px] max-w-full object-contain"
            />
          ) : (
            <div className="w-full h-full grid place-items-center text-black-chocolate/60">
              Image
            </div>
          )}
        </div>
      </div>
      <div className="mt-5 text-center text-sm md:text-base text-black-chocolate px-8 w-[479px]">
        {item.caption}
      </div>
    </div>
  ));

  return (
    <section ref={sectionRef} className="w-full py-20 bg-white">
      <div className="mx-auto">
        <div
          className={`text-center mb-12 px-4 md:px-0 ${
            isInView ? "animate-fade-in-up" : "opacity-0"
          }`}
        >
          <div className="text-lg font-medium tracking-[0.2em] text-gold-beige mb-2">
            {title}
          </div>
          <h2 className="text-2xl md:text-[28px] font-display-semi text-black">
            {subTitle}
          </h2>
          {description ? (
            <p className="mt-3 max-w-[980px] mx-auto text-sm md:text-base text-black/75 leading-relaxed">
              {description}
            </p>
          ) : null}
        </div>

        <EmblaCardsCarousel
          slides={slides}
          isInView={isInView}
          navMinSlides={3}
          slidesToScroll={1}
          containerClassName="embla-projects__container gap-6"
          slideClassName="basis-[88%] sm:basis-[62%] md:basis-[calc((100%-48px)/3)] shrink-0 grow-0 last:mr-4 md:first:ml-8"
        />
      </div>
    </section>
  );
}
