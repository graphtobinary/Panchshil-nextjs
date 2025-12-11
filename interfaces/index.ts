import { MasterSliderData } from "@/components/Hero/CustomCarousel";

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
  menu: {
    menuTitle: string;
    menuURL: string;
  }[];
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
