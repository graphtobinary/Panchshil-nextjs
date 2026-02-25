import { MasterSliderData } from "@/interfaces";
import { CommonHeroMedia } from "@/components/CommonHeroMedia";

const PropertyDetailsHero = ({
  shouldShowVideo,
  slide,
}: {
  shouldShowVideo: boolean;
  slide: MasterSliderData;
  //   getVideoUrl: (videoUrl: string) => string;
  setVideoErrors: (errors: Set<number>) => void;
}) => {
  return (
    <CommonHeroMedia
      shouldShowVideo={shouldShowVideo}
      videoSrc={slide.master_slider_video}
      imageSrc={slide.master_slider_image}
      imageAlt={slide.master_slider_title}
    />
  );
};

export default PropertyDetailsHero;
