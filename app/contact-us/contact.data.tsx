import {
  PropertyLocationCoOrdinatesProps,
  PropertyLocation,
  PropertyLandmarkCategory,
  PropertyLandmark,
} from "@/interfaces";

export const contactHero = {
  imageSrc: "/assets/images/contact-us/contact-us-banner.png",
  title: "Contact Us",
  description:
    "Updates, announcements, and storiesfeaturing Panchshil's developmens, milestones and industry presence.'",
};

export const property_location_co_ordinates: PropertyLocationCoOrdinatesProps =
  {
    property_latitude: 18.5483,
    property_longitude: 73.9046,
  };

export const property_location: PropertyLocation = {
  property_location_caption: "Panchshil Corporate Office",
  property_location_description:
    "Tech Park One, Tower E, 191 Yerwada, Pune - 411006, India",
  property_3d_map_link: "",
  property_location_marker: "",
  property_location_co_ordinates,
};

export const property_landmark_categories: PropertyLandmarkCategory[] = [];
export const property_landmarks: PropertyLandmark[] = [];

export const branches = [
  {
    title: "Corporate Office",
    address: "Tech Park One, Tower E, 191 Yerwada, Pune - 411 006. India",
    phone: "+91 20 66473200",
    link: "+912066473200",
  },
  {
    title: "Mumbai Office",
    address:
      "Express Towers, 20th Floor, Nariman Point, Mumbai - 400 021 India",
    phone: "+91 22 66863939",
    link: "+912266863939",
  },
  {
    title: "Email Us",
    address: "",
    // "Sales Enquiry: sales@panchshil.com\nJob Opportunities: careers@panchshil.com\nLeasing Enquiry: info@panchshil.com",
    phone: "",
    type: "email",
    emailData: [
      {
        label: "Sales Enquiry",
        email: "sales@panchshil.com",
      },
      {
        label: "Job Opportunities",
        email: "careers@panchshil.com",
      },
      {
        label: "Leasing Enquiry",
        email: "info@panchshil.com",
      },
    ],
  },
];

export type ContactData = typeof contactHero & {
  property_location_co_ordinates: PropertyLocationCoOrdinatesProps;
};

export const contactPageData: ContactData = {
  ...contactHero,
  property_location_co_ordinates,
};
