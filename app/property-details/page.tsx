"use client";

import { Button } from "@/components/Button";
import { FloorPlans } from "@/components/FloorPlans";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import PropertyAreaDetails from "@/components/PropertyAreaDetails";
import PropertyDetailsHero from "@/components/PropertyDetailsHero";
import { InteriorExteriorCarousel } from "@/components/InteriorExteriorCarousel/InteriorExteriorCarousel";
import Link from "next/link";
import PropertyPanoramicView from "@/components/PropertyPanoramicView/PropertyPanoramicView";
import WhatSetsApart from "@/components/WhatSetsApart/WhatSetsApart";
import { Amenities } from "@/components/Amenities";
import { LocationMap } from "@/components/LocationMap";
import { Testimonials } from "@/components/Testimonials";
import { Disclaimer } from "@/components/Disclaimer";
import { PropertyInfo } from "@/components/PropertyInfo";

const heroBannerData = {
  master_slider_title: "Omnia Residences",
  master_slider_description:
    "An unmatched living experience in of Mumbai's most sought-after neighbourhoods in Bandra West, comprising of 12 exclusive residences overlooking the prestigious Almeida Park.",
  master_slider_link: "https://www.panchshil.com/omnia",
  master_slider_image: null,
  master_slider_video:
    "https://www.panchshil.com/asset/videos/master-slider/omnia-your-sanctuary-of-serenity-269331917.mp4",
  master_slider_button_caption: "Discover",
};

const staticPropertyData = [
  {
    property_name: "Omnia Residences",
    property_thumbnail:
      "https://www.panchshil.com/asset/images/properties/omnia-residences-399070081.webp",
    property_location: "Almeida Park, Bandra West, Mumbai",
    property_link:
      "https://www.panchshil.com/luxury-residences/omnia-residences",
  },
  {
    property_name: "Trump Towers",
    property_thumbnail:
      "https://www.panchshil.com/asset/images/properties/trump-towers-674500024.webp",
    property_location: "Kalyani Nagar, Pune",
    property_link: "https://www.panchshil.com/luxury-residences/trump-towers",
  },
  {
    property_name: "YOO Villas",
    property_thumbnail:
      "https://www.panchshil.com/asset/images/properties/yoo-villas-700275726.webp",
    property_location: "Near EON Free Zone, Kharadi, Pune",
    property_link: "https://www.panchshil.com/luxury-residences/yoo-villas",
  },
  {
    property_name: "yoopune",
    property_thumbnail:
      "https://www.panchshil.com/asset/images/properties/yoopune-421699478.webp",
    property_location: "Hadapsar, Pune",
    property_link: "https://www.panchshil.com/luxury-residences/yoopune",
  },
  {
    property_name: "EON Waterfront",
    property_thumbnail:
      "https://www.panchshil.com/asset/images/properties/eon-waterfront-133951849.webp",
    property_location: "Near EON Free Zone, Kharadi, Pune",
    property_link: "https://www.panchshil.com/luxury-residences/eon-waterfront",
  },
  {
    property_name: "Panchshil Towers",
    property_thumbnail:
      "https://www.panchshil.com/asset/images/properties/panchshil-towers-596555604.webp",
    property_location: "Near EON Free Zone, Kharadi, Pune",
    property_link:
      "https://www.panchshil.com/luxury-residences/panchshil-towers",
  },
  {
    property_name: "SOHO",
    property_thumbnail:
      "https://www.panchshil.com/asset/images/properties/soho-157045448.webp",
    property_location: "Near EON Free Zone, Pune",
    property_link: "https://www.panchshil.com/luxury-residences/soho",
  },
  {
    property_name: "Avant Garde",
    property_thumbnail:
      "https://www.panchshil.com/asset/images/properties/avant-garde-788610806.webp",
    property_location: "Friends Colony West, Delhi",
    property_link: "https://www.panchshil.com/luxury-residences/avant-garde",
  },
  {
    property_name: "Waterfront",
    property_thumbnail:
      "https://www.panchshil.com/asset/images/properties/waterfront-174507118.webp",
    property_location: "Kalyani Nagar, Pune",
    property_link: "https://www.panchshil.com/luxury-residences/waterfront",
  },
  {
    property_name: "One North",
    property_thumbnail:
      "https://www.panchshil.com/asset/images/properties/one-north-650572378.webp",
    property_location: "Magarpatta, Hadapsar, Pune",
    property_link: "https://www.panchshil.com/luxury-residences/one-north",
  },
  {
    property_name: "The Address",
    property_thumbnail:
      "https://www.panchshil.com/asset/images/properties/the-address-396971157.webp",
    property_location: "Boat Club Road, Pune",
    property_link: "https://www.panchshil.com/luxury-residences/the-address",
  },
  {
    property_name: "Ssilver Woods",
    property_thumbnail:
      "https://www.panchshil.com/asset/images/properties/ssilver-woods-293051009.webp",
    property_location: "Koregaon Park Annexe, Mundhwa, Pune",
    property_link: "",
  },
  {
    property_name: "Satellite Towers",
    property_thumbnail:
      "https://www.panchshil.com/asset/images/properties/satellite-towers-249475606.webp",
    property_location: "Koregaon Park Annexe, Mundhwa, Pune",
    property_link: "",
  },
  {
    property_name: "Forest Castle",
    property_thumbnail:
      "https://www.panchshil.com/asset/images/properties/forest-castle-930340720.webp",
    property_location: "Koregaon Park Annexe, Mundhwa, Pune",
    property_link: "",
  },
  {
    property_name: "Queens Court",
    property_thumbnail:
      "https://www.panchshil.com/asset/images/properties/queens-court-300471141.webp",
    property_location: "Boat Club Road, Pune",
    property_link: "",
  },
  {
    property_name: "Casa 9",
    property_thumbnail:
      "https://www.panchshil.com/asset/images/properties/casa-9-526096480.webp",
    property_location: "Baner, Pune",
    property_link: "",
  },
];

const PropertDetails = () => {
  // Split the data array into two parts for Interior and Exterior
  const midpoint = Math.ceil(staticPropertyData.length / 2);
  const interiorItems = staticPropertyData.slice(0, midpoint);
  const exteriorItems = staticPropertyData.slice(midpoint);
  return (
    <>
      <main className="min-h-screen bg-[#FFFAF7]">
        <Header />
        <div className="relative w-full h-screen overflow-hidden">
          <PropertyDetailsHero
            shouldShowVideo={true}
            slide={heroBannerData}
            setVideoErrors={() => new Set()}
          />
          {/* Content Overlay */}
          <div className="absolute inset-0 flex items-end justify-center z-40 pb-16 pointer-events-none">
            <div className="max-w-[1200px] mx-auto px-6 text-center">
              {/* Main Title */}
              <h1 className="text-3xl md:text-6xl lg:text-7xl font-display-semi text-white mb-6 tracking-tight">
                {heroBannerData?.master_slider_title}
              </h1>

              {/* Description */}
              <p className="text-sm md:text-lg lg:text-lg text-white/90 max-w-4xl mx-auto mb-8 leading-relaxed">
                {heroBannerData?.master_slider_description}
              </p>

              {/* CTA Button */}
              <Link
                href={heroBannerData?.master_slider_link || "#"}
                className="pointer-events-auto z-50 relative"
              >
                <Button variant="hero" size="lg">
                  {heroBannerData?.master_slider_button_caption}
                </Button>
              </Link>
              {/* <button className="relative w-36 h-12 pointer-events-auto">
              <span className="absolute top-0 left-0 right-0 bottom-0 bg-white opacity-40 hover:opacity-50 cursor-pointer text-white transition-opacity font-medium text-lg"></span>
              <div className=" w-full absolute z-10 left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2">
                {currentSlide.ctaText}
              </div>
            </button> */}
            </div>
          </div>
        </div>
        {/* Property Info section */}
        <PropertyInfo
          propertyInfo={{
            location: "Kalyani Nagar, Pune",
            configuration: "5.5Bhk Residences",
            status: "Ready-To-Move In Property",
            price: "Starting From 15.14 Crore",
            brochureUrl: "#",
            contactUrl: "#",
          }}
        />
        <PropertyAreaDetails />
        {/* Interior Exterior Carousel section */}
        <InteriorExteriorCarousel
          interiorItems={interiorItems}
          exteriorItems={exteriorItems}
        />

        <PropertyPanoramicView />
        {/* What sets apart section */}
        <WhatSetsApart />

        {/* Full width banner with play button */}
        <FloorPlans title="FLOOR PLANS" />
        <Amenities title="AMENITIES" />
        <LocationMap
          title="MAPS"
          description="Located in Kalyani Nagar, the development provides proximity to real, entertainment, business districts and the airport - offering convenience without compromising privacy."
        />
        <Testimonials
          testimonial={{
            name: "JOHN DOE",
            title: "CEO, COMPANY NAME",
            videoUrl:
              "https://www.panchshil.com/omnia/assets/videos/master-banner-530520572.mp4",
            posterImage: "/assets/images/testimonial-video-poster.png",
          }}
        />
        {/* Disclaimer section */}
        <Disclaimer />
        <Footer />
      </main>
    </>
  );
};

export default PropertDetails;
