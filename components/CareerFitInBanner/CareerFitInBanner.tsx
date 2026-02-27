import Link from "next/link";
import { Button } from "@/components/Button";
import { CommonHeroMedia } from "@/components/CommonHeroMedia";
import { CareerFitInBannerContent } from "@/app/careers/career-page.data";

type CareerFitInBannerProps = {
  content: CareerFitInBannerContent;
};

export default function CareerFitInBanner({ content }: CareerFitInBannerProps) {
  return (
    <section className="relative w-full h-[56vh] md:h-[62vh] overflow-hidden">
      <CommonHeroMedia
        imageSrc={content.imageSrc}
        imageAlt={content.title}
        overlayClassName="bg-linear-to-b from-white/45 via-black/25 to-black/90"
      />

      <div className="absolute inset-0 z-10 flex items-center justify-center px-6">
        <div className="w-full max-w-[980px] text-center">
          <h1 className="animate-fade-in-zoom text-2xl md:text-[28px] font-display-semi text-white mb-6 tracking-tight">
            {content.title}
          </h1>

          {content.description ? (
            <p className="animate-fade-in-zoom-delay-1 mt-4 text-sm md:text-lg text-white/85 leading-relaxed max-w-[860px] mx-auto">
              {content.description}
            </p>
          ) : null}

          <div className="animate-fade-in-zoom-delay-2 mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <Link href={content.primaryCtaHref}>
              <Button variant="hero-outline" size="lg">
                {content.primaryCtaLabel}
              </Button>
            </Link>
            <Link href={content.secondaryCtaHref}>
              <Button variant="hero-outline" size="lg">
                {content.secondaryCtaLabel}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
