import { CareerHeroContent } from "@/app/careers/career-page.data";

export type TestimonialCategory = "residential" | "office";

export type TestimonialListItem = {
  id: string;
  category: TestimonialCategory;
  quote: string;
  details: string;
  author: string;
  role: string;
  avatarSrc: string;
  avatarAlt: string;
};

export type TestimonialsPageData = {
  hero: CareerHeroContent;
  testimonials: TestimonialListItem[];
};

const SAMPLE_QUOTE =
  "Trump Towers Pune is one of the first buildings I have seen anywhere in the emerging world, where you could transplant it from Pune and put in into New York or London, and finishes would be on par with the best residential finishes I have seen anywhere in the world.";

const SAMPLE_DETAILS =
  "I actually bought my whole team, friends and partners so that they could witness it. And they know, this is the standard that they are competing against which is not easy.";

const AVATAR = "/assets/images/career/user-thumb-career.png";

export const testimonialsPageDummyData: TestimonialsPageData = {
  hero: {
    imageSrc: "/assets/images/meet-the-city/meet-the-city-magazine-banner.png",
    title: "Testimonials",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  },
  testimonials: [
    {
      id: "1",
      category: "residential",
      quote: SAMPLE_QUOTE,
      details: SAMPLE_DETAILS,
      author: "Donald Trump Jr",
      role: "Executive Vice President, Trump Organisation",
      avatarSrc: AVATAR,
      avatarAlt: "Testimonial profile",
    },
    {
      id: "2",
      category: "office",
      quote: SAMPLE_QUOTE,
      details: SAMPLE_DETAILS,
      author: "Donald Trump Jr",
      role: "Executive Vice President, Trump Organisation",
      avatarSrc: AVATAR,
      avatarAlt: "Testimonial profile",
    },
    {
      id: "3",
      category: "residential",
      quote: SAMPLE_QUOTE,
      details: SAMPLE_DETAILS,
      author: "Donald Trump Jr",
      role: "Executive Vice President, Trump Organisation",
      avatarSrc: AVATAR,
      avatarAlt: "Testimonial profile",
    },
    {
      id: "4",
      category: "office",
      quote: SAMPLE_QUOTE,
      details: SAMPLE_DETAILS,
      author: "Donald Trump Jr",
      role: "Executive Vice President, Trump Organisation",
      avatarSrc: AVATAR,
      avatarAlt: "Testimonial profile",
    },
    {
      id: "5",
      category: "residential",
      quote: SAMPLE_QUOTE,
      details: SAMPLE_DETAILS,
      author: "Donald Trump Jr",
      role: "Executive Vice President, Trump Organisation",
      avatarSrc: AVATAR,
      avatarAlt: "Testimonial profile",
    },
    {
      id: "6",
      category: "office",
      quote: SAMPLE_QUOTE,
      details: SAMPLE_DETAILS,
      author: "Donald Trump Jr",
      role: "Executive Vice President, Trump Organisation",
      avatarSrc: AVATAR,
      avatarAlt: "Testimonial profile",
    },
    {
      id: "7",
      category: "residential",
      quote: SAMPLE_QUOTE,
      details: SAMPLE_DETAILS,
      author: "Donald Trump Jr",
      role: "Executive Vice President, Trump Organisation",
      avatarSrc: AVATAR,
      avatarAlt: "Testimonial profile",
    },
    {
      id: "8",
      category: "office",
      quote: SAMPLE_QUOTE,
      details: SAMPLE_DETAILS,
      author: "Donald Trump Jr",
      role: "Executive Vice President, Trump Organisation",
      avatarSrc: AVATAR,
      avatarAlt: "Testimonial profile",
    },
    {
      id: "9",
      category: "residential",
      quote: SAMPLE_QUOTE,
      details: SAMPLE_DETAILS,
      author: "Donald Trump Jr",
      role: "Executive Vice President, Trump Organisation",
      avatarSrc: AVATAR,
      avatarAlt: "Testimonial profile",
    },
    {
      id: "10",
      category: "office",
      quote: SAMPLE_QUOTE,
      details: SAMPLE_DETAILS,
      author: "Donald Trump Jr",
      role: "Executive Vice President, Trump Organisation",
      avatarSrc: AVATAR,
      avatarAlt: "Testimonial profile",
    },
    {
      id: "11",
      category: "residential",
      quote: SAMPLE_QUOTE,
      details: SAMPLE_DETAILS,
      author: "Donald Trump Jr",
      role: "Executive Vice President, Trump Organisation",
      avatarSrc: AVATAR,
      avatarAlt: "Testimonial profile",
    },
    {
      id: "12",
      category: "office",
      quote: SAMPLE_QUOTE,
      details: SAMPLE_DETAILS,
      author: "Donald Trump Jr",
      role: "Executive Vice President, Trump Organisation",
      avatarSrc: AVATAR,
      avatarAlt: "Testimonial profile",
    },
  ],
};
