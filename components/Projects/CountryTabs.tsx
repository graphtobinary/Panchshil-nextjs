interface Country {
  key: string;
  label: string;
}

interface CountryTabsProps {
  countries: Country[];
  selectedCountry: string;
  onCountryChange: (country: string) => void;
  isInView: boolean;
}

export function CountryTabs({
  countries,
  selectedCountry,
  onCountryChange,
  isInView,
}: CountryTabsProps) {
  if (countries.length === 0) return null;

  return (
    <div
      className={`flex flex-wrap items-center justify-center gap-8 md:gap-10 mb-20 ${
        isInView ? "animate-fade-in-up-delay-2" : "opacity-0"
      }`}
    >
      {countries.map((country) => {
        const isActive = country.key === selectedCountry;
        return (
          <button
            key={country.key}
            onClick={() => onCountryChange(country.key)}
            className={`text-lg md:text-[16px] font-medium tracking-wider capitalize transition-colors ${
              isActive
                ? "text-gold-beige border-b-3 border-gold-beige"
                : "text-gold-beige/60 hover:text-gold-beige"
            }`}
          >
            {country.label}
          </button>
        );
      })}
    </div>
  );
}
