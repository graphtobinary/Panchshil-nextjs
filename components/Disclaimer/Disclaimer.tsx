"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { DisclaimerData } from "@/interfaces";

interface DisclaimerProps {
  disclaimer?: DisclaimerData;
}

export function Disclaimer({ disclaimer }: DisclaimerProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [isInView, setIsInView] = useState(false);

  // Sample data - can be replaced with props from CMS
  const defaultDisclaimer: DisclaimerData = {
    disclaimerText:
      "Omnia, Bandra is not owned, developed or sold by the Omnia organisation or any of their current or former principals or affiliates. Panchshil Realty and Developers Pvt. Ltd., the owner and developer of the property (in association with Premsagar Infra Realty Pvt. Ltd.), uses the Trump name and mark under license, which may be terminated or revoked according to its terms. The areas, prices, elevation and specifications in the sale agreement shall be final and binding. The elevation and visuals are indicative and are subject to change. The information here does not constitute any form of offer, the purchaser is governed by T&Cs of the sale agreement booking is subject to confirmation and acceptance of T&Cs. This project was completed before May 1, 2017.",
    reraNumber: "PNO 123456/0912345",
    reraCertificateImage: null, // Optional: URL to RERA certificate image
  };

  const disclaimerData = disclaimer || defaultDisclaimer;

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
    <section
      ref={sectionRef}
      className="relative w-full bg-[#F9F0E9] py-12 md:py-16 px-6 md:px-12"
    >
      <div className=" mx-auto">
        <div
          className={`space-y-8 md:space-y-12 text-left ${
            isInView ? "animate-fade-in-up" : "opacity-0"
          }`}
        >
          {/* Disclaimer Heading and Text */}
          <div className="space-y-4">
            <h3 className="text-black-chocolate text-lg md:text-xl font-semibold">
              DISCLAIMER
            </h3>
            <p className="text-black-chocolate text-sm md:text-base font-normal leading-relaxed">
              {disclaimerData.disclaimerText}
            </p>
          </div>

          {/* RERA Section */}
          <div className="space-y-4">
            <h3 className="text-black-chocolate text-lg md:text-xl font-semibold">
              RERA NUMBER ({disclaimerData.reraNumber})
            </h3>
            {/* RERA Certificate Placeholder/Image */}
            <div className="bg-white w-48 h-48 max-w-md aspect-square shadow-sm flex items-center justify-center">
              {disclaimerData.reraCertificateImage ? (
                <Image
                  src={disclaimerData.reraCertificateImage}
                  alt="RERA Certificate"
                  width={100}
                  height={100}
                  className="w-full h-full object-contain p-4"
                />
              ) : (
                <div className="text-transparent text-sm"></div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
