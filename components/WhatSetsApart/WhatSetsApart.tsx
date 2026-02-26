import { PropertyDefiningFeaturesSectionType } from "@/interfaces";
import Image from "next/image";

const WhatSetsApart = ({
  property_defining_features_section,
}: {
  property_defining_features_section: PropertyDefiningFeaturesSectionType;
}) => {
  return (
    <section className="w-full bg-[#FFFAF7] py-16 md:py-24">
      <div className="mx-auto px-6 md:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left Column - Text Content */}
          <div>
            <h2 className="text-2xl md:text-[28px] font-display-semi text-black uppercase mb-8 md:mb-12">
              {
                property_defining_features_section?.property_defining_features_caption
              }
            </h2>
            <div className="space-y-6">
              {property_defining_features_section?.property_defining_features?.map(
                (item, index) => (
                  <div
                    key={index}
                    className="flex gap-4 border-b border-[#ab9b815e] pb-4"
                  >
                    <span className="text-[#1F180D] font-regular text-sm md:text-sm shrink-0">
                      {index + 1}
                    </span>
                    <p className="text-[#1F180D] text-sm md:text-sm ">
                      {item.property_defining_feature_caption}
                    </p>
                  </div>
                )
              )}
            </div>
          </div>

          {/* Right Column - Image */}
          <div className="relative w-full h-[400px] md:h-[600px] lg:h-[700px]">
            <Image
              src={
                property_defining_features_section?.property_defining_features_thumbnail
              }
              alt={
                property_defining_features_section?.property_defining_features_caption
              }
              fill
              className="object-cover "
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatSetsApart;
