import { CustomCarousel, SlideData } from "./CustomCarousel";

export function Hero() {
  // Slides data with images and corresponding content
  const slides: SlideData[] = [
    {
      video: "/assets/videos/omnia--banner.mp4",
      title: "Omnia - Your Sanctuary Of Serenity",
      description:
        "In the heart of one of Mumbai's liveliest neighbourhoods lies a tower that prioritizes solitude, calm and character. Omnia is built on freehold land and designed around the rarest luxury in Bandra —uninterrupted privacy.",
      ctaText: "Discover",
    },
    {
      video: "/assets/videos/42-east-dubai.mp4",
      title: "42 East, Dubai Islands",
      description: ` Purposefully kept for a minimal number of discerning families, 42 East was designed to foster community and togetherness amongst owner-occupiers. 
${"\n"}
Located within Dubai Islands — a visionary waterfront masterplan that integrates residences, marinas, cultural districts, schools, hospitals, and parks — the development features only 3- and 4-bedroom configurations, a thoughtfully planned amenity floor, and a private neighborhood setting. 
${"\n"}
42 East is poised to be one of the most exclusive family-friendly communities on Dubai Islands.
`,
      ctaText: "Explore Homes",
    },
    {
      video: "/assets/videos/trump-towers.mp4",
      title: "Trump Towers",
      description:
        "Trump Towers Pune comprises 2 striking glass façade towers of 23 storeys each, offering 46 spectacular single-floor residences. As India’s first ready-to-move-in Trump branded residences, they are located in the heart of Pune",
      ctaText: "Discover",
    },
    {
      video: "/assets/videos/yoopune.mp4",
      title: "yoopune",
      description:
        "yoopune is India's first ready-to-move-in YOO branded residence. Spanning an impressive ~13 acres, yoopune epitomizes exclusive designer-led living. Nestled amidst 5 acres of historic, lush green landscape, these residences seamlessly blend luxury with nature.",
      ctaText: "Discover",
    },
    {
      video: "/assets/videos/yoovillas.mp4",
      title: "YOO Villas",
      description:
        "Reinventing new and unique experiences, YOO Villas are distinctively curated to foster a signature lifestyle. Offering beautiful villas at a picturesque location in collaboration with the YOO brand and styled by internationally renowned designer Kelly Hoppen.",
      ctaText: "Discover",
    },
  ];

  return (
    <section className="relative w-full h-screen">
      <CustomCarousel slides={slides} />
    </section>
  );
}
