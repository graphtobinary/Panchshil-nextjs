"use client";

import Link from "next/link";
import { Button } from "@/components/Button";
// import { FloorPlans } from "@/components/FloorPlans";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import PropertyAreaDetails from "@/components/PropertyAreaDetails";
import PropertyDetailsHero from "@/components/PropertyDetailsHero";
import { InteriorExteriorCarousel } from "@/components/InteriorExteriorCarousel/InteriorExteriorCarousel";
import PropertyPanoramicView from "@/components/PropertyPanoramicView/PropertyPanoramicView";
import WhatSetsApart from "@/components/WhatSetsApart/WhatSetsApart";
import {
  Amenities,
  AmenitiesAwardsCertificates,
  AmenitiesKeyTenants,
} from "@/components/Amenities";

// import { Testimonials } from "@/components/Testimonials";
import { Disclaimer } from "@/components/Disclaimer";
import { PropertyInfo } from "@/components/PropertyInfo";
import type {
  MasterSliderData,
  Property,
  PropertyDefiningFeaturesSectionType,
  // PropertyDefiningFeaturesType,
  PropertyDetailResponse,
  PropertyDetailsInformationType,
  PropertyExteriorSliderType,
  PropertyInteriorSliderType,
  PropertyLandmark,
  PropertyLandmarkCategory,
  PropertyLocation,
  PropertyLocationCoOrdinatesProps,
  PropertyVirtualTourSectionType,
} from "@/interfaces";
import LocationMap from "../LocationMap";

type Props = {
  heroSlide?: MasterSliderData;
  propertyInfo?: PropertyDetailResponse;
  interiorItems?: Property[];
  exteriorItems?: Property[];
  property_location_co_ordinates: PropertyLocationCoOrdinatesProps;
};

export default function PropertyDetailsPageClient({
  heroSlide,
  propertyInfo,
  property_location_co_ordinates,
}: Props) {
  const slide = heroSlide;

  return (
    <main className="min-h-screen bg-[#FFFAF7]">
      <Header />
      <div className="relative w-full h-screen overflow-hidden">
        <PropertyDetailsHero
          shouldShowVideo={!!slide?.master_slider_video}
          slide={slide as MasterSliderData}
          setVideoErrors={() => new Set()}
        />
        {/* Content Overlay */}
        <div className="absolute inset-0 flex items-end justify-center z-40 pb-16 pointer-events-none">
          <div className="max-w-[1200px] mx-auto px-6 text-center">
            {/* Main Title */}
            <h1 className="text-2xl md:text-[28px] font-display-semi text-white mb-6 tracking-tight">
              {slide?.master_slider_title}
            </h1>

            {/* Description */}
            <p className="text-sm md:text-lg lg:text-lg text-white/90 max-w-4xl mx-auto mb-8 leading-relaxed">
              {slide?.master_slider_description}
            </p>

            {/* CTA Button */}
            <Link
              href={slide?.master_slider_link || "#"}
              className="pointer-events-auto z-50 relative"
            >
              <Button variant="hero" size="lg">
                {slide?.master_slider_button_caption || "Discover"}
              </Button>
            </Link>
          </div>
        </div>

        {/* Property info pinned in first fold */}
        <div className="absolute bottom-0 left-0 right-0 z-50">
          <PropertyInfo propertyInfo={propertyInfo} />
        </div>
      </div>

      <PropertyAreaDetails
        property_introduction_caption={
          propertyInfo?.property_introduction_caption
        }
        property_introduction_description={
          propertyInfo?.property_introduction_description
        }
        property_details_informations={
          propertyInfo?.property_details_informations as PropertyDetailsInformationType[]
        }
      />

      {/* Interior Exterior Carousel section */}
      <InteriorExteriorCarousel
        interiorItems={
          propertyInfo?.property_interior_sliders as PropertyInteriorSliderType[]
        }
        exteriorItems={
          propertyInfo?.property_exterior_sliders as PropertyExteriorSliderType[]
        }
      />

      <PropertyPanoramicView
        property_virtual_tour_section={
          propertyInfo?.property_virtual_tour_section as PropertyVirtualTourSectionType
        }
      />

      {/* What sets apart section */}
      <WhatSetsApart
        property_defining_features_section={
          propertyInfo?.property_defining_features_section as PropertyDefiningFeaturesSectionType
        }
      />

      {/* Full width banner with play button */}
      {/* <FloorPlans title="FLOOR PLANS" /> */}
      <Amenities
        title="AMENITIES"
        property_amenities_section={propertyInfo?.property_amenities_section}
      />
      <AmenitiesKeyTenants />
      <AmenitiesAwardsCertificates />

      <LocationMap
        title="MAPS"
        property_location_co_ordinates={property_location_co_ordinates}
        property_location={propertyInfo?.property_location as PropertyLocation}
        property_landmark_categories={
          propertyInfo?.property_landmark_categories as unknown as PropertyLandmarkCategory[]
        }
        property_landmarks={
          propertyInfo?.property_landmarks as unknown as PropertyLandmark[]
        }
      />
      {/* <Testimonials
        testimonial={{
          name: "JOHN DOE",
          title: "CEO, COMPANY NAME",
          videoUrl:
            "https://www.panchshil.com/omnia/assets/videos/master-banner-530520572.mp4",
          posterImage: "/assets/images/testimonial-video-poster.png",
        }}
      /> */}

      {/* Disclaimer section */}
      <Disclaimer
        disclaimer={propertyInfo?.property_disclaimer as string | null}
      />
      <Footer />
    </main>
  );
}
