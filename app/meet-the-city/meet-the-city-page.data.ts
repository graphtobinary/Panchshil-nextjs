import { CareerHeroContent } from "@/app/careers/career-page.data";

const IMG_MAR_APR = "/assets/images/meet-the-city/mar-apr-edition.png";
const IMG_AUG_SEP = "/assets/images/meet-the-city/aug-sep-edition.png";
const IMG_MAY_JUNE = "/assets/images/meet-the-city/may-june-edition.png";

export type MeetTheCityEdition = {
  id: string;
  title: string;
  imageSrc: string;
  imageAlt: string;
};

export type MeetTheCityPageData = {
  hero: CareerHeroContent;
  editions: MeetTheCityEdition[];
};

export const meetTheCityPageDummyData: MeetTheCityPageData = {
  hero: {
    imageSrc: "/assets/images/meet-the-city/meet-the-city-magazine-banner.png",
    title: "Meet The City Magazine",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  },
  editions: [
    {
      id: "1",
      title: "March – April 2019 Edition",
      imageSrc: IMG_MAR_APR,
      imageAlt: "Meet The City March – April 2019 edition cover",
    },
    {
      id: "2",
      title: "August – September 2018 Edition",
      imageSrc: IMG_AUG_SEP,
      imageAlt: "Meet The City August – September 2018 edition cover",
    },
    {
      id: "3",
      title: "May – June 2017 Edition",
      imageSrc: IMG_MAY_JUNE,
      imageAlt: "Meet The City May – June 2017 edition cover",
    },
    {
      id: "4",
      title: "January – February 2017 Edition",
      imageSrc: IMG_MAR_APR,
      imageAlt: "Meet The City January – February 2017 edition cover",
    },
    {
      id: "5",
      title: "May – June 2016 Edition",
      imageSrc: IMG_AUG_SEP,
      imageAlt: "Meet The City May – June 2016 edition cover",
    },
    {
      id: "6",
      title: "February 2016 Edition",
      imageSrc: IMG_MAY_JUNE,
      imageAlt: "Meet The City February 2016 edition cover",
    },
    {
      id: "7",
      title: "November – December 2015 Edition",
      imageSrc: IMG_MAR_APR,
      imageAlt: "Meet The City November – December 2015 edition cover",
    },
    {
      id: "8",
      title: "July – August 2015 Edition",
      imageSrc: IMG_AUG_SEP,
      imageAlt: "Meet The City July – August 2015 edition cover",
    },
    {
      id: "9",
      title: "March – April 2015 Edition",
      imageSrc: IMG_MAY_JUNE,
      imageAlt: "Meet The City March – April 2015 edition cover",
    },
    {
      id: "10",
      title: "January – February 2015 Edition",
      imageSrc: IMG_MAR_APR,
      imageAlt: "Meet The City January – February 2015 edition cover",
    },
    {
      id: "11",
      title: "September – October 2014 Edition",
      imageSrc: IMG_AUG_SEP,
      imageAlt: "Meet The City September – October 2014 edition cover",
    },
    {
      id: "12",
      title: "May – June 2014 Edition",
      imageSrc: IMG_MAY_JUNE,
      imageAlt: "Meet The City May – June 2014 edition cover",
    },
    {
      id: "13",
      title: "January – February 2014 Edition",
      imageSrc: IMG_MAR_APR,
      imageAlt: "Meet The City January – February 2014 edition cover",
    },
    {
      id: "14",
      title: "September – October 2013 Edition",
      imageSrc: IMG_AUG_SEP,
      imageAlt: "Meet The City September – October 2013 edition cover",
    },
    {
      id: "15",
      title: "May – June 2013 Edition",
      imageSrc: IMG_MAY_JUNE,
      imageAlt: "Meet The City May – June 2013 edition cover",
    },
    {
      id: "16",
      title: "January – February 2013 Edition",
      imageSrc: IMG_MAR_APR,
      imageAlt: "Meet The City January – February 2013 edition cover",
    },
    {
      id: "17",
      title: "September – October 2012 Edition",
      imageSrc: IMG_AUG_SEP,
      imageAlt: "Meet The City September – October 2012 edition cover",
    },
    {
      id: "18",
      title: "May – June 2012 Edition",
      imageSrc: IMG_MAY_JUNE,
      imageAlt: "Meet The City May – June 2012 edition cover",
    },
  ],
};
