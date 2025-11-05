"use client";

import { useEffect, useRef, useState } from "react";
import { SignatureCarousel } from "./SignatureCarousel";

export function Signature() {
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
  const images = [
    {
      id: "raya-1",
      src: "/assets/images/raya-by-atmosphere.jpg",
      alt: "Raaya by Atmosphere",
    },
    {
      id: "raya-2",
      src: "/assets/images/raya-by-atmosphere.jpg",
      alt: "Raaya by Atmosphere",
    },
    {
      id: "raya-3",
      src: "/assets/images/raya-by-atmosphere.jpg",
      alt: "Raaya by Atmosphere",
    },
  ];

  return (
    <section ref={sectionRef} className="w-full bg-[#FFFAF7] py-10 md:py-20">
      <div className=" mx-auto">
        <div
          className={`text-center mb-10 ${isInView ? "animate-fade-in-up" : "opacity-0"}`}
        >
          <div className="text-lg font-medium tracking-[0.2em] text-gold-beige mb-2">
            MASTERPIECES
          </div>
          <h2 className="text-2xl md:text-[28px] font-display-semi text-black">
            EXPLORE OUR SIGNATURE DEVELOPMENTS
          </h2>
        </div>

        <div
          className={`${isInView ? "animate-fade-in-up-delay-1" : "opacity-0"}`}
        >
          <SignatureCarousel images={images} />
        </div>
      </div>
    </section>
  );
}
