"use client";

import { ServicesCarousel, type ServiceCardData } from "./ServicesCarousel";
import { useEffect, useRef, useState } from "react";

export function Services() {
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
  const items: ServiceCardData[] = [
    {
      id: "facility",
      title: "Facility Management",
      image: "/assets/images/Facility-Management.jpg",
    },
    {
      id: "fitout",
      title: "Fit-Out Management",
      image: "/assets/images/Fit-Out-Management.jpg",
    },
    {
      id: "project",
      title: "Project Management",
      image: "/assets/images/Project-Management.jpg",
    },
    {
      id: "residential",
      title: "Residential Leasing & Resale",
      image: "/assets/images/Residential-Leasing.jpg",
    },
    {
      id: "development",
      title: "Development Management",
      image: "/assets/images/Development-Managment.jpg",
    },
  ];

  return (
    <section ref={sectionRef} className="w-full bg-[#FFFAF7] py-20">
      <div className="mx-auto">
        <div
          className={`text-center mb-10 ${isInView ? "animate-fade-in-up" : "opacity-0"}`}
        >
          <div className="text-lg font-medium tracking-[0.2em] text-gold-beige mb-2">
            OUR SERVICES
          </div>
          <h2 className="text-2xl md:text-[28px] font-display-semi text-black">
            EXPLORE OUR SERVICES
          </h2>
        </div>

        <div
          className={`${isInView ? "animate-fade-in-up-delay-1" : "opacity-0"}`}
        >
          <ServicesCarousel items={items} />
        </div>
      </div>
    </section>
  );
}
