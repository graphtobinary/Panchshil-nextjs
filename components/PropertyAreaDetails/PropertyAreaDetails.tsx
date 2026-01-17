import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const areaDetails = {
  about_intro_heading:
    "A HOME THAT BALANCES SCALE, DESIGN PRECISION AND DISCRETION",
  about_intro_description:
    "Trump Towers Pune comprises 2 striking glass façade towers of 23 storeys each, offering 46 spectacular single-floor residences. As India’s first ready-to-move-in Trump branded residences, they are located in the heart of Pune. Each residence is surrounded by 360-degree panoramic views of the city, with breathtaking vistas of Aga Khan Palace and Joggers Park serving as the backdrop for every home.",
  about_intro_link: "https://www.panchshil.com/about",
};

const areaDetailsStats = [
  {
    icon: "https://www.panchshil.com/asset/images/properties/configuration-151898346.svg",
    title: "Land Area",
    value: "2.5 Acres",
  },
  {
    icon: "https://www.panchshil.com/asset/images/properties/development-size-894770295.svg",
    title: "Development Size",
    value: "34,000 Sq.M Or 3,69,000 Sq.Ft",
  },
  {
    icon: "https://www.panchshil.com/asset/images/properties/project-type-159396972.svg",
    title: "Towers",
    value: "02",
  },
  {
    icon: "https://www.panchshil.com/asset/images/properties/project-type-159396972.svg",
    title: "No. Of Apartments/Units",
    value: "46",
  },
  {
    icon: "https://www.panchshil.com/asset/images/properties/project-type-159396972.svg",
    title: "Configuration",
    value: "5.5Bhk Residences",
  },
  {
    icon: "https://www.panchshil.com/asset/images/properties/project-type-159396972.svg",
    title: "Rera Carpet Area",
    value: "410.25 Sq. M. Or 4,415 Sq. Ft.",
  },
];

const PropertyAreaDetails = () => {
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.disconnect();
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -100px 0px",
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);
  return (
    <section ref={sectionRef} className="relative w-full  overflow-hidden">
      {/* Top Content Area with Background Color */}
      <div className="relative bg-white pt-16 md:pt-24 py-10">
        <div className="max-w-[1200px] mx-auto px-6 text-center">
          {/* Title */}
          <div className="md:w-3/5 w-full mx-auto">
            <h2
              className={`text-4xl md:text-2xl lg:text-4xl font-display-semi mb-6 text-black-chocolate ${
                isInView ? "animate-fade-in-up" : "opacity-0"
              }`}
            >
              {areaDetails?.about_intro_heading}
            </h2>
          </div>

          {/* Description */}
          <p
            className={`text-base md:text-lg  mb-12 max-w-4xl mx-auto leading-relaxed text-black-chocolate ${
              isInView ? "animate-fade-in-up-delay-1" : "opacity-0"
            }`}
          >
            {areaDetails?.about_intro_description}
          </p>

          {/* Stats Row */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-8 mb-12 md:w-3/5 w-full mx-auto ">
            {areaDetailsStats.map((stat) => (
              <div
                className="flex items-center justify-center gap-3"
                key={stat.title}
              >
                <div className="mt-0.5 shrink-0 transition-colors text-[#030303]">
                  <div className="flex flex-col justify-center items-center gap-2">
                    <Image
                      src={stat.icon}
                      alt={stat.title}
                      width={30}
                      height={30}
                    />
                    <div className="flex flex-col">
                      <p className="text-sm md:text-md transition-colors text-[#030303]">
                        {stat.title}
                      </p>
                      <p className="text-xs md:text-md transition-colors text-[#030303]">
                        {stat.value}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PropertyAreaDetails;
