import Image from "next/image";
import { MediaPageData } from "@/app/media/media-page.data";

type MediaIntroSectionProps = {
  content: MediaPageData["intro"];
};

export default function MediaIntroSection({ content }: MediaIntroSectionProps) {
  return (
    <section className="py-14 md:py-20 bg-white">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="mx-auto max-w-5xl text-center text-2xl md:text-[28px] font-display-semi text-black-chocolate">
          {content.heading}
        </h2>

        <div className="mx-auto mt-6 max-w-5xl text-center text-lg md:text-lg leading-relaxed text-black-chocolate">
          {content.paragraphs.map((paragraph) => (
            <p key={paragraph} className="mt-4 first:mt-0">
              {paragraph}
            </p>
          ))}
        </div>

        <div className="mt-10 md:mt-12 overflow-hidden bg-white">
          <Image
            src={content.imageSrc}
            alt={content.imageAlt}
            width={1400}
            height={700}
            className="h-auto w-full object-cover"
            priority
          />
        </div>
      </div>
    </section>
  );
}
