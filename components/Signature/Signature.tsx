"use client";

import { useEffect, useRef, useState } from "react";
import { SignatureCarousel } from "./SignatureCarousel";
import {
  FeaturedPropertiesIntroProps,
  // FeaturedPropertiesProps,
} from "@/interfaces";

export function Signature({
  featuredPropertiesIntro,
  // featuredProperties,
}: {
  featuredPropertiesIntro: FeaturedPropertiesIntroProps;
  // featuredProperties: FeaturedPropertiesProps;
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
  const images = [
    {
      id: "raya-1",
      src: "/assets/images/42-EAST-Banner.jpg",
      mobile_src: "/assets/images/42east-dubai-project.png",
      alt: "Raaya by Atmosphere",
      title: "42 East Residences",
      features: [
        {
          icon: "/assets/images/landscape-icon.png",
          iconAlt: "Lush green landscape",
          text: "An exclusive collection of only 42 residences",
        },
        {
          icon: "/assets/images/living-room-icon.png",
          iconAlt: "living room",
          text: "Boutique island living just minutes from the beach",
        },
        {
          icon: "/assets/images/stars-icon.png",
          iconAlt: "stars icon",
          text: "Spacious sunlit living areas with serene views of Dubai",
        },
        {
          icon: "/assets/images/facial-massage-icon.png",
          iconAlt: "facial massage icon",
          text: "Amenity floor featuring infinity-edge pool, spa area, yoga deck, fitness centre, clubhouse and much more",
        },
      ],
      ctaText: "Discover",
    },
    {
      id: "raya-2",
      src: "/assets/images/Raaya-banner.jpg",
      mobile_src: "/assets/images/raaya-wide.webp",
      alt: "Raaya by Atmosphere",
      title: "RAAYA BY ATMOSPHERE",
      features: [
        {
          icon: "/assets/images/landscape-icon.png",
          iconAlt: "Lush green landscape",
          text: "A luxury island retreat with 167 beach and over-water villas in the Raa Atoll",
        },
        {
          icon: "/assets/images/living-room-icon.png",
          iconAlt: "living room",
          text: "88% of the island preserved in greenery",
        },
        {
          icon: "/assets/images/stars-icon.png",
          iconAlt: "stars icon",
          text: "Over 12 adventure and leisure experiences",
        },
        {
          icon: "/assets/images/facial-massage-icon.png",
          iconAlt: "facial massage icon",
          text: "Seven signature restaurants offering global flavours",
        },
      ],
      ctaText: "Discover",
    },
    {
      id: "raya-3",
      src: "/assets/images/Omnia-banner.jpg",
      mobile_src: "/assets/images/omnia-thumbnil.png",
      alt: "Omnia",
      title: "Omnia",
      features: [
        {
          icon: "/assets/images/landscape-icon.png",
          iconAlt: "Lush green landscape",
          text: "Only 12 residences with one apartment per level ",
        },
        {
          icon: "/assets/images/living-room-icon.png",
          iconAlt: "living room",
          text: "Built on freehold land in Bandra West",
        },
        {
          icon: "/assets/images/stars-icon.png",
          iconAlt: "stars icon",
          text: "Spacious decks providing serene views of Almeida Park",
        },
        {
          icon: "/assets/images/facial-massage-icon.png",
          iconAlt: "facial massage icon",
          text: "An array of amenities including a rooftop swimming pool, party lounge, fitness centre and yoga room",
        },
      ],
      ctaText: "Discover",
    },
  ];

  return (
    <section ref={sectionRef} className="w-full bg-[#FFFAF7] py-10 md:py-20">
      <div className=" mx-auto">
        <div
          className={`text-center mb-10 ${isInView ? "animate-fade-in-up" : "opacity-0"}`}
        >
          <div className="text-lg font-medium tracking-[0.2em] text-gold-beige mb-2">
            {featuredPropertiesIntro?.featured_properties_intro_heading}
          </div>
          <h2 className="text-2xl md:text-[28px] font-display-semi text-black">
            {featuredPropertiesIntro?.featured_properties_intro_sub_heading}
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
