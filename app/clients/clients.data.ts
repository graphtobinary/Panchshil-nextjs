import { CareerHeroContent } from "@/app/careers/career-page.data";

export type ClientItem = {
  id: string;
  name: string;
  imageSrc: string;
  imageAlt: string;
};

export type ClientsPageData = {
  hero: CareerHeroContent;
  clients: ClientItem[];
};

export const clientsPageData: ClientsPageData = {
  hero: {
    imageSrc: "/assets/images/clients-hero-banner.png",
    title: "Our Trusted Clients",
    description:
      "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.",
  },
  clients: [
    {
      id: "1",
      name: "ABS",
      imageSrc: "/assets/images/brands/brand-abs.png",
      imageAlt: "ABS",
    },
    {
      id: "2",
      name: "Aditya Birla Fashion & Retail",
      imageSrc: "/assets/images/brands/brand-abfrl.png",
      imageAlt: "Aditya Birla Fashion & Retail",
    },
    {
      id: "3",
      name: "Adler",
      imageSrc: "/assets/images/brands/brand-adler.png",
      imageAlt: "Adler",
    },
    {
      id: "4",
      name: "Affinity X",
      imageSrc: "/assets/images/brands/brand-affinity.png",
      imageAlt: "Affinity X",
    },
    {
      id: "5",
      name: "Aggreko",
      imageSrc: "/assets/images/brands/brand-aggreko.png",
      imageAlt: "Aggreko",
    },
    {
      id: "6",
      name: "Allegis Group",
      imageSrc: "/assets/images/brands/brand-allegis-group.png",
      imageAlt: "Allegis Group",
    },
    {
      id: "7",
      name: "Allianz",
      imageSrc: "/assets/images/brands/brand-allianz.png",
      imageAlt: "Allianz",
    },
    {
      id: "8",
      name: "Allscripts",
      imageSrc: "/assets/images/brands/brand-allscripts.png",
      imageAlt: "Allscripts",
    },
    {
      id: "9",
      name: "Altimetrik",
      imageSrc: "/assets/images/brands/brand-altimetric.png",
      imageAlt: "Altimetrik",
    },
    {
      id: "10",
      name: "APEX",
      imageSrc: "/assets/images/brands/brand-apex.png",
      imageAlt: "APEX",
    },
    {
      id: "11",
      name: "Arezzo Sky",
      imageSrc: "/assets/images/brands/brand-arezzosky.png",
      imageAlt: "Arezzo Sky",
    },
    {
      id: "12",
      name: "AXA Business Services",
      imageSrc: "/assets/images/brands/brand-axa.png",
      imageAlt: "AXA Business Services",
    },
    {
      id: "13",
      name: "Bajaj",
      imageSrc: "/assets/images/brands/brand-bajaj.png",
      imageAlt: "Bajaj",
    },
    {
      id: "14",
      name: "Bajaj Allianz",
      imageSrc: "/assets/images/brands/brand-bajaj-allianz.png",
      imageAlt: "Bajaj Allianz",
    },
    {
      id: "15",
      name: "Bajaj Finserv",
      imageSrc: "/assets/images/brands/brand-bajaj-finserv.png",
      imageAlt: "Bajaj Finserv",
    },
    {
      id: "16",
      name: "Bajaj Motorcycles",
      imageSrc: "/assets/images/brands/brand-bajaj-motorcycles.png",
      imageAlt: "Bajaj Motorcycles",
    },
    {
      id: "17",
      name: "Battelle",
      imageSrc: "/assets/images/brands/brand-battelle.png",
      imageAlt: "Battelle",
    },
    {
      id: "18",
      name: "BMC",
      imageSrc: "/assets/images/brands/brand-bmc.png",
      imageAlt: "BMC",
    },
    {
      id: "19",
      name: "Bosch",
      imageSrc: "/assets/images/brands/brand-bosch.png",
      imageAlt: "Bosch",
    },
    {
      id: "20",
      name: "Brose",
      imageSrc: "/assets/images/brands/brand-brose.png",
      imageAlt: "Brose",
    },
    {
      id: "21",
      name: "CA Technologies",
      imageSrc: "/assets/images/brands/brand-ca-technologies.png",
      imageAlt: "CA Technologies",
    },
    {
      id: "22",
      name: "Calyon (Crédit Agricole CIB)",
      imageSrc: "/assets/images/brands/brand-calyon.png",
      imageAlt: "Calyon",
    },
    {
      id: "23",
      name: "Citco",
      imageSrc: "/assets/images/brands/brand-citco.png",
      imageAlt: "Citco",
    },
    {
      id: "24",
      name: "Citi",
      imageSrc: "/assets/images/brands/brand-citi.png",
      imageAlt: "Citi",
    },
    // Page 2 - duplicate set for pagination demo
    {
      id: "25",
      name: "ABS",
      imageSrc: "/assets/images/brands/brand-abs.png",
      imageAlt: "ABS",
    },
    {
      id: "26",
      name: "Aditya Birla Fashion & Retail",
      imageSrc: "/assets/images/brands/brand-abfrl.png",
      imageAlt: "Aditya Birla Fashion & Retail",
    },
    {
      id: "27",
      name: "Adler",
      imageSrc: "/assets/images/brands/brand-adler.png",
      imageAlt: "Adler",
    },
    {
      id: "28",
      name: "Affinity X",
      imageSrc: "/assets/images/brands/brand-affinity.png",
      imageAlt: "Affinity X",
    },
    {
      id: "29",
      name: "Aggreko",
      imageSrc: "/assets/images/brands/brand-aggreko.png",
      imageAlt: "Aggreko",
    },
    {
      id: "30",
      name: "Allegis Group",
      imageSrc: "/assets/images/brands/brand-allegis-group.png",
      imageAlt: "Allegis Group",
    },
    {
      id: "31",
      name: "Allianz",
      imageSrc: "/assets/images/brands/brand-allianz.png",
      imageAlt: "Allianz",
    },
    {
      id: "32",
      name: "Allscripts",
      imageSrc: "/assets/images/brands/brand-allscripts.png",
      imageAlt: "Allscripts",
    },
    {
      id: "33",
      name: "Altimetrik",
      imageSrc: "/assets/images/brands/brand-altimetric.png",
      imageAlt: "Altimetrik",
    },
    {
      id: "34",
      name: "APEX",
      imageSrc: "/assets/images/brands/brand-apex.png",
      imageAlt: "APEX",
    },
    {
      id: "35",
      name: "Arezzo Sky",
      imageSrc: "/assets/images/brands/brand-arezzosky.png",
      imageAlt: "Arezzo Sky",
    },
    {
      id: "36",
      name: "AXA Business Services",
      imageSrc: "/assets/images/brands/brand-axa.png",
      imageAlt: "AXA Business Services",
    },
    {
      id: "37",
      name: "Bajaj",
      imageSrc: "/assets/images/brands/brand-bajaj.png",
      imageAlt: "Bajaj",
    },
    {
      id: "38",
      name: "Bajaj Allianz",
      imageSrc: "/assets/images/brands/brand-bajaj-allianz.png",
      imageAlt: "Bajaj Allianz",
    },
    {
      id: "39",
      name: "Bajaj Finserv",
      imageSrc: "/assets/images/brands/brand-bajaj-finserv.png",
      imageAlt: "Bajaj Finserv",
    },
    {
      id: "40",
      name: "Bajaj Motorcycles",
      imageSrc: "/assets/images/brands/brand-bajaj-motorcycles.png",
      imageAlt: "Bajaj Motorcycles",
    },
    {
      id: "41",
      name: "Battelle",
      imageSrc: "/assets/images/brands/brand-battelle.png",
      imageAlt: "Battelle",
    },
    {
      id: "42",
      name: "BMC",
      imageSrc: "/assets/images/brands/brand-bmc.png",
      imageAlt: "BMC",
    },
    {
      id: "43",
      name: "Bosch",
      imageSrc: "/assets/images/brands/brand-bosch.png",
      imageAlt: "Bosch",
    },
    {
      id: "44",
      name: "Brose",
      imageSrc: "/assets/images/brands/brand-brose.png",
      imageAlt: "Brose",
    },
    {
      id: "45",
      name: "CA Technologies",
      imageSrc: "/assets/images/brands/brand-ca-technologies.png",
      imageAlt: "CA Technologies",
    },
    {
      id: "46",
      name: "Calyon (Crédit Agricole CIB)",
      imageSrc: "/assets/images/brands/brand-calyon.png",
      imageAlt: "Calyon",
    },
    {
      id: "47",
      name: "Citco",
      imageSrc: "/assets/images/brands/brand-citco.png",
      imageAlt: "Citco",
    },
    {
      id: "48",
      name: "Citi",
      imageSrc: "/assets/images/brands/brand-citi.png",
      imageAlt: "Citi",
    },
  ],
};
