"use client";

import Link from "next/link";
import { PropertyInfoData } from "@/interfaces";

interface PropertyInfoProps {
  propertyInfo?: PropertyInfoData;
}

export function PropertyInfo({ propertyInfo }: PropertyInfoProps) {
  // Sample data - can be replaced with props from CMS
  const defaultPropertyInfo: PropertyInfoData = {
    location: "Kalyani Nagar, Pune",
    configuration: "5.5Bhk Residences",
    status: "Ready-To-Move In Property",
    price: "Starting From 15.14 Crore",
    brochureUrl: "#",
    contactUrl: "#",
  };

  const info = propertyInfo || defaultPropertyInfo;

  return (
    <section className="w-full bg-[#FFFAF7] py-4 md:py-5 shadow-lg">
      <div className="max-w-[1400px] mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 lg:gap-6">
          {/* Left side - Property Information */}
          <div className="flex flex-wrap items-center gap-x-4 md:gap-x-6 gap-y-2 flex-1">
            {/* Location */}
            <span className="text-black-chocolate text-sm md:text-base font-normal">
              {info.location}
            </span>

            {/* Separator */}
            <span className="hidden sm:inline-block w-px h-4 bg-gray-300"></span>

            {/* Configuration */}
            <span className="text-black-chocolate text-sm md:text-base font-normal">
              {info.configuration}
            </span>

            {/* Separator */}
            <span className="hidden sm:inline-block w-px h-4 bg-gray-300"></span>

            {/* Status */}
            <span className="text-black-chocolate text-sm md:text-base font-normal">
              {info.status}
            </span>

            {/* Separator */}
            <span className="hidden sm:inline-block w-px h-4 bg-gray-300"></span>

            {/* Price */}
            <span className="text-black-chocolate text-sm md:text-base font-normal">
              {info.price}
            </span>
          </div>

          {/* Right side - Action Buttons */}
          <div className="flex items-center gap-3 w-full lg:w-auto">
            <Link
              href={info.brochureUrl}
              className="flex-1 lg:flex-none bg-[#35393B] hover:bg-black text-white px-4 md:px-6 py-2.5 md:py-3 text-sm md:text-base font-medium transition-colors duration-200 whitespace-nowrap text-center"
            >
              Download Brochure
            </Link>
            <Link
              href={info.contactUrl}
              className="flex-1 lg:flex-none bg-[#35393B] hover:bg-black text-white px-4 md:px-6 py-2.5 md:py-3 text-sm md:text-base font-medium transition-colors duration-200 whitespace-nowrap text-center"
            >
              Get In Touch
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
