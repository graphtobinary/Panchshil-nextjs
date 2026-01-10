import Image from "next/image";

const whatSetsApartData = [
  {
    id: 1,
    number: "01",
    description: "Offers 360-degree view of cityscape",
  },
  {
    id: 2,
    number: "02",
    description: "Located in an affluent neighborhood of Kalyani Nagar",
  },
  {
    id: 3,
    number: "03",
    description: "Advanced safety and security with 24-hour on-site personnel",
  },
  {
    id: 4,
    number: "04",
    description:
      "The interiors feature designs by Matteo Nunziati, known for his elegant and contemporary style, ensuring a sophisticated living experience",
  },
  {
    id: 5,
    number: "05",
    description:
      "Each apartment boasts large windows and private balconies, offering breathtaking views of the city and surrounding landscapes",
  },
  {
    id: 6,
    number: "06",
    description:
      "With a limited number of units per floor, Trump Towers Pune ensures a sense of exclusivity and privacy for its residents",
  },
  {
    id: 7,
    number: "07",
    description: "Single apartment per floor with private elevator access",
  },
];

const WhatSetsApart = () => {
  return (
    <section className="w-full bg-[#FFFAF7] py-16 md:py-24">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text Content */}
          <div>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-display-semi text-black uppercase mb-8 md:mb-12">
              WHAT SETS TRUMP TOWER APART?
            </h2>
            <div className="space-y-6">
              {whatSetsApartData.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 border-b border-[#ab9b815e] pb-4"
                >
                  <span className="text-[#1F180D] font-regular text-md shrink-0">
                    {item.number}
                  </span>
                  <p className="text-[#1F180D] text-base ">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Image */}
          <div className="relative w-full h-[400px] md:h-[600px] lg:h-[700px]">
            <Image
              src="https://www.panchshil.com/asset/images/properties/trump-towers-674500024.webp"
              alt="Trump Towers"
              fill
              className="object-cover "
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatSetsApart;
