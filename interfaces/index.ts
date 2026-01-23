export interface ArrowLeftIconProps {
  fill?: string;
  width?: number;
  height?: number;
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
}

export interface PropertyListProps {
  properties: PropertyProps[];
  propertyCategoryUrlSlug?: string;
  totalPropertyCount?: number;
  propertyCities?: string[];
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
  propertyCities?: string[];
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

export type PropertyDetailResponse = {
  property_name: string;
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
  };
  property_landmark_categories?: unknown[];
  property_landmarks?: unknown[];
};
