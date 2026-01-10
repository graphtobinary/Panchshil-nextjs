import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { getVideoUrl } from "@/utils/utils";
import PlayButton from "@/assets/images/play-button.png";

// Type definitions for fullscreen API
interface VideoElementWithFullscreen extends HTMLVideoElement {
  webkitRequestFullscreen?: () => void;
  mozRequestFullScreen?: () => void;
  msRequestFullscreen?: () => void;
}

interface DocumentWithFullscreen extends Document {
  webkitFullscreenElement?: Element | null;
  mozFullScreenElement?: Element | null;
  msFullscreenElement?: Element | null;
}

const PropertyPanoramicView = () => {
  // Panoramic View Section state
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const panoramicPosterImage =
    "https://www.panchshil.com/omnia/assets/images/video/video-267370287.webp";
  const panoramicVideoUrl =
    "https://www.panchshil.com/omnia/assets/videos/master-banner-530520572.mp4";

  // Handle fullscreen video
  useEffect(() => {
    if (isVideoModalOpen && videoRef.current) {
      videoRef.current.play().catch((error) => {
        console.error("Error playing video:", error);
      });

      // Request fullscreen
      const videoElement = videoRef.current as VideoElementWithFullscreen;
      if (videoElement.requestFullscreen) {
        videoElement.requestFullscreen().catch((error) => {
          console.error("Error entering fullscreen:", error);
        });
      } else if (videoElement.webkitRequestFullscreen) {
        videoElement.webkitRequestFullscreen();
      } else if (videoElement.mozRequestFullScreen) {
        videoElement.mozRequestFullScreen();
      } else if (videoElement.msRequestFullscreen) {
        videoElement.msRequestFullscreen();
      }
    }
  }, [isVideoModalOpen]);

  // Handle fullscreen exit
  useEffect(() => {
    const handleFullscreenChange = () => {
      const doc = document as DocumentWithFullscreen;
      if (
        !doc.fullscreenElement &&
        !doc.webkitFullscreenElement &&
        !doc.mozFullScreenElement &&
        !doc.msFullscreenElement
      ) {
        setIsVideoModalOpen(false);
        if (videoRef.current) {
          videoRef.current.pause();
        }
      }
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    document.addEventListener("webkitfullscreenchange", handleFullscreenChange);
    document.addEventListener("mozfullscreenchange", handleFullscreenChange);
    document.addEventListener("MSFullscreenChange", handleFullscreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      document.removeEventListener(
        "webkitfullscreenchange",
        handleFullscreenChange
      );
      document.removeEventListener(
        "mozfullscreenchange",
        handleFullscreenChange
      );
      document.removeEventListener(
        "MSFullscreenChange",
        handleFullscreenChange
      );
    };
  }, []);
  return (
    <>
      {/* Panoramic View Section */}
      <section className="w-full py-16 md:py-24 bg-[#fff]">
        <div className=" mx-auto ">
          {/* Header Text */}
          <div className="text-center mb-8 md:mb-12 px-4 md:px-0">
            <p className="text-[#9E8C70] text-sm md:text-base font-medium mb-4 tracking-wider">
              VIRTUAL TOUR
            </p>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-display-semi text-black uppercase tracking-tight leading-tight max-w-4xl mx-auto">
              EACH RESIDENCE IS SURROUNDED BY 360-DEGREE PANORAMIC VIEWS OF THE
              CITY
            </h2>
          </div>

          {/* Poster Image with Play Button */}
          <div
            className="relative w-full aspect-video cursor-pointer group overflow-hidden "
            onClick={() => setIsVideoModalOpen(true)}
          >
            <Image
              src={panoramicPosterImage}
              alt="Panoramic View"
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              priority
            />

            {/* Play Button Overlay */}
            <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-colors">
              <div className="relative w-20 h-20 md:w-24 md:h-24 flex items-center justify-center">
                <Image
                  src={PlayButton}
                  alt="Play Button"
                  width={40}
                  height={40}
                  className="w-10 h-10 md:w-20 md:h-20"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Fullscreen Video Modal */}
      {isVideoModalOpen && (
        <>
          <div className="fixed inset-0 z-[9999] bg-black">
            <button
              onClick={() => setIsVideoModalOpen(false)}
              className="absolute top-4 right-4  w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors z-[99999]"
            >
              <svg
                className="w-6 h-6 text-white"
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
            {/* Close Button */}
            <video
              ref={videoRef}
              src={getVideoUrl(panoramicVideoUrl)}
              className="w-full h-full object-contain"
              controls
              autoPlay
              playsInline
              onEnded={() => {
                setIsVideoModalOpen(false);
                if (document.fullscreenElement) {
                  document.exitFullscreen();
                }
              }}
            />
            {/* Close Button */}
            <button
              onClick={() => {
                setIsVideoModalOpen(false);
                if (videoRef.current) {
                  videoRef.current.pause();
                }
                if (document.fullscreenElement) {
                  document.exitFullscreen();
                }
              }}
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors"
              aria-label="Close video"
            >
              <svg
                className="w-6 h-6 text-white"
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
          </div>
        </>
      )}
    </>
  );
};

export default PropertyPanoramicView;
