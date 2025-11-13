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
