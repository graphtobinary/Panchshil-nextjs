"use client";

import { useEffect, useRef, useState } from "react";
import { FloorPlanCarousel } from "./FloorPlanCarousel";

interface FloorPlansProps {
  title?: string;
  property_floor_plan_section?: PropertyFloorPlanSectionProps | null;
}

interface PropertyFloorPlanSectionProps {
  property_floor_plan_caption: string;
  property_floor_plans: {
    property_floor_plan_image_caption: string;
    property_floor_plan_image: string;
  }[];
}

export function FloorPlans({
  title = "FLOOR PLANS",
  property_floor_plan_section,
}: FloorPlansProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [isInView, setIsInView] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

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

  const plans = property_floor_plan_section?.property_floor_plans ?? [];
  const images = plans.map((p) => p.property_floor_plan_image).filter(Boolean);
  const captions = plans
    .map((p) => p.property_floor_plan_image_caption)
    .filter(Boolean);

  const activeIndex =
    images.length === 0 ? 0 : Math.min(selectedIndex, images.length - 1);

  if (plans.length === 0) return null;
  return (
    <section ref={sectionRef} className="w-full  py-20 bg-white">
      <div className="mx-auto ">
        {/* Title and Description */}
        <div
          className={`text-center mb-10 px-4 md:px-0 ${
            isInView ? "animate-fade-in-up" : "opacity-0"
          }`}
        >
          <div className="text-lg font-medium tracking-[0.2em] text-gold-beige mb-2">
            {title}
          </div>
          {!!property_floor_plan_section?.property_floor_plan_caption && (
            <h2 className="text-2xl md:text-[28px] font-display-semi text-black">
              {property_floor_plan_section.property_floor_plan_caption}
            </h2>
          )}
        </div>

        {/* Tabs */}
        <div
          className={`flex flex-wrap items-center justify-center gap-6 md:gap-12 mb-10 ${
            isInView ? "animate-fade-in-up-delay-1" : "opacity-0"
          }`}
        >
          {plans.map((plan, index) => {
            const isActive = index === activeIndex;
            return (
              <button
                key={`${plan.property_floor_plan_image}-${index}`}
                onClick={() => setSelectedIndex(index)}
                className={`text-[12px] md:text-[16px] font-medium tracking-wider transition-colors ${
                  isActive
                    ? "text-gold-beige border-b-3 border-gold-beige"
                    : "text-gold-beige/60 hover:text-gold-beige"
                }`}
              >
                {plan.property_floor_plan_image_caption}
              </button>
            );
          })}
        </div>

        {/* Floor Plan Image Carousel */}
        {images.length > 0 && (
          <FloorPlanCarousel
            images={images}
            captions={captions}
            title={
              property_floor_plan_section?.property_floor_plan_caption ?? title
            }
            isInView={isInView}
            selectedIndex={activeIndex}
            onIndexChange={setSelectedIndex}
          />
        )}
      </div>
    </section>
  );
}
