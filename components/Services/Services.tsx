"use client";

import { ServicesCarousel, type ServiceCardData } from "./ServicesCarousel";

export function Services() {
  const items: ServiceCardData[] = [
    {
      id: "facility",
      title: "FACILITY MANAGMENT",
      image: "/assets/images/facility-managment.jpg",
    },
    {
      id: "fitout",
      title: "FIT-OUT MANAGMENT",
      image: "/assets/images/fit-out-managment.jpg",
    },
    {
      id: "project",
      title: "PROJECT MANAGMENT",
      image: "/assets/images/project-managment.jpg",
    },
    {
      id: "residential",
      title: "RESIDENTAL",
      image: "/assets/images/residental.jpg",
    },
  ];

  return (
    <section className="w-full bg-[#FFFAF7] py-20">
      <div className="mx-auto">
        <div className="text-center mb-10">
          <div className="text-lg font-medium tracking-[0.2em] text-gold-beige mb-2">
            OUR SERVICES
          </div>
          <h2 className="text-2xl md:text-[28px] font-display-semi text-black">
            EXPLORE OUR SERVICES
          </h2>
        </div>

        <ServicesCarousel items={items} />
      </div>
    </section>
  );
}
