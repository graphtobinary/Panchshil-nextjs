import { CareerHeroContent } from "@/app/careers/career-page.data";
// import { BannersProps, MetaDataProps } from "@/interfaces";

export type AwardItem = {
  id: string;
  title: string;
  imageSrc: string;
  imageAlt: string;
};

export type AwardsPageData = {
  hero: CareerHeroContent;
  awards: AwardItem[] | [];
};
