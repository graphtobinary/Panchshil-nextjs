import Link from "next/link";
import { Button } from "@/components/Button";
import { CommonHeroMedia } from "@/components/CommonHeroMedia";
import { CareerHeroContent } from "@/app/careers/career-page.data";

type CareerHeroProps = {
  hero: CareerHeroContent;
  compact?: boolean;
};

export default function CareerHero({ hero, compact = false }: CareerHeroProps) {
  return (
    <section
      className={`relative w-full flex-1 overflow-hidden bg-white ${
        compact
          ? "min-h-[420px] md:min-h-[500px]"
          : "min-h-[500px] md:min-h-[620px]"
      }`}
    >
      <CommonHeroMedia
        imageSrc={hero.imageSrc}
        imageAlt={hero.title}
        overlayClassName="bg-black/35"
      />

      <div className="absolute inset-0 z-10 flex items-end justify-center pb-14 md:pb-20 px-6 md:max-w-2xl mx-auto">
        <div className="w-full max-w-[960px] text-center">
          <h1 className="animate-fade-in-up text-2xl md:text-[28px] font-display-semi text-white mb-6 tracking-tight">
            {hero.title}
          </h1>

          <p className="animate-fade-in-up-delay-1 text-lg md:text-lg lg:text-lg text-white/90 max-w-4xl mx-auto mb-8 leading-relaxed">
            {hero.description}
          </p>

          <div className="animate-fade-in-up-delay-2 mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            {hero?.primaryCta && (
              <Link
                href={hero.primaryCta.href}
                className="pointer-events-auto z-50 relative"
              >
                <Button
                  variant="hero-outline"
                  size="lg"
                  className="w-full sm:w-auto"
                >
                  {hero.primaryCta.label}
                </Button>
              </Link>
            )}

            {hero?.secondaryCta && (
              <Link href={hero.secondaryCta.href}>
                <Button
                  variant="hero-outline"
                  size="lg"
                  className="w-full sm:w-auto"
                >
                  {hero.secondaryCta.label}
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
