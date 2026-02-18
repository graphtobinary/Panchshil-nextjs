"use client";

import { useEffect, useRef, useState } from "react";
import { setOptions, importLibrary } from "@googlemaps/js-api-loader";
import {
  LocationType,
  MapLocation,
  PropertyLocationCoOrdinatesProps,
} from "@/interfaces";
import Image from "next/image";
const base = "/assets/images/map/";

const LOCATIONS: MapLocation[] = [
  {
    id: "atm",
    title: "ATM",
    type: "atm",
    lat: 18.5204,
    lng: 73.8567,
    zoom: 13,
    icon: "atm.png",
  },
  {
    id: "banks",
    title: "BANKS",
    type: "banks",
    lat: 18.5167,
    lng: 73.8417,
    zoom: 14,
    icon: "banks.png",
  },
  {
    id: "entertainment",
    title: "ENTERTAINMENT & LIFESTYLE",
    type: "entertainment",
    lat: 18.5636,
    lng: 73.789,
    zoom: 13,
    icon: "entertainment.png",
  },
  {
    id: "hospital",
    title: "HOSPITAL",
    type: "hospital",
    lat: 18.5081,
    lng: 73.925,
    zoom: 14,
    icon: "hospital.png",
  },
  {
    id: "park",
    title: "PARKS & OUTDOORS",
    type: "park",
    lat: 18.532,
    lng: 73.83,
    zoom: 14,
    icon: "park.png",
  },
  {
    id: "restaurants",
    title: "RESTAURANTS & CAFE",
    type: "restaurants",
    lat: 18.5211,
    lng: 73.8553,
    zoom: 15,
    icon: "restaurants.png",
  },
  {
    id: "airport",
    title: "AIRPORT",
    type: "airport",
    lat: 18.5822,
    lng: 73.9197,
    zoom: 11,
    icon: "airport.png",
  },
];

const MAP_STYLE: google.maps.MapTypeStyle[] = [
  {
    featureType: "all",
    elementType: "geometry",
    stylers: [{ color: "#1d2c4d" }],
  },
  {
    featureType: "all",
    elementType: "labels.text.fill",
    stylers: [{ color: "#8ec3b9" }],
  },
  {
    featureType: "road",
    elementType: "geometry",
    stylers: [{ color: "#304a7d" }],
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [{ color: "#0e1626" }],
  },
];
interface LocationMapProps {
  title?: string;
  description?: string;
  property_location_co_ordinates: PropertyLocationCoOrdinatesProps;
}

// Icon components for categories
const CategoryIcon = ({ iconName }: { iconName: string }) => {
  const src = `${base}${iconName}`;
  return <Image src={src} alt={iconName} width={24} height={24} unoptimized />;
};

export default function LocationMap({
  title = "MAPS",
  description = "Located in Kalyani Nagar, the development provides proximity to real, entertainment, business districts and the airport - offering convenience without compromising privacy.",
  // property_location_co_ordinates,
}: LocationMapProps) {
  const [active, setActive] = useState<string>("business");
  const sectionRef = useRef<HTMLElement>(null);
  const mapRef = useRef<HTMLDivElement | null>(null);
  const mapInstance = useRef<google.maps.Map | null>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -100px 0px" }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    setOptions({
      key: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
      v: "weekly",
    });

    importLibrary("maps").then(() => {
      if (!mapRef.current) return;

      const map = new google.maps.Map(mapRef.current, {
        center: { lat: 18.5204, lng: 73.8567 },
        zoom: 12,
        styles: MAP_STYLE,
        disableDefaultUI: true,
      });

      mapInstance.current = map;

      LOCATIONS.forEach((loc) => {
        new google.maps.Marker({
          position: { lat: loc.lat, lng: loc.lng },
          map,
          title: loc.title,
          icon: getMarkerIcon(loc.type),
        });
      });
    });
  }, []);

  const panToLocation = (location: MapLocation) => {
    if (!mapInstance.current) return;

    mapInstance.current.panTo({
      lat: location.lat,
      lng: location.lng,
    });
    mapInstance.current.panBy(0, -100); // subtle cinematic shift
    // mapInstance.current.moveCamera({
    //   center: { lat, lng },
    //   zoom,
    // });

    if (location.zoom) {
      mapInstance.current.setZoom(location.zoom);
    }

    setActive(location.id);
  };

  return (
    <section
      ref={sectionRef}
      className="w-full pt-0 md:pt-20 bg-white pr-6 md:pr-16"
    >
      <div className="mx-auto max-w-[1920px]">
        {/* Title and Description */}
        <div
          className={`text-center mb-10 px-4 md:px-0 ${
            isInView ? "animate-fade-in-up" : "opacity-0"
          }`}
        >
          <div className="text-lg font-medium tracking-[0.2em] text-[#9E8C70] mb-2 uppercase">
            {title}
          </div>
          <h2 className="text-2xl md:text-[28px] font-display-semi text-black mb-4">
            CONNECTED TO THE CITY&apos;S CORE
          </h2>
          <p className="text-base md:text-lg text-gray-600 max-w-4xl mx-auto">
            {description}
          </p>
        </div>

        {/* Map View Toggles - First */}
        {/* <div
          className={`flex items-center justify-center gap-4 mb-10 ${
            isInView ? "animate-fade-in-up-delay-1" : "opacity-0"
          }`}
        >
          <button
            onClick={() => setMapView("2d")}
            className={`text-[12px] md:text-[16px] font-medium tracking-wider transition-colors ${
              mapView === "2d"
                ? "text-gold-beige border-b-3 border-gold-beige"
                : "text-gold-beige/60 hover:text-gold-beige"
            }`}
          >
            2D MAP VIEW
          </button>
          <button
            onClick={() => setMapView("3d")}
            className={`text-[12px] md:text-[16px] font-medium tracking-wider transition-colors ${
              mapView === "3d"
                ? "text-gold-beige border-b-3 border-gold-beige"
                : "text-gold-beige/60 hover:text-gold-beige"
            }`}
          >
            3D MAP VIEW
          </button>
        </div> */}

        {/* Tabs + Map (2 columns: 20% tabs / 80% map) */}
        <div className="flex flex-col md:flex-row gap-8 md:gap-6">
          {/* Category Filter Tabs - Left (vertical) */}
          <div
            className={`w-full md:w-1/5 ${isInView ? "animate-fade-in-up-delay-1" : "opacity-0"}`}
          >
            <div className="flex flex-col items-start gap-4 md:gap-5 px-4 md:px-0">
              {LOCATIONS.map((loc) => {
                const isActive = active === loc.id;
                return (
                  <button
                    key={loc.id}
                    onClick={() => panToLocation(loc)}
                    className={`w-full flex items-center gap-3 text-left text-[12px] md:text-[16px] font-medium tracking-wider transition-colors ${
                      isActive
                        ? "text-gold-beige border-l-4 border-gold-beige pl-3"
                        : "text-gold-beige/60 hover:text-gold-beige pl-4"
                    }`}
                  >
                    <CategoryIcon iconName={loc.icon} />
                    <span className="leading-snug text-gold-beige">
                      {loc.title}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Map Container - Right */}
          <div
            className={`relative w-full md:w-4/5 h-[600px] md:h-[700px] overflow-hidden shadow-lg ${isInView ? "animate-fade-in-up-delay-2" : "opacity-0"}`}
          >
            {/* Map */}
            <div ref={mapRef} className="w-full h-[500px] shadow-lg" />
          </div>
        </div>
      </div>
    </section>
  );
}

function getMarkerIcon(type: LocationType) {
  const icons: Record<LocationType, string> = {
    atm: `${base}/atm.png`,
    banks: `${base}/banks.png`,
    entertainment: `${base}/entertainment.png`,
    hospital: `${base}/hospital.png`,
    park: `${base}/park.png`,
    restaurants: `${base}/restaurants.png`,
    airport: `${base}/airport.png`,
  };

  return {
    url: icons[type],
    scaledSize: new google.maps.Size(36, 36),
  };
}
