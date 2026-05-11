"use client";

import { Fragment, useState } from "react";
import Image from "next/image";
import { AboutUsMilestonesContent } from "@/app/about/about.data";
import { useIsMobile } from "@/hooks/useIsMobile";

type AboutUsMilestonesProps = {
  content: AboutUsMilestonesContent;
};

export default function AboutUsMilestones({ content }: AboutUsMilestonesProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeMilestone = content.milestones[activeIndex];
  const isMobile = useIsMobile();
  console.log("activeIndex", activeIndex);
  return (
    <section className=" py-14 md:py-20">
      <div className="max-w-[1320px] mx-auto px-6 md:px-10 lg:px-12">
        <div className="text-center mb-10 md:mb-14">
          <p className="text-[#B09E81] text-sm uppercase tracking-[0.2em] font-medium">
            {content.subtitle}
          </p>
          <h2 className="text-2xl md:text-[28px] font-display-semi text-black-chocolate uppercase mt-2">
            {content.title}
          </h2>
          <div className="w-full h-px bg-[#B09E81]/30 mt-6"></div>
        </div>

        <div className="flex flex-col lg:flex-row gap-5 lg:gap-0 items-center">
          {/* Left Column - Vertical Tabs (Years) ~10% */}

          <div className="flex flex-row md:flex-col lg:w-[15%] shrink-0 justify-start md:justify-start gap-8 md:gap-0 w-full md:w-auto md:max-h-[550px] overflow-x-auto overflow-y-hidden md:overflow-y-auto md:overflow-x-hidden no-scrollbar pt-2 md:pt-0">
            {content.milestones.map((milestone, index) => {
              const isActive = index === activeIndex;
              return (
                <div
                  className={`shrink-0 md:w-auto md:pl-10 ${
                    isActive
                      ? isMobile
                        ? "border-b-2 border-[#B09E81]"
                        : "md:border-l-2 border-l-0 border-[#B09E81] text-[#B09E81]"
                      : isMobile
                        ? "border-b-2"
                        : "md:border-l-2 border-l-0 border-black/10 text-black/40 hover:text-black/70"
                  }`}
                  key={milestone.year}
                >
                  <button
                    type="button"
                    onClick={() => setActiveIndex(index)}
                    className={`text-center md:text-left py-4 px-2 md:py-12 md:px-0 transition-colors cursor-pointer w-full text-black/40 hover:text-black/70 
                ${
                  content.milestones.length - 1 !== index && !isMobile
                    ? " border-b-2 md:border-b border-black/10"
                    : ""
                }
                  
                   `}
                  >
                    <span
                      className={`text-2xl md:text-4xl font-display-semi transition-colors ${
                        isActive ? "text-[#B09E81]" : "text-black/40"
                      }`}
                    >
                      {milestone.year}
                    </span>
                  </button>
                </div>
              );
            })}
          </div>

          {/* Right Column - Image (left) and Content (right) */}
          <div className="flex flex-1 flex-col md:flex-row gap-6 md:gap-8">
            <div className="relative w-full md:w-2/5 aspect-auto md:aspect-auto h-[400px] md:h-[500px] overflow-hidden">
              <Image
                src={activeMilestone.imageSrc}
                alt={activeMilestone.imageAlt}
                fill
                className="object-cover transition-all duration-500"
              />
            </div>

            <div className="md:w-3/5 flex items-center">
              <div>
                {activeMilestone.description.map((item, i) => {
                  return (
                    <Fragment key={i}>
                      <h3 className="text-xl md:text-xl font-display-semi text-black-chocolate my-4">
                        {item.title}
                      </h3>
                      <p className="text-black/80 text-sm md:text-base leading-relaxed">
                        {item.content}
                      </p>
                      <div className="w-full h-px bg-[#B09E81]/30 mt-6"></div>
                    </Fragment>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
