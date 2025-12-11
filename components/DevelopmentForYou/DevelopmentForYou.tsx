"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useThemeStore } from "@/store/themeStore";

const dummyProperties = [
  {
    id: "raaya-by-atmosphere",
    title: "Maldives",
    location: "Kudakurathu, Maldives",
    image:
      "https://www.panchshil.com/asset/images/properties/raaya-by-atmosphere-555633484.webp",
    link: "https://www.panchshil.com/hospitality/raaya-by-atmosphere",
  },
  {
    id: "pottuvil,-a-ritz-carlton-reserve",
    title: "Sri Lanka",
    location: "Pottuvil, Sri Lanka",
    image:
      "https://www.panchshil.com/asset/images/properties/the-ritz-carlton-reserve-22205866.webp",
    link: "",
  },
  {
    id: "42-east-residences",
    title: "United Arab Emirates",
    location: "Dubai Islands",
    image:
      "https://www.panchshil.com/asset/images/properties/42-east-residences-314781686.webp",
    link: "https://www.panchshil.com/luxury-residences/42-east-residences",
  },
];

const DevelopmentForYou = () => {
  const { theme } = useThemeStore();
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
    <section
      ref={sectionRef}
      className={`w-full py-20 transition-colors ${
        theme === "day" ? "bg-[#FFFAF7]" : "bg-gray-600"
      }`}
    >
      <div className="mx-auto ">
        {/* Title and Description */}
        <div
          className={`text-center mb-10 ${
            isInView ? "animate-fade-in-up" : "opacity-0"
          }`}
        >
          <div
            className={`text-lg uppercase font-medium tracking-[0.2em] text-gold-beige mb-2 
            ${theme === "day" ? "text-gold-beige" : "text-white"}
            `}
          >
            Development For You
          </div>
          <h2
            className={`text-2xl uppercase md:text-[28px] font-display-semi transition-colors ${
              theme === "day" ? "text-black" : "text-white"
            }`}
          >
            Representing Exceptional, Scale or delivery excellence
          </h2>
        </div>

        <div className="flex gap-4 md:flex-row flex-col justify-center">
          {dummyProperties.map((item, i) => (
            <div
              key={item.id + i}
              className={
                "basis-[80%] md:basis-[28.571%] shrink-0 grow-0 relative h-[300px] md:h-[420px] overflow-hidden"
              }
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-fill"
                sizes="(min-width: 1024px) 28vw, 80vw"
              />

              {/* bottom gradient */}
              <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 via-black/50 to-transparent"></div>

              {/* text overlay */}
              <div className="absolute left-0 right-0 bottom-0 p-5 text-white">
                <div className="mt-1 text-[15px] md:text-[16px] font-display-semi ">
                  {item.title}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DevelopmentForYou;
