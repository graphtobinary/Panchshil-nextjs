"use client";

import { useState } from "react";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import PropertyDetailsHero from "@/components/PropertyDetailsHero";
import WhatSetsApart from "@/components/WhatSetsApart/WhatSetsApart";
import {
  servicesHeroSlide,
  servicesIntro,
  servicesSections,
} from "@/app/services/services.data";
import { EnquiryForm } from "@/components/PropertyInfo/EnquiryForm";

export default function ServicesPageClient() {
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);

  return (
    <main className="min-h-screen bg-[#FFFAF7]">
      <Header />

      {/* Hero */}
      <div className="relative w-full h-screen overflow-hidden">
        <PropertyDetailsHero
          shouldShowVideo={false}
          slide={servicesHeroSlide}
          setVideoErrors={() => new Set()}
        />

        {/* Content Overlay */}
        <div className="absolute inset-0 flex items-end justify-center z-40 pb-16 pointer-events-none">
          <div className="max-w-[1200px] mx-auto px-6 text-center">
            <h1 className="text-2xl md:text-[28px] font-display-semi text-white mb-6 tracking-tight">
              {servicesHeroSlide.master_slider_title}
            </h1>
            <p className="text-lg md:text-lg lg:text-lg text-white/90 max-w-4xl mx-auto leading-relaxed">
              {servicesHeroSlide.master_slider_description}
            </p>
          </div>
        </div>
      </div>

      {/* Intro */}
      <section className="w-full bg-white py-16 md:py-24">
        <div className="mx-auto max-w-[1200px] px-6 md:px-16 text-center">
          <h2 className="text-xl md:text-2xl font-display-semi text-[#1F180D] uppercase tracking-wide">
            {servicesIntro.title}
          </h2>
          <p className="mt-6 text-sm md:text-sm text-[#1F180D]/80 leading-relaxed max-w-5xl mx-auto">
            {servicesIntro.subtitle}
          </p>
        </div>
      </section>

      {/* Service sections */}
      <div className="bg-white pb-10">
        {servicesSections.map((section, idx) => (
          <WhatSetsApart
            key={`${section.property_defining_features_caption}-${idx}`}
            property_defining_features_section={section}
            onCtaClick={() => setIsEnquiryOpen(true)}
          />
        ))}
      </div>

      <EnquiryForm
        isOpen={isEnquiryOpen}
        onClose={() => setIsEnquiryOpen(false)}
        propertyName="Services"
      />

      <Footer />
    </main>
  );
}
