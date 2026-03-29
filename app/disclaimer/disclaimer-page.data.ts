import { CareerHeroContent } from "@/app/careers/career-page.data";

export type DisclaimerPageData = {
  hero: CareerHeroContent;
};

/** Same hero as /terms-conditions (CareerHero + terms-conditions banner). */
export const disclaimerPageData: DisclaimerPageData = {
  hero: {
    imageSrc: "/assets/images/terms-conditions-banner.png",
    title: "Disclaimer",
    description:
      "This Disclaimer applies to your use of www.panchshil.com (the “Website”) operated by Panchshil Realty. Please read it carefully before you access or use the Website.",
  },
};
