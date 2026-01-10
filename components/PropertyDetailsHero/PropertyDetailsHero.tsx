import { MasterSliderData } from "@/interfaces";
import { getVideoUrl } from "@/utils/utils";
import Image from "next/image";

const PropertyDetailsHero = ({
  shouldShowVideo,
  slide,
}: {
  shouldShowVideo: boolean;
  slide: MasterSliderData;
  //   getVideoUrl: (videoUrl: string) => string;
  setVideoErrors: (errors: Set<number>) => void;
}) => {
  //   console.log(slide, "slide");
  return (
    <>
      {shouldShowVideo ? (
        <video
          key={slide.master_slider_video}
          src={getVideoUrl(slide.master_slider_video)}
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          crossOrigin="anonymous"
          onError={(e) => {
            console.error(
              "Video failed to load:",
              slide.master_slider_video,
              e
            );
          }}
          onLoadedData={() => {
            // console.log(
            //   "Video loaded successfully:",
            //   slide.master_slider_video
            // );
          }}
          onCanPlay={() => {
            // console.log("Video can play:", slide.master_slider_video);
          }}
        />
      ) : (
        <Image
          src={slide?.master_slider_image ?? ""}
          alt={slide?.master_slider_title}
          fill
          className="object-cover"
        />
      )}
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-black/20 pointer-events-none"></div>
    </>
  );
};

export default PropertyDetailsHero;
