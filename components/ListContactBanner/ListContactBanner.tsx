import Image from "next/image";
import Link from "next/link";
import { Button } from "../Button";
import { ListContactBannerProps } from "@/interfaces";

const ListContactBanner = ({
  propertyFooterBlocks,
}: ListContactBannerProps) => {
  return (
    <div className="relative w-full h-[70vh] md:h-[80vh] overflow-hidden bg-black-chocolate">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={propertyFooterBlocks?.footer_block_image}
          alt={propertyFooterBlocks?.footer_block_title}
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
          className={`text-3xl  md:text-3xl  font-display-semi text-center text-white mb-6 max-w-3xl 
               animate-fade-in-up
              `}
        >
          {propertyFooterBlocks?.footer_block_title}
        </h3>

        {/* Description */}
        <p
          className={`text-xs md:text-md text-center text-white/95 mb-8 max-w-3xl md:leading-relaxed 
                 animate-fade-in-up-delay-1
              `}
        >
          {propertyFooterBlocks?.footer_block_description}
        </p>
        {/* CTA Button */}
        <div className="flex justify-center pt-5">
          <Link href={propertyFooterBlocks?.footer_block_cta_value || "#"}>
            <Button variant="hero" size="sm" className="w-48">
              {propertyFooterBlocks?.footer_block_cta_label}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ListContactBanner;
