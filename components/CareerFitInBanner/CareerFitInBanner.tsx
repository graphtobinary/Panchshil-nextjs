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
          <h2 className="text-white text-4xl md:text-[40px] leading-tight font-display-semi tracking-tight">
            {content.title}
          </h2>

          {content.description ? (
            <p className="mt-4 text-sm md:text-lg text-white/85 leading-relaxed max-w-[860px] mx-auto">
              {content.description}
            </p>
          ) : null}

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <Link href={content.primaryCtaHref}>
              <Button variant="hero" size="lg" className="w-full sm:w-auto">
                {content.primaryCtaLabel}
              </Button>
            </Link>
            <Link href={content.secondaryCtaHref}>
              <Button variant="hero" size="lg" className="w-full sm:w-auto">
                {content.secondaryCtaLabel}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
