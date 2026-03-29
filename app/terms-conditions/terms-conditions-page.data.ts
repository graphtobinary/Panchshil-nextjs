import { CareerHeroContent } from "@/app/careers/career-page.data";

export type TermsConditionsPageData = {
  hero: CareerHeroContent;
};

/** Same hero pattern as /testimonials (CareerHero + meet-the-city banner asset). */
export const termsConditionsPageData: TermsConditionsPageData = {
  hero: {
    imageSrc: "/assets/images/terms-conditions-banner.png",
    title: "Terms & Conditions",
    description:
      "These Terms of Use govern your access to and use of www.panchshil.com (the “Website”), including any content, functionality and services offered on or through the Website. Please read them carefully before you start to use the Website.",
  },
};
