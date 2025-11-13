"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/Button";

export function WelcomeSection() {
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
      {
        threshold: 0.1,
        rootMargin: "0px 0px -100px 0px",
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  const stats = [
    { label: "55", value: "Projects" },
    { label: "23", value: "Years Of Legacy" },
    { label: "35", value: "Million sq.ft developed" },
    { label: "43", value: "Million sq.ft Under Development" },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen overflow-hidden"
    >
      {/* Top Content Area with Background Color */}
      <div className="relative bg-[#FFFAF7] pt-16 md:pt-24 pb-32 md:pb-0">
        <div className="max-w-[1200px] mx-auto px-6 text-center">
          {/* Title */}
          <h2
            className={`text-4xl md:text-5xl lg:text-6xl font-display-semi mb-6 text-black-chocolate ${
              isInView ? "animate-fade-in-up" : "opacity-0"
            }`}
          >
            WELCOME TO PANCHSHIL
          </h2>

          {/* Description */}
          <p
            className={`text-base md:text-lg  mb-12 max-w-4xl mx-auto leading-relaxed text-black-chocolate ${
              isInView ? "animate-fade-in-up-delay-1" : "opacity-0"
            }`}
          >
            Panchshil Realty is India&apos;s leading luxury real estate
            developer, known for award-winning projects that have transformed
            skylines and redefined urban living. Since 2002, we have delivered
            over 35 million sq. ft. of prime real estate, with 43 million sq.
            ft. under development, across various asset classes including
            high-end residences, IT parks, data centres, built-to-suit offices,
            SEZs, convention centres, luxury retail malls, and landmark
            hospitality projects in India, Sri Lanka, Maldives and Dubai.
          </p>

          {/* Stats Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            {stats.map((stat, index) => {
              const delayClasses = [
                "animate-fade-in-up-delay-2",
                "animate-fade-in-up-delay-3",
                "animate-fade-in-up-delay-4",
                "animate-fade-in-up-delay-5",
              ];
              return (
                <div
                  key={index}
                  className={`flex flex-col items-center ${
                    isInView
                      ? delayClasses[index] || "animate-fade-in-up-delay-5"
                      : "opacity-0"
                  }`}
                >
                  <span className="text-4xl md:text-5xl  font-display-semi text-black-chocolate mb-2">
                    {stat.label}
                  </span>
                  <span className="text-base md:text-lg font-normal text-black-chocolate">
                    {stat.value}
                  </span>
                </div>
              );
            })}
          </div>

          {/* CTA Button */}
          <Button
            variant="overlay"
            size="lg"
            className={`w-56 ${isInView ? "animate-fade-in-up-delay-5" : "opacity-0"}`}
          >
            View About Us Page
          </Button>
        </div>
      </div>

      {/* Bottom Image Section with Gradient Blend */}
      <div className="relative h-[60vh] md:h-[120vh] ">
        <div
          className={`absolute inset-0 ${
            isInView ? "animate-fade-in-delay" : "opacity-0"
          }`}
        >
          <Image
            src="/assets/images/welcome-to-panchshil.jpg"
            alt="Welcome to Panchshil"
            fill
            className="object-cover "
            priority
          />
        </div>

        {/* Gradient Overlay - blend from #FFFAF7 to transparent */}
        <div className="absolute inset-0 bg-linear-to-b from-[#FFFAF7] via-[#FFFAF7]/40 to-transparent pointer-events-none h-20"></div>
      </div>
    </section>
  );
}
