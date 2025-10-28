import { CustomCarousel, SlideData } from "./CustomCarousel";

export function Hero() {
  // Slides data with images and corresponding content
  const slides: SlideData[] = [
    {
      image: "/assets/images/banner-image.jpg",
      title: "India's Leading Luxury Developer",
      description:
        "Since 2002, Panchshil Realty has set benchmarks in design, delivery and urban placemaking. From landmark residences and global office districts to iconic hospitality and convention destinations, our portfolio redefines skylines and shapes lifestyles across India and beyond.",
      ctaText: "Discover",
    },
    {
      image: "/assets/images/banner-image.jpg",
      title: "Premium Residential Excellence",
      description:
        "Experience luxury living at its finest. Our residential projects combine world-class architecture with unparalleled amenities, creating exceptional homes that redefine modern living standards across India.",
      ctaText: "Explore Homes",
    },
    {
      image: "/assets/images/banner-image.jpg",
      title: "Global Office Districts",
      description:
        "World-class commercial spaces designed for modern businesses. Our office parks and commercial developments offer cutting-edge facilities and strategic locations that drive success.",
      ctaText: "View Offices",
    },
    {
      image: "/assets/images/banner-image.jpg",
      title: "Iconic Hospitality Destinations",
      description:
        "From luxury hotels to convention centers, we create memorable experiences. Our hospitality portfolio features award-winning properties that blend elegance with exceptional service.",
      ctaText: "Book Now",
    },
    {
      image: "/assets/images/banner-image.jpg",
      title: "Sustainable Urban Development",
      description:
        "Building tomorrow's cities today with sustainable practices. Our commitment to green building and environmental responsibility shapes every project we undertake.",
      ctaText: "Learn More",
    },
  ];

  return (
    <section className="relative w-full h-screen">
      <CustomCarousel slides={slides} />
    </section>
  );
}
