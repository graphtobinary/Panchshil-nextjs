"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { EmblaCardsCarousel } from "@/components/Amenities/EmblaCardsCarousel";
import type { PropertyKeyTenant } from "@/interfaces";

type Props = {
  title?: string;
  subtitle?: string;
  property_key_tenants?: PropertyKeyTenant[] | null;
  isAboutPage?: boolean;
};

export default function AboutUsClients({
  title = "",
  subtitle = "",
  property_key_tenants,
  isAboutPage = false,
}: Props) {
  const items = property_key_tenants ?? [];

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

  if (items.length === 0) return null;

  const aboutFourUpBasis =
    "min-w-0 basis-[78%] sm:basis-[calc((100%-4.5rem)/4)]";
  const defaultBasis =
    "min-w-0 basis-[78%] sm:basis-[44%] md:basis-[calc((100%-6rem)/5)]";

  const slides = items.map((item, index) => (
    <div
      key={`${item.property_key_tenant_caption}-${index}`}
      className="flex items-center justify-center bg-[#F7F5F4] rounded-full aspect-square w-64 h-64 p-4 sm:p-5"
    >
      {item.property_key_tenant_image ? (
        <Image
          src={item.property_key_tenant_image}
          alt={item.property_key_tenant_caption}
          width={220}
          height={220}
          className="h-auto w-full max-w-[85%] object-contain"
        />
      ) : (
        <div className="text-black-chocolate font-display-semi text-lg">
          {item.property_key_tenant_caption}
        </div>
      )}
    </div>
  ));

  if (items?.length === 0) return null;
  return (
    <section ref={sectionRef} className="w-full py-10 md:py-20 bg-white">
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
            {subtitle}
          </h2>
        </div>

        <EmblaCardsCarousel
          slides={slides}
          isInView={isInView}
          navMinSlides={isAboutPage ? 4 : 5}
          slidesToScroll={1}
          containerClassName="embla-projects__container gap-6"
          slideClassName={`${
            isAboutPage ? aboutFourUpBasis : defaultBasis
          } shrink-0 grow-0 first:ml-4 last:mr-4 md:first:ml-8`}
        />
      </div>
    </section>
  );
}
