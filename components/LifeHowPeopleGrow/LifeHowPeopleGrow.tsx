"use client";

import { useState } from "react";
import Image from "next/image";
import { LifeAtPanchshilPageData } from "@/app/careers/life-at-panchshil/life-at-panchshil.data";

type LifeHowPeopleGrowProps = {
  content: LifeAtPanchshilPageData["howPeopleGrow"];
};

export default function LifeHowPeopleGrow({ content }: LifeHowPeopleGrowProps) {
  const [openId, setOpenId] = useState(content.defaultOpen);

  return (
    <section className="bg-[#F7F4F1] pb-16 md:pb-20">
      <div className="max-w-[1540px] mx-auto pt-6 md:pt-10">
        <div className="px-6 md:px-10 mb-10">
          <div className="text-lg tracking-[0.2em] font-medium text-gold-beige mb-2">
            {content.heading}
          </div>
          <h2 className="text-2xl md:text-[28px] font-display-semi text-black-chocolate">
            {content.title}
          </h2>
          <p className="mt-3 text-sm md:text-base text-black/70 max-w-[1200px] leading-relaxed">
            {content.description}
          </p>
        </div>

        <div className="">
          {content.items.map((item) => {
            const isOpen = item.id === openId;

            return (
              <div key={item.id} className="">
                <button
                  type="button"
                  onClick={() => setOpenId(item.id)}
                  className="flex cursor-pointer items-center gap-4 justify-between py-6 px-4 md:px-8 border-b border-black/15 w-4/5 mx-auto transition-colors"
                >
                  <div className="flex items-center gap-6 w-full justify-between">
                    <span className="text-xl font-display-semi text-black-chocolate">
                      {String(item.id).padStart(2, "0")}
                    </span>
                    <span className="text-xl md:text-xl font-display-semi text-black-chocolate text-right">
                      {item.title}
                    </span>
                  </div>
                  <span className="text-xl font-light text-black-chocolate">
                    {isOpen ? "−" : "+"}
                  </span>
                </button>

                {isOpen && (
                  <div className="relative w-full h-[420px] md:h-[560px] overflow-hidden">
                    <Image
                      src={item.imageSrc}
                      alt={item.imageAlt}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-linear-to-b from-transparent via-black/20 to-black/85" />
                    <div className="absolute inset-x-0 bottom-8 md:bottom-10 text-center px-6">
                      <h3 className="text-white font-display-semi text-2xl md:text-[42px]">
                        {item.title}
                      </h3>
                      <p className="mt-3 text-white/90 text-sm md:text-lg">
                        {item.description}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
