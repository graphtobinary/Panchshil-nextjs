import Image from "next/image";
import Link from "next/link";

export type CareerTrackPostCardProps = {
  imageSrc: string;
  title: string;
  imageAlt?: string;
  /** Career tracks: body copy under the title */
  description?: string;
  /** Blog-style: shows “Published on: …” when set (ignored if `description` is set) */
  publishedOn?: string;
  ctaHref: string;
  ctaLabel?: string;
  className?: string;
};

export function CareerTrackPostCard({
  imageSrc,
  title,
  imageAlt,
  description,
  publishedOn,
  ctaHref,
  ctaLabel = "Read More",
  className = "",
}: CareerTrackPostCardProps) {
  const alt = imageAlt ?? title;

  return (
    <article className={className}>
      <div
        className="relative w-full aspect-4/3 overflow-hidden"
        style={{ aspectRatio: "800 / 457" }}
      >
        <Image src={imageSrc} alt={alt} fill className="object-cover" />
      </div>
      <h3 className="mt-4 text-2xl md:text-[20px] leading-tight text-black-chocolate font-display-semi">
        {title}
      </h3>
      {description ? (
        <p className="mt-2 text-sm md:text-base text-black/75 leading-relaxed">
          {description}
        </p>
      ) : publishedOn ? (
        <p className="mt-8 text-sm  text-black/60 leading-relaxed">
          Published on: {publishedOn}
        </p>
      ) : null}
      <Link
        href={ctaHref}
        className="mt-4 inline-block text-sm md:text-base font-display-semi text-gold-beige underline underline-offset-4 hover:text-black-chocolate transition-colors"
      >
        {ctaLabel}
      </Link>
    </article>
  );
}
