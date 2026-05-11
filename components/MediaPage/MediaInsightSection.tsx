import { FeaturedArticle } from "@/app/media/media-page.data";
import MediaArticleCard from "./MediaArticleCard";
import MediaLargeArticleCard from "./MediaLargeArticleCard";

type MediaInsightSectionProps = {
  content: {
    kicker: string;
    heading: string;
    articles: FeaturedArticle[];
  };
  bgColor?: string;
};

export default function MediaInsightSection({
  content,
  bgColor = "bg-white",
}: MediaInsightSectionProps) {
  if (!content || !content.articles || content.articles.length === 0)
    return null;

  const largeArticle = content.articles[0];
  const smallArticles = content.articles.slice(1);

  return (
    <section className={`py-14 md:py-20 ${bgColor}`}>
      <div className="mx-auto max-w-7xl px-6">
        <p className="text-sm font-medium tracking-[0.2em] text-gold-beige uppercase">
          {content.kicker}
        </p>
        <h2 className="mt-3 text-2xl md:text-[32px] font-display-semi text-black">
          {content.heading}
        </h2>

        <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
          <div className="w-full">
            <MediaLargeArticleCard article={largeArticle} />
          </div>

          {smallArticles.length > 0 && (
            <div className="flex flex-col gap-6">
              {smallArticles.map((article, idx) => (
                <div key={idx} className="flex-1">
                  <MediaArticleCard article={article} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
