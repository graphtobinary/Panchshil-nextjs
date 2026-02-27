import Image from "next/image";
import { getVideoUrl } from "@/utils/utils";
import { StaticImageData } from "next/image";

type CommonHeroMediaProps = {
  imageSrc?: string | StaticImageData | null;
  imageAlt: string;
  videoSrc?: string;
  shouldShowVideo?: boolean;
  overlayClassName?: string;
};

export default function CommonHeroMedia({
  imageSrc,
  imageAlt,
  videoSrc,
  shouldShowVideo = false,
  overlayClassName = "bg-black/20",
}: CommonHeroMediaProps) {
  return (
    <>
      {shouldShowVideo && videoSrc ? (
        <video
          key={videoSrc}
          src={getVideoUrl(videoSrc)}
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          crossOrigin="anonymous"
          onError={(e) => {
            console.error("Video failed to load:", videoSrc, e);
          }}
        />
      ) : (
        <Image
          src={imageSrc ?? ""}
          alt={imageAlt}
          fill
          className="object-cover"
          priority
        />
      )}

      <div
        className={`absolute inset-0 pointer-events-none ${overlayClassName}`}
      ></div>
    </>
  );
}
