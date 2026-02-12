"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Script from "next/script";
import {
  mapCategoriesData,
  PROPERTY_LOCATION,
  MapCategory,
  getCategoryMarkerIcon,
} from "./mapData";
import { PropertyLocationCoOrdinatesProps } from "@/interfaces";

interface LocationMapProps {
  title?: string;
  description?: string;
  property_location_co_ordinates: PropertyLocationCoOrdinatesProps;
}

// Icon components for categories
const CategoryIcon = ({ iconName }: { iconName: string }) => {
  const iconClass = "w-4 h-4 md:w-5 md:h-5";
  switch (iconName) {
    case "cutlery":
      return (
        <svg className={iconClass} fill="currentColor" viewBox="0 0 20 20">
          <path d="M8 1a1 1 0 011 1v6h4a1 1 0 011 1v2a1 1 0 01-1 1H9v6a1 1 0 01-2 0V3a1 1 0 011-1z" />
          <path d="M5 2a1 1 0 00-1 1v3a1 1 0 001 1h1a1 1 0 001-1V3a1 1 0 00-1-1H5zM3 13a1 1 0 011-1h1a1 1 0 011 1v4a1 1 0 01-2 0v-4z" />
        </svg>
      );
    case "bus":
      return (
        <svg className={iconClass} fill="currentColor" viewBox="0 0 20 20">
          <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
          <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1v-5a1 1 0 00-.293-.707l-2-2A1 1 0 0015 7h-1z" />
        </svg>
      );
    case "medical":
      return (
        <svg className={iconClass} fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
            clipRule="evenodd"
          />
          <path d="M10 8a1 1 0 00-1 1v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V9a1 1 0 00-1-1z" />
        </svg>
      );
    case "graduation":
      return (
        <svg className={iconClass} fill="currentColor" viewBox="0 0 20 20">
          <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
        </svg>
      );
    case "shopping":
      return (
        <svg className={iconClass} fill="currentColor" viewBox="0 0 20 20">
          <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
        </svg>
      );
    case "science":
      return (
        <svg className={iconClass} fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z"
            clipRule="evenodd"
          />
        </svg>
      );
    default:
      return null;
  }
};

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    google: any;
    initMap: () => void;
  }
}

export default function LocationMap({
  title = "MAPS",
  description = "Located in Kalyani Nagar, the development provides proximity to real, entertainment, business districts and the airport - offering convenience without compromising privacy.",
  property_location_co_ordinates,
}: LocationMapProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);
  const [selectedCategory, setSelectedCategory] =
    useState<MapCategory>("cafes-restaurants");
  const [mapView, setMapView] = useState<"2d" | "3d">("2d");
  const [mapType, setMapType] = useState<"roadmap" | "satellite">("roadmap");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [map, setMap] = useState<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
  const [markers, setMarkers] = useState<any[]>([]);
  const [isMapLoaded, setIsMapLoaded] = useState(false);

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

  // Initialize map when Google Maps is loaded
  const initMap = useCallback(() => {
    if (!mapRef.current || !window.google || map) return;

    const propertyPosition = {
      lat: property_location_co_ordinates.property_latitude,
      lng: property_location_co_ordinates.property_longitude,
    };

    const googleMap = new window.google.maps.Map(mapRef.current, {
      center: propertyPosition,
      zoom: 15,
      mapTypeId: mapType === "satellite" ? "satellite" : "roadmap",
      tilt: mapView === "3d" ? 45 : 0,
      styles: [
        {
          featureType: "all",
          elementType: "labels.text.fill",
          stylers: [{ color: "#5c5c5c" }],
        },
        {
          featureType: "all",
          elementType: "labels.text.stroke",
          stylers: [{ color: "#ffffff" }],
        },
      ],
    });

    // Add property marker (teardrop pin)
    const propertyMarker = new window.google.maps.Marker({
      position: propertyPosition,
      map: googleMap,
      title: PROPERTY_LOCATION.name,
      icon: {
        url: "http://maps.google.com/mapfiles/ms/icons/red-dot.png",
        scaledSize: new window.google.maps.Size(40, 40),
      },
    });

    setMap(googleMap);
    setMarkers([propertyMarker]);
    setIsMapLoaded(true);
  }, [map, mapType, mapView, property_location_co_ordinates]);

  // Ensure the map initializes on client-side navigation too.
  // (When mounting after navigation, "lazyOnload" can miss the load event.)
  useEffect(() => {
    if (!isInView) return;
    if (typeof window === "undefined") return;
    if (window.google) initMap();
  }, [isInView, initMap]);

  // Filter markers based on selected category
  useEffect(() => {
    if (!map || !window.google || !isMapLoaded) return;

    // Use setTimeout to defer state update and avoid synchronous setState warning
    const timeoutId = setTimeout(() => {
      setMarkers((prevMarkers) => {
        // Ensure we have a property marker (check happens inside setState to avoid dependency)
        if (prevMarkers.length === 0) return prevMarkers;

        // Clear POI markers (index > 0)
        prevMarkers.slice(1).forEach((marker) => {
          marker.setMap(null);
        });

        // Keep property marker (index 0)
        const propertyMarker = prevMarkers[0];

        // Get POIs for selected category
        const categoryData = mapCategoriesData.find(
          (cat) => cat.id === selectedCategory
        );

        if (!categoryData || categoryData.pois.length === 0) {
          return [propertyMarker];
        }

        // Add markers for POIs in selected category with category-specific icons
        const newMarkers = [propertyMarker];
        categoryData.pois.forEach((poi) => {
          const markerIcon = getCategoryMarkerIcon(poi.category);
          const marker = new window.google.maps.Marker({
            position: { lat: poi.lat, lng: poi.lng },
            map: map,
            title: poi.name,
            icon: markerIcon,
          });
          newMarkers.push(marker);
        });

        return newMarkers;
      });
    }, 0);

    return () => clearTimeout(timeoutId);
  }, [selectedCategory, map, isMapLoaded]);

  // Update map type and view
  useEffect(() => {
    if (!map) return;
    map.setMapTypeId(mapType === "satellite" ? "satellite" : "roadmap");
    if (mapView === "3d" && mapType === "roadmap") {
      map.setTilt(45);
    } else {
      map.setTilt(0);
    }
  }, [mapType, mapView, map]);

  return (
    <>
      {/* Google Maps Script */}
      {isInView && typeof window !== "undefined" && (
        <Script
          id="google-maps-js"
          src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ""}&libraries=places`}
          strategy="afterInteractive"
          onReady={() => initMap()}
          onError={() => {
            console.error("Failed to load Google Maps script");
          }}
        />
      )}

      <section ref={sectionRef} className="w-full pt-0 md:pt-20 bg-white">
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
          <div
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
          </div>

          {/* Tabs + Map (2 columns: 20% tabs / 80% map) */}
          <div className="flex flex-col md:flex-row gap-8 md:gap-6">
            {/* Category Filter Tabs - Left (vertical) */}
            <div
              className={`w-full md:w-1/5 ${
                isInView ? "animate-fade-in-up-delay-1" : "opacity-0"
              }`}
            >
              <div className="flex flex-col items-start gap-4 md:gap-5 px-4 md:px-0">
                {mapCategoriesData.map((category) => {
                  const isActive = category.id === selectedCategory;
                  return (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`w-full flex items-center gap-3 text-left text-[12px] md:text-[16px] font-medium tracking-wider transition-colors ${
                        isActive
                          ? "text-gold-beige border-l-4 border-gold-beige pl-3"
                          : "text-gold-beige/60 hover:text-gold-beige pl-4"
                      }`}
                    >
                      <CategoryIcon iconName={category.icon} />
                      <span className="leading-snug">{category.title}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Map Container - Right */}
            <div
              className={`relative w-full md:w-4/5 h-[600px] md:h-[700px] overflow-hidden shadow-lg ${
                isInView ? "animate-fade-in-up-delay-2" : "opacity-0"
              }`}
            >
              {/* Map/Satellite Toggle */}
              <div className="absolute top-4 left-4 z-10 bg-white rounded-md shadow-md">
                <div className="flex border border-gray-200 rounded-md overflow-hidden">
                  <button
                    onClick={() => setMapType("roadmap")}
                    className={`px-4 py-2 text-sm font-medium transition-colors ${
                      mapType === "roadmap"
                        ? "bg-gold-beige text-white"
                        : "bg-white text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    Map
                  </button>
                  <button
                    onClick={() => setMapType("satellite")}
                    className={`px-4 py-2 text-sm font-medium transition-colors border-l border-gray-200 ${
                      mapType === "satellite"
                        ? "bg-gold-beige text-white"
                        : "bg-white text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    Satellite
                  </button>
                </div>
              </div>

              {/* Map */}
              <div ref={mapRef} className="w-full h-full" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
