"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { AboutVideoData } from "@/interfaces";

export default function AboutUsVideoBanner({
  content,
}: {
  content?: AboutVideoData;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isModalOpen]);

  return (
    <>
      <section
        className="relative w-full cursor-pointer"
        onClick={() => setIsModalOpen(true)}
      >
        <div className="relative w-full h-[500px] md:h-[600px] lg:h-[700px]">
          <Image
            src={
              content?.about_intro_video_thumbnail ||
              "/assets/images/career/build-career-that-shape-cities.png"
            }
            alt="Panchshil Video Banner"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/40"></div>
        </div>

        <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 bg-[rgba(0,0,0,0.3)]">
          <div className="px-5 md:px-24 flex flex-col justify-center items-center gap-5">
            <p className="text-white text-2xl md:text-3xl  font-display-semi uppercase tracking-wider text-center px-4 leading-12">
              {content?.about_video_caption ? (
                content.about_video_caption.split("\n").map((line, i) => (
                  <span key={i}>
                    {line}
                    <br />
                  </span>
                ))
              ) : (
                <>
                  WE STAND FOR UNWAVERING QUALITY, <br />
                  THOUGHTFUL DESIGN AND ENDURING VALUE.
                </>
              )}
            </p>
            <div className="relative w-16 h-16 md:h-20 md:w-full">
              <Image
                src="/assets/images/about/play-icon.png"
                alt="Play Video"
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setIsModalOpen(false)}
          />

          <div className="relative w-full max-w-4xl mx-4 aspect-video bg-black rounded-lg overflow-hidden shadow-xl">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 z-10 text-white hover:text-gray-300 transition-colors cursor-pointer"
            >
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            <iframe
              src={`https://www.youtube.com/embed/${content?.about_video_youtube_id || "eqR46NiBiBE"}?autoplay=1`}
              title="Panchshil Story Video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            />
          </div>
        </div>
      )}
    </>
  );
}
