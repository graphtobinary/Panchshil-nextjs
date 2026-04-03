export interface ArrowLeftIconProps {
  fill?: string;
  width?: number;
  height?: number;
}

export interface EnquiryFormProps {
  isOpen: boolean;
  onClose: () => void;
  propertyName?: string;
}

export interface EnquiryFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  phoneIsoCode: string;
  projectInterested: string;
  message: string;
}

export interface EnquiryFormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  projectInterested?: string;
}

export interface EnquiryPropertyGroup {
  property_category_name: string;
  properties: string[];
}

export interface ProjectCardData {
  id: string;
  title: string;
  location: string;
  image: string;
  link: string;
}

export interface ProjectsCarouselProps {
  items: ProjectCardData[];
}

export type RegionKey = "india" | "international";
export type CountryKey = "dubai" | "maldives" | "srilanka";
export type TabKey =
  | "residential"
  | "office"
  | "hospitality"
  | "datacenter"
  | "retail";

export type Browser =
  | "edge"
  | "opera"
  | "chrome"
  | "ie"
  | "firefox"
  | "safari"
  | "other";

export type PropertyCategories = {
  property_category_title: string;
  property_category_description: string;
  property_category_link: string;
  property_category_image: string;
  property_category_info: {
    property_category_developed: string;
    property_category_under_development: string;
  };
};

export type PropertiesIntroProps = {
  properties_intro_heading: string;
  properties_intro_sub_heading: string;
};

export type PropertyLocationCoOrdinatesProps = {
  property_latitude: number;
  property_longitude: number;
};

// Property Types
export type Property = {
  property_name: string;
  property_thumbnail: string;
  property_location: string;
  property_link: string;
};

// India Region Categories
export type PropertyCategory = {
  Residential?: Property[];
  "Office Parks"?: Property[];
  Hospitality?: Property[];
  "Retail & F&B"?: Property[];
  "Data Centres"?: Property[];
};

// International Region Categories
export type InternationalCategory = {
  Maldives?: Property[];
  "Sri Lanka"?: Property[];
  "United Arab Emirates"?: Property[];
};

// Region Types
export type IndiaRegion = {
  India: PropertyCategory[];
};

export type InternationalRegion = {
  International: InternationalCategory[];
};

// Complete Properties Data Structure
export type PropertiesData = Array<IndiaRegion & InternationalRegion>;

export type PropertyHighlight = {
  property_highlight_caption: string;
  property_highlight_icon: string;
};

export type FeaturedPropertiesProps = {
  property_name: string;
  property_background_desktop_image: string;
  property_background_mobile_image: string;
  property_highlights: PropertyHighlight[];
  property_link: string;
};

export type ContactDetailsProps = {
  contact_title: string;
  contact_details: string;
  contact_number: string;
}[];

export type MetaDataProps = {
  canonical_tag?: string;
  meta_description?: string;
  meta_title?: string;
};

export type NavigationMenuProps = {
  menuTitle: string;
  menuURL: string;
  menu: NavigationMenuItemProps[];
};

export type BannersProps = {
  banner_image: string;
};
export type FeaturedPropertiesIntroProps = {
  featured_properties_intro_heading: string;
  featured_properties_intro_sub_heading: string;
};

export type ServicesIntroProps = {
  services_intro_heading: string;
  services_intro_sub_heading: string;
};

export type ServicesProps = {
  service_title: string;
  service_link: string;
  service_thumbnail: string;
  service_link_label: string;
};

export interface HomeClientProps {
  metaData: MetaDataProps;
  banner: BannersProps;
  servicesIntro: ServicesIntroProps;
  services: ServicesProps[];
  aboutIntro: AboutIntroData;
  milestones: MilestonesProps[];
  propertyCategories: PropertyCategories[];
  propertiesIntro: PropertiesIntroProps;
  properties: PropertiesData | null;
  featuredPropertiesIntro: FeaturedPropertiesIntroProps;
  featuredProperties: FeaturedPropertiesProps[];
  masterSlider: MasterSliderData[];
  footerBlocks: FooterBlocksProps[];
}

export interface AccordionProps {
  propertyCategories: PropertyCategories[];
  defaultOpen?: number;
}

export type Stat = {
  value: number;
  suffix?: string;
  description: string;
};

export type AboutIntroData = {
  about_intro_heading: string;
  about_intro_description: string;
  about_intro_link: string;
  about_intro_image: string;
  about_intro_desktop_video: string;
  about_intro_mobile_video: string;
  about_intro_button_caption: string;
};

export interface AuthTokenResponse {
  token: string;
}

export interface FooterBlocksProps {
  footer_block_title: string;
  footer_block_link: string;
  footer_block_thumbnail: string;
}

export interface MilestonesProps {
  milestone_title: string;
  milestone_caption: string;
}

export interface PropertyCategoryMilestonesProps {
  milestone_count: string;
  milestone_title: string;
}
export interface PropertyCategoryProps {
  banner_image_caption: string;
  banner_image_description: string;
  meta_description: string;
  meta_title: string;
  property_category_title: string;
  property_category_og_image: string;
  banner_image: string;
  canonical_tag: string;
  property_category_milestones: PropertyCategoryMilestonesProps[];
  property_count: number;
}

export interface PropertyBasicInformationProps {
  property_basic_information_icon: string;
  property_basic_information_caption: string;
}
export interface PropertyProps {
  property_name: string;
  property_thumbnail: string;
  property_thumbnail_night_mode: string;
  property_location: string;
  property_link: string;
  property_status: string;
  image_gallery?: string[];
  property_city_name: string;
  property_brochure: string;
  property_tagline: string;
  property_url: string;
  property_basic_information: PropertyBasicInformationProps[];
  property_url_slug: string;
  listing_only: boolean;
  buttons: {
    label: string;
    url: string;
  }[];
}

export interface PropertyListProps {
  properties: PropertyProps[];
  allProperties?: PropertyProps[];
  propertyCategoryUrlSlug?: string;
  totalPropertyCount?: number;
  propertyCities?:
    | string[]
    | Array<Record<string, string[]>>
    | Record<string, string[]>;
  /** Set on the server from the URL so filters initialize before client `useSearchParams` is ready. */
  propertyCountryKeysFromUrl?: string[];
  propertyStatuses?: string[];
  footerRef?: React.RefObject<HTMLElement | null>;
  currentPage?: number;
  categorySlug?: string;
}

export interface PropertyItemProps {
  property: PropertyProps;
  categorySlug?: string;
}

export interface ActionButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  isDarkMode: boolean;
}

export interface CategoryFooterBlocksProps {
  footer_block_title: string;
  footer_block_description: string;
  footer_block_image: string;
  footer_block_cta_label: string;
  footer_block_cta_value: string;
}

export interface DevelopmentForYouProps {
  propertyCategory: PropertyCategoryProps;
}

export interface ListContactBannerProps {
  propertyFooterBlocks: CategoryFooterBlocksProps;
}

export interface NavigationMenuItemProps {
  menuTitle: string;
  menuURL: string;
  menuDayThumbnail: string;
  menuNightThumbnail: string;
}

export interface StickyBottomBarProps {
  projectCount?: number;
  selectedLocation?: string | string[];
  selectedProperty?: string | string[];
  onLocationChange?: (value: string[] | null) => void;
  onPropertyChange?: (value: string[] | null) => void;
  isVisible?: boolean;
  propertyCities?:
    | string[]
    | Array<Record<string, string[]>>
    | Record<string, string[]>;
  propertyStatuses?: string[];
}

export interface DropdownMenuProps {
  options?: string[];
  selectedValues?: string | string[];
  isOpen: boolean;
  onSelect: (value: string) => void;
  onClose: () => void;
  theme: "day" | "night";
  isProperty?: boolean;
}

export interface PropertyCategoryMilestonesProps {
  milestone_count: string;
  milestone_title: string;
}
export interface PropertyCategoryProps {
  banner_image_caption: string;
  banner_image_description: string;
  meta_description: string;
  meta_title: string;
  property_category_title: string;
  property_category_og_image: string;
  banner_image: string;
  canonical_tag: string;
  property_category_milestones: PropertyCategoryMilestonesProps[];
}

export interface SlideData {
  image?: string;
  video?: string;
  title: string;
  description: string;
  ctaText: string;
}

export interface MasterSliderData {
  master_slider_title: string;
  master_slider_description: string;
  master_slider_link: string;
  master_slider_image: string | null;
  master_slider_video: string;
  master_slider_button_caption: string;
}

export interface TestimonialData {
  name: string;
  title: string;
  videoUrl: string;
  posterImage: string;
}

export interface DisclaimerData {
  disclaimerText: string;
  reraNumber: string;
  reraCertificateImage?: string | null;
}

export interface PropertyInfoData {
  location: string;
  configuration: string;
  status: string;
  price: string;
  brochureUrl: string;
  contactUrl: string;
}

export type PropertyKeyTenant = {
  property_key_tenant_caption: string;
  property_key_tenant_image: string;
};

export type PropertyAwardCertificate = {
  property_award_certificate_caption: string;
  property_award_certificate_image: string;
};

export interface PropertyQrCode {
  property_rera_number: string;
  property_qr_code_image: string;
}

export type PropertyDetailResponse = {
  property_name: string;
  property_qr_codes: PropertyQrCode[];
  banner_data?: {
    banner_image: string | null;
    banner_image_caption: string;
    banner_image_description: string;
  };
  meta_data?: {
    meta_title: string;
    meta_description: string;
    canonical_tag: string;
  };
  property_band?: {
    property_location: string;
    property_configuration: string;
    property_status: string;
    property_pricing: string;
  };
  property_introduction_caption?: string;
  property_introduction_description?: string;
  property_details_informations?: unknown[];
  property_interior_sliders?: unknown;
  property_exterior_sliders?: unknown;
  property_virtual_tour_section?: unknown;
  property_defining_features_section?: unknown;
  property_brochure?: string | null;
  property_floor_plan_section?: unknown;
  property_disclaimer?: unknown;
  property_location?: {
    property_location_caption?: string;
    property_location_marker?: string | null;
    property_location_co_ordinates?: {
      property_latitude: number;
      property_longitude: number;
    };
    property_3d_map_link?: string;
  };
  property_landmark_categories?: unknown[];
  property_landmarks?: unknown[];
  property_amenities_section?: PropertyAmenitiesSection;
  property_key_tenants?: PropertyKeyTenant[];
  property_award_certificates?: PropertyAwardCertificate[];
};

export type PropertyInteriorSliderType = {
  property_interior_slider_caption: string;
  property_interior_slider_image: string;
};

export type PropertyExteriorSliderType = {
  property_exterior_slider_caption: string;
  property_exterior_slider_image: string;
};

export interface InteriorExteriorCarouselProps {
  interiorItems: PropertyInteriorSliderType[];
  exteriorItems: PropertyExteriorSliderType[];
}

export type CarouselItem = {
  image: string;
  caption: string;
};

export type PropertyDefiningFeaturesType = {
  property_defining_feature_caption: string;
};

export type PropertyDefiningFeaturesSectionType = {
  property_defining_features: PropertyDefiningFeaturesType[];
  property_defining_features_caption: string;
  property_defining_features_thumbnail: string;
};

export type PropertyLandmarkCategory = {
  property_landmark_category_name: string;
  property_landmark_category_description: string;
  property_landmark_category_image: string;
};

export type PropertyLandmark = {
  property_location_caption: string;
  property_location_description: number;
  property_3d_map_link: string;
  property_location_marker: string;
  property_location_co_ordinates: PropertyLocationCoOrdinatesProps;
};

export type PropertyDetailsInformationType = {
  property_details_information_title: string;
  property_details_information_icon: string;
  property_details_information_caption: string;
};
export interface PropertyAreaDetailsProps {
  property_introduction_caption: string | undefined;
  property_introduction_description: string | undefined;
  property_details_informations?: PropertyDetailsInformationType[];
}

export interface PropertyLocation {
  property_location_caption: string;
  property_location_description: string;
  property_3d_map_link: string;
  property_location_marker: string;
  property_location_co_ordinates: PropertyLocationCoOrdinatesProps;
}
export interface LocationMapProps {
  title?: string;
  description?: string;
  property_location_co_ordinates: PropertyLocationCoOrdinatesProps;
  property_location: PropertyLocation;
  property_landmark_categories: PropertyLandmarkCategory[];
  property_landmarks: PropertyLandmark[];
  property_3d_map_link?: string;
}

export type LandmarkCategoryNormalized = {
  title: string;
  icon: string;
};

export type LandmarkNormalized = {
  name: string;
  lat: number;
  lng: number;
  icon: string;
  categoryKey?: string;
};

export interface PropertyVirtualTourSectionType {
  property_virtual_video_embed_link: string;
}

export type PropertyAmenitiesSliderType = {
  property_amenity_slider_title: string;
  property_amenity_sliders: {
    property_amenity_slider_image_caption: string;
    property_amenity_slider_image: string;
  }[];
};

export type PropertyAmenitiesSection = {
  property_amenities_caption: string;
  property_amenities: PropertyAmenitiesSliderType[];
};

export type LocationType =
  | "atm"
  | "banks"
  | "entertainment"
  | "hospital"
  | "park"
  | "restaurants"
  | "airport";
export interface MapLocation {
  id: string;
  title: string;
  type: LocationType;
  lat: number;
  lng: number;
  zoom?: number;
  icon: string;
}

export type ClientsApiItem = {
  id?: string | number;
  _id?: string | number;
  name?: string;
  title?: string;
  client_name?: string;
  image?: string;
  image_url?: string;
  image_path?: string;
  client_logo?: string;
  logo?: string;
  client_image?: string;
};

export type AwardsApiItem = {
  id?: string | number;
  _id?: string | number;
  title?: string;
  name?: string;
  award_name?: string;
  description?: string;
  award_description?: string;
  image?: string;
  image_url?: string;
  image_path?: string;
  award_image?: string;
};
