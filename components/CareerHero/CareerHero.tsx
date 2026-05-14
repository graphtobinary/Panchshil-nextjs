import { CommonHeroMedia } from "@/components/CommonHeroMedia";
import { BannersProps } from "@/interfaces";

type CareerHeroProps = {
  hero: BannersProps | null;
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
        imageSrc={hero?.banner_image}
        imageAlt={hero?.banner_image_caption || ""}
        overlayClassName="bg-black/35"
      />

      <div className="absolute inset-0 z-10 flex items-end justify-center pb-14 md:pb-20 px-6 md:max-w-2xl mx-auto">
        <div className="w-full max-w-[960px] text-center">
          <h1 className="animate-fade-in-up text-2xl md:text-[28px] font-display-semi text-white mb-6 tracking-tight">
            {hero?.banner_image_caption}
          </h1>

          <p className="animate-fade-in-up-delay-1 text-lg md:text-lg lg:text-lg text-white/90 max-w-4xl mx-auto mb-8 leading-relaxed">
            {hero?.banner_image_description}
          </p>
        </div>
      </div>
    </section>
  );
}
