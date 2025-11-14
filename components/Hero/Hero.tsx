import { CustomCarousel, SlideData } from "./CustomCarousel";

export function Hero() {
  // Slides data with images and corresponding content
  const slides: SlideData[] = [
    {
      video: "/assets/videos/omnia--banner.mp4",
      title: "Omnia",
      description:
        "An unmatched living experience in of Mumbai's most sought-after neighbourhoods in Bandra West, comprising of 12 exclusive residences overlooking the prestigious Almeida Park.",
      ctaText: "Discover",
    },
    {
      video: "/assets/videos/42-east-dubai.mp4",
      title: "42 East Residences",
      description: `A visionary waterfront masterplan poised to be one of the most exclusive family-friendly communities on Dubai Islands, only 42 will call this home.`,
      ctaText: "Explore Homes",
    },
    {
      video: "/assets/videos/trump-towers.mp4",
      title: "Trump Towers",
      description:
        "The first of its calibre in India, located in the heart of Pune and offering spectacular single-floor residences with 360-degree views of the city.",
      ctaText: "Discover",
    },
    {
      video: "/assets/videos/yoopune.mp4",
      title: "yoopune",
      description:
        "India's first ready-to-move-in YOO branded residences infused with the signature touches of world-renowned designer Philippe Starck and nestled amidst 5 acres of historic, lush green landscape.",
      ctaText: "Discover",
    },
    {
      video: "/assets/videos/yoovillas.mp4",
      title: "YOO Villas",
      description:
        "Offering beautiful villas at a picturesque location in collaboration with the YOO brand and styled by internationally acclaimed designer Kelly Hoppen.",
      ctaText: "Discover",
    },
  ];

  return (
    <section className="relative w-full h-screen">
      <CustomCarousel slides={slides} />
    </section>
  );
}
