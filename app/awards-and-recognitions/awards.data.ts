import { CareerHeroContent } from "@/app/careers/career-page.data";

export type AwardItem = {
  id: string;
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
};

export type AwardsPageData = {
  hero: CareerHeroContent;
  awards: AwardItem[];
};

export const awardsPageData: AwardsPageData = {
  hero: {
    imageSrc: "/assets/images/awards/awars-recognition-hero-banner.png",
    title: "Honours & Recognitions",
    description:
      "Celebrating excellence across safety, sustainability, design and corporate leadership highlighting the awards and accolades that mark panchshil's legacy of quality and trust.",
  },
  awards: [
    {
      id: "1",
      title:
        "British Safety Council's International Safety Awards - 2021, 2022",
      description:
        "Awarded to multiple panchshil campuses (EON Free Zone-1, Business Bay, Tech park One) for exemplary health & safety standards",
      imageSrc: "/assets/images/awards/international-safety-award.png",
      imageAlt: "British Safety Council International Safety Awards",
    },
    {
      id: "2",
      title: "Asia Pacific Property Awards 2022-2023",
      description:
        "Honouring excellence in real estate development and design across panchshil portfolio",
      imageSrc: "/assets/images/awards/asia-pacific-award.png",
      imageAlt: "Asia Pacific Property Awards",
    },
    {
      id: "3",
      title: "International Property Awards - Architecture 2022-2023",
      description:
        "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero.",
      imageSrc: "/assets/images/awards/international-property-award.png",
      imageAlt: "International Property Awards - Architecture",
    },
    {
      id: "4",
      title: "International Safety Awards - Best In The Country - 2022",
      description:
        "Awarded to multiple panchshil campuses (EON Free Zone-1, Business Bay, Tech park One) for exemplary health & safety standards",
      imageSrc: "/assets/images/awards/best-in-country-award.png",
      imageAlt: "International Safety Awards - Best In The Country",
    },
    {
      id: "5",
      title: "International Safety Award 2021",
      description:
        "Honouring excellence in real estate development and design across panchshil portfolio",
      imageSrc: "/assets/images/awards/international-safety-award.png",
      imageAlt: "International Safety Award 2021",
    },
    {
      id: "6",
      title: "International Property Awards - Architecture 2022-2023",
      description:
        "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero.",
      imageSrc: "/assets/images/awards/international-property-award.png",
      imageAlt: "International Property Awards - Architecture",
    },
    {
      id: "7",
      title: "British Safety Council's International Safety Awards - 2023",
      description:
        "Awarded to multiple panchshil campuses for exemplary health & safety standards and commitment to workplace safety.",
      imageSrc: "/assets/images/awards/international-safety-award.png",
      imageAlt: "British Safety Council International Safety Awards 2023",
    },
  ],
};
