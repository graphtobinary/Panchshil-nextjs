"use client";

import { useEffect, useRef, useState } from "react";
import { EsgRecognitionsCarousel } from "./EsgRecognitionsCarousel";
import { EsgPageData } from "@/app/esg/esg.data";

type EsgRecognitionsCertificatesProps = {
  content: EsgPageData["recognitionsCertificates"];
};

export default function EsgRecognitionsCertificates({
  content,
}: EsgRecognitionsCertificatesProps) {
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
    <section ref={sectionRef} className="w-full bg-white py-10 md:py-20">
      <div className="mx-auto">
        <div
          className={`text-center mb-10 ${isInView ? "animate-fade-in-up" : "opacity-0"} px-4 md:px-0`}
        >
          <div className="text-lg font-medium tracking-[0.2em] text-gold-beige mb-2">
            {content.heading || "AWARDS"}
          </div>
          <h2 className="text-2xl md:text-[28px] font-display-semi text-black">
            {content.title || "RECOGNITIONS & CERTIFICATES"}
          </h2>
        </div>

        <div
          className={`${isInView ? "animate-fade-in-up-delay-1" : "opacity-0"}`}
        >
          <EsgRecognitionsCarousel slides={content.slides} />
        </div>
      </div>
    </section>
  );
}
