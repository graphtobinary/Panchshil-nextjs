"use client";

import { SignatureCarousel } from "./SignatureCarousel";

export function Signature() {
  const images = [
    {
      id: "raya-1",
      src: "/assets/images/raya-by-atmosphere.jpg",
      alt: "Raaya by Atmosphere",
    },
    {
      id: "raya-2",
      src: "/assets/images/raya-by-atmosphere.jpg",
      alt: "Raaya by Atmosphere",
    },
    {
      id: "raya-3",
      src: "/assets/images/raya-by-atmosphere.jpg",
      alt: "Raaya by Atmosphere",
    },
  ];

  return (
    <section className="w-full bg-[#FFFAF7] py-10 md:py-20">
      <div className=" mx-auto">
        <div className="text-center mb-10">
          <div className="text-lg font-medium tracking-[0.2em] text-gold-beige mb-2">
            MASTERPIECES
          </div>
          <h2 className="text-2xl md:text-[28px] font-display-semi text-black">
            EXPLORE OUR SIGNATURE DEVELOPMENTS
          </h2>
        </div>

        <SignatureCarousel images={images} />
      </div>
    </section>
  );
}
