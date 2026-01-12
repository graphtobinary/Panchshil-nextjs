import { RegionKey } from "@/interfaces";

interface RegionTabsProps {
  regions: RegionKey[];
  selectedRegion: RegionKey;
  onRegionChange: (region: RegionKey) => void;
  isInView: boolean;
}

export function RegionTabs({
  regions,
  selectedRegion,
  onRegionChange,
  isInView,
}: RegionTabsProps) {
  return (
    <div
      className={`flex items-center justify-center gap-12 mb-12 ${
        isInView ? "animate-fade-in-up-delay-1" : "opacity-0"
      }`}
    >
      {regions.map((region) => {
        const isActive = region === selectedRegion;
        return (
          <button
            key={region}
            onClick={() => onRegionChange(region)}
            className={`text-lg md:text-[16px] font-medium tracking-wider capitalize transition-colors ${
              isActive
                ? "text-gold-beige border-b-3 border-gold-beige"
                : "text-gold-beige/60 hover:text-gold-beige"
            }`}
          >
            {region}
          </button>
        );
      })}
    </div>
  );
}
