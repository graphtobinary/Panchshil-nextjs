import {
  PropertyAreaDetailsProps,
  PropertyDetailsInformationType,
} from "@/interfaces";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const PropertyAreaDetails = ({
  property_introduction_caption,
  property_introduction_description,
  property_details_informations,
}: PropertyAreaDetailsProps) => {
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

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
  return (
    <section ref={sectionRef} className="relative w-full  overflow-hidden">
      {/* Top Content Area with Background Color */}
      <div className="relative bg-white pt-16 md:pt-24 py-10">
        <div className="max-w-[1200px] mx-auto px-6 text-center">
          {/* Title */}
          <div className="md:w-3/5 w-full mx-auto">
            <h2
              className={`text-2xl md:text-[28px] font-display-semi mb-6 text-black-chocolate ${
                isInView ? "animate-fade-in-up" : "opacity-0"
              }`}
            >
              {property_introduction_caption}
            </h2>
          </div>

          {/* Description */}
          <p
            className={`text-base md:text-lg  mb-12 max-w-4xl mx-auto leading-relaxed text-black-chocolate ${
              isInView ? "animate-fade-in-up-delay-1" : "opacity-0"
            }`}
          >
            {property_introduction_description}
          </p>

          {/* Stats Row */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-8 mb-12 md:w-3/5 w-full mx-auto ">
            {property_details_informations?.map(
              (stat: PropertyDetailsInformationType) => {
                return (
                  <div
                    className="flex items-center justify-center gap-3"
                    key={stat?.property_details_information_title}
                  >
                    <div className="mt-0.5 shrink-0 transition-colors text-[#030303]">
                      <div className="flex flex-col justify-center items-center gap-2">
                        <Image
                          src={stat?.property_details_information_icon}
                          alt={stat?.property_details_information_title}
                          width={30}
                          height={30}
                        />
                        <div className="flex flex-col">
                          <p className="text-sm md:text-md transition-colors text-[#030303]">
                            {stat?.property_details_information_title}
                          </p>
                          <p className="text-xs md:text-md transition-colors text-[#030303]">
                            {stat?.property_details_information_caption}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PropertyAreaDetails;
