interface Category {
  key: string;
  label: string;
}

interface CategoryTabsProps {
  categories: Category[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  isInView: boolean;
}

export function CategoryTabs({
  categories,
  selectedCategory,
  onCategoryChange,
  isInView,
}: CategoryTabsProps) {
  if (categories.length === 0) return null;

  return (
    <div
      className={`flex flex-wrap items-center justify-center gap-6 md:gap-12 mb-20 ${
        isInView ? "animate-fade-in-up-delay-2" : "opacity-0"
      }`}
    >
      {categories.map((category) => {
        const isActive = category.key === selectedCategory;
        return (
          <button
            key={category.key}
            onClick={() => onCategoryChange(category.key)}
            className={`text-lg md:text-[16px] font-medium tracking-wider capitalize transition-colors ${
              isActive
                ? "text-gold-beige border-b-3 border-gold-beige"
                : "text-gold-beige/60 hover:text-gold-beige"
            }`}
          >
            {category.label}
          </button>
        );
      })}
    </div>
  );
}
