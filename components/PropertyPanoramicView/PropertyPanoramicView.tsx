import React from "react";
import { PropertyVirtualTourSectionType } from "@/interfaces";

interface PropertyPanoramicViewProps {
  property_virtual_tour_section?: PropertyVirtualTourSectionType;
}

const PropertyPanoramicView = ({
  property_virtual_tour_section,
}: PropertyPanoramicViewProps) => {
  const videoEmbedUrl =
    property_virtual_tour_section?.property_virtual_video_embed_link || "";

  if (!videoEmbedUrl) return null;
  return (
    <>
      <section className="w-full py-16 md:py-24 bg-white">
        <div className=" mx-auto ">
          <div className="relative w-full aspect-video cursor-pointer group overflow-hidden">
            <iframe
              src={videoEmbedUrl}
              title="Virtual Tour"
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default PropertyPanoramicView;
