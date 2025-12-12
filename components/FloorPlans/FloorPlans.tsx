"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { floorPlansData } from "./floorPlansData";

interface FloorPlansProps {
  title?: string;
}

export function FloorPlans({ title = "FLOOR PLANS" }: FloorPlansProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [isInView, setIsInView] = useState(false);
  const [selectedTab, setSelectedTab] = useState<string>(
    floorPlansData[0]?.id || ""
  );

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

  const selectedFloorPlan = floorPlansData.find(
    (plan) => plan.id === selectedTab
  );

  return (
    <section ref={sectionRef} className="w-full  py-20">
      <div className="mx-auto ">
        {/* Title and Description */}
        <div
          className={`text-center mb-10 ${
            isInView ? "animate-fade-in-up" : "opacity-0"
          }`}
        >
          <div className="text-lg font-medium tracking-[0.2em] text-gold-beige mb-2">
            {title}
          </div>
          <h2 className="text-2xl md:text-[28px] font-display-semi text-black">
            SPACIOUS LAYOUTS DESIGNED FOR <br />
            COMFORT AND PRIVACY
          </h2>
        </div>

        {/* Tabs */}
        <div
          className={`flex flex-wrap items-center justify-center gap-6 md:gap-12 mb-10 ${
            isInView ? "animate-fade-in-up-delay-1" : "opacity-0"
          }`}
        >
          {floorPlansData.map((plan) => {
            const isActive = plan.id === selectedTab;
            return (
              <button
                key={plan.id}
                onClick={() => setSelectedTab(plan.id)}
                className={`text-[12px] md:text-[16px] font-medium tracking-wider transition-colors ${
                  isActive
                    ? "text-gold-beige border-b-3 border-gold-beige"
                    : "text-gold-beige/60 hover:text-gold-beige"
                }`}
              >
                {plan.title}
              </button>
            );
          })}
        </div>

        {/* Floor Plan Image */}
        {selectedFloorPlan && (
          <div
            className={`relative w-full ${
              isInView ? "animate-fade-in-up-delay-2" : "opacity-0"
            }`}
          >
            <div className="relative w-full aspect-[5/3] rounded-sm overflow-hidden">
              <Image
                src={selectedFloorPlan.image}
                alt={selectedFloorPlan.title}
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
