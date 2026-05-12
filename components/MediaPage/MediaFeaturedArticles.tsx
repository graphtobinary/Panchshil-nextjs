import { MediaPageData } from "@/app/media/media-page.data";
import MediaArticleCard from "./MediaArticleCard";

type MediaFeaturedArticlesProps = {
  content: MediaPageData["featuredArticles"];
};

export default function MediaFeaturedArticles({
  content,
}: MediaFeaturedArticlesProps) {
  if (!content || !content.articles || content.articles.length === 0)
    return null;

  return (
    <section className="py-14 md:py-20 bg-white">
      <div className="mx-auto max-w-7xl px-6">
        <p className="text-sm font-medium tracking-[0.2em] text-gold-beige uppercase">
          {content.kicker}
        </p>
        <h2 className="mt-3 text-2xl md:text-[32px] font-display-semi text-black">
          {content.heading}
        </h2>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
          {content.articles.map((article, idx) => (
            <MediaArticleCard key={idx} article={article} />
          ))}
        </div>
      </div>
    </section>
  );
}
