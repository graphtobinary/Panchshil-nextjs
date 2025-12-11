import Image from "next/image";
import Link from "next/link";
import { Button } from "../Button";

const stats = [
  { title: "11.21mn", subtitle: "Sq.ft Delivered" },
  { title: "4.07mn", subtitle: "Sq.ft Under Construction" },
  { title: "23+", subtitle: "Years of Excellence" },
];

const ListContactBanner = () => {
  return (
    <div className="relative w-full h-[70vh] md:h-[80vh] overflow-hidden bg-black-chocolate">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={"/assets/images/our-residental-developments.png"}
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
          className={`text-3xl  md:text-3xl  font-display-semi text-center text-white mb-6 max-w-3xl 
               animate-fade-in-up
              `}
        >
          Our Residential Developments set new benchmarks in architecture,
          construction and lifestyle design.
        </h3>

        {/* Description */}
        <p
          className={`text-xs md:text-md text-center text-white/95 mb-8 max-w-3xl md:leading-relaxed 
                 animate-fade-in-up-delay-1
              `}
        >
          With collaboration global architects, brands and engineering frims
          each developments priorities craftmanship, sustainability and long
          term value. From high rise residence to private enclaves, every
          project reflects panchsil&apos;s commitment to premium living and
          enduring value form homeowner.
        </p>
        {/* CTA Button */}
        <div className="flex justify-center pt-5">
          <Link href={"https://www.panchshil.com/luxury-residences"}>
            <Button variant="hero" size="sm" className="w-48">
              Contact Our Sales Team
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ListContactBanner;
