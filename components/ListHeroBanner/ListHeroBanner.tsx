import {
  PropertyCategoryMilestonesProps,
  PropertyCategoryProps,
} from "@/interfaces";
import Image from "next/image";

const ListHeroBanner = ({
  propertyCategory,
}: {
  propertyCategory: PropertyCategoryProps;
}) => {
  return (
    <div className="relative w-full h-[calc(100vh-170px)] md:h-[calc(100vh-89px)] overflow-hidden bg-black-chocolate">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={propertyCategory?.banner_image}
          alt={propertyCategory.banner_image_caption}
          fill
          className="object-cover md:object-fill"
          priority
        />
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-linear-to-b from-white/60 via-black/40 to-black/80 "></div>

      {/* Content Overlay */}
      <div className="relative z-10 h-full flex flex-col justify-end items-center max-w-[1200px] mx-auto px-6 md:px-12 py-10 md:py-16">
        {/* Title */}
        <h3
          className={`text-3xl  md:text-6xl  font-display-semi text-white mb-3 md:mb-6 max-w-3xl 
               animate-fade-in-up
              `}
        >
          {propertyCategory?.property_category_title}
        </h3>

        {/* Description */}
        <p
          className={`text-xs md:text-md text-center text-white/95 mb-8 max-w-3xl md:leading-relaxed 
                 animate-fade-in-up-delay-1
              `}
        >
          {propertyCategory.banner_image_description}
        </p>
        <div className={`animate-fade-in-up-delay-2`}>
          {propertyCategory?.property_category_milestones &&
            propertyCategory?.property_category_milestones.length > 0 && (
              <div className="flex flex-col md:flex-row md:flex-wrap gap-3 md:gap-8 text-white justify-center">
                {propertyCategory?.property_category_milestones.map(
                  (stat: PropertyCategoryMilestonesProps, index: number) => (
                    <div
                      key={index}
                      className="flex items-center md:gap-2 flex-col border-b border-b-[rgba(255,255,255,0.5)] md:border-none pb-3 md:pb-0"
                    >
                      <span className="text-3xl md:text-4xl font-display-semi">
                        {stat.milestone_count}
                      </span>
                      <span className="text-base md:text-lg font-display-semi">
                        {stat.milestone_title}
                      </span>
                    </div>
                  )
                )}
              </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default ListHeroBanner;
