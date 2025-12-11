"use client";

import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import ListHeroBanner from "@/components/ListHeroBanner/ListHeroBanner";
import { StickyBottomBar } from "@/components/StickyBottomBar";
import { PropertyList } from "@/components/PropertyList";
// import { useParams } from "next/navigation";
import { useState } from "react";
import DevelopmentForYou from "@/components/DevelopmentForYou";
import { Accordion } from "@/components/Accordion";
import { PropertyCategories } from "@/interfaces";
import ListContactBanner from "@/components/ListContactBanner";

const dummyProperties = [
  {
    property_name: "Omnia Residences",
    property_thumbnail:
      "https://www.panchshil.com/asset/images/properties/omnia-residences-399070081.webp",
    property_location: "Almeida Park, Bandra West, Mumbai",
    property_link:
      "https://www.panchshil.com/luxury-residences/omnia-residences",
    image_gallery: [
      "https://www.panchshil.com/asset/images/properties/omnia-residences-399070081.webp",
      "https://www.panchshil.com/asset/images/properties/omnia-residences-399070081.webp",
      "https://www.panchshil.com/asset/images/properties/omnia-residences-399070081.webp",
    ],
  },
  {
    property_name: "Trump Towers",
    property_thumbnail:
      "https://www.panchshil.com/asset/images/properties/trump-towers-674500024.webp",
    property_location: "Kalyani Nagar, Pune",
    property_link: "https://www.panchshil.com/luxury-residences/trump-towers",
    image_gallery: [
      "https://www.panchshil.com/asset/images/properties/trump-towers-674500024.webp",
      "https://www.panchshil.com/asset/images/properties/trump-towers-674500024.webp",
    ],
  },
  {
    property_name: "YOO Villas",
    property_thumbnail:
      "https://www.panchshil.com/asset/images/properties/yoo-villas-336385034.webp",
    property_location: "Near EON Free Zone, Kharadi, Pune",
    property_link: "https://www.panchshil.com/luxury-residences/yoo-villas",
    image_gallery: [
      "https://www.panchshil.com/asset/images/properties/yoo-villas-336385034.webp",
      "https://www.panchshil.com/asset/images/properties/yoo-villas-336385034.webp",
    ],
  },
  {
    property_name: "yoopune",
    property_thumbnail:
      "https://www.panchshil.com/asset/images/properties/yoopune-835769568.webp",
    property_location: "Hadapsar, Pune",
    property_link: "https://www.panchshil.com/luxury-residences/yoopune",
    image_gallery: [
      "https://www.panchshil.com/asset/images/properties/yoopune-835769568.webp",
      "https://www.panchshil.com/asset/images/properties/yoopune-835769568.webp",
    ],
  },
  {
    property_name: "EON Waterfront",
    property_thumbnail:
      "https://www.panchshil.com/asset/images/properties/eon-waterfront-589426289.webp",
    property_location: "Near EON Free Zone, Kharadi, Pune",
    property_link: "https://www.panchshil.com/luxury-residences/eon-waterfront",
    image_gallery: [
      "https://www.panchshil.com/asset/images/properties/eon-waterfront-589426289.webp",
      "https://www.panchshil.com/asset/images/properties/eon-waterfront-589426289.webp",
    ],
  },
  {
    property_name: "Panchshil Towers",
    property_thumbnail:
      "https://www.panchshil.com/asset/images/properties/panchshil-towers-42702113.webp",
    property_location: "Near EON Free Zone, Kharadi, Pune",
    property_link:
      "https://www.panchshil.com/luxury-residences/panchshil-towers",
    image_gallery: [
      "https://www.panchshil.com/asset/images/properties/panchshil-towers-42702113.webp",
      "https://www.panchshil.com/asset/images/properties/panchshil-towers-42702113.webp",
    ],
  },
  {
    property_name: "SOHO",
    property_thumbnail:
      "https://www.panchshil.com/asset/images/properties/soho-157045448.webp",
    property_location: "Near EON Free Zone, Pune",
    property_link: "https://www.panchshil.com/luxury-residences/soho",
    image_gallery: [
      "https://www.panchshil.com/asset/images/properties/soho-157045448.webp",
      "https://www.panchshil.com/asset/images/properties/soho-157045448.webp",
    ],
  },
  {
    property_name: "Avant Garde",
    property_thumbnail:
      "https://www.panchshil.com/asset/images/properties/avant-garde-788610806.webp",
    property_location: "Friends Colony West, Delhi",
    property_link: "https://www.panchshil.com/luxury-residences/avant-garde",
    image_gallery: [
      "https://www.panchshil.com/asset/images/properties/avant-garde-788610806.webp",
      "https://www.panchshil.com/asset/images/properties/avant-garde-788610806.webp",
    ],
  },
  {
    property_name: "Waterfront",
    property_thumbnail:
      "https://www.panchshil.com/asset/images/properties/waterfront-174507118.webp",
    property_location: "Kalyani Nagar, Pune",
    property_link: "https://www.panchshil.com/luxury-residences/waterfront",
    image_gallery: [
      "https://www.panchshil.com/asset/images/properties/waterfront-174507118.webp",
      "https://www.panchshil.com/asset/images/properties/waterfront-174507118.webp",
    ],
  },
  {
    property_name: "One North",
    property_thumbnail:
      "https://www.panchshil.com/asset/images/properties/one-north-142471761.webp",
    property_location: "Magarpatta, Hadapsar, Pune",
    property_link: "https://www.panchshil.com/luxury-residences/one-north",
    image_gallery: [
      "https://www.panchshil.com/asset/images/properties/one-north-142471761.webp",
      "https://www.panchshil.com/asset/images/properties/one-north-142471761.webp",
    ],
  },
  {
    property_name: "The Address",
    property_thumbnail:
      "https://www.panchshil.com/asset/images/properties/the-address-396971157.webp",
    property_location: "Boat Club Road, Pune",
    property_link: "https://www.panchshil.com/luxury-residences/the-address",
    image_gallery: [
      "https://www.panchshil.com/asset/images/properties/the-address-396971157.webp",
      "https://www.panchshil.com/asset/images/properties/the-address-396971157.webp",
    ],
  },
  {
    property_name: "Ssilver Woods",
    property_thumbnail:
      "https://www.panchshil.com/asset/images/properties/ssilver-woods-293051009.webp",
    property_location: "Koregaon Park Annexe, Mundhwa, Pune",
    property_link: "",
    image_gallery: [
      "https://www.panchshil.com/asset/images/properties/ssilver-woods-293051009.webp",
      "https://www.panchshil.com/asset/images/properties/ssilver-woods-293051009.webp",
    ],
  },
  {
    property_name: "Satellite Towers",
    property_thumbnail:
      "https://www.panchshil.com/asset/images/properties/satellite-towers-249475606.webp",
    property_location: "Koregaon Park Annexe, Mundhwa, Pune",
    property_link: "",
    image_gallery: [
      "https://www.panchshil.com/asset/images/properties/satellite-towers-249475606.webp",
      "https://www.panchshil.com/asset/images/properties/satellite-towers-249475606.webp",
    ],
  },
  {
    property_name: "Forest Castle",
    property_thumbnail:
      "https://www.panchshil.com/asset/images/properties/forest-castle-930340720.webp",
    property_location: "Koregaon Park Annexe, Mundhwa, Pune",
    property_link: "",
    image_gallery: [
      "https://www.panchshil.com/asset/images/properties/forest-castle-930340720.webp",
      "https://www.panchshil.com/asset/images/properties/forest-castle-930340720.webp",
    ],
  },
  {
    property_name: "Queens Court",
    property_thumbnail:
      "https://www.panchshil.com/asset/images/properties/queens-court-300471141.webp",
    property_location: "Boat Club Road, Pune",
    property_link: "",
    image_gallery: [
      "https://www.panchshil.com/asset/images/properties/queens-court-300471141.webp",
      "https://www.panchshil.com/asset/images/properties/queens-court-300471141.webp",
    ],
  },
  {
    property_name: "Casa 9",
    property_thumbnail:
      "https://www.panchshil.com/asset/images/properties/casa-9-526096480.webp",
    property_location: "Baner, Pune",
    property_link: "",
    image_gallery: [
      "https://www.panchshil.com/asset/images/properties/casa-9-526096480.webp",
    ],
  },
];

const dummyPropertyCategory: PropertyCategories[] = [
  {
    property_category_title: "Residential",
    property_category_description:
      "Much more than homes, Panchshil residences are lifestyles. Finer in every aspect, they command appreciation in value and identity. Collaborating with global realtors, renowned design houses and esteemed architects, each Panchshil residence is a testament to the transformative power of architectural design, elevating lifestyles and making them more uniquely yours.",
    property_category_link: "https://www.panchshil.com/luxury-residences",
    property_category_image:
      "https://www.panchshil.com/asset/images/property-categories/residential-101659381.webp",
    property_category_info: {
      property_category_developed: "11 Million Sq. Ft. Developed",
      property_category_under_development:
        "4 Million Sq. Ft. Under Development",
    },
  },
  {
    property_category_title: "Office Parks",
    property_category_description:
      "Panchshil Office Parks, with its long-standing expertise in office space development and management, provides integrated workspaces, fostering innovation and collaboration. Catering to fortune 500 companies and industry leaders with dynamic and interactive office environments, Panchshil has significantly contributed to the global identity of its clients through its robust infrastructure across multiple sectors.",
    property_category_link: "https://www.panchshil.com/office-parks",
    property_category_image:
      "https://www.panchshil.com/asset/images/property-categories/office-parks-51801182.webp",
    property_category_info: {
      property_category_developed: "23 Million Sq. Ft. Developed",
      property_category_under_development:
        "32 Millison Sq. Ft. Under Development",
    },
  },
  {
    property_category_title: "Hospitality",
    property_category_description:
      "Developed and owned under Ventive Hospitality, our hospitality portfolio is defined by thoughtful design, seamless service and architectural distinction. From shaping iconic developments in India to creating timeless destinations overseas, each property is widely acclaimed for setting benchmarks in quality and service, shaping unforgettable experiences that resonate for generations.",
    property_category_link: "https://www.panchshil.com/hospitality",
    property_category_image:
      "https://www.panchshil.com/asset/images/property-categories/hospitality-20504722.webp",
    property_category_info: {
      property_category_developed: "2178 Rooms Developed",
      property_category_under_development: "1476 Rooms Under Development",
    },
  },
  {
    property_category_title: "Retail & F&B",
    property_category_description:
      "Panchshil’s retail destinations are curated lifestyle experiences, seamlessly blending fashion, dining and leisure. Each space is designed to anticipate evolving urban aspirations, offering environments that are immersive, contemporary and enduring in their appeal.",
    property_category_link: "https://www.panchshil.com/retail",
    property_category_image:
      "https://www.panchshil.com/asset/images/property-categories/retail-f-b-945435283.webp",
    property_category_info: {
      property_category_developed: "0.7 Million Sq. Ft. Developed",
      property_category_under_development:
        "0.7 Million Sq. Ft. Under Development",
    },
  },
  {
    property_category_title: "Data Centres",
    property_category_description:
      "Our expertise lies in developing and operating advanced facilities for large multinational companies across various industries, with a commitment  to delivering unparalleled performance, unwavering reliability and exceptional scalability in an ever-evolving digital landscape.",
    property_category_link: "https://www.panchshil.com/data-centres",
    property_category_image:
      "https://www.panchshil.com/asset/images/property-categories/data-centres-116001000.webp",
    property_category_info: {
      property_category_developed: "1 Million Sq. Ft. Developed",
      property_category_under_development:
        "6.9 Million Sq. Ft. Under Development",
    },
  },
];

const PropertList = () => {
  // const params = useParams();
  // const propertySlug = params["property-slug"] as string;
  const [selectedLocation, setSelectedLocation] = useState(["pune"]);
  const [selectedProperty, setSelectedProperty] = useState([
    "ready-to-move-in",
  ]);

  return (
    <>
      <main className="min-h-screen bg-[#FFFAF7] pb-20">
        <Header metaData={{}} />
        <ListHeroBanner />
        {/* Properties List */}
        <PropertyList properties={dummyProperties} />
        <DevelopmentForYou />
        <Accordion propertyCategories={dummyPropertyCategory} defaultOpen={1} />
        <ListContactBanner />
        <Footer />
        <StickyBottomBar
          projectCount={dummyProperties.length}
          selectedLocation={selectedLocation}
          selectedProperty={selectedProperty}
          onLocationChange={setSelectedLocation}
          onPropertyChange={setSelectedProperty}
        />
      </main>
    </>
  );
};

export default PropertList;
