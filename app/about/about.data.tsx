export type AboutUsHeroContent = {
  imageSrc: string;
  title: string;
  description: string;
  primaryCta?: {
    label: string;
    href: string;
  };
  secondaryCta?: {
    label: string;
    href: string;
  };
};

export type AboutUsVisibleImpactContent = {
  title: string;
  description: React.ReactNode;
  points?: string[];
  imageSrc: string;
  imageAlt: string;
};

export type AboutUsSustainabilitySlide = {
  imageSrc: string;
  title: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
};

export type AboutUsSustainabilityContent = {
  slides: AboutUsSustainabilitySlide[];
};

export type AboutUsAllianceSlide = {
  title: string;
  description: string;
  linkLabel: string;
  linkHref: string;
};

export type AboutUsAlliancesTab = {
  tabLabel: string;
  slides: AboutUsAllianceSlide[];
};

export type AboutUsAlliancesContent = {
  title: string;
  tabs: AboutUsAlliancesTab[];
};

export type AboutUsPageDummyData = {
  hero: AboutUsHeroContent;
  stats: Array<{
    value: number;
    suffix?: string;
    label: string;
  }>;
  visibleImpact: AboutUsVisibleImpactContent;
  sustainability: AboutUsSustainabilityContent;
  ourValuedClients: OurValuedClientsType[];
  alliances: AboutUsAlliancesContent;
};

export type OurValuedClientsType = {
  property_key_tenant_caption: string;
  property_key_tenant_image: string;
};

export const aboutUsPageDummyData: AboutUsPageDummyData = {
  hero: {
    imageSrc:
      "https://www.panchshil.com/asset/images/banners/trump-towers-banner-370963954.webp",
    title: "Crafting Exceptional Spaces Since 2002",
    description:
      "From homes to commercial destinations, from India to global shores-we build more than structures. We shape lifestyles, communities and legacies.",
  },
  stats: [
    {
      value: 35,
      suffix: "+",
      label: "Sq. Ft. Delivered",
    },
    {
      value: 40,
      suffix: "+",
      label: "Sq. Ft. Under Construction",
    },
    {
      value: 3,
      suffix: "+",
      label: "Countries Present In",
    },
    {
      value: 5,
      suffix: "+",
      label: "Asset Classes",
    },
  ],
  visibleImpact: {
    title: "BUILDING LANDMARKS, REDEFINING LIFESTYLE",
    description: (
      <div className="flex flex-col gap-4">
        <p>
          We dared to dream big, a dream to create not just homes but lifestyles
          to create integrated workspaces and enliven hospitality with luxury.
          Our approach focuses on planned development, creating value assets for
          the city and becoming industry leaders in real estate. Over the years,
          our dreams have come true, our properties have become landmarks in
          Pune. We&apos;ve introduced not only the best construction practices
          but also brought the world&apos;s top brands to Pune, changing the
          city&apos;s skyline.
        </p>
        <p>
          The credit for our success goes to our partners, investors, clients
          and our team, each playing a role in making us one of India&apos;s
          finest luxury real estate brands. The road ahead is long and exciting,
          with many more milestones to establish. However every milestone take
          us back to where our story began: a vision, a dream and now a reality.
        </p>
        <div className="mt-6">
          <p className="font-display-semi text-black text-lg">ATUL CHORDIA,</p>
          <p className="text-sm text-black/80">Chairman, Panchshil Realty</p>
        </div>
      </div>
    ),
    points: [],
    imageSrc: "/assets/images/about/atul-chordia-chairman.png", // Using dummy image
    imageAlt: "Atul Chordia, Chairman, Panchshil Realty",
  },
  sustainability: {
    slides: [
      {
        imageSrc: "/assets/images/esg/esg-hero-banner.png",
        title: "CARING FOR PEOPLE, PLANET & LEGACY\nOUR SUSTAINABILITY PROMISE",
        description:
          "At panchshil, growth isn't just about building landmark structures, it's about creating enduring value for communities, environment and the future. Our commitment extends beyond architecture and urban infrastructure, it's rooted in sustainable development, ethical governance and a people first culture",
        ctaLabel: "Visit ESG Page",
        ctaHref: "/esg",
      },
    ],
  },
  ourValuedClients: [
    {
      property_key_tenant_caption: "ABS",
      property_key_tenant_image: "/assets/images/about/clients-ABS.png",
    },
    {
      property_key_tenant_caption: "ABFRL",
      property_key_tenant_image: "/assets/images/about/clients-ABFRL.png",
    },
    {
      property_key_tenant_caption: "ADLER",
      property_key_tenant_image: "/assets/images/about/clients-ADLER.png",
    },
    {
      property_key_tenant_caption: "AFFINITY",
      property_key_tenant_image: "/assets/images/about/clients-affinity.png",
    },
  ],
  alliances: {
    title: "ALLIANCES THAT SHAPE OUR WORK",
    tabs: [
      {
        tabLabel: "INSTITUTIONAL PARTNERS",
        slides: [
          {
            title: "Blackstone",
            description:
              "Blackstone is one of the world's leading investment firms that seek to create positive economic impact and long term value for its investors, the companies it invests in and the communities in which it works. Blackstone's global business platform encompasses private equity and real estate funds, hedge find solutions and credit funds",
            linkLabel: "Read More",
            linkHref: "#",
          },
          {
            title: "Blackstone",
            description:
              "Blackstone is one of the world's leading investment firms that seek to create positive economic impact and long term value for its investors, the companies it invests in and the communities in which it works. Blackstone's global business platform encompasses private equity and real estate funds, hedge find solutions and credit funds",
            linkLabel: "Read More",
            linkHref: "#",
          },
          {
            title: "Blackstone",
            description:
              "Blackstone is one of the world's leading investment firms that seek to create positive economic impact and long term value for its investors, the companies it invests in and the communities in which it works. Blackstone's global business platform encompasses private equity and real estate funds, hedge find solutions and credit funds",
            linkLabel: "Read More",
            linkHref: "#",
          },
        ],
      },
      {
        tabLabel: "HOSPITALITY BRAND PARTNERS",
        slides: [
          {
            title: "Marriott",
            description:
              "Marriott International, Inc. is based in Bethesda, Maryland, USA, and encompasses a portfolio of more than 8,000 properties under 30 leading brands spanning 139 countries and territories.",
            linkLabel: "Read More",
            linkHref: "#",
          },
        ],
      },
      {
        tabLabel: "BRAND ASSOCIATION",
        slides: [
          {
            title: "Trump",
            description:
              "The Trump Organization is a group of about 250 entities, all of which use Donald Trump's name and are owned by him.",
            linkLabel: "Read More",
            linkHref: "#",
          },
        ],
      },
    ],
  },
};
