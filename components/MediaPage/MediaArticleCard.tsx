import Image from "next/image";
import Link from "next/link";
import { FeaturedArticle } from "@/app/media/media-page.data";

type MediaArticleCardProps = {
  article: FeaturedArticle;
};

export default function MediaArticleCard({ article }: MediaArticleCardProps) {
  return (
    <article className="flex flex-col md:flex-row border border-[#D9D3CC] bg-white group h-full">
      <div className="relative w-full md:w-[45%] aspect-[4/3] md:aspect-auto">
        <Image
          src={article.imageSrc}
          alt={article.imageAlt}
          fill
          className="object-cover"
        />
      </div>

      <div className="flex flex-1 flex-col justify-between p-6 md:p-8">
        <div>
          <h3 className="font-display-semi text-xl md:text-[22px] text-black leading-tight">
            {article.title}
          </h3>

          <div className="mt-4 flex flex-wrap items-center gap-2 text-xs md:text-sm text-black-chocolate/70">
            <span>Published on: {article.date}</span>
            <span className="w-px h-3 bg-black-chocolate/30 mx-1"></span>
            <span>{article.readTime}</span>
            <span className="w-px h-3 bg-black-chocolate/30 mx-1"></span>
            <span>{article.source}</span>
          </div>

          <p className="mt-6 text-sm md:text-base leading-relaxed text-black-chocolate line-clamp-4">
            {article.description}
          </p>
        </div>

        <div className="mt-8">
          <Link
            href={article.link}
            className="inline-block text-[#B8A38B] border-b border-[#B8A38B] pb-0.5 text-sm font-medium hover:text-black hover:border-black transition-colors"
          >
            Read More
          </Link>
        </div>
      </div>
    </article>
  );
}
