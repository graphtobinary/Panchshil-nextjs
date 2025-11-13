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
    // {
    //   image: "/assets/images/banner-image.jpg",
    //   title: "Global Office Districts",
    //   description:
    //     "World-class commercial spaces designed for modern businesses. Our office parks and commercial developments offer cutting-edge facilities and strategic locations that drive success.",
    //   ctaText: "View Offices",
    // },
    // {
    //   image: "/assets/images/banner-image.jpg",
    //   title: "Iconic Hospitality Destinations",
    //   description:
    //     "From luxury hotels to convention centers, we create memorable experiences. Our hospitality portfolio features award-winning properties that blend elegance with exceptional service.",
    //   ctaText: "Book Now",
    // },
    // {
    //   image: "/assets/images/banner-image.jpg",
    //   title: "Sustainable Urban Development",
    //   description:
    //     "Building tomorrow's cities today with sustainable practices. Our commitment to green building and environmental responsibility shapes every project we undertake.",
    //   ctaText: "Learn More",
    // },
  ];

  return (
    <section className="relative w-full h-screen">
      <CustomCarousel slides={slides} />
    </section>
  );
}
