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
          <h1 className="text-white text-4xl md:text-6xl font-display-semi tracking-tight leading-tight">
            {hero.title}
          </h1>

          <p className="mt-5 text-sm md:text-lg text-white/90 leading-relaxed max-w-[860px] mx-auto">
            {hero.description}
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            {hero?.primaryCta && (
              <Link href={hero.primaryCta.href}>
                <Button variant="hero" size="lg" className="w-full sm:w-auto">
                  {hero.primaryCta.label}
                </Button>
              </Link>
            )}

            {hero?.secondaryCta && (
              <Link href={hero.secondaryCta.href}>
                <Button variant="hero" size="lg" className="w-full sm:w-auto">
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
