"use client";

import { NewsCard } from "@/interfaces";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export function LatestNews() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isInView, setIsInView] = useState(false);

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
      { threshold: 0.1, rootMargin: "0px 0px -100px 0px" }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);
  const items: NewsCard[] = [
    {
      id: "latest",
      title: "LATEST NEWS",
      image: "/assets/images/news.jpg",
    },
    {
      id: "blogs",
      title: "EXPERT BLOGS",
      image: "/assets/images/expert-blog.jpg",
    },
    {
      id: "sustain",
      title: "SUSTANIBILITY",
      image: "/assets/images/Sustainability.jpg",
    },
  ];

  return (
    <section ref={sectionRef} className="w-full bg-[#FFFAF7] py-10">
      {/* Mobile: horizontal scroll; Desktop: 3 columns */}
      <div className="">
        <div
          className={`grid grid-cols-1  md:grid-cols-3  mx-auto overflow-x-auto md:overflow-visible snap-x snap-mandatory md:snap-none [scrollbar-width:none] [-ms-overflow-style:none] ${isInView ? "animate-fade-in-up" : "opacity-0"}`}
          style={{ WebkitOverflowScrolling: "touch" }}
        >
          {items.map((item) => (
            <a
              key={item.id}
              href={item.href || "#"}
              className="relative min-w-[80%] snap-center md:min-w-0 group"
            >
              <div className="relative h-[340px] md:h-[420px] overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover"
                  sizes="(min-width: 768px) 33vw, 80vw"
                />
                {/* overlay */}
                <div className="absolute inset-0 bg-linear-to-b from-black/10 via-white/40 to-black/70" />

                <div className="absolute inset-0 flex flex-col items-center justify-end p-6 text-white">
                  <div className="text-base md:text-lg font-display-semi tracking-wide">
                    {item.title}
                  </div>

                  <div className="mt-4">
                    <span className="inline-flex h-9 w-9 items-center justify-center ">
                      <Image
                        src="/assets/svgs/arrow-button.svg"
                        alt="Go"
                        width={48}
                        height={48}
                        // className="w-12 h-12"
                      />
                    </span>
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
