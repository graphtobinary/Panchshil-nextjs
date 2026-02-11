"use client";

import { useEffect, useRef, useState } from "react";
import Image, { type StaticImageData } from "next/image";
import { EmblaCardsCarousel } from "./EmblaCardsCarousel";

import bmcLogo from "@/assets/images/tenants/bmc-logo.png";
import deutscheBankLogo from "@/assets/images/tenants/deutsche-bank-logo.png";
import hsbcLogo from "@/assets/images/tenants/hsbc-logo.png";
import marshMcLennanLogo from "@/assets/images/tenants/marshmaclennan.png";
import mastercardLogo from "@/assets/images/tenants/mastercard.png";

export type KeyTenantItem = {
  id: string;
  name: string;
  logoSrc?: string | StaticImageData;
};

const fallbackKeyTenants: KeyTenantItem[] = [
  { id: "bmc", name: "BMC", logoSrc: bmcLogo },
  {
    id: "deutsche-bank",
    name: "Deutsche Bank",
    logoSrc: deutscheBankLogo,
  },
  { id: "hsbc", name: "HSBC", logoSrc: hsbcLogo },
  {
    id: "marsh-mclennan",
    name: "Marsh McLennan",
    logoSrc: marshMcLennanLogo,
  },
  {
    id: "mastercard",
    name: "Mastercard",
    logoSrc: mastercardLogo,
  },
  { id: "bmc1", name: "BMC", logoSrc: bmcLogo },
  {
    id: "deutsche-bank1",
    name: "Deutsche Bank",
    logoSrc: deutscheBankLogo,
  },
];

type Props = {
  title?: string;
  items?: KeyTenantItem[];
};

export function AmenitiesKeyTenants({
  title = "AMENITIES",
  items = fallbackKeyTenants,
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
    <div
      key={item.id}
      className="w-full flex items-center justify-center pb-10"
    >
      {item.logoSrc ? (
        <Image
          src={item.logoSrc}
          alt={item.name}
          width={310}
          height={146}
          className="h-auto w-[310px] max-w-full object-contain"
        />
      ) : (
        <div className="text-black-chocolate font-display-semi text-lg">
          {item.name}
        </div>
      )}
    </div>
  ));

  return (
    <section ref={sectionRef} className="w-full py-10 md:py-20">
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
            KEY TENANTS
          </h2>
        </div>

        <EmblaCardsCarousel
          slides={slides}
          isInView={isInView}
          navMinSlides={5}
          slidesToScroll={1}
          containerClassName="embla-projects__container gap-6"
          slideClassName="basis-[78%] sm:basis-[44%] md:basis-[calc((100%-96px)/5)] shrink-0 grow-0 first:ml-4 last:mr-4 md:first:ml-8"
        />
      </div>
    </section>
  );
}
