export interface AccordionData {
  id: number;
  title: string;
  description: string;
  image: string;
  stats?: Array<{ label: string }>;
}

export const accordionItems: AccordionData[] = [
  {
    id: 1,
    title: "Residential",
    description:
      "Discover luxury living at its finest. Panchshil's residential developments redefine urban lifestyle with world-class amenities, cutting-edge architecture, and prime locations. Our premium residences offer unparalleled comfort, elegance, and modern conveniences, creating exceptional homes for discerning buyers who value quality and sophistication in every detail.",
    image: "/assets/images/residential-wide.webp",
    stats: [
      { label: "50+ Projects Developed" },
      { label: "15 Million sq.ft Under Construction" },
    ],
  },
  {
    id: 2,
    title: "Office Parks",
    description:
      "Experience world-class commercial spaces designed for modern businesses. Panchshil's office parks combine cutting-edge architecture with strategic locations and state-of-the-art facilities. From IT parks to corporate towers, our commercial developments offer flexible spaces, premium amenities, and sustainable design that drives productivity and business success in today's dynamic market.",
    image: "/assets/images/office-park-wide.webp",
    stats: [
      { label: "12 Million sq.ft Developed" },
      { label: "8 Million sq.ft Under Development" },
    ],
  },
  {
    id: 3,
    title: "Hospitality",
    description:
      "In its pursuit to bring the finest global experiences, Panchshil has introduced an array of luxury hotels in the lodging sector. Its distinguished portfolio in Pune includes The Ritz-Carlton Pune, JW Marriott Pune, Marriott Suites, Courtyard by Marriott, DoubleTree by Hilton, Oakwood Residences, and Radisson Blu. Expanding its presence beyond Pune, Panchshil has also added SOHO House Mumbai and Aloft Bengaluru Whitefield to its collection. Marking its first foray into the international market, Panchshil launched Raaya by Atmosphere in the Maldives, further broadening its reach in the industry.",
    image: "/assets/images/hospitality-wide.webp",
    stats: [
      { label: "2177 Rooms Developed" },
      { label: "247 Rooms under development" },
    ],
  },
  {
    id: 4,
    title: "Retail & F&B",
    description:
      "Creating vibrant retail destinations and culinary experiences. Panchshil's retail and food & beverage developments bring together luxury brands, dining experiences, and entertainment in thoughtfully designed spaces. Our retail projects feature premium shopping environments with curated tenant mixes, exceptional dining options, and engaging customer experiences that cater to the evolving lifestyle needs of modern consumers.",
    image: "/assets/images/retail-fb-wide.webp",
    stats: [
      { label: "1.5 Million sq.ft Developed" },
      { label: "500K sq.ft Under Construction" },
    ],
  },
  {
    id: 5,
    title: "Data Centres",
    description:
      "Powering the digital future with state-of-the-art infrastructure. Panchshil's data centers combine robust technology, redundant power systems, and cutting-edge security to deliver mission-critical solutions for enterprises. Our facilities offer scalable, reliable, and secure colocation services that meet the highest industry standards, ensuring seamless operations for businesses in the digital age.",
    image: "/assets/images/data-center-wide.webp",
    stats: [
      { label: "2 Million sq.ft Developed" },
      { label: "1.5 Million sq.ft Planned" },
    ],
  },
];
