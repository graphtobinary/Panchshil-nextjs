import Image from "next/image";
import Link from "next/link";

const stats = [
  { title: "11.21mn", subtitle: "Sq.ft Delivered" },
  { title: "4.07mn", subtitle: "Sq.ft Under Construction" },
  { title: "23+", subtitle: "Years of Excellence" },
];

const ListHeroBanner = () => {
  return (
    <div className="relative w-full h-[70vh] md:h-[80vh] overflow-hidden bg-black-chocolate">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={"/assets/images/list-hero-banner.png"}
          alt={"List Hero Banner"}
          fill
          className="object-cover md:object-fill"
          priority
        />
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-linear-to-b from-white/60 via-black/40 to-black/80 "></div>

      {/* Content Overlay */}
      <div className="relative z-10 h-full flex flex-col justify-end items-center max-w-[1200px] mx-auto px-6 md:px-12 py-10 md:py-16">
        {/* Title */}
        <h3
          className={`text-3xl  md:text-6xl  font-display-semi text-white mb-6 max-w-3xl 
               animate-fade-in-up
              `}
        >
          Residential Projects
        </h3>

        {/* Description */}
        <p
          className={`text-xs md:text-md text-center text-white/95 mb-8 max-w-3xl md:leading-relaxed 
                 animate-fade-in-up-delay-1
              `}
        >
          Explore premium residence designed for refined living across the most
          sought-after neighborhood
        </p>
        <div className={`animate-fade-in-up-delay-2`}>
          {stats && stats.length > 0 && (
            <div className="flex flex-wrap gap-2 md:gap-8 text-white justify-center">
              {stats.map((stat, index) => (
                <div key={index} className="flex items-center gap-2 flex-col">
                  <span className="text-base md:text-4xl font-display-semi">
                    {stat.title}
                  </span>
                  <span className="text-base md:text-lg font-display-semi">
                    {stat.subtitle}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ListHeroBanner;
