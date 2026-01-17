export interface AmenityItem {
  id: string;
  title: string;
  image: string;
  category: "well-being" | "hospitality" | "infrastructure";
}

export interface AmenityCategory {
  id: string;
  title: string;
  amenities: AmenityItem[];
}

export const amenitiesCategories: AmenityCategory[] = [
  {
    id: "well-being",
    title: "WELL-BEING & WELLNESS",
    amenities: [
      {
        id: "rooftop-swimming-pool",
        title: "Rooftop Swimming Pool",
        image: "/assets/images/amenities/kids-play-area.png",
        category: "well-being",
      },
      {
        id: "state-of-the-art-gym",
        title: "State-of-the-Art Gym",
        image: "/assets/images/amenities/testimonial-video-poster.png",
        category: "well-being",
      },
      {
        id: "yoga-meditation-lounge",
        title: "Yoga & Meditation Lounge",
        image: "/assets/images/amenities/kids-play-area.png",
        category: "well-being",
      },
    ],
  },
  {
    id: "hospitality",
    title: "HOSPITALITY SERVICES",
    amenities: [
      {
        id: "concierge-services",
        title: "Concierge Services",
        image: "/assets/images/amenities/testimonial-video-poster.png",
        category: "hospitality",
      },
      {
        id: "private-dining",
        title: "Private Dining",
        image: "/assets/images/amenities/kids-play-area.png",
        category: "hospitality",
      },
    ],
  },
  {
    id: "infrastructure",
    title: "INFRASTRUCTURE & SECURITY",
    amenities: [
      {
        id: "secure-parking",
        title: "Secure Parking",
        image: "/assets/images/amenities/kids-play-area.png",
        category: "infrastructure",
      },
      {
        id: "cctv-surveillance",
        title: "CCTV Surveillance",
        image: "/assets/images/amenities/testimonial-video-poster.png",
        category: "infrastructure",
      },
    ],
  },
];

// Legacy export for backward compatibility
export const amenitiesData: AmenityItem[] = amenitiesCategories.flatMap(
  (category) => category.amenities
);
