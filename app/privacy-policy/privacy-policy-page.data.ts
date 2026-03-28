import { CareerHeroContent } from "@/app/careers/career-page.data";

export type PrivacyPolicyPageData = {
  hero: CareerHeroContent;
};

/** Same hero pattern as /terms-conditions. */
export const privacyPolicyPageData: PrivacyPolicyPageData = {
  hero: {
    imageSrc: "/assets/images/terms-conditions-banner.png",
    title: "Privacy Policy",
    description:
      "Panchshil Realty respects your privacy. This policy describes how we collect, use and protect information when you visit www.panchshil.com (the “Website”). Please read it carefully.",
  },
};
