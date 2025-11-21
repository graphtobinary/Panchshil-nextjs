"use client";

import { ServicesIntroProps, ServicesProps } from "@/interfaces";
import { ServicesCarousel } from "./ServicesCarousel";
import { useEffect, useRef, useState } from "react";

export function Services({
  servicesIntro,
  services,
}: {
  servicesIntro: ServicesIntroProps;
  services: ServicesProps[];
}) {
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

  return (
    <section ref={sectionRef} className="w-full bg-[#FFFAF7] py-20">
      <div className="mx-auto">
        <div
          className={`text-center mb-10 ${isInView ? "animate-fade-in-up" : "opacity-0"}`}
        >
          <div className="text-lg font-medium tracking-[0.2em] text-gold-beige mb-2">
            {servicesIntro.services_intro_heading}
          </div>
          <h2 className="text-2xl md:text-[28px] font-display-semi text-black">
            {servicesIntro.services_intro_sub_heading}
          </h2>
        </div>

        <div
          className={`${isInView ? "animate-fade-in-up-delay-1" : "opacity-0"}`}
        >
          <ServicesCarousel items={services} />
        </div>
      </div>
    </section>
  );
}
