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

// Category config: maps our UI to Google Places API types for nearby search
const PLACE_CATEGORIES: Array<{
  id: string;
  title: string;
  type: LocationType;
  placeType: string; // Google Places API type
  icon: string;
}> = [
  { id: "atm", title: "ATM", type: "atm", placeType: "atm", icon: "atm.png" },
  {
    id: "banks",
    title: "BANKS",
    type: "banks",
    placeType: "bank",
    icon: "banks.png",
  },
  {
    id: "entertainment",
    title: "ENTERTAINMENT & LIFESTYLE",
    type: "entertainment",
    placeType: "shopping_mall",
    icon: "entertainment.png",
  },
  {
    id: "hospital",
    title: "HOSPITAL",
    type: "hospital",
    placeType: "hospital",
    icon: "hospital.png",
  },
  {
    id: "park",
    title: "PARKS & OUTDOORS",
    type: "park",
    placeType: "park",
    icon: "park.png",
  },
  {
    id: "restaurants",
    title: "RESTAURANTS & CAFE",
    type: "restaurants",
    placeType: "restaurant",
    icon: "restaurants.png",
  },
  {
    id: "airport",
    title: "AIRPORT",
    type: "airport",
    placeType: "airport",
    icon: "airport.png",
  },
];

// Light map style matching panchshil.com/57-avenue reference
const MAP_STYLE: google.maps.MapTypeStyle[] = [
  {
    featureType: "all",
    elementType: "geometry",
    stylers: [{ color: "#f5f5f5" }],
  },
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
  {
    featureType: "road",
    elementType: "geometry",
    stylers: [{ color: "#e8e8e8" }],
  },
  {
    featureType: "road",
    elementType: "geometry.stroke",
    stylers: [{ color: "#d0d0d0" }],
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [{ color: "#c9e6f5" }],
  },
  {
    featureType: "poi.park",
    elementType: "geometry",
    stylers: [{ color: "#e8f0e8" }],
  },
];

// Custom property pin icon (gold-beige #9E8C70)
const PROPERTY_PIN_SVG =
  '<svg width="65" height="65" viewBox="0 0 11 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.626 2.29A4.92 4.92 0 005.13.848 4.92 4.92 0 001.635 2.29c-1.926 1.922-2.18 4.642-.31 7.408.95 1.397 3.805 4.905 3.805 4.905s2.857-3.508 3.806-4.905c1.87-2.757 1.616-5.476-.31-7.408zM5.13 8.884A2.967 2.967 0 012.161 5.92a2.973 2.973 0 012.97-2.963A2.972 2.972 0 018.1 5.92a2.972 2.972 0 01-2.97 2.963z" fill="#9E8C70"/></svg>';

const PROPERTY_PIN_ICON =
  "data:image/svg+xml," + encodeURIComponent(PROPERTY_PIN_SVG);

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
  property_location_co_ordinates,
}: LocationMapProps) {
  const [active, setActive] = useState<string | null>(null);
  const [locations, setLocations] = useState<MapLocation[]>([]);
  const [isPlacesLoading, setIsPlacesLoading] = useState(true);
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

    Promise.all([importLibrary("maps"), importLibrary("places")]).then(() => {
      if (!mapRef.current || !property_location_co_ordinates) return;

      const { property_latitude, property_longitude } =
        property_location_co_ordinates;
      const propertyPosition = new google.maps.LatLng(
        property_latitude,
        property_longitude
      );

      const map = new google.maps.Map(mapRef.current, {
        center: propertyPosition,
        zoom: 14,
        styles: MAP_STYLE,
        disableDefaultUI: true,
      });

      mapInstance.current = map;

      // Property drop pin marker
      new google.maps.Marker({
        position: propertyPosition,
        map,
        title: "Property Location",
        icon: {
          url: PROPERTY_PIN_ICON,
          scaledSize: new google.maps.Size(48, 65),
          anchor: new google.maps.Point(24, 65),
        },
      });

      const bounds = new google.maps.LatLngBounds();
      bounds.extend(propertyPosition);

      const placesService = new google.maps.places.PlacesService(map);
      const radiusMeters = 10000; // 10 km - increase for airport if needed

      const fetchPromises = PLACE_CATEGORIES.map(
        (category) =>
          new Promise<MapLocation | null>((resolve) => {
            const request = {
              location: propertyPosition,
              radius: radiusMeters,
              type: category.placeType as string,
            };
            placesService.nearbySearch(
              request,
              (
                results: google.maps.places.PlaceResult[] | null,
                status: google.maps.places.PlacesServiceStatus
              ) => {
                if (
                  status === google.maps.places.PlacesServiceStatus.OK &&
                  results &&
                  results[0]?.geometry?.location
                ) {
                  const place = results[0];
                  const loc = place.geometry!.location! as google.maps.LatLng;
                  const lat = loc.lat();
                  const lng = loc.lng();
                  bounds.extend({ lat, lng });
                  resolve({
                    id: category.id,
                    title: category.title,
                    type: category.type,
                    lat,
                    lng,
                    zoom: 14,
                    icon: category.icon,
                  });
                } else {
                  resolve(null);
                }
              }
            );
          })
      );

      Promise.all(fetchPromises).then((results) => {
        const foundLocations = results.filter(
          (r): r is MapLocation => r !== null
        );
        setLocations(foundLocations);
        setIsPlacesLoading(false);

        // Add markers for nearby places
        foundLocations.forEach((loc) => {
          new google.maps.Marker({
            position: { lat: loc.lat, lng: loc.lng },
            map,
            title: loc.title,
            icon: getMarkerIcon(loc.type),
          });
        });

        // Fit map to show property + all nearby places with padding
        map.fitBounds(bounds, { top: 60, right: 60, bottom: 60, left: 60 });
      });
    });
  }, [property_location_co_ordinates]);

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
          className={`text-center mb-20 px-4 md:px-0 ${
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
              {isPlacesLoading ? (
                <p className="text-sm text-gold-beige/70">
                  Loading nearby places…
                </p>
              ) : locations.length === 0 ? (
                <p className="text-sm text-gold-beige/70">
                  No nearby places found
                </p>
              ) : (
                locations.map((loc) => {
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
                })
              )}
            </div>
          </div>

          {/* Map Container - Right */}
          <div
            className={`relative w-full md:w-4/5 h-[600px] md:h-[700px] overflow-hidden ${isInView ? "animate-fade-in-up-delay-2" : "opacity-0"}`}
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
    atm: `${base}atm.png`,
    banks: `${base}banks.png`,
    entertainment: `${base}entertainment.png`,
    hospital: `${base}hospital.png`,
    park: `${base}park.png`,
    restaurants: `${base}restaurants.png`,
    airport: `${base}airport.png`,
  };

  return {
    url: icons[type],
    scaledSize: new google.maps.Size(36, 36),
  };
}
