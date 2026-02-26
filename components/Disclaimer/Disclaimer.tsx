"use client";

import { ReactNode, useEffect, useRef, useState } from "react";
import Image from "next/image";

interface DisclaimerProps {
  disclaimer?: string | null;
  reraNumber?: string | null;
}

export function Disclaimer({
  disclaimer = "",
  reraNumber = "",
}: DisclaimerProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [isInView, setIsInView] = useState(false);
  const [openItem, setOpenItem] = useState(1);

  // Sample data - can be replaced with props from CMS

  const disclaimerData = disclaimer || "";
  const accordionItems: { id: number; title: string; content: ReactNode }[] = [
    {
      id: 1,
      title: "DISCLAIMER",
      content: (
        <p className="text-black-chocolate text-sm md:text-base font-normal leading-relaxed">
          {disclaimerData}
        </p>
      ),
    },
    {
      id: 2,
      title: `RERA NUMBER (${reraNumber})`,
      content: (
        <div className="bg-white w-48 h-48 max-w-md aspect-square shadow-sm flex items-center justify-center">
          {/* {disclaimerData ? (
            <Image
              src={disclaimerData}
              alt="RERA Certificate"
              width={100}
              height={100}
              className="w-full h-full object-contain p-4"
            />
          ) : (
            <div className="text-transparent text-sm"></div>
          )} */}
        </div>
      ),
    },
  ];

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
      <div className="mx-auto">
        <div
          className={`text-left ${isInView ? "animate-fade-in-up" : "opacity-0"}`}
        >
          {accordionItems.map((item) => {
            const isOpen = openItem === item.id;
            return (
              <div
                key={item.id}
                className="border-b border-black-chocolate/15 last:border-b-0"
              >
                <button
                  onClick={() => setOpenItem(item.id)}
                  className="w-full flex items-center justify-between gap-4 py-6 md:py-7 cursor-pointer"
                >
                  <div className="flex items-center gap-6">
                    <h3 className="text-black-chocolate text-lg md:text-xl font-semibold text-left">
                      {item.title}
                    </h3>
                  </div>
                  <span className="text-black-chocolate inline-flex items-center justify-center">
                    <svg
                      className={`h-5 w-5 transition-transform duration-200 ${
                        isOpen ? "rotate-180" : "rotate-0"
                      }`}
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                    >
                      <path
                        d="M5 7.5L10 12.5L15 7.5"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </button>
                {isOpen && (
                  <div className="pb-6 md:pb-8 pl-[60px] md:pl-[72px]">
                    {item.content}
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
